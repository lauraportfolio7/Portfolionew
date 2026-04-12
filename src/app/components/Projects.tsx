import { motion } from 'motion/react';
import { useInView } from './useInView';
import Slider from 'react-slick';
import { GraduationCap, Briefcase, ExternalLink, ChevronLeft, ChevronRight, BookOpen, FileText, Play } from 'lucide-react';
import { ProjectModal, ProjectDetails } from './ProjectModal';
import { useState } from 'react';
// --- Images disponibles ---
import reunionGallery1 from '@/assets/reunion-ecran/gallery-1.avif';
import reunionGallery2 from '@/assets/reunion-ecran/gallery-2.webp';
import reunionGallery3 from '@/assets/reunion-ecran/gallery-3.webp';
import reunionGallery4 from '@/assets/reunion-ecran/gallery-4.webp';
import reunionGallery5 from '@/assets/reunion-ecran/gallery-5.webp';
import reunionGallery6 from '@/assets/reunion-ecran/gallery-6.avif';
import reunionGallery7 from '@/assets/reunion-ecran/gallery-7.avif';
import convScreen1 from '@/assets/reunion-ecran/conv-suivi-1.avif';
import pantoufleInstaImage from '@/assets/pantoufle/instagram.webp';
import gamescomTeam from '@/assets/gamescom/team.avif';
import gamescomTablet from '@/assets/gamescom/tablet.webp';
import gamescomSocialPost from '@/assets/gamescom/social-post.webp';
import cafeEcoEvent1 from '@/assets/cafe-eco/event-1.webp';
import cafeEcoEvent2 from '@/assets/cafe-eco/event-2.webp';
import cafeEcoEvent3 from '@/assets/cafe-eco/event-3.webp';
import cafeEcoEvent4 from '@/assets/cafe-eco/event-4.webp';
import reunionInvestTablet from '@/assets/reunion-invest/tablet.webp';
import reunionInvestRollup from '@/assets/reunion-invest/rollup.webp';
import reunionInvestPortrait from '@/assets/reunion-invest/portrait.avif';
import reunionInvestPost from '@/assets/reunion-invest/post.webp';
import cyberStandTeam from '@/assets/cyber-reunion/team.avif';

// --- Images récupérées ---
import reunionImage from '@/assets/reunion-ecran/poster.jpg';
import guideInvestImage from '@/assets/reunion-ecran/guide-investisseur.jpg';
import pantoufleImage from '@/assets/pantoufle/affiche.jpg';
import reunionGallery8 from '@/assets/reunion-ecran/gallery-8.jpg';
import convScreen2 from '@/assets/reunion-ecran/conv-suivi-2.jpg';
import convScreen3 from '@/assets/reunion-ecran/conv-suivi-3.jpg';
import convScreen4 from '@/assets/reunion-ecran/conv-suivi-4.jpg';
import lavaFlowImage from '@/assets/lava-flow/affiche.jpg';
import vergelegenCover from '@/assets/vergelegen/cover.jpg';
import vergelegenPage1 from '@/assets/vergelegen/page-1.jpg';
import vergelegenPage2 from '@/assets/vergelegen/page-2.jpg';
import proxiteImage1 from '@/assets/proxite/affiche-1.jpg';
import proxiteImage2 from '@/assets/proxite/affiche-2.jpg';
import liberteImage from '@/assets/liberte/cover.jpg';
import nespressoImage from '@/assets/nespresso/newsletter.jpg';
import muglerImage from '@/assets/mugler/newsletter.jpg';
import lgmBrandBookImage from '@/assets/lgm-brandbook/cover.jpg';
import leRobertImage from '@/assets/le-robert/cover.jpg';
import cyberStandView from '@/assets/cyber-reunion/stand-view.jpg';
import cyberStandFull from '@/assets/cyber-reunion/stand-full.jpg';
import reunionInvestBrochure from '@/assets/reunion-invest/brochure.jpg';
import gamescomStand from '@/assets/gamescom/stand.jpg';
import gamescomSocialTablet from '@/assets/gamescom/social-tablet.jpg';
import cafeEcoTablet from '@/assets/cafe-eco/tablet.jpg';
import { CatalogueViewer } from './CatalogueViewer';

