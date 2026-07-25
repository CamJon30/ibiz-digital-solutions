// app/commodities/page.tsx
import type { Metadata } from "next";
import styles from "./Commodities.module.css";

export const metadata: Metadata = {
  title: "Government Supplier | IBIZ Digital Solutions LLC",
  description:
    "IBIZ Digital Solutions LLC — SAM-registered small business supplying office, janitorial, and breakroom commodities to government agencies.",
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
    <main className={styles.main}>
      {/* Header / Capability Statement */}
      <section className={styles.header}>
        <p className={styles.eyebrow}>Government Supplier</p>
        <h1 className={styles.title}>Office, Janitorial &amp; Breakroom Supplies</h1>
        <p className={styles.subtitle}>
          IBIZ Digital Solutions LLC is a small business supplier supporting
          local and state government agencies with reliable sourcing of
          everyday office, janitorial, and breakroom supplies — efficient,
          cost-effective, and flexible enough for one-time purchases or
          recurring replenishment.
        </p>

        <div className={styles.capabilityGrid}>
          {[
            { label: "UEI", value: "D3D1NUFGK994" },
            { label: "CAGE", value: "9YST6" },
            { label: "SAM.gov Status", value: "Active" },
            { label: "Business Type", value: "Small Business" },
          ].map((item) => (
            <div key={item.label} className={styles.capabilityCell}>
              <p className={styles.capabilityLabel}>{item.label}</p>
              <p className={styles.capabilityValue}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commodities grid */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>Product Categories</p>
        <div className={styles.categoryGrid}>
          {commodities.map((group) => (
            <div key={group.category} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{group.category}</h2>
                {group.primary && (
                  <span className={styles.primaryBadge}>Primary</span>
                )}
              </div>
              <div className={styles.naics}>
                NAICS <span className={styles.naicsValue}>{group.naics}</span>
              </div>
              <ul className={styles.itemList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.dot} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>Why IBIZ</p>
        <div className={styles.diffGrid}>
          {differentiators.map((d) => (
            <div key={d.title} className={styles.diffCard}>
              <h3 className={styles.diffTitle}>{d.title}</h3>
              <p className={styles.diffBody}>{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RFQ / Contact CTA */}
      <section className={styles.section}>
        <div className={styles.ctaCard}>
          <p className={styles.eyebrow}>Request A Quote</p>
          <h2 className={styles.ctaTitle}>
            Sourcing for a contract, task order, or open-market buy?
          </h2>
          <p className={styles.ctaBody}>
            Share your requirement — item, quantity, and delivery location —
            and IBIZ will return a quote sourced through our supplier network.
          </p>
          <div className={styles.ctaRow}>
            <a
              href="mailto:cameron@ibizdigitalsolutions.com?subject=Commodities%20RFQ"
              className={styles.ctaButton}
            >
              Request a quote
            </a>
            <a href="tel:+19105832746" className={styles.ctaPhone}>
              (910) 583-2746
            </a>
          </div>
          <p className={styles.ctaContact}>
            Cameron Jones · Founder ·{" "}
            <a href="mailto:cameron@ibizdigitalsolutions.com">
              cameron@ibizdigitalsolutions.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
