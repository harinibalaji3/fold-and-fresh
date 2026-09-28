/* Fold & Fresh Laundry Co. - shared helpers, header/footer, basket, saved services, forms */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => '$' + Number(n).toFixed(2).replace(/\.00$/, '');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const params = new URLSearchParams(location.search);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};
const fmtDate = d => new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

/* ---------- icons ---------- */
const ICONS = {
  washer: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="5.5"/><circle cx="12" cy="13" r="2"/><path d="M8 6.2h.01M11 6.2h.01"/>',
  iron: '<path d="M4 17c0-5 3-9 10-9 3.3 0 6 2.7 6 6v3z"/><path d="M4 17h16M7 20h10"/><circle cx="16" cy="11.5" r=".6" fill="currentColor" stroke="none"/>',
  hanger: '<path d="M12 4a2 2 0 1 1 2 2c-.5.4-1 .8-1 1.5V9"/><path d="M12 9l9 6.5a2 2 0 0 1-1 3.5H4a2 2 0 0 1-1-3.5z"/>',
  droplet: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  shoe: '<path d="M3 17c0-2 1-3 3-3.5 1.5-.4 2.5-1.2 3-2.5.4-1 1.3-2 2.7-2 1 0 1.3.8 1.3 1.8v.7c2 .2 5 1.4 7 3.5V17z"/><path d="M3 17h17"/>',
  linen: '<rect x="3" y="7" width="18" height="12" rx="1.5"/><path d="M3 11h18M8 7v-.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V7"/>',
  bag: '<path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><rect x="4" y="8" width="16" height="13" rx="1.5"/><path d="M4 12h16"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  basket: '<path d="M4 9h16l-1.5 9a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7z"/><path d="M8 9V7a4 4 0 0 1 8 0v2M4 9h16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 15-5 16 0"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-3.5M8.2 13l7.6 3.5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3H5"/><path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H8a2 2 0 0 1-2-2"/><circle cx="16" cy="14" r="1"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 6v12M18 6v12" opacity=".5"/>',
  invoice: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6M9 8h2"/>'
};
const icon = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const hydrateIcons = (root = document) => $$('[data-icon]', root).forEach(el => { el.innerHTML = icon(el.dataset.icon); });

/* ---------- image fallback (if an Unsplash photo fails to load) ---------- */
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#dcece7"/><g stroke="#0E6369" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(150 100)"><rect x="0" y="0" width="100" height="100" rx="12"/><circle cx="50" cy="55" r="30"/></g></svg>');
document.addEventListener('error', e => { const t = e.target; if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = 1; t.src = PLACEHOLDER; } }, true);
const fixBroken = () => $$('img').forEach(i => { if (i.complete && !i.naturalWidth && !i.dataset.fb) { i.dataset.fb = 1; i.src = PLACEHOLDER; } });
window.addEventListener('load', fixBroken);

/* ---------- user / basket / saved services state ---------- */
const getUser = () => store.get('ff_user', null);
const getBasket = () => store.get('ff_basket', {});
const byId = id => SERVICES.find(s => s.id === id);

function turnPrice(s, mode) { return mode === 'express' ? s.pricing.express : s.pricing.standard; }
function serviceCard(s) {
  const wish = store.get('ff_saved', []).includes(s.id);
  return `<article class="scard"><a class="ph" href="service.html?id=${s.id}" aria-label="View ${esc(s.name)}"><img loading="lazy" src="${U(s.img, 700)}" alt="${esc(s.name)}"><span class="cat-pill">${CATS[s.cat]}</span></a>
  <div class="body"><h3><a href="service.html?id=${s.id}">${esc(s.name)}</a></h3><p class="sub">${esc(s.short)}</p>
  <div><span class="tag turn">${icon('clock')} ${esc(s.turnaround.split(',')[0].split(' if')[0])}</span></div>
  <div class="row"><span class="price">${money(s.price)}<small> ${UNIT_LABEL[s.unit]}</small></span><span style="display:flex;gap:.4rem;align-items:center"><button class="heart" data-wish="${s.id}" aria-pressed="${wish}" aria-label="Save ${esc(s.name)}">${icon('heart')}</button><button class="btn btn-sm" data-add="${s.id}">Add</button></span></div></div></article>`;
}

