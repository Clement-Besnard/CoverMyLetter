const User = require('../models/users.model.js');

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Connexion utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Chercher l'utilisateur par email
    const user = await User.findOne({ email });
    
    // Si l'utilisateur n'existe pas ou le mot de passe ne correspond pas
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Créer un objet utilisateur sans le mot de passe pour la réponse
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      freeRequestsCount: user.freeRequestsCount,
      paidRequestsCount: user.paidRequestsCount
    };
    
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    // Vérifier les champs requis
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'Tous les champs requis doivent être remplis (firstName, lastName, email, password)' 
      });
    }

    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer l'utilisateur
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Idéalement, il faudrait hasher le mot de passe ici
      freeRequestsCount: 5,
      paidRequestsCount: 0
    });

    const savedUser = await newUser.save();
    
    // Exclure le mot de passe de la réponse
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    // Si l'email est modifié, vérifier qu'il n'est pas déjà utilisé
    if (req.body.email) {
      const emailExists = await User.findOne({ 
        email: req.body.email, 
        _id: { $ne: req.params.id } 
      });
      
      if (emailExists) {
        return res.status(409).json({ 
          message: 'Cet email est déjà utilisé par un autre utilisateur' 
        });
      }
    }

    // Mettre à jour le champ updatedAt si des champs importants sont modifiés
    if (req.body.firstName || req.body.lastName || req.body.email || req.body.password) {
      req.body.updatedAt = new Date();
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Acheter des crédits
exports.purchaseCredits = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Montant invalide' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    // En production, il faudrait intégrer un système de paiement
    // comme Stripe et vérifier que le paiement a bien été effectué
    
    // Mettre à jour le compteur de crédits
    user.paidRequestsCount = (user.paidRequestsCount || 0) + amount;
    
    // Sauvegarder les modifications
    await user.save();
    
    res.json({
      success: true,
      message: `${amount} crédits ajoutés avec succès`,
      user: {
        _id: user._id, // Utiliser _id au lieu de id pour la cohérence
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        freeRequestsCount: user.freeRequestsCount,
        paidRequestsCount: user.paidRequestsCount
      }
    });z
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};