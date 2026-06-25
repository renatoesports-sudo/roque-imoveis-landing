const WHATSAPP_NUMBER = "5519999999999";

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function buildMessage(form) {
  const data = new FormData(form);
  const name = String(data.get("nome") || "").trim();
  const phone = String(data.get("whatsapp") || "").trim();
  const investment = String(data.get("investimento") || "").trim();

  return [
    "Olá, Roque Imóveis.",
    "Quero receber opções de imóveis para compra em Limeira e região.",
    "",
    `Nome: ${name}`,
    `WhatsApp: ${phone}`,
    `Faixa de investimento: ${investment}`
  ].join("\n");
}

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const phoneInput = form.querySelector('[name="whatsapp"]');
    if (phoneInput) {
      phoneInput.value = phoneInput.value.trim();
    }

    if (!form.reportValidity()) {
      return;
    }

    const message = encodeURIComponent(buildMessage(form));
    const phone = onlyDigits(WHATSAPP_NUMBER);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  });
});
