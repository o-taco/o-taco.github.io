// ---------- Parallax background ----------
const bg = document.getElementById("bgImage");
if (bg) {
  const strength = 18;
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    bg.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
}

// ---------- Starfield ----------
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let w, h;
const stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const STAR_COUNT = Math.floor((w * h) / 9000);

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    vy: Math.random() * 0.3 + 0.05,
    a: Math.random() * 0.6 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210,230,255,${s.a})`;
    ctx.fill();
    s.y -= s.vy;
    if (s.y < -5) {
      s.y = h + 5;
      s.x = Math.random() * w;
    }
  }
  requestAnimationFrame(draw);
}

draw();
