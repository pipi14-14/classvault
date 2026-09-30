# ClassVault

A responsive React + TypeScript demo for an interactive college study hub. Built with Vite and Lucide icons.

## Run in VS Code

1. Install Node.js (LTS) if it is not already installed.
2. Open this `classvault` folder in VS Code.
3. Open the integrated terminal and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Deploy the website demo

This project is configured for a static Netlify deployment in `netlify.toml`. In the `classvault` folder, build the site with:

```powershell
npm.cmd install
npm.cmd run build
```

The production website files will be created in `dist`. To publish from a Git repository, connect the repository to Netlify and use the build command `npm run build` and publish directory `dist`; Netlify can also read these settings from `netlify.toml`. For a manual deploy, upload the generated `dist` folder using Netlify's manual deploy flow. The frontend uses sample data and does not need the separate API for this demo deployment.

## Run the separate backend API

The project includes a small dependency-free Node.js API in `backend/server.mjs`.
Open a second terminal in this `classvault` folder and run:

```bash
node backend/server.mjs
```

The API starts at `http://localhost:4000`. Available routes:

- `GET /api/health`
- `GET /api/resources`
- `POST /api/resources` with JSON fields `title`, `course`, and `topic`
- `GET /api/books?q=biology`
- `GET /api/questions`
- `POST /api/questions` with JSON field `text` and optional `topic`

The API stores demo changes in memory, so they reset when the server stops. The current React demo still uses its own sample data and local state; connecting its screens to these API routes is a separate integration step. Authentication, permanent database storage, file uploads, teacher permissions, YouTube search, and a live library catalogue are not implemented.

## Demo interactions

- Switch between student, teacher, and library staff display roles.
- Search and filter class materials; bookmark resources.
- Add a course link using **Add a resource**.
- Post a question to the class discussion.
- Browse study paths and the sample college book catalogue.
- Test the interface at mobile and desktop widths.

## Stack and integration notes

- React 18, TypeScript, Vite, and Lucide React.
- This frontend uses sample data and local component state. Authentication, persistent storage, real teacher permissions, live YouTube search, and a college library catalogue connection need a backend/API integration before production use.
- The role selector is a presentation/demo control, not a security boundary. Live catalogue availability also requires a real library feed.
