// selection-handlers.js
(function registerOptionToggles () {
  // single-choice groups
  $('.step_1, .step_7, .step_8, .step_9, .step_10, .step_11, .step_12, .step_13, .step_14, .step_15, .step_16')
    .on('click', function () {
      const cls = $(this).attr('class').split(' ')[0];
      $(`.${cls}`).removeClass('active');
      $(this).addClass('active');
    });

  // multi-choice groups
  $('.step_2, .step_3, .step_4, .step_5, .step_6')
    .on('change', function (e) {
      e.stopPropagation();
      $(this).toggleClass('active');
    });
})();
