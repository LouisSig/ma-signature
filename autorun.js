// Initialisation obligatoire
Office.onReady(function () {
    // Le code peut être ajouté ici si nécessaire
});

/**
 * Fonction appelée lors de la création d'un nouveau message
 */
function checkSignature(event) {
    const signatureHtml = "<br/><br/>--<br/><b>SIGMA Signature</b><br/>Envoyé automatiquement.";

    Office.context.mailbox.item.body.setSignatureAsync(
        signatureHtml,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                console.error(asyncResult.error.message);
            }
            // Indispensable pour libérer le thread Outlook
            event.completed();
        }
    );
}

// CETTE LIGNE DOIT ÊTRE À LA FIN ET DOIT CORRESPONDRE AU NOM DANS LE XML
Office.actions.associate("checkSignature", checkSignature);