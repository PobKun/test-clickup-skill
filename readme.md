# Test ClickUp Skill — Todo Demo

A tiny full-stack demo used to test `clickup-git-sync`.

- **backend/** — dependency-free Node HTTP API (in-memory todos)
- **frontend/** — plain HTML/JS UI

## Run

```bash
# 1. start the API
node backend/server.js        # http://localhost:3000

# 2. open the UI (any static server, or just open the file)
open frontend/index.html
```

## API

| Method | Path         | Body            | Description   |
|--------|--------------|-----------------|---------------|
| GET    | /todos       | —               | list todos    |
| POST   | /todos       | `{ "text" }`    | add a todo    |
| DELETE | /todos/:id   | —               | delete a todo |
