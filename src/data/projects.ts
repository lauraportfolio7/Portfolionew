import type { Project } from '@/types'

// --- Images Réunion à l'Écran ---
import reunionImage from '@/assets/reunion-ecran/poster.jpg'
import reunionGallery1 from '@/assets/reunion-ecran/gallery-1.avif'
import reunionGallery2 from '@/assets/reunion-ecran/gallery-2.webp'
import reunionGallery3 from '@/assets/reunion-ecran/gallery-3.webp'
import reunionGallery4 from '@/assets/reunion-ecran/gallery-4.webp'
import reunionGallery5 from '@/assets/reunion-ecran/gallery-5.webp'
import reunionGallery6 from '@/assets/reunion-ecran/gallery-6.avif'
import reunionGallery7 from '@/assets/reunion-ecran/gallery-7.avif'
import reunionChiffres from '@/assets/reunion-ecran/chiffres.png'
import prestataire1 from '@/assets/reunion-ecran/prestataire-1.png'
import prestataire2 from '@/assets/reunion-ecran/prestataire-2.png'
import prestataire3 from '@/assets/reunion-ecran/prestataire-3.png'
import prestataire4 from '@/assets/reunion-ecran/prestataire-4.png'
import devisNawarProd from '@/assets/reunion-ecran/devis-nawar-prod.png'
import convScreen1 from '@/assets/reunion-ecran/conv-suivi-1.avif'
import convScreen2 from '@/assets/reunion-ecran/conv-suivi-2.jpg'
import convScreen3 from '@/assets/reunion-ecran/conv-suivi-3.jpg'
import convScreen4 from '@/assets/reunion-ecran/conv-suivi-4.jpg'
import guideInvestImage from '@/assets/reunion-ecran/guide-investisseur.jpg'

// --- Images Pantoufle ---
import pantoufleImage from '@/assets/pantoufle/affiche.jpg'
import pantoufleInstaImage from '@/assets/pantoufle/instagram.webp'

// --- Images autres projets ---
import lavaFlowImage from '@/assets/lava-flow/affiche.jpg'
import proxiteImage1 from '@/assets/proxite/affiche-1.jpg'
import proxiteImage2 from '@/assets/proxite/affiche-2.jpg'
import liberteImage from '@/assets/liberte/cover.jpg'
import nespressoImage from '@/assets/nespresso/newsletter.jpg'
import muglerImage from '@/assets/mugler/newsletter.jpg'
import lgmBrandBookImage from '@/assets/lgm-brandbook/cover.jpg'
import leRobertImage from '@/assets/le-robert/cover.jpg'

// --- Images Vergelegen ---
import vergelegenCover from '@/assets/vergelegen/cover.jpg'
import vergelegenPage1 from '@/assets/vergelegen/page-1.jpg'
import vergelegenPage2 from '@/assets/vergelegen/page-2.jpg'

// --- Images Cyber Réunion ---
import cyberStandFull from '@/assets/cyber-reunion/stand-full.jpg'
import cyberStandTeam from '@/assets/cyber-reunion/team.avif'

// --- Images Réunion Invest ---
import reunionInvestBrochure from '@/assets/reunion-invest/brochure.jpg'
import reunionInvestTablet from '@/assets/reunion-invest/tablet.webp'
import reunionInvestRollup from '@/assets/reunion-invest/rollup.webp'
import reunionInvestPortrait from '@/assets/reunion-invest/portrait.avif'
import reunionInvestPost from '@/assets/reunion-invest/post.webp'

// --- Images GamesCom ---
import gamescomStand from '@/assets/gamescom/stand.jpg'
import gamescomTeam from '@/assets/gamescom/team.avif'
import gamescomTablet from '@/assets/gamescom/tablet.webp'
import gamescomSocialTablet from '@/assets/gamescom/social-tablet.jpg'
import gamescomSocialPost from '@/assets/gamescom/social-post.webp'

// --- Images Disney ---
import disneyCarte from '@/assets/disney/carte.jpg'

// --- Images Spotify ---
import spotifyCarte from '@/assets/spotify/carte.jpg'

// --- Images 48H Chrono ---
import chrono48hKakemono from '@/assets/48h-chrono/kakemono.png'

// --- Images Post EEN ---
import postEenCover from '@/assets/post-een/cover.png'

// --- Images Stand FIC 2026 ---
import standFic1 from '@/assets/stand-fic-2026/stand-1.jpeg'
import standFic2 from '@/assets/stand-fic-2026/stand-2.jpeg'
import standFic3 from '@/assets/stand-fic-2026/stand-3.jpeg'
import standFic4 from '@/assets/stand-fic-2026/stand-4.jpeg'
import standFic5 from '@/assets/stand-fic-2026/stand-5.jpeg'
import standFic6 from '@/assets/stand-fic-2026/stand-6.jpeg'
import standFic7 from '@/assets/stand-fic-2026/stand-7.jpeg'

// --- Images Brochure FIC ---
import ficBrochureCover from '@/assets/fic-brochure/cover.png'

// --- Images Benchmark ---
import benchmarkCarte from '@/assets/benchmark/carte.jpg'

// --- Images Chevalets ---
import chevaletsInSitu1 from '@/assets/chevalets/in-situ-1.jpeg'
import chevaletsInSitu2 from '@/assets/chevalets/in-situ-2.jpeg'
import chevaletsPrototype from '@/assets/chevalets/prototype.png'

// --- Images La Réunion In Games ---
import reunionInGamesAffiche from '@/assets/la-reunion-in-games/affiche.png'
import reunionInGamesKakemono from '@/assets/la-reunion-in-games/kakemono.jpg'

// --- Images Café ÉCO ---
import cafeEcoTablet from '@/assets/cafe-eco/tablet.jpg'
import cafeEcoEvent1 from '@/assets/cafe-eco/event-1.webp'
import cafeEcoEvent2 from '@/assets/cafe-eco/event-2.webp'
import cafeEcoEvent3 from '@/assets/cafe-eco/event-3.webp'
import cafeEcoEvent4 from '@/assets/cafe-eco/event-4.webp'

// --- Image Infographie Publicité contextuelle ---
import infographiePubContextuelle from '@/assets/infographie-publicite-contextuelle/cover.png'

