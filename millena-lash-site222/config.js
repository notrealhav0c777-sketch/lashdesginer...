/* =====================================================
   CONFIGURAÇÕES DO SITE — edite aqui sem mexer no resto
   ===================================================== */
window.SITE = {
  nome: "Millena Araujo Lash Design",

  // WhatsApp com código do país e DDD, só números. Ex.: "5521999999999"
  whatsapp: "5521990130773",
  // Instagram sem @. Ex.: "millenaaraujo.lash" (deixe vazio para esconder)
  instagram: "_lash_millena",

  // Pix para receber o sinal. Chave: e-mail, CPF/CNPJ, aleatória ou
  // telefone no formato +5521999999999. Deixe vazio para combinar o Pix pelo WhatsApp.
  pix: {
    chave: "c4ac4863-721a-4d5f-97a8-8ff4257f35d9",
    nome: "MILLENA ARAUJO",
    cidade: "BRASIL"
  },
  sinalPercentual: 50,

  servicos: [
    { id: "seda",        nome: "Tufo de seda",                    preco: 40, descricao: "Aplicação com tufos de seda." },
    { id: "no",          nome: "Tufo de nó",                      preco: 30, descricao: "Aplicação com tufos de nó." },
    { id: "gatinho-no",  nome: "Efeito gatinho com tufo de nó",   preco: 35, descricao: "Efeito gatinho usando tufos de nó." },
    { id: "gatinho-seda",nome: "Efeito gatinho com tufo de seda", preco: 45, descricao: "Efeito gatinho usando tufos de seda." }
  ],

  adicionais: {
    volume: 5,            // mais volume ou volumão: acrescenta R$ 5
    deslocamentoMin: 5    // taxa de deslocamento a partir de R$ 5, conforme a localização
  },

  agenda: {
    diasSemana: [1, 2, 3, 4, 5, 6],   // 0=domingo, 1=segunda ... 6=sábado
    horarios: ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"],
    diasBloqueados: [],               // ex.: ["2026-12-25", "2026-12-31"]
    antecedenciaDias: 1,              // a partir de quantos dias à frente
    janelaDias: 60                    // até quantos dias à frente
  },

  // Fotos da galeria: coloque os arquivos em assets/galeria/ e liste aqui
  galeria: [
    "assets/galeria/cilios-01.jpg",
    "assets/galeria/cilios-02.jpg",
    "assets/galeria/cilios-03.jpg",
    "assets/galeria/cilios-04.jpg",
    "assets/galeria/cilios-05.jpg",
    "assets/galeria/cilios-06.jpg",
    "assets/galeria/cilios-07.jpg",
    "assets/galeria/cilios-08.jpg",
    "assets/galeria/cilios-09.jpg",
    "assets/galeria/cilios-10.jpg",
    "assets/galeria/cilios-11.jpg"
  ],

  // PROMOÇÃO SAZONAL — para desligar, troque ativo para false
  promocoes: {
    ativo: false,
    titulo: "Promoção de Fim de Ano",
    descricao: "Garanta seu olhar para as festas com desconto em todos os serviços.",
    percentual: 10,            // desconto em %
    aplicaEm: "todos",         // "todos" ou lista de ids, ex.: ["seda", "no"]
    inicio: "",                // opcional, "AAAA-MM-DD"
    fim: ""                    // opcional, "AAAA-MM-DD" (desliga sozinha depois)
  }
};
