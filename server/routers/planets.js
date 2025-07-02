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

planetsRouter.get('/api/planets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planets = await collection.findOne({ id: parseInt(id)});
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting planets failed! ☹");
    }
});

planetsRouter.get('/api/planets/:id/characters', async (req, res) => {
    const { id } = req.params; 
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const characters = await db.collection('characters').find({ homeworld: parseInt(id) }).toArray();
        res.json(characters); 
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting characters failed! ☹️");
    }
});

planetsRouter.get('/api/planets/:id/films', async (req, res) => {
    const { id } = req.params; 
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const characters = await db.collection('films_planets').find({ planet_id: parseInt(id) }).toArray();
        res.json(characters); 
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting characters failed! ☹️");
    }
});

export default planetsRouter;