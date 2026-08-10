/* ==========================================================================
   Shopify Agentic AI Developer Bootcamp — Shared Interactivity
   Reads content from data.js. Safe to run on every page (each block checks
   whether its target element exists before doing anything).
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Utilities ---------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function todayISO() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function weekdayShort(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }

  function prettyDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  }

  /* IST session start (10:00 IST) as a UTC-correct Date, for countdown + local-time conversion */
  function sessionStartUTC(iso) {
    // IST = UTC+5:30. 10:00 IST == 04:30 UTC same day.
    return new Date(iso + "T04:30:00Z");
  }
  function sessionEndUTC(iso) {
    return new Date(iso + "T06:30:00Z"); // 12:00 IST == 06:30 UTC
  }

  function sessionStatus(iso) {
    const now = new Date();
    const start = sessionStartUTC(iso);
    const end = sessionEndUTC(iso);
    if (now > end) return "done";
    if (now >= start && now <= end) return "live";
    return "soon";
  }

  /* ---------------- Theme toggle ---------------- */
  function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("saab-theme");
    if (saved) root.setAttribute("data-theme", saved);
    const btn = $("#themeToggle");
    if (!btn) return;
    const setIcon = () => {
      const cur = root.getAttribute("data-theme") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      btn.textContent = cur === "dark" ? "☀️" : "🌙";
    };
    setIcon();
    btn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("saab-theme", next);
      setIcon();
    });
  }

  /* ---------------- Nav: mobile burger + active link ---------------- */
  function initNav() {
    const burger = $("#navBurger");
    const links = $("#navLinks");
    if (burger && links) {
      burger.addEventListener("click", () => {
        links.classList.toggle("open");
        burger.setAttribute("aria-expanded", links.classList.contains("open") ? "true" : "false");
      });
      $$("#navLinks a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
    }
    const path = window.location.pathname.split("/").pop() || "index.html";
    $$("#navLinks a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
    });
  }

  /* ---------------- Footer year ---------------- */
  function initFooterYear() {
    const el = $("#footerYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------- Hero pills + countdown (Home) ---------------- */
  /* Note: logo fallback (broken image -> text logo) is handled via an inline
     onerror="" attribute directly on each <img>, not here — a listener
     attached this late would miss the error event, which fires as soon as
     the 404 resolves, well before this script runs. */
  function initHero() {
    const pillWrap = $("#heroMeta");
    if (pillWrap && typeof PROGRAM !== "undefined") {
      pillWrap.innerHTML = `
        <span class="pill">📅 <strong>${prettyDate(PROGRAM.startDate)}</strong> – ${prettyDate(PROGRAM.endDate)}</span>
        <span class="pill">🕥 ${PROGRAM.timeLabel}</span>
        <span class="pill"><strong>${PROGRAM.totalSessions}</strong> Live Sessions</span>
        <span class="pill"><strong>${PROGRAM.totalHours}</strong> Hours</span>
        <span class="pill"><strong>${PROGRAM.totalModules}</strong> Modules</span>
      `;
    }

    const outlineBtn = $("#courseOutlineBtn");
    if (outlineBtn && typeof PROGRAM !== "undefined") {
      outlineBtn.setAttribute("href", PROGRAM.courseOutlineUrl);
    }

    initCountdown();
  }

  function initCountdown() {
    const el = $("#countdown");
    if (!el || typeof SCHEDULE === "undefined") return;
    const today = todayISO();
    const next = SCHEDULE.find((s) => s.date >= today) || SCHEDULE[0];
    const target = sessionStartUTC(next.date);

    function tick() {
      const now = new Date();
      let diff = target - now;
      if (diff <= 0) {
        el.innerHTML = `<div class="unit"><div class="num">Live</div><div class="lbl">Session ${next.n} is on now</div></div>`;
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      el.innerHTML = `
        <div class="unit"><div class="num">${d}</div><div class="lbl">Days</div></div>
        <div class="unit"><div class="num">${String(h).padStart(2, "0")}</div><div class="lbl">Hours</div></div>
        <div class="unit"><div class="num">${String(m).padStart(2, "0")}</div><div class="lbl">Minutes</div></div>
        <div class="unit"><div class="num">${String(s).padStart(2, "0")}</div><div class="lbl">Seconds</div></div>
      `;
    }
    tick();
    setInterval(tick, 1000);

    const label = $("#countdownLabel");
    if (label) label.textContent = `Countdown to Session ${next.n} — ${moduleTitle(next.moduleId)}`;
  }

  function moduleTitle(id) {
    if (typeof CURRICULUM === "undefined") return "";
    const m = CURRICULUM.find((x) => x.id === id);
    return m ? m.title : "";
  }

  /* ---------------- Module snapshot cards (Home) ---------------- */
  function initModuleSnapshot() {
    const wrap = $("#moduleSnapshot");
    if (!wrap || typeof CURRICULUM === "undefined") return;
    wrap.innerHTML = CURRICULUM.map((m, i) => {
      const sessions = typeof SCHEDULE !== "undefined" ? SCHEDULE.filter((s) => s.moduleId === m.id) : [];
      return `
        <div class="module-card">
          <span class="module-num">Module ${i + 1}</span>
          <h3>${m.title}</h3>
          <p>${m.goal}</p>
          <div class="module-foot">
            <span>${sessions.length} session${sessions.length !== 1 ? "s" : ""} · ${m.topics.length} topics</span>
            ${m.materialsAvailable ? '<span class="badge badge-live">Live</span>' : '<span class="badge badge-soon">Soon</span>'}
          </div>
        </div>`;
    }).join("");
  }

  /* ---------------- Schedule table (Schedule page) ---------------- */
  function initSchedule() {
    const tbody = $("#scheduleBody");
    if (!tbody || typeof SCHEDULE === "undefined") return;

    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzLabelEl = $("#localTzLabel");
    if (tzLabelEl) tzLabelEl.textContent = localTz;

    tbody.innerHTML = SCHEDULE.map((s) => {
      const status = sessionStatus(s.date);
      const mod = typeof CURRICULUM !== "undefined" ? CURRICULUM.find((m) => m.id === s.moduleId) : null;
      const modIndex = typeof CURRICULUM !== "undefined" ? CURRICULUM.findIndex((m) => m.id === s.moduleId) + 1 : "";
      const start = sessionStartUTC(s.date);
      const end = sessionEndUTC(s.date);
      const localStart = start.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      const localEnd = end.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
      const localDate = start.toLocaleDateString(undefined, { day: "2-digit", month: "short" });

      let statusBadge = '<span class="badge badge-soon">Upcoming</span>';
      if (status === "live") statusBadge = '<span class="badge badge-live">● Live Now</span>';
      if (status === "done") statusBadge = '<span class="badge badge-done">Completed</span>';

      let materials = '<span class="badge badge-soon">Available soon</span>';
      if (s.recordingUrl) {
        materials = `<a class="btn btn-sm btn-outline" href="${s.recordingUrl}" target="_blank" rel="noopener">▶ Recording</a>`;
      } else if (status === "done") {
        materials = '<span class="badge badge-soon">Recording processing</span>';
      }

      return `
        <tr class="${status === "live" ? "row-live" : ""}">
          <td class="sess-num">${String(s.n).padStart(2, "0")}</td>
          <td>
            <strong>${prettyDate(s.date)}</strong>
            <span class="local-time">${weekdayShort(s.date)}</span>
          </td>
          <td>
            10:00–12:00 IST
            <span class="local-time">${localStart}–${localEnd} ${localTz} (${localDate})</span>
          </td>
          <td class="module-tag">Module ${modIndex}: ${mod ? mod.title : ""}</td>
          <td>${statusBadge}</td>
          <td>${materials}</td>
        </tr>`;
    }).join("");
  }

  /* ---------------- Curriculum accordion (Curriculum page) ---------------- */
  function initCurriculum() {
    const wrap = $("#curriculumAccordion");
    if (!wrap || typeof CURRICULUM === "undefined") return;

    wrap.innerHTML = CURRICULUM.map((m, i) => {
      const sessions = typeof SCHEDULE !== "undefined" ? SCHEDULE.filter((s) => s.moduleId === m.id) : [];
      const dateRange = sessions.length
        ? `${prettyDate(sessions[0].date)}${sessions.length > 1 ? " – " + prettyDate(sessions[sessions.length - 1].date) : ""}`
        : "Date TBC";

      const topics = m.topics.map((t, ti) => {
        const title = mainTopicTitle(t.title);
        return `
        <div class="topic-row" data-search="${title.toLowerCase()}">
          <div class="topic-num">${i + 1}.${ti + 1}</div>
          <div class="topic-body">
            <div class="topic-title">${title}</div>
          </div>
        </div>
      `;
      }).join("");

      const materialsBlock = m.materialsAvailable
        ? `<div class="materials-status is-live">📂 <span>Module content is live.</span> <a class="btn btn-sm btn-primary" href="${m.materialsUrl || '#'}">Open Materials</a></div>`
        : `<div class="materials-status">🔒 <span>Content for this module <strong>will be available soon</strong>.</span></div>`;

      return `
        <div class="accordion-item" id="${m.id}" data-search="${(m.title + " " + m.goal).toLowerCase()}">
          <button class="accordion-trigger" aria-expanded="false">
            <span class="num-badge">${i + 1}</span>
            <span class="titles">
              <h3>${m.title}</h3>
              <span class="meta">${sessions.length} live session${sessions.length !== 1 ? "s" : ""} · ${dateRange}</span>
            </span>
            ${m.materialsAvailable ? '<span class="badge badge-live">Live</span>' : '<span class="badge badge-soon">Soon</span>'}
            <span class="chev">▾</span>
          </button>
          <div class="accordion-panel">
            <div class="accordion-panel-inner">
              <p class="module-goal">${m.goal}</p>
              ${materialsBlock}
              <div class="topic-list">${topics}</div>
            </div>
          </div>
        </div>`;
    }).join("");

    $$(".accordion-trigger", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".accordion-item");
        const isOpen = item.classList.contains("open");
        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    // Open a module directly if the URL has a hash, e.g. curriculum.html#m3
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        target.classList.add("open");
        target.querySelector(".accordion-trigger").setAttribute("aria-expanded", "true");
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      }
    }

    initCurriculumSearch();
  }

  /* Curriculum shows main topics only — strip the "Lab — " activity-type
     prefix so what's left reads as a plain topic name. */
  function mainTopicTitle(title) {
    return title.replace(/^Lab\s*[—-]\s*/i, "");
  }

  function initCurriculumSearch() {
    const input = $("#curriculumSearch");
    if (!input) return;
    const empty = $("#curriculumSearchEmpty");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let anyVisible = false;
      $$(".accordion-item").forEach((item) => {
        const rows = $$(".topic-row", item);
        let moduleMatches = item.dataset.search.includes(q);
        let rowMatchCount = 0;
        rows.forEach((row) => {
          const match = q === "" || row.dataset.search.includes(q);
          row.style.display = match ? "" : "none";
          if (match) rowMatchCount++;
        });
        const show = q === "" || moduleMatches || rowMatchCount > 0;
        item.style.display = show ? "" : "none";
        if (show) anyVisible = true;
        if (show && q !== "" && rowMatchCount > 0) item.classList.add("open");
      });
      if (empty) empty.style.display = anyVisible ? "none" : "block";
    });
  }

  /* ---------------- Prerequisites checklist ---------------- */
  function initChecklist() {
    const list = $("#prereqChecklist");
    if (!list) return;
    const items = $$("input[type=checkbox]", list);
    const bar = $("#prereqProgressFill");
    const label = $("#prereqProgressLabel");

    function updateProgress() {
      const checked = items.filter((i) => i.checked).length;
      const pct = items.length ? Math.round((checked / items.length) * 100) : 0;
      if (bar) bar.style.width = pct + "%";
      if (label) label.textContent = `${checked} / ${items.length} ready`;
    }

    items.forEach((cb) => {
      const saved = localStorage.getItem("saab-prereq-" + cb.id);
      if (saved === "1") { cb.checked = true; cb.closest("li").classList.add("checked"); }
      cb.addEventListener("change", () => {
        cb.closest("li").classList.toggle("checked", cb.checked);
        localStorage.setItem("saab-prereq-" + cb.id, cb.checked ? "1" : "0");
        updateProgress();
      });
    });
    updateProgress();
  }

  /* ---------------- FAQ + Glossary render ---------------- */
  function initFAQ() {
    const wrap = $("#faqList");
    if (!wrap || typeof FAQ === "undefined") return;
    wrap.innerHTML = FAQ.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-q">${f.q}<span class="chev">▾</span></div>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>
    `).join("");
    $$(".faq-item", wrap).forEach((item) => {
      $(".faq-q", item).addEventListener("click", () => item.classList.toggle("open"));
    });
  }

  function initGlossary() {
    const wrap = $("#glossaryGrid");
    if (!wrap || typeof GLOSSARY === "undefined") return;
    wrap.innerHTML = GLOSSARY.map((g) => `
      <div class="glossary-item">
        <div class="term">${g.term}</div>
        <p class="def">${g.def}</p>
      </div>
    `).join("");
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initFooterYear();
    initHero();
    initModuleSnapshot();
    initSchedule();
    initCurriculum();
    initChecklist();
    initFAQ();
    initGlossary();
  });
})();
