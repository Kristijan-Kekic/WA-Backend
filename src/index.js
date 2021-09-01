import express from 'express';
import cors from 'cors';
import storage from './memory_storage.js';
import connect from './db.js';
import mongo from 'mongodb'
import auth from './auth.js';

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`slusam na portu ${port}`))

app.post("/users", async (req, res) => {
    let user = req.body;

    let id;
    try {
        id = await auth.registerUser(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

    res.json({ id: id });
});

//unos ocjene
app.post('/ocjene', async(req, res) => {
    let data = req.body;
    delete data._id;

    if (!data.profesor||!data.ocjena||!data.komentar) {
        res.json({
            status: "fail",
            reason: "nešto vam nedostaje u unosu"
        })
        return
    }

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

app.get('/ocjeneavg', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").aggregate(
        [
          {
            $group:
              {
                _id: "$profesor",
                avgOcjena: { $avg: "$ocjena"},
              }
          }
        ]
     )
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjene', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find().sort({profesor:1})
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjene/:id', async(req, res) =>{
    let {id} = req.params
    let db = await connect()
    let ocjena = await db.collection("ocjene").findOne({_id: mongo.ObjectId(id)})
    res.json(ocjena)
})

app.put('/ocjene/:id', async(req, res) => {
    let {id} = req.params
    let {profesor, ocjena, komentar} = req.body
    let ModOcjena = {}
    if(profesor) ModOcjena.profesor = profesor
    if(ocjena) ModOcjena.ocjena = ocjena
    if(komentar) ModOcjena.komentar = komentar
    let db = await connect()
    let result = await db.collection("ocjene").updateOne({_id: mongo.ObjectId(id)}, {$set: ModOcjena})
    res.json(result)
})

app.delete('/ocjene/:id', async(req, res)=> {
    let {id} = req.params
    let db = await connect()
    await db.collection("ocjene").deleteOne({_id: mongo.ObjectId(id)})
    res.json({msg: "Entry deleted"})
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

app.get('/ocjenejedan', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find({ocjena:1})
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjenedva', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find({ocjena:2})
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjenetri', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find({ocjena:3})
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjenecetiri', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find({ocjena:4})
    let results = await cursor.toArray()
    
    res.json(results)
})

app.get('/ocjenepet', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("ocjene").find({ocjena:5})
    let results = await cursor.toArray()
    
    res.json(results)
})

//obsolete ovo ispod
app.post("/ocjene_memory", (req, res) => {
    let novaOcjena = req.body
    console.log(novaOcjena)
});

app.get("/ocjene_memory", (req, res) => {
    res.json(storage.ocjene)
});