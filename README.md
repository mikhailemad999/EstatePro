# EstatePro — Sovereign Private Reserve Luxury Real Estate Platform

An ultra-prime, institutional-grade luxury real estate marketplace and asset management portal built strictly to the specifications of `recuremint.md` and the **Obsidian Scholar / Private Reserve** design system from `stitch_estatepro_real_estate_design_system`.

---

## 📸 Visual Showcase & Platform Tour

### 1. Curated Homepage & Prime Market Telemetry
![Homepage Hero](./public/screenshots/homepage_hero_1788909262022.png)
*Hero section with multi-tab search (Buy, Rent, Commercial, Developments) and real-time sovereign wealth pulse ($1.42B Assets Under Custody, 84 Global Hubs).*

![Homepage Trophy Estates](./public/screenshots/homepage_stats_estates_1788909269736.png)
*Landmark trophy estates showcase featuring Swiss cantonal palazzos, Tribeca duplexes, and Kyoto sanctuaries.*

---

### 2. Dual-Pane Split-Screen Map & Filter Search
![Split Screen Map Search](./public/screenshots/properties_split_map_1788909289093.png)
*Interactive vector map canvas on the right with dynamic price pin markers (`$52.0M`, `$44.0M`), paired with luxury listing cards on the left.*

---

### 3. Luxury Rentals & Commercial Private Banking HQs
![Rental Estates Filter](./public/screenshots/rental_properties_tested_1788909769716.png)
*Long-term diplomatic and seasonal private luxury leases (Lake Lugano lakefront compound, Tribeca cast-iron sky lease).*

![Commercial HQs Filter](./public/screenshots/commercial_properties_tested_1788909919737.png)
*Commercial sovereign headquarters and private banking galleries on Geneva's ultra-prestigious Rue du Rhône.*

---

### 4. Estate Architectural Monograph & Specifications
![Property Detail Monograph](./public/screenshots/property_detail_monograph_1788909308731.png)
*High-resolution gallery, title notarization credentials, and architectural narrative for Palais de la Rive Waterfront Estate ($52.0M).*

![Architectural Metrics & VIP Booking](./public/screenshots/property_detail_metrics_cta_1788909323172.png)
*8-point technical specifications matrix (Interior m², Land m², Living Salons, Year Built) and VIP viewing scheduler.*

---

### 5. Multi-Property Comparison Matrix
![Comparison Matrix](./public/screenshots/compare_matrix_page_1788909887549.png)
*Side-by-side sticky column comparison across price, m² valuations, carrying charges, architectural typologies, and legal verification.*

---

### 6. Private Wealth Mortgage & Debt Engine
![Mortgage Calculator](./public/screenshots/mortgage_calculator_initial_1788909352139.png)
*Live debt service modeling with dynamic acquisition sliders and monthly payment obligations breakdown.*

![Amortization Schedule](./public/screenshots/mortgage_amortization_schedule_1788909371735.png)
*10-year principal amortization schedule and direct private wealth pre-approval underwriter filing.*

---

### 7. Masterplan Developments & Private Advisors
![Development Project Detail](./public/screenshots/development_detail_tested_1788910010447.png)
*Off-plan masterplan development tracking with multi-phase completion timeline, interactive floorplates, and units inventory table.*

![Agent Profile & Mandate Book](./public/screenshots/agent_profile_tested_1788910097455.png)
*Licensed private advisor dossier with experience ratings, active mandate volume, and direct encrypted contact channel.*

---

### 8. Institutional Research Monographs
![Research Monograph](./public/screenshots/monograph_detail_page_1788910817828.png)
*Sovereign wealth migration analysis with executive summary callouts, macro yield forecasts, and client-side PDF monograph export.*

---

### 9. VIP Aviation & Helicopter Charter Concierge
![VIP Aviation Concierge](./public/screenshots/vip_viewing_charter_flow_1788909399877.png)
*Private aviation flight scheduler with FBO arrival ports, AgustaWestland AW109 helicopter transit, and diplomatic discretion guarantees.*

---

### 10. Agent CRM Command & 7-Stage Pipeline Kanban
![Agent CRM Kanban](./public/screenshots/agent_leads_kanban_tested_1788910370295.png)
*7-stage interactive Kanban board (New, Contacted, Qualified, VIP Viewing, Negotiation, Term Sheet, Won) with instant stage progression and lead capture modal.*

![Listing Wizard Workflow](./public/screenshots/create_property_wizard_step2_1788910483441.png)
*6-step listing submission wizard: Typology, Geo-Location, Pricing, Architectural Specs, Media, and Compliance Review.*

---

### 11. Super Admin Tier-0 Overseer Governance
![Admin Overseer Telemetry](./public/screenshots/admin_overseer_telemetry_1788909449996.png)
*Real-time platform gross volume (GMV), MySQL Cluster 3305 node health, and transaction clearing overview.*

![Listing Certification Queue](./public/screenshots/admin_approvals_tested_1788910533240.png)
*Listing compliance verification queue with live **Certify & Publish** and **Reject** overseer determination controls.*

