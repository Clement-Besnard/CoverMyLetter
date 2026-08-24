# CoverMyLetter

Generate a tailored cover letter from your CV and a job posting URL, then refine it
through a chat interface.

Upload a PDF résumé, paste the link to a job ad, and an LLM agent pipeline reads both
and drafts a letter. Follow-up messages in the chat ("make it shorter", "emphasise my
backend experience") rewrite the letter in place. Each generation or rewrite costs one
credit; new accounts start with five.

## Stack

| Layer     | Technology                                  |
|-----------|---------------------------------------------|
| Frontend  | React 19, Vite 6, Tailwind CSS 4            |
| Backend   | Node 22, Express 5, Mongoose 8              |
| Database  | MongoDB                                     |
| AI agents | Langflow 1.4.3 (pinned), OpenAI models      |

Everything runs through Docker Compose — four services, one command.

## Quick start

**Requirements:** Docker with the Compose plugin. Node is not needed on the host.

```bash
git clone <repo-url>
cd CoverMyLetter
cp .env.example .env      # then add your OpenAI key
docker compose up --build
```

First boot takes a few minutes: Langflow is slow to start and the backend waits for it
to report healthy.

| Service   | URL                     |
|-----------|-------------------------|
| Frontend  | http://localhost:5173   |
| Backend   | http://localhost:3000   |
| Langflow  | http://localhost:7860   |
| MongoDB   | localhost:27018         |

Register an account at `/register` to get five free credits, then head to `/chat`.

## Configuration

A single `.env` at the repository root holds every variable, for both the host and the
containers. There is no `backend/.env` — [`backend/config/env.js`](backend/config/env.js)
resolves the root file, and Compose injects the same values into the containers via
`env_file`.

| Variable            | Purpose                                                        |
|---------------------|----------------------------------------------------------------|
| `MONGODB_URI`       | Connection string. Compose overrides it to reach the container. |
| `PORT`              | Backend port (default 3000).                                    |
| `LANGFLOW_BASE_URL` | Compose overrides it to `http://langflow:7860`.                 |
| `FILE_TWEAK_ID`     | ID of the File component in the `covermyletter` flow.           |
| `OPENAI_API_KEY`    | Passed to the Langflow container; the flows use it.             |

`MONGODB_URI` and `LANGFLOW_BASE_URL` carry host-facing values so the backend can also
run outside Docker. Compose replaces them with service names, and since `dotenv` never
overrides an existing environment variable, both modes work from one file.

There is deliberately **no `API_KEY`**. Langflow runs with `LANGFLOW_AUTO_LOGIN=true`,
which disables authentication in 1.4.3. Sending an invalid key returns 403, whereas
sending none succeeds — so the variable must stay absent while using the local instance.

> **Changed `.env` or a Compose `environment:` block?** Recreate the container:
> `docker compose up -d --force-recreate <service>`. A plain `restart` or `up -d`
> reuses the existing environment and silently keeps the old values.

## Langflow flows

Two flows back the two features. JSON files in [`langflow/flows/`](langflow/flows/) are
imported on every container start (`LANGFLOW_LOAD_FLOWS_PATH`), so they survive volume
resets and travel with the repository.

| Backend call                 | Flow endpoint    | Input                                  |
|------------------------------|------------------|----------------------------------------|
| `POST /api/agents/generate`  | `covermyletter`  | Job URL + CV, passed as a file tweak   |
| `POST /api/agents/modify-letter` | `modifymyletter` | Current letter + request, one string |

Three things break a flow silently, in order of how often they bite:

1. **`endpoint_name` is not the display name.** It is a separate field in the flow
   settings, and the backend calls it. Leave it empty and you get a 404.
2. **`FILE_TWEAK_ID` must match the File component ID** in `covermyletter`. A mismatched
   ID does not raise a clean error — the agent loops trying to read a CV that never
   arrives and dies on the recursion limit.
3. **Flows created in the UI live only in the Docker volume.** Export them into
   `langflow/flows/` or the next `docker volume rm` deletes them.

The Langflow version is pinned on purpose. Components changed between 1.4.x and 1.11.x
(`FileComponent` lost `load_dataframe`), so `:latest` breaks these flows. Migrating means
updating every component and re-exporting.

## API

All routes are prefixed with `/api`.

| Method | Route                     | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/agents/generate`        | Multipart: `cv`, `jobUrl`, `userId`  |
| POST   | `/agents/modify-letter`   | JSON: `query`, `letter`, `userId`    |
| GET    | `/users`                  | List users                           |
| GET    | `/users/:id`              | Fetch one user                       |
| POST   | `/users`                  | Register                             |
| PUT    | `/users/:id`              | Update                               |
| DELETE | `/users/:id`              | Delete                               |
| POST   | `/users/:id/purchase`     | Add credits (`amount`)               |
| POST   | `/users/auth/login`       | Log in                               |

## Layout

```
├── src/                  React app (Vite)
│   └── pages/            Welcome, Register, Login, Dashboard, Letter (chat)
├── backend/
│   ├── server.js         Express entry point
│   ├── config/           DB connection, root .env loader
│   ├── controllers/      users, agents (Langflow calls)
│   ├── models/           Mongoose schemas
│   └── routes/
├── langflow/flows/       Flow JSON, auto-imported at startup
├── docker-compose.yml    mongodb, langflow, backend, frontend
└── .env                  Single source of configuration
```

Both application containers bind-mount their source directory, so Vite HMR and nodemon
reload on save without rebuilding images.

## Known limitations

This is a prototype from a startup week, not a production service.

- **Passwords are stored in plain text** and compared directly. No hashing, no sessions,
  no tokens — the frontend keeps the user object in `localStorage`.
- **Credit purchases are not real.** `POST /users/:id/purchase` increments a counter with
  no payment provider behind it.
- **The API base URL is hardcoded** as `http://localhost:3000` across the page
  components, so the frontend only works locally as configured.
- **MongoDB credentials are the Compose defaults** (`admin` / `password`) and the
  database is exposed on port 27018.

Address the first two before exposing this to anyone.
