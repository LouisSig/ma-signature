/* global Office */

Office.onReady(() => {
  Office.actions.associate("onNewMessageComposeHandler", onNewMessageComposeHandler);
});

function onNewMessageComposeHandler(event) {
  const html = `
    <div style="font-family: Calibri, sans-serif; margin-bottom: 12px;">
      <p>Cordialement,</p>
      <strong style="color:#005a9e; font-size:14pt;">Louis Verbrugge</strong><br/>
      <span style="color:#666;">SIGMA France</span><br/>
      <a href="https://www.sigma-france.fr" style="color:#005a9e;">www.sigma-france.fr</a>
    </div>`;

  try {
    Office.context.mailbox.item.body.setSignatureAsync(
      html,
      { coercionType: Office.CoercionType.Html },
      (asyncResult) => {
        // Toujours terminer l’event, succès OU erreur
        event.completed();
      }
    );
  } catch (e) {
    event.completed();
  }
}
