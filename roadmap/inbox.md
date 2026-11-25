# Inbox — messages from other projects

Read right after the roadmap at the start of a session. Triage rule (clauderoadmapwrangler D-13):
for each open message, roll it into this session if it fits the brief and is at most S-sized;
otherwise add it to the brief notes of a named later EP or propose a new row in the right phase,
confirming the choice with the owner; or decline with a reason. Write the disposition on the
message's line and tick its box. One message per line,
`- [ ] IN-n (from <project> EP-k, date) text`, delivered by the tool.

- [x] IN-1 (from clauderoadmapwrangler EP-27, 2026-11-13) From clauderoadmapwrangler's EP-27
  (2026-11-13): Roadmap Wrangler's site export writes `assets/data/projects.json` and
  `assets/data/projects-cards.html` into this repository when the owner runs `crw export site
  --yes`, replacing both at each export, and nothing else here. `projects.json` is `{"as_of":
  "YYYY-MM-DD", "projects": [{"name", "badge", "done", "total", "percent", "next": [{"id", "title",
  "size"}]}]}` for the owner's public projects with a roadmap; the snippet is one `<article
  class="project-card">` per project in a `<div class="project-cards">`, with a `<progress>` bar and
  the next rows. Wire one of them into the page once (fetch the JSON and draw the cards, or include
  the snippet), style the classes, and drop the hand-typed figures they replace; the tool never
  edits the page and never pushes.
  **Disposition (2026-11-25, the owner's session for the remaining inbox): rolled in** on the
  owner's word. The export refreshed (`crw export site --yes`, as of 2026-11-25) and wired as JSON:
  `site.js` fetches `projects.json` and fills the bar and count on each card that names its project
  (`data-project`), whose block ships hidden, so without JavaScript no bar shows rather than a stale
  one; the unused snippet is git-ignored, so its classes need no style. The hand-written Next/Then
  bullets stay, each keyed to the brief it describes (`data-written-for`) and hidden once the
  export's first undone row is another; clauderoadmapwrangler's rewritten for EP-59. Two figures the
  export cannot give yet, which the owner turned into messages (sent by `crw send`) and IN-3:
  mimicwarehouse, a data repository left out unread, keeps its hand-typed bar until it publishes
  its own figures (mimicwarehouse IN-3, clauderoadmapwrangler IN-19); phillysim's total holds a
  floor of 40 (`data-total-estimate`) while its M4–M8 have no rows (phillysim IN-2). Every other
  answer the recommended option. The README and the page's comments follow; checked in headless
  Edge against the live export, a doctored one, a broken file and `file://`.
- [x] IN-2 (from the owner, 2026-11-25) Sweep (Roadmap Wrangler EP-55): in one session I open here,
  /roadmap-wrangler:status first, settle with me: (1) State: active; paused, with a reason and a
  pickup note; maintenance, and what that means here; done; or abandoned and archived. I set it on
  its row in Roadmap Wrangler. (2) House style: Roadmap Wrangler treats this repository as the site
  its project cards go to, not a roadmap project: settle whether it stays so (unformalised by my
  choice) or takes a roadmap (/roadmap-wrangler:plan) and the house-style files
  (/roadmap-wrangler:formalise). (3) Sizes: a brief is S (about 30 min of active work) or M (about
  45), no L, an open L split at pickup, as the rule block's Sizes bullet says. (4) Manual: whether
  it works well enough to owe one (Markdown built to PDF, a convention still to come); note my
  answer. Record the outcome (a dated note in its roadmap where it has one) and tick this.
  **Disposition (2026-11-25, the sweep's session): settled** with the owner, every answer the
  recommended option, after /roadmap-wrangler:status (no roadmap, no problems). (1) State:
  **maintenance**, which here means upkeep only: the CV and narrative PDFs overwritten in place,
  the tile's vintage line moved with them, the project cards refreshed, the domain and HTTPS kept
  working; no planned feature work; sessions opened by hand. The owner sets it on the row.
  (2) House style: **stays the site** the project cards are exported into, unformalised by the
  owner's choice (crw's D-6): no plan and no formalise; this inbox is its only roadmap file.
  (3) Sizes: any brief this repository ever holds is S or M, no L; none exists, so nothing is
  re-sized; hand-opened sessions carry no size. (4) Manual: **none owed**; the README's editing
  guide serves. This repository has no roadmap, so this line is the record.
- [ ] IN-3 (from prime, 2026-11-25) Follow-up to IN-1, for a session once mimicwarehouse's and
  phillysim's sweeps have answered the messages of 2026-11-25 (mimicwarehouse IN-3,
  clauderoadmapwrangler IN-19, phillysim IN-2); until then it stays open. (1) When `crw export
  site` carries mimicwarehouse from figures it publishes itself, give its card
  `data-project="mimicwarehouse"` and an empty hidden progress block, key its bullets with
  `data-written-for`, and drop its hand-typed bar, its comment and the README's exception.
  (2) Settle phillysim's bar with the owner once its roadmap says how far v1 runs, dropping
  `data-total-estimate` when its rows cover v1. (3) Re-run the export, check every card in a
  browser, and put the commit and any push to the owner.
