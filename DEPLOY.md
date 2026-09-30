# Deploy ClassVault (website demo)

The frontend is a static Vite site. The API is not needed for this demo because the interface uses local sample data.

## 1. Build the website on Windows

Open PowerShell in the extracted `classvault` directory (the one containing `package.json`) and run:

```powershell
npm.cmd install
npm.cmd run build
```

The first command downloads the frontend packages. The second creates the production website in `dist`.

## 2. Publish with Netlify Drop

1. Sign in to Netlify and open its manual deploy / Netlify Drop page.
2. Drag the generated `dist` folder onto the page.
3. Netlify will publish the static files and show the public site URL.

Alternatively, connect the project to a Git provider and let Netlify build it. The included `netlify.toml` specifies `npm run build` and `dist` as the publish directory.

## Troubleshooting PowerShell

Use `npm.cmd`, not `npm`, if PowerShell reports that scripts are disabled. If PowerShell cannot find `npm.cmd`, use the full path when Node.js is installed in its default location:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run build
```

## Scope

This publishes the frontend demonstration only. It contains sample course, resource, discussion, and library data. It does not provide real sign-in, persistent storage, WhatsApp ingestion, YouTube search, live library inventory, or teacher authorization. Do not describe sample catalogue data as live college availability.
