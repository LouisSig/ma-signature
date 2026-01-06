
// v1.0.2.9

// Association de la fonction pour le mode automatique (LaunchEvent) et manuel
Office.actions.associate("checkSignature", checkSignature);

Office.onReady(function () {
    // Initialisation si nécessaire
});
/**
 * Fonction principale appelée à la fois par l'événement automatique 
 * et par le bouton manuel dans le ruban.
 */
function checkSignature(event) {
    try {
        const item = Office.context.mailbox.item;
        const helloHtml = checkSignature();
 
        // 1. On vérifie si on peut utiliser setSignatureAsync (recommandé pour les signatures)
        if (item.body.setSignatureAsync) {
            item.body.setSignatureAsync(
                helloHtml,
                { coercionType: Office.CoercionType.Html },
                function (asyncResult) {
                    if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                        console.log("Signature insérée.");
                    }
                    // Obligatoire pour libérer Outlook
                    if (event) event.completed();
                }
            );
        } 
        // 2. Fallback : Si setSignature n'est pas dispo, on insère au curseur
        else {
            item.body.setSelectedDataAsync(
                helloHtml,
                { coercionType: Office.CoercionType.Html },
                function (asyncResult) {
                    if (event) event.completed();
                }
            );
        }
    } catch (e) {
        console.error("Erreur dans checkSignature:", e);
        if (event) event.completed();
    }
}


// // v1.0.2.7 /////


async function getSignatureAPI(email) {
  const url = "https://localhost:44393/Profile/GetSignatureInAddOutlook";

  // timeout court pour ne pas bloquer le flux
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 600);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ emailUser: email }),
      signal: controller.signal,
    });

    if (!response.ok) return "";

    const data = await response.json();

    // adapte selon ton API : si c'est déjà du HTML renvoyé, garde data
    return data || "";
  } catch (err) {
    // ✅ ERR_CONNECTION_REFUSED / timeout / CORS / certif : on ignore et on continue
    return "";
  } finally {
    clearTimeout(t);
  }
}


async function checkSignature() {
    const userEmail = Office.context.mailbox.userProfile.emailAddress;
    const userName = Office.context.mailbox.userProfile.displayName;
    let signature = "";
    let customers = [];

    const jsonString = localStorage.getItem("sigma_data_cache");
    if (jsonString) {
        try {
            customers = JSON.parse(jsonString);
        } catch (err) {
            console.log("Erreur parsing cache:", err);
            customers = [];
        }
    }

    // try {
    //     signature = await getSignatureAPI(userEmail);
    // } catch (e) {
    //     signature = "";
    // }
    
    if (!signature || signature === "") {
        console.log("Recherche dans le cache local...");
        customers.forEach(element => {
            if (element.userEmail === userEmail) {
                signature = element.status; 
            }
        });
    }

    if (!signature || signature === "") {
        let logoEntity = ""
        if (userEmail.includes("sigma-france.fr") || userEmail.includes("aria-services.fr")) {
            logoEntity = "data:image/png;base64,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"
        }
        else if (userEmail.includes("roboteam.fr")) {
            logoEntity = "data:image/png;base64,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"
        }
        else if (userEmail.includes("techtra.fr") || (userEmail.includes("mlelec.fr"))) {
            logoEntity = "data:image/png;base64,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"
        }

        signature = `
<table cellpadding="0" cellspacing="0" border="0" class="sh-src" style="margin: 0px; border-collapse: collapse;">
          <tr>
            <td style="padding: 0px 1px 0px 0px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; margin: 0px;">
                <tr>
                  <td valign="middle" align="center" style="padding: 0px 40px 0px 40px; vertical-align: middle;">
                    <!---->
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0px 1px 0px 0px;">
                          <p style="margin: 1px;">
                            <img src="${logoEntity}" alt="" title="Logo" width="293" height="66" style="display: block; border: 0px; max-width: 293px;">
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0px 1px 0px 0px;">
                          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                            <tr>
                              <td width="32" style="font-size: 0px; line-height: 0px; padding: 33px 1px 0px 94px;">
                                <p style="margin: 1px;">
                                  <a href="https://www.linkedin.com/company/groupe-sigma-france/" target="_blank">
                                    <img src="data:image/png;base64,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" alt="" width="32" height="32" style="display: block; border: 0px; max-width: 32px;">
                                  </a>
                                </p>
                              </td>
                              <td width="3" style="padding: 0px 0px 1px;"></td>
                              <td width="32" style="font-size: 0px; line-height: 0px; padding: 33px 1px 0px 0px;">
                                <p style="margin: 1px;">
                                  <a href="https://www.instagram.com/groupesigma/" target="_blank">
                                    <img src="data:image/png;base64,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" alt="" width="32" height="32" style="display: block; border: 0px; max-width: 32px;">
                                  </a>
                                </p>
                              </td>
                              <td width="3" style="padding: 0px 0px 1px;"></td>
                              <td width="32" style="font-size: 0px; line-height: 0px; padding: 33px 1px 0px 0px;">
                                <p style="margin: 1px;">
                                  <a href="https://sigma-france.fr">
                                    <img src="data:image/png;base64,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" alt="" width="32" height="32" style="display: block; border: 0px; max-width: 32px;">
                                  </a>
                                </p>
                              </td>
                              <td width="3" style="padding: 0px 0px 1px;"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding: 1px 0px 0px; border-right: 3px solid rgb(51,59,143);"></td>
                  <td valign="middle" style="padding: 0px 1px 0px 46px; vertical-align: middle;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0px 1px 26px 0px; font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 15px; line-height: 16px; white-space: nowrap;">
                          <p style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 15px; line-height: 16px; font-weight: 700; color: rgb(0,0,0); white-space: nowrap; margin: 1px;">
                            <font style="vertical-align: inherit;">
                              <font style="vertical-align: inherit;">${userName}</font>
                            </font>
                          </p>
                          <p style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); margin: 1px;">
                            <font style="vertical-align: inherit;">
                              <font style="vertical-align: inherit;"></font>
                            </font>
                          </p>
                          <!---->
                          <!---->
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0px 1px 0px 0px;">
                          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;">
                            <tr>
                              <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                                <p style="margin: 1px;">
                                  <img src="data:image/png;base64,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" alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;">
                                </p>
                              </td>
                              <td style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,83) !important; padding: 1px 0px; vertical-align: middle;">
                                <p style="margin: 1px;">
                                  <a href="mailto:lverbrugge@sigma-france.fr" target="_blank" style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                    <span style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                      <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">lverbrugge@sigma-france.fr</font>
                                      </font>
                                    </span>
                                  </a>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top" style="padding: 1px 5px 1px 0px; vertical-align: top;">
                                <p style="margin: 1px;">
                                  <img src="data:image/png;base64,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" alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;">
                                </p>
                              </td>
                              <td style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,83) !important; padding: 1px 0px; vertical-align: middle;">
                                <p style="margin: 1px;">
                                  <span style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                    <font style="vertical-align: inherit;">
                                      <font style="vertical-align: inherit;">7 rue des 9 Bonniers </font>
                                    </font>
                                    <br>
                                    <font style="vertical-align: inherit;">
                                      <font style="vertical-align: inherit;">59178 BRILLON </font>
                                    </font>
                                  </span>
                                </p>
                              </td>
                            </tr>
                            <!---->
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!---->
          <!---->
          <!---->
          <tr>
            <td style="padding: 0px 1px 0px 0px;"> &nbsp; </td>
          </tr>
        </table>`;

        customers.push({ userEmail: userEmail, status: signature });
        localStorage.setItem("sigma_data_cache", JSON.stringify(customers));
    }

    return signature
}