/* ==========================================================================
   prime — progressive enhancement only.
   Every word of content is in the HTML; this file adds two conveniences:
     1. stamps the current year in the footer
     2. highlights the nav link for whichever section is on screen
   The page is fully usable with JavaScript disabled.
   ========================================================================== */
(function () {
  "use strict";

  /* --- 1. footer year ---------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

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
