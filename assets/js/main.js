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
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
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