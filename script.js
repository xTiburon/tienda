/* ========================================================
   PLANET MC STORE — script.js
   Full implementation · All interactive features
   ======================================================== */
'use strict';

/* ── PRODUCTS DATA ─────────────────────────────────────── */
const PRODUCTS = [
  // RANGOS PERMANENTES
  { id:'rp-neptune', cat:'rangos-perm', name:'Rango Neptune', price:19.99, icon:'🌊', color:'#4fd0ff', deep:'#001828',
    desc:'El primer rango de la élite de Planet MC. Acceso a comandos exclusivos, doble experiencia y beneficios premium desde el primer día.',
    perks:['Prefijo [Neptune] en el chat','x2 EXP en todas las actividades','/nick — cambia tu apodo','/hat — pon cualquier ítem en la cabeza','Kit Neptune cada 24 horas','5 /homes adicionales'], chip:'popular' },
  { id:'rp-saturn', cat:'rangos-perm', name:'Rango Saturn', price:34.99, icon:'🪐', color:'#ffcd5c', deep:'#1a1200',
    desc:'Domina el servidor con Saturn. Beneficios mejorados y funciones exclusivas para los mejores jugadores del continente.',
    perks:['Todo lo incluido en Neptune','Prefijo dorado [Saturn]','x3 EXP en todas las actividades','/fly en el lobby','Acceso al warp VIP','10 /homes adicionales','Kit Saturn cada 24h'], chip:'best' },
  { id:'rp-jupiter', cat:'rangos-perm', name:'Rango Jupiter', price:59.99, icon:'💫', color:'#ff9f45', deep:'#1a0800',
    desc:'El rango más poderoso del servidor. Jupiter te otorga acceso completo a todo lo que Planet MC tiene para ofrecer.',
    perks:['Todo lo incluido en Saturn','Prefijo animado [Jupiter]','x4 EXP en todas las actividades','/fly en survival','20 /homes adicionales','Kit Jupiter diario','Acceso anticipado a eventos exclusivos'], chip:'premium' },
  // RANGOS TEMPORALES
  { id:'rt-vip7', cat:'rangos-temp', name:'VIP · 7 días', price:4.99, icon:'⭐', color:'#2ee07a', deep:'#011408',
    desc:'Disfruta de una semana completa con todos los beneficios VIP del servidor.',
    perks:['Prefijo [VIP] en el chat','x1.5 EXP en todo el servidor','3 /homes adicionales','Kit VIP cada 24h','Acceso al canal VIP en Discord'], chip:null },
  { id:'rt-vip30', cat:'rangos-temp', name:'VIP · 30 días', price:12.99, oldPrice:19.96, icon:'⭐', color:'#2ee07a', deep:'#011408',
    desc:'Un mes completo de ventajas VIP. La mejor relación precio-beneficio de toda la tienda.',
    perks:['Prefijo [VIP] en el chat','x1.5 EXP','3 /homes adicionales','Kit VIP diario','Acceso al canal VIP','10% descuento en kits'], chip:'popular' },
  { id:'rt-premium7', cat:'rangos-temp', name:'Premium · 7 días', price:9.99, icon:'💎', color:'#4fd0ff', deep:'#001428',
    desc:'Beneficios Premium por una semana con acceso a funciones exclusivas y prioridad de entrada.',
    perks:['Prefijo animado [Premium]','x2 EXP','5 /homes adicionales','Kit Premium diario','/nick — cambia tu apodo','Prioridad en la cola de entrada'], chip:null },
  // KITS
  { id:'kit-survival', cat:'kits', name:'Kit Survival', price:2.99, icon:'⚔️', color:'#2ee07a', deep:'#011408',
    desc:'El kit esencial para arrancar con ventaja. Equipo de hierro completo y recursos iniciales para empezar fuerte.',
    perks:['Set de armadura de hierro completo','Espada de hierro Filo I','Pico de hierro Eficiencia II','x64 carne cocida','x32 antorchas','Uso cada 24 horas'], chip:null },
  { id:'kit-combat', cat:'kits', name:'Kit Combat', price:4.99, icon:'🗡️', color:'#ff5470', deep:'#180008',
    desc:'Para los guerreros del PvP. Equipamiento especializado en combate, pociones y batalla táctica.',
    perks:['Armadura de diamante Protección II','Espada de diamante Filo III','Arco Poder II','x64 flechas de infinito','Pociones de velocidad x4','Uso cada 24h'], chip:'popular' },
  { id:'kit-miner', cat:'kits', name:'Kit Miner', price:3.99, icon:'⛏️', color:'#ffcd5c', deep:'#1a1200',
    desc:'Optimizado para la minería intensiva. Extrae recursos al máximo en cada sesión de juego.',
    perks:['Pico de diamante Eficiencia IV','Pala de diamante Eficiencia III','Hacha de diamante','x64 antorchas','x8 baúles de almacenamiento','Uso cada 24h'], chip:null },
  // LLAVES
  { id:'llave-comun', cat:'llaves', name:'Llave Común', price:1.99, icon:'🗝️', color:'#a4adbf', deep:'#101520',
    desc:'Abre el cofre común para obtener recursos básicos y posibles ítems especiales del servidor.',
    perks:['Recursos básicos garantizados','Chance de obtener ítems raros','Pack de x3 llaves incluidas'], chip:null },
  { id:'llave-rara', cat:'llaves', name:'Llave Rara', price:4.99, icon:'🔑', color:'#4fd0ff', deep:'#001428',
    desc:'Mayor probabilidad de obtener ítems exclusivos y valiosos. La favorita de los veteranos.',
    perks:['Ítems raros garantizados','Chance de rango temporal','Encantamientos especiales únicos','x1 llave por compra'], chip:'popular' },
  { id:'llave-legendaria', cat:'llaves', name:'Llave Legendaria', price:9.99, icon:'✨', color:'#ffcd5c', deep:'#1a1400',
    desc:'La llave más poderosa del servidor. Posibilidad real de obtener rangos permanentes y cosméticos únicos.',
    perks:['Ítems legendarios garantizados','10% probabilidad de rango permanente','Cosméticos exclusivos del servidor','Recursos premium en masa'], chip:'premium' },
  // SPAWNERS
  { id:'spawner-cerdo', cat:'spawners', name:'Spawner Cerdo', price:2.99, icon:'🐷', color:'#ffb3c1', deep:'#150010',
    desc:'Granja de cerdos ilimitada para tu base survival. Perfecto para comida automática y granjas AFK.',
    perks:['Spawner de cerdos x1','Velocidad de spawn x2 base','Compatible con granjas AFK'], chip:null },
  { id:'spawner-blaze', cat:'spawners', name:'Spawner Blaze', price:7.99, icon:'🔥', color:'#ff9f45', deep:'#180600',
    desc:'El mejor spawner para EXP y varillas de blaze. Imprescindible para granjas de pociones avanzadas.',
    perks:['Spawner de blazes x1','EXP extra al eliminar blazes','Varillas de blaze garantizadas','Ideal para granjas de pociones'], chip:'popular' },
  // ÍTEMS
  { id:'item-tokens', cat:'items', name:'Pack Tokens x1000', price:5.99, icon:'🪙', color:'#ffcd5c', deep:'#1a1200',
    desc:'La moneda del servidor para gastar libremente en la tienda in-game con /tienda.',
    perks:['1000 tokens instantáneos','Úsalos en /tienda in-game','No caducan nunca','Son completamente acumulables'], chip:null },
  { id:'item-godapples', cat:'items', name:'God Apples x16', price:8.99, icon:'🍎', color:'#ff5470', deep:'#180008',
    desc:'Manzanas encantadas de oro. El ítem de combate más codiciado y poderoso del servidor.',
    perks:['Manzana encantada de oro x16','Regeneración IV por 30 segundos','Absorción IV durante el efecto','Resistencia al daño extremo'], chip:'popular' },
  // COSMÉTICOS
  { id:'cos-galaxia', cat:'cosmeticos', name:'Traje Galaxia', price:12.99, icon:'🌌', color:'#9b8ff5', deep:'#0a0820',
    desc:'Destaca entre todos con el impresionante traje galaxia con partículas animadas y efectos únicos.',
    perks:['Skin cosmética exclusiva','Trail de estrellas al caminar','Aura galáctica permanente','Efecto de cometa al correr'], chip:'new' },
  { id:'cos-fuego', cat:'cosmeticos', name:'Aura de Fuego', price:6.99, icon:'🔥', color:'#ff6b35', deep:'#180500',
    desc:'Deja rastros épicos de llamas mientras exploras el servidor con un estilo inconfundible.',
    perks:['Trail de fuego al caminar','Partículas flamantes al saltar','Aura de llamas permanente','Compatible con otros cosméticos'], chip:null },
  // BOOSTERS
  { id:'boost-exp2x', cat:'boosters', name:'Booster EXP 2x', price:3.99, icon:'⚡', color:'#2ee07a', deep:'#011408',
    desc:'Duplica la EXP ganada durante una hora completa. Actívalo cuando más lo necesites.',
    perks:['x2 EXP por 1 hora completa','Activación manual con /booster','Aplica a todos los minijuegos','No caduca en el inventario'], chip:null },
  { id:'boost-global', cat:'boosters', name:'Booster Global 1.5x', price:8.99, icon:'💰', color:'#ffcd5c', deep:'#1a1200',
    desc:'Aumenta el dinero de TODOS los jugadores por 30 minutos. Sé el héroe del servidor.',
    perks:['x1.5 dinero para TODOS los jugadores','Duración: 30 minutos activos','Tu nombre en el chat al activar','Efecto aplicado a todo el servidor'], chip:'popular' },
];

