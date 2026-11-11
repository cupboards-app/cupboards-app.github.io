// The Paper and Dark switch on the home page. Nothing is stored.
(function () {
  var box = document.getElementById("switches"), seg = document.getElementById("seg-look");
  if (!box || !seg) return;
  var dark = window.matchMedia("(prefers-color-scheme: dark)");
  var look = dark.matches ? "dark" : "light", chosen = false;

  function render() {
    if (chosen) {
      document.documentElement.dataset.look = look;
      document.querySelectorAll("a[data-shot]").forEach(function (a) {
        var src = "screens/chalk-" + a.dataset.shot + "-" + look + ".jpg";
        a.href = src;
        var source = a.querySelector("source"); if (source) source.remove();
        a.querySelector("img").src = src;
      });
    }
    seg.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === look)); });
  }
  seg.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; look = b.dataset.v; chosen = true; render(); });
  dark.addEventListener("change", function (e) { if (!chosen) { look = e.matches ? "dark" : "light"; render(); } });
  box.hidden = false;
  render();
})();