export const featuredProjects: Project[] = [
  {
    id: 'reunion-ecran',
    isFeatured: true,
    title: 'La Réunion à l\'Écran',
    description: 'Communication événementielle pour valoriser La Réunion comme territoire de tournage et de création cinématographique',
    image: reunionImage,
    category: 'Entreprise',
    tags: ['Événementiel', 'Communication', 'Audiovisuel'],
    type: 'Projet de communication événementielle en alternance',
    context: 'La Réunion à l\'Écran est un projet que j\'ai réalisé dans le cadre de mon alternance au sein de La Réunion Développement. L\'objectif était d\'accompagner la communication d\'un événement professionnel consacré à la valorisation de La Réunion comme territoire de tournage et de création cinématographique. Entre juillet et novembre 2025, j\'ai participé à la création des supports, à leur déclinaison sur différents formats, à la coordination avec plusieurs prestataires et à la diffusion des contenus autour de l\'événement.',
    slogan: 'Une île de talents et de kréations',
    target: 'Professionnels du cinéma et de l\'audiovisuel, invités et participants de l\'événement, acteurs du secteur créatif',
    objectives: {
      cognitive: [
        'Faire connaître l\'événement La Réunion à l\'Écran',
        'Valoriser l\'identité visuelle et le positionnement de l\'événement',
        'Informer sur les sessions et le programme proposé',
        'Renforcer l\'image de La Réunion comme destination de tournage',
      ],
      affective: [
        'Créer un sentiment d\'appartenance à la communauté audiovisuelle réunionnaise',
        'Susciter l\'intérêt et l\'enthousiasme autour de l\'événement',
        'Valoriser la fierté du territoire et son potentiel créatif',
        'Générer une image professionnelle et attractive',
      ],
      conative: [
        'Inciter à participer aux différentes sessions proposées',
        'Encourager l\'inscription et la venue à l\'événement',
        'Motiver le partage et l\'interaction autour de l\'événement',
        'Générer de l\'engagement avant, pendant et après l\'événement',
      ],
    },
    supports: [
      'Affiches événementielles',
      'Visuels digitaux pour réseaux sociaux',
      'Publications Facebook et LinkedIn',
      'Kakémonos pour l\'événement',
      'Badges participants',
      'Habillage du bus de l\'éduc tour',
      'Vidéos récapitulatives',
      'Goodies personnalisés',
    ],
    impact: 'Une communication cohérente et professionnelle sur l\'ensemble des supports, une meilleure visibilité de l\'événement auprès des professionnels du secteur, une participation significative aux sessions organisées, et une valorisation prolongée grâce aux contenus publiés avant, pendant et après l\'événement. Le projet a permis de renforcer le positionnement de La Réunion comme territoire créatif et attractif pour l\'industrie audiovisuelle.',
    gallery: [
      reunionGallery1, reunionGallery2, reunionGallery3, reunionGallery4,
      reunionGallery5, reunionGallery6, reunionGallery7, reunionChiffres,
    ],
    videos: ['https://www.youtube.com/embed/WMWUucGfpyo'],
    conversationGroup: {
      label: 'Relation prestataire',
      cover: prestataire1,
      images: [prestataire1, prestataire2, prestataire3, prestataire4, devisNawarProd, convScreen1, convScreen2, convScreen3, convScreen4],
    },
  },
  {
    id: 'disney-100-ans',
    title: '100 ans de Disney',
    description: 'Projet de communication autour du centenaire de Disney : analyse de la stratégie de marque, étude des leviers de communication et propositions créatives.',
    image: disneyCarte,
    tabletMockup: true,
    documentUrl: '/documents/vice-versa.pdf',
    documentLabel: 'Voir la présentation',
    category: 'École',
    tags: ['Stratégie', 'Marketing', 'Branding', 'Événementiel'],
    type: 'Projet école – stratégie de communication / analyse de marque',
    context: 'Projet réalisé dans le cadre de mon BTS Communication à l\'occasion du centenaire de Disney. L\'objectif était d\'analyser la stratégie de communication de Disney autour de ses 100 ans, d\'étudier les leviers marketing et événementiels déployés par la marque, et de proposer des recommandations créatives. Le travail portait sur l\'analyse de la marque, son positionnement, ses campagnes anniversaire et la construction de propositions de communication innovantes.',
    slogan: '100 ans de magie, d\'histoires et de rêves',
    target: 'Grand public, familles, fans Disney de toutes générations, professionnels du marketing et de la communication',
    objectives: {
      cognitive: ['Analyser la stratégie de communication de Disney pour son centenaire', 'Comprendre les leviers de marque qui ont fait le succès de Disney', 'Identifier les campagnes et dispositifs déployés pour les 100 ans'],
      affective: ['Mettre en lumière la puissance émotionnelle de la marque Disney', 'Valoriser l\'héritage et la nostalgie comme leviers de communication', 'Susciter l\'admiration pour la cohérence de marque sur un siècle'],
      conative: ['Proposer des recommandations de communication pertinentes', 'Inspirer des stratégies applicables à d\'autres marques', 'Démontrer la capacité d\'analyse stratégique'],
    },
    supports: ['Présentation stratégique complète', 'Analyse de la marque Disney', 'Étude des campagnes du centenaire', 'Recommandations créatives'],
    impact: 'Une analyse approfondie de la stratégie de communication de Disney pour ses 100 ans, mettant en lumière les mécanismes de storytelling, de nostalgie et d\'innovation qui ont permis à la marque de rester incontournable sur un siècle.',
    gallery: [disneyCarte],
  },
  {
    id: 'guide-investisseur',
    isFeatured: true,
    title: 'Réalisation d\'un guide investisseur',
    description: 'Communication institutionnelle et édition d\'une plaquette investisseurs en anglais pour promouvoir l\'attractivité économique',
    image: guideInvestImage,
    category: 'Entreprise',
    tags: ['Édition', 'Communication institutionnelle', 'Mise en page'],
    type: 'Projet entreprise – communication institutionnelle / édition / mise en page',
    problematic: 'Comment moderniser une plaquette investisseurs devenue obsolète afin de proposer un support clair, actuel, professionnel et adapté à une cible internationale en anglais, tout en respectant la charte graphique institutionnelle et la fiabilité des données économiques ?',
    documentUrl: 'https://files.catbox.moe/wdmrau.pdf',
    context: 'Projet réalisé au sein de La Réunion Développement, organisme chargé de promouvoir l\'attractivité économique du territoire. Le service communication souhaitait moderniser sa plaquette investisseurs, devenue obsolète. L\'objectif était de créer un support plus clair, plus actuel et mieux adapté à une cible internationale, en anglais, afin de valoriser les atouts économiques de La Réunion. Le projet a été réalisé de mi-mai à début juillet 2025, incluant veille, création, mise en page et production, sans prestataire externe.',
    slogan: 'Valoriser l\'attractivité économique de La Réunion à l\'international',
    target: {
      main: 'Investisseurs internationaux',
      core: 'Partenaires économiques et institutionnels',
      relay: 'Équipes de La Réunion Développement utilisant la plaquette lors de rendez-vous et présentations investisseurs',
    },
    objectives: {
      cognitive: [
        'Faire connaître les atouts économiques du territoire',
        'Présenter les chiffres clés, les informations institutionnelles et les données stratégiques de manière claire',
        'Valoriser La Réunion comme territoire attractif pour l\'investissement',
      ],
      affective: [
        'Renforcer l\'image institutionnelle et professionnelle de La Réunion Développement',
        'Donner une image moderne, sérieuse et crédible du territoire',
        'Inspirer confiance à une cible internationale',
      ],
      conative: [
        'Donner envie aux investisseurs de s\'intéresser davantage au territoire',
        'Faciliter l\'utilisation de la plaquette lors de rendez-vous et présentations',
        'Soutenir les échanges avec des partenaires économiques et encourager la prise de contact',
      ],
    },
    supports: [
      'Plaquette investisseurs complète en anglais (mise en page professionnelle)',
      'Intégration de chiffres clés, textes institutionnels, visuels, cartographies et infographies',
      'Adaptation linguistique pour une cible internationale',
      'Version finale validée par le service communication',
      'Support prêt à être utilisé lors de rendez-vous et présentations investisseurs',
      'Modernisation de la plaquette existante avec hiérarchisation des informations',
      'Respect strict de la charte graphique institutionnelle',
    ],
    impact: 'Production d\'une nouvelle plaquette investisseurs en anglais, moderne et claire, validée par le service communication. Amélioration significative de la lisibilité du support, renforcement de l\'image institutionnelle et de la qualité perçue du document. Le support est désormais utilisé lors de rendez-vous et présentations auprès de partenaires économiques internationaux, contribuant à valoriser l\'attractivité de La Réunion comme territoire d\'investissement.',
    gallery: [],
  },
]

