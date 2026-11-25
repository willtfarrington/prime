/* ==========================================================================
   prime — progressive enhancement only.
   Every word of content is in the HTML save the roadmap figures on the
   project cards; this file adds four conveniences:
     1. stamps the current year in the footer
     2. highlights the nav link for whichever section is on screen
     3. opens project screenshots in a lightbox instead of a bare image tab
     4. draws the project cards' progress bars from Roadmap Wrangler's site
        export (assets/data/projects.json) and hides next-step bullets the
        project has moved past
   The page is fully usable with JavaScript disabled; only those bars, which
   ship hidden, stay out of sight.
   ========================================================================== */
(function () {
  "use strict";

  /* --- 1. footer year ---------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* --- lightbox for .card-shots ------------------------------------------
     Each .shot anchor already links to the full-resolution PNG, so with this
     script absent (or failed) the browser just opens the image. Here we
     intercept the click and show the same file in an overlay with previous /
     next arrows and a close button. The overlay is created once, on the
     first click, and reused. */
  var shots = Array.prototype.slice.call(document.querySelectorAll(".card-shots .shot"));
  if (shots.length) {
    var box = null, boxImg = null, boxCaption = null, prevBtn = null, nextBtn = null;
    var current = 0, lastFocus = null;

    var build = function () {
      box = document.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Enlarged screenshot");
      box.hidden = true;

      var figure = document.createElement("figure");
      boxImg = document.createElement("img");
      boxCaption = document.createElement("figcaption");
      figure.appendChild(boxImg);
      figure.appendChild(boxCaption);
      box.appendChild(figure);

      var makeButton = function (className, label, text) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = className;
        b.setAttribute("aria-label", label);
        b.textContent = text;
        box.appendChild(b);
        return b;
      };
      var closeBtn = makeButton("lightbox-close", "Close", "×");
      prevBtn = makeButton("lightbox-prev", "Previous image", "←");
      nextBtn = makeButton("lightbox-next", "Next image", "→");
      if (shots.length < 2) { prevBtn.hidden = true; nextBtn.hidden = true; }

      var close = function () {
        box.hidden = true;
        document.documentElement.style.overflow = "";
        document.removeEventListener("keydown", onKey);
        if (lastFocus) { lastFocus.focus(); }
      };
      var onKey = function (e) {
        if (e.key === "Escape") { close(); }
        else if (e.key === "ArrowLeft") { show(current - 1); }
        else if (e.key === "ArrowRight") { show(current + 1); }
      };

      closeBtn.addEventListener("click", close);
      prevBtn.addEventListener("click", function () { show(current - 1); });
      nextBtn.addEventListener("click", function () { show(current + 1); });
      // click on the dark backdrop (not the image or a button) also closes
      box.addEventListener("click", function (e) {
        if (e.target === box || e.target === figure) { close(); }
      });
      box.open = function () {
        box.hidden = false;
        document.documentElement.style.overflow = "hidden";
        document.addEventListener("keydown", onKey);
        closeBtn.focus();
      };

      document.body.appendChild(box);
    };

    var show = function (index) {
      current = (index + shots.length) % shots.length;
      var shot = shots[current];
      var thumb = shot.querySelector("img");
      boxImg.src = shot.getAttribute("href");
      boxImg.alt = thumb ? thumb.alt : "";
      var caption = shot.parentNode.querySelector("figcaption");
      boxCaption.textContent = caption ? caption.textContent : "";
    };

    shots.forEach(function (shot, index) {
      shot.addEventListener("click", function (e) {
        // let modified clicks keep their native open-in-new-tab behavior
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) { return; }
        e.preventDefault();
        if (!box) { build(); }
        lastFocus = shot;
        show(index);
        box.open();
      });
    });
  }

  /* --- 4. roadmap figures from the site export ---------------------------
     `crw export site --yes` (Roadmap Wrangler) rewrites
     assets/data/projects.json whole at each export:
       {"as_of": "YYYY-MM-DD",
        "projects": [{"name", "badge", "done", "total", "percent",
                      "next": [{"id", "title", "size"}]}]}
     A card opts in with data-project="<name>". Its .progress block ships
     hidden and empty; here it gets its fill and note and is shown. If the
     file is missing or unreadable (the page opened by double-click, say) or
     names no such project, the block stays hidden: a missing bar beats a
     wrong one. The card's .next list is hand-written for the brief named in
     data-written-for; once the export's first undone row is another brief,
     the list is hidden until someone rewrites it. Text goes in through
     textContent only, never as markup. This block must stay above the
     scroll spy, which returns early when it has nothing to watch. */
  var tracked = Array.prototype.slice.call(document.querySelectorAll(".card[data-project]"));
  if (tracked.length && window.fetch) {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
    // Built from code points: a thin space typed as itself is invisible
    // here and too easy to lose in an edit.
    var APPROX = String.fromCharCode(0x2248, 0x2009);  // &asymp;&thinsp;
    var DOT = " " + String.fromCharCode(0xb7) + " ";    // &middot;

    // "2026-11-25" -> "25 November 2026", the footer's style. Parsed by
    // hand: new Date("2026-11-25") is UTC midnight, which reads as the 24th
    // anywhere west of Greenwich.
    var longDate = function (iso) {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
      if (!m || +m[2] < 1 || +m[2] > 12) { return null; }
      return (+m[3]) + " " + MONTHS[+m[2] - 1] + " " + m[1];
    };
    var isCount = function (n) { return typeof n === "number" && n >= 0 && n % 1 === 0; };

    var draw = function (site) {
      var asOf = site && longDate(site.as_of);
      if (!asOf || !Array.isArray(site.projects)) { return; }
      var byName = Object.create(null);
      site.projects.forEach(function (p) {
        if (p && typeof p.name === "string") { byName[p.name] = p; }
      });

      tracked.forEach(function (card) {
        var p = byName[card.getAttribute("data-project")];
        if (!p) { return; }

        var block = card.querySelector(".progress");
        var track = block && block.querySelector(".progress-track");
        var note = block && block.querySelector(".progress-note");
        if (track && note && isCount(p.done) && isCount(p.total) && p.total > 0 && p.done <= p.total) {
          // A floor under the total, for a roadmap whose later milestones
          // have no rows yet; it retires itself once the rows outgrow it.
          var floor = parseInt(block.getAttribute("data-total-estimate"), 10) || 0;
          var total = Math.max(p.total, floor);
          var pct = Math.floor(p.done * 100 / total);   // rounded down, as the export's own
          track.style.setProperty("--pct", pct + "%");
          note.textContent = p.done + " of " + (total > p.total ? APPROX : "") + total + " " +
            (block.getAttribute("data-unit") || "session briefs") + DOT + "as of " + asOf;
          block.hidden = false;
        }

        var next = card.querySelector(".next[data-written-for]");
        if (next && Array.isArray(p.next)) {
          var first = p.next[0];
          if (!first || first.id !== next.getAttribute("data-written-for")) { next.hidden = true; }
        }
      });
    };

    // no-cache revalidates each visit, so a pushed export shows at once
    // rather than after GitHub Pages' ten-minute cache.
    fetch("assets/data/projects.json", { cache: "no-cache" })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(draw)
      .catch(function () { /* the bars stay hidden */ });
  }

  /* --- 2. scroll spy -----------------------------------------------------
     Only meaningful when the panes are stacked. Side by side, the left and
     right panes occupy the same vertical band, so two sections are on screen
     at once and any single highlight would be arbitrary -- we clear it and
     let the nav sit neutral. */
  var links = Array.prototype.slice.call(document.querySelectorAll(".subnav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) { return; }

  var visible = Object.create(null);

  function clear() {
    links.forEach(function (a) { a.removeAttribute("aria-current"); });
  }

  function paint() {
    // first section in nav order that is currently in the band wins
    for (var i = 0; i < sections.length; i++) {
      if (visible[sections[i].id]) {
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + sections[i].id) {
            a.setAttribute("aria-current", "true");
          } else {
            a.removeAttribute("aria-current");
          }
        });
        return;
      }
    }
    clear();   // nothing in the band (e.g. scrolled onto the footer)
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible[entry.target.id] = entry.isIntersecting;
    });
    paint();
  }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });

  var twoPane = window.matchMedia("(min-width: 900px)");

  function sync() {
    if (twoPane.matches) {
      observer.disconnect();
      visible = Object.create(null);
      clear();
    } else {
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  sync();
  if (twoPane.addEventListener) { twoPane.addEventListener("change", sync); }
  else if (twoPane.addListener) { twoPane.addListener(sync); }
})();
