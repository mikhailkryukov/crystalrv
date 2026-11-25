/**
 * Crystal RV — Main Application Script
 * crystalrv.com
 *
 * SETUP: Create free accounts at https://formspree.io and replace the
 * placeholder IDs below with your real form endpoint IDs.
 *
 * How to get a Formspree ID:
 *   1. Go to https://formspree.io → Sign up (free)
 *   2. Click "New Form" → name it (e.g. "Contact Form")
 *   3. Copy the ID from the endpoint URL: formspree.io/f/YOUR_ID
 *   4. Paste it in the two constants below
 */

const FORMSPREE_CONTACT_ID    = 'xwvwgvzr';
const FORMSPREE_NEWSLETTER_ID = 'xreonedo';


// ─── PAGE ROUTING ─────────────────────────────────────────────────────────────

  let currentPage = 'home';

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage = pageId;
      updateHeader(pageId);
    }
  }

  function updateHeader(pageId) {
    const header = document.getElementById('siteHeader');
    if (pageId === 'home') {
      header.classList.add('hero-mode');
      handleScroll();
    } else {
      header.classList.remove('hero-mode');
      header.classList.add('scrolled');
    }
  }


// ─── HEADER SCROLL ────────────────────────────────────────────────────────────

  function handleScroll() {
    const header = document.getElementById('siteHeader');
    if (currentPage === 'home') {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
        header.classList.remove('hero-mode');
      } else {
        header.classList.remove('scrolled');
        header.classList.add('hero-mode');
      }
    }
  }
  window.addEventListener('scroll', handleScroll);


// ─── MOBILE MENU ──────────────────────────────────────────────────────────────

  function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('open');
  }


// ─── FAQ TOGGLE ───────────────────────────────────────────────────────────────

  function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  }


// ─── WISHLIST ─────────────────────────────────────────────────────────────────

  function toggleWishlist(btn) {
    btn.textContent = btn.textContent === '🤍' ? '❤️' : '🤍';
  }


// ─── VIDEO LIGHTBOX ──────────────────────────────────────────────────────────

  function openVideoModal(embedUrl) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    iframe.src = embedUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal(e, force) {
    if (force || e.target === document.getElementById('videoModal')) {
      const modal = document.getElementById('videoModal');
      const iframe = document.getElementById('videoIframe');
      iframe.src = '';
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('videoModal').classList.contains('active')) {
      closeVideoModal(null, true);
    }
  });


// ─── FLEET FILTERING ──────────────────────────────────────────────────────────

  function filterFleet(btn, type) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cards = document.querySelectorAll('#fleetGrid .rv-card');
    let count = 0;
    cards.forEach(card => {
      if (
        type === 'all' ||
        card.dataset.type === type ||
        (type === 'sleeps-2' && +card.dataset.sleeps <= 2) ||
        (type === 'sleeps-4' && +card.dataset.sleeps >= 3 && +card.dataset.sleeps <= 4) ||
        (type === 'sleeps-6' && +card.dataset.sleeps >= 5) ||
        (type === 'pet' && card.dataset.pet === 'yes')
      ) {
        card.style.display = '';
        count++;
      } else {
        card.style.display = 'none';
      }
    });
    document.getElementById('fleetCount').textContent = `Showing ${count} RV${count !== 1 ? 's' : ''}`;
  }

  function sortFleet(val) {
    const grid = document.getElementById('fleetGrid');
    const cards = [...grid.querySelectorAll('.rv-card')];
    cards.sort((a, b) => {
      if (val === 'price-asc')  return +a.dataset.price  - +b.dataset.price;
      if (val === 'price-desc') return +b.dataset.price  - +a.dataset.price;
      if (val === 'rating')     return +b.dataset.rating - +a.dataset.rating;
      if (val === 'sleeps')     return +b.dataset.sleeps - +a.dataset.sleeps;
      return 0;
    });
    cards.forEach(c => grid.appendChild(c));
  }


// ─── COMPARE ──────────────────────────────────────────────────────────────────

  const compareList = [];

  function toggleCompare(checkbox, name) {
    if (checkbox.checked) {
      if (compareList.length >= 3) {
        checkbox.checked = false;
        alert('You can compare up to 3 RVs at a time.');
        return;
      }
      compareList.push(name);
    } else {
      const idx = compareList.indexOf(name);
      if (idx > -1) compareList.splice(idx, 1);
    }
    const bar     = document.getElementById('compareBar');
    const countEl = document.getElementById('compareCount');
    if (compareList.length >= 2) {
      bar.classList.add('visible');
      countEl.textContent = `${compareList.length} RVs selected: ${compareList.join(', ')}`;
    } else {
      bar.classList.remove('visible');
    }
  }

  function showCompare() {
    alert(`Comparing:\n\n${compareList.map((n, i) => `${i+1}. ${n}`).join('\n')}\n\nFull compare table coming soon! Contact us for a side-by-side recommendation.`);
  }

  function clearCompare() {
    compareList.length = 0;
    document.querySelectorAll('#fleetGrid input[type=checkbox]').forEach(c => c.checked = false);
    document.getElementById('compareBar').classList.remove('visible');
  }


// ─── EMAIL VALIDATION HELPER ─────────────────────────────────────────────────

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


// ─── FORM COOLDOWN (anti-spam) ──────────────────────────────────────────────

  const formCooldowns = {};
  function isFormCoolingDown(formName) {
    const lastSubmit = formCooldowns[formName];
    if (lastSubmit && Date.now() - lastSubmit < 10000) return true; // 10s cooldown
    formCooldowns[formName] = Date.now();
    return false;
  }


