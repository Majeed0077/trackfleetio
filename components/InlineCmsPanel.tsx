"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useState } from "react";

import { hardwareEcosystemContent } from "@/lib/content/homepage";
import { useAppStore } from "@/store/store";

function CmsPanelField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="inline-cms-panel-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function CmsPanelGroup({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="inline-cms-panel-group">
      <div className="inline-cms-panel-group-copy">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="inline-cms-panel-group-fields">{children}</div>
    </section>
  );
}

function CmsMediaField({
  label,
  value,
  resourceType,
  onChange,
}: {
  label: string;
  value: string;
  resourceType: "image" | "video";
  onChange: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const normalizedValue = value.trim();

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("resourceType", resourceType);
      formData.append("folder", "trackfleetio/inline-cms");

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { secureUrl?: string; error?: string };

      if (!response.ok || !payload.secureUrl) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      onChange(payload.secureUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="inline-cms-panel-media">
      <CmsPanelField label={label}>
        <input type="url" value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://..." />
      </CmsPanelField>
      <div className="inline-cms-panel-media-actions">
        <label className="button button-secondary inline-cms-upload-button">
          {isUploading ? "Uploading..." : `Upload ${resourceType}`}
          <input
            type="file"
            accept={resourceType === "video" ? "video/*" : "image/*"}
            onChange={onFileChange}
            hidden
          />
        </label>
      </div>
      {normalizedValue ? (
        <div className="inline-cms-panel-media-preview">
          {resourceType === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={normalizedValue} alt={label} />
          ) : (
            <video src={normalizedValue} controls muted playsInline preload="metadata" />
          )}
        </div>
      ) : null}
      {error ? <p className="inline-cms-panel-error">{error}</p> : null}
    </div>
  );
}

