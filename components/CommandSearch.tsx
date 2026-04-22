"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";

import { getProductHref, productsList } from "@/data/products";
import { industriesList } from "@/lib/industries";
import { resolveCloudinaryAsset } from "@/lib/cloudinary-assets";
import { startRouteLoader } from "@/lib/route-loader";
import { solutionsList } from "@/lib/solutions";

type CommandResult = {
  id: string;
  group: string;
  title: string;
  description: string;
  href: string;
  meta: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClass?: string;
};

type CommandResultGroup = {
  label: string;
  items: CommandResult[];
};

const isPresent = <T,>(value: T | null): value is T => value !== null;

const MIN_SEARCH_LENGTH = 2;

const scoreSearchMatch = (query: string, title: string, fields: string[]) => {
  if (query.length < MIN_SEARCH_LENGTH) {
    return null;
  }

  const tokens = query
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const haystack = fields.join(" ").toLowerCase();
  let score = 0;

  for (const token of tokens) {
    const index = haystack.indexOf(token);
    if (index === -1) {
      return null;
    }

    score += 110 - Math.min(index, 90);
  }

  const normalizedTitle = title.toLowerCase();
  const titleIndex = normalizedTitle.indexOf(query);

  if (titleIndex >= 0) {
    score += 200 - Math.min(titleIndex, 80);
  }

  if (normalizedTitle.startsWith(query)) {
    score += 90;
  }

  return score;
};

const quickLinks: CommandResult[] = [
  {
    id: "quick-products",
    group: "Quick Links",
    title: "Browse Products",
    description: "Explore tracking, video, sensors, and accessories.",
    href: "/products",
    meta: "Catalog",
  },
  {
    id: "quick-solutions",
    group: "Quick Links",
    title: "Browse Solutions",
    description: "Open solution workflows by hardware capability.",
    href: "/solutions",
    meta: "Solutions",
  },
  {
    id: "quick-industries",
    group: "Quick Links",
    title: "Browse Industries",
    description: "See hardware by transportation, logistics, and field use.",
    href: "/industries",
    meta: "Industries",
  },
  {
    id: "quick-compare",
    group: "Quick Links",
    title: "Compare Hardware",
    description: "Open the product comparison workspace.",
    href: "/compare",
    meta: "Compare",
  },
  {
    id: "quick-favorites",
    group: "Quick Links",
    title: "Saved Products",
    description: "Review your favorited hardware shortlist.",
    href: "/favorites",
    meta: "Favorites",
  },
];

