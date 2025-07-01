import express, { json } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json())


app.get('/socks', async (req, res) => {
    try {
        
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});