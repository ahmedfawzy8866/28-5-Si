# 👑 Sierra AI — Real Estate PropTech SaaS OS

Welcome to the official, fully consolidated monorepo for **Sierra AI** (stored at `I:\28-5 Si`). 

This master system integrates all components, layouts, schemas, AI matching engines, WhatsApp scraper bots, and CRM dashboards from across all 12 localized localized repositories and branches into a single high-performance workspace. The production build compiles cleanly with **0 errors and 0 warnings**.

---

## 🗺️ Codebase Directory Inventory

This monorepo is divided into two primary directories: the Next.js frontend application (`frontend-vercel`) and the Firebase functions backend (`firebase-backend`).

```
I:\28-5 Si
├── frontend-vercel/                  # Optimized Next.js Luxury Frontend App (Next.js 14)
│   ├── app/                          # Next.js 14 App Router routes & APIs
│   │   ├── admin/                    # Admin Dashboard, Login, Sync portal, Units, and Deals
│   │   ├── api/                      # Backend API Endpoints (detailed below)
│   │   ├── concierge/[leadId]/       # Personalized, VIP swipeable curation portal
│   │   ├── proposals/[id]/           # High-end client proposal views
│   │   ├── system-kit/               # Internal design tokens and typography kit
│   │   └── page.tsx                  # Quiet Luxury property showcase homepage
│   ├── components/                   # React Components (Modular Design)
│   │   ├── Admin/                    # PasteUnit, DatabaseExplorer, MediaHub, TeamCRM
│   │   ├── CRM/                      # CRMKanban board, LeadsFlow pipelines, ClientsScreen
│   │   ├── Dashboard/                # NeuralHub header, AIPanel, StrategicIntelligence
│   │   ├── Landing/                  # ParticlesCanvas, ShieldLogo, CinematicHero
│   │   ├── Proposals/                # Swipeable ConciergeGallery (S8 Curation Swiper)
│   │   ├── Maps/                     # Geolocation-ready LiveMap component
│   │   └── UI/                       # Luxury UI elements (buttons, skeletal loaders, modals)
│   ├── lib/                          # Core shared services & engines
│   │   ├── agents/                   # Scribe, Matchmaker, Curator, and Closer AI Agents
│   │   ├── services/                 # WhatsApp parser, Sheets sync, ROI metrics, closing simulator
│   │   ├── server/                   # Firebase admin core initialization, Google AI SDK
│   │   ├── I18nContext.tsx           # Bilingual translation (English/Arabic) client context
│   │   └── AuthContext.tsx           # Firebase authentication observer context
│   └── public/                       # Luxury assets, logos, and local translation files
│
└── firebase-backend/                 # Firebase Cloud Functions & Deploy configs
    ├── functions/                    # Real-time background pipelines (Node.js 20)
    │   ├── src/                      # TypeScript functions source
    │   │   ├── index.ts              # Main entry point registering Cloud triggers
    │   │   └── core/                 # Scraper intake & property normalization pipelines
    │   ├── package.json              # Backend dependencies (firebase-admin, express)
    │   └── tsconfig.json             # Backend compiler settings
    ├── firestore.rules               # Secure rules for stakeholder, unit, and analytics data
    ├── storage.rules                 # Rules allowing authenticated media assets upload
    └── firebase.json                 # Firebase deployment configurations
```

---

## 🔌 API Route Inventory (Next.js App Router)

* `/api/listings` [DYNAMIC] - Dynamically queries and retrieves property listings from Firestore with custom filtration (Compound, Bedroom count, Price caps).
* `/api/concierge/[leadId]` - Curates the VIP "Concierge Selection" by mapping matching units.
* `/api/crm/leads` - Receives new leads, evaluates buy/rent intent, and triggers automated alerts if lead score is high.
* `/api/leads/request-viewing` - Triggers a real-time notification to the concierge agent ("Sierra") when a client requests a property viewing.
* `/api/cron/sync-leads` - Automatically synchronizes customer profiles and activity logs with external endpoints.
* `/api/whatsapp/webhook` - Standardized intake webhook receiving WhatsApp conversations from scraper bots.
* `/api/openclaw` - Interface connecting your localized scraping infrastructure ("OpenClaw").
* `/api/seed/listings` - Developers' seeding utility generating premium property mocks (Mivida, Mountain View, SwanLake).

---

## 👩‍💼 The "Sierra" AI Persona Guidelines

