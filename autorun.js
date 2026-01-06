Office.actions.associate("checkSignatureAuto", checkSignatureAuto);
Office.actions.associate("insertSignatureManual", insertSignatureManual);

function checkSignatureAuto(event) {
  // Auto = minimal et robuste
  insertFixedSignature(event);
}

function insertSignatureManual(event) {
  // Clic = même action pour test, tu pourras complexifier après
  insertFixedSignature(event);
}

function insertFixedSignature(event) {
  try {
    var item = Office.context.mailbox.item;
    var html = "<div><b>OK parfait !</b><br/>Signature automatique SIGMA</div>";

    if (item && item.body && item.body.setSignatureAsync) {
      item.body.setSignatureAsync(
        html,
        { coercionType: Office.CoercionType.Html },
        function () {
          safeComplete(event);
        }
      );
      return;
    }

    if (item && item.body && item.body.setSelectedDataAsync) {
      item.body.setSelectedDataAsync(
        html,
        { coercionType: Office.CoercionType.Html },
        function () {
          safeComplete(event);
        }
      );
      return;
    }

    safeComplete(event);
  } catch (e) {
    safeComplete(event);
  }
}

function safeComplete(event) {
  try { event.completed(); } catch (e) {}
}
