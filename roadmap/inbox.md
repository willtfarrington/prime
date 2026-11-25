# Inbox — messages from other projects

Read right after the roadmap at the start of a session. Triage rule (clauderoadmapwrangler D-13):
for each open message, roll it into this session if it fits the brief and is at most S-sized;
otherwise add it to the brief notes of a named later EP or propose a new row in the right phase,
confirming the choice with the owner; or decline with a reason. Write the disposition on the
message's line and tick its box. One message per line,
`- [ ] IN-n (from <project> EP-k, date) text`, delivered by the tool.

- [ ] IN-1 (from clauderoadmapwrangler EP-27, 2026-11-13) From clauderoadmapwrangler's EP-27
  (2026-11-13): Roadmap Wrangler's site export writes `assets/data/projects.json` and
  `assets/data/projects-cards.html` into this repository when the owner runs `crw export site
  --yes`, replacing both at each export, and nothing else here. `projects.json` is `{"as_of":
  "YYYY-MM-DD", "projects": [{"name", "badge", "done", "total", "percent", "next": [{"id", "title",
  "size"}]}]}` for the owner's public projects with a roadmap; the snippet is one `<article
  class="project-card">` per project in a `<div class="project-cards">`, with a `<progress>` bar and
  the next rows. Wire one of them into the page once (fetch the JSON and draw the cards, or include
  the snippet), style the classes, and drop the hand-typed figures they replace; the tool never
  edits the page and never pushes.
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
