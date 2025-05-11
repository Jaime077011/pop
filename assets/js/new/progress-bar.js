// progress-bar.js
// Progress-bar movement + animated countdown.
export function initProgressBar() {
  $(document).on('click', '#nextBtn', () => move(+1));
  $(document).on('click', '#prevBtn', () => move(-1));
}

function move(direction) {
  const $bar = $('.count_progress');
  for (let i = 1; i < 4; i++) {
    const cls = `clip-${i}`;
    if ($bar.hasClass(cls)) {
      $bar.removeClass(cls).addClass(`clip-${i + direction}`);
      break;
    }
  }
}

export function startCounter() {
  const obj = document.getElementById('value');
  if (!obj) return;

  const duration = 90_000;          // 90 s  (100 → 0)
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    obj.textContent = Math.floor(100 - 100 * p);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
