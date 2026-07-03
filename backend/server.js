'use strict';

// Tiny todo API — no dependencies, Node built-in http only.
const http = require('http');

const PORT = 3000;
let todos = [
  { id: 1, text: 'Try clickup-git-sync', done: false },
];
let nextId = 2;

function send(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});

  // GET /health — liveness probe
  if (req.method === 'GET' && req.url === '/health') {
    return send(res, 200, { status: 'ok' });
  }

  // GET /todos — list all
  if (req.method === 'GET' && req.url === '/todos') {
    return send(res, 200, todos);
  }

  // POST /todos — { text }
  if (req.method === 'POST' && req.url === '/todos') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const { text } = JSON.parse(body || '{}');
      if (!text) return send(res, 400, { error: 'text required' });
      const todo = { id: nextId++, text, done: false };
      todos.push(todo);
      send(res, 201, todo);
    });
    return;
  }

  // DELETE /todos/:id
  const match = req.url.match(/^\/todos\/(\d+)$/);
  if (req.method === 'DELETE' && match) {
    const id = Number(match[1]);
    todos = todos.filter((t) => t.id !== id);
    return send(res, 200, { ok: true });
  }

  send(res, 404, { error: 'not found' });
});

server.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
