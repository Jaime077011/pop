// validation.js
export function validateStep(stepIdx) {
  const name = `stp_${stepIdx}_select_option`;
  const $checked = $(`input[name="${name}"]:checked`);
  const $msg = $(`#validation-step${stepIdx}`);

  if ($checked.length === 0) {
    $msg.text('Please select at least one option.').show();
    $(`#step-${stepIdx}`).addClass('error');
    return false;
  }
  $msg.hide();
  $(`#step-${stepIdx}`).removeClass('error');
  return true;
}

export function initValidationHints() {
  $('input[type="radio"]').on('change', function () {
    const step = this.name.match(/\d+/)[0];
    $(`#validation-step${step}`).hide();
    $(`#step-${step}`).removeClass('error');
  });
}