/* ── MOCK DATA ────────────────────────────────────────────── */
const MOCK_DONORS = [
  { username:'xDragonFire', amount:89.97, platform:'java' },
  { username:'StarCraft99',  amount:59.99, platform:'java' },
  { username:'CosmicBuild',  amount:34.99, platform:'bedrock' },
];
const MOCK_RECENT = [
  { username:'SkyWalker_',   product:'Rango Jupiter',    price:59.99, time:'2m',  platform:'java' },
  { username:'NightCraft',   product:'Llave Legendaria', price:9.99,  time:'8m',  platform:'java' },
  { username:'PixelHunter',  product:'Kit Combat',       price:4.99,  time:'15m', platform:'bedrock' },
  { username:'LunaMC',       product:'VIP · 30 días',    price:12.99, time:'22m', platform:'java' },
  { username:'ZeroGravity',  product:'Spawner Blaze',    price:7.99,  time:'31m', platform:'java' },
];
const MONTHLY_META   = { goal:500, raised:287 };
const ONLINE_COUNT   = 1247;
const MINI_CHART_DATA = [38,52,68,48,80,62,90,74,83,70,95,87];

/* ── STATE ───────────────────────────────────────────────── */
const S = {
  user:null, cart:[], platform:'java',
  cat:'all', query:'', detailId:null,
  dropOpen:false, mobileOpen:false,
  usernameTimer:null,
};

