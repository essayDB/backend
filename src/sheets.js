const { google } = require("googleapis");
const {
  SPREADSHEET_SHEET_ID,
  SPREADSHEET_RANGE,
  SPREADSHEET_FILE
} = require("../config.js");
const { write } = require("./shared");

const OPTIONS = {
  valueRenderOption: "UNFORMATTED_VALUE",
  spreadsheetId: SPREADSHEET_SHEET_ID,
  range: SPREADSHEET_RANGE
};

function fetchEssaysDetails(auth) {
  const sheets = google.sheets({
    version: "v4",
    auth
  });
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(OPTIONS, (err, res) => {
      if (err) reject(err);
      else {
        const rows = res.data.values;
        if (rows && rows.length) {
          const data = JSON.stringify(convertObj(rows));
          write(SPREADSHEET_FILE, data)
            .then(msg => {
              console.log(`sheets: ${rows.length} rows downloaded`);
              return resolve(msg);
            })
            .catch(err => reject(err));
        } else {
          reject(Error("no data found."));
        }
      }
    });
  });
}

function convertObj(rows) {
  let headers;
  const results = [];
  rows.forEach((row, idx) => {
    if (idx === 0) {
      headers = row;
    } else {
      const obj = {};
      row.forEach((cell, idx) => {
        obj[headers[idx]] = cell;
      });
      results.push(obj);
    }
  });
  return results;
}

module.exports = fetchEssaysDetails;