// ─── CONTACT FORM (Formspree) ─────────────────────────────────────────────────
// Docs: https://formspree.io/forms — form ID must be confirmed via email first.
// If emails aren't arriving: log in to formspree.io → check the form dashboard.

  async function handleContactSubmit(btn) {
    const fname   = document.getElementById('contact-fname')?.value.trim();
    const lname   = document.getElementById('contact-lname')?.value.trim();
    const email   = document.getElementById('contact-email')?.value.trim();
    const phone   = document.getElementById('contact-phone')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value.trim();
    const status  = document.getElementById('contact-form-status');

    if (!fname || !email || !message) {
      if (status) { status.style.color = '#c0392b'; status.textContent = '⚠️ Please fill in your name, email, and message.'; }
      return;
    }
    if (!isValidEmail(email)) {
      if (status) { status.style.color = '#c0392b'; status.textContent = '⚠️ Please enter a valid email address.'; }
      return;
    }
    if (isFormCoolingDown('contact')) {
      if (status) { status.style.color = '#c0392b'; status.textContent = '⚠️ Please wait a few seconds before sending again.'; }
      return;
    }

    btn.textContent = '⏳ Sending...';
    btn.disabled = true;

    // Build FormData (more reliable with Formspree than raw JSON)
    const formData = new FormData();
    formData.append('name', `${fname} ${lname}`);
    formData.append('email', email);
    formData.append('phone', phone || 'Not provided');
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('_replyto', email);                     // Formspree: sets reply-to
    formData.append('_subject', `Crystal RV: ${subject}`);  // Formspree: email subject line

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        btn.textContent = '✅ Message Sent!';
        btn.style.background = '#2d7050';
        if (status) { status.style.color = '#2d7050'; status.textContent = "We'll reply within 2 hours during business hours."; }
        ['contact-fname','contact-lname','contact-email','contact-phone','contact-message'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
      } else {
        // Formspree returns error details in the response body
        const errMsg = data?.errors?.map(e => e.message).join(', ') || `Error ${res.status}`;
        console.error('Formspree error:', res.status, data);
        throw new Error(errMsg);
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      if (status) {
        status.style.color = '#c0392b';
        status.textContent = '❌ Something went wrong. Please email us directly at info@crystalrv.com or call (669) 245-5636.';
      }
    }
  }


// ─── NEWSLETTER SIGNUP (Formspree) ────────────────────────────────────────────

  async function handleNewsletterSignup(btn, inputId, statusId) {
    const input  = document.getElementById(inputId);
    const status = document.getElementById(statusId);
    const email  = input?.value.trim();

    if (!email || !isValidEmail(email)) {
      if (input) input.style.borderColor = '#e74c3c';
      input?.focus();
      return;
    }
    if (isFormCoolingDown('newsletter')) {
      if (status) { status.style.color = '#c0392b'; status.textContent = 'Please wait a few seconds before trying again.'; }
      return;
    }

    btn.textContent = '⏳...';
    btn.disabled = true;
    input.disabled = true;

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter' })
      });
      if (res.ok) {
        btn.textContent = "✅ You're in!";
        if (status) { status.style.color = '#2d7050'; status.textContent = 'Welcome! Your $50 discount will arrive shortly.'; }
      } else {
        throw new Error('non-ok response');
      }
    } catch (err) {
      btn.textContent = 'Try Again';
      btn.disabled = false;
      input.disabled = false;
      if (status) { status.style.color = '#c0392b'; status.textContent = 'Something went wrong — please try again.'; }
    }
  }


// ─── DATE INPUTS — set minimum to today ───────────────────────────────────────

  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type=date]').forEach(inp => inp.min = today);


// ─── INIT ─────────────────────────────────────────────────────────────────────

  updateHeader('home');


// ─── WHEELBASE WIDGET HEIGHT FIX ──────────────────────────────────────────────
// All custom height/overflow overrides removed. They were breaking the
// delivery-address autocomplete suggestion dropdown inside the widget.
// The widget handles its own sizing internally.


// ─── WHEELBASE WIDGET AUTO-RETRY ON ERROR ────────────────────────────────────
// The widget sometimes fails on first load due to a race condition with the
// module script. This detects errors and rebuilds the widget element from scratch.
(function() {
  var retryCount = 0;
  var maxRetries = 3;

  function reloadWidget(store) {
    var parent = store.parentNode;
    if (!parent) return;
    var attrs = {};
    for (var i = 0; i < store.attributes.length; i++) {
      attrs[store.attributes[i].name] = store.attributes[i].value;
    }
    store.remove();
    var fresh = document.createElement('wheelbase-store');
    for (var key in attrs) {
      fresh.setAttribute(key, attrs[key]);
    }
    parent.appendChild(fresh);
  }

  function checkWidgets() {
    var widgets = document.querySelectorAll('wheelbase-store');
    widgets.forEach(function(store) {
      var text = '';
      if (store.shadowRoot) {
        text = store.shadowRoot.textContent || '';
      } else {
        text = store.textContent || '';
      }
      if (text.indexOf('Error loading') !== -1 && retryCount < maxRetries) {
        retryCount++;
        reloadWidget(store);
      }
    });
  }

  window.addEventListener('load', function() {
    [2000, 5000, 9000].forEach(function(ms) {
      setTimeout(checkWidgets, ms);
    });
  });
})();


// ─── wb_state URL stripping REMOVED ──────────────────────────────────────────
// The Wheelbase widget encodes checkout session state in ?wb_state=<base64>.
// Stripping it corrupted the checkout flow. The URL shows ?wb_state=… during
// booking — this is harmless and expected.


