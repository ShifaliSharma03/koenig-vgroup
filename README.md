# Shopify Agentic AI Developer Bootcamp — Program Website

Static, no-build-step website for the **Shopify Agentic AI Developer Bootcamp**, delivered by
**Koenig Solutions** for **V Group Inc.** (17 Aug – 28 Sep 2026, 10:00–12:00 IST, 20 live sessions / 40 hours).

Plain HTML + CSS + vanilla JS — no framework, no bundler, no `npm install` required. It runs by
opening the files directly or via any static file server, and deploys straight to GitHub Pages.

## Pages

| Page | File | What it's for |
|---|---|---|
| Home | `index.html` | Hero, countdown to next session, highlights, module snapshot |
| Schedule | `schedule.html` | All 20 sessions with date/time, live status, and recording links |
| Curriculum | `curriculum.html` | Full 8-module, 49-topic breakdown with search |
| Prerequisites | `prerequisites.html` | Setup checklist (progress saved in your browser) |
| About | `about.html` | About Koenig, V Group, the trainer, and program philosophy |
| Resources | `resources.html` | Glossary, FAQ, and official documentation links |

## 1. Run it locally

You don't need Node, Python, or anything installed to just **look at the site** — every page also
opens directly by double-clicking the `.html` file. But for the full experience (and to match how
GitHub Pages will serve it), run a local static server from this folder:

```bash
# Option A — Python (already on most machines)
python -m http.server 8080

# Option B — Node (if you have it)
npx serve .

# Option C — VS Code
# Install the "Live Server" extension, right-click index.html → "Open with Live Server"
```

Then open **http://localhost:8080** in your browser.

## 2. Update content — you only need to touch ONE file

All schedule dates, module content, glossary terms and FAQ live in:

```
assets/js/data.js
```

You will NOT need to edit any `.html` file for routine updates. Specifically, before each session:

- **Publish a module's materials**: find the module in the `CURRICULUM` array, set
  `materialsAvailable: true` and `materialsUrl: "https://..."` (link to slides/starter repo/whatever
  you use). The Curriculum page badge flips from **Soon** to **Live** automatically, and an
  "Open Materials" button appears.
- **Publish a session recording**: find the session in the `SCHEDULE` array and set
  `recordingUrl: "https://..."`. The Schedule page will show a "▶ Recording" button for that row.
- **Adjust a date/time**: edit the `date` field on the relevant `SCHEDULE` entry (format
  `YYYY-MM-DD`). All countdown, status, and local-time-zone conversions recompute automatically.

Session status (Upcoming / Live now / Completed) and the "days until next session" countdown are
computed automatically from today's date — nothing to update manually there.

## 3. Add the real logos

The site currently shows text-based placeholder logos ("KOENIG solutions" / "V Group Inc.") because
image files weren't available when this was generated. To use the real logos, just drop these two
files in:

```
assets/images/koenig-logo.png
assets/images/vgroup-logo.png
```

The pages already reference these exact filenames and will switch from the text placeholder to the
real image automatically (no code changes needed). Recommended: transparent-background PNG or SVG,
~200–400px wide, reasonably tight-cropped.

## 4. Review checklist before going live

- [x] Drop in real Koenig + V Group logos (`assets/images/`)
- [ ] Confirm/adjust the tentative module → session date mapping in `assets/js/data.js`
- [x] Replace the placeholder contact email in the footer of each page (now `Maitri.Bhansali@koenig-solutions.com`)
- [x] Replace the "About Koenig" / "About V Group" placeholder bios on `about.html`
- [x] Add trainer name/bio on `about.html`
- [ ] Re-generate or edit `assets/downloads/Shopify-Agentic-AI-Developer-Bootcamp-Course-Outline.docx`
      if the curriculum changes materially
- [ ] Spot-check the Schedule page's local-time-zone conversion and countdown in a real browser

## 5. Deploy to GitHub Pages

Once you've reviewed locally and are happy with it:

```bash
# From inside this folder:
git init
git add .
git commit -m "Initial site: Shopify Agentic AI Developer Bootcamp"

# Create a new repo on GitHub first (e.g. via github.com/new), then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Then on GitHub:

1. Go to your repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`.
4. Save. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a
   minute or two.

If you'd rather host it at the repo root of `https://<your-username>.github.io/` directly (no
`/<repo-name>/` path), name the repository `<your-username>.github.io`.

No build step, no GitHub Actions workflow required — it's a static site, so "deploy from a branch" is
all you need. (Ask if you'd like a GitHub Actions workflow added instead, e.g. for a custom domain
with HTTPS enforcement or a build step later.)

## File structure

```
shopify-agentic-ai-bootcamp/
├── index.html
├── schedule.html
├── curriculum.html
├── prerequisites.html
├── about.html
├── resources.html
├── README.md
└── assets/
    ├── css/style.css       # design system (light + dark mode)
    ├── js/data.js          # <-- edit this for content updates
    ├── js/main.js          # rendering + interactivity, no edits needed
    ├── images/             # drop koenig-logo.png / vgroup-logo.png here
    └── downloads/          # Course Outline docx served for download
```