/* ---------- layout ---------- */
const NAV = [['services.html', 'Services'], ['pricing.html', 'Pricing'], ['book.html', 'Book a pickup'], ['niche.html', 'For business'], ['blog.html', 'Journal'], ['about.html', 'About'], ['contact.html', 'Contact']];
function buildLayout() {
  const bare = document.body.dataset.bare === '1';
  const cur = location.pathname.split('/').pop() || 'index.html';
  const u = getUser();
  const logo = `<a class="logo" href="index.html" aria-label="Fold and Fresh home"><img src="assets/logo.svg" alt="" width="42" height="42"><span><b>Fold &amp; Fresh</b><small>Doorstep laundry &amp; dry cleaning</small></span></a>`;
  const header = $('#site-header');
  const NAV2 = [['index.html', 'Home'], ['home-niche.html', 'Home 2'], ['about.html', 'About'], ['services.html', 'Service'], ['blog.html', 'Blog'], ['contact.html', 'Contact']];
  if (header) header.outerHTML = bare ? `<header class="site-header"><div class="wrap header-wrap"><a href="index.html" class="logo"><img src="assets/logo.png" alt="Brand Logo" width="38" height="38"><span class="logo-text">FoldFresh</span></a></div></header>` : `<header class="site-header">
  <div class="wrap header-wrap">
    <a href="index.html" class="logo"><img src="assets/logo.png" alt="Brand Logo" width="38" height="38"><span class="logo-text">FoldFresh</span></a>
    <nav class="nav-container">
      <div class="nav-menu-drawer" id="navMenuDrawer">
        <ul class="nav-links">${NAV2.map(([h, t]) => `<li><a href="${h}" ${cur === h ? 'class="is-active"' : ''}>${t}</a></li>`).join('')}</ul>
        <div class="header-actions">
          <button class="icon-btn theme-toggle" id="themeToggleBtn" aria-label="Toggle Dark/Light Mode" title="Toggle Theme">
            <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button class="pill-toggle-btn rtl-toggle" id="rtlToggleBtn" aria-label="Toggle RTL Direction">RTL</button>
          <div class="profile-dropdown-wrapper">
            <button class="icon-btn profile-btn" id="profileDropdownBtn" aria-label="User Account Menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></button>
            <div class="profile-dropdown-menu" id="profileDropdownMenu"><div class="dropdown-header"><h4>FoldFresh</h4></div><ul class="dropdown-links"><li><a href="login.html">Login</a></li><li><a href="login.html">Signup</a></li></ul></div>
          </div>
        </div>
      </div>
      <button class="nav-toggle" id="navToggleBtn" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </nav>
  </div></header>`;
  const footer = $('#site-footer');
  if (footer && !bare) footer.outerHTML = `<footer class="site-footer"><div class="wrap"><div class="fgrid4">
<div><a class="logo" href="index.html"><img src="assets/logo.png" alt="Fold &amp; Fresh" height="36"></a><p style="margin-top:1rem;max-width:28ch">Doorstep laundry and dry cleaning, picked up, cleaned to the care label, and delivered back.</p></div>    <div><h4>Services</h4><ul><li><a href="services.html?cat=everyday">Everyday care</a></li><li><a href="services.html?cat=dryclean">Dry cleaning</a></li><li><a href="services.html?cat=specialty">Specialty care</a></li><li><a href="book.html">Book a pickup</a></li></ul></div>
    <div><h4>Help</h4><ul><li><a href="pricing.html">Pricing</a></li><li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy policy</a></li><li><a href="terms.html">Terms &amp; conditions</a></li></ul></div>
    <div><h4>The fresh load</h4><p class="small">One email a month: care tips, new areas, and offers.</p>
    <form class="nl" id="nlForm" novalidate><div class="field" style="margin:0;flex:1"><label class="sr" for="nlEmail" style="position:absolute;left:-999px">Email</label><input id="nlEmail" type="email" required placeholder="you@example.com" data-msg="Enter a valid email address."><div class="err"></div></div><button class="btn btn-sm" type="submit">Join</button></form></div></div>
    <div class="legal"><span>&copy; 2026 Fold &amp; Fresh Laundry Co. All rights reserved.</span><span>Every order checked before it leaves our facility.</span></div></div></footer>`;

  document.body.insertAdjacentHTML('beforeend', `<div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Booking basket" aria-hidden="true"><header><h2>Your booking</h2><button class="icon-btn" id="drawerClose" aria-label="Close basket">${icon('x')}</button></header><div class="items" id="basketItems"></div><footer><div class="sum"><span>Estimated total</span><span id="basketSum">$0</span></div><a class="btn" style="width:100%;text-decoration:none" id="toBooking" href="book.html">Continue to booking</a><p class="small muted" style="margin:.7rem 0 0">Final price is confirmed after weigh-in for per-kg services.</p></footer></aside>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`);
  hydrateIcons();
  renderBasket();
}

