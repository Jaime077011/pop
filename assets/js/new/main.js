// main.js
import { initProgressBar, startCounter } from './progress-bar.js';
import { initValidationHints }          from './validation.js';
import { setupNavigation }              from './navigation.js';
import { setupPopup }                   from './popup.js';
import './selection-handlers.js';       // self-initialising IIFE

$(function () {
  initProgressBar();
  startCounter();
  initValidationHints();
  setupNavigation();
  setupPopup();
});
