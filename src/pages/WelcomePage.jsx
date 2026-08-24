import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const WelcomePage = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté au chargement de la page
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user) {
        // Rediriger vers la page de tableau de bord si l'utilisateur est connecté
        // Important: Mettre navigate avant setIsAuthenticated
        navigate('/dashboard');
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  // Si la vérification est en cours, ne rien afficher
  if (isLoading) {
    return null;
  }

  // Si l'utilisateur est authentifié, retourner null (la redirection est déjà lancée)
  if (isAuthenticated) {
    return null;
  }

  // Si l'utilisateur n'est pas authentifié, afficher la page d'accueil
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* En-tête */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">CoverMyLetter</h2>
        </div>
        <LanguageToggle />
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-12">
        <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t('welcome.heroLine1')} <span className="text-indigo-600">{t('welcome.heroLine2')}</span> {t('welcome.heroLine3')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            {t('welcome.heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/register"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t('common.register')}
            </Link>
            <Link 
              to="/login"
              className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              {t('common.login')}
            </Link>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
            <div className="flex items-center mb-4 space-x-2">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-gray-800 dark:text-gray-300 font-mono">
                <span className="text-green-600 dark:text-green-400">CoverMyLetter &gt; </span> 
                {t('welcome.demoBotGreeting')}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-gray-800 dark:text-gray-300 font-mono">
                <span className="text-blue-600 dark:text-blue-400">{t('welcome.demoUser')} &gt; </span> 
                {t('welcome.demoUserMessage')}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-800 dark:text-gray-300 font-mono">
                <span className="text-green-600 dark:text-green-400">CoverMyLetter &gt; </span> 
                {t('welcome.demoBotReply')}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Section des fonctionnalités */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('welcome.howItWorksTitle')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t('welcome.feature1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('welcome.feature1Text')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t('welcome.feature2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('welcome.feature2Text')}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t('welcome.feature3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('welcome.feature3Text')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section sur la création de lettres de motivation */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">{t('welcome.pitchTitle')}</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t('welcome.pitchText')}
          </p>
          
          <div className="flex justify-center items-center">
            <div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{t('welcome.stepsTitle')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">{t('welcome.step1')}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">{t('welcome.step2')}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">{t('welcome.step3')}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">{t('welcome.step4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section des tarifs */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">{t('plans.sectionTitle')}</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t('plans.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Premier forfait */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">{t('plans.starter')}</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">0,99€</span>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">{t('plans.starterTagline')}</p>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 mb-auto">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.letters10')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.exportable')}</span>
                  </li>
                </ul>
                
                <button className="mt-8 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors">
                  {t('plans.choose')}
                </button>
              </div>
            </div>
            
            {/* Deuxième forfait - Recommandé */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col relative ring-2 ring-indigo-500 dark:ring-indigo-400">
              <div className="absolute top-0 right-0">
                <div className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  {t('plans.recommended')}
                </div>
              </div>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">{t('plans.standard')}</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">1,99€</span>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">{t('plans.mostPopular')}</p>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 mb-auto">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300"><strong>{t('plans.letters30')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.exportable')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.advanced')}</span>
                  </li>
                </ul>
                
                <button className="mt-8 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors">
                  {t('plans.choose')}
                </button>
              </div>
            </div>
            
            {/* Troisième forfait */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">{t('plans.premium')}</h3>
                <div className="mt-4 flex justify-center">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">4,99€</span>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">{t('plans.premiumTagline')}</p>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 mb-auto">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300"><strong>{t('plans.letters100')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.exportable')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.advanced')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t('plans.keywords')}</span>
                  </li>
                </ul>
                
                <button className="mt-8 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors">
                  {t('plans.choose')}
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            {t('plans.vatShort')}
          </p>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('welcome.testimonialsTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img 
                  src="/Ewen-Segui.jpg" 
                  alt="Ewen Segui" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Thomas Ferret</h4>
                  <p className="text-gray-500 dark:text-gray-400">{t('welcome.testimonial1Role')}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('welcome.testimonial1')}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img 
                  src="/Ibrahima-Sall.jpg" 
                  alt="Ibrahima-Sall" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Ibrahima Sall</h4>
                  <p className="text-gray-500 dark:text-gray-400">{t('welcome.testimonial2Role')}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{t('welcome.testimonial2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="py-6 px-8 bg-gray-50 shadow-inner dark:bg-gray-900 flex pt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {t('common.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;