/* ── UTILS ───────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const fmt = n => '$' + n.toFixed(2);
const skinHead = u => `https://mc-heads.net/head/${encodeURIComponent(u)}/32`;

function showToast(msg, type = 'info') {
  const ICONS = { success:'fa-check-circle', error:'fa-times-circle', info:'fa-info-circle', warn:'fa-exclamation-triangle' };
  const wrap = $('toast-wrap');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${ICONS[type] || ICONS.info}"></i><span>${msg}</span>`;
  wrap.prepend(t);
  setTimeout(() => {
    t.style.transition = 'opacity .3s, transform .3s';
    t.style.opacity = '0'; t.style.transform = 'translateX(20px)';
    setTimeout(() => t.remove(), 350);
  }, 3200);
}

/* ── LOADER ──────────────────────────────────────────────── */
function initLoader() {
  const fill   = $('loader-fill');
  const status = $('loader-status');
  const screen = $('loading-screen');

  const STEPS = [
    [18,  'Conectando al servidor...'],
    [38,  'Cargando recursos...'],
    [60,  'Obteniendo productos...'],
    [80,  'Preparando la interfaz...'],
    [95,  'Casi listo...'],
    [100, '¡Bienvenido a Planet MC!'],
  ];
  const DELAYS = [320, 380, 420, 360, 420, 260];
  let i = 0;

  function tick() {
    if (i >= STEPS.length) {
      setTimeout(() => { screen.classList.add('done'); }, 500);
      return;
    }
    const [pct, msg] = STEPS[i];
    fill.style.width = pct + '%';
    status.textContent = msg;
    setTimeout(tick, DELAYS[i++]);
  }
  setTimeout(tick, 180);
}

