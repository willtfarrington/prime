/* ==========================================================================
   prime — progressive enhancement only.
   Every word of content is in the HTML; this file adds three conveniences:
     1. stamps the current year in the footer
     2. highlights the nav link for whichever section is on screen
     3. opens project screenshots in a lightbox instead of a bare image tab
   The page is fully usable with JavaScript disabled.
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
