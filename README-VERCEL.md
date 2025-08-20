Deploying Storybook to Vercel

1) Using Vercel (recommended via GitHub)
- Push your repo to GitHub. On Vercel, import your repo and select the project.
- Ensure the root directory is the repository root and the Framework Preset is "None" or "Static".
- Vercel will run the `vercel-build` script which runs `npm run build-storybook` and publish the `storybook-static` output.

2) Using Vercel CLI (run locally)
```powershell
# Install/Log in once
npm i -g vercel
vercel login
# From repo root
vercel --prod
```

Notes:
- `vercel.json` is already added to this repo and instructs Vercel to use `storybook-static` as the output directory.
- If you need to change build env vars or the root directory, do that in the Vercel import UI.
- I removed Chromatic CLI references per your request. If you want Chromatic later we can re-add it.
