

function checkSignature(event) {
    const userName = Office.context.mailbox.userProfile.displayName;
    const userEmail = Office.context.mailbox.userProfile.emailAddress;

    // On utilise des tableaux simples et des styles inline compatibles Outlook
    const signatureHtml = `
    <div style="font-family: 'Trebuchet MS', Helvetica, sans-serif; line-height: 1.2;">
        <br>
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; color: #000000;">
            <tr>
                <td valign="middle" style="padding-right: 25px; border-right: 2px solid #333b8f;">
                    <a href="https://sigma-france.fr" target="_blank">
                        <img src="https://louissig.github.io/ma-signature/assets/sigma.png" 
                             alt="Logo Sigma" 
                             width="200" 
                             style="display: block; width: 200px; max-width: 200px; border: 0;">
                    </a>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px;">
                        <tr>
                            <td style="padding-right: 8px;">
                                <a href="https://www.linkedin.com/company/groupe-sigma-france/" target="_blank">
                                    <img src="https://louissig.github.io/ma-signature/assets/linkedin.png" width="24" height="24" style="display:block;">
                                </a>
                            </td>
                            <td style="padding-right: 8px;">
                                <a href="https://www.instagram.com/groupesigma/" target="_blank">
                                    <img src="https://louissig.github.io/ma-signature/assets/instagram.png" width="24" height="24" style="display:block;">
                                </a>
                            </td>
                            <td>
                                <a href="https://sigma-france.fr" target="_blank">
                                    <img src="https://louissig.github.io/ma-signature/assets/siteWeb.png" width="24" height="24" style="display:block;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>

                <td valign="middle" style="padding-left: 25px;">
                    <div style="font-size: 16px; font-weight: bold; color: #000000; margin-bottom: 4px;">
                        ${userName}
                    </div>
                    <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; color: #545454;">
                        <tr>
                            <td style="padding-bottom: 4px;">
                                <img src="https://louissig.github.io/ma-signature/assets/mail.png" width="14" style="vertical-align: middle;">
                                <a href="mailto:${userEmail}" style="color: #545454; text-decoration: none; margin-left: 5px;">${userEmail}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 4px;">
                                <img src="https://louissig.github.io/ma-signature/assets/map.png" width="14" style="vertical-align: middle;">
                                <span style="margin-left: 5px;">7 rue des 9 Bonniers, 59178 BRILLON</span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>`;

    Office.context.mailbox.item.body.setSignatureAsync(
        signatureHtml,
        { coercionType: Office.CoercionType.Html },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                console.error(asyncResult.error.message);
            }
            event.completed();
        }
    );
}