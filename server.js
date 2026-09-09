/*
 * ⚡ SpeedTest Server — zero dependency (sirf Node.js)
 * Render par deploy ke liye ready. Endpoints:
 *   GET  /api/ping     -> latency check ke liye tiny JSON response
 *   GET  /api/download -> unlimited random data stream (client abort karta hai)
 *   POST /api/upload   -> client jo bhejta hai uska byte count wapas karta hai
 *   GET  /             -> frontend (public/index.html)
 */

const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const PORT = process.env.PORT || 3000;
const INDEX_PATH = path.join(__dirname, 'public', 'index.html');

// Ek request me max itna data bhejenge (safety cap) — 1 GB kaafi hai
const DEFAULT_MAX_BYTES = 1024 * 1024 * 1024;

const server = http.createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, 'http://localhost');
  } catch (e) {
    res.writeHead(400);
    return res.end('bad request');
  }

  // CORS — chahe frontend kahin bhi ho, kaam kare
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // ---------- PING ----------
  if (url.pathname === '/api/ping') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private'
    });
    return res.end(JSON.stringify({ ok: true, t: Date.now() }));
  }

  // ---------- DOWNLOAD ----------
  if (url.pathname === '/api/download') {
    const requested = parseInt(url.searchParams.get('size'), 10) || 0;
    const maxBytes = Math.min(requested || DEFAULT_MAX_BYTES, DEFAULT_MAX_BYTES);

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });

    // 1 MB ka random (incompressible) buffer — baar baar stream karenge
    const chunk = crypto.randomBytes(1024 * 1024);
    let sent = 0;
    let stopped = false;

    const stream = new Readable({
      highWaterMark: 4 * 1024 * 1024,
      read() {
        if (stopped || sent >= maxBytes) {
          this.push(null);
          return;
        }
        sent += chunk.length;
        this.push(chunk);
      }
    });

    stream.on('error', () => res.destroy());
    stream.pipe(res);
    // Client abort kare to stream turant band karo
    res.on('close', () => {
      stopped = true;
      stream.destroy();
    });
    return;
  }

  // ---------- UPLOAD ----------
  if (url.pathname === '/api/upload') {
    let bytes = 0;
    req.on('data', (c) => { bytes += c.length; });
    req.on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      });
      res.end(JSON.stringify({ ok: true, bytes }));
    });
    req.on('error', () => res.destroy());
    return;
  }

  // ---------- FRONTEND ----------
  if ((url.pathname === '/' || url.pathname === '/index.html') && (req.method === 'GET' || req.method === 'HEAD')) {
    fs.readFile(INDEX_PATH, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('index.html not found');
      }
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
    return;
  }

  if (url.pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }

  if (url.pathname === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

// Ping accuracy ke liye Nagle's algorithm band karo
server.on('connection', (socket) => socket.setNoDelay(true));

server.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ DEV SPEED MATRIX server chal raha hai: http://0.0.0.0:${PORT}`);
});
