import Image from "next/image";
import Link from "next/link";
import { Boxes, Fuel, MapPinned, Radar, ScreenShare, Truck } from "lucide-react";

import { solutionsOverviewContent } from "@/lib/solutions";

const overviewIconMap = {
  tracking: MapPinned,
  video: ScreenShare,
  monitoring: Fuel,
  asset: Boxes,
  industry: Truck,
} as const;

export function SolutionsOverviewSection() {
  return (
    <section className="content-section solutions-overview-section">
      <div className="container">
        <div className="section-heading section-heading-centered solutions-overview-heading">
          <p className="eyebrow">{solutionsOverviewContent.eyebrow}</p>
          <h2>{solutionsOverviewContent.heading}</h2>
          <p className="section-subtitle">{solutionsOverviewContent.description}</p>
        </div>

        <div className="solutions-overview-shell">
          <div className="solutions-overview-stage">
            <div className="solutions-overview-orbit" aria-hidden="true"></div>

            {solutionsOverviewContent.nodes.map((node, index) => {
              const Icon = overviewIconMap[node.icon];

              return (
                <Link
                  className={`solutions-overview-node solutions-overview-node-${index + 1}`}
                  href={node.href}
                  key={node.title}
                >
                  <span className="solutions-overview-node-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <span className="solutions-overview-node-title">{node.title}</span>
                </Link>
              );
            })}

            <div className="solutions-overview-center">
              <div className="solutions-overview-media">
                <div className="solutions-overview-glow" aria-hidden="true"></div>
                <Image
                  className="solutions-overview-image"
                  src={solutionsOverviewContent.image.src}
                  alt={solutionsOverviewContent.image.alt}
                  width={700}
                  height={500}
                  sizes="(max-width: 767px) 88vw, (max-width: 1199px) 52vw, 620px"
                />
              </div>

              <div className="solutions-overview-chip-row" aria-label="Supporting capabilities">
                {solutionsOverviewContent.chips.map((chip) => (
                  <span className="solutions-overview-chip" key={chip}>
                    <Radar size={14} strokeWidth={1.9} />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
