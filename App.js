const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const { connectToMongoDB } = require('./db/db');
const userRouter = require('./routes/userRouter');

dotenv.config();

// Vérifier les variables d'environnement
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Erreur : Les variables MONGO_URI ou JWT_SECRET ne sont pas définies.');
    process.exit(1);
}

connectToMongoDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/users', userRouter);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
