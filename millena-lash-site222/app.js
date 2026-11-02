(function () {
  var S = window.SITE;
  var $ = function (s) { return document.querySelector(s); };
  var brl = function (n) { return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var arred = function (n) { return Math.round(n * 100) / 100; };

  /* ---------- contato / links ---------- */
  var zapNum = (S.whatsapp || "").replace(/\D/g, "");
  function zapLink(texto) {
    return zapNum ? "https://wa.me/" + zapNum + "?text=" + encodeURIComponent(texto || "") : "#agendamento";
  }
  $("#zapFlutuante").href = zapLink("Olá, Millena! Gostaria de mais informações.");
  if (!zapNum) $("#zapFlutuante").hidden = true;
  var contato = [];
  if (S.instagram) contato.push('<a href="https://instagram.com/' + S.instagram + '" target="_blank" rel="noopener">@' + S.instagram + "</a>");
  if (zapNum) contato.push('<a href="' + zapLink() + '" target="_blank" rel="noopener">WhatsApp</a>');
  $("#rodapeContato").innerHTML = contato.join(" · ");
  $("#ano").textContent = new Date().getFullYear();

  /* ---------- menu mobile ---------- */
  var btnMenu = $(".menu-btn"), menu = $("#menu");
  btnMenu.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", aberto);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("aberto"); btnMenu.setAttribute("aria-expanded", false); }
  });

  /* ---------- galeria ---------- */
  var grade = $("#galeriaGrade"), box = $("#lightbox");
  S.galeria.forEach(function (src, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "tile"; b.setAttribute("aria-label", "Ampliar foto " + (i + 1));
    var img = new Image();
    img.src = src; img.alt = "Cílios feitos por Millena, foto " + (i + 1); img.loading = "lazy";
    img.onerror = function () {
      img.remove(); b.classList.add("sem-foto"); b.disabled = true;
      b.innerHTML = '<span class="ph">Adicione a foto ' + (i + 1) + "</span>";
    };
    b.appendChild(img);
    b.addEventListener("click", function () {
      if (b.classList.contains("sem-foto")) return;
      box.querySelector("img").src = src; box.showModal();
    });
    grade.appendChild(b);
  });
  box.addEventListener("click", function () { box.close(); });

  /* ---------- preços ---------- */
  $("#listaPrecos").innerHTML = S.servicos.map(function (s) {
    return '<article class="card"><h4>' + s.nome + '</h4><p class="preco">' + brl(s.preco) +
      '</p><p class="muted">' + s.descricao + "</p></article>";
  }).join("");
  $("#precoVolume").textContent = "+ " + brl(S.adicionais.volume);
  $("#precoDesloc").textContent = "a partir de " + brl(S.adicionais.deslocamentoMin);
  $("#lblVolume").textContent = "(+ " + brl(S.adicionais.volume) + ")";
  $("#lblDesloc").textContent = "(taxa a partir de " + brl(S.adicionais.deslocamentoMin) + ")";

  /* ---------- formulário ---------- */
  var f = {
    volume: $("#optVolume"), domicilio: $("#optDomicilio"), campoEnd: $("#campoEndereco"),
    endereco: $("#endereco"), data: $("#data"), horario: $("#horario"), aviso: $("#avisoData"),
    nome: $("#nome"), tel: $("#telefone"), obs: $("#obs"), erro: $("#erroForm")
  };
  $("#opcoesServico").innerHTML = S.servicos.map(function (s, i) {
    return '<label class="opcao"><input type="radio" name="servico" value="' + s.id + '"' + (i === 0 ? "" : "") +
      '><span>' + s.nome + "</span><b>" + brl(s.preco) + "</b></label>";
  }).join("");

  function servicoSel() {
    var r = document.querySelector('input[name="servico"]:checked');
    return r ? S.servicos.filter(function (s) { return s.id === r.value; })[0] : null;
  }

  function calcular() {
    var s = servicoSel();
    if (!s) return null;
    var sub = s.preco;
    if (f.volume.checked) sub += S.adicionais.volume;
    var desc = window.Promo && window.Promo.ativo ? window.Promo.desconto(sub, s.id) : 0;
    var total = arred(sub - desc);
    var sinal = arred(total * S.sinalPercentual / 100);
    return { servico: s, subtotal: sub, desconto: desc, total: total, sinal: sinal, restante: arred(total - sinal) };
  }

  function renderResumo() {
    var c = calcular(), el = $("#resumoLinhas");
    if (!c) return;
    var h = '<div class="r-linha"><span>' + c.servico.nome + "</span><span>" + brl(c.servico.preco) + "</span></div>";
    if (f.volume.checked) h += '<div class="r-linha"><span>Mais volume / volumão</span><span>+ ' + brl(S.adicionais.volume) + "</span></div>";
    if (c.desconto > 0) h += '<div class="r-linha desc"><span>' + window.Promo.titulo + " (" + window.Promo.percentual + '%)</span><span>− ' + brl(c.desconto) + "</span></div>";
    if (f.domicilio.checked) h += '<div class="r-linha"><span>Deslocamento</span><span>a partir de ' + brl(S.adicionais.deslocamentoMin) + "</span></div>";
    h += '<div class="r-linha total"><span>Total do serviço</span><span>' + brl(c.total) + "</span></div>";
    h += '<div class="r-linha sinal"><span>Sinal (' + S.sinalPercentual + '%)</span><span>' + brl(c.sinal) + "</span></div>";
    h += '<p class="muted">Restante de ' + brl(c.restante) + (f.domicilio.checked ? " + taxa de deslocamento" : "") + " no dia do atendimento.</p>";
    el.innerHTML = h;
  }

  document.querySelectorAll('input[name="servico"]').forEach(function (r) { r.addEventListener("change", renderResumo); });
  f.volume.addEventListener("change", renderResumo);
  f.domicilio.addEventListener("change", function () {
    f.campoEnd.hidden = !f.domicilio.checked;
    renderResumo();
  });

  /* ---------- datas e horários ---------- */
  var DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var hoje = new Date(), min = new Date(hoje), max = new Date(hoje);
  min.setDate(min.getDate() + S.agenda.antecedenciaDias);
  max.setDate(max.getDate() + S.agenda.janelaDias);
  f.data.min = iso(min); f.data.max = iso(max);

  function dataValida(v) {
    if (!v) return "";
    var d = new Date(v + "T12:00:00");
    if (S.agenda.diasSemana.indexOf(d.getDay()) === -1) return "Não atendo na " + DIAS[d.getDay()] + ". Escolha outro dia.";
    if (S.agenda.diasBloqueados.indexOf(v) > -1) return "Esta data não está disponível. Escolha outro dia.";
    if (v < f.data.min || v > f.data.max) return "Escolha uma data entre " + f.data.min.split("-").reverse().join("/") + " e " + f.data.max.split("-").reverse().join("/") + ".";
    return "";
  }
  f.data.addEventListener("change", function () {
    var msg = dataValida(f.data.value);
    f.aviso.hidden = !msg; f.aviso.textContent = msg;
    f.horario.innerHTML = msg || !f.data.value
      ? '<option value="">Escolha a data primeiro</option>'
      : '<option value="">Selecione</option>' + S.agenda.horarios.map(function (h) { return '<option value="' + h + '">' + h + "</option>"; }).join("");
  });

  /* ---------- envio -> pagamento ---------- */
  var reserva = null;
  $("#formAgenda").addEventListener("submit", function (e) {
    e.preventDefault();
    var c = calcular(), erro = "";
    if (!c) erro = "Escolha um serviço.";
    else if (!f.data.value || dataValida(f.data.value)) erro = dataValida(f.data.value) || "Escolha a data.";
    else if (!f.horario.value) erro = "Escolha o horário.";
    else if (f.domicilio.checked && !f.endereco.value.trim()) erro = "Informe o endereço ou bairro do atendimento.";
    else if (!f.nome.value.trim()) erro = "Informe seu nome.";
    else if (f.tel.value.replace(/\D/g, "").length < 10) erro = "Informe um WhatsApp válido com DDD.";
    f.erro.hidden = !erro; f.erro.textContent = erro;
    if (erro) return;
    reserva = { c: c, data: f.data.value, horario: f.horario.value };
    abrirPagamento();
  });

  function mensagemZap(comprovante) {
    var c = reserva.c, L = [];
    L.push("Olá, Millena! Quero agendar:");
    L.push("Serviço: " + c.servico.nome);
    if (f.volume.checked) L.push("Adicional: mais volume / volumão");
    L.push("Data: " + reserva.data.split("-").reverse().join("/") + " às " + reserva.horario);
    L.push("Atendimento: " + (f.domicilio.checked ? "em domicílio (" + f.endereco.value.trim() + ") — taxa de deslocamento a confirmar" : "no local da profissional"));
    if (c.desconto > 0) L.push("Promoção: " + window.Promo.titulo + " (" + window.Promo.percentual + "%)");
    L.push("Total: " + brl(c.total) + " | Sinal de " + S.sinalPercentual + "%: " + brl(c.sinal));
    L.push("Nome: " + f.nome.value.trim() + " | WhatsApp: " + f.tel.value.trim());
    if (f.obs.value.trim()) L.push("Obs.: " + f.obs.value.trim());
    L.push(comprovante ? "Segue o comprovante do sinal." : "Pode me enviar os dados para o Pix do sinal?");
    return L.join("\n");
  }

  function abrirPagamento() {
    var c = reserva.c, temPix = !!S.pix.chave.trim();
    $("#pixValor").textContent = brl(c.sinal);
    $("#pixRestante").textContent = "Restante de " + brl(c.restante) + " no dia do atendimento.";
    $("#blocoCopia").hidden = !temPix;
    $("#btnCopiar").hidden = !temPix;
    $("#blocoQr").hidden = !temPix;
    var aviso = $("#pixAviso");
    aviso.hidden = temPix;
    aviso.textContent = "Clique no botão abaixo para pedir os dados do Pix pelo WhatsApp.";
    if (temPix) {
      var code = window.Pix.payload(S.pix.chave.trim(), S.pix.nome, S.pix.cidade, c.sinal, "MLD" + Date.now().toString(36));
      $("#pixCodigo").value = code;
      var qr = $("#qr"); qr.innerHTML = "";
      if (window.QRCode) new QRCode(qr, { text: code, width: 190, height: 190 });
    }
    $("#btnWhats").href = zapLink(mensagemZap(temPix));
    $("#btnWhats").textContent = temPix ? "Enviar comprovante no WhatsApp" : "Enviar pedido no WhatsApp";
    $("#painelPix").hidden = false; $("#pagVazio").hidden = true;
    $("#pagamento").scrollIntoView({ behavior: "smooth" });
  }

  $("#btnCopiar").addEventListener("click", function () {
    var t = $("#pixCodigo"), b = this;
    t.select();
    (navigator.clipboard ? navigator.clipboard.writeText(t.value) : Promise.reject()).catch(function () { document.execCommand("copy"); });
    b.textContent = "Código copiado!";
    setTimeout(function () { b.textContent = "Copiar código Pix"; }, 2000);
  });
})();
