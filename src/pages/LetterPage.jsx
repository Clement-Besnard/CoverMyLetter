import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LetterPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      content: "Bienvenue sur l'assistant de lettre de motivation ! Veuillez télécharger votre CV en PDF et fournir l'URL de l'offre d'emploi pour que je puisse vous aider à créer une lettre personnalisée."
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [isCvUploaded, setIsCvUploaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est authentifié au chargement
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
  
  // Récupérer les informations utilisateur depuis le localStorage
  const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
      setIsCvUploaded(true);
      addMessage('user', `J'ai téléversé mon CV: ${file.name}`);
      
      // Si une URL d'offre d'emploi est déjà présente, suggérer à l'utilisateur de générer la lettre
      if (jobUrl.trim() !== '') {
        addMessage('bot', "Parfait ! Vous avez téléversé votre CV et indiqué l'URL de l'offre d'emploi. Cliquez sur 'Envoyer' pour générer votre lettre de motivation.");
      }
    } else {
      addMessage('bot', "Veuillez téléverser un fichier PDF valide.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const addMessage = (type, content) => {
    const newMessage = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date()  // Ajouter un timestamp réel
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() !== '' || jobUrl.trim() !== '') {
      // Ajouter le message utilisateur
      const userMessage = jobUrl.trim() !== '' 
        ? `Voici l'offre d'emploi: ${jobUrl}`
        : inputMessage;
      
      // Ajouter le message de l'utilisateur
      addMessage('user', userMessage);
      
      // Réinitialiser les champs
      setJobUrl('');
      setInputMessage('');

      // Indiquer que le message est en cours de chargement
      setIsMessageLoading(true);
      
      try {
        // Vérifier si nous avons un CV et une URL d'offre d'emploi
        if (isCvUploaded && (jobUrl.trim() !== '' || userMessage.includes('http'))) {
          // Préparer les données pour l'appel API
          const formData = new FormData();
          formData.append('cv', cvFile);
          
          // Extraire l'URL de l'offre d'emploi du message ou utiliser jobUrl
          const extractedUrl = jobUrl.trim() || userMessage.match(/https?:\/\/[^\s]+/)?.[0] || '';
          formData.append('jobUrl', extractedUrl);
          
          // Récupérer l'utilisateur connecté
          const user = JSON.parse(localStorage.getItem('user'));
          
          // Vérifier si l'utilisateur a encore des crédits
          if (user.freeRequestsCount <= 0 && user.paidRequestsCount <= 0) {
            setIsMessageLoading(false);
            addMessage('bot', "Vous avez épuisé tous vos crédits. Veuillez acheter un forfait pour continuer à générer des lettres de motivation.");
            return;
          }
          
          // Appel à l'API backend
          const response = await fetch('http://localhost:3000/api/agents/generate', {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) {
            throw new Error('Erreur lors de la génération de la lettre de motivation');
          }
          
          const data = await response.json();
          
          // Décrémenter le compteur de crédits
          let updatedUser = {...user};
          if (user.freeRequestsCount > 0) {
            updatedUser.freeRequestsCount -= 1;
          } else if (user.paidRequestsCount > 0) {
            updatedUser.paidRequestsCount -= 1;
          }
          
          // Mettre à jour l'utilisateur dans le localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Mettre à jour l'utilisateur dans la base de données
          await fetch(`http://localhost:3000/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              freeRequestsCount: updatedUser.freeRequestsCount,
              paidRequestsCount: updatedUser.paidRequestsCount
            })
          });
          
          // Afficher la lettre générée
          setIsMessageLoading(false);
          addMessage('bot', data.coverLetter);
        } else {
          // Afficher un message d'erreur si manque d'infos
          setIsMessageLoading(false);
          addMessage('bot', "J'ai besoin de votre CV et de l'URL de l'offre d'emploi pour générer une lettre de motivation personnalisée.");
        }
      } catch (error) {
        console.error(error);
        setIsMessageLoading(false);
        addMessage('bot', "Une erreur s'est produite lors de la génération de la lettre de motivation. Veuillez réessayer.");
      }
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Si la vérification est en cours, on affiche rien
  if (isLoading) {
    return null; // Ne rien afficher pendant la vérification
  }

  // Si l'utilisateur n'est pas authentifié, ne rien afficher (la redirection est déjà lancée)
  if (!isAuthenticated) {
    return null;
  }

  // Si l'utilisateur est authentifié, afficher la page complète
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Panneau latéral - prenant toute la hauteur */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-800 flex flex-col border-r border-gray-300 dark:border-gray-600">
        {/* Logo en haut du panneau latéral */}
        <div className="p-4">
          <Link to="/dashboard" className="flex items-center">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <h2 className="ml-2 text-base font-semibold text-gray-800 dark:text-white">CoverMyLetter</h2>
          </Link>
        </div>
        
        {/* Contenu du panneau latéral - centré verticalement */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
          <div>
            <h3 className="text-base font-semibold mb-3 mt-2 text-gray-800 dark:text-white text-center">Assistant de Lettre de Motivation</h3>
            
            <div className="mb-4 pt-4">
              <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Téléverser votre CV</h4>
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                onClick={triggerFileInput}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="application/pdf"
                  onChange={handleCvUpload}
                />
                <div className="mb-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isCvUploaded 
                    ? <span className="text-green-500">CV téléversé: {cvFile?.name}</span>
                    : "Cliquez ou déposez votre fichier CV (PDF uniquement)"}
                </p>
              </div>
            </div>
            
            <div className="mb-4 pt-4">
              <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Lien de l'offre d'emploi</h4>
              <form onSubmit={handleFormSubmit} className="flex">
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="Coller l'URL de l'offre"
                  className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg"
                >
                  Envoyer
                </button>
              </form>
            </div>
            
            <div className="mb-3 pt-4">
              <h4 className="text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">Conseils</h4>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-1">•</span>
                  Téléversez un CV à jour et complet
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-1">•</span>
                  Fournissez le lien exact de l'offre d'emploi
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-1">•</span>
                  Précisez vos attentes dans le chat
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Zone principale avec chat et header */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        {/* Header de la zone principale */}
        <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Navigation à gauche */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M19 12H5"></path>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Retour
            </Link>
          </div>
          
          {/* Espace central flexible */}
          <div className="flex-1"></div>
          
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
                  <div className="flex justify-between items-center">
                    <span>Crédits payants</span>
                    <span className="font-medium">{userInfo.paidRequestsCount || 0}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11.707 4.707a1 1 0 10-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 101.414 1.414L10 12.414l3.293 3.293a1 1 0 001.414-1.414L11.414 11l3.293-3.293z" clipRule="evenodd" />
                    </svg>
                    Se déconnecter
                  </div>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Chat Messages avec défilement */}
        <div className="flex-1 overflow-y-auto border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 pt-4 pb-3">
            <div className="max-w-3xl mx-auto space-y-3">
              {messages.map((message) => (
                message.type === 'bot' ? (
                  <div key={message.id} className="w-full mb-6">
                    {/* En-tête avec icône et nom */}
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                        <span className="text-white text-sm font-bold">C</span>
                      </div>
                      <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
                        CoverMyLetter
                      </p>
                    </div>
                    
                    {/* Contenu du message */}
                    <div className="prose dark:prose-invert whitespace-pre-line text-sm text-gray-800 dark:text-gray-200 pl-10">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex items-start justify-end mb-3">
                    <div className="bg-indigo-600 text-white py-1.5 px-3 rounded-lg text-sm max-w-[80%] md:max-w-[60%] shadow-sm break-words">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                )
              ))}
              
              {isMessageLoading && (
                <div className="flex items-center space-x-2 text-sm text-gray-500 pl-10">
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-2 w-2 bg-indigo-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-indigo-400 rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
                    <div className="h-2 w-2 bg-indigo-400 rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
                  </div>
                  <span>
                    Assistant est en train d'écrire...
                  </span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Zone de saisie */}
        <div className="p-3 pt-0">
          <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:border-indigo-500 dark:focus-within:border-gray-600 focus-within:shadow-md transition-all">
                <div className="w-full">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Posez une question sur la lettre de motivation..."
                    className="w-full resize-none outline-none text-gray-700 dark:text-gray-200 text-xs placeholder-gray-400 bg-transparent px-3 pt-2 min-h-[30px] max-h-[100px] overflow-auto border-none"
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (inputMessage.trim()) {
                          handleFormSubmit(e);
                        }
                      }
                    }}
                    ref={(el) => {
                      if (el) {
                        el.style.height = 'auto';
                        el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
                      }
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center px-3 py-1">
                  <button 
                    type="button"
                    className="rounded-full w-6 h-6 p-0 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  
                  <div className="flex-grow"></div>
                  
                  <button 
                    type="submit"
                    className={`rounded-full shadow-md w-6 h-6 p-0 flex items-center justify-center transition-colors duration-200 ${
                      inputMessage.trim() 
                        ? 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700' 
                        : 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
                    }`}
                    disabled={!inputMessage.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" 
                      stroke={inputMessage.trim() ? "white" : "currentColor"} 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-1 px-1 text-xs text-gray-400">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 mr-1">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="text-[10px]">Entrée pour envoyer, Maj+Entrée pour nouvelle ligne</span>
              </div>
              <div>
                <span className="text-[10px]">{inputMessage.length} caractères</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LetterPage;