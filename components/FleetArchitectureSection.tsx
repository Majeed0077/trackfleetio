"use client";

import { Cable, Gauge, Radar, ServerCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAppStore } from "@/store/store";

type ArchitectureLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  connector?: string;
  icon: LucideIcon;
  highlighted?: boolean;
};

const iconMap: Record<string, LucideIcon> = {
  gauge: Gauge,
  cable: Cable,
  "server-cog": ServerCog,
  radar: Radar,
};

export function FleetArchitectureSection() {
  const architectureDraft = useAppStore((state) => state.cmsDrafts.homepageArchitecture);
  const architectureLayers: ArchitectureLayer[] = architectureDraft.layers.map((layer) => ({
    ...layer,
    icon: iconMap[layer.icon],
  }));

  return (
    <section className="content-section section-architecture" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered architecture-heading">
          <p className="eyebrow">{architectureDraft.eyebrow}</p>
          <h2>{architectureDraft.heading}</h2>
          <p>{architectureDraft.description}</p>
        </div>

        <div className="architecture-shell" data-reveal-group>
          <div className="architecture-grid">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isMultiLineConnector = layer.connector?.includes("\n");

              return (
                <div className="architecture-node-group" key={layer.id} data-reveal-item>
                  <article
                    className={`architecture-card${layer.highlighted ? " is-highlighted" : ""}`}
                  >
                    <div className="architecture-card-topline">
                      <span className="architecture-layer-label">{layer.label}</span>
                      <span className="architecture-card-icon" aria-hidden="true">
                        <Icon size={16} strokeWidth={1.9} />
                      </span>
                    </div>
                    <h3>{layer.title}</h3>
                    <p>{layer.description}</p>
                  </article>

                  {index < architectureLayers.length - 1 ? (
                    <div className="architecture-connector" aria-hidden="true">
                      <span className="architecture-connector-line" />
                      <span
                        className={`architecture-connector-chip${isMultiLineConnector ? " is-multiline" : ""}`}
                      >
                        {isMultiLineConnector
                          ? layer.connector?.split("\n").map((part, partIndex) => (
                              <span key={`${layer.id}-${part}-${partIndex}`}>{part}</span>
                            ))
                          : layer.connector}
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
