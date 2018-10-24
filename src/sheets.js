const {
    DETAILS_SHEETID,
    DETAILS_RANGE
} = require('./secrets.json');

function getEssaysDetails(auth) {
    const sheets = google.sheets({
        version: 'v4',
        auth
    });
    sheets.spreadsheets.values.get({
        spreadsheetId: DETAILS_SHEETID,
        range: DETAILS_RANGE,
    }, (err, res) => {
        if (err) return console.error('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            return combineResults(rows);
        } else {
            console.log('No data found.');
        }
    });
}

function combineResults(details) {
    // combine rows and files in essays path to form JSON files
}

module.exports = {
    getEssaysDetails
}