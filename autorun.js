function checkSignature(event) {
    const userName = Office.context.mailbox.userProfile.displayName;
    const userEmail = Office.context.mailbox.userProfile.emailAddress;

    // Ton HTML exact, correctement refermé
    const signatureHtml = `
    <table cellpadding="0" cellspacing="0" border="0" class="sh-src" style="margin: 0px; border-collapse: collapse;">
      <tr>
        <td style="padding: 0px 1px 0px 0px;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; margin: 0px;">
            <tr>
              <td valign="middle" align="center" style="padding: 0px 40px 0px 40px; vertical-align: middle;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 0px 1px 0px 0px;">
                      <p style="margin: 1px;">
                        <img src="data:image/png;base64,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" alt="" title="Logo" width="293" height="66" style="display: block; border: 0px; max-width: 293px;">
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="padding: 1px 0px 0px; border-right: 3px solid rgb(51,59,143);"></td>
              <td valign="middle" style="padding: 0px 1px 0px 46px; vertical-align: middle;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 0px 1px 26px 0px; font-family: 'Trebuchet MS', sans-serif; font-size: 15px; line-height: 16px; white-space: nowrap;">
                      <p style="font-family: 'Trebuchet MS', sans-serif; font-size: 15px; line-height: 16px; font-weight: 700; color: #000000; margin: 1px;">
                        ${userName}
                      </p>
                      <p style="font-family: 'Trebuchet MS', sans-serif; font-size: 13px; color: #545454; margin: 1px;">
                        Groupe Sigma France
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="mailto:${userEmail}" style="font-family: 'Trebuchet MS', sans-serif; font-size: 13px; color: #545454; text-decoration: none;">${userEmail}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

    // Insertion du contenu
    Office.context.mailbox.item.body.setSelectedDataAsync(
        signatureHtml,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            // Indique à Outlook que l'opération est finie (crucial pour le bouton mobile)
            if (event) event.completed();
        }
    );
}

// IMPORTANT : Cette ligne permet au bouton mobile de trouver la fonction
Office.actions.associate("checkSignature", checkSignature);