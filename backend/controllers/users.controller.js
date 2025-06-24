const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');

// Lire et écrire le fichier JSON
const readUsers = () => JSON.parse(fs.readFileSync(usersFile));
const writeUsers = (data) => fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));

exports.getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

exports.getUserById = (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json(user);
};

exports.createUser = (req, res) => {
  const users = readUsers();
  
  // Vérifier que les champs requis sont présents
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs requis doivent être remplis (firstName, lastName, email, password)' });
  }
  
  // Vérifier si l'email est déjà utilisé
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ message: 'Cet email est déjà utilisé' });
  }

  const newUser = { 
    id: Date.now(), 
    firstName,
    lastName,
    email,
    password,
    freeRequestsCount: 5,
    paidRequestsCount: 0,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeUsers(users);
  
  // Ne pas renvoyer le mot de passe dans la réponse
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
};

exports.updateUser = (req, res) => {
  let users = readUsers();
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  
  // Récupérer l'utilisateur actuel
  const currentUser = users[index];
  
  // Si l'email est modifié, vérifier qu'il n'est pas déjà utilisé par un autre utilisateur
  if (req.body.email && req.body.email !== currentUser.email) {
    const emailExists = users.some(u => u.id !== userId && u.email === req.body.email);
    if (emailExists) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre utilisateur' });
    }
  }
  
  // Mettre à jour l'utilisateur en préservant la structure
  users[index] = { 
    ...currentUser,
    ...req.body,
    // S'assurer que l'ID reste le même et ne peut pas être modifié
    id: currentUser.id
  };
  
  // Si une mise à jour importante est effectuée, mettre à jour le timestamp
  if (req.body.firstName || req.body.lastName || req.body.email || req.body.password) {
    users[index].updatedAt = new Date().toISOString();
  }
  
  writeUsers(users);
  
  // Ne pas renvoyer le mot de passe dans la réponse
  const { password: _, ...userWithoutPassword } = users[index];
  res.json(userWithoutPassword);
};

exports.deleteUser = (req, res) => {
  let users = readUsers();
  const updated = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length === updated.length) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  writeUsers(updated);
  res.status(204).send();
};
