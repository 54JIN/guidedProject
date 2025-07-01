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

filmsRouter.get('/api/films/:id', async (req, res) => {
    const { id } = req.params

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const films = await collection.find({ id: parseInt( id )}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting films failed! ☹");
    }
});

filmsRouter.get('/api/films/:id/characters', async (req, res) => {
    const { id } = req.params

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_characters');
        const films = await collection.find({ film_id: parseInt( id )}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting films failed! ☹");
    }
});

filmsRouter.get('/api/films/:id/planets', async (req, res) => {
    const { id } = req.params

    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films_planets');
        const films = await collection.find({ film_id: parseInt( id )}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting films failed! ☹");
    }
});


export default filmsRouter;