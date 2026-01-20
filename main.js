// ---------- hero caret scroll ----------
const heroCaret = document.getElementById("heroCaret");

if (heroCaret) {
  heroCaret.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });
}

// ---------- scroll-linked hero ----------
const heroName = document.getElementById("heroName");

window.addEventListener("scroll", () => {
  if (!heroName) return;

  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight * 0.6;
  const t = Math.min(scrollY / maxScroll, 1);

  const scale = 1 - t * 0.45;           // shrink
  const translateY = t * -120;          // move up
  const opacity = 1 - t * 0.25;          // subtle fade

  heroName.style.transform =
    `translateY(${translateY}px) scale(${scale})`;
  heroName.style.opacity = opacity;
});

// ---------- system status timestamp ----------
const statusTime = document.getElementById("statusTime");
if (statusTime) {
  const now = new Date();
  statusTime.textContent = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short"
  });
}


// ---------- interest nodes ----------
document.querySelectorAll(".interest-header").forEach(header => {
  header.addEventListener("click", () => {
    const node = header.parentElement;
    const content = node.querySelector(".interest-content");

    node.classList.toggle("open");

    if (node.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0px";
    }
  });
});

// ---------- parallax bg ----------
const bg = document.getElementById("bgImage");
if (bg) {
  const strength = 18;
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    bg.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
}

// ---------- starfield ----------
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
