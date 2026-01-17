// ---------- subtle parallax background ----------
document.addEventListener("mousemove", e => {
  document.body.style.backgroundPosition = `${e.clientX / 50}px ${e.clientY / 50}px`;
});

// ---------- starfield (performance-safe) ----------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d", { alpha: true });

let w, h, dpr;
let stars = [];
const STAR_COUNT = 140;      // keep modest for performance
const SPEED = 0.18;          // slow drift
const TWINKLE = 0.018;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = Math.floor(window.innerWidth * dpr);
  h = canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  initStars();
}

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.2 + 0.2) * dpr,
      a: Math.random() * 0.55 + 0.15,
      vy: (Math.random() * 0.6 + 0.2) * dpr
    });
  }
}

function step() {
  ctx.clearRect(0, 0, w, h);

  // soft vignette glow (very faint)
  const g = ctx.createRadialGradient(w*0.5, h*0.15, 0, w*0.5, h*0.15, Math.max(w,h)*0.7);
  g.addColorStop(0, "rgba(106,168,255,0.08)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  // stars
  for (const s of stars) {
    s.y += s.vy * SPEED;
    if (s.y > h + 10) s.y = -10;

    // twinkle
    s.a += (Math.random() - 0.5) * TWINKLE;
    s.a = Math.max(0.08, Math.min(0.65, s.a));

    ctx.beginPath();
    ctx.fillStyle = `rgba(233,237,245,${s.a})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}

window.addEventListener("resize", resize);
resize();
step();
