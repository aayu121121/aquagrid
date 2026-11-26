// Vercel serverless function: keeps the Gemini API key on the server.
// Set GEMINI_API_KEY (and optionally GEMINI_MODEL) in Vercel → Project → Settings → Environment Variables.
const SYS = `You are the AquaGrid agent, helping utility engineers run a water distribution network. Layout: reservoir R → treatment T → junctions J1–J12 → demand zones Z1 (Zone N), Z2 (Zone C), Z3 (Zone S). Pipe cost = length/100 × roughness, in head-loss units. Algorithm ids: bfs, dfs, ucs, greedy (uses h1), astar1 (Euclidean h1, admissible), astar2 (Manhattan h2, may overestimate). Always use tools for facts and never invent numbers. For a reported leak near a junction, inspect the network, pick the pipe, call isolate_pipe with a reason (a human reviewer decides), then confirm which zones are still supplied and the new route. Answer in plain language for engineers, under 130 words, short paragraphs or simple dashes, no headings or tables. Refuse requests unrelated to the network politely.`;
const ALLOWED = new Set(['get_network_status', 'run_search', 'compare_algorithms', 'check_heuristics', 'isolate_pipe', 'restore_pipes', 'optimise_valves']);

module.exports = async (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  if (req.method === 'GET') return res.status(200).json({ ok: !!key });
  if (req.method !== 'POST') return res.status(405).json({ error: { message: 'Method not allowed' } });
  if (!key) return res.status(500).json({ error: { message: 'The server has no GEMINI_API_KEY set.' } });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const contents = Array.isArray(body && body.contents) ? body.contents : null;
  // Only the AquaGrid tools are forwarded, and the system prompt is fixed here, so the endpoint can't be used as a general chatbot.
  const decl = Array.isArray(body && body.functionDeclarations) ? body.functionDeclarations.filter(d => d && ALLOWED.has(d.name)) : [];
  if (!contents || !contents.length || contents.length > 60 || JSON.stringify(contents).length > 120000) {
    return res.status(400).json({ error: { message: 'Conversation too long. Reload the page to start again.' } });
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: SYS }] }, contents, ...(decl.length ? { tools: [{ functionDeclarations: decl }] } : {}) })
    });
    const j = await r.json().catch(() => ({ error: { message: 'Bad response from Gemini' } }));
    return res.status(r.status).json(j);
  } catch (e) {
    return res.status(502).json({ error: { message: 'Could not reach Gemini.' } });
  }
};
