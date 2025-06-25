const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users.routes');
const agentsRoutes = require('./routes/agents.routes');
require('dotenv').config();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS pour permettre les requêtes depuis le frontend
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/agents', agentsRoutes);

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'API CoverMyLetter fonctionnelle' });
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});