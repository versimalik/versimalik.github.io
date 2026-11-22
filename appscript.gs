/**
 * Apps Script: backend blog pribadi
 * - Survei ebook Stop Belajar Bahasa Pemrograman (sheet "Survei Ebook Geno")
 * - Traffic halaman (sheet "Traffic")
 *
 * Routing:
 *   payload dengan type = "traffic"  -> sheet Traffic
 *   payload lain (tanpa type)        -> sheet survei (perilaku lama)
 *
 * Setup:
 * 1. Tempel file ini ke Extensions > Apps Script.
 * 2. Jalankan setup() sekali untuk membuat sheet dan header.
 * 3. Deploy > Manage deployments > Edit > Version: New version > Deploy.
 *    (URL web app tetap sama)
 */

var SPREADSHEET_ID = '1gJVpxjY0j1mVn62IzozAcXYoc4jSbqNoJSjdTS5h_nc';
var SURVEY_SHEET_NAME = 'Survei Ebook Geno';
var TRAFFIC_SHEET_NAME = 'Traffic';
var TIMEZONE = 'Asia/Jakarta';

var SURVEY_HEADERS = [
  'Timestamp', 'Token', 'q1', 'q2', 'q2_detail', 'q3', 'q3_detail', 'q4', 'q5', 'q6'
];

var TRAFFIC_HEADERS = [
  'Waktu', 'Kota', 'Region', 'Negara', 'Browser', 'OS',
  'Device', 'Halaman', 'Referrer', 'Bot'
];

var MAX_TEXT_LENGTH = 500;
var ALLOWED_DEVICES = { mobile: true, tablet: true, desktop: true };

/* ---------- Entry point ---------- */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var raw = e && e.postData && typeof e.postData.contents === 'string'
      ? e.postData.contents
      : '';
    var data = raw ? JSON.parse(raw) : {};

    lock.waitLock(10000);

    if (data.type === 'traffic') {
      saveTraffic_(data);
    } else {
      saveSurvey_(data);
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/* ---------- Survei ---------- */

function saveSurvey_(data) {
  var sheet = getSheet_(SURVEY_SHEET_NAME);
  sheet.appendRow([
    new Date(),
    clean_(data.token),
    clean_(data.q1),
    clean_(data.q2),
    clean_(data.q2_detail),
    clean_(data.q3),
    clean_(data.q3_detail),
    clean_(data.q4),
    clean_(data.q5),
    clean_(data.q6)
  ]);
}

/* ---------- Traffic ---------- */

function saveTraffic_(data) {
  var device = String(data.device || '');
  if (!ALLOWED_DEVICES[device]) device = '';

  var sheet = getSheet_(TRAFFIC_SHEET_NAME);
  sheet.appendRow([
    Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
    clean_(data.city),
    clean_(data.region),
    clean_(data.country),
    clean_(data.browser),
    clean_(data.os),
    device,
    clean_(data.path),
    clean_(data.referrer),
    data.is_bot ? 'Ya' : 'Tidak'
  ]);
}

/* ---------- Setup ---------- */

function setup() {
  ensureHeader_(getSheet_(SURVEY_SHEET_NAME), SURVEY_HEADERS, 'timestamp');
  var traffic = getSheet_(TRAFFIC_SHEET_NAME);
  ensureHeader_(traffic, TRAFFIC_HEADERS, 'waktu');
  traffic.setFrozenRows(1);
}

/* ---------- Helpers ---------- */

function getSheet_(name) {
  var spread = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = spread.getSheetByName(name);
  if (!sheet) {
    sheet = spread.insertSheet(name);
  }
  return sheet;
}

function ensureHeader_(sheet, headers, firstHeaderLower) {
  var firstCell = sheet.getRange(1, 1, 1, 1).getValue();
  if (String(firstCell).trim().toLowerCase() !== firstHeaderLower) {
    sheet.insertRowBefore(1);
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

// Hanya string/number, batasi panjang, cegah formula injection.
function clean_(val) {
  if (typeof val === 'number') return val;
  if (typeof val !== 'string') return '';
  var s = val.length > MAX_TEXT_LENGTH ? val.substring(0, MAX_TEXT_LENGTH) : val;
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function testTraffic() {
  saveTraffic_({
    city: 'Tangerang',
    region: 'Banten',
    country: 'Indonesia',
    browser: 'Chrome',
    os: 'Windows',
    device: 'desktop',
    path: '/test',
    referrer: '(direct)',
    is_bot: false
  });
}

function doGet() {
  return json_({ ok: true, version: 'traffic-v2' });
}