export function InlineCmsPanel() {
  const authUser = useAppStore((state) => state.authUser);
  const cmsEditMode = useAppStore((state) => state.cmsEditMode);
  const cmsActiveSection = useAppStore((state) => state.cmsActiveSection);
  const cmsDrafts = useAppStore((state) => state.cmsDrafts);
  const closeCmsSection = useAppStore((state) => state.closeCmsSection);
  const updateCmsDraft = useAppStore((state) => state.updateCmsDraft);

  if (authUser?.role !== "admin" || !cmsEditMode || !cmsActiveSection) {
    return null;
  }

  return (
    <>
      <button className="inline-cms-panel-backdrop" type="button" aria-label="Close inline editor" onClick={closeCmsSection} />
      <aside className="inline-cms-panel" aria-label="Inline content editor">
        <div className="inline-cms-panel-header">
          <div>
            <p className="inline-cms-panel-kicker">Section Editor</p>
            <h2>{cmsActiveSection}</h2>
          </div>
          <button className="inline-cms-panel-close" type="button" onClick={closeCmsSection}>
            Close
          </button>
        </div>

        <div className="inline-cms-panel-body">
          {cmsActiveSection === "homepage.hero" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageHero.visible}
                  onChange={(event) => updateCmsDraft("homepageHero", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Hero Copy" description="Main above-the-fold message and action labels.">
                <CmsPanelField label="Heading line 1">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHero.heading[0]}
                    onChange={(event) =>
                      updateCmsDraft("homepageHero", {
                        heading: [event.target.value, cmsDrafts.homepageHero.heading[1], cmsDrafts.homepageHero.heading[2]],
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading line 2">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHero.heading[1]}
                    onChange={(event) =>
                      updateCmsDraft("homepageHero", {
                        heading: [cmsDrafts.homepageHero.heading[0], event.target.value, cmsDrafts.homepageHero.heading[2]],
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading line 3">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHero.heading[2]}
                    onChange={(event) =>
                      updateCmsDraft("homepageHero", {
                        heading: [cmsDrafts.homepageHero.heading[0], cmsDrafts.homepageHero.heading[1], event.target.value],
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageHero.description}
                    onChange={(event) => updateCmsDraft("homepageHero", { description: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Primary CTA label">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHero.primaryCtaLabel}
                    onChange={(event) => updateCmsDraft("homepageHero", { primaryCtaLabel: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Secondary CTA label">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHero.secondaryCtaLabel}
                    onChange={(event) => updateCmsDraft("homepageHero", { secondaryCtaLabel: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Trust line">
                  <textarea
                    value={cmsDrafts.homepageHero.trustLine}
                    onChange={(event) => updateCmsDraft("homepageHero", { trustLine: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
              <CmsPanelGroup title="Hero Media" description="Replace the main visual directly from Cloudinary.">
                <CmsMediaField
                  label="Hero image"
                  value={cmsDrafts.homepageHero.imageSrc}
                  resourceType="image"
                  onChange={(value) => updateCmsDraft("homepageHero", { imageSrc: value })}
                />
                <CmsPanelField label="Hero image alt text">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHero.imageAlt}
                    onChange={(event) => updateCmsDraft("homepageHero", { imageAlt: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
            </>
          ) : null}

          {cmsActiveSection === "homepage.buying-priorities" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageBuyingPriorities.visible}
                  onChange={(event) => updateCmsDraft("homepageBuyingPriorities", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input
                    type="text"
                    value={cmsDrafts.homepageBuyingPriorities.eyebrow}
                    onChange={(event) => updateCmsDraft("homepageBuyingPriorities", { eyebrow: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input
                    type="text"
                    value={cmsDrafts.homepageBuyingPriorities.heading}
                    onChange={(event) => updateCmsDraft("homepageBuyingPriorities", { heading: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageBuyingPriorities.description}
                    onChange={(event) => updateCmsDraft("homepageBuyingPriorities", { description: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.homepageBuyingPriorities.proofAreas.map((area, index) => (
                <CmsPanelGroup key={`${area.title}-${index}`} title={`Proof Card ${index + 1}`} description={area.title}>
                  <CmsPanelField label="Label">
                    <input
                      type="text"
                      value={area.label}
                      onChange={(event) =>
                        updateCmsDraft("homepageBuyingPriorities", {
                          proofAreas: cmsDrafts.homepageBuyingPriorities.proofAreas.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, label: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Title">
                    <input
                      type="text"
                      value={area.title}
                      onChange={(event) =>
                        updateCmsDraft("homepageBuyingPriorities", {
                          proofAreas: cmsDrafts.homepageBuyingPriorities.proofAreas.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, title: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Description">
                    <textarea
                      value={area.description}
                      onChange={(event) =>
                        updateCmsDraft("homepageBuyingPriorities", {
                          proofAreas: cmsDrafts.homepageBuyingPriorities.proofAreas.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, description: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
            </>
          ) : null}

          {cmsActiveSection === "homepage.story" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageStory.visible}
                  onChange={(event) => updateCmsDraft("homepageStory", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.eyebrow}
                    onChange={(event) => updateCmsDraft("homepageStory", { eyebrow: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.heading}
                    onChange={(event) => updateCmsDraft("homepageStory", { heading: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageStory.description}
                    onChange={(event) => updateCmsDraft("homepageStory", { description: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
              <CmsPanelGroup title="Video Card" description="Dashcam/monitoring story block.">
                <CmsPanelField label="Title">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.videoCard.title}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        videoCard: { ...cmsDrafts.homepageStory.videoCard, title: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageStory.videoCard.description}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        videoCard: { ...cmsDrafts.homepageStory.videoCard, description: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="CTA label">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.videoCard.ctaLabel}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        videoCard: { ...cmsDrafts.homepageStory.videoCard, ctaLabel: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
                <CmsMediaField
                  label="Video file"
                  value={cmsDrafts.homepageStory.videoCard.videoSrc}
                  resourceType="video"
                  onChange={(value) =>
                    updateCmsDraft("homepageStory", {
                      videoCard: { ...cmsDrafts.homepageStory.videoCard, videoSrc: value },
                    })
                  }
                />
                <CmsMediaField
                  label="Video poster"
                  value={cmsDrafts.homepageStory.videoCard.posterSrc}
                  resourceType="image"
                  onChange={(value) =>
                    updateCmsDraft("homepageStory", {
                      videoCard: { ...cmsDrafts.homepageStory.videoCard, posterSrc: value },
                    })
                  }
                />
              </CmsPanelGroup>
              <CmsPanelGroup title="Image Card" description="Static story/image block.">
                <CmsPanelField label="Title">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.imageCard.title}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        imageCard: { ...cmsDrafts.homepageStory.imageCard, title: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageStory.imageCard.description}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        imageCard: { ...cmsDrafts.homepageStory.imageCard, description: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
                <CmsPanelField label="CTA label">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.imageCard.ctaLabel}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        imageCard: { ...cmsDrafts.homepageStory.imageCard, ctaLabel: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
                <CmsMediaField
                  label="Image"
                  value={cmsDrafts.homepageStory.imageCard.imageSrc}
                  resourceType="image"
                  onChange={(value) =>
                    updateCmsDraft("homepageStory", {
                      imageCard: { ...cmsDrafts.homepageStory.imageCard, imageSrc: value },
                    })
                  }
                />
                <CmsPanelField label="Image alt text">
                  <input
                    type="text"
                    value={cmsDrafts.homepageStory.imageCard.imageAlt}
                    onChange={(event) =>
                      updateCmsDraft("homepageStory", {
                        imageCard: { ...cmsDrafts.homepageStory.imageCard, imageAlt: event.target.value },
                      })
                    }
                  />
                </CmsPanelField>
              </CmsPanelGroup>
            </>
          ) : null}

          {cmsActiveSection === "homepage.architecture" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageArchitecture.visible}
                  onChange={(event) => updateCmsDraft("homepageArchitecture", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input
                    type="text"
                    value={cmsDrafts.homepageArchitecture.eyebrow}
                    onChange={(event) => updateCmsDraft("homepageArchitecture", { eyebrow: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input
                    type="text"
                    value={cmsDrafts.homepageArchitecture.heading}
                    onChange={(event) => updateCmsDraft("homepageArchitecture", { heading: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageArchitecture.description}
                    onChange={(event) => updateCmsDraft("homepageArchitecture", { description: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.homepageArchitecture.layers.map((layer, index) => (
                <CmsPanelGroup key={layer.id} title={`Layer ${index + 1}`} description={layer.id}>
                  <CmsPanelField label="Label">
                    <input
                      type="text"
                      value={layer.label}
                      onChange={(event) =>
                        updateCmsDraft("homepageArchitecture", {
                          layers: cmsDrafts.homepageArchitecture.layers.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, label: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Title">
                    <input
                      type="text"
                      value={layer.title}
                      onChange={(event) =>
                        updateCmsDraft("homepageArchitecture", {
                          layers: cmsDrafts.homepageArchitecture.layers.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, title: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Description">
                    <textarea
                      value={layer.description}
                      onChange={(event) =>
                        updateCmsDraft("homepageArchitecture", {
                          layers: cmsDrafts.homepageArchitecture.layers.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, description: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Connector label">
                    <input
                      type="text"
                      value={layer.connector ?? ""}
                      onChange={(event) =>
                        updateCmsDraft("homepageArchitecture", {
                          layers: cmsDrafts.homepageArchitecture.layers.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, connector: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
            </>
          ) : null}

          {cmsActiveSection === "homepage.industries" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageIndustries.visible}
                  onChange={(event) => updateCmsDraft("homepageIndustries", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input
                    type="text"
                    value={cmsDrafts.homepageIndustries.eyebrow}
                    onChange={(event) => updateCmsDraft("homepageIndustries", { eyebrow: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input
                    type="text"
                    value={cmsDrafts.homepageIndustries.heading}
                    onChange={(event) => updateCmsDraft("homepageIndustries", { heading: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageIndustries.description}
                    onChange={(event) => updateCmsDraft("homepageIndustries", { description: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
              <CmsPanelGroup title="Featured Industry Media">
                <CmsMediaField
                  label="Featured image"
                  value={cmsDrafts.homepageIndustries.featuredImageSrc}
                  resourceType="image"
                  onChange={(value) => updateCmsDraft("homepageIndustries", { featuredImageSrc: value })}
                />
                <CmsPanelField label="Featured image alt text">
                  <input
                    type="text"
                    value={cmsDrafts.homepageIndustries.featuredImageAlt}
                    onChange={(event) => updateCmsDraft("homepageIndustries", { featuredImageAlt: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
            </>
          ) : null}

          {cmsActiveSection === "homepage.hardware" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageHardware.visible}
                  onChange={(event) => updateCmsDraft("homepageHardware", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHardware.eyebrow}
                    onChange={(event) => updateCmsDraft("homepageHardware", { eyebrow: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHardware.heading}
                    onChange={(event) => updateCmsDraft("homepageHardware", { heading: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea
                    value={cmsDrafts.homepageHardware.description}
                    onChange={(event) => updateCmsDraft("homepageHardware", { description: event.target.value })}
                  />
                </CmsPanelField>
                <CmsPanelField label="CTA label">
                  <input
                    type="text"
                    value={cmsDrafts.homepageHardware.ctaLabel}
                    onChange={(event) => updateCmsDraft("homepageHardware", { ctaLabel: event.target.value })}
                  />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.homepageHardware.cardMedia.map((card, index) => (
                <CmsPanelGroup
                  key={`${hardwareEcosystemContent.cards[index]?.title ?? "hardware"}-${index}`}
                  title={`Hardware Card ${index + 1}`}
                  description={hardwareEcosystemContent.cards[index]?.title}
                >
                  <CmsMediaField
                    label="Card image"
                    value={card.imageSrc}
                    resourceType="image"
                    onChange={(value) =>
                      updateCmsDraft("homepageHardware", {
                        cardMedia: cmsDrafts.homepageHardware.cardMedia.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, imageSrc: value } : item,
                        ),
                      })
                    }
                  />
                  <CmsPanelField label="Card image alt text">
                    <input
                      type="text"
                      value={card.imageAlt}
                      onChange={(event) =>
                        updateCmsDraft("homepageHardware", {
                          cardMedia: cmsDrafts.homepageHardware.cardMedia.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, imageAlt: event.target.value } : item,
                          ),
                        })
                      }
                    />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
            </>
          ) : null}
          {cmsActiveSection === "homepage.trust" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageTrust.visible}
                  onChange={(event) => updateCmsDraft("homepageTrust", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input type="text" value={cmsDrafts.homepageTrust.eyebrow} onChange={(event) => updateCmsDraft("homepageTrust", { eyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input type="text" value={cmsDrafts.homepageTrust.heading} onChange={(event) => updateCmsDraft("homepageTrust", { heading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea value={cmsDrafts.homepageTrust.description} onChange={(event) => updateCmsDraft("homepageTrust", { description: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.homepageTrust.stats.map((stat, index) => (
                <CmsPanelGroup key={`${stat.label}-${index}`} title={`Stat ${index + 1}`} description={stat.label}>
                  <CmsPanelField label="Value">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(event) =>
                        updateCmsDraft("homepageTrust", {
                          stats: cmsDrafts.homepageTrust.stats.map((item, itemIndex) => (itemIndex === index ? { ...item, value: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Label">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(event) =>
                        updateCmsDraft("homepageTrust", {
                          stats: cmsDrafts.homepageTrust.stats.map((item, itemIndex) => (itemIndex === index ? { ...item, label: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
              {cmsDrafts.homepageTrust.reviews.map((review, index) => (
                <CmsPanelGroup key={`${review.platform}-${index}`} title={`Review ${index + 1}`} description={review.platform}>
                  <CmsPanelField label="Platform">
                    <input
                      type="text"
                      value={review.platform}
                      onChange={(event) =>
                        updateCmsDraft("homepageTrust", {
                          reviews: cmsDrafts.homepageTrust.reviews.map((item, itemIndex) => (itemIndex === index ? { ...item, platform: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Score">
                    <input
                      type="text"
                      value={review.score}
                      onChange={(event) =>
                        updateCmsDraft("homepageTrust", {
                          reviews: cmsDrafts.homepageTrust.reviews.map((item, itemIndex) => (itemIndex === index ? { ...item, score: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
            </>
          ) : null}
          {cmsActiveSection === "homepage.results" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageResults.visible}
                  onChange={(event) => updateCmsDraft("homepageResults", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Section Intro">
                <CmsPanelField label="Eyebrow">
                  <input type="text" value={cmsDrafts.homepageResults.eyebrow} onChange={(event) => updateCmsDraft("homepageResults", { eyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Heading line 1">
                  <input
                    type="text"
                    value={cmsDrafts.homepageResults.heading[0]}
                    onChange={(event) => updateCmsDraft("homepageResults", { heading: [event.target.value, cmsDrafts.homepageResults.heading[1]] })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Heading line 2">
                  <input
                    type="text"
                    value={cmsDrafts.homepageResults.heading[1]}
                    onChange={(event) => updateCmsDraft("homepageResults", { heading: [cmsDrafts.homepageResults.heading[0], event.target.value] })}
                  />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea value={cmsDrafts.homepageResults.description} onChange={(event) => updateCmsDraft("homepageResults", { description: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.homepageResults.outcomes.map((outcome, index) => (
                <CmsPanelGroup key={`${outcome.number}-${index}`} title={`Outcome ${index + 1}`} description={outcome.title}>
                  <CmsPanelField label="Number">
                    <input
                      type="text"
                      value={outcome.number}
                      onChange={(event) =>
                        updateCmsDraft("homepageResults", {
                          outcomes: cmsDrafts.homepageResults.outcomes.map((item, itemIndex) => (itemIndex === index ? { ...item, number: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Title">
                    <input
                      type="text"
                      value={outcome.title}
                      onChange={(event) =>
                        updateCmsDraft("homepageResults", {
                          outcomes: cmsDrafts.homepageResults.outcomes.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                  <CmsPanelField label="Description">
                    <textarea
                      value={outcome.description}
                      onChange={(event) =>
                        updateCmsDraft("homepageResults", {
                          outcomes: cmsDrafts.homepageResults.outcomes.map((item, itemIndex) => (itemIndex === index ? { ...item, description: event.target.value } : item)),
                        })
                      }
                    />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
            </>
          ) : null}
          {cmsActiveSection === "homepage.support" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.homepageSupport.visible}
                  onChange={(event) => updateCmsDraft("homepageSupport", { visible: event.target.checked })}
                />
                <span>Show section</span>
              </label>
              <CmsPanelGroup title="Support Intro">
                <CmsPanelField label="Eyebrow">
                  <input type="text" value={cmsDrafts.homepageSupport.eyebrow} onChange={(event) => updateCmsDraft("homepageSupport", { eyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <input type="text" value={cmsDrafts.homepageSupport.heading} onChange={(event) => updateCmsDraft("homepageSupport", { heading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea value={cmsDrafts.homepageSupport.description} onChange={(event) => updateCmsDraft("homepageSupport", { description: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
            </>
          ) : null}
          {cmsActiveSection === "solutions.catalog" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.solutionsCatalog.visible}
                  onChange={(event) => updateCmsDraft("solutionsCatalog", { visible: event.target.checked })}
                />
                <span>Show solutions catalog sections</span>
              </label>
              <CmsPanelGroup title="Hero">
                <CmsPanelField label="Headline">
                  <textarea value={cmsDrafts.solutionsCatalog.heroHeadline} onChange={(event) => updateCmsDraft("solutionsCatalog", { heroHeadline: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Benefit text">
                  <textarea value={cmsDrafts.solutionsCatalog.heroBenefit} onChange={(event) => updateCmsDraft("solutionsCatalog", { heroBenefit: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Primary CTA label">
                  <input type="text" value={cmsDrafts.solutionsCatalog.heroCtaLabel} onChange={(event) => updateCmsDraft("solutionsCatalog", { heroCtaLabel: event.target.value })} />
                </CmsPanelField>
                <CmsMediaField
                  label="Hero background image"
                  value={cmsDrafts.solutionsCatalog.heroImageSrc}
                  resourceType="image"
                  onChange={(value) => updateCmsDraft("solutionsCatalog", { heroImageSrc: value })}
                />
              </CmsPanelGroup>
              <CmsPanelGroup title="Platform Section">
                <CmsPanelField label="Eyebrow">
                  <input type="text" value={cmsDrafts.solutionsCatalog.platformEyebrow} onChange={(event) => updateCmsDraft("solutionsCatalog", { platformEyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <textarea value={cmsDrafts.solutionsCatalog.platformHeading} onChange={(event) => updateCmsDraft("solutionsCatalog", { platformHeading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea value={cmsDrafts.solutionsCatalog.platformDescription} onChange={(event) => updateCmsDraft("solutionsCatalog", { platformDescription: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
              <CmsPanelGroup title="Results Band">
                <CmsPanelField label="Eyebrow">
                  <input type="text" value={cmsDrafts.solutionsCatalog.resultsEyebrow} onChange={(event) => updateCmsDraft("solutionsCatalog", { resultsEyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <textarea value={cmsDrafts.solutionsCatalog.resultsHeading} onChange={(event) => updateCmsDraft("solutionsCatalog", { resultsHeading: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.solutionsCatalog.resultsCards.map((item, index) => (
                <CmsPanelGroup key={`${item.label}-${index}`} title={`Result Card ${index + 1}`}>
                  <CmsPanelField label="Value">
                    <input type="text" value={item.value} onChange={(event) => updateCmsDraft("solutionsCatalog", { resultsCards: cmsDrafts.solutionsCatalog.resultsCards.map((card, cardIndex) => cardIndex === index ? { ...card, value: event.target.value } : card) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Label">
                    <input type="text" value={item.label} onChange={(event) => updateCmsDraft("solutionsCatalog", { resultsCards: cmsDrafts.solutionsCatalog.resultsCards.map((card, cardIndex) => cardIndex === index ? { ...card, label: event.target.value } : card) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Detail">
                    <textarea value={item.detail} onChange={(event) => updateCmsDraft("solutionsCatalog", { resultsCards: cmsDrafts.solutionsCatalog.resultsCards.map((card, cardIndex) => cardIndex === index ? { ...card, detail: event.target.value } : card) })} />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
              <CmsPanelGroup title="Browse + CTA">
                <CmsPanelField label="Browse eyebrow">
                  <input type="text" value={cmsDrafts.solutionsCatalog.browseEyebrow} onChange={(event) => updateCmsDraft("solutionsCatalog", { browseEyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Browse heading">
                  <textarea value={cmsDrafts.solutionsCatalog.browseHeading} onChange={(event) => updateCmsDraft("solutionsCatalog", { browseHeading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Browse description">
                  <textarea value={cmsDrafts.solutionsCatalog.browseDescription} onChange={(event) => updateCmsDraft("solutionsCatalog", { browseDescription: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Featured eyebrow">
                  <input type="text" value={cmsDrafts.solutionsCatalog.featuredEyebrow} onChange={(event) => updateCmsDraft("solutionsCatalog", { featuredEyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Featured heading">
                  <textarea value={cmsDrafts.solutionsCatalog.featuredHeading} onChange={(event) => updateCmsDraft("solutionsCatalog", { featuredHeading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Featured description">
                  <textarea value={cmsDrafts.solutionsCatalog.featuredDescription} onChange={(event) => updateCmsDraft("solutionsCatalog", { featuredDescription: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Library eyebrow">
                  <input type="text" value={cmsDrafts.solutionsCatalog.libraryEyebrow} onChange={(event) => updateCmsDraft("solutionsCatalog", { libraryEyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Library heading">
                  <textarea value={cmsDrafts.solutionsCatalog.libraryHeading} onChange={(event) => updateCmsDraft("solutionsCatalog", { libraryHeading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Bottom CTA eyebrow">
                  <input type="text" value={cmsDrafts.solutionsCatalog.bottomCtaEyebrow} onChange={(event) => updateCmsDraft("solutionsCatalog", { bottomCtaEyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Bottom CTA heading">
                  <textarea value={cmsDrafts.solutionsCatalog.bottomCtaHeading} onChange={(event) => updateCmsDraft("solutionsCatalog", { bottomCtaHeading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Bottom CTA description">
                  <textarea value={cmsDrafts.solutionsCatalog.bottomCtaDescription} onChange={(event) => updateCmsDraft("solutionsCatalog", { bottomCtaDescription: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Primary CTA label">
                  <input type="text" value={cmsDrafts.solutionsCatalog.bottomCtaPrimaryLabel} onChange={(event) => updateCmsDraft("solutionsCatalog", { bottomCtaPrimaryLabel: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Secondary CTA label">
                  <input type="text" value={cmsDrafts.solutionsCatalog.bottomCtaSecondaryLabel} onChange={(event) => updateCmsDraft("solutionsCatalog", { bottomCtaSecondaryLabel: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
            </>
          ) : null}
          {cmsActiveSection === "navigation.solutions-menu" ? (
            <>
              <CmsPanelGroup title="Featured Panel">
                <CmsPanelField label="Label">
                  <input type="text" value={cmsDrafts.solutionsMenu.featuredPanel.label} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, label: event.target.value } })} />
                </CmsPanelField>
                <CmsPanelField label="Title">
                  <textarea value={cmsDrafts.solutionsMenu.featuredPanel.title} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, title: event.target.value } })} />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea value={cmsDrafts.solutionsMenu.featuredPanel.description} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, description: event.target.value } })} />
                </CmsPanelField>
                <CmsPanelField label="CTA label">
                  <input type="text" value={cmsDrafts.solutionsMenu.featuredPanel.ctaLabel} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, ctaLabel: event.target.value } })} />
                </CmsPanelField>
                <CmsPanelField label="CTA href">
                  <input type="text" value={cmsDrafts.solutionsMenu.featuredPanel.ctaHref} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, ctaHref: event.target.value } })} />
                </CmsPanelField>
                <CmsPanelField label="Footer CTA label">
                  <input type="text" value={cmsDrafts.solutionsMenu.featuredPanel.footerCtaLabel} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, footerCtaLabel: event.target.value } })} />
                </CmsPanelField>
                <CmsPanelField label="Footer CTA href">
                  <input type="text" value={cmsDrafts.solutionsMenu.featuredPanel.footerCtaHref} onChange={(event) => updateCmsDraft("solutionsMenu", { featuredPanel: { ...cmsDrafts.solutionsMenu.featuredPanel, footerCtaHref: event.target.value } })} />
                </CmsPanelField>
              </CmsPanelGroup>
              {cmsDrafts.solutionsMenu.columns.map((column, index) => (
                <CmsPanelGroup key={`${column.label}-${index}`} title={`Menu Column ${index + 1}`} description={column.label}>
                  <CmsPanelField label="Column label">
                    <input type="text" value={column.label} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Preview eyebrow">
                    <input type="text" value={column.preview.eyebrow} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, eyebrow: event.target.value } } : item) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Preview title">
                    <textarea value={column.preview.title} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, title: event.target.value } } : item) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Preview description">
                    <textarea value={column.preview.description} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, description: event.target.value } } : item) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Preview CTA label">
                    <input type="text" value={column.preview.ctaLabel} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, ctaLabel: event.target.value } } : item) })} />
                  </CmsPanelField>
                  <CmsPanelField label="Preview href">
                    <input type="text" value={column.preview.href} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, href: event.target.value } } : item) })} />
                  </CmsPanelField>
                  <CmsMediaField
                    label="Preview image"
                    value={column.preview.imageSrc}
                    resourceType="image"
                    onChange={(value) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, imageSrc: value } } : item) })}
                  />
                  <CmsPanelField label="Preview image alt text">
                    <input type="text" value={column.preview.imageAlt} onChange={(event) => updateCmsDraft("solutionsMenu", { columns: cmsDrafts.solutionsMenu.columns.map((item, itemIndex) => itemIndex === index ? { ...item, preview: { ...item.preview, imageAlt: event.target.value } } : item) })} />
                  </CmsPanelField>
                </CmsPanelGroup>
              ))}
              {cmsDrafts.solutionsMenu.columns.map((column, columnIndex) =>
                column.links.map((linkItem, linkIndex) => (
                  <CmsPanelGroup
                    key={`${column.label}-${linkItem.title}-${linkIndex}`}
                    title={`${column.label} Link ${linkIndex + 1}`}
                    description="Edit the visible mega-menu item."
                  >
                    <CmsPanelField label="Title">
                      <input
                        type="text"
                        value={linkItem.title}
                        onChange={(event) =>
                          updateCmsDraft("solutionsMenu", {
                            columns: cmsDrafts.solutionsMenu.columns.map((columnValue, currentColumnIndex) =>
                              currentColumnIndex === columnIndex
                                ? {
                                    ...columnValue,
                                    links: columnValue.links.map((item, currentLinkIndex) =>
                                      currentLinkIndex === linkIndex ? { ...item, title: event.target.value } : item,
                                    ),
                                  }
                                : columnValue,
                            ),
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Description">
                      <textarea
                        value={linkItem.description ?? ""}
                        onChange={(event) =>
                          updateCmsDraft("solutionsMenu", {
                            columns: cmsDrafts.solutionsMenu.columns.map((columnValue, currentColumnIndex) =>
                              currentColumnIndex === columnIndex
                                ? {
                                    ...columnValue,
                                    links: columnValue.links.map((item, currentLinkIndex) =>
                                      currentLinkIndex === linkIndex ? { ...item, description: event.target.value } : item,
                                    ),
                                  }
                                : columnValue,
                            ),
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Link href">
                      <input
                        type="text"
                        value={linkItem.href}
                        onChange={(event) =>
                          updateCmsDraft("solutionsMenu", {
                            columns: cmsDrafts.solutionsMenu.columns.map((columnValue, currentColumnIndex) =>
                              currentColumnIndex === columnIndex
                                ? {
                                    ...columnValue,
                                    links: columnValue.links.map((item, currentLinkIndex) =>
                                      currentLinkIndex === linkIndex ? { ...item, href: event.target.value } : item,
                                    ),
                                  }
                                : columnValue,
                            ),
                          })
                        }
                      />
                    </CmsPanelField>
                  </CmsPanelGroup>
                )),
              )}
            </>
          ) : null}
          {cmsActiveSection.startsWith("solutions.detail.") ? (() => {
            const detailSectionId = cmsActiveSection.replace("solutions.detail.", "");
            const sectionDividerIndex = detailSectionId.lastIndexOf(".");
            const solutionSlug =
              sectionDividerIndex === -1 ? detailSectionId : detailSectionId.slice(0, sectionDividerIndex);
            const solutionSection =
              sectionDividerIndex === -1 ? "overview" : detailSectionId.slice(sectionDividerIndex + 1);
            const solutionDraft = cmsDrafts.solutionDetails[solutionSlug];

            if (!solutionDraft) {
              return null;
            }

            return (
              <>
                <CmsPanelGroup title="Section Scope" description={solutionSlug}>
                  <p className="inline-cms-panel-error">
                    Editing: <strong>{solutionSection}</strong>
                  </p>
                </CmsPanelGroup>
                {solutionSection === "hero" || solutionSection === "overview" || solutionSection === "deployment" ? (
                  <CmsPanelGroup title="Solution Overview">
                    <CmsPanelField label="Title">
                      <input
                        type="text"
                        value={solutionDraft.title}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: { ...solutionDraft, title: event.target.value },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Description">
                      <textarea
                        value={solutionDraft.description}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: { ...solutionDraft, description: event.target.value },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Primary CTA line">
                      <textarea
                        value={solutionDraft.cta}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: { ...solutionDraft, cta: event.target.value },
                          })
                        }
                      />
                    </CmsPanelField>
                  </CmsPanelGroup>
                ) : null}
                {solutionSection === "challenges" ? solutionDraft.challenges.map((challenge, index) => (
                  <CmsPanelGroup key={`${challenge.title}-${index}`} title={`Challenge ${index + 1}`}>
                    <CmsPanelField label="Title">
                      <input
                        type="text"
                        value={challenge.title}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              challenges: solutionDraft.challenges.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, title: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Description">
                      <textarea
                        value={challenge.description}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              challenges: solutionDraft.challenges.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, description: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                  </CmsPanelGroup>
                )) : null}
                {solutionSection === "hardware" ? solutionDraft.hardware.map((hardware, index) => (
                  <CmsPanelGroup key={`${hardware.title}-${index}`} title={`Hardware ${index + 1}`}>
                    <CmsPanelField label="Category">
                      <input
                        type="text"
                        value={hardware.category}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              hardware: solutionDraft.hardware.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, category: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Title">
                      <input
                        type="text"
                        value={hardware.title}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              hardware: solutionDraft.hardware.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, title: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Specs">
                      <input
                        type="text"
                        value={hardware.specs}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              hardware: solutionDraft.hardware.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, specs: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Description">
                      <textarea
                        value={hardware.description}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              hardware: solutionDraft.hardware.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, description: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                  </CmsPanelGroup>
                )) : null}
                {solutionSection === "workflow" ? solutionDraft.useCases.map((useCase, index) => (
                  <CmsPanelGroup key={`${useCase.title}-${index}`} title={`Use Case ${index + 1}`}>
                    <CmsPanelField label="Title">
                      <input
                        type="text"
                        value={useCase.title}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              useCases: solutionDraft.useCases.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, title: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                    <CmsPanelField label="Description">
                      <textarea
                        value={useCase.description}
                        onChange={(event) =>
                          updateCmsDraft("solutionDetails", {
                            [solutionSlug]: {
                              ...solutionDraft,
                              useCases: solutionDraft.useCases.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, description: event.target.value } : item,
                              ),
                            },
                          })
                        }
                      />
                    </CmsPanelField>
                  </CmsPanelGroup>
                )) : null}
                {!["hero", "overview", "deployment", "challenges", "hardware", "workflow"].includes(solutionSection) ? (
                  <CmsPanelGroup
                    title="Derived Section"
                    description="This block is currently driven by shared solution strategy data."
                  >
                    <p className="inline-cms-panel-error">
                      This section has its own edit trigger now, but its custom fields are not separated yet. I can wire this block next.
                    </p>
                  </CmsPanelGroup>
                ) : null}
              </>
            );
          })() : null}
          {cmsActiveSection === "footer.editorial" ? (
            <>
              <label className="inline-cms-panel-toggle">
                <input
                  type="checkbox"
                  checked={cmsDrafts.footerEditorial.visible}
                  onChange={(event) => updateCmsDraft("footerEditorial", { visible: event.target.checked })}
                />
                <span>Show footer editorial</span>
              </label>
              <CmsPanelGroup title="Footer Editorial">
                <CmsPanelField label="Eyebrow">
                  <input type="text" value={cmsDrafts.footerEditorial.eyebrow} onChange={(event) => updateCmsDraft("footerEditorial", { eyebrow: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Heading">
                  <textarea value={cmsDrafts.footerEditorial.heading} onChange={(event) => updateCmsDraft("footerEditorial", { heading: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Description">
                  <textarea value={cmsDrafts.footerEditorial.description} onChange={(event) => updateCmsDraft("footerEditorial", { description: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Contact email">
                  <input type="email" value={cmsDrafts.footerEditorial.contactEmail} onChange={(event) => updateCmsDraft("footerEditorial", { contactEmail: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Primary CTA label">
                  <input type="text" value={cmsDrafts.footerEditorial.primaryCtaLabel} onChange={(event) => updateCmsDraft("footerEditorial", { primaryCtaLabel: event.target.value })} />
                </CmsPanelField>
                <CmsPanelField label="Secondary CTA label">
                  <input type="text" value={cmsDrafts.footerEditorial.secondaryCtaLabel} onChange={(event) => updateCmsDraft("footerEditorial", { secondaryCtaLabel: event.target.value })} />
                </CmsPanelField>
              </CmsPanelGroup>
            </>
          ) : null}
        </div>
      </aside>
    </>
  );
}
