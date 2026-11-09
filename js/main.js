/* =============================================================================
   MOTORSLUXE PRO — MAIN SCRIPT
   Handles config wiring, navigation, motion, before/after, gallery & modals.
============================================================================= */
(function () {
  "use strict";
  const CFG = window.SITE_CONFIG || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------- Service detail content */
  const SERVICES = {
    auto: {
      title: "Automobile Detailing",
      img: "assets/service-auto.jpg",
      lead: "Showroom-quality care for your car, truck, or SUV — performed at your location.",
      points: [
        "Hand wash & premium exterior treatment",
        "Wheel, tire & trim detailing",
        "Full interior cleaning & conditioning",
        "Glass & finishing touches",
      ],
    },
    cart: {
      title: "Golf Cart Detailing",
      img: "assets/service-cart.jpg",
      lead: "Specialized cleaning and protection to keep your cart pristine — ideal for Lowcountry island living.",
      points: [
        "Complete body & seat cleaning",
        "Wheel & undercarriage detailing",
        "Protective finishing",
        "Ready for the course or the neighborhood",
      ],
    },
    offroad: {
      title: "Off-Road Vehicle Detailing",
      img: "assets/service-offroad.jpg",
      lead: "Deep cleaning and restoration for RZRs, ATVs, and adventure trucks — so your downtime stays yours.",
      points: [
        "Heavy mud & debris removal",
        "Full exterior & chassis cleaning",
        "Interior restoration",
        "Protective finishing for the next ride",
      ],
    },
  };
  // NOTE: Confirm/edit the bullet points above to match your exact offerings.
  // We intentionally do NOT list prices, packages, or warranties unless you provide them.

  /* ------------------------------------------------- Gallery items */
  // category: exterior | interior | paint | foam. Add real photos later (see README).
  // Add real photos with an `img` path; leave it off for an elegant placeholder.
  const GALLERY = [
    { label: "GMC Yukon AT4", cat: "exterior", size: "span-8", img: "assets/gmc-3.jpg" },
    { label: "Mirror-gloss finish", cat: "paint", size: "span-4", img: "assets/gmc-1.jpg" },
    { label: "Porsche Cayenne interior", cat: "interior", size: "span-4", img: "assets/interior-1.jpg" },
    { label: "Foam wash", cat: "foam", size: "span-8", img: "assets/foam-1.jpg" },
    { label: "Golf cart detail", cat: "exterior", size: "span-4", img: "assets/service-cart.jpg" },
    { label: "Off-road RZR", cat: "exterior", size: "span-4", img: "assets/service-offroad.jpg" },
    { label: "Cayenne cabin", cat: "interior", size: "span-4", img: "assets/interior-3.jpg" },
    { label: "Paint correction", cat: "paint", size: "span-4", img: "assets/paint-4.jpg" },
    { label: "Window tint", cat: "exterior", size: "span-4", img: "assets/tint-1.jpg" },
    { label: "Machine polish", cat: "paint", size: "span-4", img: "assets/paint-1.jpg" },
    { label: "Interior detail", cat: "interior", size: "span-4", img: "assets/interior-2.jpg" },
    { label: "Tint application", cat: "exterior", size: "span-4", img: "assets/tint-3.jpg" },
    { label: "Yukon side profile", cat: "paint", size: "span-4", img: "assets/gmc-2.jpg" },
    { label: "Mobile detail tent", cat: "exterior", size: "span-8", img: "assets/audi-tent.jpg?v=2" },
  ];

  /* ============================================================= CONFIG WIRING */
  function applyConfig() {
    const booking = CFG.bookingUrl && CFG.bookingUrl.trim();
    const phoneHref = (CFG.contact && CFG.contact.phoneHref) || "";
    const phoneDisplay = (CFG.contact && CFG.contact.phoneDisplay) || "";
    const email = (CFG.contact && CFG.contact.email) || "";

    // Booking buttons -> external tool (new tab) OR fallback to SMS/phone.
    $$("[data-book]").forEach((el) => {
      if (booking) {
        el.setAttribute("href", booking);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else if (phoneHref) {
        el.setAttribute("href", phoneHref);
      }
    });

    // Call / text buttons
    $$("[data-call]").forEach((el) => {
      if (phoneHref) el.setAttribute("href", phoneHref);
      if (phoneDisplay && el.id === "footerPhone") el.textContent = phoneDisplay;
    });

    // Email buttons
    $$("[data-email]").forEach((el) => {
      if (email) el.setAttribute("href", "mailto:" + email);
    });

    // Reviews
    const reviewUrl = CFG.reviews && CFG.reviews.googleReviewUrl;
    const profileUrl = CFG.reviews && CFG.reviews.googleProfileUrl;
    $$("[data-review]").forEach((el) => {
      if (reviewUrl) { el.setAttribute("href", reviewUrl); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      else { el.style.display = "none"; }
    });
    $$("[data-reviews-all]").forEach((el) => {
      if (profileUrl) { el.setAttribute("href", profileUrl); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      else { el.style.display = "none"; }
    });

    // Booking note under main CTA
    const note = $("#bookNote");
    if (note) {
      if (booking) note.textContent = "You'll be taken to our secure booking page.";
      else if (phoneDisplay) note.textContent = "Call or text us at " + phoneDisplay + " to schedule.";
    }

    // "Follow on Instagram" buttons
    const ig = CFG.social && CFG.social.instagram;
    $$("[data-instagram]").forEach((el) => {
      if (ig && ig.trim()) {
        el.setAttribute("href", ig);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        el.style.display = "none";
      }
    });

    // Social icons
    buildSocial();

    // Year
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  }

  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.46 2.21 8.84 2.2 12 2.2m0 1.98c-3.14 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7-.06 1.24-.07 1.6-.07 4.74s0 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.9 2.9 0 0 0-.68-1.06 2.9 2.9 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32-1.24-.06-1.6-.07-4.74-.07m0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9m0 7.34a2.89 2.89 0 1 0 0-5.78 2.89 2.89 0 0 0 0 5.78m5.67-7.54a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.9a2.44 2.44 0 1 1-2.44-2.44c.26 0 .5.04.74.12v-3.3a5.74 5.74 0 1 0 4.9 5.68V9.01a7.3 7.3 0 0 0 4.26 1.36V7.17a4.28 4.28 0 0 1-3.2-1.35"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5M9.75 15.5v-7l6 3.5z"/></svg>',
  };
  function buildSocial() {
    const wrap = $("#socialLinks");
    if (!wrap || !CFG.social) return;
    let html = "";
    Object.keys(ICONS).forEach((k) => {
      const url = CFG.social[k];
      if (url && url.trim()) {
        html += `<a href="${url}" target="_blank" rel="noopener" aria-label="${k}">${ICONS[k]}</a>`;
      }
    });
    wrap.innerHTML = html || '<span style="color:var(--gray-dim);font-size:.8rem">Add social links in js/site-config.js</span>';
  }

  /* ============================================================= REVIEWS FALLBACK */
  // Hide the "building our reviews" fallback once the live widget renders content.
  function initReviewsFallback() {
    const widget = $("#reviewsWidget");
    const empty = $("#reviewsEmpty");
    if (!widget || !empty) return;
    let tries = 0;
    const check = () => {
      tries++;
      const h = widget.getBoundingClientRect().height;
      const hasContent = h > 60 || widget.querySelector("[class*='ti-'], iframe, img");
      if (hasContent) { empty.style.display = "none"; return; }
      if (tries < 12) setTimeout(check, 1000); // keep checking ~12s
    };
    setTimeout(check, 1500);
  }

  /* ============================================================= NAVIGATION */
  function initNav() {
    const header = $("#siteHeader");
    const toggle = $("#navToggle");
    const drawer = $("#navMobile");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    toggle.addEventListener("click", () => {
      const open = toggle.classList.toggle("open");
      drawer.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      drawer.setAttribute("aria-hidden", !open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("#navMobile a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        drawer.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
    // mobile dropdown accordions
    $$("#navMobile .m-trigger").forEach((btn) =>
      btn.addEventListener("click", () => btn.closest(".m-group").classList.toggle("open"))
    );

    // desktop dropdowns: open on CLICK (not hover) — styles set directly for reliability
    const navItems = $$(".nav-desktop .nav-item.has-dd");
    const setDD = (item, open) => {
      const dd = $(".dropdown", item);
      const trig = $(".nav-trigger", item);
      item.classList.toggle("open", open);
      if (trig) trig.setAttribute("aria-expanded", open ? "true" : "false");
      if (!dd) return;
      dd.style.opacity = open ? "1" : "0";
      dd.style.visibility = open ? "visible" : "hidden";
      dd.style.transform = open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(10px)";
    };
    navItems.forEach((item) => {
      const trig = $(".nav-trigger", item);
      if (!trig) return;
      setDD(item, false);
      trig.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !item.classList.contains("open");
        navItems.forEach((i) => setDD(i, false));
        setDD(item, willOpen);
      });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-desktop .nav-item.has-dd")) navItems.forEach((i) => setDD(i, false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") navItems.forEach((i) => setDD(i, false));
    });
  }

  /* ============================================================= GALLERY */
  function buildGallery() {
    const grid = $("#galleryGrid");
    if (!grid) return;
    grid.innerHTML = GALLERY.map((g) => {
      const slot = g.img
        ? `<div class="media-slot has-img" style="background-image:url('${g.img}');background-size:cover;background-position:center;"></div>`
        : `<div class="media-slot" data-label="${g.label}"></div>`;
      return `<div class="gallery-item ${g.size} ${g.tall ? "tall" : ""}" data-cat="${g.cat}" data-img="${g.img || ""}" data-label="${g.label}">${slot}</div>`;
    }).join("");

    // Filters
    $$("#galleryFilters .chip").forEach((chip) =>
      chip.addEventListener("click", () => {
        $$("#galleryFilters .chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const f = chip.dataset.filter;
        $$(".gallery-item", grid).forEach((item) => {
          item.classList.toggle("hide", f !== "all" && item.dataset.cat !== f);
        });
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      })
    );

    // Lightbox
    const lb = $("#lightbox");
    const lbInner = $("#lightboxInner");
    $$(".gallery-item", grid).forEach((item) =>
      item.addEventListener("click", () => {
        const img = item.dataset.img;
        const label = item.dataset.label;
        lbInner.innerHTML = img
          ? `<div class="media-slot has-img" style="background-image:url('${img}');background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#000"></div>`
          : `<div class="media-slot" data-label="${label}"></div>`;
        openOverlay(lb);
      })
    );
  }

  /* ============================================================= MODAL / LIGHTBOX */
  function openOverlay(el) { if (!el) return; el.classList.add("open"); el.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeOverlay(el) { if (!el) return; el.classList.remove("open"); el.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  function initModals() {
    const modal = $("#serviceModal");
    const content = $("#modalContent");
    $$("[data-more]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const s = SERVICES[btn.dataset.more];
        if (!s) return;
        const mm = modal.querySelector(".modal-media");
        if (mm && s.img) {
          mm.classList.add("has-img");
          mm.style.backgroundImage = "url('" + s.img + "')";
          mm.style.backgroundSize = "cover";
          mm.style.backgroundPosition = "center";
        }
        content.innerHTML =
          `<p class="eyebrow">MotorsLuxe Pro</p><h3>${s.title}</h3><p>${s.lead}</p>` +
          `<ul>${s.points.map((p) => `<li>${p}</li>`).join("")}</ul>` +
          `<a class="btn btn-gold" data-book href="#book">Request a Quote</a>`;
        // re-wire the newly added book button
        applyBookToEl($("[data-book]", content));
        openOverlay(modal);
      })
    );

    $$("[data-close]").forEach((el) =>
      el.addEventListener("click", () => {
        closeOverlay($("#serviceModal"));
        closeOverlay($("#lightbox"));
      })
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeOverlay($("#serviceModal")); closeOverlay($("#lightbox")); }
    });
  }

  function applyBookToEl(el) {
    if (!el) return;
    const booking = CFG.bookingUrl && CFG.bookingUrl.trim();
    const phoneHref = (CFG.contact && CFG.contact.phoneHref) || "";
    if (booking) { el.href = booking; el.target = "_blank"; el.rel = "noopener"; }
    else if (phoneHref) { el.href = phoneHref; }
  }

  /* ============================================================= BEFORE / AFTER */
  function initBeforeAfter() {
    const slider = $("#baSlider");
    if (!slider) return;
    const before = $("#baBefore");
    const handle = $("#baHandle");
    let dragging = false;

    const setPos = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
    };
    const start = () => (dragging = true);
    const end = () => (dragging = false);
    const move = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
    };
    slider.addEventListener("mousedown", (e) => { start(); setPos(e.clientX); });
    slider.addEventListener("touchstart", (e) => { start(); setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
  }

  /* ============================================================= MOTION (GSAP) */
  function initMotion() {
    const reveals = $$(".reveal");
    if (prefersReduced || !window.gsap) {
      reveals.forEach((r) => r.classList.add("in"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Hero headline — line-by-line reveal
    gsap.set(".hero-title .line > span", { yPercent: 110 });
    const tl = gsap.timeline({ delay: 0.25 });
    tl.to(".hero-title .line > span", {
      yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12,
    });
    // Hero supporting content
    gsap.to(".hero .reveal", {
      opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.6,
    });
    gsap.set(".hero .reveal", { y: 24 });

    // Generic scroll reveals
    reveals.forEach((el) => {
      if (el.closest(".hero")) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => el.classList.add("in"),
      });
    });

    // Parallax on media slots
    $$(".about-media, .area-map").forEach((el) => {
      gsap.to(el, {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Subtle hero video parallax
    const hv = $(".hero-media");
    if (hv) {
      gsap.to(hv, { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }
  }

  /* ============================================================= INIT */
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    initReviewsFallback();
    initNav();
    buildGallery();
    initModals();
    initBeforeAfter();
    initMotion();
  });
})();
