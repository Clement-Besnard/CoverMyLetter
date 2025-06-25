import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
      setIsAuthChecking(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Utiliser la nouvelle route d'authentification
      const response = await fetch('http://localhost:3000/api/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la connexion');
      }

      const userData = await response.json();
      
      // Stocker les informations de l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirection vers la page de tableau de bord après une connexion réussie
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Si la vérification d'authentification est en cours, ne rien afficher
  if (isAuthChecking) {
    return null;
  }

  // Si l'utilisateur est authentifié, ne rien afficher (la redirection est déjà lancée)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* En-tête */}
      <header className="py-6 px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">CoverMyLetter</h2>
        </Link>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Connexion à votre compte</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
                  <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Mot de passe oublié ?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Pied de page simplifié */}
      <footer className="py-4 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            © 2023 CoverMyLetter. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;