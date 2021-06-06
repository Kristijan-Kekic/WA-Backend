import express from 'express';
import cors from 'cors';
import storage from './memory_storage';
import connect from './db.js';

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`slusam na portu ${port}`))

app.get('/ocjene', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find()
    let results = await cursor.toArray()
    
    res.json(results)
})

app.post("/ocjene_memory", (req, res) => {
    let novaOcjena = req.body
    console.log(novaOcjena)
});

app.get("/ocjene_memory", (req, res) => {
    res.json(storage.ocjene)
});