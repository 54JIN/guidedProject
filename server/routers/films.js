import express from 'express';
import { MongoClient } from 'mongodb';
const filmsRouter = new express.Router()
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';

filmsRouter.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting films failed! ☹");
    }
});

//"/api/films/:id"


//"/api/films/:id/characters"



//"/api/films/:id/planets"



export default filmsRouter;