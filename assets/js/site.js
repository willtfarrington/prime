/* ==========================================================================
   prime — progressive enhancement only.
   Every word of content is in the HTML; this file adds three conveniences:
     1. assembles the email address so scrapers do not harvest it verbatim
     2. stamps the current year in the footer
     3. highlights the nav link for whichever section is on screen
   The page is fully usable with JavaScript disabled.
   ========================================================================== */
(function () {
  "use strict";

  /* --- 1. email ---------------------------------------------------------- */
  var link = document.getElementById("email-link");
  if (link) {
    var address = link.dataset.user + "@" + link.dataset.domain;
    link.href = "mailto:" + address;

    var display = document.getElementById("email-display");
    if (display) {
      var a = document.createElement("a");
      a.href = "mailto:" + address;
      a.textContent = address;
      display.textContent = "";
      display.appendChild(a);
    }
  }

  /* --- 2. footer year ---------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }

  /* --- 3. scroll spy ----------------------------------------------------- */
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
