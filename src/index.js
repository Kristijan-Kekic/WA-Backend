import express from 'express';
import cors from 'cors';
import storage from './memory_storage';

const app = express()
const port = 3000

app.use(cors())

app.listen(port, () => console.log(`slusam na portu ${port}`))

console.log(storage)

app.get("/ocjene", (req, res) => {
    res.json(storage.ocjene)
});