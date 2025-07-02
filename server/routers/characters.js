import express from 'express';
import { MongoClient } from 'mongodb';
const charactersRouter = new express.Router()
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';

charactersRouter.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting characters failed! ☹");
    }
});

charactersRouter.get('/api/characters/:id', async (req, res) => {
    const characterId = req.params.id;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const character = await collection.findOne({ id: parseInt(characterId) });
        if (!character) {
            return res.status(404).send("Character not found!");
        }
        res.json(character);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting character failed! ☹");
    }
});


charactersRouter.get('/api/characters/:id/films', async (req, res) => {
    const characterId = req.params.id;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_characters');
        const character = await collection.find({ character_id: parseInt(characterId) }).toArray();
        if (!character) {
            return res.status(404).send("Character not found!");
        }
        res.json(character);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting character failed! ☹");
    }
});

export default charactersRouter;