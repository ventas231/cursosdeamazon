/**
 * Recibe los formularios de cursosdeamazon (gerardovilla.mx) y los guarda en
 * los mismos Google Sheets de siempre. Reemplaza al servidor anterior.
 *
 * Instalación (una vez, con la cuenta de Google dueña de los Sheets):
 * 1. script.google.com → Nuevo proyecto → pegar este archivo.
 * 2. Implementar → Nueva implementación → Tipo: Aplicación web.
 *    Ejecutar como: Yo. Quién tiene acceso: Cualquier usuario.
 * 3. Copiar la URL que termina en /exec y ponerla en src/lib/sheets-config.ts.
 */
const SPREADSHEET_ID = "1BwhJE_7gP8-SGdnKdCFcbkWktZLJeZuiY6gb3ToiiZw";
const PURCHASES_SPREADSHEET_ID = "15ANLgzt_hOLhb3g8scOTg5DssgdO_NI_hwwoxnx7ezQ";
const CHECKOUT_MARK = "✓";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doPost(e) {
  let result;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "subscribe") result = subscribe(body);
    else if (body.action === "checkout") result = checkout(body);
    else if (body.action === "purchase") result = purchase(body);
    else result = { ok: false, error: "unknown_action" };
  } catch (err) {
    console.error(err);
    result = { ok: false, error: "request_failed" };
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

// La pestaña se ha renombrado antes ("Hoja 1" -> "PAGINA "); se busca por nombre.
function getSheet(spreadsheetId) {
  const sheets = SpreadsheetApp.openById(spreadsheetId).getSheets();
  return (
    sheets.find((s) => s.getName().trim().toUpperCase() === "PAGINA") ||
    sheets.find((s) => s.getName().trim().toUpperCase() === "HOJA 1") ||
    sheets[0]
  );
}

function clean(value) {
  return String(value || "").trim().slice(0, 255);
}

function normalizePhone(value) {
  value = String(value || "");
  return value.indexOf("@") !== -1 ? value.trim().toLowerCase() : value.replace(/\D/g, "");
}

function subscribe(body) {
  const whatsapp = clean(body.whatsapp);
  if (!EMAIL_RE.test(whatsapp)) return { ok: false, error: "invalid" };
  getSheet(SPREADSHEET_ID).appendRow([whatsapp, new Date().toISOString()]);
  return { ok: true };
}

function checkout(body) {
  const target = normalizePhone(clean(body.whatsapp));
  if (!target) return { ok: false, error: "phone_not_found" };
  const sheet = getSheet(SPREADSHEET_ID);
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows[0] || [];
  const col = headers.findIndex((h) => String(h).trim().toUpperCase().replace(/\s+/g, " ") === "CHECK OUT");
  if (col === -1) return { ok: false, error: "checkout_column_not_found" };
  let rowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (normalizePhone(rows[i][0]) === target) rowIndex = i;
  }
  if (rowIndex === -1) return { ok: false, error: "phone_not_found" };
  sheet.getRange(rowIndex + 1, col + 1).setValue(CHECKOUT_MARK);
  return { ok: true, row: rowIndex + 1 };
}

function purchase(body) {
  const email = clean(body.email);
  if (!EMAIL_RE.test(email)) return { ok: false, error: "invalid" };
  const amount = clean(body.amount || "797 USD").slice(0, 50);
  getSheet(PURCHASES_SPREADSHEET_ID).appendRow([email, new Date().toISOString(), amount]);
  return { ok: true };
}
