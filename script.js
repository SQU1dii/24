
const gallerySlots = [
  { sym: '🌸', label: 'Add a photo of Caren',     img: 'photo1.jpeg' },
  { sym: '🏮', label: 'Add a favourite memory',    img: 'photo2.jpeg' },
  { sym: '🎋', label: 'Add a special moment',      img: 'photo3.jpeg' },
  { sym: '🐉', label: 'Add another photo',         img: 'photo4.jpeg' },
  { sym: '✨', label: 'Add a fun memory',           img: 'photo5.jpeg' },
  { sym: '🍵', label: 'Add one more photo',        img: 'photo6.jpeg' },
];

/* ── Birthday poem / message ────────────────────────────── */
const poem =
`Today the world feels a little more bright,
Because it's the day you came into light.
Not just another date on the year's long line,
But a moment that made this world better with time.

You walk through life with a calm, quiet grace,
Leaving warmth in every space.
With words you shape and meanings you find,
You bring different worlds into one gentle mind.

A translator of more than language alone,
You turn feelings to words that feel like home.
And anyone lucky enough to know you can see,
Just how rare a person you truly be.

So today I wish you more than a smile,
More than joy that lasts just a while —
I wish you peace in all that you do,
And dreams that keep coming true for you.

生日快乐 (Shēngrì kuàilè), may your heart stay light,
With love in your days and stars in your night.
And as your story continues to grow,
Just know you're someone I'm grateful to know 💫`;


/* ── Build gallery ────────────────────────────────────────── */
function buildGallery() {
  const container = document.getElementById('gallery');

  gallerySlots.forEach((slot, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.id = 'slot' + i;

    if (slot.img) {
      // Pre-loaded photo from code
      const img = document.createElement('img');
      img.src = slot.img;
      img.alt = slot.label;
      item.appendChild(img);
    } else {
      // Placeholder with upload-on-click
      const ph = document.createElement('div');
      ph.className = 'gallery-placeholder';
      ph.id = 'ph' + i;
      ph.innerHTML = `
        <span class="gallery-sym">${slot.sym}</span>
        <span class="gallery-label">${slot.label}</span>
      `;
      item.appendChild(ph);
    }

    const hint = document.createElement('div');
    hint.className = 'gallery-upload';
    hint.textContent = 'Tap to add photo';
    item.appendChild(hint);

    const input = document.createElement('input');
    input.className = 'upload-input';
    input.type = 'file';
    input.accept = 'image/*';
    input.id = 'file' + i;
    input.addEventListener('change', () => loadPhoto(i, input));
    item.appendChild(input);

    item.addEventListener('click', () => input.click());
    container.appendChild(item);
  });
}

/* ── Handle photo upload ─────────────────────────────────── */
function loadPhoto(i, input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const slot = document.getElementById('slot' + i);
    const ph   = document.getElementById('ph' + i);

    let img = slot.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.alt = 'Caren photo ' + (i + 1);
      slot.insertBefore(img, slot.querySelector('.gallery-upload'));
    }
    img.src = e.target.result;
    if (ph) ph.style.display = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}

/* ── Show birthday message ───────────────────────────────── */
function showMessage() {
  const box = document.getElementById('msgBox');
  const btn = document.getElementById('msgBtn');
  const poemEl = document.getElementById('msgPoem');

  poemEl.textContent = poem;
  box.classList.add('show');

  btn.textContent = '💌 Message Open';
  btn.style.opacity = '0.6';
  btn.style.cursor = 'default';
  btn.onclick = null;

  launchFireworks();
  setTimeout(launchFireworks, 400);
  setTimeout(launchFireworks, 800);
}

/* ── Fireworks ───────────────────────────────────────────── */
function launchFireworks() {
  const wrap   = document.getElementById('wrap');
  const colors = ['#ffd700','#ff4400','#ff0000','#ffaa00','#ffffff','#ff88cc'];

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x   = 10 + Math.random() * 80;
      const y   = 5  + Math.random() * 55;
      const div = document.createElement('div');
      div.className = 'firework';
      div.style.cssText = `left:${x}%;top:${y}%`;

      for (let j = 0; j < 14; j++) {
        const angle = (j / 14) * 360;
        const dist  = 35 + Math.random() * 45;
        const dx    = Math.cos(angle * Math.PI / 180) * dist;
        const dy    = Math.sin(angle * Math.PI / 180) * dist;
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.cssText = `
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          --dx: ${dx}px;
          --dy: ${dy}px;
          animation-delay: ${Math.random() * 0.15}s
        `;
        div.appendChild(spark);
      }

      wrap.appendChild(div);
      setTimeout(() => div.remove(), 1200);
    }, i * 180);
  }
}

/* ── Build lanterns ──────────────────────────────────────── */
function makeLanterns() {
  const container = document.getElementById('lanterns');
  const positions = [
    [5,  4.0], [18, 3.2], [35, 2.8],
    [50, 3.6], [65, 4.2], [82, 4.5], [95, 3.8]
  ];

  positions.forEach(([x, dur], i) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width',   '34');
    svg.setAttribute('height',  '68');
    svg.setAttribute('viewBox', '0 0 34 68');
    svg.innerHTML = `
      <line x1="17" y1="0"  x2="17" y2="8"  stroke="#8B4513" stroke-width="2"/>
      <ellipse cx="17" cy="34" rx="11" ry="19" fill="#cc0000" stroke="#8B4513" stroke-width="1.5"/>
      <ellipse cx="17" cy="20" rx="9"  ry="4"  fill="#8B4513"/>
      <ellipse cx="17" cy="48" rx="9"  ry="4"  fill="#8B4513"/>
      <ellipse cx="17" cy="34" rx="7"  ry="13" fill="#ff3300" opacity=".4"/>
      <text x="17" y="38" text-anchor="middle" font-size="13" fill="#ffd700" font-family="serif">福</text>
      <line x1="11" y1="52" x2="8"  y2="63" stroke="#8B4513" stroke-width="1.5"/>
      <line x1="23" y1="52" x2="26" y2="63" stroke="#8B4513" stroke-width="1.5"/>
      <line x1="17" y1="52" x2="17" y2="66" stroke="#8B4513" stroke-width="1.5"/>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'lantern';
    wrapper.style.cssText = `
      left: ${x}%;
      top: -10px;
      animation-duration: ${dur}s;
      animation-delay: ${-i * 0.6}s
    `;
    wrapper.appendChild(svg);
    container.appendChild(wrapper);
  });
}

/* ── Build floating particles ────────────────────────────── */
function makeParticles() {
  const container = document.getElementById('particles');
  const colors    = ['#ff4400','#ffd700','#ff0000','#ffaa00','#cc0000','#ff6600'];

  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:             ${Math.random() * 100}%;
      background:       ${colors[i % colors.length]};
      width:            ${3 + Math.random() * 5}px;
      height:           ${3 + Math.random() * 5}px;
      animation-duration: ${4 + Math.random() * 6}s;
      animation-delay:  ${-Math.random() * 8}s;
      opacity:          ${0.4 + Math.random() * 0.5}
    `;
    container.appendChild(p);
  }
}

/* ── Init ────────────────────────────────────────────────── */
buildGallery();
makeLanterns();
makeParticles();
setTimeout(launchFireworks, 600);