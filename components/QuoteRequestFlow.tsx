"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bus,
  Cog,
  Ellipsis,
  Factory,
  PackageSearch,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { useAppStore, type AuthUser } from "@/store/store";
import type { Product } from "@/data/products";

type QuoteStep = 1 | 2 | 3;

type QuoteFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
};

const INDUSTRY_OPTIONS: Array<{ value: string; label: string; Icon: LucideIcon }> = [
  { value: "transportation", label: "Transportation", Icon: Truck },
  { value: "logistics", label: "Logistics", Icon: PackageSearch },
  { value: "construction", label: "Construction", Icon: Factory },
  { value: "manufacturing", label: "Manufacturing", Icon: Cog },
  { value: "public-transport", label: "Public Transport", Icon: Bus },
  { value: "all-others", label: "All Others", Icon: Ellipsis },
];

const FLEET_SIZE_OPTIONS = [
  { value: "1-9", label: "1 - 9" },
  { value: "10-49", label: "10 - 49" },
  { value: "50-174", label: "50 - 174" },
  { value: "175-999", label: "175 - 999" },
  { value: "1000+", label: "1,000+" },
] as const;

const INITIAL_FORM_VALUES: QuoteFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  company: "",
};

export function QuoteRequestFlow({
  selectedProduct = null,
  initialAuthUser = null,
}: {
  selectedProduct?: Product | null;
  initialAuthUser?: AuthUser | null;
}) {
  const router = useRouter();
  const showToast = useAppStore((state) => state.showToast);
  const [step, setStep] = useState<QuoteStep>(1);
  const [industry, setIndustry] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formValues, setFormValues] = useState<QuoteFormValues>({
    ...INITIAL_FORM_VALUES,
    firstName: initialAuthUser?.name.split(" ")[0] ?? "",
    lastName: initialAuthUser?.name.split(" ").slice(1).join(" ") ?? "",
    phone: initialAuthUser?.phone ?? "",
    email: initialAuthUser?.email ?? "",
    company: initialAuthUser?.company ?? "",
  });

  const selectedIndustryLabel = useMemo(
    () => INDUSTRY_OPTIONS.find((item) => item.value === industry)?.label ?? "",
    [industry],
  );
  const selectedFleetLabel = useMemo(
    () => FLEET_SIZE_OPTIONS.find((item) => item.value === fleetSize)?.label ?? "",
    [fleetSize],
  );
  const canProceedToNextStep = step === 1 ? Boolean(industry) : step === 2 ? Boolean(fleetSize) : true;

  const nextStep = () => {
    if (step === 1 && !industry) {
      setStatusMessage("Select your industry before moving to the next step.");
      return;
    }

    if (step === 2 && !fleetSize) {
      setStatusMessage("Choose the fleet or asset count range before continuing.");
      return;
    }

    setStatusMessage("");
    setStep((currentStep) => Math.min(3, currentStep + 1) as QuoteStep);
  };

  const previousStep = () => {
    setStatusMessage("");
    setStep((currentStep) => Math.max(1, currentStep - 1) as QuoteStep);
  };

  const updateField =
    (field: keyof QuoteFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setFormValues((currentValue) => ({
        ...currentValue,
        [field]: nextValue,
      }));
    };

  const submitQuoteRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");

    if (!industry || !fleetSize) {
      setStatusMessage("Complete the industry and fleet size steps before submitting the quote request.");
      return;
    }

    const requiredFields: Array<keyof QuoteFormValues> = ["firstName", "lastName", "phone", "email", "company"];
    const missingField = requiredFields.find((field) => !formValues[field].trim());

    if (missingField) {
      setStatusMessage("Complete all contact fields so our team can prepare the quote.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          productId: selectedProduct?.id ?? null,
          industry,
          fleetSize,
          ...formValues,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        quoteId?: string;
      };

      if (!response.ok || !payload.ok) {
        const reason = payload.message || "Unable to submit the quote request.";
        setStatusMessage(reason);
        router.push(`/quote-request/failure?reason=${encodeURIComponent(reason)}`);
        return;
      }

      showToast(payload.quoteId ? `Quote ${payload.quoteId} requested` : "Quote request submitted");
      router.push(`/quote-request/success?quote=${encodeURIComponent(payload.quoteId || "TFQ-NEW")}`);
    } catch {
      const reason = "Unable to reach the quote service right now.";
      setStatusMessage(reason);
      router.push(`/quote-request/failure?reason=${encodeURIComponent(reason)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="site-main quote-request-page">
      <section className="quote-request-section">
        <div className="container">
          <div className={`quote-request-shell quote-request-shell-step-${step}`}>
            <div className={`quote-request-stage quote-request-stage-step-${step}`}>
              {step > 1 ? (
                <button className="quote-request-back" type="button" onClick={previousStep}>
                  <ArrowLeft size={16} strokeWidth={1.9} />
                  <span>Back</span>
                </button>
              ) : null}

              {selectedProduct ? (
                <article className="quote-request-context-card">
                  <div className="quote-request-context-media">
                    <Image
                      className={`catalog-card-image ${selectedProduct.imageClass}`}
                      src={resolveCloudinaryAsset(selectedProduct.imageSrc)}
                      alt={selectedProduct.imageAlt}
                      width={140}
                      height={108}
                      sizes="140px"
                    />
                  </div>
                  <div className="quote-request-context-copy">
                    <p className="quote-request-step-kicker">Selected hardware</p>
                    <h2>{selectedProduct.title}</h2>
                    <p>{selectedProduct.shortDescription}</p>
                    <div className="quote-request-context-tags" aria-label="Selected product details">
                      <span>{selectedProduct.categoryLabel}</span>
                      {selectedProduct.specs.slice(0, 2).map((spec) => (
                        <span key={`${selectedProduct.id}-${spec}`}>{spec}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ) : null}

              <div className="quote-request-stage-head">
                <span className="quote-request-step-kicker">Step {step} of 3</span>
                <h1>
                  {step === 1
                    ? "Which industry should this quote support?"
                    : step === 2
                      ? "How many vehicles or assets do you operate?"
                      : "Last step: where can we reach you?"}
                </h1>
                <p>
                  {step === 1
                    ? "We use your operating environment to recommend the right telematics and hardware mix."
                    : step === 2
                      ? "Fleet size helps us shape the right deployment scope, hardware bundle, and rollout planning."
                      : "Share your contact details so our team can review the request and send pricing guidance."}
                </p>
              </div>

              <div className="quote-request-progress" aria-hidden="true">
                {[1, 2, 3].map((item) => (
                  <span key={item} className={`quote-request-progress-dot${step >= item ? " is-active" : ""}`} />
                ))}
              </div>

              {step === 1 ? (
                <>
                  <div className="quote-request-option-grid">
                    {INDUSTRY_OPTIONS.map(({ value, label, Icon }) => (
                      <button
                        key={value}
                        className={`quote-request-option${industry === value ? " is-selected" : ""}`}
                        type="button"
                        onClick={() => setIndustry(value)}
                      >
                        <span className="quote-request-option-icon" aria-hidden="true">
                          <Icon size={22} strokeWidth={1.9} />
                        </span>
                        <span className="quote-request-option-label">{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="quote-request-actions">
                    <button
                      className="button button-primary quote-request-cta"
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceedToNextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <div className="quote-request-option-grid quote-request-option-grid-compact">
                    {FLEET_SIZE_OPTIONS.map((item) => (
                      <button
                        key={item.value}
                        className={`quote-request-option quote-request-option-size${fleetSize === item.value ? " is-selected" : ""}`}
                        type="button"
                        onClick={() => setFleetSize(item.value)}
                      >
                        <span className="quote-request-option-label">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="quote-request-actions">
                    <button
                      className="button button-primary quote-request-cta"
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceedToNextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <div className="quote-request-form-shell">
                  <form className="quote-request-form-panel" onSubmit={submitQuoteRequest}>
                    <div className="quote-request-form-grid">
                      <input
                        className="checkout-field"
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formValues.firstName}
                        onChange={updateField("firstName")}
                        required
                      />
                      <input
                        className="checkout-field"
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formValues.lastName}
                        onChange={updateField("lastName")}
                        required
                      />
                      <input
                        className="checkout-field quote-request-field-full"
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formValues.phone}
                        onChange={updateField("phone")}
                        required
                      />
                      <input
                        className="checkout-field quote-request-field-full"
                        type="email"
                        name="email"
                        placeholder="Company email"
                        value={formValues.email}
                        onChange={updateField("email")}
                        required
                      />
                      <input
                        className="checkout-field quote-request-field-full"
                        type="text"
                        name="company"
                        placeholder="Company name"
                        value={formValues.company}
                        onChange={updateField("company")}
                        required
                      />
                    </div>

                    <div className="quote-request-form-meta">
                      <div className="quote-request-meta-card">
                        <span className="quote-request-meta-label">Industry</span>
                        <strong>{selectedIndustryLabel || "Not selected"}</strong>
                      </div>
                      <div className="quote-request-meta-card">
                        <span className="quote-request-meta-label">Fleet size</span>
                        <strong>{selectedFleetLabel || "Not selected"}</strong>
                      </div>
                      <div className="quote-request-meta-card">
                        <span className="quote-request-meta-label">Product</span>
                        <strong>{selectedProduct?.title ?? "General quote request"}</strong>
                      </div>
                    </div>

                    <div className="quote-request-actions quote-request-actions-form">
                      <button className="button button-primary quote-request-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Request My Quote"}
                      </button>
                    </div>

                    <p className="quote-request-legal">
                      By submitting this form, you agree that Track Fleetio can contact you about pricing, deployment guidance, and the hardware options that fit your fleet.
                    </p>
                  </form>
                </div>
              ) : null}

              {statusMessage ? (
                <p className="quote-request-status" aria-live="polite">
                  {statusMessage}
                </p>
              ) : null}

              {step === 1 ? (
                <div className="quote-request-footer-note">
                  <Link href="/products">Prefer to keep browsing hardware first?</Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
