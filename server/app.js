import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json())

app.get('/api/planets', async (req, res) => {
    try {
        res.json({ planets: [
            { name: "Mercury", distanceFromSun: 57.91 },
            { name: "Venus", distanceFromSun: 108.2 },
            { name: "Earth", distanceFromSun: 149.6 },
            { name: "Mars", distanceFromSun: 227.9 },
            { name: "Jupiter", distanceFromSun: 778.3 },
            { name: "Saturn", distanceFromSun: 1427 },
            { name: "Uranus", distanceFromSun: 2871 },
            { name: "Neptune", distanceFromSun: 4497.1 }
        ]});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting planets failed! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});