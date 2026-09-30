import { createServer } from 'node:http';

const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

let resources = [
  { id: 1, title: 'Cell structure & function', type: 'PDF', course: 'Biology', topic: 'Cell Biology', detail: 'Dr. Maya Chen · 12 pages' },
  { id: 2, title: 'Mitosis explained — Amoeba Sisters', type: 'Video', course: 'Biology', topic: 'Cell Biology', detail: 'YouTube · 8:12' },
  { id: 3, title: 'Chapter 4: Forces and Motion', type: 'PDF', course: 'Physics', topic: 'Mechanics', detail: 'Prof. James Wilson · 18 pages' },
];

const books = [
  { id: 1, title: 'Molecular Biology of the Cell', author: 'Bruce Alberts et al.', callNumber: 'QH 581.2 .M64 2022', location: 'Science Library · Floor 2 · Shelf C4', available: 2, total: 5 },
  { id: 2, title: 'Campbell Biology', author: 'Lisa A. Urry et al.', callNumber: 'QH 308.2 .C34 2021', location: 'Science Library · Floor 2 · Shelf B1', available: 0, total: 8 },
  { id: 3, title: 'The Cell: A Molecular Approach', author: 'Geoffrey M. Cooper', callNumber: 'QH 581.2 .C66 2019', location: 'Science Library · Floor 2 · Shelf C5', available: 1, total: 3 },
];

const questions = [];
const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
};

createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/api/health') return send(res, 200, { status: 'ok', service: 'ClassVault API' });
  if (req.method === 'GET' && url.pathname === '/api/resources') return send(res, 200, resources);
  if (req.method === 'GET' && url.pathname === '/api/books') {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    return send(res, 200, books.filter(book => `${book.title} ${book.author} ${book.callNumber}`.toLowerCase().includes(q)));
  }
  if (req.method === 'GET' && url.pathname === '/api/questions') return send(res, 200, questions);

  if (req.method === 'POST' && ['/api/resources', '/api/questions'].includes(url.pathname)) {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    let data;
    try { data = JSON.parse(raw); } catch { return send(res, 400, { error: 'Request body must be valid JSON.' }); }
    if (url.pathname === '/api/resources') {
      if (!data.title || !data.course || !data.topic) return send(res, 400, { error: 'title, course, and topic are required.' });
      const item = { id: Date.now(), type: data.type || 'Link', detail: 'Added just now', ...data };
      resources = [item, ...resources];
      return send(res, 201, item);
    }
    if (!data.text || !data.text.trim()) return send(res, 400, { error: 'Question text is required.' });
    const item = { id: Date.now(), text: data.text.trim(), topic: data.topic || 'General', createdAt: new Date().toISOString() };
    questions.unshift(item);
    return send(res, 201, item);
  }

  send(res, 404, { error: 'Route not found.' });
}).listen(port, () => console.log(`ClassVault API running at http://localhost:${port}`));
