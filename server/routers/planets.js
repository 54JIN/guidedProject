import express from 'express';
import { MongoClient } from 'mongodb';
const planetsRouter = new express.Router()
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';

planetsRouter.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting planets failed! ☹");
    }
});

export default planetsRouter;