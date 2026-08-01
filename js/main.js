/* 个人站交互：数据来自 site-data.js，页面结构来自 index.html */
(function () {
  "use strict";

  const data = window.siteData || {};
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

  /* ---------- 身份信息 ---------- */
  function renderIdentity() {
    const id = data.identity || {};
    if (!id.name) return;

    document.title = id.name + " · 个人网站";
    $("#hero-name").textContent = id.name;
    $("#brand-name").textContent = id.name;
    $("#footer-name").textContent = id.name;

    if (id.enName) $("#hero-en").textContent = id.enName;
    if (id.lead) $("#hero-lead").textContent = id.lead;

    const bio = $("#about-bio");
    bio.innerHTML = (id.bio || []).map((p) => "<p>" + escapeHtml(p) + "</p>").join("");

    const fill = (sel, value) => {
      const el = $(sel);
      if (el && value) el.textContent = value;
    };
    fill("#fact-location", id.location);
    fill("#fact-focus", id.focus);
    fill("#fact-status", id.status);
    fill("#fact-email", id.email);

    const socialList = $("#social-list");
    if ((id.socials || []).length === 0) {
      socialList.innerHTML = '<p class="contact__empty">邮箱和社交账号还没有放上来，之后补充。</p>';
    } else {
      socialList.innerHTML = (id.socials || [])
        .map(
          (item) =>
            '<a class="contact__link" href="' + escapeAttr(item.href) + '" target="_blank" rel="noopener">' +
            "<span>" + escapeHtml(item.label) + "</span>" +
            '<span aria-hidden="true">↗</span></a>'
        )
        .join("");
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  /* ---------- 数据概览 ---------- */
  function renderStats() {
    const box = $("#hero-stats");
    box.innerHTML = (data.stats || [])
      .map(
        (stat) =>
          '<div class="stat">' +
          '<span class="stat__value"><span class="count" data-count="' + Number(stat.value) + '">0</span>' +
          '<span class="suffix">' + escapeHtml(stat.suffix || "") + "</span></span>" +
          '<span class="stat__label">' + escapeHtml(stat.label) + "</span></div>"
      )
      .join("");

    const counts = $$(".count");
    if (reducedMotion) {
      counts.forEach((el) => {
        el.textContent = el.dataset.count;
      });
      return;
    }

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          counts.forEach((el) => animateCount(el, Number(el.dataset.count)));
          statObserver.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    statObserver.observe(box);
  }

  function animateCount(el, target) {
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 能力 ---------- */
  function renderSkills() {
    const box = $("#skill-list");
    box.innerHTML = (data.skills || [])
      .map((skill) => '<span class="skill-chip">' + escapeHtml(skill) + "</span>")
      .join("");
  }

  /* ---------- 常听歌曲 ---------- */
  function renderSongs() {
    const list = $("#song-list");
    if (!list) return;
    list.innerHTML = (data.songs || [])
      .map(
        (song) =>
          '<button class="song-card" type="button" aria-pressed="false" data-src="' +
          escapeAttr(song.file) +
          '" style="--accent:' +
          escapeAttr(song.accent || "#3de2ff") +
          '">' +
          '<span class="song-card__cover">' +
          '<img src="' +
          escapeAttr(song.cover) +
          '" alt="' +
          escapeAttr(song.title) +
          ' 封面" loading="lazy">' +
          '<span class="song-card__icon" aria-hidden="true"></span></span>' +
          '<span class="song-card__body">' +
          '<span class="song-card__title">' +
          escapeHtml(song.title) +
          "</span>" +
          '<span class="song-card__artist">' +
          escapeHtml(song.artist || "") +
          "</span></span></button>"
      )
      .join("");
    initSongPlayer();
  }

  function initSongPlayer() {
    const cards = $$(".song-card");
    if (cards.length === 0) return;

    const audio = new Audio();
    audio.preload = "none";
    let currentCard = null;
    let currentSrc = "";

    function resetCard(card) {
      if (!card) return;
      card.classList.remove("is-playing");
      card.setAttribute("aria-pressed", "false");
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const src = card.dataset.src;
        if (!src) return;

        if (currentCard === card && !audio.paused) {
          audio.pause();
          resetCard(card);
          currentCard = null;
          return;
        }

        if (currentCard && currentCard !== card) resetCard(currentCard);
        currentCard = card;

        if (src !== currentSrc) {
          audio.src = src;
          currentSrc = src;
        }

        card.classList.add("is-playing");
        card.setAttribute("aria-pressed", "true");

        const promise = audio.play();
        if (promise && typeof promise.catch === "function") {
          promise.catch(() => {
            resetCard(card);
            currentCard = null;
          });
        }
      });
    });

    audio.addEventListener("ended", () => {
      resetCard(currentCard);
      currentCard = null;
    });
  }

  /* ---------- 作品 ---------- */
  function renderProjects() {
    const grid = $("#projects-grid");
    grid.innerHTML = (data.projects || [])
      .map((project, index) => {
        const preview = buildPreview(project);
        const tags = (project.tags || [])
          .map((tag) => '<span class="tag">' + escapeHtml(tag) + "</span>")
          .join("");
        return (
          '<article class="project" data-reveal style="--reveal-delay:' + index * 0.08 + 's">' +
          '<div class="project__preview" style="--accent:' + escapeAttr(project.accent || "#3de2ff") + '" aria-hidden="true">' +
          preview +
          "</div>" +
          '<div class="project__content">' +
          '<div class="project__top"><h3 class="project__title">' + escapeHtml(project.title) + "</h3>" +
          '<span class="project__year">' + escapeHtml(project.year || "") + "</span></div>" +
          '<p class="project__desc">' + escapeHtml(project.description || "") + "</p>" +
          '<div class="project__tags">' + tags + "</div></div></article>"
        );
      })
      .join("");
  }

  function buildPreview(project) {
    const type = project.type || "terminal";

    if (type === "design") {
      const swatches = (project.swatches || [])
        .map((color) => '<span class="swatch" style="--color:' + escapeAttr(color) + '"></span>')
        .join("");
      return (
        '<div class="preview preview--design">' +
        swatches +
        '<span class="type">Aa 王煊怡</span>' +
        '<span class="type-line"></span><span class="type-line"></span></div>'
      );
    }

    if (type === "dashboard") {
      const bars = (project.bars || [42, 68, 55, 84, 61, 96, 74, 88, 58, 90, 66, 79])
        .map((height) => '<span class="bar" style="--h:' + Number(height) + '%"></span>')
        .join("");
      return '<div class="preview preview--dashboard">' + bars + "</div>";
    }

    if (type === "audio") {
      const waves = Array.from({ length: 26 }, (_, i) => {
        const height = 24 + ((i * 37) % 62);
        return '<span class="wave" style="--h:' + height + 'px"></span>';
      }).join("");
      return '<div class="preview preview--audio">' + waves + "</div>";
    }

    const lines = (project.lines || ["> 正在寻找下一个问题"])
      .map((line) => '<span class="term-line">' + escapeHtml(line) + "</span>")
      .join("");
    return '<div class="preview preview--terminal"><div class="term-lines">' + lines + "</div></div>";
  }

  /* ---------- 历程 ---------- */
  function renderTimeline() {
    const list = $("#timeline-list");
    list.innerHTML = (data.timeline || [])
      .map(
        (item) =>
          '<li class="timeline__item">' +
          '<p class="timeline__year">' + escapeHtml(item.year || "") + "</p>" +
          '<h3 class="timeline__role">' + escapeHtml(item.role || "") + "</h3>" +
          '<p class="timeline__place">' + escapeHtml(item.place || "") + "</p>" +
          '<p class="timeline__summary">' + escapeHtml(item.summary || "") + "</p></li>"
      )
      .join("");
  }

  /* ---------- 打字机 ---------- */
  function initTypewriter() {
    const el = $("#typewriter");
    const roles = ((data.identity || {}).roles || []).filter(Boolean);
    if (!el || roles.length === 0) return;

    if (reducedMotion) {
      el.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      el.textContent = current.slice(0, charIndex);

      let delay = deleting ? 38 : 82;
      if (!deleting && charIndex === current.length) {
        delay = 1500;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 420;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  /* ---------- 星网背景 ---------- */
  function initStarfield() {
    const canvas = $("#starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const mouse = { x: -9999, y: -9999, active: false };
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(130, Math.max(34, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        size: Math.random() * 1.6 + 0.7,
      }));

      if (reducedMotion) draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const linkDistance = 120;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        ctx.fillStyle = "rgba(156, 178, 207, 0.55)";
        ctx.fillRect(p.x, p.y, p.size, p.size);

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            ctx.strokeStyle = "rgba(61, 226, 255, " + ((1 - dist / linkDistance) * 0.16).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const mx = p.x - mouse.x;
          const my = p.y - mouse.y;
          const mouseDist = Math.hypot(mx, my);
          if (mouseDist < 170) {
            ctx.strokeStyle = "rgba(139, 124, 255, " + ((1 - mouseDist / 170) * 0.24).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function step() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.1 && dist < 180) {
            const force = (1 - dist / 180) * 0.06;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
            p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
          }
        }
      });
      draw();
      requestAnimationFrame(step);
    }

    window.addEventListener(
      "pointermove",
      (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouse.active = true;
      },
      { passive: true }
    );
    window.addEventListener("pointerleave", () => {
      mouse.active = false;
    });
    window.addEventListener("resize", resize);

    resize();
    if (!reducedMotion) step();
  }

  /* ---------- 滚动显现 ---------- */
  function initReveal() {
    const elements = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || reducedMotion) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
  }

  /* ---------- 导航 ---------- */
  function initNav() {
    const header = $("#site-header");
    const nav = $("#site-nav");
    const toggle = $("#menu-toggle");

    function closeMenu() {
      if (!nav || !toggle) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开导航");
      document.body.style.overflow = "";
    }

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
        document.body.style.overflow = isOpen ? "hidden" : "";
      });
    }

    $$(".site-nav a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener(
      "scroll",
      () => {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
      },
      { passive: true }
    );

    const links = $$(".site-nav a");
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    if (!("IntersectionObserver" in window)) return;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-38% 0px -56% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- 作品悬浮 ---------- */
  function initTilt() {
    if (reducedMotion || window.matchMedia("(hover: none)").matches) return;
    $$(".project").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + (-y * 4).toFixed(2) + "deg) rotateY(" + (x * 4).toFixed(2) + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- 页脚年份 ---------- */
  function renderFooter() {
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------- 启动 ---------- */
  function init() {
    renderIdentity();
    renderStats();
    renderSkills();
    renderSongs();
    renderProjects();
    renderTimeline();
    renderFooter();
    initTypewriter();
    initStarfield();
    initNav();
    initReveal();
    initTilt();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