export function CommandSearch({
  currentQuery = "",
  placeholder,
  onOpen,
}: {
  currentQuery?: string;
  placeholder: string;
  onOpen?: () => void;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(currentQuery);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.classList.add("command-search-open");
    inputRef.current?.focus();

    return () => {
      document.body.classList.remove("command-search-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const onWindowKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen?.();
        setQuery(currentQuery);
        setSelectedIndex(0);
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onWindowKeyDown);

    return () => {
      window.removeEventListener("keydown", onWindowKeyDown);
    };
  }, [currentQuery, onOpen]);

  const resultGroups = useMemo<CommandResultGroup[]>(() => {
    if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
      return [
        {
          label: "Quick Links",
          items: quickLinks,
        },
      ];
    }

    const scoredProductItems = productsList
      .map((product) => {
        const score = scoreSearchMatch(normalizedQuery, product.title, [
          product.title,
          product.categoryLabel,
          product.shortDescription,
          ...product.specs,
          ...product.features,
          ...product.useCases,
        ]);

        if (score === null) {
          return null;
        }

        return {
          id: `product-${product.id}`,
          group: "Products",
          title: product.title,
          description: product.shortDescription,
          href: getProductHref(product.id),
          meta: product.categoryLabel,
          imageSrc: resolveCloudinaryAsset(product.imageSrc),
          imageAlt: product.imageAlt,
          imageClass: product.imageClass,
          score,
        };
      })
      .filter(isPresent);

    const productItems: CommandResult[] = scoredProductItems.sort((a, b) => b.score - a.score).slice(0, 4);

    const scoredSolutionItems = solutionsList
      .map((solution) => {
        const score = scoreSearchMatch(normalizedQuery, solution.title, [
          solution.title,
          solution.description,
          solution.cta,
          ...solution.challenges.flatMap((item) => [item.title, item.description]),
          ...solution.hardware.flatMap((item) => [item.title, item.specs, item.description, item.category]),
          ...solution.useCases.flatMap((item) => [item.title, item.description]),
        ]);

        if (score === null) {
          return null;
        }

        return {
          id: `solution-${solution.slug}`,
          group: "Solutions",
          title: solution.title,
          description: solution.description,
          href: `/solutions/${solution.slug}`,
          meta: "Solution",
          score,
        };
      })
      .filter(isPresent);

    const solutionItems: CommandResult[] = scoredSolutionItems.sort((a, b) => b.score - a.score).slice(0, 4);

    const scoredIndustryItems = industriesList
      .map((industry) => {
        const score = scoreSearchMatch(normalizedQuery, industry.title, [
          industry.title,
          industry.description,
          industry.cta,
          ...industry.challenges.flatMap((item) => [item.title, item.description]),
          ...industry.hardware.flatMap((item) => [item.title, item.specs, item.description, item.category]),
          ...industry.useCases.flatMap((item) => [item.title, item.description]),
        ]);

        if (score === null) {
          return null;
        }

        return {
          id: `industry-${industry.slug}`,
          group: "Industries",
          title: industry.title.replace(/\s+Hardware Solutions$/i, ""),
          description: industry.description,
          href: `/industries/${industry.slug}`,
          meta: "Industry",
          score,
        };
      })
      .filter(isPresent);

    const industryItems: CommandResult[] = scoredIndustryItems.sort((a, b) => b.score - a.score).slice(0, 4);

    return [
      { label: "Products", items: productItems },
      { label: "Solutions", items: solutionItems },
      { label: "Industries", items: industryItems },
      {
        label: "Quick Action",
        items: [
          {
            id: "query-products",
            group: "Quick Action",
            title: `Search products for "${deferredQuery.trim()}"`,
            description: "Open the full products catalog with this search applied.",
            href: `/products?q=${encodeURIComponent(deferredQuery.trim())}`,
            meta: "Catalog search",
          },
        ],
      },
    ].filter((group) => group.items.length > 0);
  }, [deferredQuery, normalizedQuery]);

  const flattenedResults = useMemo(
    () => resultGroups.flatMap((group) => group.items),
    [resultGroups],
  );
  const activeSelectedIndex =
    flattenedResults.length === 0 ? -1 : Math.min(Math.max(selectedIndex, 0), flattenedResults.length - 1);

  useEffect(() => {
    if (activeSelectedIndex < 0) {
      return;
    }

    resultRefs.current[activeSelectedIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeSelectedIndex]);

  const closePalette = () => {
    setIsOpen(false);
  };

  const openResult = (href: string) => {
    closePalette();
    startRouteLoader();
    router.push(href);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!flattenedResults.length) {
        return;
      }

      setSelectedIndex((currentValue) => {
        const baseIndex = currentValue < 0 ? 0 : currentValue;
        return (baseIndex + 1) % flattenedResults.length;
      });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!flattenedResults.length) {
        return;
      }

      setSelectedIndex((currentValue) => {
        if (currentValue <= 0) {
          return flattenedResults.length - 1;
        }

        return currentValue - 1;
      });
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (activeSelectedIndex >= 0 && flattenedResults[activeSelectedIndex]) {
        openResult(flattenedResults[activeSelectedIndex].href);
        return;
      }

      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        openResult(`/products?q=${encodeURIComponent(trimmedQuery)}`);
      }
    }
  };

  const openPalette = () => {
    onOpen?.();
    setQuery(currentQuery);
    setSelectedIndex(0);
    setIsOpen(true);
  };

  const paletteContent = isOpen ? (
    <div className="command-search-backdrop" onClick={closePalette}>
      <div
        className="command-search-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-search-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="command-search-header">
          <div className="command-search-input-shell">
            <Search size={18} strokeWidth={1.9} aria-hidden="true" />
            <label className="sr-only" htmlFor="command-search-input">
              {placeholder}
            </label>
            <input
              ref={inputRef}
              id="command-search-input"
              className="command-search-input"
              type="search"
              placeholder={placeholder}
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="command-search-close"
              type="button"
              aria-label="Close command search"
              onClick={closePalette}
            >
              <X size={16} strokeWidth={1.9} />
            </button>
          </div>
          <div className="command-search-meta">
            <p className="command-search-title" id="command-search-title">
              Search products, solutions, and industries
            </p>
            <p className="command-search-hint">
              Use <kbd>Up</kbd><kbd>Down</kbd> and <kbd>Enter</kbd>.
            </p>
          </div>
        </div>

        <div className="command-search-results" role="listbox" aria-label="Command search results">
          {resultGroups.map((group) => (
            <section className="command-search-group" key={group.label} aria-label={group.label}>
              <div className="command-search-group-header">
                <span>{group.label}</span>
              </div>
              <div className="command-search-group-list">
                {group.items.map((item) => {
                  const resultIndex = flattenedResults.findIndex((result) => result.id === item.id);
                  const isSelected = resultIndex === activeSelectedIndex;

                  return (
                    <button
                      key={item.id}
                      ref={(node) => {
                        resultRefs.current[resultIndex] = node;
                      }}
                      className={`command-search-result${isSelected ? " is-selected" : ""}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected ? "true" : "false"}
                      onMouseEnter={() => setSelectedIndex(resultIndex)}
                      onClick={() => openResult(item.href)}
                    >
                      {item.imageSrc ? (
                        <span className="command-search-result-media" aria-hidden="true">
                          <Image
                            className={`catalog-card-image ${item.imageClass ?? ""}`}
                            src={item.imageSrc}
                            alt={item.imageAlt ?? item.title}
                            width={52}
                            height={40}
                          />
                        </span>
                      ) : (
                        <span className="command-search-result-pill" aria-hidden="true">
                          {item.group.slice(0, 1)}
                        </span>
                      )}
                      <span className="command-search-result-copy">
                        <span className="command-search-result-topline">
                          <span className="command-search-result-title">{item.title}</span>
                          <span className="command-search-result-meta-tag">{item.meta}</span>
                        </span>
                        <span className="command-search-result-description">{item.description}</span>
                      </span>
                      <span className="command-search-result-arrow" aria-hidden="true">
                        {isSelected ? <CornerDownLeft size={15} strokeWidth={1.8} /> : <ArrowRight size={15} strokeWidth={1.8} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          {normalizedQuery.length >= MIN_SEARCH_LENGTH && !flattenedResults.length ? (
            <div className="command-search-empty">
              <p>No result found for &quot;{deferredQuery.trim()}&quot;.</p>
              <button
                className="command-search-empty-action"
                type="button"
                onClick={() => openResult(`/products?q=${encodeURIComponent(deferredQuery.trim())}`)}
              >
                Search full products catalog <ArrowRight size={15} strokeWidth={1.8} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        className="nav-utility nav-command-trigger"
        type="button"
        aria-label="Open command search"
        onClick={openPalette}
      >
        <Search size={18} strokeWidth={1.9} />
        <span className="nav-command-shortcut" aria-hidden="true">
          <span>Ctrl</span>
          <span>K</span>
        </span>
      </button>
      {isOpen ? createPortal(paletteContent, document.body) : null}
    </>
  );
}
