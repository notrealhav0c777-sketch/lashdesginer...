/* Gerador de Pix "copia e cola" (BR Code estático) com valor definido */
(function (root) {
  function tlv(id, val) {
    return id + String(val.length).padStart(2, "0") + val;
  }
  function crc16(str) {
    var crc = 0xffff;
    for (var i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }
  function limpa(s, max) {
    return String(s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9 ]/g, "")
      .toUpperCase()
      .slice(0, max);
  }
  function payload(chave, nome, cidade, valor, txid) {
    var conta = tlv("00", "br.gov.bcb.pix") + tlv("01", chave);
    var id = limpa(txid, 25).replace(/ /g, "") || "***";
    var p =
      tlv("00", "01") +
      tlv("01", "11") +
      tlv("26", conta) +
      tlv("52", "0000") +
      tlv("53", "986") +
      tlv("54", Number(valor).toFixed(2)) +
      tlv("58", "BR") +
      tlv("59", limpa(nome, 25) || "RECEBEDOR") +
      tlv("60", limpa(cidade, 15) || "BRASIL") +
      tlv("62", tlv("05", id)) +
      "6304";
    return p + crc16(p);
  }
  var api = { crc16: crc16, payload: payload };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Pix = api;
})(typeof window !== "undefined" ? window : globalThis);
