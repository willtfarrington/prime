# prime

My primary public repository: an up-to-date curriculum vitae and professional
narrative, plus a guided index of the clinical and peri-clinical data projects
that live in their own repositories.

**Live site:** https://williamtfarrington.com

The site is a single hand-authored static page — no build step, no
dependencies, no external requests. Editing a file and pushing is the entire
deployment process.

---

## Layout

```
index.html              the entire site (all content lives here)
                        two panes: documents/narrative/CV left, projects/toolkit
                        right; they stack into one column below 900px
404.html                not-found page (the only file with absolute paths)
assets/css/site.css     all styling; design tokens at the top of the file
assets/js/site.js       email obfuscation, footer year, nav scroll-spy
assets/img/favicon.svg  monogram favicon
assets/docs/            CV and narrative PDFs go here
.nojekyll               tells GitHub Pages to serve files as-is
robots.txt              crawler policy
```

## Editing the page

Every spot needing your content is marked with an `EDIT:` comment in
`index.html`. Work top to bottom:

| Section | What to supply |
| --- | --- |
| Masthead | Credential line, email, city, licensure, NPI |
| Identifier rail | LinkedIn slug, ORCID iD, Google Scholar profile ID |
| Documents | Drop the two PDFs in, then convert each card to a link (see below) |
| Narrative | Three paragraphs distilled from the full narrative PDF |
| Curriculum vitae | Timeline entries (newest first) and the "At a glance" facts |
| Projects | Sharpen each hook; add cards for private work |
| Toolkit | Prune to what you would defend in an interview |

### Adding the PDFs

1. Save them as `assets/docs/farrington-cv.pdf` and
   `assets/docs/farrington-professional-narrative.pdf`.
2. In `index.html`, change each document card from

   ```html
   <div class="doc"> ... <span>PDF &middot; posting soon</span> ... </div>
   ```

   to

   ```html
   <a class="doc" href="assets/docs/farrington-cv.pdf"> ... <span>PDF</span> ... </a>
   ```

Keep the filenames stable — once they are on a CV or in an email signature,
changing them breaks other people's links. When you revise, overwrite the same
file rather than versioning the filename.

### Adding a project card

Copy an existing `<article class="card">` block in the Projects section:

- Public repo with a link → keep `card--linked` and wrap the `<h3>` text in an `<a>`.
- No public link → drop `card--linked` and leave the `<h3>` as plain text.
- Status badge → `badge--public`, `badge--progress`, or `badge--private`.
- Hook → one sentence, 12–20 words, what it does and why it matters.
- Tags → three to five; stack or method, lowercase.

### Restyling

All color, type, and spacing decisions are CSS custom properties at the top of
`assets/css/site.css`. Change `--accent` alone to re-tone the whole page —
it drives link color, the section rules, and the divider between the panes.
Dark mode and print styles inherit from the same tokens automatically.

To move a section between panes, cut its whole `<section>` block and paste it
into the other `<div class="pane">`. Nothing else needs changing; add
`subhead--first` to a section's first `<h3 class="subhead">` if it lands at the
top of a pane.

## Previewing locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` by double-click also works, but a local server matches
what GitHub Pages actually serves.

## Publishing

GitHub Pages is configured to deploy from the `main` branch, root folder.
Pushing to `main` publishes; the first build takes a minute or two, later ones
are near-instant.

```bash
git add -A && git commit -m "update CV highlights" && git push
```

**When you change `site.css` or `site.js`, bump the `?v=` number on their
`<link>`/`<script>` tags in `index.html` (and `404.html` for the stylesheet).**
GitHub Pages serves assets with a ten-minute cache, so without the bump a
returning visitor can keep rendering the old stylesheet over new markup.

## Domain & DNS (Cloudflare)

The domain is `williamtfarrington.com`, registered at Cloudflare. The `CNAME`
file in this repo is what tells GitHub Pages to answer for it — do not delete
it, and note that GitHub rewrites it if you change the domain in the repo's
Settings → Pages.

### DNS records

In the Cloudflare dashboard → `williamtfarrington.com` → DNS → Records:

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `@` | `willtfarrington.github.io` | **DNS only** (grey cloud) |
| CNAME | `www` | `willtfarrington.github.io` | **DNS only** (grey cloud) |

Cloudflare flattens the apex `CNAME` automatically, so there is no need for the
four GitHub `A` records.

### The proxy gotcha

Leave both records **DNS only** until GitHub finishes issuing the certificate.
With Cloudflare's orange-cloud proxy on, GitHub cannot complete its Let's
Encrypt challenge, so Settings → Pages gets stuck on "certificate in progress"
and **Enforce HTTPS** stays greyed out. Once HTTPS is enforced and the site
loads cleanly, turning the proxy on is optional — if you do, set SSL/TLS mode
to **Full (strict)**, never Flexible, which causes a redirect loop.

### Setup order

1. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
2. Add the two Cloudflare DNS records above, DNS only.
3. Repo → Settings → Pages → Custom domain → `williamtfarrington.com` → Save.
4. Wait for the DNS check to pass (usually minutes), then tick **Enforce HTTPS**.
5. Optional: add a Cloudflare Redirect Rule sending `www` → apex, so one
   canonical URL appears in search results and email signatures.

### Optional: domain-verify to prevent takeover

Repo owner → Settings → Pages → "Verify domain" gives a `TXT` record to add at
Cloudflare. It stops anyone else from ever claiming this domain on GitHub Pages
if the repo is later deleted or renamed. Not required; cheap insurance.

### Optional: a matching email address

Cloudflare Email Routing (free) forwards e.g. `taylor@williamtfarrington.com`
to your Gmail. If you set one up, update `data-user` and `data-domain` on the
email link in `index.html` and the `<noscript>` fallback beneath it.

The `willtfarrington.github.io/prime/` address keeps working alongside the
custom domain.