let toastTimer;
function toast(msg) { const t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 2600); }

/* basket */
function setBasket(c) { store.set('ff_basket', c); renderBasket(); document.dispatchEvent(new Event('ff-basket')); }
function addToBasket(id, qty = 1) {
  const s = byId(id); if (!s) return; const c = getBasket();
  c[id] = (c[id] || 0) + qty; setBasket(c); toast(`${s.name} added to your booking.`);
}
function renderBasket() {
  const c = getBasket(), ids = Object.keys(c).filter(id => byId(id));
  const n = ids.reduce((a, id) => a + c[id], 0), badge = $('#basketN');
  if (badge) { badge.textContent = n; badge.hidden = n === 0; }
  const box = $('#basketItems'); if (!box) return;
  box.innerHTML = ids.length ? ids.map(id => { const s = byId(id); return `<div class="bi"><div><b>${esc(s.name)}</b><span class="unit">${money(s.price)} ${UNIT_LABEL[s.unit]}</span><div class="stepper" style="margin-top:.4rem"><button data-dec="${id}" aria-label="Fewer ${esc(s.name)}">-</button><span>${c[id]}</span><button data-inc="${id}" aria-label="More ${esc(s.name)}">+</button></div></div><button class="icon-btn" data-rm="${id}" aria-label="Remove ${esc(s.name)}">${icon('x')}</button></div>`; }).join('') : '<p class="muted">Nothing added yet. Browse services and tap Add to build your booking.</p>';
  const sum = ids.reduce((a, id) => a + byId(id).price * c[id], 0);
  $('#basketSum').textContent = money(sum);
  const go = $('#toBooking'); if (go) go.classList.toggle('btn-ghost', ids.length === 0);
}
function openDrawer(on) {
  $('#drawer').classList.toggle('on', on); $('#scrim').classList.toggle('on', on); $('#drawer').setAttribute('aria-hidden', String(!on));
  if (on) $('#drawerClose').focus(); else $('#basketBtn')?.focus();
}
function toggleWish(id) {
  let w = store.get('ff_saved', []); const has = w.includes(id);
  w = has ? w.filter(x => x !== id) : [...w, id]; store.set('ff_saved', w);
  $$(`[data-wish="${id}"]`).forEach(b => b.setAttribute('aria-pressed', String(!has)));
  toast(has ? 'Removed from saved services.' : 'Saved for next time.');
}

/* forms */
function validate(form) {
  let ok = true, first = null;
  $$('.field', form).forEach(f => {
    const inp = $('input,select,textarea', f); if (!inp || inp.type === 'file') return;
    const bad = !inp.checkValidity();
    f.classList.toggle('bad', bad);
    const e = $('.err', f); if (e) e.textContent = bad ? (inp.dataset.msg || inp.validationMessage) : '';
    if (bad) { ok = false; first = first || inp; }
  });
  if (first) first.focus();
  return ok;
}

