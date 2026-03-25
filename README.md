### Installation

Install all dependencies:
```bash
npm run install:all
```

### Running Locally

Start both client and server in development mode:
```bash
npm run dev
```
- **Client** → http://localhost:5173
- **Server** → http://localhost:3001

Both run concurrently with hot reload enabled.

### Build
```bash
npm run build --prefix client
```
---
## How to validate

Metrics are sent automatically 30 seconds after page load. To validate:

**Option 1 — Browser**
Open http://localhost:3001/metrics after 30 seconds on the page.

**Option 2 — curl**
```bash
curl http://localhost:3001/metrics
```

Expected response shape:
```json
{
  "pauseCount": 2,
  "visibleSeconds": 28.45,
  "uniqueSecondsPlayed": 15,
  "playedWhileVisibleSeconds": 14.2,
  "sentAt": "2025-01-01T00:00:30.000Z"
}
```

The server also logs the payload to the terminal on every POST.

---
## Assumptions & Decisions

- Visibility (Metrics 2 & 4)

  - IntersectionObserver with threshold: 0.5 — fires when ≥50% of the video element is in the viewport.
  - Time is measured using Date.now() diffs at state-change boundaries (enter/exit viewport), not via setInterval.
  - Page Visibility API (visibilitychange) is used in tandem — if the user switches tabs or minimises the browser, the visibility timer pauses even if the video element remains geometrically
    in the viewport.

- Unique seconds played (Metric 3)

  - A Set<number> stores Math.floor(currentTime) values captured on timeupdate events.
  - timeupdate fires ~4 times/second; an early-return guard (lastTrackedSecond ref) prevents redundant Set operations within the same integer second, reducing work by ~75%.
  - Seeking forward does not credit skipped seconds — only seconds where timeupdate actually fires while the video is playing are counted.
  - Playback rates > 1× may occasionally skip a second if timeupdate fires less frequently than the playback speed advances. This is an accepted tradeoff and documented here.

- Pause count (Metric 1)

  - The native pause event is used. The ended event is not counted as a pause — guarded via !video.ended.
  - Auto-pause triggered by tab switching is also excluded because the visibilitychange handler runs before the browser-triggered pause in practice, and the ended guard covers the edge case 
    on some mobile browsers.

- 30-second timer

  - setTimeout with a 30s delay reads metrics from useRef at fire time, avoiding stale closure issues.
  - The fetch POST uses AbortController with a 5-second timeout to avoid hanging requests.

- Architecture

  - All metrics state is stored in a single useRef object (no useState) to avoid triggering React re-renders during tracking.
  - useEngagementMetrics is a self-contained hook — the component only passes a videoRef; the hook owns all side effects and cleans them up on unmount.

---

## AI Usage

- AI was used to generate the initial component structure (UI), hook logic (based on my detailed step-by-step plan and edge cases), sample data for videos.
- Manually verified: IntersectionObserver threshold behaviour, `pause`/`ended` event distinction, stale closure fix via `useRef`, `Page Visibility API` integration, `AbortController` timeout pattern, and Tailwind v4 `@theme` syntax, UI/UX mobile/PC/tablet.

