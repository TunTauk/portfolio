# Astro Starter Kit: Minimal

## Generate the CV PDFs

Use Node.js 22.13+ (Node.js 24 recommended). `portfolio.md` is the shared content
source. The generator produces two A4,
two-page PDFs: an ATS-focused version without a photo, and a version with a
compact portrait from `public/images/profile.jpg`. It never modifies the website's
existing `public/tun-tauk.pdf` or the original photo.

```sh
pnpm install
pnpm cv:setup       # One-time Chromium download (also after Playwright upgrades)
pnpm cv:generate
```

Output (gitignored):

- `generated/cv/Tun_Tauk_Resume.pdf` — no photo
- `generated/cv/Tun_Tauk_Resume_With_Photo.pdf` — with photo
- Matching `.html` previews and `.txt` extracted text
- `generated/cv/verification.json` — page counts and verified clickable links

Edit `portfolio.md`, then rerun `pnpm cv:generate`. Keep the `# Name`, job-title
paragraph, `##` section headings, and `###` employer headings. Put each employer's
dates directly below its heading. Project headings and their following bullets
are kept together; employer context is repeated when an entry continues on the
next page. The no-photo variant is the recommended version for ATS submissions.

The layout uses Arial at 10.5pt with 14mm margins. If either variant cannot fit
exactly two pages, generation fails without replacing the previous output.
Shorten the content rather than reducing it to an unreadable font size. All
rendering is local; the generator does not fetch your linked websites or upload
your CV/photo. PDFs must pass page-count, overflow, text-extraction, and link checks.

Optional inputs (paths relative to this project, or absolute):

```sh
pnpm cv:generate --source portfolio.md --photo public/images/profile.jpg --out-dir generated/cv
pnpm cv:test
```

Implementation: `scripts/cv/generate.mjs`, `scripts/cv/render.mjs`, and
`scripts/cv/resume.css`. To publish an approved PDF, manually copy the chosen
variant to `public/tun-tauk.pdf`; generation alone never replaces it.
The portrait is cropped using CSS only; adjust `.portrait img` in `resume.css`
if a replacement photo needs different framing.

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
