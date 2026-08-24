/* ==========================================================================
   Shopify Agentic AI Developer Bootcamp — Content Data
   -----------------------------------------------------
   This is the ONLY file you should need to edit to run the program:
     - Flip `materialsAvailable` to true and set `materialsUrl` on a module
       once its slides/recordings/labs are ready to publish (before each
       session, per module).
     - Set `recordingUrl` on a SESSION once that class has been delivered
       and the recording is live on mykoenig.com (paste the mykoenig.com
       link for that recording — trainees sign in there with their
       official email).
     - Adjust dates/times if the schedule changes.
   Everything on every page (Home, Schedule, Curriculum) renders from this
   file — you do not need to touch the HTML for routine updates.
   ========================================================================== */

const PROGRAM = {
  title: "Shopify Agentic AI Developer Bootcamp",
  tagline: "A hands-on, workshop-based program for building agentic commerce experiences on Shopify with Claude (Anthropic).",
  org: "Koenig Solutions",
  client: "V Group Inc.",
  totalSessions: 20,
  totalHours: 40,
  totalModules: 8,
  timeLabel: "10:00 – 12:00 IST",
  timezone: "Asia/Kolkata",
  timezoneOffsetMinutes: 330, // IST = UTC+5:30, used for local-time conversion
  startDate: "2026-08-17",
  endDate: "2026-09-28",
  stack: ["Node.js", "React", "Claude Agent SDK (TypeScript)", "Shopify Admin & Storefront API"],
  courseOutlineUrl: "assets/downloads/Shopify-Agentic-AI-Developer-Bootcamp-Course-Outline.docx",
  teamsJoinUrl: "https://teams.microsoft.com/meet/485172929332022?p=1YfEQ74mTN2R8vFShj"
};

/* Each session: n, date (ISO yyyy-mm-dd), moduleId, recordingUrl (null until delivered) */
const SCHEDULE = [
  { n: 1,  date: "2026-08-17", moduleId: "m1", recordingUrl: null },
  { n: 2,  date: "2026-08-18", moduleId: "m1", recordingUrl: null },
  { n: 3,  date: "2026-08-19", moduleId: "m2", recordingUrl: null },
  { n: 4,  date: "2026-08-20", moduleId: "m2", recordingUrl: null },
  { n: 5,  date: "2026-08-21", moduleId: "m3", recordingUrl: null },
  { n: 6,  date: "2026-08-24", moduleId: "m3", recordingUrl: null },
  { n: 7,  date: "2026-08-25", moduleId: "m3", recordingUrl: null },
  { n: 8,  date: "2026-08-28", moduleId: "m7", recordingUrl: null },
  { n: 9,  date: "2026-09-07", moduleId: "m7", recordingUrl: null },
  { n: 10, date: "2026-09-08", moduleId: "m7", recordingUrl: null },
  { n: 11, date: "2026-09-09", moduleId: "m4", recordingUrl: null },
  { n: 12, date: "2026-09-10", moduleId: "m4", recordingUrl: null },
  { n: 13, date: "2026-09-11", moduleId: "m4", recordingUrl: null },
  { n: 14, date: "2026-09-14", moduleId: "m5", recordingUrl: null },
  { n: 15, date: "2026-09-17", moduleId: "m5", recordingUrl: null },
  { n: 16, date: "2026-09-18", moduleId: "m6", recordingUrl: null },
  { n: 17, date: "2026-09-21", moduleId: "m6", recordingUrl: null },
  { n: 18, date: "2026-09-24", moduleId: "m8", recordingUrl: null },
  { n: 19, date: "2026-09-25", moduleId: "m8", recordingUrl: null },
  { n: 20, date: "2026-09-28", moduleId: "m8", recordingUrl: null },
];

