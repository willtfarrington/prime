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

  /* --- 2. scroll spy ----------------------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".subnav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (a) {
          var active = a.getAttribute("href") === "#" + entry.target.id;
          if (active) { a.setAttribute("aria-current", "true"); }
          else { a.removeAttribute("aria-current"); }
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
