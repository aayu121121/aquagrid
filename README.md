# AquaGrid: Water Distribution Network Planner

Project P72 – Foundations of AI and Authentic Intelligence integrated project (Domain: Utilities).

AquaGrid is an AI agent that helps utility engineers manage water pressure and leaks. This website is a live demo of the Phase 1 work (Introduction and Searching Decisions):

- **Network planner** – flow paths from reservoir to demand zones with BFS, DFS, uniform-cost search, greedy best-first and A* (Euclidean and Manhattan heuristics). Click a pipe to isolate it as a leak.
- **AquaGrid agent chat** – a tool-using agent that runs the planner, compares algorithms, checks heuristic admissibility, optimises valves and isolates leaking pipes. Isolation needs human-reviewer approval.
- **Search comparison** – nodes expanded, path cost, time and optimality for every algorithm.
- **Valve scheduling** – hill climbing and simulated annealing against a naive baseline, with a convergence plot.
- PEAS description, environment classification, LangGraph architecture, 28-day plan and syllabus coverage.

## Running the agent

The chat agent uses the Gemini API. Paste your own key (free from Google AI Studio) into the key box on the page. It is stored only in your browser's localStorage and is sent only to Google. **Never commit an API key to this repository.**

## Running locally

Open `index.html` in any browser. No build step or server is needed.

Network, pipe costs, demand and tariff figures are sample data for demonstration.
