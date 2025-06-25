import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPlans, setShowPlans] = useState(false); // État pour afficher la carte des forfaits
  const [isPurchasing, setIsPurchasing] = useState(false); // État pour le chargement de l'achat
  const dropdownRef = useRef(null);
  const plansCardRef = useRef(null); // Ref pour la carte des forfaits
  const navigate = useNavigate();
  
  // Récupérer les informations utilisateur depuis le localStorage
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  // Fermer le dropdown et la carte quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (plansCardRef.current && !plansCardRef.current.contains(event.target) && showPlans) {
        setShowPlans(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPlans]);
  
  // Fonction pour acheter des crédits
  const handlePurchaseCredits = async (amount, price) => {
    setIsPurchasing(true);
    
    try {
      // Récupérer l'utilisateur connecté
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Vérification de sécurité pour l'ID utilisateur
      if (!user || !user._id) {
        console.error("ID utilisateur introuvable");
        setIsPurchasing(false);
        alert("Une erreur s'est produite avec votre session utilisateur. Veuillez vous reconnecter.");
        navigate('/login');
        return;
      }
      
      // Appel API pour acheter des crédits - utiliser _id au lieu de id
      const response = await fetch(`http://localhost:3000/api/users/${user._id}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'achat de crédits');
      }
      
      const data = await response.json();
      
      // Mettre à jour l'utilisateur dans le localStorage
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Fermer la carte des forfaits
      setShowPlans(false);
      
      // Rafraîchir la page pour afficher les crédits mis à jour
      window.location.reload();
    } catch (error) {
      console.error('Erreur d\'achat:', error);
      alert("Une erreur s'est produite lors de l'achat des crédits. Veuillez réessayer.");
    } finally {
      setIsPurchasing(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Si la vérification est en cours, ne rien afficher
  if (isLoading) {
    return null;
  }

  // Si l'utilisateur n'est pas authentifié, ne rien afficher (la redirection est déjà lancée)
  if (!isAuthenticated) {
    return null;
  }

  // Si l'utilisateur est authentifié, afficher la page complète
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* En-tête */}
      <header className="py-6 px-8 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">CoverMyLetter</h2>
        </div>
        
        {/* Menu utilisateur à droite */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-8 w-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-2">
              <span className="text-indigo-600 dark:text-indigo-300">{userInfo.firstName?.[0] || 'U'}</span>
            </div>
            <span>{userInfo.firstName || 'Utilisateur'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Menu déroulant */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm leading-5 font-medium text-gray-900 dark:text-white truncate">
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 truncate">
                  {userInfo.email}
                </p>
              </div>
              
              <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span>Crédits gratuits</span>
                  <span className="font-medium">{userInfo.freeRequestsCount || 0}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span>Crédits payants</span>
                  <span className="font-medium">{userInfo.paidRequestsCount || 0}</span>
                </div>
                
                {/* Bouton d'achat de crédits */}
                <button
                  onClick={() => {
                    setShowPlans(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Acheter des crédits
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Se déconnecter
                </div>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col py-12 px-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Carte de bienvenue */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Bonjour, {userInfo.firstName || 'Utilisateur'} 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Que souhaitez-vous faire aujourd'hui ?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/chat"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Créer une lettre de motivation
              </Link>
              <button 
                className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
                onClick={() => navigate('#')} // Page non implémentée
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Mes lettres enregistrées
              </button>
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Lettres créées</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Crédits gratuits</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userInfo.freeRequestsCount || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Crédits payants</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userInfo.paidRequestsCount || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="py-4 px-8 bg-gray-50 dark:bg-gray-800 flex">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 CoverMyLetter. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Modal pour l'achat de crédits */}
      {showPlans && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div 
            ref={plansCardRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 transform transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Choisir un forfait</h3>
              <button 
                onClick={() => setShowPlans(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Forfait Starter */}
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Starter</h4>
                  <div className="mt-2 flex justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">0,99€</span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">10 lettres de motivation</span>
                    </li>
                  </ul>
                  
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => handlePurchaseCredits(10, 0.99)}
                      disabled={isPurchasing}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPurchasing ? 'Traitement...' : 'Acheter maintenant'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Forfait Standard */}
              <div className="bg-white dark:bg-gray-700 rounded-lg border-2 border-indigo-500 dark:border-indigo-400 overflow-hidden shadow-md hover:shadow-lg transition-shadow relative flex flex-col">
                <div className="absolute top-0 right-0">
                  <div className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                    RECOMMANDÉ
                  </div>
                </div>
                
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Standard</h4>
                  <div className="mt-2 flex justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">1,99€</span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">30 lettres de motivation</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Meilleur rapport qualité/prix</span>
                    </li>
                  </ul>
                  
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => handlePurchaseCredits(30, 1.99)}
                      disabled={isPurchasing}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPurchasing ? 'Traitement...' : 'Acheter maintenant'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Forfait Premium */}
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Premium</h4>
                  <div className="mt-2 flex justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">4,99€</span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">100 lettres de motivation</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Idéal pour recherche intensive</span>
                    </li>
                  </ul>
                  
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => handlePurchaseCredits(100, 4.99)}
                      disabled={isPurchasing}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPurchasing ? 'Traitement...' : 'Acheter maintenant'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
              Tous les prix incluent la TVA. Paiement 100% sécurisé.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;