Office.onReady();

function checkSignature(event) {
    const userName = Office.context.mailbox.userProfile.displayName;
    const userEmail = Office.context.mailbox.userProfile.emailAddress;

    const signatureHtml = `
            <div>
      <style>
        .sh-src a {
          text-decoration: none !important;
        }
      </style>
    </div>
    <br>
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
                        <img src="./assets/sigma.png" alt="" title="Logo" width="293" height="66" style="display: block; border: 0px; max-width: 293px;">
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
                                <img src="./assets/linkedin.png" alt="" width="32" height="32" style="display: block; border: 0px; max-width: 32px;">
                              </a>
                            </p>
                          </td>
                          <td width="3" style="padding: 0px 0px 1px;"></td>
                          <td width="32" style="font-size: 0px; line-height: 0px; padding: 33px 1px 0px 0px;">
                            <p style="margin: 1px;">
                              <a href="https://www.instagram.com/groupesigma/" target="_blank">
                                <img src="./assets/instagram.png" alt="" width="32" height="32" style="display: block; border: 0px; max-width: 32px;">
                              </a>
                            </p>
                          </td>
                          <td width="3" style="padding: 0px 0px 1px;"></td>
                          <td width="32" style="font-size: 0px; line-height: 0px; padding: 33px 1px 0px 0px;">
                            <p style="margin: 1px;">
                              <a href="https://sigma-france.fr">
                                <img src="./assets/siteWeb.png" alt="" width="32" height="32" style="display: block; border: 0px; max-width: 32px;">
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
                              <img src="./assets/mail.png" alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;">
                            </p>
                          </td>
                          <td style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,83) !important; padding: 1px 0px; vertical-align: middle;">
                            <p style="margin: 1px;">
                              <a href="mailto:${userEmail}" target="_blank" style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                <span style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                  <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">${userEmail}</font>
                                  </font>
                                </span>
                              </a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                            <p style="margin: 1px;">
                              <img src="./assets/phone.png" alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;">
                            </p>
                          </td>
                          <td style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,83) !important; padding: 1px 0px; vertical-align: middle;">
                            <p style="margin: 1px;">
                              <a href="tel:" target="_blank" style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                <span style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                  <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;"></font>
                                  </font>
                                </span>
                              </a>
                            </p>
                          </td>
                          <td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;">
                            <p style="margin: 1px;">
                              <img src="./assets/mobilePhone.png" alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;">
                            </p>
                          </td>
                          <td style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,83) !important; padding: 1px 0px; vertical-align: middle;">
                            <p style="margin: 1px;">
                              <a href="tel:" target="_blank" style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                <span style="font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 13px; line-height: 16px; white-space: nowrap; color: rgb(84,84,84); text-decoration: none !important;">
                                  <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;"></font>
                                  </font>
                                </span>
                              </a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td valign="top" style="padding: 1px 5px 1px 0px; vertical-align: top;">
                            <p style="margin: 1px;">
                              <img src="./assets/map.png" alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;">
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

Office.actions.associate("checkSignature", checkSignature);