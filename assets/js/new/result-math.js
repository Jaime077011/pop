// result-math.js
import { STEP_PRODUCT_POINTS } from './step-product-points.js';

export function calculateResult(userType) {
  const points = { N87: 0, N88: 0, N89: 0, N90: 0 };

  const stepsFor = {
    customer: [2, 3, 4, 5, 6],
    shop:     [7, 8, 9, 10, 11],
    company:  [12, 13, 14, 15, 16]
  }[userType] ?? [];

  stepsFor.forEach(step => {
    document
      .querySelectorAll(`input[name="stp_${step}_select_option"]:checked`)
      .forEach(input => {
        const inc = STEP_PRODUCT_POINTS[step]?.[input.value] || {};
        for (const code in inc) points[code] += inc[code];
      });
  });

  const ordered = Object.entries(points)
                        .sort((a, b) => b[1] - a[1])
                        .map(([c]) => c);

  return { points, ordered };
}