/* ── PARTICLES ───────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive:true });

  class Dot {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = .5 + Math.random() * 1.2;
      this.vx = (Math.random() - .5) * .25;
      this.vy = (Math.random() - .5) * .25;
      this.a  = .1 + Math.random() * .22;
    }
    move() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -10 || this.x > W+10 || this.y < -10 || this.y > H+10) this.init();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(0,201,232,${this.a})`;
      ctx.fill();
    }
  }

  for (let n = 0; n < 75; n++) pts.push(new Dot());

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let a = 0; a < pts.length; a++) {
      pts[a].move(); pts[a].draw();
      for (let b = a+1; b < pts.length; b++) {
        const dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
        const d  = Math.hypot(dx, dy);
        if (d < 95) {
          ctx.strokeStyle = `rgba(0,201,232,${.055*(1-d/95)})`;
          ctx.lineWidth = .5;
          ctx.beginPath();
          ctx.moveTo(pts[a].x, pts[a].y);
          ctx.lineTo(pts[b].x, pts[b].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
}

/* ── GLOW RINGS ──────────────────────────────────────────── */
function initGlowRings() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
    }, { passive:true });
  });
}

/* ── FADE-IN ─────────────────────────────────────────────── */
function initFadeIn() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold:0.08 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

/* ── STATS COUNTER ───────────────────────────────────────── */
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.target;
      const step = Math.max(1, Math.ceil(target / 80));
      let cur = 0;
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString('es');
        if (cur >= target) clearInterval(iv);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold:.5 });
  document.querySelectorAll('.stat-num').forEach(el => io.observe(el));
}

/* ── NAV SCROLL ──────────────────────────────────────────── */
function initNav() {
  const nav   = $('nav-inner');
  const links = document.querySelectorAll('.nav-link[data-scroll]');
  const sects = [...links].map(l => ({ l, sec:document.getElementById(l.dataset.scroll) })).filter(x=>x.sec);

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    let active = sects[0];
    sects.forEach(s => { if (window.scrollY + 120 >= s.sec.offsetTop) active = s; });
    links.forEach(l => l.classList.remove('active'));
    if (active) active.l.classList.add('active');
  }, { passive:true });

  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      const t = document.getElementById(el.dataset.scroll);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
    });
  });
}

/* ── PRODUCTS ────────────────────────────────────────────── */
const CHIP_HTML = {
  popular: '<span class="chip chip-popular">🔥 Popular</span>',
  best:    '<span class="chip chip-best">👑 Best</span>',
  premium: '<span class="chip chip-premium">⚡ Premium</span>',
  new:     '<span class="chip chip-new">✨ Nuevo</span>',
  sale:    '<span class="chip chip-sale">🏷️ Oferta</span>',
};
const CAT_LABELS = {
  'rangos-perm':'Rango Permanente','rangos-temp':'Rango Temporal',
  kits:'Kit', llaves:'Llave', spawners:'Spawner',
  items:'Ítem', cosmeticos:'Cosmético', boosters:'Booster',
};

