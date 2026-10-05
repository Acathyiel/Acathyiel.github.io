(() => {
  const D = PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const removeSection = id => {
    document.getElementById(id)?.remove();
    $(`.nav-links a[href="#${id}"]`)?.parentElement.remove();
  };

  /* =========================================================
     Render content from data.js
     ========================================================= */
  document.title = `${D.name} | ${D.role}`;
  $$("[data-field]").forEach(el => { const v = D[el.dataset.field]; if (v != null) el.textContent = v; });
  $("#heroName").textContent = `${D.name}.`;
  $("#year").textContent = new Date().getFullYear();

  // Hero photo
  if (D.photo) {
    $("#heroImg").src = D.photo;
    $("#heroImg").alt = D.name;
    $("#heroCaptionText").textContent = [D.location, D.availability].filter(Boolean).join(" · ");
  } else {
    $("#heroPhoto").remove();
    $(".hero").classList.add("no-photo");
  }

  // About: split into words for scroll lighting
  $("#aboutText").innerHTML = (D.about || []).map(p =>
    `<p>${p.split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(" ")}</p>`).join("");

  // Stats
  const stats = D.stats || [];
  if (stats.length) {
    $("#statStage").innerHTML = stats.map(s =>
      `<div class="stat"><div class="stat-value" data-value="${esc(s.value)}">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join("");
    $("#statDots").innerHTML = stats.map(() => "<i></i>").join("");
    $("#stats").style.height = `${stats.length * 80 + 100}vh`;
  } else removeSection("stats");

  // Skills: bento tiles
  const icons = [
    '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/>',
    '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M3 13h18"/>',
    '<path d="M4 20h16M6 16l3-9 3 5 3-7 3 11"/>',
    '<rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9.5 1.5v3M14.5 1.5v3M9.5 19.5v3M14.5 19.5v3M1.5 9.5h3M1.5 14.5h3M19.5 9.5h3M19.5 14.5h3"/>',
  ];
  const sizes = ["wide", "narrow", "narrow", "wide"];
  const skills = D.skills || [];
  if (skills.length) {
    $("#bento").innerHTML = skills.map((g, i) => `
      <article class="tile reveal ${sizes[i % 4]} ${i === skills.length - 1 && skills.length > 2 ? "ink" : ""}">
        <div>
          <div class="tile-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icons[i % icons.length]}</svg></div>
        </div>
        <div>
          <h3>${esc(g.group)}.<span class="count">${g.items.length} ${g.items.length === 1 ? "skill" : "skills"}</span></h3>
          <div class="chips" style="margin-top:20px">${g.items.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
  } else removeSection("skills");

  // Experience & leadership share one layout
  const roleBlocks = list => list.map(e => `
      <article class="exp">
        <div class="exp-side reveal">
          <div class="exp-period">${esc(e.period)}${e.type ? `<span class="badge">${esc(e.type)}</span>` : ""}</div>
          <h3 class="exp-role">${esc(e.role)}</h3>
          <div class="exp-company">${e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.company)}</a>` : esc(e.company)}</div>
          ${e.location ? `<div class="exp-loc">${esc(e.location)}</div>` : ""}
          ${e.note ? `<div class="exp-note">${esc(e.note)}</div>` : ""}
          <div class="chips exp-tags">${(e.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        </div>
        <ol class="exp-points">${(e.points || []).map(p => `<li class="reveal">${esc(p)}</li>`).join("")}</ol>
      </article>`).join("");
  const exp = D.experience || [], lead = D.leadership || [];
  if (exp.length) $("#expList").innerHTML = roleBlocks(exp); else removeSection("experience");
  if (lead.length) $("#leadList").innerHTML = roleBlocks(lead); else removeSection("leadership");

  // Achievements
  const awards = D.achievements || [];
  if (awards.length) {
    $("#awards").innerHTML = awards.map(a => `
      <li class="award reveal">
        <span class="award-year">${esc(a.year || "")}</span>
        <div><h3>${esc(a.title)}</h3>${a.detail ? `<p>${esc(a.detail)}</p>` : ""}</div>
      </li>`).join("");
  } else removeSection("recognition");

  // Work: horizontal cards with soft mesh gradients
  const palettes = [
    ["#e3ebff", "#8ab4ff", "#c7b5ff"],
    ["#ffeee4", "#ffb48c", "#ff94b8"],
    ["#e1f6ee", "#7fd8b6", "#9ccaff"],
    ["#f4ecff", "#d39bff", "#ffb3d6"],
  ];
  const mesh = ([base, a, b]) =>
    `background:radial-gradient(60% 70% at 20% 25%, ${a}, transparent 70%),radial-gradient(55% 65% at 85% 75%, ${b}, transparent 70%),${base}`;
  const projects = D.projects || [];
  if (projects.length) {
    $("#workTrack").innerHTML = projects.map((p, i) => `
      <article class="card">
        <div class="card-visual">
          <div class="card-bg" style="${p.image ? "" : mesh(palettes[i % palettes.length])}">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" />` : ""}</div>
          <span class="card-cat">${esc(p.category || "")}</span>
          <span class="card-num">${String(i + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</span>
          <h3 class="card-title">${esc(p.title)}</h3>
        </div>
        <div class="card-body">
          <p>${esc(p.description)}</p>
          <div class="card-meta">
            <div class="chips">${(p.tags || []).map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
            <span class="card-year">${esc(p.year || "")}</span>
          </div>
          ${(p.links || []).length ? `<div class="card-links">${p.links.map(l =>
            `<a class="link-chev" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>` : ""}
        </div>
      </article>`).join("");
  } else removeSection("work");

  // Education & certifications
  const edu = D.education || [], certs = D.certifications || [];
  if (edu.length || certs.length) {
    $("#eduGrid").innerHTML = edu.map((e, i) => `
      <div class="par" data-speed="${i % 2 ? .06 : 0}">
        <article class="edu-card reveal">
          <div class="edu-school">${esc(e.school)}</div>
          <h3 class="edu-degree">${esc(e.degree)}</h3>
          ${e.detail ? `<p class="edu-detail">${esc(e.detail)}</p>` : ""}
          <div class="edu-period">${esc(e.period)}</div>
        </article>
      </div>`).join("");
    $("#certList").innerHTML = certs.map(c => `
      <a class="cert reveal" href="${esc(c.url || "#")}" target="_blank" rel="noopener"><b>${esc(c.name)}</b><span>${esc(c.issuer)} · ${esc(c.year)}</span></a>`).join("");
  } else removeSection("education");

  // Testimonials
  if ((D.testimonials || []).length) {
    $("#quotes").innerHTML = D.testimonials.map(t => `
      <figure class="quote reveal"><blockquote>“${esc(t.quote)}”</blockquote>
        <figcaption><b>${esc(t.name)}</b> · ${esc(t.title)}</figcaption></figure>`).join("");
  } else removeSection("testimonials");

  // Contact + footer links
  $("#emailLink").textContent = D.email;
  $("#emailLink").href = `mailto:${D.email}`;
  const socials = D.socials || [];
  $("#contactSocials").innerHTML = socials.map(s =>
    `<a class="link-chev" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("");
  $("#footerLinks").innerHTML = [
    ...socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`),
    D.resumeUrl ? `<a href="${esc(D.resumeUrl)}" target="_blank" rel="noopener">Résumé</a>` : "",
    `<a href="mailto:${esc(D.email)}">Email</a>`,
  ].join("");

  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(`Hello from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\nFrom ${f.get("name")} (${f.get("email")})`);
    location.href = `mailto:${D.email}?subject=${subject}&body=${body}`;
  });

  // Gradient definition used by the dark bento tile icon
  document.body.insertAdjacentHTML("afterbegin",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="g" x1="0" x2="1">
      <stop offset="0" stop-color="#2997ff"/><stop offset=".5" stop-color="#9b7bff"/><stop offset="1" stop-color="#ff6b9a"/></linearGradient></defs></svg>`);

  /* =========================================================
     Sleek cursor (mouse / trackpad only)
     ========================================================= */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !RM) {
    const root = document.documentElement;
    root.classList.add("has-cursor");
    document.body.insertAdjacentHTML("beforeend", '<div class="cursor-lens"></div>');
    const lens = $(".cursor-lens");
    const m = { x: -100, y: -100 }, r = { x: -100, y: -100 };
    addEventListener("mousemove", e => {
      m.x = e.clientX; m.y = e.clientY;
      if (!root.classList.contains("cursor-on")) { r.x = m.x; r.y = m.y; }   // no swoop-in from the corner
      root.classList.add("cursor-on");
      const t = e.target;
      root.classList.toggle("cursor-text", !!t.closest?.("input, textarea"));
      root.classList.toggle("cursor-hover", !!t.closest?.("a, button, label"));
    }, { passive: true });
    document.addEventListener("mouseleave", () => root.classList.remove("cursor-on"));
    addEventListener("mousedown", () => root.classList.add("cursor-down"));
    addEventListener("mouseup", () => root.classList.remove("cursor-down"));
    (function follow() {
      r.x += (m.x - r.x) * .22; r.y += (m.y - r.y) * .22;   // lens glides just behind the pointer
      lens.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
      requestAnimationFrame(follow);
    })();
  }

  /* =========================================================
     Menu
     ========================================================= */
  const burger = $("#burger");
  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
  });
  $("#navLinks").addEventListener("click", e => {
    if (e.target.closest("a")) { document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", false); }
  });

  /* =========================================================
     Reveal on enter (blur-rise, staggered among siblings)
     ========================================================= */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const t = en.target;
      const sibs = [...t.parentElement.children].filter(c => c.classList.contains("reveal"));
      t.style.transitionDelay = `${Math.min(sibs.indexOf(t), 5) * 90}ms`;
      t.classList.add("in");
      io.unobserve(t);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach(el => io.observe(el));

  /* =========================================================
     Stat count-up
     ========================================================= */
  const countUp = el => {
    // Only count values that lead with a number ("500+", "1.9 yrs"): never "Rank 3"
    const text = el.dataset.value, m = text.match(/^\d+(?:\.\d+)?/);
    if (!m || RM) { el.textContent = text; return; }
    const target = parseFloat(m[0]), dec = (m[0].split(".")[1] || "").length, t0 = performance.now();
    const tick = now => {
      const k = clamp((now - t0) / 1400), v = target * (1 - Math.pow(2, -10 * k));
      el.textContent = text.replace(m[0], (k >= 1 ? target : v).toFixed(dec));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* =========================================================
     Scroll engine: every scene reads one progress value
     ========================================================= */
  const nav = $("#nav");
  const hero = $(".hero"), heroCopy = $("#heroCopy"), heroPhoto = $("#heroPhoto"),
        heroCap = $("#heroCaption"), heroGlow = $("#heroGlow"), cue = $("#scrollCue");
  const words = $$("#aboutText .w"), aboutEl = $("#aboutText");
  const statsEl = $("#stats"), statEls = $$(".stat"), dotEls = $$("#statDots i");
  const workPin = $("#workPin"), track = $("#workTrack"), bar = $("#workBar");
  const cardBgs = $$(".card-bg");
  const contactTitle = $("#contactTitle"), contactEl = $("#contact");
  const darks = $$("[data-tone='dark']");
  const pars = $$("[data-speed]");

  let vh = innerHeight, vw = innerWidth, workMax = 0, desktopWork = false, litCount = -1, statIdx = -1;

  const pinProgress = el => {
    const r = el.getBoundingClientRect();
    return clamp(-r.top / (r.height - vh));
  };

  const measure = () => {
    vh = innerHeight; vw = innerWidth;
    desktopWork = !RM && vw > 900 && track;
    if (track && workPin) {
      if (desktopWork) {
        workMax = Math.max(0, track.scrollWidth - vw);
        workPin.style.height = `${workMax + vh}px`;
      } else {
        workPin.style.height = "";
        track.style.transform = "";
      }
    }
    update();
  };

  const cardParallax = () => {
    cardBgs.forEach(bg => {
      const r = bg.parentElement.getBoundingClientRect();
      const off = (r.left + r.width / 2 - vw / 2) / vw;
      bg.style.transform = `translate3d(${off * -70}px,0,0) scale(1.08)`;
    });
  };

  function update() {
    ticking = false;

    // Hero: copy dissolves, photo rises into place
    if (hero && !RM) {
      const p = pinProgress(hero);
      const c = clamp(p / .42);
      heroCopy.style.opacity = 1 - c;
      heroCopy.style.transform = `translate3d(0,${-c * 70}px,0) scale(${1 - c * .08})`;
      heroCopy.style.filter = c > 0.01 ? `blur(${c * 10}px)` : "";
      if (heroPhoto) {
        const ph = easeInOut(clamp((p - .04) / .66));
        heroPhoto.style.transform = `translate(-50%,-50%) translate3d(0,${(1 - ph) * 62}vh,0) scale(${.78 + .22 * ph})`;
        heroCap.style.opacity = clamp((p - .72) / .18);
        heroGlow.style.opacity = ph * .9;
      }
      cue.style.opacity = clamp(1 - p * 8);
    }

    // About: light words progressively
    if (aboutEl && words.length) {
      const r = aboutEl.getBoundingClientRect();
      const p = clamp((vh * .85 - r.top) / (r.height + vh * .25));
      const n = Math.round(p * words.length);
      if (n !== litCount) {
        words.forEach((w, i) => w.classList.toggle("on", i < n));
        litCount = n;
      }
    }

    // Stats: one at a time
    if (statsEl && statEls.length && !RM) {
      const p = pinProgress(statsEl);
      const r = statsEl.getBoundingClientRect();
      const inView = r.top < vh * .5 && r.bottom > vh * .5;
      const idx = inView ? Math.min(statEls.length - 1, Math.floor(p * statEls.length * .999)) : -1;
      if (idx !== statIdx) {
        statEls.forEach((s, i) => {
          s.classList.toggle("active", i === idx);
          s.classList.toggle("past", idx > -1 && i < idx);
        });
        dotEls.forEach((d, i) => d.classList.toggle("on", i === idx));
        if (idx > -1) countUp($(".stat-value", statEls[idx]));
        statIdx = idx;
      }
    }

    // Work: vertical scroll drives horizontal track
    if (desktopWork) {
      const p = pinProgress(workPin);
      track.style.transform = `translate3d(${-p * workMax}px,0,0)`;
      bar.style.transform = `scaleX(${p})`;
      cardParallax();
    }

    // Contact headline scales up into place
    if (contactTitle && !RM) {
      const r = contactEl.getBoundingClientRect();
      const p = easeInOut(clamp((vh - r.top) / (vh * .75)));
      contactTitle.style.transform = `scale(${.78 + .22 * p})`;
      contactTitle.style.opacity = .15 + .85 * p;
    }

    // Gentle parallax
    if (!RM) pars.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const off = clamp(r.top + r.height / 2 - vh / 2, -vh, vh);
      el.style.transform = `translate3d(0,${off * -parseFloat(el.dataset.speed)}px,0)`;
    });

    // Nav tone flips over dark sections
    const onDark = darks.some(s => { const r = s.getBoundingClientRect(); return r.top <= 26 && r.bottom >= 26; });
    nav.classList.toggle("on-dark", onDark && !document.body.classList.contains("menu-open"));
  }

  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", measure);
  track?.addEventListener("scroll", () => requestAnimationFrame(cardParallax), { passive: true });
  if (document.fonts) document.fonts.ready.then(measure);
  addEventListener("load", measure);
  measure();
  cardParallax();
})();
