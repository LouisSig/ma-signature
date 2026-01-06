// Enregistre plusieurs noms pour être sûr de matcher le manifeste
Office.actions.associate("checkSignature", checkSignature);
Office.actions.associate("checkSignatureAuto", checkSignature);
Office.actions.associate("insertSignatureManual", checkSignature);

function checkSignature(event) {
  try {
    var item = Office.context.mailbox.item;

    // TEST 1 (fiable partout) : change le sujet
    if (item && item.subject && item.subject.setAsync) {
      item.subject.setAsync("OK parfait (handler appelé)", function () {
        // TEST 2 : essaye d'écrire dans le corps
        insertInBody(item, event);
      });
      return;
    }

    // si pas de subject (rare) : direct body
    insertInBody(item, event);
  } catch (e) {
    safeComplete(event);
  }
}

function insertInBody(item, event) {
  var html = "<div><b>OK parfait !</b><br/>Handler exécuté.</div>";

  try {
    if (item && item.body && item.body.setSignatureAsync) {
      item.body.setSignatureAsync(html, { coercionType: Office.CoercionType.Html }, function () {
        safeComplete(event);
      });
      return;
    }

    if (item && item.body && item.body.setSelectedDataAsync) {
      item.body.setSelectedDataAsync(html, { coercionType: Office.CoercionType.Html }, function () {
        safeComplete(event);
      });
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