function getFiltered() {
  const q = S.query.toLowerCase();
  return PRODUCTS.filter(p =>
    (S.cat === 'all' || p.cat === S.cat) &&
    (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );
}

function buildCard(p) {
  const inCart = S.cart.some(c => c.id === p.id);
  const priceHtml = p.oldPrice
    ? `<span class="price-currency">$</span><span class="price-value">${p.price.toFixed(2)}</span><span class="price-original">$${p.oldPrice.toFixed(2)}</span>`
    : `<span class="price-currency">$</span><span class="price-value">${p.price.toFixed(2)}</span><span class="price-unit">USD</span>`;

  const el = document.createElement('div');
  el.className = 'card product-card fade-in';
  el.style.cssText = `--p-color:${p.color};--p-deep:${p.deep}`;
  el.dataset.id = p.id;
  el.innerHTML = `
    ${p.chip ? `<div class="product-tag">${CHIP_HTML[p.chip]||''}</div>` : ''}
    <div class="product-visual">
      <div class="product-bg"></div>
      <span class="product-visual-icon">${p.icon}</span>
    </div>
    <div class="product-body">
      <div class="product-cat">${CAT_LABELS[p.cat]||p.cat}</div>
      <div class="product-name">${p.name}</div>
      <p class="product-desc">${p.desc}</p>
      <div class="product-foot">
        <div class="product-price">${priceHtml}</div>
        <div class="product-actions">
          <button class="btn btn-primary" style="flex:1" onclick="addToCart('${p.id}')">
            <i class="fas ${inCart?'fa-check':'fa-cart-plus'}"></i> ${inCart?'En carrito':'Añadir'}
          </button>
          <button class="btn" onclick="openDetail('${p.id}')" title="Ver detalles">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="glow-ring"></div>`;
  return el;
}

function renderProducts(list) {
  const grid  = $('product-grid');
  const empty = $('empty-products');
  grid.innerHTML = '';
  if (!list.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  list.forEach(p => grid.appendChild(buildCard(p)));
  initGlowRings();
  // stagger fade-in
  grid.querySelectorAll('.fade-in').forEach((el,i) => {
    el.style.transitionDelay = (i * 40) + 'ms';
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
  });
}

function updateCounts() {
  ['all','rangos-perm','rangos-temp','kits','llaves','spawners','items','cosmeticos','boosters'].forEach(cat => {
    const el = $('count-'+cat);
    if (el) el.textContent = cat==='all' ? PRODUCTS.length : PRODUCTS.filter(p=>p.cat===cat).length;
  });
}

/* these are called from inline onclick */
function filterCat(el, cat) {
  S.cat = cat;
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  const chip = el || document.querySelector(`.cat-chip[data-cat="${cat}"]`);
  if (chip) chip.classList.add('active');
  renderProducts(getFiltered());
}

function searchProducts() {
  const inp = $('store-search-input');
  S.query = inp.value;
  $('search-clear').classList.toggle('hidden', !S.query);
  renderProducts(getFiltered());
}

function clearSearch() {
  $('store-search-input').value = ''; S.query = '';
  $('search-clear').classList.add('hidden');
  renderProducts(getFiltered());
}

/* ── PRODUCT DETAIL ──────────────────────────────────────── */
function openDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  S.detailId = id;
  const overlay = $('detail-overlay');
  const modal   = $('detail-modal');
  modal.style.setProperty('--p-color', p.color);
  modal.style.setProperty('--p-deep',  p.deep);

  $('detail-icon').textContent  = p.icon;
  $('detail-title').textContent = p.name;
  $('detail-cat-label').textContent = CAT_LABELS[p.cat]||p.cat;
  $('detail-eyebrow').innerHTML = `<span class="eyebrow-dot"></span> ${CAT_LABELS[p.cat]||p.cat}`;
  $('detail-price').textContent = fmt(p.price);
  $('detail-desc').textContent  = p.desc;

  const oldEl = $('detail-price-old');
  p.oldPrice ? (oldEl.textContent=fmt(p.oldPrice), oldEl.classList.remove('hidden')) : oldEl.classList.add('hidden');

  const chipEl = $('detail-chip');
  chipEl.innerHTML = p.chip ? CHIP_HTML[p.chip] : '';

  $('detail-perks').innerHTML = p.perks.map(perk =>
    `<li><span class="check-dot"><i class="fas fa-check" style="font-size:8px"></i></span>${perk}</li>`
  ).join('');

  const head = $('detail-confirm-head'), txt = $('detail-confirm-text');
  if (S.user) {
    head.src = skinHead(S.user.username); head.style.display = 'block';
    txt.innerHTML = `<strong>${S.user.username}</strong> · ${S.user.platform==='java'?'☕ Java':'🪨 Bedrock'}`;
    txt.style.color = 'var(--text-dim)';
  } else {
    head.style.display = 'none';
    txt.innerHTML = `<i class="fas fa-exclamation-circle" style="color:var(--ruby)"></i> Inicia sesión para comprar`;
  }

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  $('detail-overlay').classList.add('hidden');
  document.body.style.overflow = '';
  S.detailId = null;
}

function detailAddToCart() {
  if (S.detailId) { addToCart(S.detailId); closeDetail(); }
}

/* ── CART ────────────────────────────────────────────────── */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  if (S.cart.some(c => c.id === id)) { showToast(`${p.name} ya está en el carrito`, 'info'); return; }
  S.cart.push(p);
  updateCartUI();
  showToast(`<strong>${p.name}</strong> añadido al carrito`, 'success');
  renderProducts(getFiltered());
}

