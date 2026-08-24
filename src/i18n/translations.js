// Dictionnaires FR / EN. Clés plates, préfixées par zone.
// Les variables d'interpolation s'écrivent {nom} et sont passées en 2e argument
// de t() : t('letter.uploaded', { url }).

export const translations = {
  fr: {
    'letter.jobPostingIs': 'Voici l\'offre d\'emploi : {url}',
    'letter.charCount': '{count} caractères',
    'letter.requestError': 'Une erreur s\'est produite lors du traitement de votre demande. Veuillez réessayer.',
    'letter.cvUploadedMessage': 'J\'ai téléversé mon CV : {name}',
    'plans.purchaseSuccess': 'Félicitations ! Vous avez acheté {amount} crédits pour {price} €. Vos crédits ont été ajoutés à votre compte.',
    'letter.cvUploaded': 'CV téléversé : {name}',
    'letter.readyClickSend': 'Parfait ! Vous avez téléversé votre CV et indiqué l\'URL de l\'offre d\'emploi. Cliquez sur « Envoyer » pour générer votre lettre de motivation.',
    'letter.greetingFull': 'Bienvenue sur l\'assistant de lettre de motivation ! Veuillez télécharger votre CV en PDF et fournir l\'URL de l\'offre d\'emploi pour que je puisse vous aider à créer une lettre personnalisée.',
    'welcome.testimonial2': '"En tant qu\'étudiant en Histoire-Géopolitique, je n\'avais aucune expérience pour rédiger une lettre de motivation efficace pour mon stage. CoverMyLetter m\'a permis de créer un document professionnel qui a convaincu 3 organismes différents de me contacter pour un entretien !"',
    'welcome.testimonial1': '"À mon retour de mon séjour aux États-Unis, je me suis fais virer de mon école. J\'ai donc du chercher du travail le plus rapidement possible et CoverMyLetter m\'a permis de gagner beaucoup de temps sur la rédaction des lettres de motivation."',
    'dashboard.hello': 'Bonjour, {name} 👋',
    'plans.buyNow': 'Acheter maintenant',
    'plans.processing': 'Traitement...',
    'plans.purchaseError': 'Erreur lors de l\'achat de crédits',
    'login.submit': 'Se connecter',
    'login.submitting': 'Connexion en cours...',
    'login.noAccount': 'Pas encore de compte ?',
    'register.haveAccount': 'Déjà un compte ?',
    // --- Commun ---
    'header.switchLanguage': 'Changer de langue',
    'common.appName': 'CoverMyLetter',
    'common.login': 'Connexion',
    'common.register': 'Inscription',
    'common.createAccount': 'Créer un compte',
    'common.logout': 'Se déconnecter',
    'common.back': 'Retour',
    'common.send': 'Envoyer',
    'common.freeCredits': 'Crédits gratuits',
    'common.paidCredits': 'Crédits payants',
    'common.buyCredits': 'Acheter des crédits',
    'common.user': 'Utilisateur',
    'common.rights': '© 2025 CoverMyLetter. Tous droits réservés.',

    // --- Forfaits ---
    'plans.title': 'Choisir un forfait',
    'plans.sectionTitle': 'Nos tarifs',
    'plans.subtitle': 'Choisissez le forfait qui correspond à vos besoins',
    'plans.recommended': 'RECOMMANDÉ',
    'plans.mostPopular': 'Le plus populaire',
    'plans.choose': 'Choisir ce forfait',
    'plans.starter': 'Starter',
    'plans.starterTagline': 'Pour débuter',
    'plans.standard': 'Standard',
    'plans.premium': 'Premium',
    'plans.premiumTagline': 'Recherche intensive',
    'plans.letters10': '10 lettres de motivation',
    'plans.letters30': '30 lettres de motivation',
    'plans.letters100': '100 lettres de motivation',
    'plans.exportable': 'Format exportable',
    'plans.bestValue': 'Meilleur rapport qualité/prix',
    'plans.advanced': 'Personnalisation avancée',
    'plans.intensive': 'Idéal pour recherche intensive',
    'plans.keywords': 'Analyse de mots-clés',
    'plans.vat': 'Tous les prix incluent la TVA. Paiement 100% sécurisé.',
    'plans.vatShort': 'Tous les prix incluent la TVA. Paiement sécurisé.',

    // --- Accueil ---
    'welcome.heroLine1': 'Lettres de motivation',
    'welcome.heroLine2': "d'impact",
    'welcome.heroLine3': 'en quelques clics',
    'welcome.heroSubtitle': 'Maximisez vos chances de décrocher l\'emploi de vos rêves avec des lettres de motivation personnalisées générées par notre agent.',
    'welcome.demoBotGreeting': 'Bonjour ! Pour quel poste souhaitez-vous postuler aujourd\u2019hui ?',
    'welcome.demoUser': 'Vous',
    'welcome.demoUserMessage':
      "Voici l'offre à laquelle je postule : http://linkedin.com/offer-developpeur-react",
    'welcome.demoBotReply': 'Super ! Je vais vous aider à créer une lettre de motivation adaptée aux attentes des recruteurs pour ce poste. Commençons par mettre en avant vos compétences en React, CSS et UX/UI...',
    'welcome.howItWorksTitle': 'Comment ça fonctionne',
    'welcome.stepsTitle': 'Comment ça marche',
    'welcome.feature1Title': "Analyse de l'offre",
    'welcome.feature1Text':
      "Notre IA analyse les offres d'emploi pour identifier les compétences et mots-clés recherchés par les recruteurs.",
    'welcome.feature2Title': 'Personnalisation',
    'welcome.feature2Text':
      'Nous adaptons votre lettre en fonction de votre profil et des exigences spécifiques du poste.',
    'welcome.feature3Title': "Document prêt à l'emploi",
    'welcome.feature3Text':
      'Téléchargez votre lettre de motivation optimisée et augmentez vos chances de décrocher un entretien.',
    'welcome.pitchTitle': 'Lettres de motivation personnalisées',
    'welcome.pitchText': 'Notre agent intelligent crée des lettres de motivation parfaitement adaptées à votre profil et à l\'offre visée',
    'welcome.step1': 'Téléchargez votre CV au format PDF',
    'welcome.step2': "Partagez le lien de l'offre d'emploi qui vous intéresse",
    'welcome.step3':
      "Notre IA analyse l'offre et extrait les compétences essentielles recherchées",
    'welcome.step4':
      'Elle croise ces informations avec votre CV et génère une lettre parfaitement ciblée',
    'welcome.testimonialsTitle': 'Témoignages de candidats',
    'welcome.testimonial1Role': 'M1 Journalisme et Photographie',
    'welcome.testimonial2Role': 'L1 Histoire-Géopolitique',

    // --- Connexion ---
    'login.title': 'Connexion à votre compte',
    'login.email': 'Adresse email',
    'login.password': 'Mot de passe',
    'login.forgot': 'Mot de passe oublié ?',
    'login.error': 'Erreur lors de la connexion',

    // --- Inscription ---
    'register.title': 'Créez votre compte',
    'register.firstName': 'Prénom',
    'register.lastName': 'Nom',
    'register.confirmPassword': 'Confirmer le mot de passe',
    'register.submit': 'Créer mon compte',
    'register.submitting': 'Création en cours...',
    'register.passwordMismatch': 'Les mots de passe ne correspondent pas.',
    'register.error': "Erreur lors de l'inscription",

    // --- Tableau de bord ---
    'dashboard.question': "Que souhaitez-vous faire aujourd'hui ?",
    'dashboard.createLetter': 'Créer une lettre de motivation',
    'dashboard.savedLetters': 'Mes lettres enregistrées',
    'dashboard.lettersCreated': 'Lettres créées',
    'dashboard.sessionError':
      "Une erreur s'est produite avec votre session utilisateur. Veuillez vous reconnecter.",
    'dashboard.purchaseError':
      "Une erreur s'est produite lors de l'achat des crédits. Veuillez réessayer.",

    // --- Assistant ---
    'letter.title': 'Assistant de Lettre de Motivation',
    'letter.uploadCv': 'Téléverser votre CV',
    'letter.dropzone': 'Cliquez ou déposez votre fichier CV (PDF uniquement)',
    'letter.jobLink': "Lien de l'offre d'emploi",
    'letter.jobLinkPlaceholder': "Coller l'URL de l'offre",
    'letter.chatPlaceholder': 'Posez une question sur la lettre de motivation...',
    'letter.tipsTitle': 'Conseils',
    'letter.tip1': 'Téléversez un CV à jour et complet',
    'letter.tip2': "Fournissez le lien exact de l'offre d'emploi",
    'letter.tip3': 'Précisez vos attentes dans le chat',
    'letter.downloadPdf': 'Télécharger en PDF',
    'letter.typing': "Assistant est en train d'écrire...",
    'letter.sendHint': 'Entrée pour envoyer, Maj+Entrée pour nouvelle ligne',
    'letter.invalidPdf': 'Veuillez téléverser un fichier PDF valide.',
    'letter.missingInfo':
      "J'ai besoin de votre CV et de l'URL de l'offre d'emploi pour générer une lettre de motivation personnalisée.",
    'letter.noLetterToModify':
      "Je n'ai pas trouvé de lettre de motivation à modifier. Veuillez d'abord générer une lettre.",
    'letter.outOfCreditsGenerate':
      'Vous avez épuisé tous vos crédits. Veuillez acheter un forfait pour continuer à générer des lettres de motivation.',
    'letter.outOfCreditsModify':
      'Vous avez épuisé tous vos crédits. Veuillez acheter un forfait pour continuer à modifier des lettres de motivation.',
    'letter.generateError': 'Erreur lors de la génération de la lettre de motivation',
    'letter.modifyError': 'Erreur lors de la modification de la lettre de motivation',
  },

  en: {
    'letter.jobPostingIs': 'Here\'s the job posting: {url}',
    'letter.charCount': '{count} characters',
    'letter.requestError': 'Something went wrong while processing your request. Please try again.',
    'letter.cvUploadedMessage': 'I\'ve uploaded my CV: {name}',
    'plans.purchaseSuccess': 'Congratulations! You purchased {amount} credits for €{price}. They have been added to your account.',
    'letter.cvUploaded': 'CV uploaded: {name}',
    'letter.readyClickSend': 'Perfect! You\'ve uploaded your CV and provided the job posting URL. Click “Send” to generate your cover letter.',
    'letter.greetingFull': 'Welcome to the cover letter assistant! Please upload your CV as a PDF and provide the job posting URL so I can help you write a personalised letter.',
    'welcome.testimonial2': '"As a History and Geopolitics student, I had no experience writing an effective cover letter for my internship. CoverMyLetter helped me produce a professional document that convinced 3 different organisations to invite me to an interview!"',
    'welcome.testimonial1': '"After coming back from my stay in the United States, I was expelled from my school. I had to find work as fast as possible, and CoverMyLetter saved me a huge amount of time writing cover letters."',
    'dashboard.hello': 'Hello, {name} 👋',
    'plans.buyNow': 'Buy now',
    'plans.processing': 'Processing...',
    'plans.purchaseError': 'Credit purchase failed',
    'login.submit': 'Log in',
    'login.submitting': 'Logging in...',
    'login.noAccount': 'Don\'t have an account yet?',
    'register.haveAccount': 'Already have an account?',
    // --- Common ---
    'header.switchLanguage': 'Switch language',
    'common.appName': 'CoverMyLetter',
    'common.login': 'Log in',
    'common.register': 'Sign up',
    'common.createAccount': 'Create an account',
    'common.logout': 'Log out',
    'common.back': 'Back',
    'common.send': 'Send',
    'common.freeCredits': 'Free credits',
    'common.paidCredits': 'Paid credits',
    'common.buyCredits': 'Buy credits',
    'common.user': 'User',
    'common.rights': '© 2025 CoverMyLetter. All rights reserved.',

    // --- Plans ---
    'plans.title': 'Choose a plan',
    'plans.sectionTitle': 'Pricing',
    'plans.subtitle': 'Pick the plan that fits your needs',
    'plans.recommended': 'RECOMMENDED',
    'plans.mostPopular': 'Most popular',
    'plans.choose': 'Choose this plan',
    'plans.starter': 'Starter',
    'plans.starterTagline': 'To get started',
    'plans.standard': 'Standard',
    'plans.premium': 'Premium',
    'plans.premiumTagline': 'Intensive job hunting',
    'plans.letters10': '10 cover letters',
    'plans.letters30': '30 cover letters',
    'plans.letters100': '100 cover letters',
    'plans.exportable': 'Exportable format',
    'plans.bestValue': 'Best value for money',
    'plans.advanced': 'Advanced personalisation',
    'plans.intensive': 'Ideal for an intensive search',
    'plans.keywords': 'Keyword analysis',
    'plans.vat': 'All prices include VAT. 100% secure payment.',
    'plans.vatShort': 'All prices include VAT. Secure payment.',

    // --- Landing ---
    'welcome.heroLine1': 'Cover letters',
    'welcome.heroLine2': 'that land',
    'welcome.heroLine3': 'in a few clicks',
    'welcome.heroSubtitle': 'Maximise your chances of landing your dream job with personalised cover letters written by our agent.',
    'welcome.demoBotGreeting': 'Hello! Which role are you applying for today?',
    'welcome.demoUser': 'You',
    'welcome.demoUserMessage':
      "Here's the job I'm applying to: http://linkedin.com/offer-developpeur-react",
    'welcome.demoBotReply': 'Great! I\'ll help you write a cover letter that matches what recruiters expect for this role. Let\'s start by highlighting your React, CSS and UX/UI skills...',
    'welcome.howItWorksTitle': 'How it works',
    'welcome.feature1Title': 'Job posting analysis',
    'welcome.feature1Text':
      'Our AI reads job postings to identify the skills and keywords recruiters are looking for.',
    'welcome.feature2Title': 'Personalisation',
    'welcome.feature2Text':
      'We tailor your letter to your background and to the specific requirements of the role.',
    'welcome.feature3Title': 'Ready-to-send document',
    'welcome.feature3Text':
      'Download your polished cover letter and improve your odds of landing an interview.',
    'welcome.pitchTitle': 'Personalised cover letters',
    'welcome.pitchText': 'Our AI agent writes cover letters precisely tailored to your profile and to the role you want',
    'welcome.stepsTitle': 'How it works',
    'welcome.step1': 'Upload your CV as a PDF',
    'welcome.step2': 'Share the link to the job posting you are interested in',
    'welcome.step3': 'Our AI reads the posting and extracts the key skills required',
    'welcome.step4':
      'It combines that with your CV and generates a precisely targeted letter',
    'welcome.testimonialsTitle': 'What applicants say',
    'welcome.testimonial1Role': 'MA Journalism and Photography',
    'welcome.testimonial2Role': 'BA History and Geopolitics',

    // --- Login ---
    'login.title': 'Log in to your account',
    'login.email': 'Email address',
    'login.password': 'Password',
    'login.forgot': 'Forgot your password?',
    'login.error': 'Login failed',

    // --- Register ---
    'register.title': 'Create your account',
    'register.firstName': 'First name',
    'register.lastName': 'Last name',
    'register.confirmPassword': 'Confirm password',
    'register.submit': 'Create my account',
    'register.submitting': 'Creating your account...',
    'register.passwordMismatch': 'Passwords do not match.',
    'register.error': 'Sign-up failed',

    // --- Dashboard ---
    'dashboard.question': 'What would you like to do today?',
    'dashboard.createLetter': 'Create a cover letter',
    'dashboard.savedLetters': 'My saved letters',
    'dashboard.lettersCreated': 'Letters created',
    'dashboard.sessionError':
      'Something went wrong with your session. Please log in again.',
    'dashboard.purchaseError':
      'Something went wrong while purchasing credits. Please try again.',

    // --- Assistant ---
    'letter.title': 'Cover Letter Assistant',
    'letter.uploadCv': 'Upload your CV',
    'letter.dropzone': 'Click or drop your CV file (PDF only)',
    'letter.jobLink': 'Job posting link',
    'letter.jobLinkPlaceholder': 'Paste the job posting URL',
    'letter.chatPlaceholder': 'Ask a question about the cover letter...',
    'letter.tipsTitle': 'Tips',
    'letter.tip1': 'Upload an up-to-date, complete CV',
    'letter.tip2': 'Provide the exact link to the job posting',
    'letter.tip3': 'Describe what you expect in the chat',
    'letter.downloadPdf': 'Download as PDF',
    'letter.typing': 'Assistant is typing...',
    'letter.sendHint': 'Enter to send, Shift+Enter for a new line',
    'letter.invalidPdf': 'Please upload a valid PDF file.',
    'letter.missingInfo':
      'I need your CV and the job posting URL to generate a personalised cover letter.',
    'letter.noLetterToModify':
      "I couldn't find a cover letter to edit. Please generate one first.",
    'letter.outOfCreditsGenerate':
      'You have run out of credits. Please buy a plan to keep generating cover letters.',
    'letter.outOfCreditsModify':
      'You have run out of credits. Please buy a plan to keep editing cover letters.',
    'letter.generateError': 'Something went wrong while generating the cover letter',
    'letter.modifyError': 'Something went wrong while editing the cover letter',
  },
};