/* Each module: id, title, goal, materialsAvailable, materialsUrl, topics[] {type: B|L|D, title, detail} */
const CURRICULUM = [
  {
    id: "m1",
    title: "LLM Foundations & Vibe Coding with Claude",
    goal: "Get comfortable with how LLMs and Claude work, and start building with natural-language-driven (“vibe”) coding.",
    materialsAvailable: true,
    materialsUrl: "module-1.html",
    topics: [
      { type: "B", title: "Kickoff & Environment Setup", detail: "Program roadmap; verify Shopify Partner/dev store, Claude API key, Claude Code CLI, and the Node.js/React toolchain for every participant." },
      { type: "B", title: "How LLMs Actually Work", detail: "Tokens, context windows, embeddings, temperature/sampling, model families (Opus/Sonnet/Haiku) and how to pick a model for a task." },
      { type: "B+L", title: "Prompt Engineering That Holds Up in Production", detail: "System prompts, few-shot examples, chain-of-thought, output constraints. Lab: iterate a merchandising-copy prompt in the Claude Console to a reliable, testable version." },
      { type: "B+D", title: "Vibe Coding Fundamentals", detail: "What vibe coding is (and isn't); planning-first workflows; reviewing AI-authored diffs. Demo: a full vibe-coded feature built live in Claude Code from a one-paragraph spec." },
      { type: "L", title: "Lab — Vibe-Code a Product Data Utility (Node.js)", detail: "Using Claude Code, vibe-code a Node.js script that pulls a product CSV, cleans/normalizes it, and generates SEO-friendly descriptions — no boilerplate hand-written." },
      { type: "L", title: "Lab — Vibe-Code a React Chat UI Skeleton", detail: "Vibe-code the shell of a React chat widget (message list, input box, streaming response state) purely through natural-language prompting — reused and wired to a live agent later in the program." },
    ],
  },
  {
    id: "m2",
    title: "Building Agents with the Claude API & Agent SDK",
    goal: "Move from prompting to programmable agents: tool use, structured outputs, and the Claude Agent SDK.",
    materialsAvailable: true,
    materialsUrl: "module-2.html",
    topics: [
      { type: "B+L", title: "Anthropic Messages API Deep Dive", detail: "Requests, streaming, system prompts, multi-turn context, prompt caching for cost/latency. Lab: call the Messages API from a Node.js script and stream a response." },
      { type: "B+L", title: "Tool Use / Function Calling", detail: "Defining tool schemas, forcing/choosing tool calls, handling tool results. Lab: build a Node.js agent that calls a custom calculator/lookup tool." },
      { type: "B+L", title: "Claude Agent SDK Essentials", detail: "The agent loop, custom tools via createSdkMcpServer, permission modes, subagents, hooks. Lab: scaffold an agent project with the Node.js/TypeScript SDK." },
      { type: "B+L", title: "Structured Outputs & Reliability", detail: "JSON-schema-constrained responses, validation, retries, and error handling for agent tool calls that must not fail silently." },
      { type: "B", title: "Conversation Memory & Guardrails", detail: "Context window management, summarization strategies, input/output guardrails, and safe defaults for actions that cost money or change state." },
      { type: "L", title: "Lab — Standalone Multi-Tool Agent (Node.js)", detail: "Build a conversational agent (no Shopify yet) in Node.js with 3+ custom tools, memory across turns, and structured JSON output — the reusable skeleton for the shopping agent." },
    ],
  },
  {
    id: "m3",
    title: "Shopify Platform, Storefront API, Admin API & Native AI",
    goal: "Learn Shopify's architecture, APIs, and built-in AI tools well enough to wire a custom agent to real store data.",
    materialsAvailable: true,
    materialsUrl: "module-3.html",
    topics: [
      { type: "B+D", title: "Shopify Architecture for Developers", detail: "Partner accounts, dev stores, custom vs. public apps, the Admin, Storefront, and Checkout surfaces. Demo: tour of a live dev store's admin and app setup." },
      { type: "B+L", title: "Authentication, OAuth & Access Scopes", detail: "Custom app API keys, OAuth flow for public apps, read vs. write scopes (read_products, read_orders, write_draft_orders, write_orders). Lab: create a custom app and generate a scoped Admin API token." },
      { type: "B+L", title: "Storefront API (GraphQL) — Products & Cart", detail: "Querying products/collections/search, and the current Cart API (cartCreate, cartLinesAdd, checkoutUrl) — replacing the deprecated Checkout API. Lab: run queries in Shopify's GraphiQL app." },
      { type: "B+L", title: "Admin API (GraphQL) — Orders, Draft Orders & Customers", detail: "orderCreate vs. draftOrderCreate, invoice/payment links from draft orders, customer and inventory queries. Lab: create a draft order and fetch its invoice URL via GraphQL." },
      { type: "B", title: "Scoping an AI Agent Safely", detail: "Mapping agent capabilities to minimum-necessary scopes; separating a read-only “shopper” token from a write-capable “admin-actions” token." },
      { type: "L", title: "Lab — Wrap Shopify APIs as Claude Tools (Node.js)", detail: "Write custom Node.js tool functions (product search, cart create, draft order create) using the Shopify GraphQL client, and register them with the agent skeleton — no MCP yet, direct API calls only." },
      { type: "B+D", title: "Shopify Native AI — Magic & Sidekick", detail: "Where Shopify's built-in AI (Magic content/image generation, Sidekick merchant assistant) ends and a custom Claude-powered agent begins. Demo: generate product copy with Shopify Magic side-by-side with a Claude-authored equivalent." },
      { type: "B+L", title: "Webhooks & Event-Driven Foundations", detail: "Registering Admin API webhooks (orders/create, inventory_levels/update, app/uninstalled), verifying HMAC signatures, and building a lightweight Node.js receiver." },
    ],
  },
  {
    id: "m7",
    title: "Shopify MCP, UCP & Agentic Commerce",
    goal: "Adopt Shopify's native agent protocols and understand the wider agentic-commerce landscape.",
    materialsAvailable: false,
    materialsUrl: null,
    topics: [
      { type: "B", title: "Model Context Protocol (MCP), Explained", detail: "Why MCP exists as an open standard for connecting LLMs to tools/data; MCP vs. hand-rolled tool wrappers built earlier in the program." },
      { type: "D", title: "Shopify's Official MCP Servers", detail: "Storefront MCP, Customer Account MCP, Checkout MCP, and the Dev MCP/AI Toolkit. Demo: connect Claude Code / Claude Desktop directly to a live store's /api/mcp endpoint and drive it in natural language." },
      { type: "L", title: "Lab — Build a Custom Shopify MCP Server (Node.js)", detail: "Using the Claude Agent SDK's Node.js/TypeScript MCP server support, expose the shopping/admin/RAG tools built so far as a standards-compliant MCP server any MCP-aware client can use." },
      { type: "B+D", title: "Universal Commerce Protocol (UCP)", detail: "Shopify + Google's open standard for agent discovery, negotiation, cart/checkout and order monitoring across merchants. Demo: inspect UCP capability discovery against a UCP-enabled endpoint." },
      { type: "B", title: "Agentic Commerce Protocol (ACP) & the Wider Landscape", detail: "ACP (OpenAI + Stripe) powering ChatGPT's checkout flows, how it differs from UCP, and where each fits. Walkthrough only — conceptual comparison, no live third-party checkout demo." },
      { type: "B", title: "Shopify Sidekick & Agentic Storefronts", detail: "Merchant-side AI: Sidekick's admin actions and MCP-based app extensions; Agentic Storefronts making a catalog discoverable inside ChatGPT, Copilot, Gemini and AI Mode." },
    ],
  },
  {
    id: "m4",
    title: "End-to-End Shopping Agent",
    goal: "Assemble a complete customer-facing shopping agent, from product discovery through payment.",
    materialsAvailable: false,
    materialsUrl: null,
    topics: [
      { type: "B", title: "Agent Architecture for Commerce", detail: "Designing intents: browse/ask, cart, checkout, order status; routing logic; when to hand off to a human or to native checkout." },
      { type: "L", title: "Lab — Product Discovery & Q&A", detail: "Agent answers natural-language product questions, recommends items, and cites live catalog data via the Storefront API tool." },
      { type: "L", title: "Lab — Cart Management & Checkout Link", detail: "Agent adds/updates cart lines and returns a working Shopify checkoutUrl the shopper can complete payment on." },
      { type: "L", title: "Lab — Order Placement Flow", detail: "Since payment happens on Shopify's own hosted checkout page, not inside the conversation, the agent confirms an order actually completed by looking it up via the Admin API afterward rather than assuming success." },
      { type: "L", title: "Lab — Multi-Item & Edge-Case Conversations", detail: "Handling quantity changes, out-of-stock substitutions, discount-code application, and cart corrections mid-conversation." },
      { type: "D", title: "Wiring It Into a React Chat Widget", detail: "Live demo connecting the React chat widget to the Node.js agent backend and embedding it on the dev store storefront; end-to-end walkthrough: ask → browse → cart → pay → confirm." },
    ],
  },
  {
    id: "m5",
    title: "Admin-Scoped, Event-Driven & Risk-Aware Agents",
    goal: "Extend the shopping agent into a governed operations agent that reacts to live store events safely.",
    materialsAvailable: false,
    materialsUrl: null,
    topics: [
      { type: "B+L", title: "Lab — Agent with Admin Scopes", detail: "Extend the agent with write_orders/write_draft_orders/read_customers/read_inventory tools for order status, stock checks and customer lookups — gated behind confirmation prompts and role checks." },
      { type: "B+D", title: "Shopify Flow as a Governed Action Layer", detail: "Routing agent-initiated writes through the flowTriggerReceive Admin GraphQL mutation instead of raw Admin API calls, with payload validation and rate limiting. Demo: an agent action triggers a Shopify Flow workflow." },
      { type: "B+L", title: "Lab — Webhook-Reactive Agent", detail: "Agent that reacts to live store events (new order, low inventory, app/uninstalled) pushed via webhook — e.g. auto-drafting a restock alert or order-confirmation message." },
      { type: "B+L", title: "Lab — Order-Risk-Aware Agent", detail: "Reading OrderRiskAssessment on the Admin API so the agent flags or holds high-risk orders instead of auto-confirming them." },
      { type: "L", title: "Lab — Abandoned Cart Recovery Agent", detail: "Using cart/checkout webhook data to have Claude draft a personalized, on-brand win-back message — human-in-the-loop send, not autonomous." },
      { type: "L", title: "Lab — Unified Operations Agent", detail: "Combine the above into one operations agent tested against the dev store's live events and Flow workflows." },
    ],
  },
  {
    id: "m6",
    title: "RAG, Personalization & Analytics Agents",
    goal: "Ground agent answers in real store data and move from reactive Q&A to proactive, data-driven agents.",
    materialsAvailable: false,
    materialsUrl: null,
    topics: [
      { type: "B", title: "Retrieval-Augmented Generation (RAG) for Commerce", detail: "Embeddings, vector search, chunking product/policy data, and why RAG reduces hallucinated prices and policies." },
      { type: "B+L", title: "Lab — RAG Over Product Catalog & Store Policies", detail: "Embed product descriptions and policy pages (returns, shipping), retrieve relevant chunks, and feed them as grounded context to Claude for more accurate Q&A." },
      { type: "L", title: "Lab — Personalized Recommendation & Upsell Agent", detail: "Using purchase/browsing history (customer and order data) so the agent suggests relevant add-ons and cross-sells." },
      { type: "L", title: "Lab — Customer Support & Returns Agent", detail: "RAG-grounded agent answering return/refund/shipping policy questions and drafting a return request via the Admin API." },
      { type: "B+L", title: "Lab — Natural-Language Sales Analytics Agent", detail: "Agent answers questions like “how did we do last week” by querying Shopify order/analytics data and summarizing trends." },
    ],
  },
  {
    id: "m8",
    title: "Multi-Agent Orchestration, Safety, Localization & Production",
    goal: "Harden, localize, and ship the combined system as a production-pattern agentic commerce platform.",
    materialsAvailable: false,
    materialsUrl: null,
    topics: [
      { type: "B+L", title: "Multi-Agent Orchestration", detail: "Claude Agent SDK subagent/orchestrator patterns routing between the shopping, support, and admin-ops agents built earlier." },
      { type: "B+L", title: "Prompt Injection & Safety for Commerce Agents", detail: "Guarding a write-capable agent against malicious instructions hidden in product reviews, webhook payloads, or customer messages; tool-use allowlisting and confirmation gates." },
      { type: "B+D", title: "Observability, Evaluation & Cost Monitoring", detail: "Logging/tracing tool calls, building a small eval set for price/policy accuracy, and tracking Claude API usage and cost." },
      { type: "B+L", title: "Localization & Multi-Language Agent", detail: "Using Shopify Markets and the Localization API so the agent responds in the buyer's language, currency, and locale." },
      { type: "B+D", title: "Deploying & Hosting the Agent", detail: "Packaging the Node.js agent as an embedded Shopify app (App Bridge/Polaris) or standalone service; environment/secrets handling and basic CI/CD." },
      { type: "L+D", title: "Capstone — Full Agentic Commerce Platform", detail: "Combine the shopping agent, admin-ops/Flow/webhook layer, RAG support agent, custom MCP server, and safety guardrails into one Claude-powered Node.js/React system against the dev store. Each participant/team demos their end-to-end flow." },
    ],
  },
];

