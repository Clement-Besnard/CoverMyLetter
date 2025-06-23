import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
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
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-12">
        <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            CV et lettres <span className="text-indigo-600">d'impact</span> en quelques clics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            Maximisez vos chances de décrocher l'emploi de vos rêves avec des CV et lettres de motivation personnalisés générés par notre agent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/create-cv"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Créer mon CV
            </Link>
            <Link 
              to="/chat"
              className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Assistant de lettre
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
                Bonjour ! Pour quel poste souhaitez-vous postuler aujourd'hui ?
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-gray-800 dark:text-gray-300 font-mono">
                <span className="text-blue-600 dark:text-blue-400">Vous &gt; </span> 
                Voici l'offre à laquelle je postule : http://linkedin.com/offer-developpeur-react
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-800 dark:text-gray-300 font-mono">
                <span className="text-green-600 dark:text-green-400">CoverMyLetter &gt; </span> 
                Super ! Je vais vous aider à créer un CV et une lettre de motivation adaptés aux attentes des recruteurs pour ce poste. Commençons par mettre en avant vos compétences en React, CSS et UX/UI...
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Section des fonctionnalités */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Comment ça fonctionne</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Analyse de l'offre</h3>
              <p className="text-gray-600 dark:text-gray-300">Notre IA analyse les offres d'emploi pour identifier les compétences et mots-clés recherchés par les recruteurs.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Personnalisation</h3>
              <p className="text-gray-600 dark:text-gray-300">Nous adaptons votre CV et lettre en fonction de votre expérience et des exigences spécifiques du poste.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 dark:text-indigo-300 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Documents prêts à l'emploi</h3>
              <p className="text-gray-600 dark:text-gray-300">Téléchargez vos documents optimisés et augmentez vos chances de décrocher un entretien.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nouvelle section sur la création de lettres de motivation */}
      <section className="py-12 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Lettres de motivation personnalisées</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Notre agent intelligent crée des lettres de motivation parfaitement adaptées à votre profil et à l'offre visée
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Comment ça marche</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">Importez votre CV ou créez-en un nouveau avec notre assistant</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">Partagez le lien de l'offre d'emploi qui vous intéresse</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">Notre IA analyse l'offre et extrait les compétences essentielles recherchées</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">Elle croise ces informations avec votre CV et génère une lettre parfaitement ciblée</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Lettre de motivation</h3>
                  <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                    Optimisée pour le poste
                  </div>
                </div>
                
                <div className="prose dark:prose-invert">
                  <p className="text-gray-800 dark:text-gray-300">
                    Madame, Monsieur,
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    Je suis très intéressé par l'offre de Développeur React publiée sur LinkedIn. Avec une solide expérience en développement front-end et une passion pour la création d'interfaces utilisateur dynamiques, je suis convaincu de pouvoir contribuer efficacement à votre équipe.
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    Au cours de mes précédentes expériences, j'ai développé des applications web performantes en utilisant React, Redux et d'autres technologies modernes. Mon approche axée sur les résultats et ma capacité à travailler en étroite collaboration avec les équipes de conception et de back-end m'ont permis de livrer des projets de haute qualité dans les délais impartis.
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    Je serais ravi de pouvoir discuter plus en détail de ma candidature lors d'un entretien. Je vous remercie pour votre temps et considération.
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    Cordialement,
                  </p>
                  <p className="text-gray-800 dark:text-gray-300 font-semibold">
                    [Votre Nom]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Témoignages de candidats</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Marie L.</h4>
                  <p className="text-gray-500 dark:text-gray-400">Designer UX/UI</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"Après 3 mois de recherche sans succès, j'ai utilisé CoverMyLetter pour adapter mon CV. J'ai décroché 4 entretiens en 2 semaines et une offre d'emploi !"</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Thomas B.</h4>
                  <p className="text-gray-500 dark:text-gray-400">Ingénieur logiciel</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"L'assistant m'a permis d'identifier les compétences clés à mettre en avant. Ma lettre de motivation était parfaitement ciblée et j'ai été convoqué à un entretien dès le lendemain."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="py-6 px-8 bg-white dark:bg-gray-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2023 CoverMyLetter. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Confidentialité
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Conditions
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;