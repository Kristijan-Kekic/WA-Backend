import express from 'express';
import cors from 'cors';
import data from './data';

const app = express()
const port = 3000

app.listen(port, () => console.log(`slusam na portu ${port}`))

//korisnici

app.get('/korisnici', (req, res) => res.send(data.korisnici))
app.get('/korisnici/:username', (req, res) => {
    let username  = req.params.username
    res.json(data.korisnici.filter((x) => x.username == username));
});

//profesori

app.get('/profesori', (req, res) => res.send(data.profesori))
app.get('/profesori/:prof_id', (req, res) => {
    let prof_id  = req.params.prof_id
    res.json(data.profesori.filter((x) => x.prof_id == prof_id));
});

//ocjene

app.get('/ocjene', (req, res) => res.send(data.ocjene))
app.get('/ocjene/:ocjena_id', (req, res) => {
    let ocjena_id  = req.params.ocjena_id
    res.json(data.ocjene.filter((x) => x.ocjena_id == ocjena_id));
});

//komentari

app.get('/komentari', (req, res) => res.send(data.komentari))
app.get('/komentari/:ocjena_id', (req, res) => {
    let ocjena_id  = req.params.ocjena_id
    res.json(data.komentari.filter((x) => x.ocjena_id == ocjena_id));
});