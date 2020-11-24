const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./db.js');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Returns list of all members with the following fields:
 * `name`, `kerb`, `isBoardMember`
 */
app.get('/api/members', (req, res) => {
    let members = [];
    conn.query('SELECT * from Members', (err, results, fields) => {
        if (!err) {
            members = results.map(member => {
                return {kerb: member.Kerberos, name: member.Name, isBoardMember: member.IsBoardMember};
            });
        }
        res.send(JSON.stringify({ members }));
    })
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);