const GLOSSARY = [
  { term: "LLM (Large Language Model)", def: "A neural network trained on text that generates and reasons over natural language; Claude is the LLM used throughout this program." },
  { term: "Vibe Coding", def: "AI-assisted development where the developer expresses intent in natural language and reviews/iterates on AI-generated code, rather than hand-writing every line." },
  { term: "Tool Use / Function Calling", def: "A Claude API capability where the model can invoke developer-defined functions (tools) with structured arguments as part of its response." },
  { term: "Claude Agent SDK", def: "Anthropic's SDK (Node.js/TypeScript) for building agent loops, custom tools, and MCP servers around Claude, extending beyond the Claude Code CLI." },
  { term: "MCP (Model Context Protocol)", def: "An open standard, created by Anthropic, that lets an AI model connect to external tools and data sources through a self-describing server interface." },
  { term: "Shopify Storefront API", def: "Shopify's customer-facing GraphQL API for products, collections, search, and the Cart object (cartCreate, cartLinesAdd, checkoutUrl)." },
  { term: "Shopify Admin API", def: "Shopify's merchant-facing GraphQL API for orders, draft orders, customers, and inventory — used for write-capable, admin-scoped agent actions." },
  { term: "Draft Order", def: "A Shopify order object that can be created programmatically (e.g. via chat) and shared as an invoice/payment link before payment is captured." },
  { term: "Access Scopes", def: "Granular permissions (e.g. read_products, write_draft_orders, write_orders) attached to a Shopify API token, used to limit what an agent can do." },
  { term: "Storefront / Customer Account / Checkout / Dev MCP", def: "Shopify's official family of MCP servers: Storefront MCP for shopping agents, Customer Account MCP for logged-in buyer context, Checkout MCP for purchase flows, and Dev MCP (AI Toolkit) for coding agents." },
  { term: "UCP (Universal Commerce Protocol)", def: "An open standard co-developed by Shopify and Google enabling AI agents to authenticate, discover a catalog, build carts/checkouts, and monitor orders across any participating merchant." },
  { term: "ACP (Agentic Commerce Protocol)", def: "An open standard co-developed by OpenAI and Stripe that powers checkout-session and payment flows for AI agents, notably ChatGPT's in-chat purchase experience." },
  { term: "Shopify Sidekick", def: "Shopify's AI commerce assistant built into the Admin, using MCP-based app extensions to let merchants query and act on store and third-party app data via chat." },
  { term: "Shopify Magic", def: "Shopify's built-in, free AI toolset in the Admin for generating product descriptions, marketing copy, FAQ answers, and edited product images." },
  { term: "Shopify Flow / flowTriggerReceive", def: "Shopify's native automation engine; the flowTriggerReceive Admin GraphQL mutation lets an AI agent start a governed Flow workflow instead of calling write-scoped Admin API mutations directly." },
  { term: "OrderRiskAssessment", def: "An Admin API GraphQL object providing a fraud/risk evaluation for an order, used to have an agent flag or hold suspicious orders." },
  { term: "RAG (Retrieval-Augmented Generation)", def: "A pattern where relevant text is retrieved via embeddings/vector search and inserted into the prompt so answers are grounded in real, current data rather than memorized or guessed." },
  { term: "Multi-Agent Orchestration", def: "An architecture where an orchestrator agent routes a conversation to specialized subagents (shopping, support, admin-ops) via the Claude Agent SDK's subagent support." },
  { term: "Prompt Injection", def: "An attack where malicious instructions are hidden in content an agent reads to hijack a write-capable agent's behavior; mitigated with tool allowlisting and confirmation gates." },
  { term: "Shopify Markets / Localization API", def: "Shopify Markets manages a store's global selling regions; the Localization API lets an app or agent read and adapt to the buyer's language, country, and currency." },
];

const FAQ = [
  { q: "What if I miss a live session?", a: "Every session is recorded and published on mykoenig.com — sign in there with your official email to watch it. Once a recording is available, a direct link also appears in the Materials column on the Schedule page next to that session." },
  { q: "Will module content be shared in advance?", a: "Each module's content is published on the Curriculum page shortly before that module's first session, once finalized. Until then it's marked “Available soon.”" },
  { q: "What do I need installed before Day 1?", a: "See the Prerequisites page for the full checklist — a Shopify Partner dev store, an Anthropic Claude API key, Claude Code CLI, and a Node.js/React toolchain." },
  { q: "Is this beginner-friendly?", a: "Working knowledge of JavaScript/TypeScript, Node.js, and React is assumed. No prior Shopify or LLM experience is required — both are covered from first principles in the opening modules." },
  { q: "What time zone are sessions in?", a: "All live sessions run 10:00–12:00 IST (Asia/Kolkata). The Schedule page shows each session converted to your browser's local time zone automatically." },
  { q: "Is there a certificate of completion?", a: "Certificate details will be shared by your Koenig program coordinator closer to program completion." },
];
