export function initializeHotjar(hotjarId, hotjarVersion) {
  if (typeof window !== "undefined") {
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: hotjarId, hjsv: hotjarVersion };
      a = o.getElementsByTagName("head")[0];
      r = o.createElement("script");
      r.async = 1;
      r.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=${hotjarVersion}`;
      a.appendChild(r);
    })(window, document, "script", "hotjar");
  }
}
