# Deploy the invitation to Vercel

The same Arabic invitation source supports both the existing Sites deployment and a static Vercel deployment. Vercel serves the generated HTML, JavaScript, styles, and images directly from its CDN; no server, database, or runtime secrets are needed.

## GitHub and Vercel

1. Push this repository to a private repository in the `Omarak9120` GitHub account.
2. Import that repository into the Vercel workspace `omarak9120-gmailcoms-projects`.
3. Use the repository root. The included `vercel.json` sets the build and output directory automatically.
4. Deploy and verify the production URL before sharing it with guests. The existing Sites URL remains available.

If Vercel asks for manual settings:

- Framework preset: Other
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm run build:vercel`
- Output directory: `dist/client`
- Node.js: 22 or newer
- Environment variables: none

## Local build

Run `pnpm run build:vercel`. On Windows, use Node.js 22 LTS: the current Node.js 24 runtime can abort during vinext's shutdown after prerendering. The export was verified with Node.js 22.23.2. Vercel builds on Linux.

Deploy only `dist/client`, never `dist/server` or the entire source directory as public files. The build retains both frozen comparison copies in `public/versions/first` and `public/versions/second` unchanged.

For the existing Sites Worker build, continue using `pnpm run build`. The static export flag is confined to the Vercel build process and does not change the Sites hosting configuration.

The invitation still loads its Arabic fonts from Google Fonts and its existing music from the original external audio URL. Music is requested only after the guest opens the invitation.

Before any future content, behavior, or design change, run the snapshot command described in `AGENTS.md`.
