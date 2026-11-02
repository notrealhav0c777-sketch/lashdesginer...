/* Promoções sazonais — módulo independente.
   Liga/desliga em config.js (promocoes.ativo). Para remover de vez,
   apague este arquivo, a <section id="promocoes"> e o <script> no index.html. */
(function () {
  var cfg = window.SITE && window.SITE.promocoes;
  var sec = document.getElementById("promocoes");
  var link = document.querySelector("[data-promo-link]");

  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function br(iso) { return iso.split("-").reverse().join("/"); }

  var ativa = false;
  if (cfg && cfg.ativo) {
    var h = hojeISO();
    ativa = (!cfg.inicio || h >= cfg.inicio) && (!cfg.fim || h <= cfg.fim);
  }

  window.Promo = {
    ativo: ativa,
    titulo: cfg ? cfg.titulo : "",
    percentual: cfg ? cfg.percentual : 0,
    desconto: function (subtotal, servicoId) {
      if (!ativa) return 0;
      var ok = cfg.aplicaEm === "todos" || (Array.isArray(cfg.aplicaEm) && cfg.aplicaEm.indexOf(servicoId) > -1);
      return ok ? Math.round(subtotal * cfg.percentual) / 100 : 0;
    }
  };

  if (ativa && sec) {
    function set(nome, txt) {
      var el = sec.querySelector('[data-promo="' + nome + '"]');
      if (el) el.textContent = txt;
    }
    set("titulo", cfg.titulo);
    set("descricao", cfg.descricao);
    set("percentual", cfg.percentual + "%");
    set("validade", cfg.fim ? "Válida até " + br(cfg.fim) + "." : "");
    sec.hidden = false;
    if (link) link.hidden = false;
  }
})();
