'use strict';

/* ─── HEADER SCROLL ─────────────────────────────────────── */
const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => {
  hdr?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE NAV ─────────────────────────────────────────── */
const burger  = document.getElementById('burger');
const mobNav  = document.getElementById('mob-nav');

burger?.addEventListener('click', () => {
  const open = mobNav.classList.toggle('open');
  mobNav.style.display = open ? 'block' : 'none';
  burger.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#mob-nav a').forEach(a =>
  a.addEventListener('click', () => { mobNav.style.display = 'none'; mobNav.classList.remove('open'); })
);

/* ─── REVEAL (IntersectionObserver) ─────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── STATS COUNTERS ─────────────────────────────────────── */
function animCount(el) {
  const target = Number(el.dataset.target || 0);
  const dur = 1600;
  const t0 = performance.now();
  const step = now => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - (1 - p) ** 3;
    el.textContent = Math.round(eased * target).toLocaleString('ja-JP');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-target]').forEach(animCount);
    countObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-grid').forEach(el => countObs.observe(el));

/* ─── GALLERY FILTER ─────────────────────────────────────── */
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const cat = btn.dataset.cat;
    const items = document.querySelectorAll('.g-item');
    items.forEach(i => i.classList.add('fading'));

    setTimeout(() => {
      items.forEach(i => {
        const show = cat === 'all' || i.dataset.cat === cat;
        i.classList.toggle('hidden', !show);
        i.classList.remove('fading');
      });
    }, 240);
  });
});

/* ─── PRICE TABS ─────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => { p.hidden = true; });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('tp-' + id);
    if (panel) { panel.hidden = false; }
  });
});

/* ─── SIMULATOR ──────────────────────────────────────────── */
const simForm   = document.getElementById('sim-form');
const outTotal  = document.getElementById('sim-total');
const outDisc   = document.getElementById('sim-disc');
const outTime   = document.getElementById('sim-time');
const outItems  = document.getElementById('sim-items');

function runSim() {
  if (!simForm) return;
  const menus   = [...simForm.querySelectorAll('.sim-menu:checked')];
  const options = [...simForm.querySelectorAll('.sim-opt:checked')];
  const lenAdd  = Number(document.getElementById('sim-len')?.value || 0);
  const disc    = Number(document.getElementById('sim-first')?.value || 0);

  const base    = menus.reduce((s, e) => s + Number(e.value), 0)
                + options.reduce((s, e) => s + Number(e.value), 0)
                + lenAdd;
  const discVal = Math.max(base + disc, 0);
  const time    = menus.reduce((s, e) => s + Number(e.dataset.t || 0), 0)
                + options.reduce((s, e) => s + Number(e.dataset.t || 0), 0)
                + (menus.length > 0 ? 30 : 0);

  if (outTotal) outTotal.textContent = base > 0 ? `¥${base.toLocaleString('ja-JP')}〜` : '¥0';
  if (outDisc)  outDisc.textContent  = discVal > 0 ? `¥${discVal.toLocaleString('ja-JP')}〜` : '¥0';
  if (outTime)  outTime.textContent  = time > 0 ? `約${time}分〜` : '—';
  if (outItems) {
    const names = [...menus, ...options].map(e => e.dataset.n).filter(Boolean);
    outItems.textContent = names.length ? names.join(' + ') : '';
  }
}
simForm?.querySelectorAll('input,select').forEach(el => el.addEventListener('change', runSim));
runSim();

/* ─── CONTACT FORM ───────────────────────────────────────── */
const cForm = document.getElementById('c-form');
const cOk   = document.getElementById('c-ok');

function chkEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
function chkPhone(v) { return /^[\d\-+().\s]{10,14}$/.test(v.replace(/\s/g,'')); }
function chkDate(v)  { if (!v) return false; return new Date(v) >= new Date(new Date().toDateString()); }

const rules = [
  { id: 'c-name',  ok: v => v.trim().length >= 2,  msg: 'お名前を2文字以上で入力してください。' },
  { id: 'c-phone', ok: chkPhone,                    msg: '正しい電話番号を入力してください。' },
  { id: 'c-email', ok: chkEmail,                    msg: '正しいメールアドレスを入力してください。' },
  { id: 'c-date',  ok: chkDate,                     msg: '今日以降の日付を選択してください。' },
];

function setErr(id, msg) {
  document.getElementById(id)?.classList.add('err');
  const e = document.getElementById(id + '-err');
  if (e) e.textContent = msg;
}
function clrErr(id) {
  document.getElementById(id)?.classList.remove('err');
  const e = document.getElementById(id + '-err');
  if (e) e.textContent = '';
}

cForm?.addEventListener('submit', async ev => {
  ev.preventDefault();
  if (cOk) cOk.style.display = 'none';

  let bad = false;
  rules.forEach(r => {
    const el = document.getElementById(r.id);
    if (el && !r.ok(el.value)) { setErr(r.id, r.msg); bad = true; }
    else clrErr(r.id);
  });
  if (bad) return;

  const btn = cForm.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = '送信中…';

  const action = cForm.action || '';
  if (!action || action.includes('YOUR_FORM')) {
    await new Promise(r => setTimeout(r, 700));
    succeed();
  } else {
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(cForm), headers: { Accept: 'application/json' } });
      if (!res.ok) throw 0;
      succeed();
    } catch {
      if (cOk) { cOk.style.display = 'block'; cOk.textContent = '送信できませんでした。お電話にてお問い合わせください。'; }
    }
  }
  btn.disabled = false;
  btn.textContent = '送信する';
});

function succeed() {
  cForm.reset();
  if (cOk) { cOk.style.display = 'block'; cOk.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

cForm?.querySelectorAll('input,select,textarea').forEach(el => {
  el.addEventListener('input',  () => { if (el.classList.contains('err')) clrErr(el.id); });
  el.addEventListener('change', () => { if (el.classList.contains('err')) clrErr(el.id); });
});

/* ─── SMOOTH SCROLL ─────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', ev => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    ev.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (hdr?.offsetHeight || 72);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── MOBILE FLOATING CTA visibility ────────────────────── */
const mobCtaBar = document.querySelector('.mob-cta-bar');
const heroSec   = document.getElementById('hero');
if (mobCtaBar && heroSec) {
  const obs = new IntersectionObserver(([e]) => {
    mobCtaBar.classList.toggle('visible', !e.isIntersecting);
  }, { threshold: 0 });
  obs.observe(heroSec);
}
