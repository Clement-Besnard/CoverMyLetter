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
