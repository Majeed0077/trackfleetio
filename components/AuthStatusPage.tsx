import Link from "next/link";

import { AuthShell } from "@/components/AuthShell";
import { TrustFooter } from "@/components/TrustFooter";

type Action = {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
};

export function AuthStatusPage({
  badge,
  title,
  description,
  visualLabel,
  visualTitle,
  visualDescription,
  trustLine,
  actions,
}: {
  badge: string;
  title: string;
  description: string;
  visualLabel: string;
  visualTitle: string;
  visualDescription: string;
  trustLine: string;
  actions: Action[];
}) {
  return (
    <AuthShell
      cardBadge={badge}
      title={title}
      description={description}
      visualLabel={visualLabel}
      visualTitle={visualTitle}
      visualDescription={visualDescription}
      visualImageSrc="/Products/3Products.png"
      visualImageAlt="Track Fleetio hardware platform"
      trustLine={trustLine}
      footer={<TrustFooter text="Workflow-ready access, recovery, and support states for enterprise teams." />}
    >
      <div className="auth-button-group auth-button-group-premium">
        {actions.map((action) => (
          <Link
            key={`${action.href}-${action.label}`}
            className={`button ${action.tone === "secondary" ? "button-secondary" : "button-primary"} auth-submit`}
            href={action.href}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </AuthShell>
  );
}
