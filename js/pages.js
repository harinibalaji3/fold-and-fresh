/* Fold & Fresh Laundry Co. - page-specific behaviour. Each key matches <body data-page="..."> */
const quotes = (n, start = 0) => TESTIMONIALS.slice(start, start + n).map(t => `<figure class="quote"><div class="stars" role="img" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>&ldquo;${esc(t.q)}&rdquo;</p><footer>${esc(t.by)}</footer></figure>`).join('');
function trackerHTML(stage) {
  const idx = TRACK_STAGES.indexOf(stage);
  return `<ol class="tracker">${TRACK_STAGES.map((s, i) => `<li class="${i < idx ? 'done' : i === idx ? 'current' : ''}"><b class="dot">${i < idx ? '&#10003;' : i + 1}</b><span>${s}</span></li>`).join('')}</ol>`;
}
function genOrderId() { return 'FF-' + Math.floor(10000 + Math.random() * 90000); }

const PAGES = {

  home() {
    $('#featured').innerHTML = SERVICES.filter(s => s.featured).slice(0, 6).map(serviceCard).join('');
    $('#quotes').innerHTML = quotes(3);
  },

  niche() {
    $('#quotes').innerHTML = quotes(3, 1);
    $('#teaser').innerHTML = PLANS.business.map(pl => `<article class="plan ${pl.best ? 'best' : ''}"><header><h3>${pl.name}</h3><div class="amt" style="font-size:1.5rem">${pl.price}</div></header><div class="in"><p class="muted" style="margin:0">${pl.blurb}</p><ul class="ticks">${pl.items.slice(0, 3).map(i => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul></div></article>`).join('');
  },

  about() {
    $('#team').innerHTML = TEAM.map(t => `<article class="team"><img loading="lazy" src="${U(t.img, 500)}" alt="Portrait of ${esc(t.name)}"><h3>${esc(t.name)}</h3><div class="role">${esc(t.role)}</div><p>${esc(t.bio)}</p></article>`).join('');
    $('#quotes').innerHTML = quotes(2, 1);
  },

  /* ---------- services catalog ---------- */
  services() {
    const st = { cat: CATS[params.get('cat')] ? params.get('cat') : 'all', q: '', sort: 'featured', max: 20 };
    $('#chips').innerHTML = ['all', ...Object.keys(CATS)].map(c => `<button class="chip" data-cat="${c}" aria-pressed="${c === st.cat}">${c === 'all' ? 'All' : CATS[c]}</button>`).join('');
    function render() {
      let list = SERVICES.filter(s => (st.cat === 'all' || s.cat === st.cat) && s.price <= st.max &&
        (!st.q || (s.name + ' ' + s.short).toLowerCase().includes(st.q)));
      const idx = new Map(SERVICES.map((s, i) => [s.id, i]));
      const sorts = { featured: (a, b) => (b.featured - a.featured) || idx.get(a.id) - idx.get(b.id), 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, 'turnaround': (a, b) => a.turnaround.length - b.turnaround.length };
      list.sort(sorts[st.sort]);
      $('#count').textContent = `${list.length} ${list.length === 1 ? 'service' : 'services'}`;
      $('#grid').innerHTML = list.length ? list.map(serviceCard).join('') : `<div class="empty"><h3>Nothing matches those filters</h3><p>Try a wider price range or a different category.</p><button class="btn btn-sm" id="clear">Clear filters</button></div>`;
    }
    $('#chips').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (!b) return; st.cat = b.dataset.cat; $$('#chips .chip').forEach(c => c.setAttribute('aria-pressed', String(c === b))); render(); history.replaceState(null, '', st.cat === 'all' ? 'services.html' : `services.html?cat=${st.cat}`); });
    $('#q').addEventListener('input', e => { st.q = e.target.value.trim().toLowerCase(); render(); });
    $('#sort').addEventListener('change', e => { st.sort = e.target.value; render(); });
    $('#max').addEventListener('input', e => { st.max = +e.target.value; $('#maxOut').textContent = money(st.max); render(); });
    document.addEventListener('click', e => { if (e.target.id === 'clear' || e.target.id === 'reset') { st.q = ''; st.max = 20; st.sort = 'featured'; $('#q').value = ''; $('#max').value = 20; $('#maxOut').textContent = '$20'; $('#sort').value = 'featured'; render(); } });
    render();
  },

  /* ---------- service detail ---------- */
  service() {
    const s = byId(params.get('id')), box = $('#detail');
    if (!s) { box.innerHTML = `<div class="notice bad" style="grid-column:1/-1"><h2>We couldn't find that service</h2><p>It may have been renamed, or the link is out of date.</p><a class="btn" href="services.html">Back to services</a></div>`; $('#below').hidden = true; return; }
    document.title = `${s.name} | Fold & Fresh`;
    $('#crumb').innerHTML = `<a href="index.html">Home</a> / <a href="services.html?cat=${s.cat}">${CATS[s.cat]}</a> / ${esc(s.name)}`;
    const wish = store.get('ff_saved', []).includes(s.id);
    box.innerHTML = `<div><div class="ph"><img src="${U(s.img, 1100)}" alt="${esc(s.name)}"></div></div>
      <div class="buybox"><span class="tag">${CATS[s.cat]}</span><h1 style="font-size:clamp(1.9rem,4vw,2.8rem);margin-top:.5rem">${esc(s.name)}</h1><p class="lead">${esc(s.short)}</p>
      <div class="price">${money(s.price)} <small style="font-size:1rem">${UNIT_LABEL[s.unit]}</small></div>
      <p class="muted" style="margin:.4rem 0 0">${icon('clock')} Standard turnaround: ${esc(s.turnaround)}${s.minNote ? ' &middot; ' + esc(s.minNote) : ''}</p>
      <div class="cta-row"><button class="btn" data-add="${s.id}">Add to booking</button><button class="btn btn-ghost" data-wish="${s.id}" aria-pressed="${wish}">Save for later</button></div>
      <ul class="ticks"><li>${icon('shield')}<span>Checked by our quality team before delivery</span></li><li>${icon('truck')}<span>Free pickup and delivery within our core zones</span></li><li>${icon('sparkle')}<span>Express turnaround available at checkout</span></li></ul></div>`;
    $('#features').innerHTML = s.features.map(f => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('');
    $('#careText').textContent = s.care;
    $('#priceStd').textContent = money(s.pricing.standard) + ' ' + UNIT_LABEL[s.unit];
    $('#priceExp').textContent = money(s.pricing.express) + ' ' + UNIT_LABEL[s.unit];
    $('#related').innerHTML = SERVICES.filter(x => x.cat === s.cat && x.id !== s.id).slice(0, 3).map(serviceCard).join('') || '<p class="muted">No related services right now.</p>';
    $('#faqMini').innerHTML = FAQS.filter(f => ['Pricing & payment', 'Garment care & policies'].includes(f.cat)).slice(0, 4).map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
    $('#enquire').href = `contact.html?subject=${encodeURIComponent('Question about ' + s.name)}`;
  },

  /* ---------- booking ---------- */
  book() {
    const form = $('#bookForm'), listBox = $('#bkItems');
    let mode = 'standard';
    function renderItems() {
      const c = getBasket(), ids = Object.keys(c).filter(id => byId(id));
      listBox.innerHTML = ids.length ? ids.map(id => { const s = byId(id); const p = turnPrice(s, mode); return `<div class="bi"><div><b>${esc(s.name)}</b><span class="unit">${money(p)} ${UNIT_LABEL[s.unit]}</span><div class="stepper" style="margin-top:.4rem"><button type="button" data-dec="${id}" aria-label="Fewer ${esc(s.name)}">-</button><span>${c[id]}</span><button type="button" data-inc="${id}" aria-label="More ${esc(s.name)}">+</button></div></div><b>${money(p * c[id])}</b></div>`; }).join('') : '<div class="empty"><h3>Your booking is empty</h3><p>Add a service to get started.</p><a class="btn btn-sm" href="services.html">Browse services</a></div>';
      const sum = ids.reduce((a, id) => a + turnPrice(byId(id), mode) * c[id], 0);
      $('#bkSum').textContent = money(sum);
      $('#bkSubmit').disabled = ids.length === 0;
    }
    $('#modeToggle').addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (!b) return; mode = b.dataset.m; $$('#modeToggle button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); renderItems(); });
    listBox.addEventListener('click', e => {
      const c = getBasket();
      if (e.target.dataset.inc) { c[e.target.dataset.inc] = (c[e.target.dataset.inc] || 0) + 1; setBasket(c); renderItems(); }
      if (e.target.dataset.dec) { c[e.target.dataset.dec]--; if (c[e.target.dataset.dec] < 1) delete c[e.target.dataset.dec]; setBasket(c); renderItems(); }
    });
    const today = new Date(); const min = today.toISOString().slice(0, 10);
    $('#pk-date').min = min; $('#dl-date').min = min;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const c = getBasket(), ids = Object.keys(c).filter(id => byId(id));
      if (!ids.length) return;
      if (!validate(form)) return;
      const d = Object.fromEntries(new FormData(form));
      const items = ids.map(id => { const s = byId(id); return { id, name: s.name, qty: c[id], unit: s.unit, price: turnPrice(s, mode) }; });
      const total = items.reduce((a, i) => a + i.price * i.qty, 0);
      const order = { id: genOrderId(), date: new Date().toISOString().slice(0, 10), name: d.name, email: d.email, phone: d.phone, address: d.address, pickupDate: d['pk-date'], pickupSlot: d['pk-slot'], deliveryDate: d['dl-date'], deliverySlot: d['dl-slot'], mode, notes: d.notes, items, total, stage: 'Pickup scheduled' };
      store.set('ff_orders', [order, ...store.get('ff_orders', [])]);
      setBasket({});
      form.hidden = true; $('#bkSummaryCard').hidden = true;
      const box = $('#thanks'); box.hidden = false;
      box.innerHTML = `<h2 style="font-size:1.8rem">Booking confirmed. Order ${order.id}</h2><p>Thank you, ${esc(order.name.split(' ')[0])}. Your pickup is scheduled for <b>${fmtDate(order.pickupDate)}, ${esc(order.pickupSlot)}</b> at ${esc(order.address)}.</p>${trackerHTML(order.stage)}<p style="margin-top:1.4rem">We will text and email updates as your order moves through each stage. Track it any time from your <a class="link" href="dashboard.html">dashboard</a>.</p><a class="btn" href="index.html">Back to home</a>`;
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    document.addEventListener('ff-basket', renderItems);
    renderItems();
  },

  /* ---------- blog ---------- */
  blog() {
    let cat = 'All', q = '';
    const cats = ['All', ...new Set(POSTS.map(p => p.cat))];
    $('#chips').innerHTML = cats.map(c => `<button class="chip" data-c="${c}" aria-pressed="${c === cat}">${c}</button>`).join('');
    const render = () => {
      const list = POSTS.filter(p => (cat === 'All' || p.cat === cat) && (!q || (p.title + p.excerpt).toLowerCase().includes(q)));
      $('#posts').innerHTML = list.length ? list.map(p => `<a class="post-row" href="post.html?id=${p.id}"><img loading="lazy" src="${U(p.img, 600)}" alt=""><div><div class="meta"><span class="tag">${p.cat}</span><span>${esc(p.author)}</span><span>${fmtDate(p.date)}</span></div><h3>${esc(p.title)}</h3><p class="muted">${esc(p.excerpt)}</p></div></a>`).join('') : '<div class="empty"><h3>No articles found</h3><p>Try a different word or category.</p></div>';
    };
    $('#chips').addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (!b) return; cat = b.dataset.c; $$('#chips .chip').forEach(c => c.setAttribute('aria-pressed', String(c === b))); render(); });
    $('#q').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); render(); });
    render();
  },

  post() {
    const p = POSTS.find(x => x.id === params.get('id')), main = $('#article');
    if (!p) { main.innerHTML = `<div class="notice bad"><h2>Article not found</h2><p>The link may be old.</p><a class="btn" href="blog.html">Back to the journal</a></div>`; return; }
    document.title = `${p.title} | Fold & Fresh Journal`;
    const a = TEAM.find(t => t.name === p.author) || TEAM[0];
    main.innerHTML = `<div class="crumbs"><a href="blog.html">Journal</a> / ${esc(p.cat)}</div><h1 style="font-size:clamp(1.9rem,4.4vw,3.1rem)">${esc(p.title)}</h1><div class="meta"><span>${esc(p.author)}</span><span>${fmtDate(p.date)}</span><span>${Math.max(2, Math.round(p.body.join(' ').split(' ').length / 200))} min read</span></div>
      <img class="cover" src="${U(p.img, 1200)}" alt=""><div class="prose">${p.body.map((t, i) => (i === 1 ? `<h2>The short version</h2>` : '') + `<p>${esc(t)}</p>`).join('')}</div>
      <div class="author"><img src="${U(a.img, 200)}" alt=""><div><b style="font-family:var(--fh);color:var(--teal-d)">${esc(a.name)}</b><div class="muted small">${esc(a.role)}</div><p class="small" style="margin:.3rem 0 0">${esc(a.bio)}</p></div></div>`;
    $('#sideCats').innerHTML = [...new Set(POSTS.map(x => x.cat))].map(c => `<li><a href="blog.html">${c}</a></li>`).join('');
    $('#sideRecent').innerHTML = POSTS.filter(x => x.id !== p.id).slice(0, 4).map(x => `<li><a href="post.html?id=${x.id}">${esc(x.title)}</a></li>`).join('');
    const rel = POSTS.filter(x => x.id !== p.id).sort((x, y) => (y.cat === p.cat) - (x.cat === p.cat)).slice(0, 3);
    $('#relatedPosts').innerHTML = rel.map(x => `<a href="post.html?id=${x.id}"><img loading="lazy" src="${U(x.img, 500)}" alt=""><b>${esc(x.title)}</b></a>`).join('');
  },

  /* ---------- pricing ---------- */
  pricing() {
    let plan = 'onetime';
    const render = () => {
      $('#plans').innerHTML = PLANS[plan].map(pl => `<article class="plan ${pl.best ? 'best' : ''}"><header><h3>${pl.name}</h3>${pl.best ? '<span class="tag" style="background:#fff">Most popular</span>' : ''}<div class="amt" style="font-size:1.5rem">${pl.price}</div></header><div class="in"><p class="muted" style="margin:0">${pl.blurb}</p><ul class="ticks">${pl.items.map(i => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul><a class="btn ${pl.best ? '' : 'btn-ghost'}" href="${plan === 'onetime' ? 'services.html' : 'contact.html?subject=' + encodeURIComponent('Business plan: ' + pl.name)}">${plan === 'onetime' ? 'Browse services' : 'Talk to sales'}</a></div></article>`).join('');
    };
    $('#planToggle').addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (!b) return; plan = b.dataset.p; $$('#planToggle button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); render(); });
    $('#svcTable').innerHTML = SERVICES.map(s => `<tr><td>${esc(s.name)}</td><td>${CATS[s.cat]}</td><td>${money(s.pricing.standard)} ${UNIT_LABEL[s.unit]}</td><td>${money(s.pricing.express)} ${UNIT_LABEL[s.unit]}</td><td>${esc(s.turnaround)}</td></tr>`).join('');
    render();
  },

  /* ---------- FAQ ---------- */
  faq() {
    const groups = [...new Set(FAQS.map(f => f.cat))];
    $('#faqList').innerHTML = groups.map(g => `<section data-g><h2 style="font-size:1.35rem;margin:2rem 0 .8rem">${g}</h2>${FAQS.filter(f => f.cat === g).map(f => `<details data-t="${esc((f.q + ' ' + f.a).toLowerCase())}"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>`).join('');
    $('#faqSearch').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase(); let any = false;
      $$('#faqList [data-g]').forEach(g => { let v = 0; $$('details', g).forEach(d => { const m = !q || d.dataset.t.includes(q); d.hidden = !m; if (m) v++; }); g.hidden = !v; any = any || v > 0; });
      $('#faqEmpty').hidden = any;
    });
  },

  /* ---------- contact ---------- */
  contact() {
    const form = $('#contactForm');
    if (params.get('subject')) $('#subject').value = params.get('subject');
    $('#areaGrid').innerHTML = AREAS.map(a => `<div class="area"><span>${esc(a.name)}</span><span class="tag ${a.same_day ? 'turn' : ''}">${a.same_day ? 'Same-day' : 'Next-day'}</span></div>`).join('');
    $('#payGrid').innerHTML = PAYMENT_METHODS.map((m, i) => `<div class="pay">${icon(['card', 'wallet', 'cash', 'invoice'][i])}<span>${esc(m)}</span></div>`).join('');
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!validate(form)) return;
      const d = Object.fromEntries(new FormData(form));
      store.set('ff_messages', [{ ...d, date: new Date().toISOString().slice(0, 10) }, ...store.get('ff_messages', [])]);
      form.reset(); $('#sent').hidden = false; $('#sent').focus();
    });
  },

  /* ---------- login / signup ---------- */
  login() {
    if (getUser()) { location.replace('dashboard.html'); return; }
    let mode = 'in';
    const setMode = m => { mode = m; $$('.tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.m === m))); $$('[data-up]').forEach(el => { el.hidden = m === 'in'; $$('input', el).forEach(i => i.disabled = m === 'in'); }); $('#authGo').textContent = m === 'in' ? 'Sign in' : 'Create account'; $('#authTitle').textContent = m === 'in' ? 'Welcome back' : 'Join Fold & Fresh'; };
    $('.tabs').addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (b) setMode(b.dataset.m); });
    $('#authForm').addEventListener('submit', e => {
      e.preventDefault(); const f = e.target;
      if (mode === 'up') { const pw = $('#pw'), c = $('#pw2'); c.setCustomValidity(pw.value !== c.value ? 'Passwords do not match.' : ''); c.dataset.msg = 'Passwords do not match.'; }
      if (!validate(f)) return;
      const email = $('#email').value.trim(), name = mode === 'up' ? $('#fname').value.trim() : email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      store.set('ff_user', { name, email, role: /^admin/i.test(email) ? 'admin' : 'member', since: new Date().toISOString().slice(0, 10) });
      location.href = 'dashboard.html';
    });
    setMode('in');
  },

  /* ---------- dashboard (member + admin) ---------- */
  dashboard() {
    const u = getUser(), root = $('#dashRoot');
    if (!u) { root.innerHTML = `<div class="auth panel" style="text-align:center"><h2>Sign in to see your dashboard</h2><p class="muted">Your orders, tracking and saved services live here.</p><a class="btn" href="login.html">Sign in or join</a></div>`; return; }
    const admin = u.role === 'admin';
    const demoOrder = { id: 'FF-30217', date: '2026-09-18', name: u.name, items: [{ name: 'Regular Wash & Fold', qty: 6, unit: 'kg', price: 3.5 }, { name: 'Ironing & Pressing', qty: 4, unit: 'item', price: 2.2 }], total: 29.8, address: '14 Willow Street', pickupDate: '2026-09-24', pickupSlot: '9am - 12pm', stage: 'Cleaning in progress' };
    const mine = () => [...store.get('ff_orders', []), demoOrder];
    const stTag = s => `<span class="status ${s === 'Delivered' ? 'done' : ''}">${s}</span>`;
    const tabs = admin ? [['overview', 'Overview'], ['queue', 'Order queue'], ['services', 'Service list'], ['messages', 'Messages']] : [['overview', 'Overview'], ['orders', 'Orders'], ['saved', 'Saved services'], ['profile', 'Profile']];
    let tab = 'overview';
    const views = {
      overview: () => admin
        ? `<div class="grid g3"><div class="stat"><b>${mine().length}</b><span>Active or recent orders</span></div><div class="stat"><b>${SERVICES.length}</b><span>Services listed</span></div><div class="stat"><b>${mine().filter(o => o.stage !== 'Delivered').length}</b><span>Orders in progress</span></div></div><p class="muted" style="margin-top:2rem">You are viewing the admin dashboard. Order stages you change here are saved in this browser for the demo.</p>`
        : `<div class="grid g3"><div class="stat"><b>${mine().length}</b><span>Orders</span></div><div class="stat"><b>${store.get('ff_saved', []).length}</b><span>Saved services</span></div><div class="stat"><b>${mine().filter(o => o.stage !== 'Delivered').length}</b><span>In progress</span></div></div><h2 style="font-size:1.4rem;margin-top:2.5rem">Latest order</h2>${trackerHTML(mine()[0].stage)}`,
      orders: () => mine().map(o => `<div class="panel" style="margin-bottom:1.2rem"><div class="result-bar" style="margin-bottom:1rem"><b style="font-family:var(--fh);color:var(--teal-d)">${o.id}</b>${stTag(o.stage)}</div>${trackerHTML(o.stage)}<p class="muted small" style="margin-top:1rem">${o.items.map(i => `${i.qty} ${UNIT_LABEL[i.unit]} ${esc(i.name)}`).join(', ')} &middot; ${money(o.total)} &middot; Pickup ${fmtDate(o.pickupDate)}</p></div>`).join(''),
      saved: () => { const w = store.get('ff_saved', []).map(byId).filter(Boolean); return w.length ? `<div class="svc-grid">${w.map(serviceCard).join('')}</div>` : `<div class="empty"><h3>Nothing saved yet</h3><p>Tap the heart on any service to keep it here.</p><a class="btn btn-sm" href="services.html">Browse services</a></div>`; },
      profile: () => `<div class="panel" style="max-width:520px"><dl style="margin:0"><dt class="lbl">Name</dt><dd style="margin:0 0 1rem">${esc(u.name)}</dd><dt class="lbl">Email</dt><dd style="margin:0 0 1rem">${esc(u.email)}</dd><dt class="lbl">Member since</dt><dd style="margin:0">${fmtDate(u.since)}</dd></dl></div>`,
      queue: () => { const o = mine(); return `<div class="tbl-wrap"><table class="tbl wide"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Pickup</th><th>Stage</th></tr></thead><tbody>${o.map(x => `<tr><td>${x.id}</td><td>${esc(x.name)}${x.email ? `<br><span class="muted small">${esc(x.email)}</span>` : ''}</td><td>${x.items.map(i => `${i.qty}&times; ${esc(i.name)}`).join('<br>')}</td><td>${fmtDate(x.pickupDate)}<br><span class="muted small">${esc(x.pickupSlot || '')}</span></td><td><select data-ref="${x.id}" aria-label="Stage for ${x.id}" style="padding:.3rem">${TRACK_STAGES.map(s => `<option ${s === x.stage ? 'selected' : ''}>${s}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div>`; },
      services: () => `<div class="tbl-wrap"><table class="tbl wide"><thead><tr><th>Service</th><th>Category</th><th>Standard price</th><th>Express price</th><th>Turnaround</th></tr></thead><tbody>${SERVICES.map(s => `<tr><td>${esc(s.name)}</td><td>${CATS[s.cat]}</td><td>${money(s.pricing.standard)} ${UNIT_LABEL[s.unit]}</td><td>${money(s.pricing.express)} ${UNIT_LABEL[s.unit]}</td><td>${esc(s.turnaround)}</td></tr>`).join('')}</tbody></table></div>`,
      messages: () => { const m = store.get('ff_messages', []); return m.length ? m.map(x => `<div class="panel" style="margin-bottom:1rem"><b style="font-family:var(--fh);color:var(--teal-d)">${esc(x.subject)}</b><div class="meta"><span>${esc(x.name)}</span><span>${esc(x.email)}</span><span>${fmtDate(x.date)}</span></div><p style="margin:.6rem 0 0">${esc(x.message)}</p></div>`).join('') : `<div class="empty"><h3>No messages yet</h3><p>Messages sent from the contact form appear here.</p></div>`; }
    };
    const draw = () => { root.innerHTML = `<div class="dash"><nav class="dnav" aria-label="Dashboard" role="tablist">${tabs.map(([k, l]) => `<button role="tab" data-t="${k}" aria-selected="${k === tab}">${l}</button>`).join('')}<button id="signout" style="margin-top:1rem;border-color:var(--line)">Sign out</button></nav><section role="tabpanel" id="panel"><h2 style="font-size:1.8rem">${tabs.find(t => t[0] === tab)[1]}</h2>${views[tab]()}</section></div>`; };
    root.addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) { tab = b.dataset.t; draw(); } if (e.target.id === 'signout') { localStorage.removeItem('ff_user'); location.href = 'index.html'; } });
    root.addEventListener('change', e => { if (e.target.dataset.ref) { const list = store.get('ff_orders', []), r = list.find(x => x.id === e.target.dataset.ref); if (r) { r.stage = e.target.value; store.set('ff_orders', list); } toast('Order stage updated.'); } });
    $('#dashName').textContent = `${u.name}${admin ? ' (admin)' : ''}`;
    draw();
  }
};