// ===================================================================
// GOOGLE APPS SCRIPT - JEJAK OBSERVASI SURAKARTA
// Kode ini ditempel di Google Spreadsheet -> Ekstensi -> Apps Script
// ===================================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Inisialisasi Header Otomatis jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Nama Siswa",
        "Kelas",
        "Objek Observasi",
        "Skor Kuis Fakta",
        "Skor Kuis Kaidah",
        "Progres Total",
        "Fakta Temuan Observasi",
        "Pernyataan Umum (Ciri)",
        "Deskripsi Bagian",
        "Deskripsi Manfaat"
      ]);
      
      // Beri warna latar pada baris header (Cokelat Sogan / Biru)
      sheet.getRange(1, 1, 1, 11).setBackground("#2A4D6E").setFontColor("#FFFFFF").setFontWeight("bold");
    }

    var contents = JSON.parse(e.postData.contents);
    var fields = contents.fields || {};

    sheet.appendRow([
      contents.timestamp || new Date().toLocaleString("id-ID"),
      contents.studentName || "-",
      contents.studentClass || "-",
      contents.locationName || "-",
      contents.quizScore !== undefined ? contents.quizScore : 0,
      contents.kaidahScore !== undefined ? contents.kaidahScore : 0,
      (contents.progressPercent || 0) + "%",
      fields.faktaTemuan || "-",
      fields.ciriUmum || "-",
      fields.bagianObjek || "-",
      fields.manfaat || "-"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
