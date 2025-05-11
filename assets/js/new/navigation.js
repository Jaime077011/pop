// navigation.js
import { validateStep }    from './validation.js';
import { calculateResult } from './result-math.js';

let currentTab = 0;
let userType   = '';

export function setupNavigation() {
  showTab(currentTab);
  $('#nextBtn').on('click', () => nextPrev(+1));
  $('#prevBtn').on('click', () => nextPrev(-1));
}

function nextPrev(dir) {
  const tabs = document.getElementsByClassName('multisteps_form_panel');
  const step = currentTab + 1;               // 1-based

  if (dir === 1 && !validateStep(step)) return;

  if (dir === 1 && step === 1) {
    userType = $('input[name="stp_1_select_option"]:checked').val() || '';
  }

  tabs[currentTab].style.display = 'none';

  if (step === 1 && dir === 1) {
    currentTab = userType === 'shop'    ? 6 :
                 userType === 'company' ? 11 : 1;
  } else {
    currentTab += dir;
  }

  const max = userType === 'customer' ? 6 :
              userType === 'shop'     ? 11 : 16;
  currentTab = Math.min(Math.max(currentTab, 0), max);

  const lastReal = (userType === 'customer' && currentTab === 6)  ||
                   (userType === 'shop'     && currentTab === 11) ||
                   (userType === 'company'  && currentTab === 16);

  if (lastReal && dir === 1) {
    currentTab = 16;          // results panel index
    showTab(currentTab);

    const { points, ordered } = calculateResult(userType);
    $('#result').html(`<strong>Your selections:</strong> ${JSON.stringify(points)}`);
    $('#result-1').text(ordered[0] ?? '');
    $('#result-2').text(ordered[1] ?? '');
    return;
  }
  showTab(currentTab);
}

function showTab(n) {
  const panels = document.getElementsByClassName('multisteps_form_panel');
  [...panels].forEach(p => p.style.display = 'none');
  panels[n].style.display = 'block';

  $('#prevBtn').toggle(n !== 0);
  if (n === 16) $('#prevBtn, #nextBtn').hide();  else $('#nextBtn').show();
  fixStepIndicator(n);
}

function fixStepIndicator(n) {
  const steps = document.getElementsByClassName('step');
  [...steps].forEach(s => s.classList.remove('active'));
  steps[n]?.classList.add('active');
}

export function handleBackButton() {
  if ([1, 6, 11].includes(currentTab)) {
    currentTab = 0;
    showTab(currentTab);
    return true;
  }
  return false;
}
