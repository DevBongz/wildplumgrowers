# Wild Plum Growers — Quote scope breakdown

**Quote:** CODE RIFFS · #10002 · dated 2026/03/18 · **Total: R54,800.00** (incl. four line items)

This document expands each quoted line into **what will be delivered** and **what the work entails**, so the scope is clear beyond the high-level titles on the quote.

---

## 1. Overview — how the four items fit together

```mermaid
flowchart TB
  subgraph client["Client outcome"]
    OUT["Live ecommerce brand site customers can browse, trust, and buy from"]
  end

  subgraph WD["Website Development — R25,000"]
    WD1["Brand-led UI, pages, performance, forms, legal pages"]
  end

  subgraph CMS["CMS Integration — R8,500"]
    C1["Editable content without code; products synced from commerce backend"]
  end

  subgraph SEO["SEO & Marketing Kit — R8,300"]
    S1["Discoverability, analytics, campaign assets & handover"]
  end

  subgraph EC["Ecommerce Development — R13,000"]
    E1["Catalog, cart, checkout, orders, payments path"]
  end

  WD --> OUT
  CMS --> WD
  CMS --> EC
  SEO --> OUT
  EC --> OUT
```

---

## 2. Detailed breakdown (mind map)

```mermaid
mindmap
  root((Wild Plum<br/>ecommerce scope))
    Website Development
      Discovery and IA
        Sitemap and key user journeys
        Wireframes or page-level structure
        Mobile-first layout system
      Frontend build
        Next.js app routes and components
        Design system: typography, spacing, colour
        Reusable sections: hero, story, contact
        Accessibility basics: focus, contrast, semantics
      Quality and launch
        Cross-browser and device testing
        Performance: images, fonts, Core Web Vitals awareness
        Error states and empty states
        Deployment pipeline and production URL
    CMS Integration
      Content model
        Pages vs reusable blocks or entries
        Media library and image handling
      Editorial workflow
        Draft or preview if applicable
        Who edits what: training notes or short session
      Commerce-backed content
        Product data sourced from Shopify or linked CMS fields
        Single source of truth for copy that appears on PDP and listings
    SEO and Marketing Kit
      Technical SEO
        Titles, meta descriptions, canonicals
        Structured data where relevant
        Sitemap and robots
        Page speed and image hygiene
      Measurement
        Analytics and conversion events outline
        Search console setup guidance
      Campaigns kit
        Ad creative specs and initial campaign structure
        UTM conventions and landing alignment
        Handover checklist for ongoing marketing
    Ecommerce Development
      Storefront
        Product listing, filtering, product detail
        Inventory and variant behaviour as configured in Shopify
      Cart and checkout
        Cart persistence and line-item accuracy
        Handoff to Shopify Checkout
        Shipping rules surfaced on site where applicable
      Trust and operations
        Order confirmation path; customer communication via Shopify
        Policies linked from footer and checkout
        Basic troubleshooting runbook for common issues
```

---

## 3. Line-by-line: quote title → concrete work

```mermaid
flowchart TB
  Q1["1. Website Development — R25,000"]
  Q1 --> W1["IA, responsive UI, Next.js pages, forms, performance, deploy, QA"]

  Q2["2. CMS Integration — R8,500"]
  Q2 --> W2["Editable pages/blocks, media, workflow, align copy with Shopify products"]

  Q3["3. SEO & Marketing Kit — R8,300"]
  Q3 --> W3["Meta, structured data, sitemap/robots, analytics, campaign kit, UTMs"]

  Q4["4. Ecommerce Development — R13,000"]
  Q4 --> W4["PLP/PDP, cart, Shopify checkout, variants, shipping display, policies"]
```

| # | Quoted item | Amount | What you get (deliverables) | What the work entails |
|---|-------------|--------|----------------------------|------------------------|
| 1 | **Website Development** | R25,000.00 | Public site: home, story, contact, shop entry, shared header/footer, responsive layout, deployment to production, basic QA. | UX structure aligned to Wild Plum; Next.js/React implementation; brand styling; forms and validation; performance-conscious assets; staging-to-production workflow. |
| 2 | **CMS Integration** | R8,500.00 | Content editable in the CMS for agreed page types; images and copy manageable without deployments for routine updates; products remain driven by Shopify where applicable. | Content schema or sections; connection between CMS and the front end; editorial guidelines; optional preview depending on stack; coordination so product copy and CMS copy do not conflict. |
| 3 | **SEO & Marketing Kit (incl. ad campaigns)** | R8,300.00 | On-page SEO baseline, analytics hookup plan, Search Console orientation, initial paid-social/search campaign structure and creative specs, UTM and tracking hygiene. | Keyword and page mapping; meta and structured data; sitemap/robots; collaboration on ad audiences and creatives; not an open-ended unlimited ad spend—**media spend is separate** from this fee unless otherwise agreed. |
| 4 | **Ecommerce Development** | R13,000.00 | Shop experience: browse, product pages, cart, secure checkout via Shopify, order flow; integration with Shopify Storefront/cart APIs as designed for this project. | Product data model in Shopify; variant and pricing rules; checkout and payment compliance via Shopify; cart edge cases; shipping display rules agreed with you; post-launch bugfix window as per contract. |

---

## 4. Dependency view (what depends on what)

```mermaid
flowchart TD
  WD["Website Development<br/>shell, brand UI, pages"]
  CMS["CMS Integration<br/>editable marketing content"]
  EC["Ecommerce Development<br/>Shopify catalog, cart, checkout"]
  SEO["SEO & Marketing Kit<br/>measurement and campaigns"]

  WD --> EC
  EC --> SEO
  CMS --> WD
  CMS -.-> EC

  classDef core fill:#f4f4f5,stroke:#71717a;
  class WD,EC,CMS,SEO core;
```

**Reading the diagram:** Ecommerce sits on top of the site shell (**Website Development**). **CMS** feeds marketing pages and may align copy with product storytelling. **SEO & Marketing** is most effective once URLs, products, and analytics exist (**Ecommerce** + **Website**).

---

## 5. Out of scope (typical clarifications)

These are **not** implied by the four titles unless explicitly added to a statement of work:

- Open-ended **ad media budget** (separate from setup and kit).
- Custom **ERP, accounting, or warehouse** integrations beyond Shopify’s standard features.
- **Photography or video** production (unless contracted separately).
- **Ongoing retainers** for SEO or ads after the agreed kit and handover.

---

*This breakdown describes the **substance** behind quote #10002. Exact timelines, revision rounds, and warranty periods should match your signed agreement with CODE RIFFS.*
