const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./places.sqlite", err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connexion réussie à la base de données 'apptest.db'");
});

let sql_create = `CREATE TABLE IF NOT EXISTS "place" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL
);`;
db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Criou tabela Places");
});

sql_create = `CREATE TABLE IF NOT EXISTS "dish" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"	TEXT NOT NULL,
    "price"	REAL,
	"description"	TEXT,
	"placeId"	INTEGER
);`;
db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Criou tabela Dish");
});

app.get("/api/places", (req, res) => {
    const sql = "SELECT *, (SELECT COUNT(id) FROM dish WHERE placeId = place.id) AS dishes_count FROM place ORDER BY id";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.send({ places: rows });
    });
});

app.post("/api/places", (req, res) => {
    const sql = "INSERT INTO place (name) VALUES (?)";

    db.run(sql, [req.body.name], err => {
        if (err) {
            return res.send(err.message);
        }
        res.send({ ok: 'Lugar criado com sucesso!' });
    });
});

app.get("/api/places/:id/dishes", (req, res) => {
    const sql = "SELECT * FROM dish WHERE placeId = ? ORDER BY id";
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.send({ dishes: rows });
    });
});

app.post("/api/places/:id/dishes", (req, res) => {
    const sql = "INSERT INTO dish (name, description, price, placeId) VALUES (?, ?, ?, ?)";
    let price = req.body.price.toUpperCase().trim().replace('R$', '');
    db.run(sql, [req.body.name, req.body.description.substring(0, 199), price, req.params.id], err => {
        if (err) {
            return res.send(err.message);
        }
        res.send({ ok: 'Prato criado com sucesso!' });
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));