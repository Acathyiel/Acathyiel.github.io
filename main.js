(() => {
  const D = window.PORTFOLIO || PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hideSection = id => { const s = document.getElementById(id); if (s) s.remove(); const l = document.querySelector(`.nav-links a[href="#${id}"]`); if (l) l.parentElement.remove(); };

  /* ---------- Simple text fields ---------- */
  document.title = `${D.name} — ${D.role.replace(/[\[\]]/g, "")}`;
  document.querySelectorAll("[data-field]").forEach(el => {
    const v = D[el.dataset.field];
    if (v != null) el.textContent = v;
  });
  if (D.resumeUrl) $("#resumeBtn").href = D.resumeUrl;
  else $("#resumeBtn").parentElement.remove();
  $("#emailLink").textContent = D.email;
  $("#emailLink").href = `mailto:${D.email}`;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Hero: letterforms + split wordmark ---------- */
  const [i1 = "", i2 = ""] = (D.initials || "").split("");
  $("#shape1").innerHTML = `<span class="shape-inner">${esc(i1)}</span>`;
  $("#shape2").innerHTML = `<span class="shape-inner">${esc(i2)}</span>`;

  const wm = $("#wordmark");
  let n = 0;
  wm.innerHTML = D.name.toUpperCase().split(" ").map(word =>
    `<span class="word">${[...word].map(ch =>
      `<span class="ch"><span style="transition-delay:${0.15 + (n++) * 0.035}s">${esc(ch)}</span></span>`
    ).join("")}</span>`
  ).join(" ");

  setTimeout(() => $(".hero").classList.add("ready"), 120);

  // Mouse parallax on the red letterforms
  const s1 = $("#shape1"), s2 = $("#shape2");
  if (matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      s1.style.transform = `translate(${x * -30}px, ${y * -20}px)`;
      s2.style.transform = `translate(${x * 40}px, ${y * 30}px)`;
    });
  }

  /* ---------- Mockup (faux page) generator ---------- */
  const gradients = [
    "linear-gradient(135deg,#6b3fa0,#1e1a3a 70%)",
    "linear-gradient(160deg,#4d86c7,#2c5e3f)",
    "linear-gradient(135deg,#f4343f,#6b1b3a)",
    "linear-gradient(150deg,#d7b58a,#5b3a2a)",
    "linear-gradient(135deg,#3a2f6b,#b98ab8)",
  ];
  const mock = (p, i) => p.image
    ? `<div class="mock"><img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy" /></div>`
    : `<div class="mock"><div class="mock-fake">
         <div class="mf-title"><small>${esc(p.category || "Project")}</small>${esc(p.title)}</div>
         <div class="mf-img" style="background:${gradients[i % gradients.length]}"></div>
         <div class="mf-lines"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
       </div></div>`;

  /* ---------- Showcase strip ---------- */
  const projects = D.projects || [];
  if (projects.length) {
    let items = [...projects];
    while (items.length < 6) items = items.concat(projects);
    const html = items.map((p, i) => mock(p, i)).join("");
    $("#showcaseTrack").innerHTML = html + html; // duplicated for seamless loop
  } else {
    document.querySelector(".showcase").remove();
  }

  /* ---------- About ---------- */
  $("#aboutText").innerHTML = (D.about || []).map(p => `<p>${esc(p)}</p>`).join("");
  if (D.photo) {
    $("#aboutPhoto").src = D.photo;
    $("#aboutPhoto").alt = D.name;
    $("#photoPlaceholder").remove();
  } else {
    $("#aboutPhoto").remove();
  }
  $("#stats").innerHTML = (D.stats || []).map(s =>
    `<div class="stat reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");

  /* ---------- Skills + ticker ---------- */
  if ((D.skills || []).length) {
    $("#skillsGrid").innerHTML = D.skills.map((g, i) => `
      <div class="skill-group reveal">
        <h3><small>0${i + 1}</small>${esc(g.group)}</h3>
        <ul>${g.items.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>`).join("");
    const all = D.skills.flatMap(g => g.items).map(s => `<span>${esc(s)}</span><span>✦</span>`).join("");
    $("#ticker").innerHTML = all + all;
  } else hideSection("skills");

  /* ---------- Experience ---------- */
  if ((D.experience || []).length) {
    $("#expList").innerHTML = D.experience.map(e => `
      <article class="exp reveal">
        <div class="exp-when">${esc(e.period)}<small>${esc(e.location || "")}</small></div>
        <div>
          <h3>${esc(e.role)} ${e.url
            ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">@ ${esc(e.company)}</a>`
            : `<a>@ ${esc(e.company)}</a>`}</h3>
          <ul>${(e.points || []).map(p => `<li>${esc(p)}</li>`).join("")}</ul>
          <div class="tags">${(e.tags || e.tech || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
  } else hideSection("experience");

  /* ---------- Projects + filters ---------- */
  if (projects.length) {
    $("#projectsGrid").innerHTML = projects.map((p, i) => `
      <article class="project reveal" data-cat="${esc(p.category)}">
        <div class="project-media">
          <span class="project-num">${String(i + 1).padStart(2, "0")}</span>
          ${mock(p, i)}
        </div>
        <div class="project-body">
          <div class="project-top"><h3>${esc(p.title)}</h3><span class="project-cat">${esc(p.category)} · ${esc(p.year || "")}</span></div>
          <p>${esc(p.description)}</p>
          <div class="tags">${(p.tags || p.tech || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
          ${(p.links || []).length ? `<div class="project-links">${p.links.map(l =>
            `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
        </div>
      </article>`).join("");

    const cats = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
    const filters = $("#filters");
    if (cats.length > 2) {
      filters.innerHTML = cats.map((c, i) => `<button class="${i ? "" : "active"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
      filters.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        filters.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
        document.querySelectorAll(".project").forEach(p =>
          p.classList.toggle("hide", b.dataset.cat !== "All" && p.dataset.cat !== b.dataset.cat));
      });
    } else filters.remove();
  } else hideSection("projects");

  /* ---------- Education & certifications ---------- */
  const edu = D.education || [], certs = D.certifications || [];
  if (edu.length || certs.length) {
    $("#eduList").innerHTML = edu.length ? `<h3 class="reveal">Education</h3>` + edu.map(e => `
      <div class="edu-item reveal"><h4>${esc(e.degree)}</h4>
        <div class="meta">${esc(e.school)} · ${esc(e.period)}</div>
        ${e.detail ? `<p>${esc(e.detail)}</p>` : ""}</div>`).join("") : "";
    $("#certList").innerHTML = certs.length ? `<h3 class="reveal">Certifications</h3>` + certs.map(c => `
      <div class="edu-item reveal"><a href="${esc(c.url || "#")}" target="_blank" rel="noopener"><h4>${esc(c.name)}</h4></a>
        <div class="meta">${esc(c.issuer)} · ${esc(c.year)}</div></div>`).join("") : "";
    if (!certs.length) { $("#certList").remove(); $(".edu-grid").classList.add("single"); }
  } else hideSection("education");

  /* ---------- Testimonials ---------- */
  if ((D.testimonials || []).length) {
    $("#testimonialsGrid").innerHTML = D.testimonials.map(t => `
      <figure class="quote reveal"><blockquote>${esc(t.quote)}</blockquote>
        <figcaption><b>${esc(t.name)}</b>${esc(t.title)}</figcaption></figure>`).join("");
  } else hideSection("testimonials");

  /* ---------- Renumber section eyebrows after hidden sections are removed ---------- */
  let sec = 0;
  document.querySelectorAll("main .eyebrow").forEach(el => {
    const m = el.textContent.match(/^\d+\s—\s(.*)$/);
    if (m) el.textContent = `${String(++sec).padStart(2, "0")} — ${m[1]}`;
  });

  /* ---------- Socials ---------- */
  $("#footerSocials").innerHTML = (D.socials || []).map(s =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("");

  /* ---------- Contact form (opens the visitor's mail app) ---------- */
  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    location.href = `mailto:${D.email}?subject=${subject}&body=${body}`;
  });

  /* ---------- Nav behaviour ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
  links.addEventListener("click", e => { if (e.target.closest("a")) { burger.classList.remove("open"); links.classList.remove("open"); } });

  /* ---------- Cursor FX: trailing gradient blobs + grain ---------- */
  const fx = $("#cursorFx");
  if (fx && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const orbs = [...fx.querySelectorAll(".fx-blobs i")];
    const ease = [0.16, 0.09, 0.05];            // each blob trails at its own speed
    const pos = orbs.map(() => ({ x: innerWidth / 2, y: innerHeight / 2 }));
    const m = { x: innerWidth / 2, y: innerHeight / 2 };
    let vel = 0, boost = 1, boostTarget = 1, isDark = null, t = 0;

    const setTone = dark => {
      if (dark === isDark) return;
      isDark = dark;
      fx.classList.add("swap");                  // fade out, flip blend mode, fade in
      setTimeout(() => { fx.classList.toggle("dark", dark); fx.classList.remove("swap"); }, 180);
    };

    addEventListener("mousemove", e => {
      m.x = e.clientX; m.y = e.clientY;
      fx.classList.add("on");
      const under = document.elementFromPoint(e.clientX, e.clientY);
      if (under) setTone(!!under.closest(".dark, .showcase, .footer, .project-media, .btn-dark"));
      boostTarget = under && under.closest("a, button, input, textarea, .mock") ? 1.45 : 1;
    }, { passive: true });
    document.addEventListener("mouseleave", () => fx.classList.remove("on"));
    addEventListener("mousedown", () => { boost = 1.9; });

    (function loop() {
      t += 0.016;
      const lead = pos[0], dx = m.x - lead.x, dy = m.y - lead.y;
      vel += (Math.min(Math.hypot(dx, dy) / 120, 1) - vel) * 0.15;
      boost += (boostTarget - boost) * 0.08;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      orbs.forEach((o, i) => {
        const p = pos[i];
        // blobs orbit the cursor a little so the shape keeps changing even at rest
        const ox = Math.cos(t * (0.9 + i * 0.4) + i * 2) * 12 * i;
        const oy = Math.sin(t * (0.7 + i * 0.5) + i) * 12 * i;
        p.x += (m.x + ox - p.x) * ease[i];
        p.y += (m.y + oy - p.y) * ease[i];
        const stretch = 1 + vel * 0.45;
        const s = boost * (1 + Math.sin(t * 1.3 + i) * 0.06);
        o.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${angle}deg) scale(${s * stretch}, ${s / (1 + vel * 0.25)})`;
      });
      fx.style.setProperty("--x", `${pos[0].x}px`);
      fx.style.setProperty("--y", `${pos[0].y}px`);
      fx.style.setProperty("--r", `${105 * boost + vel * 40}px`);
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Scroll reveal (staggered) ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const sibs = [...en.target.parentElement.children].filter(c => c.classList.contains("reveal"));
      en.target.style.transitionDelay = `${Math.min(sibs.indexOf(en.target), 6) * 0.08}s`;
      en.target.classList.add("in");
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();
