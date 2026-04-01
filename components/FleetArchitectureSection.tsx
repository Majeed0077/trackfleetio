import { Cable, Gauge, Radar, ServerCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ArchitectureLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  connector?: string;
  icon: LucideIcon;
  highlighted?: boolean;
};

const architectureLayers: ArchitectureLayer[] = [
  {
    id: "hardware",
    label: "Layer 01",
    title: "On-Vehicle Hardware",
    description: "GPS trackers, AI dashcams, sensors, and OBD/CAN visibility hardware.",
    connector: "LTE / CAN",
    icon: Gauge,
    highlighted: true,
  },
  {
    id: "edge",
    label: "Layer 02",
    title: "Edge Connectivity",
    description: "Live telemetry, event delivery, firmware updates, and routing from the field.",
    connector: "Secure\nStream",
    icon: Cable,
  },
  {
    id: "platform",
    label: "Layer 03",
    title: "Fleet Intelligence",
    description: "Alerts, dashboards, analytics, video review, and operational control.",
    connector: "REST / API",
    icon: ServerCog,
  },
  {
    id: "operations",
    label: "Layer 04",
    title: "Business Operations",
    description: "Dispatch, compliance, reporting, ERP workflows, and customer systems.",
    icon: Radar,
  },
] as const;

export function FleetArchitectureSection() {
  return (
    <section className="content-section section-architecture" data-reveal>
      <div className="container">
        <div className="section-heading section-heading-centered architecture-heading">
          <p className="eyebrow">Fleet Stack</p>
          <h2>Fleet Intelligence Architecture</h2>
          <p>
            A connected system from vehicle hardware to analytics, alerts, and operational
            workflows.
          </p>
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
