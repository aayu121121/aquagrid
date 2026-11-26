# AquaGrid: Water Distribution Network Planner

Project P72 – Foundations of AI and Authentic Intelligence integrated project (Domain: Utilities).

AquaGrid is an AI agent that helps utility engineers manage water pressure and leaks. This website is a live demo of the Phase 1 work (Introduction and Searching Decisions):

- **Network planner** – flow paths from reservoir to demand zones with BFS, DFS, uniform-cost search, greedy best-first and A* (Euclidean and Manhattan heuristics). Click a pipe to isolate it as a leak.
- **AquaGrid agent chat** – a tool-using agent that runs the planner, compares algorithms, checks heuristic admissibility, optimises valves and isolates leaking pipes. Isolation needs human-reviewer approval.
- **Search comparison** – nodes expanded, path cost, time and optimality for every algorithm.
- **Valve scheduling** – hill climbing and simulated annealing against a naive baseline, with a convergence plot.
- PEAS description, environment classification, LangGraph architecture, 28-day plan and syllabus coverage.

## Running the agent

The chat agent uses the Gemini API through `api/chat.js`, a Vercel serverless function that keeps the API key on the server. Visitors don't need a key.

1. Import this repo into Vercel (no build settings needed).
2. In Project → Settings → Environment Variables, add `GEMINI_API_KEY` (free from Google AI Studio). Optionally add `GEMINI_MODEL` (default `gemini-3.6-flash`).
3. Redeploy.

The function uses a fixed system prompt and forwards only AquaGrid's tools, so it can't be used as a general chatbot. On hosts without the function (GitHub Pages, opening the file locally), the page falls back to a box where you can paste your own key, which stays in your browser. **Never commit an API key to this repository.**

## Running locally

Open `index.html` in any browser. No build step or server is needed.

Network, pipe costs, demand and tariff figures are sample data for demonstration.
