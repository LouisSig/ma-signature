/* global Office */


Office.onReady(() => {
  // Associe l’ID du manifest à la fonction JS
  Office.actions.associate("onNewMessageComposeHandler", onNewMessageComposeHandler);
  Office.actions.associate("onNewAppointmentComposeHandler", onNewAppointmentComposeHandler);
});

function buildSignatureHtml() {
  return `
    <div style="font-family: Calibri, sans-serif; margin-bottom: 12px;">
      <p>Cordialement,</p>
      <strong style="color:#005a9e; font-size:14pt;">Louis Verbrugge</strong><br/>
      <span style="color:#666;">SIGMA France</span><br/>
      <a href="https://www.sigma-france.fr" style="color:#005a9e;">www.sigma-france.fr</a>
    </div>
  `;
}

function setSig(event) {
  const html = buildSignatureHtml();

  Office.context.mailbox.item.body.setSignatureAsync(
    html,
    { coercionType: Office.CoercionType.Html },
    () => event.completed()
  );
}

function onNewMessageComposeHandler(event) {
  setSig(event);
}

function onNewAppointmentComposeHandler(event) {
  setSig(event);
}

