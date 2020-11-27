const express = require('express');
const bodyParser = require('body-parser');
const createConnection = require('./db.js');
const app = express();
app.use(bodyParser.json());


/**
 * Add general/board member to the database
 * 
 * @body Kerberos
 * @body Name
 * @body IsBoardMember
 * 
 * If IsBoardMember == 1, then `Position` and `Department` are required as well
 */
app.post('/api/members', (req, res) => {
    if (req.body.IsBoardMember && (!req.body.Position || !req.body.Department)) {
        res.status(400).send('Position and department are required for board members');
        return
    }

    const conn = createConnection();
    conn.query('INSERT INTO Members SET ?', req.body, (err, result) => {
        if (err) {
            console.log(`failed to add member: ${err}`);
            res.status(400).send(err.sqlMessage);
        } else {
            res.status(201).send(result);
        }
    });
    conn.end();
});


/**
 * Add event to the database
 * Required fields in request body: Name, Password, EventType
 */
app.post('/api/events', (req, res) => {
    const conn = createConnection();
    conn.query("INSERT INTO Events SET ?", req.body, (err, result) => {
        if (err) {
            console.log(`failed to create event: ${err}`);
            res.status(400).send(err.sqlMessage);
        } else {
            res.status(201).send(result);
        }
    });
    conn.end();
});

/**
 * Returns list of all members with the following fields:
 * `name`, `kerb`, `isBoardMember`
 */
app.get('/api/members', (req, res) => {
    let members = [];
    const conn = createConnection();
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