// Custom Arrow Components
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1C2340]/60 hover:text-[#1C2340] hover:bg-white transition-all duration-500 shadow-[0_2px_16px_rgba(28,35,64,0.08)] hover:shadow-[0_4px_24px_rgba(28,35,64,0.14)] hover:scale-105"
      aria-label="Projet suivant"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1C2340]/60 hover:text-[#1C2340] hover:bg-white transition-all duration-500 shadow-[0_2px_16px_rgba(28,35,64,0.08)] hover:shadow-[0_4px_24px_rgba(28,35,64,0.14)] hover:scale-105"
      aria-label="Projet précédent"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  const featuredProjects: ProjectDetails[] = [
    {
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
          'Renforcer l\'image de La Réunion comme destination de tournage'
        ],
        affective: [
          'Créer un sentiment d\'appartenance à la communauté audiovisuelle réunionnaise',
          'Susciter l\'intérêt et l\'enthousiasme autour de l\'événement',
          'Valoriser la fierté du territoire et son potentiel créatif',
          'Générer une image professionnelle et attractive'
        ],
        conative: [
          'Inciter à participer aux différentes sessions proposées',
          'Encourager l\'inscription et la venue à l\'événement',
          'Motiver le partage et l\'interaction autour de l\'événement',
          'Générer de l\'engagement avant, pendant et après l\'événement'
        ]
      },
      supports: [
        'Affiches événementielles',
        'Visuels digitaux pour réseaux sociaux',
        'Publications Facebook et LinkedIn',
        'Kakémonos pour l\'événement',
        'Badges participants',
        'Habillage du bus de l\'éduc tour',
        'Vidéos récapitulatives',
        'Goodies personnalisés'
      ],
      impact: 'Une communication cohérente et professionnelle sur l\'ensemble des supports, une meilleure visibilité de l\'événement auprès des professionnels du secteur, une participation significative aux sessions organisées, et une valorisation prolongée grâce aux contenus publiés avant, pendant et après l\'événement. Le projet a permis de renforcer le positionnement de La Réunion comme territoire créatif et attractif pour l\'industrie audiovisuelle.',
      gallery: [
        reunionGallery1,
        reunionGallery2,
        reunionGallery3,
        reunionGallery4,
        reunionGallery5,
        reunionGallery6,
        reunionGallery7,
        reunionGallery8,
      ],
      videos: [
        'https://www.youtube.com/embed/WMWUucGfpyo'
      ],
      conversationGroup: {
        label: 'Suivi de production',
        cover: convScreen1,
        images: [convScreen1, convScreen2, convScreen3, convScreen4],
      },
    },
    {
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
        relay: 'Médias, influenceurs, blogueurs et créateurs de contenu autour de la mode, du lifestyle, du Made in France et de l\'écoresponsabilité'
      },
      objectives: {
        cognitive: [
          'Faire connaître la marque et ses modèles auprès des consommateurs français',
          'Valoriser la production Made in France',
          'Mettre en avant la qualité artisanale des produits',
          'Renforcer la perception de la marque comme moderne et tendance'
        ],
        affective: [
          'Susciter l\'attachement à la marque grâce à son authenticité et ses valeurs',
          'Sensibiliser à l\'importance de soutenir le marché local et l\'achat écoresponsable',
          'Fédérer une communauté autour des valeurs de localisme et de durabilité'
        ],
        conative: [
          'Inciter à l\'achat de produits locaux et éthiques',
          'Stimuler l\'engagement des consommateurs sur les réseaux sociaux',
          'Fidéliser la clientèle existante',
          'Augmenter les visites sur le site internet et les conversions'
        ]
      },
      positioning: 'La Pantoufle à Pépère propose des pantoufles Made in France qui allient authenticité, qualité artisanale et modernité, pour des consommateurs engagés et fiers de soutenir une production locale, éthique et durable.',
      promise: 'Confort authentique et durable avec des pantoufles Made in France.',
      proofs: [
        'Fabrication 100 % française',
        'Savoir-faire artisanal',
        'Matériaux de qualité',
        'Approche locale, éthique et durable',
        'Valorisation du Made in France'
      ],
      tone: [
        'Authentique et chaleureux',
        'Moderne et engageant',
        'Responsable et fier',
        'Premium et lifestyle'
      ],
      creativeChoices: [
        'Direction artistique plus mode, urbaine et premium',
        'Mise en scène d\'une femme stylée dans un environnement street / lifestyle',
        'Fort focus sur les pantoufles pour valoriser le produit',
        'Slogan court et impactant',
        'Cohérence visuelle entre l\'affiche abri bus et le post Instagram',
        'Rendu plus haut de gamme, plus contemporain et plus crédible visuellement'
      ],
      supports: [
        'Affiche publicitaire au format abri bus / clear channel',
        'Post Instagram classique, déclinaison visuelle de l\'affiche',
        'Adaptation d\'une même direction artistique sur un support print urbain et un support digital'
      ],
      impact: 'Attirer l\'attention de la cible grâce à un visuel fort et moderne, moderniser l\'image de la marque, valoriser le Made in France de façon plus désirable, montrer qu\'un produit confortable peut aussi être stylé, et renforcer la cohérence de marque entre affichage urbain et réseaux sociaux.',
      gallery: [
        pantoufleImage,
        pantoufleInstaImage,
      ]
    },
    {
      title: 'Réalisation d\'un guide investisseur',
      description: 'Communication institutionnelle et édition d\'une plaquette investisseurs en anglais pour promouvoir l\'attractivité économique',
      image: guideInvestImage,
      category: 'Entreprise',
      tags: ['Édition', 'Communication institutionnelle', 'Mise en page'],
      type: 'Projet entreprise – communication institutionnelle / édition / mise en page',
      problematic: 'Comment moderniser une plaquette investisseurs devenue obsolète afin de proposer un support clair, actuel, professionnel et adapté à une cible internationale en anglais, tout en respectant la charte graphique institutionnelle et la fiabilité des données économiques ?',
      documentUrl: 'https://files.catbox.moe/wdmrau.pdf',
      context: 'Projet réalisé au sein de La Réunion Développement, organisme chargé de promouvoir l\'attractivité économique du territoire. Le service communication souhaitait moderniser sa plaquette investisseurs, devenue obsolète. L\'objectif était de créer un support plus clair, plus actuel et mieux adapté �� une cible internationale, en anglais, afin de valoriser les atouts économiques de La Réunion. Le projet a été réalisé de mi-mai à début juillet 2025, incluant veille, création, mise en page et production, sans prestataire externe.',
      slogan: 'Valoriser l\'attractivité économique de La Réunion à l\'international',
      target: {
        main: 'Investisseurs internationaux',
        core: 'Partenaires économiques et institutionnels',
        relay: 'Équipes de La Réunion Développement utilisant la plaquette lors de rendez-vous et présentations investisseurs'
      },
      objectives: {
        cognitive: [
          'Faire connaître les atouts économiques du territoire',
          'Présenter les chiffres clés, les informations institutionnelles et les données stratégiques de manière claire',
          'Valoriser La Réunion comme territoire attractif pour l\'investissement'
        ],
        affective: [
          'Renforcer l\'image institutionnelle et professionnelle de La Réunion Développement',
          'Donner une image moderne, sérieuse et crédible du territoire',
          'Inspirer confiance à une cible internationale'
        ],
        conative: [
          'Donner envie aux investisseurs de s\'intéresser davantage au territoire',
          'Faciliter l\'utilisation de la plaquette lors de rendez-vous et présentations',
          'Soutenir les échanges avec des partenaires économiques et encourager la prise de contact'
        ]
      },
      supports: [
        'Plaquette investisseurs complète en anglais (mise en page professionnelle)',
        'Intégration de chiffres clés, textes institutionnels, visuels, cartographies et infographies',
        'Adaptation linguistique pour une cible internationale',
        'Version finale validée par le service communication',
        'Support prêt à être utilisé lors de rendez-vous et présentations investisseurs',
        'Modernisation de la plaquette existante avec hiérarchisation des informations',
        'Respect strict de la charte graphique institutionnelle'
      ],
      impact: 'Production d\'une nouvelle plaquette investisseurs en anglais, moderne et claire, validée par le service communication. Amélioration significative de la lisibilité du support, renforcement de l\'image institutionnelle et de la qualité perçue du document. Le support est désormais utilisé lors de rendez-vous et présentations auprès de partenaires économiques internationaux, contribuant à valoriser l\'attractivité de La Réunion comme territoire d\'investissement.',
      gallery: []
    },
  ];

  const otherProjects: ProjectDetails[] = [
    {
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
        conative: ['Inciter à visiter la boutique et le site pardon.re', 'Générer des ventes sur la nouvelle collection']
      },
      supports: ['Affiche publicitaire print', 'Visuel déclinable pour réseaux sociaux'],
      impact: 'Un visuel fort et identitaire qui positionne Pardon! comme une marque urbaine ancrée dans le territoire réunionnais, avec une direction artistique moderne et impactante.',
      gallery: [lavaFlowImage]
    },
    {
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
        conative: ['Inciter à consulter le site www.proxite.com', 'Encourager les personnes en difficulté à demander de l\'aide']
      },
      supports: ['Affiches urbaines grand format', 'Déclinaison abri bus / clear channel', 'Visuels en situation réelle'],
      impact: 'Une campagne visuelle forte et engagée qui interpelle directement le public grâce à des accroches percutantes et des mises en scène réalistes, renforçant la visibilité de l\'association Proxité.',
      gallery: [proxiteImage2, proxiteImage1]
    },
    {
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
        conative: ['Inciter au partage de la vidéo', 'Encourager l\'engagement citoyen']
      },
      supports: ['Vidéo de sensibilisation', 'Tournage et montage', 'Diffusion digitale'],
      impact: 'Une vidéo engagée et authentique qui interpelle directement le spectateur, renforçant la prise de conscience autour des libertés fondamentales.',
      gallery: [liberteImage]
    },
    {
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
        conative: ['Inciter à découvrir la nouvelle collection', 'Encourager la visite sur decouvrez.nespresso.re']
      },
      supports: ['Newsletter responsive', 'Mise en page éditoriale premium', 'Visuels produits et ambiance'],
      impact: 'Une newsletter élégante et immersive qui transporte le lecteur dans l\'univers estival de Nespresso, renforçant l\'image de marque et l\'engagement autour des éditions limitées.',
      gallery: [nespressoImage]
    },
    {
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
        conative: ['Inciter à découvrir le parfum en boutique', 'Encourager la visite sur mugler.com']
      },
      supports: ['Newsletter responsive', 'Mise en page éditoriale luxe', 'Visuels produits et ambiance'],
      impact: 'Une newsletter immersive et sophistiquée qui plonge le lecteur dans l\'univers olfactif de Mugler, renforçant le positionnement premium de la marque et l\'engagement autour d\'Angel Elixir.',
      gallery: []
    },
    {
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
        conative: ['Faciliter l\'application correcte de l\'identité de marque', 'Garantir l\'uniformité sur tous les supports de communication']
      },
      supports: ['Brand book complet', 'Charte graphique', 'Guidelines d\'identité visuelle', 'Documentation éditoriale'],
      impact: 'Un brand book complet et structuré qui permet à l\'entreprise LGM de déployer son identité visuelle de manière cohérente sur l\'ensemble de ses supports de communication.',
      gallery: []
    },
    {
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
        conative: ['Inciter à découvrir les outils Le Robert', 'Encourager l\'engagement sur les plateformes digitales']
      },
      supports: ['Vidéo publicitaire', 'Direction artistique moderne', 'Tournage et montage', 'Diffusion digitale'],
      impact: 'Une vidéo moderne et engageante qui valorise l\'importance des mots et modernise l\'image de la marque Le Robert auprès d\'un public jeune.',
      gallery: [leRobertImage]
    },
    {
      title: 'Stand Cyber Réunion – Paris',
      description: 'Conception et réalisation d\'un stand charté La Réunion pour un salon de la cybersécurité à Paris, valorisant l\'attractivité du territoire dans le secteur tech.',
      image: cyberStandFull,
      category: 'Entreprise',
      tags: ['Événementiel', 'Stand', 'Cybersécurité'],
      type: 'Projet entreprise – événementiel / conception de stand',
      context: 'Projet réalisé dans le cadre de mon alternance au sein de La Réunion Développement. L\'objectif était d\'accompagner la présence de La Réunion lors d\'un salon majeur de la cybersécurité à Paris. Le travail portait sur la conception du stand, la coordination avec les prestataires, la production des supports visuels et la mise en valeur de l\'écosystème tech réunionnais auprès des professionnels du secteur.',
      slogan: 'La Réunion, territoire d\'excellence cyber',
      target: 'Professionnels de la cybersécurité, entreprises tech, investisseurs, partenaires institutionnels',
      objectives: {
        cognitive: ['Faire connaître l\'écosystème cybersécurité de La Réunion', 'Valoriser les compétences et les acteurs du territoire', 'Présenter les atouts de La Réunion dans le secteur tech'],
        affective: ['Renforcer l\'image de La Réunion comme hub technologique', 'Créer un sentiment de professionnalisme et de modernité', 'Susciter l\'intérêt pour le territoire'],
        conative: ['Générer des contacts qualifiés avec les professionnels du secteur', 'Encourager les partenariats et les investissements', 'Motiver la visite du stand et les échanges']
      },
      supports: ['Stand charté aux couleurs de La Réunion', 'Signalétique et kakémonos', 'Supports de communication digitaux et print', 'Coordination logistique et technique'],
      impact: 'Une présence remarquée de La Réunion lors du salon, de nombreux contacts établis avec des professionnels de la cybersécurité, une valorisation réussie de l\'écosystème tech réunionnais et un renforcement de l\'image du territoire comme destination d\'excellence dans le secteur cyber.',
      gallery: [cyberStandFull, cyberStandTeam]
    },
    {
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
        conative: ['Encourager la participation à l\'événement', 'Motiver les prises de contact et les échanges avec les acteurs économiques', 'Générer des opportunités d\'investissement et de partenariats']
      },
      supports: ['Brochure bilingue français/anglais', 'Kakémono événementiel', 'Visuels pour supports digitaux', 'Portraits des intervenants', 'Mise en page premium', 'Direction artistique institutionnelle'],
      impact: 'Un ensemble de supports de communication cohérents et professionnels qui renforce l\'image de La Réunion comme destination d\'investissement attractive. Les supports ont été utilisés lors de l\'événement LaRéunion Invest pour valoriser le territoire auprès des investisseurs et partenaires internationaux, contribuant à la promotion de l\'écosystème économique réunionnais.',
      gallery: [
        reunionInvestBrochure, 
        reunionInvestTablet, 
        reunionInvestRollup, 
        { image: reunionInvestPortrait, caption: 'Post réseaux sociaux invités' },
        { image: reunionInvestPost, caption: 'Post réseaux sociaux' }
      ]
    },
    {
      title: 'Stand GamesCom Cologne',
      type: 'Conception et réalisation de stand événementiel',
      context: 'Dans le cadre de la promotion de l\'industrie vidéoludique réunionnaise à la GamesCom de Cologne, plus grande foire du jeu vidéo en Europe, conception d\'un stand institutionnel pour valoriser "La Réunion in games" sous la bannière "Choose France". Le stand met en avant les studios de jeux vidéo réunionnais (Blue Ramen, Houlhara, Creative Dn8, Titang Studio) dans un espace d\'exposition et de rencontre professionnelle.',
      slogan: 'LaReunion in games',
      target: 'Professionnels de l\'industrie du jeu vidéo, éditeurs internationaux, investisseurs, médias spécialisés et institutionnels',
      objectives: {
        cognitive: ['Faire connaître l\'écosystème vidéoludique réunionnais à l\'international', 'Positionner La Réunion comme territoire innovant dans le gaming', 'Présenter les studios et leurs créations'],
        affective: ['Créer une identité visuelle forte mêlant nature tropicale et gaming', 'Véhiculer une image moderne et dynamique du territoire', 'Susciter l\'intérêt et la curiosité des professionnels'],
        conative: ['Favoriser les rencontres B2B et les partenariats', 'Générer des opportunités de distribution internationale', 'Encourager les échanges avec les acteurs du secteur']
      },
      supports: ['Stand événementiel 3D', 'Signalétique institutionnelle', 'Kakémonos illustrés', 'Mise en scène immersive forêt tropicale', 'Espace de rencontre professionnel'],
      impact: 'Le stand GamesCom a permis de positionner La Réunion sur la scène internationale du jeu vidéo, offrant une visibilité premium aux studios locaux. L\'identité visuelle forte combinant éléments naturels réunionnais et univers gaming a créé un espace mémorable qui a favorisé les échanges professionnels et renforcé la notoriété de l\'écosystème gaming réunionnais auprès des acteurs internationaux.',
      gallery: [
        gamescomStand,
        gamescomTeam,
        gamescomTablet
      ],
      category: 'Entreprise',
      tags: ['Stand', 'Événementiel', 'Gaming', 'International', 'Branding'],
      image: gamescomStand,
      description: 'Stand GamesCom - La Réunion in games'
    },
    {
      title: 'Post Réseaux sociaux GamesCom',
      type: 'Contenu social media et storytelling événementiel',
      context: 'À l\'occasion de la participation de La Réunion à la GamesCom 2025, création d\'un post LinkedIn pour La Réunion Développement célébrant la victoire de Loïc Manglou (Blue Ramen Studios) qui a remporté le prix de l\'European Game Night avec son jeu Mafate. Le post met en avant la délégation réunionnaise, valorise les partenariats institutionnels (Ministère des Outre-mer, Business France, Team France Export) et célèbre le succès collectif de l\'écosystème gaming réunionnais sur la scène internationale.',
      slogan: 'La Réunion représentée au salon international #Gamescom2025 !',
      target: 'Professionnels des réseaux LinkedIn, acteurs de l\'écosystème tech et gaming, institutionnels, partenaires et communauté entrepreneuriale réunionnaise',
      objectives: {
        cognitive: ['Annoncer la victoire de Loïc Manglou à l\'European Game Night', 'Mettre en lumière la présence de 6 entreprises réunionnaises du jeu vidéo', 'Valoriser les partenariats institutionnels et financiers'],
        affective: ['Générer de la fierté collective autour de la réussite réunionnaise', 'Créer un sentiment d\'appartenance à l\'écosystème gaming local', 'Inspirer et motiver les entrepreneurs locaux'],
        conative: ['Encourager l\'engagement (likes, partages, commentaires)', 'Favoriser la visibilité des acteurs mentionnés', 'Renforcer la notoriété de La Réunion comme territoire innovant']
      },
      supports: ['Post LinkedIn multi-photos', 'Visuels événementiels authentiques', 'Storytelling corporate', 'Mentions et tags stratégiques', 'Mockup tablette pour présentation'],
      impact: 'Ce post a permis de capitaliser sur le succès de la GamesCom en générant de l\'engagement auprès de la communauté professionnelle, en valorisant simultanément les talents réunionnais, les partenariats institutionnels et l\'attractivité territoriale. Il renforce le positionnement de La Réunion Développement comme acteur clé du développement économique de l\'île et crée une dynamique positive autour de l\'écosystème gaming local.',
      gallery: [
        gamescomSocialTablet,
        gamescomSocialPost
      ],
      category: 'Entreprise',
      tags: ['Social Media', 'LinkedIn', 'Storytelling', 'Gaming', 'Communication'],
      image: gamescomSocialTablet,
      description: 'Post LinkedIn GamesCom - Célébration du succès réunionnais'
    },
    {
      title: 'Café ÉCO',
      type: 'Communication événementielle et captation photo',
      context: 'Dans le cadre du Café ÉCO organisé par La Réunion Développement le 29 avril 2025, création d\'un post LinkedIn annonçant l\'événement "Décryptage de la conjoncture économique de La Réunion - Focus international" ainsi que captation photo de l\'événement pour valoriser les échanges professionnels et la dynamique collective. L\'événement, soutenu par l\'Union Européenne et les partenaires institutionnels, réunit entreprises, investisseurs et acteurs économiques pour analyser les enjeux économiques du territoire.',
      slogan: 'SAVE THE DATE - Café ÉCO : décrypter la conjoncture pour décider les enjeux',
      target: 'Chefs d\'entreprise, investisseurs, décideurs économiques, acteurs institutionnels et communauté professionnelle réunionnaise',
      objectives: {
        cognitive: ['Annoncer l\'événement Café ÉCO et mobiliser les participants', 'Valoriser le format de rencontre et d\'échange économique', 'Documenter l\'événement pour capitaliser sur la dynamique collective'],
        affective: ['Créer un sentiment d\'appartenance à la communauté économique réunionnaise', 'Valoriser l\'expertise et les échanges de qualité', 'Renforcer l\'image professionnelle et engagée de La Réunion Développement'],
        conative: ['Encourager les inscriptions à l\'événement', 'Favoriser le networking et les échanges B2B', 'Générer de l\'engagement sur les réseaux sociaux et amplifier la portée de l\'événement']
      },
      supports: ['Post LinkedIn événementiel', 'Captation photo professionnelle', 'Mise en scène de l\'audience et des intervenants', 'Documentation visuelle de l\'événement', 'Mockup tablette pour présentation'],
      impact: 'Le post d\'annonce a généré de la visibilité et mobilisé les acteurs économiques, tandis que la captation photo a permis de valoriser la qualité des échanges et l\'engagement des participants. Ces visuels authentiques renforcent le positionnement de La Réunion Développement comme facilitateur de rencontres professionnelles et créent un capital visuel réutilisable pour promouvoir les futurs événements Café ÉCO.',
      gallery: [
        cafeEcoTablet,
        cafeEcoEvent1,
        cafeEcoEvent2,
        cafeEcoEvent3,
        cafeEcoEvent4
      ],
      category: 'Entreprise',
      tags: ['Événementiel', 'Photo', 'Social Media', 'LinkedIn', 'Networking'],
      image: cafeEcoTablet,
      description: 'Communication Café ÉCO - Événement économique',
      videoUrl: 'https://www.dropbox.com/scl/fi/nkybrbxkippf1dxucdq0q/copy_AEE50C35-5DD7-46CD-8DE2-FC1892E6B7C6.MOV?rlkey=tg8258cdqlzmzeo458130r6wm&st=p15un22a&dl=0'
    },
  ];

  const schoolProjects = otherProjects.filter(p => p.category === 'École');
  const entrepriseProjects = otherProjects.filter(p => p.category === 'Entreprise');

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <>
      <section id="projets" className="py-10 md:py-14 px-6 bg-[#F6F9FD] relative overflow-hidden" ref={ref}>
        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.012]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#1C2340" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>
        {/* Sky-blue cloud halos */}
        <div className="absolute top-[30%] left-[3%] w-[350px] h-[280px] rounded-full blur-[90px]" style={{ background: 'radial-gradient(ellipse, rgba(190,218,245,0.18) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[20%] right-[8%] w-[300px] h-[250px] rounded-full blur-[80px]" style={{ background: 'radial-gradient(ellipse, rgba(205,225,248,0.15) 0%, transparent 60%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#111118]/35 mb-2 block">Réalisations</span>
            <h2 className="text-3xl md:text-4xl mb-4 text-[#111118]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mes Projets
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#1C2340]/15 via-[#1C2340]/40 to-[#1C2340]/15 mx-auto" />
          </motion.div>

          {/* Featured Projects Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 max-w-5xl mx-auto relative px-4 md:px-12"
          >
            <h3 className="text-xl mb-8 text-center text-[#111118]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Projets Principaux
            </h3>
            
            <div className="relative">
              <Slider {...sliderSettings}>
                {featuredProjects.map((project, index) => (
                  <div key={index} className="px-4 py-6">
                    <div
                      className="rounded-3xl overflow-hidden transition-all duration-500 hover:translate-y-[-2px]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.90) 100%)',
                        boxShadow: '0 8px 40px -8px rgba(28,35,64,0.10), 0 2px 15px -3px rgba(28,35,64,0.05)',
                        border: '1px solid rgba(28,35,64,0.06)',
                      }}
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="h-[400px] md:h-[440px] relative overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/5" />
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain relative z-[1] p-4"
                          />
                        </div>
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C2340]/6 rounded-full mb-5 self-start border border-[#1C2340]/10">
                            <span className="text-xs uppercase tracking-[0.2em] text-[#1C2340]">{project.category}</span>
                          </div>
                          <h4 className="text-3xl mb-5 text-[#1C2340]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {project.title}
                          </h4>
                          <p className="text-[#4A5068] mb-8 leading-[1.8] opacity-85">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2.5 mb-8">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-3.5 py-1 bg-[#1C2340]/6 text-[#1C2340]/80 rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-2.5 text-[#1C2340] hover:text-[#2A3458] transition-all duration-300 self-start group"
                          >
                            <span className="tracking-wide">Voir le projet</span>
                            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>

          {/* Other Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* --- Projets scolaires --- */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-[#1C2340]/[0.05] rounded-full border border-[#1C2340]/8">
                  <GraduationCap className="w-4 h-4 text-[#1C2340]" />
                  <span className="text-[12px] uppercase tracking-[0.2em] text-[#1C2340]">Projets scolaires</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#1C2340]/10 to-transparent" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                {schoolProjects.flatMap((project, index) => {
                  const hasImage = project.image && typeof project.image === 'string';
                  
                  const card = hasImage ? (
                    <motion.div
                      key={`school-${index}`}
                      initial={{ opacity: 0, y: 25 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/85 backdrop-blur-sm rounded-xl border border-[#1C2340]/6 group cursor-pointer relative overflow-hidden"
                      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1C2340]/8 to-transparent group-hover:via-[#1C2340]/25 transition-all duration-500 z-10" />
                      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-[#1C2340] to-[#1C2340]/20 group-hover:h-full transition-all duration-500 ease-out z-10" />

                      <div className="h-[380px] bg-[#EDF2F9] flex items-center justify-center">
                        <img
                          src={project.image}
                          alt={project.title}
                          width="100%"
                          height="100%"
                          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                        />
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg text-[#1C2340] group-hover:text-[#2A3458] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {project.title}
                          </h4>
                          <ExternalLink className="w-4 h-4 text-[#1C2340]/30 opacity-0 group-hover:opacity-100 transition-all duration-400 flex-shrink-0 ml-2 mt-1" />
                        </div>
                        <p className="text-[13px] text-[#4A5068] leading-relaxed mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider text-[#1C2340]/40 px-2 py-0.5 bg-[#1C2340]/[0.04] rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.documentUrl && (
                          <a
                            href={project.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300 self-start"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Voir le dossier</span>
                          </a>
                        )}
                        {project.videoUrl && (
                          <a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300 self-start"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Voir la vidéo</span>
                          </a>
                        )}
                        {project.brandbookUrl && (
                          <a
                            href={project.brandbookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300 self-start"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Voir le brand book</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`school-${index}`}
                      initial={{ opacity: 0, y: 25 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/85 backdrop-blur-sm rounded-xl border border-[#1C2340]/6 group cursor-pointer relative overflow-hidden p-6"
                      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1C2340]/8 to-transparent group-hover:via-[#1C2340]/25 transition-all duration-500 z-10" />
                      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-[#1C2340] to-[#1C2340]/20 group-hover:h-full transition-all duration-500 ease-out z-10" />

                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#1C2340]/[0.06] flex items-center justify-center group-hover:bg-[#1C2340]/[0.12] group-hover:scale-105 transition-all duration-400">
                          <GraduationCap className="w-5 h-5 text-[#1C2340]" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#1C2340]/30 opacity-0 group-hover:opacity-100 transition-all duration-400 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <h4 className="text-lg mb-2.5 text-[#1C2340] group-hover:text-[#2A3458] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {project.title}
                      </h4>
                      <p className="text-[13.5px] text-[#4A5068] leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider text-[#1C2340]/40 px-2 py-0.5 bg-[#1C2340]/[0.04] rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );

                  // Insert Vergelegen right after Lava Flow (index 0)
                  if (index === 0) {
                    return [card, (
                      <motion.div
                        key="vergelegen"
                        initial={{ opacity: 0, y: 25 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white/85 backdrop-blur-sm rounded-xl border border-[#1C2340]/6 group relative overflow-hidden"
                        style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1C2340]/8 to-transparent group-hover:via-[#1C2340]/25 transition-all duration-500 z-10" />
                        <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-[#1C2340] to-[#1C2340]/20 group-hover:h-full transition-all duration-500 ease-out z-10" />

                        <div className="h-[380px] bg-gradient-to-br from-[#EDF2F9] to-[#E4EBF5] flex items-center justify-center p-6 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1C2340 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                          <div className="relative" style={{ perspective: '800px' }}>
                            <div
                              className="rounded-sm overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                              style={{
                                transform: 'rotateY(-4deg) rotateX(1deg)',
                                boxShadow: '8px 8px 30px -5px rgba(28,35,64,0.25), -2px -1px 10px rgba(28,35,64,0.05), inset -2px 0 4px rgba(0,0,0,0.1)',
                              }}
                            >
                              <img src={vergelegenCover} alt="Vergelegen - Couverture" className="h-[340px] w-auto block" style={{ objectFit: 'contain' }} />
                            </div>
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-sm" style={{ background: 'linear-gradient(to right, rgba(28,35,64,0.15), rgba(28,35,64,0.05))', transform: 'rotateY(-4deg) rotateX(1deg)' }} />
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-3.5 h-3.5 text-[#1C2340]/40" />
                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#1C2340]/40">Publireportage</span>
                          </div>
                          <h4 className="text-lg mb-2 text-[#1C2340] group-hover:text-[#2A3458] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>Vergelegen</h4>
                          <p className="text-[13px] text-[#4A5068] leading-relaxed mb-3">Publireportage gastronomique pour le domaine viticole Vergelegen — trois espaces culinaires au cœur de la nature sud-africaine.</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="text-[10px] uppercase tracking-wider text-[#1C2340]/40 px-2 py-0.5 bg-[#1C2340]/[0.04] rounded-full">Rédaction</span>
                            <span className="text-[10px] uppercase tracking-wider text-[#1C2340]/40 px-2 py-0.5 bg-[#1C2340]/[0.04] rounded-full">Mise en page</span>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setCatalogueOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Feuilleter le magazine</span>
                          </button>
                        </div>
                      </motion.div>
                    )];
                  }
                  return [card];
                })}
              </div>
            </div>

            {/* --- Projets en entreprise --- */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-[#1C2340]/[0.05] rounded-full border border-[#1C2340]/8">
                  <Briefcase className="w-4 h-4 text-[#1C2340]" />
                  <span className="text-[12px] uppercase tracking-[0.2em] text-[#1C2340]">Projets en entreprise</span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#1C2340]/10 to-transparent" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {entrepriseProjects.map((project, index) => {
                  const hasImage = project.image && typeof project.image === 'string';
                  
                  return hasImage ? (
                    <motion.div
                      key={`ent-${index}`}
                      initial={{ opacity: 0, y: 25 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/85 backdrop-blur-sm rounded-xl border border-[#1C2340]/6 group cursor-pointer relative overflow-hidden"
                      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1C2340]/8 to-transparent group-hover:via-[#1C2340]/25 transition-all duration-500 z-10" />
                      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-[#1C2340] to-[#1C2340]/20 group-hover:h-full transition-all duration-500 ease-out z-10" />

                      <div className="h-[380px] bg-[#EDF2F9] flex items-center justify-center">
                        <img
                          src={project.image}
                          alt={project.title}
                          width="100%"
                          height="100%"
                          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                        />
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg text-[#1C2340] group-hover:text-[#2A3458] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {project.title}
                          </h4>
                          <ExternalLink className="w-4 h-4 text-[#1C2340]/30 opacity-0 group-hover:opacity-100 transition-all duration-400 flex-shrink-0 ml-2 mt-1" />
                        </div>
                        <p className="text-[13px] text-[#4A5068] leading-relaxed mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider text-[#1C2340]/40 px-2 py-0.5 bg-[#1C2340]/[0.04] rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.documentUrl && (
                          <a
                            href={project.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300 self-start"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Voir le dossier</span>
                          </a>
                        )}
                        {project.videoUrl && (
                          <a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300 self-start"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Voir la vidéo</span>
                          </a>
                        )}
                        {project.brandbookUrl && (
                          <a
                            href={project.brandbookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#1C2340] text-white rounded-lg text-[13px] tracking-wide hover:bg-[#2A3458] transition-all duration-300 self-start"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Voir le brand book</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`ent-${index}`}
                      initial={{ opacity: 0, y: 25 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/85 backdrop-blur-sm p-6 rounded-xl border border-[#1C2340]/6 group cursor-pointer relative overflow-hidden"
                      style={{ boxShadow: '0 4px 16px -4px rgba(28,35,64,0.06)' }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1C2340]/8 to-transparent group-hover:via-[#1C2340]/25 transition-all duration-500" />
                      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-[#1C2340] to-[#1C2340]/20 group-hover:h-full transition-all duration-500 ease-out" />
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#1C2340]/[0.06] flex items-center justify-center group-hover:bg-[#1C2340]/[0.12] group-hover:scale-105 transition-all duration-400">
                          <Briefcase className="w-5 h-5 text-[#1C2340]" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#1C2340]/30 opacity-0 group-hover:opacity-100 transition-all duration-400 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <h4 className="text-lg mb-2.5 text-[#1C2340] group-hover:text-[#2A3458] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h4>
                      <p className="text-[13.5px] text-[#4A5068] leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider text-[#1C2340]/40 px-2 py-0.5 bg-[#1C2340]/[0.04] rounded-full">{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CatalogueViewer pages={[vergelegenCover, vergelegenPage1, vergelegenPage2]} isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} title="Vergelegen — Publireportage" />
    </>
  );
}