export const otherProjects: Project[] = [
  {
    id: 'lava-flow',
    title: 'Lava Flow – Pardon!',
    description: 'Création d\'une affiche publicitaire pour la collection "Lava Flow" de la marque Pardon!, inspirée du Piton de la Fournaise, mêlant graphisme brut, énergie volcanique et attitude urbaine.',
    image: lavaFlowImage,
    category: 'École',
    tags: ['Print', 'Direction Artistique', 'Publicité'],
    type: 'Projet école – création publicitaire / direction artistique',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir une affiche publicitaire pour le lancement de la collection "Lava Flow" de la marque réunionnaise Pardon!. La collection s\'inspire du Piton de la Fournaise et mêle graphisme brut, énergie volcanique et attitude urbaine. Le travail portait sur la direction artistique, la création du visuel et la rédaction du message publicitaire.',
    slogan: 'La nouvelle collection qui fait pèt\' le volcan',
    target: 'Jeunes adultes 18-35 ans, amateurs de streetwear et de mode urbaine, sensibles à l\'identité réunionnaise',
    objectives: {
      cognitive: ['Faire connaître la nouvelle collection Lava Flow', 'Associer la marque Pardon! à l\'identité volcanique de La Réunion'],
      affective: ['Créer un sentiment de fierté locale', 'Susciter l\'envie et le désir d\'achat grâce à un visuel impactant'],
      conative: ['Inciter à visiter la boutique et le site pardon.re', 'Générer des ventes sur la nouvelle collection'],
    },
    supports: ['Affiche publicitaire print', 'Visuel déclinable pour réseaux sociaux'],
    impact: 'Un visuel fort et identitaire qui positionne Pardon! comme une marque urbaine ancrée dans le territoire réunionnais, avec une direction artistique moderne et impactante.',
    gallery: [lavaFlowImage],
  },
  {
    id: 'vergelegen',
    isVergelegen: true,
    title: 'Vergelegen',
    description: 'Publireportage gastronomique pour le domaine viticole Vergelegen — trois espaces culinaires au cœur de la nature sud-africaine.',
    image: vergelegenCover,
    category: 'École',
    tags: ['Rédaction', 'Mise en page', 'Publireportage'],
    type: 'Projet école – publireportage / rédaction / mise en page',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir un publireportage gastronomique pour le domaine viticole Vergelegen, situé à Somerset West en Afrique du Sud. Le domaine propose trois espaces culinaires distincts — le Camphors, restaurant gastronomique ; le Stables, bistrot décontracté ; et le Picnic, expérience en plein air au cœur des jardins historiques. Le travail portait sur la rédaction des textes, la mise en page et la direction artistique du publireportage, avec un rendu élégant et immersif destiné à la presse gastronomique.',
    slogan: 'Vergelegen — Une expérience culinaire au cœur de la nature sud-africaine',
    target: 'Lecteurs de presse gastronomique et œnologique, amateurs de voyages et de découvertes culinaires, touristes haut de gamme',
    objectives: {
      cognitive: ['Faire découvrir le domaine Vergelegen et ses trois espaces culinaires', 'Présenter la richesse gastronomique et viticole du domaine', 'Informer sur l\'histoire et le patrimoine du lieu'],
      affective: ['Créer une ambiance gastronomique immersive et élégante', 'Susciter l\'envie de découvrir le domaine et ses saveurs', 'Véhiculer une image de raffinement et d\'authenticité'],
      conative: ['Inciter à la visite du domaine Vergelegen', 'Encourager la réservation dans les restaurants du domaine', 'Donner envie de découvrir la région viticole de Stellenbosch'],
    },
    supports: ['Publireportage magazine sur plusieurs pages', 'Rédaction des textes descriptifs et évocateurs', 'Mise en page éditoriale soignée', 'Sélection et intégration des visuels'],
    impact: 'Un publireportage élégant et immersif qui transporte le lecteur au cœur du domaine Vergelegen, valorisant à la fois l\'expérience gastronomique, le cadre naturel exceptionnel et le patrimoine historique du lieu. Le rendu final propose une lecture fluide et attractive, fidèle aux codes de la presse gastronomique haut de gamme.',
    gallery: [vergelegenCover, vergelegenPage1, vergelegenPage2],
    vergelegenPages: [vergelegenCover, vergelegenPage1, vergelegenPage2],
  },
  {
    id: 'proxite',
    title: 'Proxité – Campagne de prévention',
    description: 'Création d\'affiches de prévention contre les addictions pour l\'association Proxité, avec une direction artistique percutante mêlant typographie bold et visuels choc en contexte urbain.',
    image: proxiteImage2,
    category: 'École',
    tags: ['Print', 'Affichage', 'Prévention'],
    type: 'Projet école – création publicitaire / campagne de prévention',
    documentUrl: 'https://www.dropbox.com/scl/fi/776j4jtn4j83ibxvu00m9/Dossier-projet-addictions.pdf?rlkey=15387t2yfodiduayijdod32ou&st=adv0h59f&raw=1',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir une campagne d\'affichage de prévention contre les addictions pour l\'association Proxité. Le travail portait sur la direction artistique, la création des visuels et la rédaction des accroches publicitaires, avec une mise en situation réaliste en environnement urbain.',
    slogan: 'Tester, pour finalement y rester',
    target: 'Jeunes adultes et adolescents exposés aux risques d\'addiction, grand public',
    objectives: {
      cognitive: ['Sensibiliser aux dangers des substances addictives', 'Faire connaître l\'association Proxité et ses ressources d\'aide'],
      affective: ['Provoquer une prise de conscience par des visuels impactants', 'Créer un sentiment d\'urgence face aux risques'],
      conative: ['Inciter à consulter le site www.proxite.com', 'Encourager les personnes en difficulté à demander de l\'aide'],
    },
    supports: ['Affiches urbaines grand format', 'Déclinaison abri bus / clear channel', 'Visuels en situation réelle'],
    impact: 'Une campagne visuelle forte et engagée qui interpelle directement le public grâce à des accroches percutantes et des mises en scène réalistes, renforçant la visibilité de l\'association Proxité.',
    gallery: [proxiteImage2, proxiteImage1],
  },
  {
    id: 'liberte',
    title: 'Vidéo de sensibilisation – La Liberté',
    description: 'Réalisation d\'une vidéo de sensibilisation sur le thème de la liberté, mêlant témoignages authentiques et mise en scène intimiste pour interpeller et faire réfléchir.',
    image: liberteImage,
    category: 'École',
    tags: ['Vidéo', 'Sensibilisation', 'Storytelling'],
    type: 'Projet école – production audiovisuelle / vidéo de sensibilisation',
    videoUrl: 'https://www.dropbox.com/scl/fi/95wo8u38kyrtdwf1gvc7o/Vid-o-Libert-Laura.mov?rlkey=hl220yuje0rlrmdjdkqiwesdw&st=h3a18vg4&dl=0',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir et produire une vidéo de sensibilisation sur le thème de la liberté. Le travail portait sur l\'écriture du scénario, la direction artistique, le tournage et le montage, avec une approche intimiste et engagée pour toucher un public jeune.',
    slogan: 'La liberté, ça se protège',
    target: 'Jeunes adultes et adolescents, public scolaire et associatif',
    objectives: {
      cognitive: ['Sensibiliser à la notion de liberté et à ses enjeux', 'Encourager la réflexion sur les libertés individuelles et collectives'],
      affective: ['Créer une émotion forte grâce à des témoignages authentiques', 'Susciter l\'empathie et l\'identification'],
      conative: ['Inciter au partage de la vidéo', 'Encourager l\'engagement citoyen'],
    },
    supports: ['Vidéo de sensibilisation', 'Tournage et montage', 'Diffusion digitale'],
    impact: 'Une vidéo engagée et authentique qui interpelle directement le spectateur, renforçant la prise de conscience autour des libertés fondamentales.',
    gallery: [liberteImage],
  },
  {
    id: 'nespresso',
    title: 'Newsletter Nespresso',
    description: 'Conception et réalisation d\'une newsletter pour Nespresso autour de la collection estivale "L\'été en capsule", avec un design épuré, premium et une direction artistique solaire.',
    image: nespressoImage,
    category: 'École',
    tags: ['Emailing', 'Design', 'Digital'],
    type: 'Projet école – communication digitale / newsletter',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir une newsletter promotionnelle pour Nespresso, mettant en avant les nouvelles éditions glacées de l\'été. Le travail portait sur la direction artistique, la mise en page, la rédaction des textes et l\'intégration visuelle, avec un rendu haut de gamme fidèle à l\'univers de la marque.',
    slogan: 'L\'été en capsule : découvrez nos nouvelles éditions glacées',
    target: 'Clients Nespresso, amateurs de café premium, consommateurs sensibles aux éditions limitées',
    objectives: {
      cognitive: ['Faire connaître les nouvelles capsules estivales', 'Informer sur l\'événement de dégustation en terrasse'],
      affective: ['Créer une atmosphère estivale et désirable', 'Renforcer l\'image premium et lifestyle de Nespresso'],
      conative: ['Inciter à découvrir la nouvelle collection', 'Encourager la visite sur decouvrez.nespresso.re'],
    },
    supports: ['Newsletter responsive', 'Mise en page éditoriale premium', 'Visuels produits et ambiance'],
    impact: 'Une newsletter élégante et immersive qui transporte le lecteur dans l\'univers estival de Nespresso, renforçant l\'image de marque et l\'engagement autour des éditions limitées.',
    gallery: [nespressoImage],
  },
  {
    id: 'mugler',
    title: 'Newsletter Mugler',
    description: 'Conception d\'une newsletter pour la maison Mugler autour du parfum iconique Angel Elixir, avec une direction artistique sombre, sensuelle et premium fidèle à l\'univers de la marque.',
    image: muglerImage,
    category: 'École',
    tags: ['Emailing', 'Design', 'Luxe'],
    type: 'Projet école – communication digitale / newsletter',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir une newsletter promotionnelle pour la maison Mugler, mettant en avant le parfum iconique Angel Elixir. Le travail portait sur la direction artistique, la mise en page, la rédaction des textes et l\'intégration visuelle, avec un rendu haut de gamme fidèle à l\'univers sombre et sensuel de la marque.',
    slogan: 'Angel Elixir – Révélez votre part d\'ombre',
    target: 'Clientèle Mugler, amateurs de parfumerie de luxe, femmes audacieuses et affirmées',
    objectives: {
      cognitive: ['Faire connaître Angel Elixir et ses notes olfactives', 'Informer sur la disponibilité du parfum'],
      affective: ['Créer une atmosphère mystérieuse et désirable', 'Renforcer l\'image audacieuse et iconique de Mugler'],
      conative: ['Inciter à découvrir le parfum en boutique', 'Encourager la visite sur mugler.com'],
    },
    supports: ['Newsletter responsive', 'Mise en page éditoriale luxe', 'Visuels produits et ambiance'],
    impact: 'Une newsletter immersive et sophistiquée qui plonge le lecteur dans l\'univers olfactif de Mugler, renforçant le positionnement premium de la marque et l\'engagement autour d\'Angel Elixir.',
    gallery: [],
  },
  {
    id: 'lgm-brandbook',
    title: 'Brand Book LGM',
    description: 'Création d\'un brand book complet pour l\'entreprise LGM, définissant l\'identité visuelle, les valeurs de marque et les guidelines d\'utilisation.',
    image: lgmBrandBookImage,
    category: 'École',
    tags: ['Brand Design', 'Identité Visuelle', 'Édition'],
    type: 'Projet école – design de marque / brand book',
    brandbookUrl: 'https://flipbook.so/flip/o46rbPxaqWzXjty73Vzr',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir un brand book complet pour l\'entreprise LGM, comprenant l\'identité visuelle, les valeurs de marque, les codes couleurs, la typographie et les règles d\'utilisation. Le travail portait sur la stratégie de marque, la direction artistique et la mise en page éditoriale du document.',
    slogan: 'Construire une identité de marque forte et cohérente',
    target: 'Équipes internes, partenaires et prestataires de l\'entreprise LGM',
    objectives: {
      cognitive: ['Définir clairement l\'identité visuelle de la marque', 'Établir des guidelines précises d\'utilisation'],
      affective: ['Renforcer la cohérence et la reconnaissance de la marque', 'Créer un sentiment d\'appartenance autour de l\'identité LGM'],
      conative: ['Faciliter l\'application correcte de l\'identité de marque', 'Garantir l\'uniformité sur tous les supports de communication'],
    },
    supports: ['Brand book complet', 'Charte graphique', 'Guidelines d\'identité visuelle', 'Documentation éditoriale'],
    impact: 'Un brand book complet et structuré qui permet à l\'entreprise LGM de déployer son identité visuelle de manière cohérente sur l\'ensemble de ses supports de communication.',
    gallery: [],
  },
  {
    id: 'le-robert',
    title: 'Le Robert',
    description: 'Réalisation d\'une vidéo publicitaire pour la marque Le Robert, avec une direction artistique moderne et élégante.',
    image: leRobertImage,
    category: 'École',
    tags: ['Vidéo', 'Publicité', 'Digital'],
    type: 'Projet école – production audiovisuelle / vidéo publicitaire',
    videoUrl: 'https://www.dropbox.com/scl/fi/f6vvusr5yvo2n5agnel43/Le-Robert.MOV?rlkey=h2vfk2dlqdzmdny7hxqhi80cr&st=h8kc0k14&dl=0',
    context: 'Projet réalisé dans le cadre de mon BTS Communication. L\'objectif était de concevoir et produire une vidéo publicitaire pour la marque Le Robert, spécialiste des dictionnaires et de la langue française. Le travail portait sur le scénario, la direction artistique, le tournage et le montage, avec une approche moderne et dynamique pour séduire un public jeune et connecté.',
    slogan: 'Les mots ont du sens avec Le Robert',
    target: 'Jeunes adultes et étudiants, utilisateurs de contenus digitaux, amateurs de langue française',
    objectives: {
      cognitive: ['Faire connaître la marque Le Robert et ses ressources digitales', 'Valoriser l\'usage des dictionnaires et de la langue française'],
      affective: ['Créer une connexion émotionnelle avec les mots et leur richesse', 'Moderniser l\'image de la marque auprès des jeunes'],
      conative: ['Inciter à découvrir les outils Le Robert', 'Encourager l\'engagement sur les plateformes digitales'],
    },
    supports: ['Vidéo publicitaire', 'Direction artistique moderne', 'Tournage et montage', 'Diffusion digitale'],
    impact: 'Une vidéo moderne et engageante qui valorise l\'importance des mots et modernise l\'image de la marque Le Robert auprès d\'un public jeune.',
    gallery: [leRobertImage],
  },
  {
    id: '48h-chrono',
    title: '48H Top Chrono – T\'Crousty',
    description: 'Challenge créatif de 48h en équipe : création d\'une identité visuelle complète, d\'une stratégie de lancement et de supports de communication pour le lancement des Crousty Bowls de T\'Crousty.',
    image: chrono48hKakemono,
    documentUrl: '/documents/charte-graphique-t-crousty.pdf',
    documentLabel: 'Charte graphique',
    category: 'École',
    tags: ['Branding', 'Stratégie', 'Événementiel', 'Social Media'],
    type: 'Projet école – challenge 48H / stratégie de communication / identité visuelle',
    context: 'Projet réalisé dans le cadre d\'un challenge 48H Top Chrono organisé à l\'école. Le brief : accompagner la marque T\'Crousty dans le lancement de ses propres Crousty Bowls. En 48 heures, il fallait concevoir une charte graphique, proposer des visuels de communication, imaginer un événement de lancement et élaborer une stratégie complète sur les réseaux sociaux. Un exercice intense de travail en équipe sous pression, mêlant créativité, stratégie et production.',
    slogan: 'T\'Crousty – Le croustillant qui fait le bowl',
    target: 'Jeunes adultes 18-35 ans, amateurs de street food et de bowls, consommateurs connectés et sensibles aux tendances food',
    objectives: {
      cognitive: ['Faire connaître le lancement des Crousty Bowls', 'Positionner T\'Crousty comme acteur innovant sur le marché des bowls', 'Présenter l\'univers de marque et ses valeurs'],
      affective: ['Créer l\'envie et la curiosité autour du nouveau produit', 'Véhiculer une image fun, gourmande et moderne', 'Générer de l\'enthousiasme autour de l\'événement de lancement'],
      conative: ['Inciter à goûter les Crousty Bowls', 'Encourager le partage sur les réseaux sociaux', 'Générer du trafic lors de l\'événement de lancement'],
    },
    supports: ['Charte graphique complète', 'Kakémono de présentation', 'Visuels pour réseaux sociaux', 'Concept d\'événement de lancement', 'Stratégie social media', 'Vidéo de présentation du projet'],
    impact: 'Un projet complet réalisé en 48h démontrant la capacité à travailler en équipe sous pression, à produire une identité de marque cohérente et une stratégie de lancement structurée dans un délai très court.',
    gallery: [chrono48hKakemono],
    videos: ['/videos/t-crousty.mp4'],
  },
  {
    id: 'spotify',
    title: 'Spotify – Offres médias innovantes',
    description: 'Étude de la démarche marketing de Spotify pour construire des offres médias innovantes, avec analyse stratégique et propositions créatives.',
    image: spotifyCarte,
    tabletMockup: true,
    documentUrl: '/documents/spotify-diapo.pdf',
    documentLabel: 'Voir la présentation',
    category: 'École',
    tags: ['Marketing', 'Stratégie', 'Médias', 'Digital'],
    type: 'Projet école – stratégie marketing / offres médias',
    context: 'Projet réalisé dans le cadre de mon BTS Communication sur le thème "Prendre appui sur la démarche marketing pour construire des offres médias innovantes". L\'objectif était d\'analyser la stratégie marketing de Spotify, comprendre son modèle économique et ses offres médias, puis proposer des pistes d\'innovation. Le travail portait sur l\'analyse du marché du streaming musical, l\'étude du positionnement de Spotify, et la construction de propositions d\'offres médias créatives et pertinentes.',
    slogan: 'Prendre appui sur la démarche marketing pour construire des offres médias innovantes',
    target: 'Annonceurs, marques et agences média souhaitant toucher les utilisateurs de plateformes de streaming musical',
    objectives: {
      cognitive: ['Analyser la démarche marketing de Spotify', 'Comprendre le modèle économique du streaming musical', 'Identifier les leviers d\'innovation des offres médias'],
      affective: ['Démontrer la pertinence de Spotify comme support publicitaire', 'Valoriser l\'expérience utilisateur comme levier média'],
      conative: ['Proposer des offres médias innovantes et actionnables', 'Encourager les annonceurs à investir dans le streaming musical'],
    },
    supports: ['Présentation stratégique complète', 'Analyse marketing détaillée', 'Propositions d\'offres médias innovantes'],
    impact: 'Une analyse approfondie de la stratégie marketing de Spotify et des propositions concrètes d\'offres médias innovantes, démontrant la capacité à s\'appuyer sur une démarche marketing existante pour créer de la valeur.',
    gallery: [spotifyCarte],
  },
  {
    id: 'pantoufle-pepere',
    isFeatured: true,
    title: 'La Pantoufle à Pépère',
    description: 'Stratégie de communication et création de supports pour valoriser une marque de pantoufles Made in France',
    image: pantoufleImage,
    category: 'École',
    tags: ['Stratégie', 'Print', 'Digital'],
    type: 'Projet école – stratégie de communication / création de supports print et digitaux',
    problematic: 'Comment valoriser les qualités du produit, comme le confort, l\'authenticité et la qualité artisanale, ainsi que son origine Made in France, tout en se différenciant d\'une concurrence qui propose des produits plus accessibles ?',
    context: 'Projet réalisé dans le cadre de mon BTS Communication autour de la marque La Pantoufle à Pépère. L\'objectif était de valoriser les qualités du produit, son positionnement Made in France, son authenticité et sa qualité artisanale, tout en construisant une communication plus moderne, attractive et différenciante. Le travail portait à la fois sur le positionnement de la marque, la stratégie de communication et la création de supports adaptés à la cible.',
    slogan: 'Portez du Made in France avec style.',
    target: {
      main: 'Consommateurs éco-responsables, à l\'aise financièrement, âgés de 25 à 55 ans, sensibles à la qualité, à la durabilité et à l\'origine française des produits',
      core: 'Jeunes adultes engagés de 25 à 35 ans, sensibles au localisme et à l\'écoresponsabilité',
      relay: 'Médias, influenceurs, blogueurs et créateurs de contenu autour de la mode, du lifestyle, du Made in France et de l\'écoresponsabilité',
    },
    objectives: {
      cognitive: [
        'Faire connaître la marque et ses modèles auprès des consommateurs français',
        'Valoriser la production Made in France',
        'Mettre en avant la qualité artisanale des produits',
        'Renforcer la perception de la marque comme moderne et tendance',
      ],
      affective: [
        'Susciter l\'attachement à la marque grâce à son authenticité et ses valeurs',
        'Sensibiliser à l\'importance de soutenir le marché local et l\'achat écoresponsable',
        'Fédérer une communauté autour des valeurs de localisme et de durabilité',
      ],
      conative: [
        'Inciter à l\'achat de produits locaux et éthiques',
        'Stimuler l\'engagement des consommateurs sur les réseaux sociaux',
        'Fidéliser la clientèle existante',
        'Augmenter les visites sur le site internet et les conversions',
      ],
    },
    positioning: 'La Pantoufle à Pépère propose des pantoufles Made in France qui allient authenticité, qualité artisanale et modernité, pour des consommateurs engagés et fiers de soutenir une production locale, éthique et durable.',
    promise: 'Confort authentique et durable avec des pantoufles Made in France.',
    proofs: [
      'Fabrication 100 % française',
      'Savoir-faire artisanal',
      'Matériaux de qualité',
      'Approche locale, éthique et durable',
      'Valorisation du Made in France',
    ],
    tone: [
      'Authentique et chaleureux',
      'Moderne et engageant',
      'Responsable et fier',
      'Premium et lifestyle',
    ],
    creativeChoices: [
      'Direction artistique plus mode, urbaine et premium',
      'Mise en scène d\'une femme stylée dans un environnement street / lifestyle',
      'Fort focus sur les pantoufles pour valoriser le produit',
      'Slogan court et impactant',
      'Cohérence visuelle entre l\'affiche abri bus et le post Instagram',
      'Rendu plus haut de gamme, plus contemporain et plus crédible visuellement',
    ],
    supports: [
      'Affiche publicitaire au format abri bus / clear channel',
      'Post Instagram classique, déclinaison visuelle de l\'affiche',
      'Adaptation d\'une même direction artistique sur un support print urbain et un support digital',
    ],
    impact: 'Attirer l\'attention de la cible grâce à un visuel fort et moderne, moderniser l\'image de la marque, valoriser le Made in France de façon plus désirable, montrer qu\'un produit confortable peut aussi être stylé, et renforcer la cohérence de marque entre affichage urbain et réseaux sociaux.',
    gallery: [pantoufleImage, pantoufleInstaImage],
  },
  {
    id: 'cyber-reunion',
    title: 'Stand Cyber Réunion – Paris',
    description: 'Conception et réalisation d\'un stand charté La Réunion pour un salon de la cybersécurité à Paris, valorisant l\'attractivité du territoire dans le secteur tech.',
    image: cyberStandFull,
    tabletMockup: true,
    category: 'Entreprise',
    tags: ['Événementiel', 'Stand', 'Cybersécurité'],
    type: 'Projet entreprise – événementiel / conception de stand',
    context: 'Projet réalisé dans le cadre de mon alternance au sein de La Réunion Développement. L\'objectif était d\'accompagner la présence de La Réunion lors d\'un salon majeur de la cybersécurité à Paris. Le travail portait sur la conception du stand, la coordination avec les prestataires, la production des supports visuels et la mise en valeur de l\'écosystème tech réunionnais auprès des professionnels du secteur.',
    slogan: 'La Réunion, territoire d\'excellence cyber',
    target: 'Professionnels de la cybersécurité, entreprises tech, investisseurs, partenaires institutionnels',
    objectives: {
      cognitive: ['Faire connaître l\'écosystème cybersécurité de La Réunion', 'Valoriser les compétences et les acteurs du territoire', 'Présenter les atouts de La Réunion dans le secteur tech'],
      affective: ['Renforcer l\'image de La Réunion comme hub technologique', 'Créer un sentiment de professionnalisme et de modernité', 'Susciter l\'intérêt pour le territoire'],
      conative: ['Générer des contacts qualifiés avec les professionnels du secteur', 'Encourager les partenariats et les investissements', 'Motiver la visite du stand et les échanges'],
    },
    supports: ['Stand charté aux couleurs de La Réunion', 'Signalétique et kakémonos', 'Supports de communication digitaux et print', 'Coordination logistique et technique'],
    impact: 'Une présence remarquée de La Réunion lors du salon, de nombreux contacts établis avec des professionnels de la cybersécurité, une valorisation réussie de l\'écosystème tech réunionnais et un renforcement de l\'image du territoire comme destination d\'excellence dans le secteur cyber.',
    gallery: [cyberStandFull, cyberStandTeam],
  },
  {
    id: 'reunion-invest',
    title: 'LaRéunion Invest',
    description: 'Conception et réalisation de supports de communication pour l\'événement LaRéunion Invest, promouvant l\'île comme terre d\'affaires et d\'investissement lors d\'un événement majeur.',
    image: reunionInvestBrochure,
    category: 'Entreprise',
    tags: ['Édition', 'Communication institutionnelle', 'Événementiel'],
    type: 'Projet entreprise – communication institutionnelle / édition',
    context: 'Projet réalisé au sein de La Réunion Développement dans le cadre de l\'événement LaRéunion Invest organisé du 2 au 6 juin 2025. L\'objectif était de concevoir l\'ensemble des supports de communication de l\'événement : brochure bilingue (français/anglais), kakémono, visuels pour tablettes et supports digitaux. Le travail portait sur la direction artistique, la mise en page, l\'intégration des contenus institutionnels et la production de supports premium destinés aux investisseurs et partenaires internationaux.',
    slogan: 'La Réunion, terre d\'affaires et d\'investissement',
    target: 'Investisseurs internationaux, partenaires économiques, entreprises, institutionnels et décideurs',
    objectives: {
      cognitive: ['Présenter La Réunion comme destination d\'investissement stratégique', 'Valoriser les atouts économiques et les opportunités du territoire', 'Informer sur l\'événement LaRéunion Invest et son programme'],
      affective: ['Créer une image premium et professionnelle du territoire', 'Inspirer confiance et crédibilité auprès des investisseurs', 'Susciter l\'intérêt pour les opportunités d\'affaires'],
      conative: ['Encourager la participation à l\'événement', 'Motiver les prises de contact et les échanges avec les acteurs économiques', 'Générer des opportunités d\'investissement et de partenariats'],
    },
    supports: ['Brochure bilingue français/anglais', 'Kakémono événementiel', 'Visuels pour supports digitaux', 'Portraits des intervenants', 'Mise en page premium', 'Direction artistique institutionnelle'],
    impact: 'Un ensemble de supports de communication cohérents et professionnels qui renforce l\'image de La Réunion comme destination d\'investissement attractive. Les supports ont été utilisés lors de l\'événement LaRéunion Invest pour valoriser le territoire auprès des investisseurs et partenaires internationaux, contribuant à la promotion de l\'écosystème économique réunionnais.',
    gallery: [
      reunionInvestBrochure,
      reunionInvestTablet,
      reunionInvestRollup,
      { image: reunionInvestPortrait, caption: 'Post réseaux sociaux invités' },
      { image: reunionInvestPost, caption: 'Post réseaux sociaux' },
    ],
  },
  {
    id: 'gamescom-stand',
    title: 'Stand GamesCom Cologne',
    description: 'Stand GamesCom - La Réunion in games',
    image: gamescomTablet,
    category: 'Entreprise',
    tags: ['Stand', 'Événementiel', 'Gaming', 'International', 'Branding'],
    type: 'Conception et réalisation de stand événementiel',
    context: 'Dans le cadre de la promotion de l\'industrie vidéoludique réunionnaise à la GamesCom de Cologne, plus grande foire du jeu vidéo en Europe, conception d\'un stand institutionnel pour valoriser "La Réunion in games" sous la bannière "Choose France". Le stand met en avant les studios de jeux vidéo réunionnais (Blue Ramen, Houlhara, Creative Dn8, Titang Studio) dans un espace d\'exposition et de rencontre professionnelle.',
    slogan: 'LaReunion in games',
    target: 'Professionnels de l\'industrie du jeu vidéo, éditeurs internationaux, investisseurs, médias spécialisés et institutionnels',
    objectives: {
      cognitive: ['Faire connaître l\'écosystème vidéoludique réunionnais à l\'international', 'Positionner La Réunion comme territoire innovant dans le gaming', 'Présenter les studios et leurs créations'],
      affective: ['Créer une identité visuelle forte mêlant nature tropicale et gaming', 'Véhiculer une image moderne et dynamique du territoire', 'Susciter l\'intérêt et la curiosité des professionnels'],
      conative: ['Favoriser les rencontres B2B et les partenariats', 'Générer des opportunités de distribution internationale', 'Encourager les échanges avec les acteurs du secteur'],
    },
    supports: ['Stand événementiel 3D', 'Signalétique institutionnelle', 'Kakémonos illustrés', 'Mise en scène immersive forêt tropicale', 'Espace de rencontre professionnel'],
    impact: 'Le stand GamesCom a permis de positionner La Réunion sur la scène internationale du jeu vidéo, offrant une visibilité premium aux studios locaux. L\'identité visuelle forte combinant éléments naturels réunionnais et univers gaming a créé un espace mémorable qui a favorisé les échanges professionnels et renforcé la notoriété de l\'écosystème gaming réunionnais auprès des acteurs internationaux.',
    gallery: [gamescomStand, gamescomTeam, gamescomTablet],
  },
  {
    id: 'gamescom-post',
    title: 'Post Réseaux sociaux GamesCom',
    description: 'Post LinkedIn GamesCom - Célébration du succès réunionnais',
    image: gamescomSocialTablet,
    category: 'Entreprise',
    tags: ['Social Media', 'LinkedIn', 'Storytelling', 'Gaming', 'Communication'],
    type: 'Contenu social media et storytelling événementiel',
    context: 'À l\'occasion de la participation de La Réunion à la GamesCom 2025, création d\'un post LinkedIn pour La Réunion Développement célébrant la victoire de Loïc Manglou (Blue Ramen Studios) qui a remporté le prix de l\'European Game Night avec son jeu Mafate. Le post met en avant la délégation réunionnaise, valorise les partenariats institutionnels (Ministère des Outre-mer, Business France, Team France Export) et célèbre le succès collectif de l\'écosystème gaming réunionnais sur la scène internationale.',
    slogan: 'La Réunion représentée au salon international #Gamescom2025 !',
    target: 'Professionnels des réseaux LinkedIn, acteurs de l\'écosystème tech et gaming, institutionnels, partenaires et communauté entrepreneuriale réunionnaise',
    objectives: {
      cognitive: ['Annoncer la victoire de Loïc Manglou à l\'European Game Night', 'Mettre en lumière la présence de 6 entreprises réunionnaises du jeu vidéo', 'Valoriser les partenariats institutionnels et financiers'],
      affective: ['Générer de la fierté collective autour de la réussite réunionnaise', 'Créer un sentiment d\'appartenance à l\'écosystème gaming local', 'Inspirer et motiver les entrepreneurs locaux'],
      conative: ['Encourager l\'engagement (likes, partages, commentaires)', 'Favoriser la visibilité des acteurs mentionnés', 'Renforcer la notoriété de La Réunion comme territoire innovant'],
    },
    supports: ['Post LinkedIn multi-photos', 'Visuels événementiels authentiques', 'Storytelling corporate', 'Mentions et tags stratégiques', 'Mockup tablette pour présentation'],
    impact: 'Ce post a permis de capitaliser sur le succès de la GamesCom en générant de l\'engagement auprès de la communauté professionnelle, en valorisant simultanément les talents réunionnais, les partenariats institutionnels et l\'attractivité territoriale. Il renforce le positionnement de La Réunion Développement comme acteur clé du développement économique de l\'île et crée une dynamique positive autour de l\'écosystème gaming local.',
    gallery: [gamescomSocialTablet, gamescomSocialPost],
  },
  {
    id: 'cafe-eco',
    title: 'Café ÉCO',
    description: 'Communication Café ÉCO - Événement économique',
    image: cafeEcoTablet,
    category: 'Entreprise',
    tags: ['Événementiel', 'Photo', 'Social Media', 'LinkedIn', 'Networking'],
    type: 'Communication événementielle et captation photo',
    context: 'Dans le cadre du Café ÉCO organisé par La Réunion Développement le 29 avril 2025, création d\'un post LinkedIn annonçant l\'événement "Décryptage de la conjoncture économique de La Réunion - Focus international" ainsi que captation photo de l\'événement pour valoriser les échanges professionnels et la dynamique collective. L\'événement, soutenu par l\'Union Européenne et les partenaires institutionnels, réunit entreprises, investisseurs et acteurs économiques pour analyser les enjeux économiques du territoire.',
    slogan: 'SAVE THE DATE - Café ÉCO : décrypter la conjoncture pour décider les enjeux',
    target: 'Chefs d\'entreprise, investisseurs, décideurs économiques, acteurs institutionnels et communauté professionnelle réunionnaise',
    objectives: {
      cognitive: ['Annoncer l\'événement Café ÉCO et mobiliser les participants', 'Valoriser le format de rencontre et d\'échange économique', 'Documenter l\'événement pour capitaliser sur la dynamique collective'],
      affective: ['Créer un sentiment d\'appartenance à la communauté économique réunionnaise', 'Valoriser l\'expertise et les échanges de qualité', 'Renforcer l\'image professionnelle et engagée de La Réunion Développement'],
      conative: ['Encourager les inscriptions à l\'événement', 'Favoriser le networking et les échanges B2B', 'Générer de l\'engagement sur les réseaux sociaux et amplifier la portée de l\'événement'],
    },
    supports: ['Post LinkedIn événementiel', 'Captation photo professionnelle', 'Mise en scène de l\'audience et des intervenants', 'Documentation visuelle de l\'événement', 'Mockup tablette pour présentation'],
    impact: 'Le post d\'annonce a généré de la visibilité et mobilisé les acteurs économiques, tandis que la captation photo a permis de valoriser la qualité des échanges et l\'engagement des participants. Ces visuels authentiques renforcent le positionnement de La Réunion Développement comme facilitateur de rencontres professionnelles et créent un capital visuel réutilisable pour promouvoir les futurs événements Café ÉCO.',
    gallery: [cafeEcoTablet, cafeEcoEvent1, cafeEcoEvent2, cafeEcoEvent3, cafeEcoEvent4],
    videoUrl: 'https://www.dropbox.com/scl/fi/nkybrbxkippf1dxucdq0q/copy_AEE50C35-5DD7-46CD-8DE2-FC1892E6B7C6.MOV?rlkey=tg8258cdqlzmzeo458130r6wm&st=p15un22a&dl=0',
  },
  {
    id: 'chevalets-conferences',
    title: 'Chevalets – Conférences de presse',
    description: 'Conception de chevalets de table pour les conférences de presse de La Réunion Développement, assurant une signalétique professionnelle et institutionnelle.',
    image: chevaletsInSitu1,
    tabletMockup: true,
    category: 'Entreprise',
    tags: ['Print', 'Signalétique', 'Communication institutionnelle'],
    type: 'Projet entreprise – signalétique / communication institutionnelle',
    context: 'Projet réalisé au sein de La Réunion Développement dans le cadre de l\'organisation de conférences de presse. L\'objectif était de concevoir des chevalets de table permettant d\'identifier les intervenants et de structurer visuellement l\'espace lors des prises de parole officielles. Le travail portait sur la mise en page, le respect de la charte graphique institutionnelle et la production de supports prêts à l\'impression.',
    slogan: 'Une communication institutionnelle soignée jusque dans les détails',
    target: 'Journalistes, médias locaux et nationaux, partenaires institutionnels, intervenants des conférences de presse',
    objectives: {
      cognitive: ['Identifier clairement les intervenants lors des conférences de presse', 'Renforcer l\'image institutionnelle de La Réunion Développement', 'Assurer une cohérence visuelle avec la charte graphique'],
      affective: ['Véhiculer une image de sérieux et de professionnalisme', 'Renforcer la crédibilité des prises de parole officielles'],
      conative: ['Faciliter le travail des journalistes lors des conférences', 'Contribuer à la bonne organisation des événements presse'],
    },
    supports: ['Chevalets de table nominatifs', 'Mise en page chartée', 'Fichiers prêts à l\'impression'],
    impact: 'Des supports de signalétique professionnels et cohérents qui contribuent à la qualité et à la crédibilité des conférences de presse organisées par La Réunion Développement.',
    gallery: [chevaletsPrototype, chevaletsInSitu2],
  },
  {
    id: 'benchmark-reseaux-sociaux',
    title: 'Benchmark des réseaux sociaux',
    description: 'Analyse comparative des réseaux sociaux de La Réunion Développement : audit des performances, veille concurrentielle et recommandations stratégiques.',
    image: benchmarkCarte,
    laptopMockup: true,
    documentUrl: '/documents/benchmark-reseaux-sociaux.pdf',
    documentLabel: 'Voir le benchmark',
    category: 'Entreprise',
    tags: ['Social Media', 'Audit', 'Stratégie digitale'],
    type: 'Projet entreprise – benchmark / stratégie digitale',
    context: 'Projet réalisé au sein de La Réunion Développement afin d\'évaluer la présence digitale de l\'organisme sur les réseaux sociaux. L\'objectif était de réaliser un benchmark complet : analyse des performances des comptes existants (LinkedIn, Facebook, Instagram), veille concurrentielle sur des organismes similaires, identification des bonnes pratiques et formulation de recommandations stratégiques pour améliorer la visibilité et l\'engagement en ligne.',
    slogan: 'Comprendre pour mieux communiquer',
    target: 'Service communication de La Réunion Développement, direction générale, équipes en charge du digital',
    objectives: {
      cognitive: ['Dresser un état des lieux des performances sur les réseaux sociaux', 'Identifier les forces et faiblesses de la stratégie digitale actuelle', 'Analyser les pratiques des organismes concurrents ou comparables'],
      affective: ['Sensibiliser les équipes à l\'importance d\'une stratégie social media structurée', 'Valoriser le potentiel d\'amélioration et les opportunités identifiées'],
      conative: ['Fournir des recommandations actionnables pour améliorer la stratégie digitale', 'Proposer un plan d\'action concret pour augmenter l\'engagement et la visibilité'],
    },
    supports: ['Document de benchmark comparatif', 'Analyse des KPIs (portée, engagement, croissance)', 'Veille concurrentielle', 'Recommandations stratégiques'],
    impact: 'Un document d\'analyse complet permettant au service communication de La Réunion Développement de prendre des décisions éclairées pour optimiser sa stratégie sur les réseaux sociaux et renforcer sa présence digitale.',
    gallery: [],
  },
  {
    id: 'brochure-forum-in-cyber',
    title: 'Brochure – Forum InCyber',
    description: 'Conception d\'une brochure institutionnelle pour la participation de La Réunion au Forum InCyber, valorisant l\'écosystème cybersécurité du territoire.',
    image: ficBrochureCover,
    bookletMockup: true,
    brochureUrl: '/documents/brochure-fic.pdf',
    category: 'Entreprise',
    tags: ['Édition', 'Print', 'Cybersécurité'],
    type: 'Projet entreprise – édition / communication institutionnelle',
    context: 'Projet réalisé au sein de La Réunion Développement pour accompagner la participation du territoire au Forum InCyber (anciennement FIC), événement européen de référence en cybersécurité. L\'objectif était de concevoir une brochure institutionnelle mettant en valeur les entreprises et acteurs réunionnais de la cybersécurité, les atouts du territoire et les opportunités de collaboration. Le travail portait sur la direction artistique, la rédaction, la mise en page et la production du support.',
    slogan: 'La Réunion, territoire d\'innovation cyber',
    target: 'Professionnels de la cybersécurité, entreprises du secteur, investisseurs, partenaires institutionnels européens',
    objectives: {
      cognitive: ['Présenter l\'écosystème cybersécurité réunionnais', 'Mettre en avant les entreprises et les compétences du territoire', 'Informer sur les opportunités de collaboration et d\'implantation'],
      affective: ['Renforcer l\'image de La Réunion comme hub d\'innovation numérique', 'Inspirer confiance et crédibilité auprès des professionnels européens'],
      conative: ['Encourager les contacts et les échanges sur le stand', 'Générer des opportunités de partenariats avec les acteurs réunionnais'],
    },
    supports: ['Brochure institutionnelle imprimée', 'Mise en page professionnelle', 'Contenu rédactionnel structuré', 'Visuels et infographies'],
    impact: 'Une brochure institutionnelle de qualité qui accompagne la délégation réunionnaise sur le salon et renforce la visibilité de l\'écosystème cybersécurité de La Réunion auprès des acteurs européens du secteur.',
    gallery: [],
  },
  {
    id: 'post-een',
    title: 'Post EEN',
    description: 'Création de publications LinkedIn pour le réseau Enterprise Europe Network (EEN), valorisant les actions d\'accompagnement des entreprises réunionnaises à l\'international.',
    image: postEenCover,
    carouselPdfUrl: '/documents/post-een.pdf',
    category: 'Entreprise',
    tags: ['Social Media', 'LinkedIn', 'International'],
    type: 'Projet entreprise – communication digitale / social media',
    context: 'Projet réalisé au sein de La Réunion Développement dans le cadre du réseau Enterprise Europe Network (EEN). L\'objectif était de créer des publications LinkedIn pour valoriser les actions d\'accompagnement des entreprises réunionnaises à l\'international, promouvoir les événements et missions du réseau, et renforcer la visibilité de La Réunion Développement comme point de contact EEN. Le travail portait sur la rédaction, la création de visuels et le storytelling corporate.',
    slogan: 'Connecter les entreprises réunionnaises au monde',
    target: 'Entreprises réunionnaises à potentiel export, partenaires du réseau EEN, institutionnels, communauté professionnelle LinkedIn',
    objectives: {
      cognitive: ['Faire connaître le réseau EEN et ses services d\'accompagnement', 'Valoriser les actions de La Réunion Développement au sein du réseau', 'Informer sur les opportunités d\'internationalisation pour les entreprises réunionnaises'],
      affective: ['Renforcer la crédibilité de La Réunion Développement comme acteur de l\'internationalisation', 'Créer un sentiment d\'appartenance à un réseau européen d\'excellence'],
      conative: ['Encourager les entreprises à solliciter l\'accompagnement EEN', 'Générer de l\'engagement sur les publications LinkedIn', 'Motiver la participation aux événements du réseau'],
    },
    supports: ['Publications LinkedIn', 'Visuels chartés', 'Storytelling corporate', 'Contenu rédactionnel'],
    impact: 'Des publications professionnelles et engageantes qui renforcent la visibilité du réseau EEN à La Réunion et encouragent les entreprises locales à s\'engager dans des démarches d\'internationalisation.',
    gallery: [],
  },
  {
    id: 'stand-forum-in-cyber-2026',
    title: 'Stand Forum InCyber (2026)',
    description: 'Conception et coordination du stand La Réunion au Forum InCyber 2026, mettant en avant l\'écosystème cyber du territoire lors de l\'événement européen de référence.',
    image: standFic1,
    tabletMockup: true,
    category: 'Entreprise',
    tags: ['Événementiel', 'Stand', 'Cybersécurité'],
    type: 'Projet entreprise – événementiel / conception de stand',
    context: 'Projet réalisé au sein de La Réunion Développement pour la participation au Forum InCyber 2026 (anciennement FIC) à Lille, événement européen majeur de la cybersécurité. L\'objectif était de concevoir et coordonner l\'ensemble du stand institutionnel La Réunion : direction artistique, signalétique, supports de communication, coordination logistique avec les prestataires et les entreprises exposantes. Le stand accueillait des entreprises réunionnaises spécialisées en cybersécurité pour favoriser les rencontres B2B et la visibilité internationale du territoire.',
    slogan: 'La Réunion, hub cyber de l\'océan Indien',
    target: 'Professionnels européens de la cybersécurité, entreprises du secteur numérique, investisseurs, décideurs institutionnels',
    objectives: {
      cognitive: ['Positionner La Réunion comme territoire d\'excellence en cybersécurité', 'Présenter les entreprises et compétences cyber réunionnaises', 'Faire connaître les atouts stratégiques du territoire dans l\'océan Indien'],
      affective: ['Créer un espace d\'accueil professionnel et attractif', 'Renforcer la fierté des entreprises réunionnaises exposantes', 'Véhiculer une image moderne et innovante du territoire'],
      conative: ['Favoriser les rencontres B2B et les partenariats', 'Générer des opportunités commerciales pour les entreprises exposantes', 'Encourager les contacts et les échanges avec les visiteurs du salon'],
    },
    supports: ['Stand institutionnel charté', 'Signalétique et kakémonos', 'Supports de communication print et digitaux', 'Coordination logistique et technique', 'Espace de rencontre professionnel'],
    impact: 'Une présence institutionnelle forte et structurée au Forum InCyber 2026, offrant aux entreprises réunionnaises une vitrine européenne de premier plan et renforçant le positionnement de La Réunion comme hub cyber dans l\'océan Indien.',
    gallery: [standFic1, standFic2, standFic3, standFic4, standFic5, standFic6, standFic7],
  },
  {
    id: 'la-reunion-in-games',
    title: 'La Réunion In Games',
    description: 'Création de l\'identité visuelle et des supports de communication pour la marque "La Réunion In Games", promouvant l\'industrie vidéoludique réunionnaise à l\'international.',
    image: reunionInGamesAffiche,
    category: 'Entreprise',
    tags: ['Branding', 'Gaming', 'International', 'Communication'],
    type: 'Projet entreprise – branding / communication sectorielle',
    context: 'Projet réalisé au sein de La Réunion Développement pour structurer et valoriser la filière jeu vidéo réunionnaise sous une identité commune : "La Réunion In Games". L\'objectif était de créer une marque fédératrice pour représenter les studios de jeux vidéo réunionnais lors d\'événements internationaux (GamesCom, salons professionnels). Le travail portait sur la création de l\'identité visuelle, la déclinaison sur différents supports de communication et la mise en place d\'une communication cohérente autour de l\'écosystème gaming du territoire.',
    slogan: 'La Réunion In Games – L\'île aux talents numériques',
    target: 'Studios de jeux vidéo réunionnais, professionnels de l\'industrie gaming internationale, éditeurs, investisseurs, médias spécialisés',
    objectives: {
      cognitive: ['Créer une identité de marque forte pour la filière gaming réunionnaise', 'Fédérer les studios locaux sous une bannière commune', 'Positionner La Réunion comme territoire créatif dans l\'industrie du jeu vidéo'],
      affective: ['Susciter la fierté et l\'appartenance chez les studios réunionnais', 'Véhiculer une image moderne, créative et dynamique du territoire', 'Créer une identité mémorable mêlant culture réunionnaise et univers gaming'],
      conative: ['Faciliter la promotion collective des studios lors d\'événements internationaux', 'Encourager les collaborations entre les acteurs locaux du gaming', 'Attirer l\'attention des éditeurs et investisseurs internationaux'],
    },
    supports: ['Identité visuelle complète', 'Déclinaison sur supports print et digitaux', 'Signalétique pour événements internationaux', 'Visuels pour réseaux sociaux', 'Supports de présentation'],
    impact: 'Une marque fédératrice qui structure la communication de la filière jeu vidéo réunionnaise et offre une visibilité internationale cohérente aux studios locaux, renforçant le positionnement de La Réunion comme territoire d\'innovation dans l\'industrie du gaming.',
    gallery: [reunionInGamesKakemono],
  },
  {
    id: 'infographie-publicite-contextuelle',
    title: 'Infographie — Publicité contextuelle',
    description: 'Infographie réalisée dans le cadre du cours de stratégie de communication.',
    image: infographiePubContextuelle,
    category: 'École',
    tags: ['Infographie', 'Stratégie de communication', 'Print'],
    type: 'Production école — infographie',
    context: '',
    slogan: '',
    target: '',
    objectives: { cognitive: [], affective: [], conative: [] },
    supports: [],
    impact: '',
    gallery: [infographiePubContextuelle],
    documentUrl: '/documents/infographie-publicite-contextuelle.pdf',
    documentLabel: 'Voir l\'infographie en PDF',
  },
]
