# Millena Araujo Lash Design — site

Site estático (HTML, CSS e JavaScript), sem build. Funciona na Vercel direto.

## Publicar na Vercel
1. Suba a pasta para um repositório no GitHub (ou use `vercel` no terminal dentro da pasta).
2. Na Vercel: **Add New → Project**, importe o repositório.
3. Framework Preset: **Other**. Deixe build command e output vazios. Deploy.

## O que editar (tudo em `config.js`)
- `whatsapp`: número com 55 + DDD, só números (ex.: `5521999999999`).
- `instagram`: sem o @.
- `pix.chave`: chave Pix que recebe o sinal. Telefone entra como `+5521999999999`.
- `servicos`, `adicionais`: preços.
- `agenda`: dias da semana, horários, datas bloqueadas.
- `galeria`: lista de fotos.
- `promocoes.ativo`: `true` liga, `false` desliga.

## Fotos e texto
- Fotos da formatura: `assets/formatura.jpg` (principal), `formatura-2.jpg` e `formatura-3.jpg`.
- Fotos dos cílios: `assets/galeria/cilios-01.jpg`, `cilios-02.jpg`, etc. (nomes iguais aos de `config.js`).
- Texto da história: em `index.html`, dentro de `<div id="minha-historia">` (já preenchido).

## Promoções sazonais
Ficam isoladas em `promocoes.js` e na `<section id="promocoes">`.
- Desligar: `promocoes.ativo: false` em `config.js`.
- Desligar sozinha: preencha `fim` com a data final.
- Remover de vez: apague o `promocoes.js`, a seção `#promocoes`, o link `data-promo-link` do menu e a linha do `<script>`.

## Como funciona o pagamento
O site gera o Pix copia e cola com o valor exato do sinal de 50% e um QR Code. A cliente paga e envia o comprovante pelo WhatsApp com o resumo do agendamento já preenchido. A confirmação do pagamento e do horário é feita por você; o site não verifica pagamentos nem bloqueia horários já reservados automaticamente. Para bloquear um dia, adicione a data em `agenda.diasBloqueados`.

A taxa de deslocamento (a partir de R$ 5) aparece no resumo mas não entra no sinal; você confirma o valor conforme a localização.
