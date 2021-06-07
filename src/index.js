import express from 'express';
import cors from 'cors';
import storage from './memory_storage.js';
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

app.post('/ocjene', async(req, res) => {
    let data = req.body;
    delete data._id;

    let db = await connect();
    let result = await db.collection("ocjene").insertOne(data);
    
    if (result && result.insertedCount == 1) {
        res.json(result.ops[0]);
    }
    else {
        res.json({
            status: "fail",
        })
    }
})

app.get('/ocjenemin', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find().sort({ocjena:1})
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjenemax', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find().sort({ocjena:-1})
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