function removeFromCart(id) {
  S.cart = S.cart.filter(c => c.id !== id);
  updateCartUI();
  renderCartItems();
  renderProducts(getFiltered());
}

function updateCartUI() {
  const n = S.cart.length;
  const badge = $('cart-badge');
  badge.textContent = n;
  badge.classList.toggle('hidden', n === 0);
  $('cart-count-label').textContent = `${n} producto${n!==1?'s':''}`;
  const total = S.cart.reduce((a,p)=>a+p.price,0);
  $('cart-total-amount').textContent = fmt(total);
  const btn = $('checkout-btn');
  if (btn) btn.disabled = (n === 0);
}

function renderCartItems() {
  const list  = $('cart-items-list');
  const empty = $('empty-cart-msg');
  list.innerHTML = '';
  if (!S.cart.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  S.cart.forEach(p => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div class="cart-row-icon">${p.icon}</div>
      <div class="cart-row-info">
        <div class="cart-row-name">${p.name}</div>
        <div class="cart-row-price">${fmt(p.price)}</div>
      </div>
      <button class="cart-remove" onclick="removeFromCart('${p.id}')">Quitar</button>`;
    list.appendChild(row);
  });
}

function openCart() {
  renderCartItems();
  updateCartDrawerUser();
  $('cart-drawer').classList.add('open');
  $('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  $('cart-drawer').classList.remove('open');
  $('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function updateCartDrawerUser() {
  const notLogged = $('drawer-not-logged');
  const logged    = $('drawer-logged');
  const dot       = $('drawer-status-dot');
  if (S.user) {
    notLogged.classList.add('hidden'); logged.classList.remove('hidden');
    $('drawer-head').src = skinHead(S.user.username);
    $('drawer-username').textContent = S.user.username;
    const pEl = $('drawer-platform');
    pEl.textContent = S.user.platform==='java' ? '☕ Java' : '🪨 Bedrock';
    pEl.className = `drawer-platform ${S.user.platform}`;
    dot.classList.add('online');
  } else {
    notLogged.classList.remove('hidden'); logged.classList.add('hidden');
    dot.classList.remove('online');
  }
}

/* ── CHECKOUT ────────────────────────────────────────────── */
function openCheckout() {
  if (!S.cart.length) return;
  if (!S.user) { showToast('Inicia sesión primero', 'warn'); closeCart(); setTimeout(openUserDrop, 200); return; }

  $('co-head').src = skinHead(S.user.username);
  $('co-username').textContent = S.user.username;
  $('co-platform').textContent = S.user.platform==='java' ? '☕ Java' : '🪨 Bedrock';

  $('checkout-items-list').innerHTML = S.cart.map(p=>`
    <div class="co-item">
      <div class="co-item-left"><span class="co-item-icon">${p.icon}</span><span class="co-item-name">${p.name}</span></div>
      <span class="co-item-price">${fmt(p.price)}</span>
    </div>`).join('');

  $('co-total').textContent = fmt(S.cart.reduce((a,p)=>a+p.price,0));
  ['term-1','term-2','term-3'].forEach(id => { const e=$(id); if(e) e.checked=false; });
  $('go-tebex-btn').disabled = true;

  closeCart();
  $('checkout-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  $('checkout-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function evalTerms() {
  const ok = ['term-1','term-2','term-3'].every(id => { const e=$(id); return e && e.checked; });
  $('go-tebex-btn').disabled = !ok;
}

function goToTebex() {
  showToast('Redirigiendo a Tebex de forma segura...', 'info');
  setTimeout(() => window.open('https://planet.tebex.io','_blank'), 700);
}

/* ── USER / LOGIN ────────────────────────────────────────── */
function toggleUserDrop() { S.dropOpen ? closeDrop() : openUserDrop(); }

function openUserDrop() {
  $('nav-user-drop').classList.add('open');
  $('nav-chevron').classList.add('open');
  S.dropOpen = true;
  setTimeout(() => document.addEventListener('click', outsideClick), 10);
}

function closeDrop() {
  $('nav-user-drop').classList.remove('open');
  $('nav-chevron').classList.remove('open');
  S.dropOpen = false;
  document.removeEventListener('click', outsideClick);
}

function outsideClick(e) {
  if (!$('nav-user-wrap').contains(e.target)) closeDrop();
}

function selectPlatform(type) {
  S.platform = type;
  $('plat-java').classList.toggle('active', type==='java');
  $('plat-bedrock').classList.toggle('active', type==='bedrock');
  $('bedrock-hint').classList.toggle('hidden', type!=='bedrock');
  $('mc-input').value = '';
  $('drop-preview').classList.add('hidden');
  $('drop-confirm').disabled = true;
  $('drop-spinner').classList.add('hidden');
  $('drop-check').classList.add('hidden');
}

function onUsernameType() {
  clearTimeout(S.usernameTimer);
  const val = $('mc-input').value.trim();
  $('drop-preview').classList.add('hidden');
  $('drop-confirm').disabled = true;
  $('drop-spinner').classList.add('hidden');
  $('drop-check').classList.add('hidden');
  if (val.length < 3) return;
  $('drop-spinner').classList.remove('hidden');
  S.usernameTimer = setTimeout(() => lookupUsername(val), 650);
}

function lookupUsername(username) {
  const img = new Image();
  const done = () => {
    $('drop-spinner').classList.add('hidden');
    $('drop-check').classList.remove('hidden');
    $('preview-skin').src = skinHead(username);
    $('preview-name').textContent = username;
    $('preview-badge').className = 'drop-preview-badge badge-offline';
    $('preview-badge').textContent = S.platform==='java' ? '☕ Java' : '🪨 Bedrock';
    $('drop-preview').classList.remove('hidden');
    $('drop-confirm').disabled = false;
  };
  img.onload = done;
  img.onerror = () => { img.src = 'https://mc-heads.net/head/steve/32'; done(); };
  img.src = skinHead(username);
}

function confirmLogin() {
  const username = $('mc-input').value.trim();
  if (!username) return;
  S.user = { username, platform: S.platform };

  // Update nav avatar
  const avatar = $('nav-user-avatar');
  const aImg = document.createElement('img');
  aImg.src = skinHead(username);
  aImg.onerror = () => { avatar.innerHTML = '<i class="fas fa-user"></i>'; };
  avatar.innerHTML = ''; avatar.appendChild(aImg);
  $('nav-user-name').textContent = username;

  $('drop-logout').classList.remove('hidden');
  $('drop-confirm').classList.add('hidden');
  closeDrop();
  showToast(`¡Bienvenido, <strong>${username}</strong>!`, 'success');
  updateCartDrawerUser();
  renderProducts(getFiltered());
}

function logout() {
  S.user = null;
  $('nav-user-avatar').innerHTML = '<i class="fas fa-user"></i>';
  $('nav-user-name').textContent = 'Iniciar sesión';
  $('drop-logout').classList.add('hidden');
  $('drop-confirm').classList.remove('hidden');
  $('drop-confirm').disabled = true;
  $('mc-input').value = '';
  $('drop-preview').classList.add('hidden');
  $('drop-check').classList.add('hidden');
  closeDrop();
  showToast('Sesión cerrada', 'info');
  updateCartDrawerUser();
  renderProducts(getFiltered());
}

/* ── MOBILE MENU ─────────────────────────────────────────── */
function toggleMobile() {
  S.mobileOpen = !S.mobileOpen;
  const menu = $('mobile-menu');
  menu.classList.toggle('hidden', !S.mobileOpen);
  menu.classList.toggle('open',   S.mobileOpen);
  $('ham-icon').className = S.mobileOpen ? 'fas fa-times' : 'fas fa-bars';
}

/* ── IP COPY ─────────────────────────────────────────────── */
function copyIP(ip, btn) {
  navigator.clipboard.writeText(ip).then(() => {
    const label = btn.querySelector('.server-ip-copied');
    if (label) { label.style.opacity='1'; setTimeout(()=>label.style.opacity='0',1600); }
    showToast(`IP copiada: <strong>${ip}</strong>`, 'success');
  }).catch(() => showToast('No se pudo copiar la IP','error'));
}

/* ── DONATE SECTION ──────────────────────────────────────── */
function initDonateSection() {
  // Monthly meta
  const pct = Math.round(MONTHLY_META.raised / MONTHLY_META.goal * 100);
  $('meta-pct').textContent   = pct + '%';
  $('meta-goal-val').textContent = fmt(MONTHLY_META.goal);
  $('meta-raised').textContent   = fmt(MONTHLY_META.raised);
  $('online-count').textContent  = ONLINE_COUNT.toLocaleString('es');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  $('meta-month-label').textContent = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
  setTimeout(() => { $('meta-fill').style.width = pct + '%'; }, 500);

  // Podium
  const podium = $('podium-container');
  podium.innerHTML = '';
  const ORDER = [1,0,2], RANKS = ['rank-2','rank-1','rank-3'];
  ORDER.forEach((di, ci) => {
    const d = MOCK_DONORS[di], rank = di+1;
    const col = document.createElement('div');
    col.className = `podium-col ${RANKS[ci]}`;
    col.innerHTML = `
      <div style="position:relative;margin-bottom:8px">
        ${rank===1?'<div class="crown" style="font-size:18px;top:-20px">👑</div>':''}
        <div class="podium-avatar">
          <img src="${skinHead(d.username)}" alt="${d.username}" onerror="this.style.opacity='.2'"/>
        </div>
      </div>
      <div class="podium-name">${d.username}</div>
      <div class="podium-amount">${fmt(d.amount)}</div>
      <div class="podium-meta">${d.platform==='java'?'☕ Java':'🪨 Bedrock'}</div>
      <div class="podium-base">#${rank}</div>`;
    podium.appendChild(col);
  });

  // Recent donations
  const list = $('recent-list');
  list.innerHTML = '';
  MOCK_RECENT.forEach(d => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${skinHead(d.username)}" alt="${d.username}" onerror="this.style.opacity='.2'"/>
      <div class="recent-mid">
        <div class="recent-user">${d.username}
          <span class="recent-plat ${d.platform}">${d.platform==='java'?'Java':'Bedrock'}</span>
        </div>
        <div class="recent-product">${d.product}</div>
      </div>
      <span class="recent-price">${fmt(d.price)}</span>
      <span class="recent-time">${d.time}</span>`;
    list.appendChild(li);
  });
}

/* ── MINI BAR CHART ──────────────────────────────────────── */
function initMiniChart() {
  const wrap = $('mini-bar-chart');
  if (!wrap) return;
  const max = Math.max(...MINI_CHART_DATA);
  MINI_CHART_DATA.forEach((v,i) => {
    const bar = document.createElement('div');
    bar.className = 'mini-bar';
    bar.style.height = '4px';
    wrap.appendChild(bar);
    setTimeout(() => { bar.style.height = ((v/max)*100)+'%'; }, 600 + i*50);
  });
}

/* ── MAIN ────────────────────────────────────────────────── */
function initApp() {
  renderProducts(PRODUCTS);
  updateCounts();
  initParticles();
  initGlowRings();
  initFadeIn();
  initCounters();
  initNav();
  initDonateSection();
  initMiniChart();
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  // Watch for loader completing, then bootstrap app
  const screen = $('loading-screen');
  const obs = new MutationObserver(() => {
    if (screen.classList.contains('done')) { obs.disconnect(); initApp(); }
  });
  obs.observe(screen, { attributes:true, attributeFilter:['class'] });
});
