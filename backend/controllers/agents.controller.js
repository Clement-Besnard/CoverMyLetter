const fs = require('fs').promises;
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const { Readable } = require('stream');
const multer = require('multer');

// Configuration du stockage des fichiers
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite à 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers PDF sont acceptés'), false);
    }
  }
});

// Clé API Langflow
const API_KEY = 'sk-uvq-XukOwdXL62gNFpUS5MITWrNuhzpbDACqEs__s7c';
const LANGFLOW_BASE_URL = 'http://localhost:7860';

// Middleware pour gérer l'upload de fichier
exports.uploadMiddleware = upload.single('cv');

// Fonction pour générer une lettre de motivation
exports.generateCoverLetter = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Veuillez fournir un CV au format PDF' });
    }

    if (!req.body.jobUrl) {
      return res.status(400).json({ message: 'Veuillez fournir l\'URL de l\'offre d\'emploi' });
    }
    
    // Vérifier si l'utilisateur a un ID dans la requête
    if (!req.body.userId) {
      return res.status(400).json({ message: 'ID utilisateur manquant' });
    }
    
    // Récupérer l'utilisateur depuis la base de données
    const User = require('../models/users.model');
    const user = await User.findById(req.body.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Vérifier si l'utilisateur a des crédits
    if (user.freeRequestsCount <= 0 && user.paidRequestsCount <= 0) {
      return res.status(403).json({ 
        message: 'Crédits insuffisants',
        insufficientCredits: true
      });
    }

    // 1. Créer un FormData pour uploader le fichier
    const formData = new FormData();
    const blob = Buffer.from(req.file.buffer);
    
    // Créer un stream lisible à partir du buffer
    const stream = new Readable();
    stream.push(blob);
    stream.push(null);
    
    formData.append('file', stream, {
      filename: req.file.originalname,
      contentType: 'application/pdf',
    });

    // 2. Upload du fichier à Langflow
    const uploadResponse = await axios.post(`${LANGFLOW_BASE_URL}/api/v2/files/`, formData, {
      headers: {
        ...formData.getHeaders(),
        'x-api-key': API_KEY
      }
    });

    const uploadedPath = uploadResponse.data.path;

    // 3. Appel à l'endpoint de génération avec le chemin du fichier
    const payload = {
      input_value: req.body.jobUrl,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        'File-KmrxQ': {
          path: uploadedPath
        }
      }
    };

    const runResponse = await axios.post(`${LANGFLOW_BASE_URL}/api/v1/run/covermyletter`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    });

    // 4. Extraire le message généré
    const coverLetter = runResponse.data.outputs?.[0]?.outputs?.[0]?.results?.message?.data?.text;
    
    if (!coverLetter) {
      return res.status(500).json({ message: 'Échec de la génération de la lettre de motivation' });
    }

    // 5. Décrémenter les crédits de l'utilisateur
    if (user.freeRequestsCount > 0) {
      user.freeRequestsCount -= 1;
    } else if (user.paidRequestsCount > 0) {
      user.paidRequestsCount -= 1;
    }
    
    // 6. Sauvegarder l'utilisateur
    await user.save();

    // 7. Renvoyer la lettre et l'utilisateur mis à jour
    res.json({ 
      coverLetter,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        freeRequestsCount: user.freeRequestsCount,
        paidRequestsCount: user.paidRequestsCount
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération de la lettre:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la génération de la lettre de motivation',
      error: error.message 
    });
  }
};