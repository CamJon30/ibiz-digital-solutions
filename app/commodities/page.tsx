// app/commodities/page.tsx
// Government Supplier — Commodities subpage for IBIZ Digital Solutions LLC
// Matches existing site design system: #0a0a0a bg, #111111 cards, #1a1a1a borders, #00c853 accent

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Supplier | IBIZ Digital Solutions LLC",
  description:
    "IBIZ Digital Solutions LLC — SAM-registered Small Disadvantaged Business supplying office and facility commodities to federal, state, and local government buyers.",
};

type Commodity = {
  category: string;
  naics: string;
  primary?: boolean;
  items: string[];
};

const commodities: Commodity[] = [
  {
    category: "Office & Stationery Supplies",
    naics: "424120",
    primary: true,
    items: [
      "General office & stationery supplies",
      "Copy paper",
      "Printer ink & toner",
    ],
  },
  {
    category: "Paper & Industrial Products",
    naics: "424130",
    items: ["Paper towels", "Toilet paper", "Industrial & personal service paper goods"],
  },
  {
    category: "Janitorial & Cleaning Supplies",
    naics: "423840",
    items: ["Cleaning supplies", "Industrial & janitorial products"],
  },
  {
    category: "Breakroom & Coffee Supplies",
    naics: "445298",
    items: ["Breakroom supplies", "Coffee & specialty items"],
  },
];

const differentiators = [
  {
    title: "Local Small Business Supplier",
    body: "Supporting agencies with responsive, community-based service.",
  },
  {
    title: "Flexible Sourcing",
    body: "Able to support small purchases, trial orders, and recurring supply needs.",
  },
  {
    title: "Cost-Effective Fulfillment",
    body: "Competitive sourcing aligned with agency budget requirements.",
  },
  {
    title: "Procurement-Ready",
    body: "Registered and active in SAM.gov with experience supporting government purchasing processes.",
  },
  {
    title: "Reliable & Responsive",
    body: "Clear communication, timely order coordination, and dependable delivery support.",
  },
];

export default function CommoditiesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header / Capability Statement */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00c853]">
          Government Supplier
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Office, Janitorial &amp; Breakroom Supplies
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
          IBIZ Digital Solutions LLC is a small business supplier supporting
          local and state government agencies with reliable sourcing of
          everyday office, janitorial, and breakroom supplies — efficient,
          cost-effective, and flexible enough for one-time purchases or
          recurring replenishment.
        </p>

        {/* Capability statement strip */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#1a1a1a] bg-[#1a1a1a] sm:grid-cols-4">
          {[
            { label: "UEI", value: "D3D1NUFGK994" },
            { label: "CAGE", value: "9YST6" },
            { label: "SAM.gov Status", value: "Active" },
            { label: "Business Type", value: "Small Business" },
          ].map((item) => (
            <div key={item.label} className="bg-[#111111] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#00c853]">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Commodities grid */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00c853]">
          Product Categories
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {commodities.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">
                  {group.category}
                </h2>
                {group.primary && (
                  <span className="flex-none rounded-full border border-[#00c853]/30 bg-[#00c853]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00c853]">
                    Primary
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-neutral-500">
                NAICS <span className="text-neutral-300">{group.naics}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-400"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[#00c853]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00c853]">
          Why IBIZ
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-5"
            >
              <h3 className="text-sm font-semibold text-white">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RFQ / Contact CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00c853]">
            Request A Quote
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Sourcing for a contract, task order, or open-market buy?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Share your requirement — item, quantity, and delivery location —
            and IBIZ will return a quote sourced through our supplier network.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="mailto:cameron@ibizdigitalsolutions.com?subject=Commodities%20RFQ"
              className="inline-block rounded-md bg-[#00c853] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Request a quote
            </a>
            <a
              href="tel:+19105832746"
              className="text-sm font-medium text-neutral-400 transition hover:text-white"
            >
              (910) 583-2746
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-500">
            Cameron Jones · Founder ·{" "}
            <a
              href="mailto:cameron@ibizdigitalsolutions.com"
              className="text-neutral-400 hover:text-white"
            >
              cameron@ibizdigitalsolutions.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
