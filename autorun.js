Office.onReady();

function checkSignature(event) {
    // Modifiez ici votre HTML de signature
    const signatureHtml = "<br/><br/>--<br/><b>SIGMA Signature</b><br/>Envoyé automatiquement.";

    Office.context.mailbox.item.body.setSignatureAsync(
        signatureHtml,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                console.error(asyncResult.error.message);
            }
            // Très important : indique la fin du traitement
            event.completed();
        }
    );
}

// Associe le nom de la fonction du manifest au code JS
Office.actions.associate("checkSignature", checkSignature);