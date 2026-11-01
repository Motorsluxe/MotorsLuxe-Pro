/* =============================================================================
   MOTORSLUXE PRO — SHARED HEADER & FOOTER
   -----------------------------------------------------------------------------
   One place to edit the navigation & footer for the WHOLE site.
   Every page loads this; it injects the header and footer automatically.
   Add a page link here once and it appears everywhere.
============================================================================= */
(function () {
  "use strict";

  // --- Navigation data (edit here to add/rename pages) ---
  var DETAILING = [
    { label: "Automobile Detailing", href: "detailing-automobile.html" },
    { label: "Golf Cart Detailing", href: "detailing-golf-carts.html" },
    { label: "Off-Road Detailing", href: "detailing-off-road.html" },
  ];
  var SERVICES = [
    { label: "Window Tint", href: "services-window-tint.html" },
    { label: "Paint Correction", href: "services-paint-correction.html" },
    { label: "Headlight Restoration", href: "services-headlight-restoration.html" },
  ];

  var page = location.pathname.split("/").pop() || "index.html";
  var isActive = function (href) { return href.split("#")[0] === page ? ' class="active"' : ""; };
  var ddLinks = function (arr) {
    return arr.map(function (i) { return '<a href="' + i.href + '"' + isActive(i.href) + ">- " + i.label + "</a>"; }).join("");
  };

  // --- HEADER ---
  var header =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container header-inner">' +
        '<a class="brand" href="index.html" aria-label="MotorsLuxe Pro home">' +
          '<img src="assets/logo.png" alt="MotorsLuxe Pro" class="brand-logo" />' +
        "</a>" +
        '<nav class="nav-desktop" aria-label="Primary">' +
          '<div class="nav-item has-dd">' +
            '<button class="nav-trigger" aria-expanded="false">Detailing <i class="caret">›</i></button>' +
            '<div class="dropdown">' + ddLinks(DETAILING) + "</div>" +
          "</div>" +
          '<div class="nav-item has-dd">' +
            '<button class="nav-trigger" aria-expanded="false">Services <i class="caret">›</i></button>' +
            '<div class="dropdown">' + ddLinks(SERVICES) + "</div>" +
          "</div>" +
          '<a href="gallery.html"' + isActive("gallery.html") + ">Gallery</a>" +
          '<a href="our-story.html"' + isActive("our-story.html") + ">Our Story</a>" +
          '<a href="index.html#area">Service Area</a>' +
        "</nav>" +
        '<a class="btn btn-gold btn-sm nav-book" data-book href="#book">Book Your Detail</a>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div>" +
      // Mobile drawer
      '<div class="nav-mobile" id="navMobile" aria-hidden="true">' +
        '<div class="m-group">' +
          '<button class="m-trigger">Detailing <i>+</i></button>' +
          '<div class="m-sub">' + ddLinks(DETAILING) + "</div>" +
        "</div>" +
        '<div class="m-group">' +
          '<button class="m-trigger">Services <i>+</i></button>' +
          '<div class="m-sub">' + ddLinks(SERVICES) + "</div>" +
        "</div>" +
        '<a href="gallery.html">Gallery</a>' +
        '<a href="our-story.html">Our Story</a>' +
        '<a href="index.html#area">Service Area</a>' +
        '<a class="btn btn-gold" data-book href="#book">Book Your Detail</a>' +
      "</div>" +
    "</header>";

  // --- FOOTER ---
  var footer =
    '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
        '<div class="footer-brand">' +
          '<img src="assets/logo.png" alt="MotorsLuxe Pro" class="footer-logo" />' +
          "<p>Luxury mobile automotive detailing, delivered to your door throughout Charleston, " +
          "South Carolina. The very best products for the very best clients.</p>" +
          '<div class="social" id="socialLinks"></div>' +
        "</div>" +
        '<div class="footer-col">' +
          "<h4>Detailing</h4>" +
          DETAILING.map(function (i) { return '<a href="' + i.href + '">' + i.label.replace(" Detailing", "") + "</a>"; }).join("") +
        "</div>" +
        '<div class="footer-col">' +
          "<h4>Services</h4>" +
          SERVICES.map(function (i) { return '<a href="' + i.href + '">' + i.label + "</a>"; }).join("") +
        "</div>" +
        '<div class="footer-col">' +
          "<h4>Explore</h4>" +
          '<a href="gallery.html">Gallery</a>' +
          '<a href="our-story.html">Our Story</a>' +
          '<a data-call id="footerPhone" href="#">Call / Text</a>' +
          '<a data-email id="footerEmail" href="#">Email Us</a>' +
        "</div>" +
      "</div>" +
      '<div class="container footer-bottom">' +
        "<p>© <span id=\"year\"></span> MotorsLuxe Pro™. All rights reserved.</p>" +
        '<div class="footer-legal"><a href="privacy.html">Privacy Policy</a><span>Charleston, SC</span></div>' +
      "</div>" +
    "</footer>";

  // --- Mobile fixed book bar + shared lightbox ---
  var extras =
    '<div class="mobile-bar">' +
      '<a class="btn btn-ghost btn-sm" data-call href="#">Call</a>' +
      '<a class="btn btn-gold btn-sm" data-book href="#book">Book Your Detail</a>' +
    "</div>" +
    '<div class="lightbox" id="lightbox" aria-hidden="true">' +
      '<button class="lightbox-close" data-close aria-label="Close">×</button>' +
      '<div class="lightbox-inner" id="lightboxInner"></div>' +
    "</div>";

  // --- Inject ---
  var h = document.getElementById("mlx-header");
  if (h) h.innerHTML = header;
  var f = document.getElementById("mlx-footer");
  if (f) f.innerHTML = footer + extras;
})();
