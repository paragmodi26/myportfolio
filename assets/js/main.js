/**
* Template Name: iPortfolio
* Updated: Nov 17 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const currentSectionLabel = document.createElement('div')
  currentSectionLabel.id = 'header-current-section'
  currentSectionLabel.innerHTML = '<span class="now-viewing-icon" aria-hidden="true">⌁</span>Now viewing:<strong>Home</strong>'
  const sidebarProfile = select('#header .profile')
  if (sidebarProfile) {
    sidebarProfile.insertAdjacentElement('afterend', currentSectionLabel)
  }

  const normalizeLabel = (rawText) => {
    return rawText
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^download cv$/i, 'CV')
  }

  const setCurrentSectionLabel = (text) => {
    if (!currentSectionLabel) return
    currentSectionLabel.innerHTML = `<span class="now-viewing-icon" aria-hidden="true">⌁</span>Now viewing:<strong>${text}</strong>`
  }

  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    let activeLabel = 'Home'
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      const sectionStart = section.offsetTop
      const sectionEnd = section.offsetTop + section.offsetHeight
      const rawProgress = ((window.scrollY - sectionStart) / Math.max(section.offsetHeight, 1)) * 100
      const sectionProgress = Math.min(100, Math.max(0, rawProgress))
      navbarlink.style.setProperty('--section-progress', `${sectionProgress}%`)

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
        activeLabel = normalizeLabel(navbarlink.textContent)
      } else {
        navbarlink.classList.remove('active')
      }
    })
    setCurrentSectionLabel(activeLabel)

    const header = select('#header')
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    const pageProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
    if (header) {
      header.style.setProperty('--page-progress', `${Math.min(100, Math.max(0, pageProgress))}%`)
    }
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Hero: Particles.js (CDN) constellation + layered mesh/grid in CSS
   */
  const heroParticlesEl = document.getElementById('hero-particles')
  const reduceMotionHero = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (heroParticlesEl && typeof window.particlesJS === 'function' && !reduceMotionHero) {
    window.particlesJS('hero-particles', {
      particles: {
        number: {
          value: 105,
          density: {
            enable: true,
            value_area: 780
          }
        },
        color: {
          value: ['#37b3ed', '#149ddd', '#7dd3fc', '#cfefff']
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.38,
          random: true,
          anim: {
            enable: true,
            speed: 0.65,
            opacity_min: 0.12,
            sync: false
          }
        },
        size: {
          value: 2.8,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#37b3ed',
          opacity: 0.28,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.15,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: false
          },
          resize: true
        },
        modes: {
          repulse: {
            distance: 130,
            duration: 0.45
          }
        }
      },
      retina_detect: true
    })
  } else if (heroParticlesEl && reduceMotionHero) {
    heroParticlesEl.style.display = 'none'
  }

  /**
   * Hero: floating skill bubbles (matches Skills section + short descriptions)
   */
  const HERO_SKILL_BUBBLES = [
    { pill: 'Python', detail: 'Core language — APIs, scripting, integrations, day-to-day backend services.' },
    { pill: 'FastAPI', detail: 'Async Python framework for high‑performance REST APIs with OpenAPI support.' },
    { pill: 'Flask', detail: 'Lightweight Python framework used for ingestion, utilities, and microservices.' },
    { pill: 'Django', detail: 'Batteries-included backend for bookings, dashboards, auth, and ORM-heavy apps.' },
    { pill: 'Celery', detail: 'Distributed task queues for async jobs — reports, emails, ingestion, schedules.' },
    { pill: 'REST API design', detail: 'Versioned endpoints, payloads, pagination, docs, consistent patterns.' },
    { pill: 'React', detail: 'SPA & component UI — HR tools, ticketing, dashboards, reactive state.' },
    { pill: 'Angular', detail: 'Enterprise UI — modular apps, RxJS, Angular Material for SLB tooling.' },
    { pill: 'JavaScript', detail: 'Client logic, AJAX, SPA glue, tooling across Angular and vanilla pages.' },
    { pill: 'HTML5', detail: 'Semantic markup, accessibility-friendly structure, templated layouts.' },
    { pill: 'CSS3', detail: 'Layouts, responsiveness, typography, cohesive visual systems.' },
    { pill: 'jQuery', detail: 'Progressive enhancements and AJAX where classic stacks persist.' },
    { pill: 'AJAX', detail: 'Async partial updates — availability checks, realtime UX snippets.' },
    { pill: 'Bootstrap', detail: 'Rapid grids, components, and responsive scaffolding.' },
    { pill: 'PostgreSQL', detail: 'Primary relational DB — schemas, indexing, transactional workloads.' },
    { pill: 'MySQL', detail: 'Relational storage compatibility and tooling for deployments.' },
    { pill: 'MongoDB', detail: 'Document store for flexible and semi-structured data.' },
    { pill: 'DynamoDB', detail: 'AWS managed NoSQL for scale and predictable throughput.' },
    { pill: 'DocumentDB', detail: 'Mongo-compatible managed doc DB on AWS for hybrid backends.' },
    { pill: 'Elasticsearch', detail: 'Full-text search, facets, ingestion mappings, relevance tuning.' },
    { pill: 'SQLAlchemy', detail: 'Python ORM & query layer spanning PostgreSQL and related engines.' },
    { pill: 'Redis', detail: 'Caches, Celery brokers, realtime holds, pub/sub helpers.' },
    { pill: 'AWS (Developer Associate)', short: 'AWS',
      detail: 'Certified on AWS Developer Associate patterns — deployments, infra, integrations.' },
    { pill: 'Azure', detail: 'Cloud presence for DataBridge ingestion, networking, dashboards.' },
    { pill: 'Grafana', detail: 'Observability for pipelines — dashboards, alerting, throughput signals.' },
    { pill: 'Git', detail: 'Branching workflows, merges, tagging, reproducible deployments.' },
    { pill: 'GitHub', detail: 'Hosting, CI alignment, collaborative review and versioning.' },
    { pill: 'PyCharm', detail: 'Heavy Python debugger, refactor, venv tooling for backend work.' },
    { pill: 'VS Code', detail: 'Editor for web and polyglot stacks plus extensions ecosystem.' },
    { pill: 'Postman', detail: 'Manual & automated API probing, contracts, regression checks.' },
    { pill: 'PgAdmin', detail: 'Schema inspection, diagnostics, Postgres admin tasks.' },
    { pill: 'Selenium', detail: 'Automated UI and regression probes where applicable.' },
    { pill: 'Elastic Vue', detail: 'Vue-based Elasticsearch UI for cluster / index visibility.' }
  ]

  const bubbleHost = document.getElementById('hero-floating-bubbles')
  const heroNameCard = select('#heroNameCard')

  if (bubbleHost && heroNameCard && !reduceMotionHero) {
    const EDGE = 12
    const CARD_PAD = 28
    const speedMin = 38
    const speedMax = 92

    const randRange = (a, b) => a + Math.random() * (b - a)
    const pickSkill = () => HERO_SKILL_BUBBLES[Math.floor(Math.random() * HERO_SKILL_BUBBLES.length)]

    const getHostCardRects = () => {
      const h = bubbleHost.getBoundingClientRect()
      const c = heroNameCard.getBoundingClientRect()
      const cardInflated = {
        left: (c.left - h.left) - CARD_PAD,
        top: (c.top - h.top) - CARD_PAD,
        right: (c.right - h.left) + CARD_PAD,
        bottom: (c.bottom - h.top) + CARD_PAD
      }
      return { hRect: h, card: cardInflated }
    }

    function circleTouchesCardWall(cx, cy, r, walls) {
      const L = walls.left
      const R = walls.right
      const T = walls.top
      const B = walls.bottom

      let closestX = Math.max(L, Math.min(cx, R))
      let closestY = Math.max(T, Math.min(cy, B))
      const dx = cx - closestX
      const dy = cy - closestY
      return (dx * dx + dy * dy) < r * r
    }

    function bounceOffCardWall(cx, cy, vx, vy, r, card) {
      const L = card.left
      const R = card.right
      const T = card.top
      const B = card.bottom

      let closestX = Math.max(L, Math.min(cx, R))
      let closestY = Math.max(T, Math.min(cy, B))
      let dx = cx - closestX
      let dy = cy - closestY
      let distSq = dx * dx + dy * dy
      const eps = r * r

      if (distSq >= eps) return { cx, cy, vx, vy }

      let ncx = cx
      let ncy = cy
      let nvx = vx
      let nvy = vy

      if (distSq < 1e-6) {
        const dl = cx - L
        const dr = R - cx
        const dt = cy - T
        const db = B - cy
        const mini = Math.min(dl, dr, dt, db)
        if (mini === dl) {
          nvx = Math.abs(vx)
          ncx = L - r - 4
        } else if (mini === dr) {
          nvx = -Math.abs(vx)
          ncx = R + r + 4
        } else if (mini === dt) {
          nvy = Math.abs(vy)
          ncy = T - r - 4
        } else {
          nvy = -Math.abs(vy)
          ncy = B + r + 4
        }
        return { cx: ncx, cy: ncy, vx: nvx, vy: nvy }
      }

      const dist = Math.sqrt(distSq)
      const nx = dx / dist
      const ny = dy / dist
      const penetration = r - dist + 1

      ncx = cx + nx * penetration
      ncy = cy + ny * penetration

      let dvn = nvx * nx + nvy * ny
      if (dvn < 0) {
        nvx -= 2 * dvn * nx
        nvy -= 2 * dvn * ny
      }

      return { cx: ncx, cy: ncy, vx: nvx, vy: nvy }
    }

    function bounceHostEdges(cx, cy, vx, vy, r, W, H) {
      let ncx = cx
      let ncy = cy
      let nvx = vx
      let nvy = vy

      const L = EDGE + r
      const R = W - EDGE - r
      const TT = EDGE + r
      const BT = H - EDGE - r

      if (ncx < L) {
        ncx = L
        nvx = Math.abs(nvx) || speedMin * 0.6
      } else if (ncx > R) {
        ncx = R
        nvx = -Math.abs(nvx) || -speedMin * 0.6
      }

      if (ncy < TT) {
        ncy = TT
        nvy = Math.abs(nvy) || speedMin * 0.6
      } else if (ncy > BT) {
        ncy = BT
        nvy = -Math.abs(nvy) || -speedMin * 0.6
      }

      return { cx: ncx, cy: ncy, vx: nvx, vy: nvy }
    }

    function randomSpotOutsideCard(W, H, r, card) {
      const minCx = EDGE + r
      const maxCx = W - EDGE - r
      const minCy = EDGE + r
      const maxCy = H - EDGE - r
      if (maxCx <= minCx || maxCy <= minCy) {
        const ang = randRange(0, Math.PI * 2)
        const sp = randRange(speedMin, speedMax)
        return { cx: minCx + 12, cy: minCy + 12, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp }
      }
      for (let tries = 0; tries < 140; tries++) {
        const cx = randRange(minCx, maxCx)
        const cy = randRange(minCy, maxCy)
        if (!circleTouchesCardWall(cx, cy, r + 18, card)) {
          const ang = randRange(0, Math.PI * 2)
          const sp = randRange(speedMin, speedMax)
          return { cx, cy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp }
        }
      }
      const fallback = [{
        cx: EDGE + r + 4,
        cy: EDGE + r + 4
      }, {
        cx: W - EDGE - r - 8,
        cy: H - EDGE - r - 8
      }, {
        cx: EDGE + r + 4,
        cy: H - EDGE - r - 8
      }, {
        cx: W - EDGE - r - 8,
        cy: EDGE + r + 4
      }]
      let best = fallback[0]
      for (const p of fallback) {
        if (!circleTouchesCardWall(p.cx, p.cy, r + 10, card)) {
          best = p
          break
        }
      }
      const ang = randRange(0, Math.PI * 2)
      const sp = randRange(speedMin, speedMax)
      return { cx: best.cx, cy: best.cy, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp }
    }

    const bubbleCount = Math.min(34, Math.max(20, HERO_SKILL_BUBBLES.length + 6))
    const states = []

    for (let i = 0; i < bubbleCount; i++) {
      const skill = pickSkill()
      const display = (skill.short || skill.pill).toUpperCase()

      const wrap = document.createElement('div')
      wrap.className = 'hero-fly-bubble-wrap'

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'hero-fly-bubble'
      btn.setAttribute('aria-label', `${skill.pill}: ${skill.detail}`)
      if (display.length > 13) btn.classList.add('hero-fly-bubble--compact')

      const label = document.createElement('span')
      label.className = 'hero-fly-bubble__label'
      label.textContent = display

      const tip = document.createElement('span')
      tip.className = 'hero-fly-bubble__detail'
      tip.setAttribute('aria-hidden', 'true')
      tip.textContent = skill.detail

      btn.appendChild(label)
      btn.appendChild(tip)
      wrap.appendChild(btn)

      bubbleHost.appendChild(wrap)

      btn.addEventListener('mouseenter', () => wrap.classList.add('hero-fly-bubble-wrap--hold'))
      btn.addEventListener('mouseleave', () => wrap.classList.remove('hero-fly-bubble-wrap--hold'))
      btn.addEventListener('focus', () => wrap.classList.add('hero-fly-bubble-wrap--hold'))
      btn.addEventListener('blur', () => wrap.classList.remove('hero-fly-bubble-wrap--hold'))

      const r = Math.max((btn.offsetWidth || 92) / 2, (btn.offsetHeight || 40) / 2) + 10
      const W = bubbleHost.offsetWidth || 320
      const H = bubbleHost.offsetHeight || 400
      const { card } = getHostCardRects()
      let pos = randomSpotOutsideCard(W, H, r, card)

      states.push({
        wrap,
        r,
        cx: pos.cx,
        cy: pos.cy,
        vx: pos.vx,
        vy: pos.vy
      })

      wrap.style.transform = `translate3d(${pos.cx}px,${pos.cy}px,0)`
    }

    let lastT = performance.now()
    let rafId = null

    const tick = (now) => {
      const rawDt = (now - lastT) / 1000
      const dt = Math.min(1 / 30, rawDt || 1 / 60)
      lastT = now

      const W = bubbleHost.offsetWidth
      const H = bubbleHost.offsetHeight
      const { card } = getHostCardRects()

      states.forEach((s) => {
        if (s.wrap.classList.contains('hero-fly-bubble-wrap--hold')) {
          return
        }

        s.cx += s.vx * dt
        s.cy += s.vy * dt

        for (let step = 0; step < 5; step++) {
          let cardGuard = 0
          while (circleTouchesCardWall(s.cx, s.cy, s.r + 2, card) && cardGuard++ < 30) {
            const br = bounceOffCardWall(s.cx, s.cy, s.vx, s.vy, s.r + 14, card)
            s.cx = br.cx
            s.cy = br.cy
            s.vx = br.vx
            s.vy = br.vy
          }

          const bo = bounceHostEdges(s.cx, s.cy, s.vx, s.vy, s.r, W, H)
          s.cx = bo.cx
          s.cy = bo.cy
          s.vx = bo.vx
          s.vy = bo.vy
        }

        const sp = Math.hypot(s.vx, s.vy)
        if (sp < speedMin && sp > 0.01) {
          const f = speedMin / sp
          s.vx *= f
          s.vy *= f
        }

        if (sp > speedMax + 120) {
          const f = speedMax / sp
          s.vx *= f
          s.vy *= f
        }

        s.wrap.style.transform = `translate3d(${s.cx}px,${s.cy}px,0)`
      })

      rafId = window.requestAnimationFrame(tick)
    }

    window.requestAnimationFrame(tick)

    const onResize = () => {
      const W2 = bubbleHost.offsetWidth
      const H2 = bubbleHost.offsetHeight
      const { card } = getHostCardRects()
      states.forEach((s) => {
        s.cx = Math.min(Math.max(s.cx, EDGE + s.r), W2 - EDGE - s.r)
        s.cy = Math.min(Math.max(s.cy, EDGE + s.r), H2 - EDGE - s.r)
        let cardGuardResize = 0
        while (circleTouchesCardWall(s.cx, s.cy, s.r + 2, card) && cardGuardResize++ < 56) {
          const br = bounceOffCardWall(s.cx, s.cy, s.vx, s.vy, s.r + 18, card)
          s.cx = br.cx
          s.cy = br.cy
          s.vx = br.vx
          s.vy = br.vy
        }

        s.wrap.style.transform = `translate3d(${s.cx}px,${s.cy}px,0)`
      })
    }

    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(onResize)
      : null
    ro && ro.observe(bubbleHost)

    window.addEventListener(
      'pagehide',
      () => {
        if (rafId) window.cancelAnimationFrame(rafId)
        window.removeEventListener('resize', onResize)
        ro && ro.disconnect()
      },
      { once: true }
    )
  }

  /**
   * Portfolio accordions: only clicked card should open in each group
   */
  const accordionGroups = select('[data-accordion-group]', true)
  if (accordionGroups.length) {
    const findCard = (collapseEl) => collapseEl.closest('.skill-toggle-card, .exp-toggle-card, .peek-card')
    const findToggleFor = (group, collapseId) => group.querySelector(`[data-bs-target="#${collapseId}"]`)
    const setExpandedState = (group, collapseId, expanded) => {
      const btn = findToggleFor(group, collapseId)
      if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false')
    }
    const syncGroupOpenState = (group, panels) => {
      const hasOpenPanel = panels.some((panel) => panel.classList.contains('show') && !panel.hidden)
      group.classList.toggle('has-open-panel', hasOpenPanel)
    }
    const closePanel = (group, panel) => {
      panel.classList.remove('show')
      panel.hidden = true
      if (panel.id) setExpandedState(group, panel.id, false)
      const card = findCard(panel)
      if (card) card.classList.remove('is-open')
    }
    const openPanel = (group, panel) => {
      panel.hidden = false
      panel.classList.add('show')
      if (panel.id) setExpandedState(group, panel.id, true)
      const card = findCard(panel)
      if (card) card.classList.add('is-open')
    }

    accordionGroups.forEach((group) => {
      const collapses = [...group.querySelectorAll('.skill-toggle-body, .exp-toggle-detail, .peek-card-body')]
      const toggles = [...group.querySelectorAll('[data-bs-target]')]

      // Disable Bootstrap's delegated auto-toggle for these buttons.
      toggles.forEach((btn) => {
        if (btn.getAttribute('data-bs-toggle') === 'collapse') {
          btn.removeAttribute('data-bs-toggle')
        }
      })

      // Normalize initial state.
      collapses.forEach((panel) => {
        if (panel.classList.contains('show')) {
          openPanel(group, panel)
        } else {
          closePanel(group, panel)
        }
      })
      syncGroupOpenState(group, collapses)

      // Manual controller: only one panel open per row/group.
      toggles.forEach((toggleBtn) => {
        toggleBtn.addEventListener('click', (event) => {
          event.preventDefault()
          event.stopPropagation()

          const selector = toggleBtn.getAttribute('data-bs-target')
          if (!selector || !selector.startsWith('#')) return

          const target = group.querySelector(selector)
          if (!target) return

          const isOpen = target.classList.contains('show') && !target.hidden
          collapses.forEach((panel) => closePanel(group, panel))
          if (!isOpen) openPanel(group, target)
          syncGroupOpenState(group, collapses)
        })
      })
    })
  }

  /**
   * Scroll reveal and premium hover tilt
   */
  const revealTargets = select(
    '#about .about-intro-block, #about .about-detail-card, #about .about-value-chip, #skills .skill-category-card, #resume .peek-card, #resume .resume-job-card, #resume .project-card',
    true
  )

  if (revealTargets.length) {
    revealTargets.forEach((el, index) => {
      el.classList.add('reveal-up')
      el.style.setProperty('--delay', `${Math.min(index % 8, 7) * 70}ms`)
    })

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

    revealTargets.forEach((target) => revealObserver.observe(target))
  }

  const tiltCards = select('#skills .skill-category-card, #resume .peek-card, #resume .resume-job-card, #resume .project-card', true)
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width
      const relY = (event.clientY - rect.top) / rect.height
      const rotateY = (relX - 0.5) * 7
      const rotateX = (0.5 - relY) * 5
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`)
      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`)
    })

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--ry', '0deg')
      card.style.setProperty('--rx', '0deg')
    })
  })

  /**
   * Project cards: make role/team/client data easier to scan
   */
  const projectCards = select('#resume .project-card', true)
  const splitRoleDetails = (roleText) => {
    const normalized = roleText.replace(/\s+/g, ' ').trim()
    const separators = [';', ' - ', ' — ', ' – ', ', ']
    for (const sep of separators) {
      const idx = normalized.indexOf(sep)
      if (idx > 0) {
        const title = normalized.slice(0, idx).trim()
        const details = normalized.slice(idx + sep.length).trim()
        if (title && details) {
          return { title, details }
        }
      }
    }
    return { title: normalized, details: '' }
  }

  projectCards.forEach((card) => {
    const projectMeta = card.querySelector('.project-meta')
    const projectTeam = card.querySelector('.project-team-line')

    if (projectMeta) {
      const metaText = projectMeta.textContent.replace(/\s+/g, ' ').trim()
      const clientMatch = metaText.match(/Client:\s*(.+?)(?:\s*[·|]\s*(.+))?$/i)
      if (clientMatch) {
        const clientValue = (clientMatch[1] || '').trim()
        const timelineValue = (clientMatch[2] || '').trim()
        projectMeta.innerHTML = `
          <span class="project-fact-line"><span class="project-fact-label">Client:</span>${clientValue}</span>
          ${timelineValue ? `<span class="project-fact-line"><span class="project-fact-label">Timeline:</span>${timelineValue}</span>` : ''}
        `
      }
    }

    if (projectTeam) {
      const teamText = projectTeam.textContent.replace(/\s+/g, ' ').trim()
      const teamMatch = teamText.match(/Team:\s*(.+?)(?=\s*(?:·|My role:|$))/i)
      const roleMatch = teamText.match(/My role:\s*(.+)$/i)
      const teamValue = teamMatch ? teamMatch[1].trim() : ''
      const roleValue = roleMatch ? roleMatch[1].trim() : ''
      if (teamValue || roleValue) {
        const { title: roleTitle, details: roleDetails } = splitRoleDetails(roleValue)
        projectTeam.innerHTML = `
          <span class="project-facts-row">
            ${teamValue ? `<span class="project-fact project-fact--team"><span class="project-fact-label">Team</span>${teamValue}</span>` : ''}
            ${roleValue ? `<span class="project-fact project-fact--role"><span class="project-fact-label">My role</span><span class="project-role-title">${roleTitle}</span>${roleDetails ? `<span class="project-role-desc">Description: ${roleDetails}</span>` : ''}</span>` : ''}
          </span>
        `
      }
    }
  })

  /**
   * Initiate portfolio lightbox (only when lightbox links exist)
   */
  if (select('.portfolio-lightbox', true).length) {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  /**
   * Portfolio details slider
   */
  if (select('.portfolio-details-slider')) {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  /**
   * Testimonials slider
   */
  if (select('.testimonials-slider')) {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()