![System Audit Ledger](./public/screenshots/admin_audit_logs_tested_1788910609624.png)
*Tamper-evident cryptographic audit ledger tracking all title transfers, escrow locks, and administrative actions.*

---

## 🏛️ Comprehensive Directory of Routes & Portals

### 1. Public Marketplace & Search
| Route | URL | Description |
|---|---|---|
| **Homepage & Pulse** | [`/`](http://localhost:3000/) | Hero multi-tab search (Buy, Rent, Commercial, Developments), live market pulse metrics ($1.42B Assets Under Custody), featured landmark estates, and aviation concierge teaser. |
| **Properties Split Map Search** | [`/properties`](http://localhost:3000/properties) | Dual-pane split screen: listing cards on the left, interactive vector map canvas with dynamic price pins on the right. Filter by typology, listing type, bedrooms, and price. |
| **For Sale Filter** | [`/properties?listingType=FOR_SALE`](http://localhost:3000/properties?listingType=FOR_SALE) | Trophy estates available for acquisition. |
| **For Rent Filter** | [`/properties?listingType=FOR_RENT`](http://localhost:3000/properties?listingType=FOR_RENT) | Long-term diplomatic and seasonal private luxury leases (Lake Lugano villa, Tribeca duplex). |
| **Commercial Filter** | [`/properties?propertyType=Commercial`](http://localhost:3000/properties?propertyType=Commercial) | Institutional commercial HQs, private banking galleries, and bullion vault compounds. |
| **Estate Monograph Detail** | [`/property/[slug]`](http://localhost:3000/property/palais-de-la-rive-waterfront-estate) | Full architectural monograph: 8-metric technical specifications grid, high-res gallery, FINMA/SEC title certification, mortgage estimator, and VIP viewing modal. |
| **Comparison Matrix** | [`/compare`](http://localhost:3000/compare) | Sticky side-by-side comparison matrix evaluating architectural specs, unit pricing, carrying charges, and legal status across shortlisted estates. |
| **Private Mortgage Engine** | [`/mortgage-calculator`](http://localhost:3000/mortgage-calculator) | Real-time debt modeling with acquisition sliders, monthly breakdown (P&I, taxes, insurance), 10-year equity growth schedule, and pre-approval lead filing. |

### 2. Specialized Services & Directories
| Route | URL | Description |
|---|---|---|
| **Masterplan Developments** | [`/developments`](http://localhost:3000/developments) | Directory of off-plan architectural developments and sustainable micro-grid masterplans. |
| **Development Project Detail** | [`/developments/[slug]`](http://localhost:3000/developments/obersee-monolith-masterplan) | Detailed development timeline, completion phases, interactive floorplate viewer, and available units inventory table. |
| **Sovereign Brokers** | [`/agents`](http://localhost:3000/agents) | Roster of licensed private advisors, experience ratings, active mandate books, and direct encrypted inquiries. |
| **Advisor Profile** | [`/agents/[slug]`](http://localhost:3000/agents/kenjiro-takahashi) | Comprehensive advisor bio, transaction track record, active portfolio, and booking modal. |
| **Brokerage Agencies** | [`/agencies`](http://localhost:3000/agencies) | Directory of accredited institutional brokerages and private reserve partner firms. |
| **Research Monographs** | [`/reports`](http://localhost:3000/reports) | Quarterly publications analyzing super-prime residential valuations, global wealth migrations, and prime yields. |
| **Monograph Detail** | [`/reports/[slug]`](http://localhost:3000/reports/sovereign-wealth-migration-index-2026) | Full editorial report with Executive Summary callout, deep narrative analysis, and client-side PDF export button. |
| **VIP Aviation Concierge** | [`/vip-viewing`](http://localhost:3000/vip-viewing) | Private aviation flight scheduler with FBO arrival ports, AgustaWestland AW109 helicopter transit, and diplomatic discretion guarantees. |
| **Virtual Escrow Data Room** | [`/escrow/[id]`](http://localhost:3000/escrow/cm7sovereign01) | Multi-signature digital closing room with 5-stage milestone tracker, AML clearance audits, and encrypted deed downloads. |

### 3. Role Portals
| Portal | URL | Target Role | Key Features |
|---|---|---|---|
| **Agent Command Dashboard** | [`/agent/dashboard`](http://localhost:3000/agent/dashboard) | `AGENT` | Mandate volume telemetry, quick KPI widgets, and active listings list. |
| **Lead Pipeline Kanban** | [`/agent/leads`](http://localhost:3000/agent/leads) | `AGENT` | 7-stage interactive Kanban board with drag/advance buttons and "Capture Private Lead" modal. |
| **Listing Inventory** | [`/agent/properties`](http://localhost:3000/agent/properties) | `AGENT` | Inventory table of agent's assigned and published mandates with edit links. |
| **Listing Wizard** | [`/agent/properties/create`](http://localhost:3000/agent/properties/create) | `AGENT` | 6-step wizard: Typology, Geo-Location, Pricing, Architectural Specs, Media, and Compliance Review. |
| **Buyer Sovereign Vault** | [`/dashboard`](http://localhost:3000/dashboard) | `BUYER` | Portfolio overview, acquisition pipeline, and quick actions. |
| **Saved Collections** | [`/dashboard/saved`](http://localhost:3000/dashboard/saved) | `BUYER` | Shortlisted trophy estates saved via heart buttons on cards or detail pages. |
| **Viewing Itineraries** | [`/dashboard/appointments`](http://localhost:3000/dashboard/appointments) | `BUYER` | Scheduled property viewings and VIP aviation flight bookings. |
| **Overseer Executive Telemetry** | [`/admin`](http://localhost:3000/admin) | `SUPER_ADMIN` | Platform GMV analytics, cluster node health, and audit trail overview. |
| **Listing Compliance Queue** | [`/admin/approvals`](http://localhost:3000/admin/approvals) | `SUPER_ADMIN` | Listing verification queue with instant **Certify & Publish** and **Reject** buttons. |
| **Financial Crime & AML** | [`/admin/fraud`](http://localhost:3000/admin/fraud) | `SUPER_ADMIN` | Automated Bank Secrecy Act (BSA), FinCEN AML screening, and suspicious escrow wire freezes. |
| **User Directory & RBAC** | [`/admin/users`](http://localhost:3000/admin/users) | `SUPER_ADMIN` | Identity directory with role clearances (`BUYER`, `AGENT`, `DEVELOPER`, `SUPER_ADMIN`). |
| **System Audit Ledger** | [`/admin/audit`](http://localhost:3000/admin/audit) | `SUPER_ADMIN` | Tamper-evident, immutable audit trail of all title transfers, escrow locks, and administrative overrides. |

---

## ⚡ API Route Handlers

The backend exposes full RESTful endpoints under `src/app/api/`:

- `GET /api/properties`: Search and filter properties by query, city, propertyType, price range, bedrooms, and status.
- `POST /api/properties`: Create and catalog new luxury property listings with auto-generated reference codes and audit logs.
- `GET /api/crm/leads`: Fetch leads filtered by agent or pipeline stage.
- `POST /api/crm/leads`: Capture and onboard new private client mandate leads.
- `PATCH /api/crm/leads`: Update lead pipeline stage, scoring, or confidential notes.
- `GET /api/appointments`: Fetch viewing and flight itineraries.
- `POST /api/appointments`: Schedule property viewings or VIP aviation charter flights.
- `POST /api/mortgage/calculate`: Calculate debt service schedule and file pre-approval applications.
- `POST /api/admin/approvals`: Overseer determination endpoint to certify/publish or reject listings.
- `GET /api/admin/telemetry`: Real-time platform gross volume (GMV), node health, and escrow statistics.

---

## ⚙️ Setup & Installation Guide

### Prerequisites
- Node.js 18+ or 20+
- MySQL Server running on port `3305` (configured user: `root`, password: `1234`)

### 1. Clone the Repository
```bash
git clone https://github.com/mikhailemad999/EstatePro.git
cd EstatePro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
DATABASE_URL="mysql://root:1234@localhost:3305/estatepro_db"
PORT=3000
```

### 4. Initialize & Seed MySQL Database
```bash
# Push schema to MySQL database
npx prisma db push

# Populate with luxury estates, masterplans, agents, leads, and reports
npx ts-node prisma/seed.ts
```

### 5. Run the Application
```bash
# Development Server
npm run dev

# Or Production Server
npm run build
npm run start
```
The platform will be live at `http://localhost:3000`.

---

## 🎭 Role Switcher Simulator

Located in the top header and dashboard navigation bars, the **Role Switcher** allows you to instantly toggle between 5 user personas without requiring password logins:

1. **Guest**: Browse public marketplace, search split-screen maps, and run mortgage calculations.
2. **Private Buyer**: Access saved favorites, view scheduled flight itineraries, and inspect private vaults.
3. **Licensed Agent**: Manage active mandates, progress leads across the Kanban board, and publish listings via the wizard.
4. **Agency Admin**: Oversee multi-broker teams and firm-wide transaction volume.
5. **Super Admin (Overseer Tier-0)**: Certify listings, monitor AML/sanctions alerts, review RBAC identities, and inspect cryptographic audit logs.

---

## 🛡️ Verification & Test Summary

- **Build Validation**: Verified with `npm run build` — 30 / 30 pages and API routes compiled with zero TypeScript or bundling errors.
- **End-to-End Browser Testing**: Tested with automated browser subagents across:
  - Hero search & curated taxonomy chips
  - Split-screen map search with price pin markers
  - Property detail monograph with architectural metrics and booking modal
  - Multi-property comparison matrix and clear/remove actions
  - Mortgage calculator dynamic sliders and pre-approval submission
  - Off-plan masterplan floorplates and units table
  - Agent and agency directories
  - Research monographs and client-side PDF export
  - VIP aviation flight booking flow
  - Escrow milestone progression and document vault
  - Agent CRM Kanban drag/advance and lead capture modal
  - 6-step listing submission wizard
  - Admin listing certification queue with live status updates
  - Admin AML fraud detection and RBAC identity directory

EstatePro is ready for production demonstration and sovereign private wealth deployment.