All client-facing copy, automated WhatsApp follow-ups, and curated emails utilize the official voice **"Sierra"**:
* **Tone:** Warm, professional, highly editorial, and exclusive.
* **Role:** A luxury property concierge advisor helping high-net-worth clients navigate premium properties in New Cairo, Madinaty, and El Shorouk.
* **Branding Rules:** Never refer to the persona as "Laila" (completely purged). All swiper indicators, welcome greetings, and insights are signed by **Sierra, Senior Concierge**.

---

## 🔑 Environment Variables & Secrets (`.env.local`)

To run the Next.js development server, make sure the following environment variables are present in `frontend-vercel/.env.local`:

```ini
# --- Property Finder Integration API ---
PF_API_KEY="your_property_finder_api_key"
PF_API_SECRET="your_property_finder_api_secret"

# --- Public & Server-Side Firebase Admin Core ---
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_web_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_measurement_id"

# --- Localized AI Agents & Bots Connectors ---
OPENCLAW_BASE_URL="https://your-openclaw-endpoint"
OPENCLAW_TOKEN="your_openclaw_token"
GOOGLE_AI_API_KEY="your_gemini_api_key"
GOOGLE_MAPS_API_KEY="your_google_maps_server_key"

# --- Telegram Alert Channels ---
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
TELEGRAM_CHAT_ID="your_telegram_chat_id"
CRON_SECRET="generate_a_long_random_string"
```

> ⚠️ **Security:** Never paste live secrets into this README or any tracked file.
> Use `frontend-vercel/.env.local` (git-ignored) for real values and
> `frontend-vercel/.env.example` as the template. If a key was ever committed,
> rotate it.

---

## 🤖 Integrating Antigravity with Claude Code

If you want to use **Claude Code** (Anthropic's terminal-based coding tool) alongside **Antigravity** to manage, code, or deploy this project, they can easily coordinate:

### Step 1: Set up the Workspace
Ensure both agents target the root path `I:\28-5 Si`.

### Step 2: Accessing Local MCP Servers
Both Antigravity and Claude Code can leverage MCP (Model Context Protocol) servers to browse files and compile.
To boot up the Chrome DevTools MCP server for screenshot capture in Claude Code, add this to your global `mcp_config.json`:
```json
{
  "mcpServers": {
    "chrome-devtools-mcp": {
      "command": "node",
      "args": ["C:/Users/sierr/.gemini/antigravity/mcp/chrome-devtools-mcp/index.js"]
    }
  }
}
```

### Step 3: Cooperative pair-programming
* Let **Antigravity** do the heavy design-tokens styling, Webpack config fixing, and detailed system architecture reports (via visual screenshots).
* Let **Claude Code** run continuous tests (`npm run test`), execute terminal Git rebases, and trigger local development commands via fast local command loops.
* **Pro-tip:** Feed this `README.md` file directly into Claude Code's prompt on startup:
  ```bash
  claude --intro "Feed: I:\28-5 Si\README.md"
  ```
  This immediately informs the model of your stack, routes, persona rules, and folder mapping!

---

## 🚀 Live Production Deployment

### Frontend Vercel Deploy
Since the project is fully structured with standard Vercel configurations and `next.config.js` fixes, you can deploy it instantly:
1. Log in to Vercel and import the GitHub repository **`ahmedfawzy8866/28-5-Si`**.
2. Select `frontend-vercel` as the root directory of your project.
3. Paste all environment variables from `.env.local` into Vercel's Environment Variables dashboard.
4. Click **Deploy**. Vercel will build and serve your luxury site globally!

### Backend Firebase Deploy
To deploy your backend Cloud Functions and Firestore Security rules, follow these quick steps:

> [!WARNING]
> **Action Required in Google Cloud/Firebase Console:**
> * **Storage Initialization:** In your Firebase Console, click on **Storage** -> **Get Started** to initialize your default bucket (`sierra-blu.firebasestorage.app`).
> * **IAM Role Grant:** In Google Cloud IAM settings, locate service account `941030513456-compute@developer.gserviceaccount.com` and grant it the **Storage Object Viewer** role. (This resolves the Cloud Functions deployment permissions blocker).

Once the console toggles are set, run:
```powershell
cd firebase-backend
firebase deploy
```
This will compile and launch your Cloud triggers, ingest endpoints, and security rules.

---

## 💡 Enhancements & Scaling Recommendations

1. **Leaflet Geolocation Mapping:** The `LiveMap.tsx` component is geolocated but uses standard markers. As the platform scales, integrate a custom gold/navy SVG marker pin to fit the brand's editorial layout.
2. **Scraper Sync Hook:** Hook the WhatsApp webhook API directly to a live Twilio or Telegram dispatcher so that when the scraper bot ingests a client profile, a curated portfolio is compiled and messaged instantly.
