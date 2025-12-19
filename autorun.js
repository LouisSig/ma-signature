Office.onReady();

function checkSignature(event) {
    // Votre signature HTML
    const signatureHtml = "<br/><br/>--<br/><b>SIGMA Signature</b>";

    // Utilisation de setSignatureAsync
    // Cette méthode insère la signature à l'emplacement dédié (en bas)
    // sans écraser le corps du message.
    Office.context.mailbox.item.body.setSignatureAsync(
        signatureHtml,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                console.log("Signature ajoutée.");
            }
            // Obligatoire pour libérer l'événement
            event.completed();
        }
    );
}

// Liaison de la fonction au manifest
Office.actions.associate("checkSignature", checkSignature);