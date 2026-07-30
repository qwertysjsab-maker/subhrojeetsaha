## Goal

A single-page professional site at `/` that presents Subhrojeet Saha's real resume content, plus an embedded AI assistant that answers visitor questions and actively sells his experience. Contact via form + LinkedIn only — no phone number or email address anywhere on the page.

## Design

Build the selected "Institutional tech minimalist" direction faithfully: white page, near-black `#0F172A` text, sky-blue `#38BDF8` accent, Inter for text and JetBrains Mono for labels/eyebrows, sticky minimal nav, oversized hero name, rounded cards, restrained motion. Tokens go into `src/styles.css` (`@theme`), fonts load via `<link>` in the root route. Dark slate band for the chat section, exactly as in the direction.

## Content (from the resume — the prototype's placeholder numbers get replaced)

- **Hero** — "Subhrojeet Saha.", Technology Risk & Compliance leader, 7+ years across Goldman Sachs, JPMorgan Chase, Moody's, Diligent and KPMG. Bengaluru, India.
- **Institutional impact** — three cards: 250+ annual vendor risk assessments and 50+ critical supplier reviews; ~30% TPRM efficiency gain aligned to SOC 2 and BSI C5; Priority-0 frontier vulnerability management program plus a new Second Line Controls Surveillance capability.
- **Career trajectory** — timeline with all five real roles and dates: JPMorgan Chase (Technical Program Manager III, Mar 2026–Present, Project Glasswing), Diligent (Staff GRC Analyst, May 2024–Mar 2026), Moody's (Senior IT Auditor, Jun 2022–May 2024), Goldman Sachs (Senior Analyst, Jul 2021–Apr 2022), KPMG India (Analyst, Jan 2019–Jun 2021), each with its real bullets.
- **Core stack** — frameworks (NIST CSF, SOC 1/2, FedRAMP, HIPAA, BSI C5, COBIT, GDPR, ISO 27001, ISO 42001, DORA) and tools (Power BI, Alteryx, SQL, Python, Jira, Confluence, AWS, Azure), plus certifications (ISO 42001 Lead Implementer, ISC2 CC, Azure Fundamentals, AWS Cloud Fundamentals, UiPath RPA, Alteryx, Linux LFS 101x) and the B.Tech CSE from SRM.
- **Contact footer** — contact form + LinkedIn button. The "Email Subhrojeet" button from the prototype becomes "Send a message" (opens/scrolls to the form).

## AI chat section

- Full-width dark section on the page, laid out as in the direction: pitch copy and suggested prompts on the left, live chat panel on the right.
- One conversation, no saving — history resets on refresh, nothing stored.
- Backend: a TanStack server route at `/api/chat` streaming from Lovable AI (`google/gemini-3.6-flash`) via the AI SDK. The full resume is embedded in a system prompt that instructs the assistant to answer as a persuasive but factual advocate for Subhrojeet, never invent credentials, and steer serious enquiries toward the contact form.
- Frontend uses the AI SDK `useChat` with AI Elements primitives (conversation, message, prompt input, shimmer) restyled to match the direction. Streaming, typing indicator, markdown rendering, clickable starter prompts, and clear errors for rate limit / credits.

## Contact form

Enable Lovable Cloud so form submissions are stored in a `contact_messages` table (name, organisation, message, timestamp) with insert-only public access and read restricted to you. That keeps the email address off the page while still delivering enquiries.

## Technical notes

- `src/routes/index.tsx` is rewritten as the landing page; sections split into components under `src/components/`.
- Route `head()` gets a real SEO title, description, OG/Twitter tags, plus Person JSON-LD.
- Single H1, semantic sections, alt text, responsive from 360px up.

## Hosting

After the build passes, publish the app so it's live on a `.lovable.app` URL. A custom domain can be attached afterwards from project settings.
