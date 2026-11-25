/* ============================================================
   CRYSTAL RV — SITE NUMBERS (edit here, upload this one file)
   ============================================================
   When your Google review count grows, change the number below,
   save, and upload ONLY this file (js/site-config.js) via FTP.
   Every page shows the new count immediately.
   ============================================================ */

var GOOGLE_REVIEW_COUNT = 25;
var GOOGLE_RATING = "5.0";

/* ----- do not edit below this line ----- */
(function () {
  function apply() {
    document.querySelectorAll(".rv-count").forEach(function (el) {
      el.textContent = GOOGLE_REVIEW_COUNT;
    });
    document.querySelectorAll(".rv-rating").forEach(function (el) {
      el.textContent = GOOGLE_RATING;
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
