Office.onReady();

function checkSignature(event) {
    // 1. Récupération du nom de l'utilisateur connecté
    const userName = Office.context.mailbox.userProfile.displayName;
    const userEmail = Office.context.mailbox.userProfile.emailAddress;

    // 2. Construction de la signature dynamique
    const signatureHtml = `
        <br/><br/>
        <div style="font-family: Calibri, Arial, sans-serif;">
            <p style="margin: 0;">Cordialement,</p>
            <p style="margin: 0;"><strong>${userName}</strong></p>
            <p style="margin: 0; color: #555;">${userEmail}</p>
            <br/>
            <div style="border-top: 1px solid #ccc; padding-top: 5px;">
                <b style="color: #004a99;">SIGMA France</b><br/>
                <span style="font-size: 10pt;">Solution de signature automatique</span>
            </div>
        </div>`;

    // 3. Insertion de la signature
    Office.context.mailbox.item.body.setSignatureAsync(
        signatureHtml,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                console.error(asyncResult.error.message);
            }
            // Indispensable : libère l'événement
            event.completed();
        }
    );
}

Office.actions.associate("checkSignature", checkSignature);