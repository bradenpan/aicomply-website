// Google Apps Script — paste this into Apps Script (Extensions → Apps Script from your Sheet)
// This receives POST requests from the assessment form and writes to the bound Google Sheet.

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

    // Set up headers on first run
    if (sheet.getLastRow() === 0) {
      const headers = [
        "session_id",
        "timestamp",
        "completed",
        "last_step",
        "company_size",
        "illinois_nexus",
        "recruiting_screening_tools",
        "interview_evaluation_tools",
        "performance_comp_tools",
        "written_notice",
        "written_policy",
        "point_of_contact",
        "concern_level",
        "email",
        "company",
      ];
      sheet.appendRow(headers);
    }

    // Check if this session already has a row (update partial submission)
    const sessionCol = 1; // Column A = session_id
    const lastRow = sheet.getLastRow();
    let existingRow = -1;

    if (lastRow > 1) {
      const sessionIds = sheet.getRange(2, sessionCol, lastRow - 1, 1).getValues();
      for (let i = 0; i < sessionIds.length; i++) {
        if (sessionIds[i][0] === data.session_id) {
          existingRow = i + 2;
          break;
        }
      }
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map((h) => (data[h] !== undefined ? data[h] : ""));

    if (existingRow > 0) {
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
