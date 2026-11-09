/* Al-Momtaz: CSSFontFace stable manual-only controller.
   The original exploitation runtime (src/*) is deliberately unchanged. */
var exploitChain = "lapse";
var jeilbrekBtn = document.getElementById("jeilbrek");
var lapseRadio = document.getElementById("lapse-exploit");
var kexForm = document.getElementById("kernel-options");
var UAElement = document.getElementById("UA");

try {
  localStorage.setItem("autoJb", "false");
  localStorage.setItem("exploitChain", "lapse");
} catch (e) {}

if (UAElement) UAElement.textContent += " " + navigator.userAgent;
if (lapseRadio) lapseRadio.checked = true;

if (kexForm) {
  kexForm.addEventListener("change", function () {
    exploitChain = "lapse";
    if (lapseRadio) lapseRadio.checked = true;
  }, false);
}
if (jeilbrekBtn) {
  jeilbrekBtn.addEventListener("click", function () {
    if (jeilbrekBtn.disabled) return;
    jeilbrekBtn.disabled = true;
    doJb();
  }, false);
}

function cacheProgress(e) {
  if (e && e.total) document.title = "Caching: " + Math.round(e.loaded/e.total*100) + "%";
}
function displayCacheProgress() {
  document.title = "Offline cache updated";
}
document.addEventListener("DOMContentLoaded", function () {
  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", cacheProgress, false);
    window.applicationCache.addEventListener("cached", displayCacheProgress, false);
    window.applicationCache.addEventListener("updateready", displayCacheProgress, false);
  }
}, false);