/* global events */
document.addEventListener('click', e => {
  const t = e.target.closest('button,a,[data-add],[data-wish]'); if (!t) return;
  if (t.dataset.add) return addToBasket(t.dataset.add);
  if (t.dataset.wish) return toggleWish(t.dataset.wish);
  if (t.id === 'basketBtn') return openDrawer(true);
  if (t.id === 'drawerClose') return openDrawer(false);
  if (t.id === 'burger') { const n = $('#nav'); const on = n.classList.toggle('open'); t.setAttribute('aria-expanded', String(on)); return; }
  const c = getBasket();
  if (t.dataset.inc) { c[t.dataset.inc] = (c[t.dataset.inc] || 0) + 1; return setBasket(c); }
  if (t.dataset.dec) { c[t.dataset.dec]--; if (c[t.dataset.dec] < 1) delete c[t.dataset.dec]; return setBasket(c); }
  if (t.dataset.rm) { delete c[t.dataset.rm]; return setBasket(c); }
});
document.addEventListener('click', e => { if (e.target.id === 'scrim') openDrawer(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#drawer')?.classList.contains('on')) openDrawer(false); });
document.addEventListener('input', e => { const f = e.target.closest('.field'); if (f) f.classList.remove('bad'); });
document.addEventListener('submit', e => {
  if (e.target.id === 'nlForm') { e.preventDefault(); if (validate(e.target)) { e.target.reset(); toast('You are on the list. Watch for the next email.'); } }
});
document.addEventListener('DOMContentLoaded', () => { buildLayout(); const run = typeof PAGES !== 'undefined' && PAGES[document.body.dataset.page]; if (run) run(); hydrateIcons(); fixBroken(); });
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const rtlToggleBtn = document.getElementById("rtlToggleBtn");
  const profileDropdownBtn = document.getElementById("profileDropdownBtn");
  const profileDropdownMenu = document.getElementById("profileDropdownMenu");

  // 1. Dark Mode Toggle
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  // 2. RTL Layout Toggle
  const savedDir = localStorage.getItem("dir") || "ltr";
  document.documentElement.setAttribute("dir", savedDir);
  if (rtlToggleBtn && savedDir === "rtl") {
    rtlToggleBtn.classList.add("is-active");
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener("click", () => {
      const currentDir = document.documentElement.getAttribute("dir");
      const nextDir = currentDir === "rtl" ? "ltr" : "rtl";

      document.documentElement.setAttribute("dir", nextDir);
      localStorage.setItem("dir", nextDir);
      rtlToggleBtn.classList.toggle("is-active", nextDir === "rtl");
    });
  }

  // 3. Profile Dropdown Toggle & Click Outside Handler
  if (profileDropdownBtn && profileDropdownMenu) {
    profileDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdownMenu.classList.toggle("is-open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!profileDropdownMenu.contains(e.target) && !profileDropdownBtn.contains(e.target)) {
        profileDropdownMenu.classList.remove("is-open");
      }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        profileDropdownMenu.classList.remove("is-open");
      }
    });
  }
});

/* ---------- Mobile navbar: hamburger drawer + icons in the bar ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("navToggleBtn");
  const drawer = document.getElementById("navMenuDrawer");
  if (!toggle || !drawer) return;

  const container = toggle.parentElement;               // .nav-container
  const actions = drawer.querySelector(".header-actions"); // theme / RTL / profile
  const mq = window.matchMedia("(max-width: 868px)");

  const setOpen = (on) => {
    drawer.classList.toggle("is-open", on);
    toggle.classList.toggle("is-open", on);
    toggle.setAttribute("aria-expanded", String(on));
    document.body.style.overflow = on && mq.matches ? "hidden" : "";
  };

  // Mobile: icons live in the header bar beside the hamburger. Desktop: back inside the nav.
  const place = () => {
    if (!actions) return;
    if (mq.matches) container.insertBefore(actions, toggle);
    else { drawer.appendChild(actions); setOpen(false); }
  };
  place();
  mq.addEventListener ? mq.addEventListener("change", place) : mq.addListener(place);

  toggle.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));
  drawer.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", e => {
    if (drawer.classList.contains("is-open") && !drawer.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
});