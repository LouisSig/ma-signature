Office.actions.associate("checkSignature", checkSignature);

function checkSignature(event) {
  try {
    var item = Office.context.mailbox.item;
    var email = Office.context.mailbox.userProfile.emailAddress;

    // 1) Cache rapide (optionnel mais conseillé)
    getCache("sig_html_v1", function (cached) {
      if (cached) {
        // insert direct cache → ultra fiable
        insertSignature(item, cached, function () {
          safeComplete(event);
        });
        return;
      }

      // 2) Sinon appel API (mais compatible Classic) avec timeout court
      getSignatureFromApi(email, 800, function (err, sigHtml) {
        if (!err && sigHtml) {
          setCache("sig_html_v1", sigHtml, function () {
            insertSignature(item, sigHtml, function () {
              safeComplete(event);
            });
          });
          return;
        }

        // 3) Fallback : ne rien faire (ou une signature fixe de debug)
        var debug = "<div><b>OK parfait (fallback)</b></div>";
        insertSignature(item, debug, function(){ safeComplete(event); });
        
        safeComplete(event);
      });
    });
  } catch (e) {
    safeComplete(event);
  }
}

function insertSignature(item, html, done) {
  try {
    if (item && item.body && item.body.setSignatureAsync) {
      item.body.setSignatureAsync(html, { coercionType: Office.CoercionType.Html }, function () {
        done();
      });
      return;
    }

    if (item && item.body && item.body.setSelectedDataAsync) {
      item.body.setSelectedDataAsync(html, { coercionType: Office.CoercionType.Html }, function () {
        done();
      });
      return;
    }

    done();
  } catch (e) {
    done();
  }
}

function getSignatureFromApi(email, timeoutMs, cb) {
  // ⚠️ localhost : OK pour Classic (PC), mais sur Outlook Web ça pointe vers la machine de l’utilisateur
  // donc ça ne marchera que si ton API tourne chez chaque poste. Sinon il faut une URL serveur.
  var url = "https://localhost:44393/Profile/GetSignatureInAddOutlook";

  try {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.timeout = timeoutMs;

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var data = JSON.parse(xhr.responseText);
          // adapte ici selon ton JSON
          // si ton API renvoie directement le HTML, remplace par: var sig = data;
          var sig = data && (data.signatureHtml || data.html || data.status || data);
          cb(null, sig);
        } catch (e) {
          cb(e, null);
        }
      } else {
        cb(new Error("HTTP " + xhr.status), null);
      }
    };

    xhr.ontimeout = function () {
      cb(new Error("timeout"), null);
    };

    xhr.onerror = function () {
      cb(new Error("network"), null);
    };

    xhr.send("emailUser=" + encodeURIComponent(email));
  } catch (e) {
    cb(e, null);
  }
}

/** Storage compatible event runtime : OfficeRuntime.storage si dispo, sinon localStorage */
function getCache(key, cb) {
  try {
    if (typeof OfficeRuntime !== "undefined" && OfficeRuntime.storage && OfficeRuntime.storage.getItem) {
      OfficeRuntime.storage.getItem(key).then(function (v) { cb(v || ""); }).catch(function () { cb(""); });
      return;
    }
  } catch (e) {}
  try {
    cb((localStorage && localStorage.getItem(key)) || "");
  } catch (e2) {
    cb("");
  }
}

function setCache(key, val, cb) {
  cb = cb || function () {};
  try {
    if (typeof OfficeRuntime !== "undefined" && OfficeRuntime.storage && OfficeRuntime.storage.setItem) {
      OfficeRuntime.storage.setItem(key, val).then(function () { cb(); }).catch(function () { cb(); });
      return;
    }
  } catch (e) {}
  try {
    if (localStorage) localStorage.setItem(key, val);
  } catch (e2) {}
  cb();
}

function safeComplete(event) {
  try { event.completed(); } catch (e) {}
}
