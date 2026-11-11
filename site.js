// The palette and look switch on the home page. Nothing is stored.
(function () {
  var PAL = {
    original:   { name: "Original", light: ["#F3EDDF", "#FCF7EC", "#342E28", "#726556", "#D8CCBA", "#A64532", "#C1693F"], dark: ["#0F1224", "#14172E", "#FFFFFF", "#B7B8BD", "#40455C", "#00D9D9", "#3FB8C8"] },
    room:       { name: "The fitted room", light: ["#E7EEE9", "#F5F8F5", "#243D35", "#566B62", "#BFCDC5", "#7A2E3E", "#9A4B5A"], dark: ["#182A25", "#22392F", "#E7EEE9", "#A9BDB4", "#2E463E", "#E69AB0", "#C77A90"] },
    chalk:      { name: "Chalk and mulberry", light: ["#F2F3F1", "#FCFCF9", "#252B2D", "#5E6868", "#CCD2CF", "#743C58", "#93607A"], dark: ["#171C1D", "#22292B", "#F1F3EF", "#AFBBB7", "#465351", "#D6A1BA", "#B98AA2"] },
    bluefield:  { name: "Gray-blue field", light: ["#C7D5D9", "#EEF0EC", "#282321", "#4A5559", "#AFC0C5", "#8D1D1F", "#9E5048"], dark: ["#141B1E", "#172329", "#E6E9E6", "#A3AEB0", "#26343A", "#E8706E", "#C98A7E"] },
    cobaltband: { name: "Cobalt band", light: ["#D6E2E2", "#EAF1F1", "#10233A", "#45606A", "#B5C9CB", "#1E6B4E", "#3E9188"], dark: ["#0E1530", "#16203F", "#E1E9EE", "#9CB0C2", "#26335A", "#C9D24F", "#4FB3A6"] }
  };
  var TOKENS = ["paper", "sheet", "ink", "muted", "rule", "thread", "bead"];
  var box = document.getElementById("switches"), segPal = document.getElementById("seg-palette"), segLook = document.getElementById("seg-look");
  if (!box || !segPal || !segLook) return;
  var dark = window.matchMedia("(prefers-color-scheme: dark)");
  var ui = { pal: "room", look: dark.matches ? "dark" : "light", chosen: false };

  Object.keys(PAL).forEach(function (key) {
    var b = document.createElement("button");
    b.type = "button"; b.dataset.v = key; b.textContent = PAL[key].name;
    segPal.appendChild(b);
  });

  function render() {
    var root = document.documentElement, values = PAL[ui.pal][ui.look];
    if (ui.chosen) {
      TOKENS.forEach(function (t, i) { root.style.setProperty("--" + t, values[i]); });
      root.style.setProperty("--corner", ui.look === "dark" ? "12px" : "3px");
      root.style.colorScheme = ui.look;
      document.querySelectorAll("a[data-shot]").forEach(function (a) {
        var src = "screens/" + ui.pal + "-" + a.dataset.shot + "-" + ui.look + ".jpg";
        a.href = src;
        var source = a.querySelector("source"); if (source) source.remove();
        a.querySelector("img").src = src;
      });
    }
    segPal.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === ui.pal)); });
    segLook.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === ui.look)); });
  }
  segPal.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; ui.pal = b.dataset.v; ui.chosen = true; render(); });
  segLook.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; ui.look = b.dataset.v; ui.chosen = true; render(); });
  dark.addEventListener("change", function (e) { if (!ui.chosen) { ui.look = e.matches ? "dark" : "light"; render(); } });
  box.hidden = false;
  render();
})();
