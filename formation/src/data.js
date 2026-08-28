export const COURSE = {
  module: "Module 1",
  title: "Formation sur la panneautique.",
  subtitle: "Domaine public :",
};

export const CHAPITRES = [
  {
    name: "Chapitre 1",
    label: "Introduction :",
    description: "Découvrez la panneautique, un véritable corps de métier au service du domaine public.",
    objectives: [
      "Comprendre la définition de la panneautique",
      "Mesurer l'importance socio-économique des panneaux",
      "Identifier les problèmes actuels du secteur",
    ],
    icon: "📖",
    color: "#c08a68",
  },
  {
    name: "Chapitre 2",
    label: "Réorganisation & Réaménagement du secteur :",
    description: "Les sept étapes clés pour réorganiser et réaménager le secteur d'exploitation.",
    objectives: [
      "Maîtriser les 7 étapes de réorganisation",
      "Comprendre le zonage et la constitution des lots",
      "Appréhender la mise en concession et l'attribution",
    ],
    icon: "🔧",
    color: "#8f7650",
  },
  {
    name: "Chapitre 3",
    label: "Évaluation du système d'exploitation :",
    description: "Mettre en place un mécanisme d'évaluation pour garantir un développement harmonieux.",
    objectives: [
      "Comprendre l'importance de l'évaluation",
      "Définir un mécanisme scientifiquement soutenable",
      "Prévenir les dérapages du secteur",
    ],
    icon: "📊",
    color: "#7a5f38",
  },
  {
    name: "Chapitre 4",
    label: "Mise à jour :",
    description: "Pérenniser les acquis de développement et accompagner l'évolution du secteur.",
    objectives: [
      "Comprendre l'importance de la mise à jour",
      "Lier le secteur à l'urbanisation croissante",
      "Assurer la pérennité des acquis",
    ],
    icon: "🔄",
    color: "#9d8155",
  },
  {
    name: "Questionnaire",
    label: "Module 1 :",
    description: "Validez vos connaissances avec le questionnaire final du module.",
    objectives: [
      "Définir les termes clés",
      "Répondre à des questions de compréhension",
      "Obtenir votre certificat",
    ],
    icon: "🎓",
    color: "#c99468",
  },
];

export const STATIONS = [
  {
    id: "presentation",
    chapter: 0,
    num: "01",
    kicker: "Chapitre 1 · Présentation :",
    title: "La panneautique, un véritable corps de métier.",
    bullets: [
      "Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires",
      "Une étude pluridisciplinaire",
    ],
    content: [
      {
        t: "Un métier à part entière :",
        b: "La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire.",
      },
      {
        t: "Ce que vous allez parcourir :",
        b: "De l'importance du panneau publicitaire au constat général dans le secteur, de la réorganisation complète (en sept étapes) du domaine d'activité aux techniques d'évaluation et de mise à jour de l'ensemble du processus ; le module 1 est conçu pour un embellissement durable du cadre de vie des populations, un rayonnement de l'économie grâce à l'exploitation du mobilier urbain de publicité et à la pérennité des acquis de développement dans ce corps de métier. Un questionnaire en douze points achève le module.",
      },
    ],
  },
  {
    id: "lecon1-importance",
    chapter: 0,
    num: "02",
    kicker: "Chapitre 1 · Leçon 1 :",
    title: "Le panneau publicitaire et son importance socio-économique.",
    bullets: [
      "Booste la concurrence entre les entreprises",
      "Propulse l'économie : compétitivité des acteurs",
      "Vecteur de publicité : stimule la consommation",
      "Participe à l'embellissement des villes",
    ],
    content: [
      {
        t: "Un moteur pour la concurrence :",
        b: "L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays.",
      },
      {
        t: "Le support de publicité par excellence :",
        b: "Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence.",
      },
      {
        t: "Une part du décor urbain :",
        b: "Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue.",
      },
    ],
  },
  {
    id: "lecon2-constat",
    chapter: 0,
    num: "03",
    kicker: "Chapitre 1 · Leçon 2 :",
    title: "Constat général.",
    bullets: [
      "Pléthore de panneaux, parfois dans les capitales",
      "Pollution visuelle, insalubrité, insécurité",
      "Secteur mal organisé, ou pas encadré du tout",
      "Supports délabrés, absence de normes",
    ],
    content: [
      {
        t: "Des villes saturées :",
        b: "Dans beaucoup de villes à travers le monde - l'Afrique en est un bel exemple -, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens.",
      },
      {
        t: "Une source : l'anarchie",
        b: "Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement.",
      },
      {
        t: "Des mesures nécessaires :",
        b: "Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises.",
      },
    ],
  },
  {
    id: "audit",
    chapter: 1,
    num: "04",
    kicker: "Chapitre 2 · Étape 1 · Audit :",
    title: "Audit de la gestion en cours.",
    bullets: [
      "Liste exhaustive de tous les acteurs du secteur",
      "Examen du mécanisme d'attribution des supports",
      "Examen du cahier des charges",
    ],
    content: [
      {
        t: "Étape 3.1 :",
        b: "Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours.",
      },
      {
        t: "En quoi consiste-t-il ?",
        b: "En l'établissement de la liste exhaustive de tous les acteurs - entreprise ou personne exploitant des panneaux à des fins publicitaires - et en l'examen du mécanisme d'attribution des supports et du cahier des charges.",
      },
    ],
  },
  {
    id: "etat-lieux",
    chapter: 1,
    num: "05",
    kicker: "Chapitre 2 · Étape 2 · État des lieux :",
    title: "État des lieux du parc existant.",
    bullets: [
      "Relevé GPS détaillé et précis de tous les panneaux",
      "Plan piqué géolocalisable des supports",
    ],
    content: [
      {
        t: "Étape 3.2 :",
        b: "Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents.",
      },
      {
        t: "Un plan géolocalisable :",
        b: "Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire.",
      },
    ],
  },
  {
    id: "zonage",
    chapter: 1,
    num: "06",
    kicker: "Chapitre 2 · Étape 3 · Zonage :",
    title: "Zonage.",
    bullets: [
      "Délimitation selon des normes spécifiques du territoire",
      "Des supports facteurs d'embellissement et de modernité",
      "Paysage publicitaire harmonieux et équilibré",
      "Grilles tarifaires adaptées aux réalités locales",
    ],
    content: [
      {
        t: "Étape 3.3 :",
        b: "Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité.",
      },
      {
        t: "Le but du zonage :",
        b: "Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin.",
      },
    ],
  },
  {
    id: "constitution-lots",
    chapter: 1,
    num: "07",
    kicker: "Chapitre 2 · Étape 4 · Constitution des lots :",
    title: "Constitution des lots.",
    bullets: [
      "Le « Mobilier Urbain de Publicité » : des objets d'embellissement",
      "Des lots pour les appels d'offres",
      "Équilibre des espaces et des types de supports",
    ],
    content: [
      {
        t: "Étape 4 :",
        b: "Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes.",
      },
      {
        t: "Vers les appels d'offres :",
        b: "Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires.",
      },
      {
        t: "Garantir un équilibre :",
        b: "La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires.",
      },
    ],
  },
  {
    id: "mise-concession",
    chapter: 1,
    num: "08",
    kicker: "Chapitre 2 · Étape 5 · Mise en concession :",
    title: "Mise en concession des espaces.",
    bullets: [
      "Une technique variable selon les pays",
      "Fonction des réalités économiques et législatives",
      "À traiter au cas par cas",
    ],
    content: [
      {
        t: "Étape 5 :",
        b: "La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays.",
      },
      {
        t: "À retenir :",
        b: "NB : il faut partir d'exemples précis et traiter le sujet au cas par cas.",
      },
    ],
  },
  {
    id: "attribution",
    chapter: 1,
    num: "09",
    kicker: "Chapitre 2 · Étape 6 · Attribution :",
    title: "Attribution des espaces.",
    bullets: [
      "Sur la base du cahier des charges",
      "Contenu dans le dossier d'appel d'offres",
    ],
    content: [
      {
        t: "Étape 6 :",
        b: "L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres.",
      },
    ],
  },
  {
    id: "gestion",
    chapter: 1,
    num: "10",
    kicker: "Chapitre 2 · Étape 7 · Gestion :",
    title: "Gestion par les régies publicitaires.",
    bullets: [
      "Collectivités locales ou Gouvernement",
      "Selon les textes en vigueur dans chaque pays",
      "Transparence, professionnalisme, efficience",
    ],
    content: [
      {
        t: "Étape 7 :",
        b: "La gestion par les régies publicitaires est encadrée, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc.",
      },
      {
        t: "L'essentiel :",
        b: "Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés.",
      },
    ],
  },
  {
    id: "evaluation",
    chapter: 2,
    num: "11",
    kicker: "Chapitre 3 · Évaluation :",
    title: "Évaluer le système d'exploitation du Mobilier Urbain de Publicité.",
    bullets: [
      "Évaluer tout le processus, de l'audit à la gestion",
      "Un mécanisme scientifiquement soutenable et autonome",
      "Prévenir les dérapages, sécuriser sur le long terme",
    ],
    content: [
      {
        t: "Chapitre 3 :",
        b: "Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion par les régies publicitaires.",
      },
      {
        t: "Un pilotage autonome :",
        b: "Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme.",
      },
    ],
  },
  {
    id: "mise-a-jour",
    chapter: 3,
    num: "12",
    kicker: "Chapitre 4 · Mise à jour :",
    title: "Pérenniser les acquis de développement du secteur.",
    bullets: [
      "Pérenniser les acquis de développement",
      "Le rayonnement des villes par les supports",
      "Une évolution en phase avec l'urbanisation",
    ],
    content: [
      {
        t: "Chapitre 4 :",
        b: "La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité.",
      },
      {
        t: "Pourquoi ?",
        b: "Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation.",
      },
      {
        t: "Concrètement :",
        b: "Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes.",
      },
    ],
  },
  {
    id: "quiz",
    chapter: 4,
    num: "13",
    kicker: "Questionnaire · Module 1 :",
    title: "Douze questions pour valider le module.",
    bullets: [
      "5 définitions",
      "7 questions de compréhension",
      "Testez vos acquis en fin de parcours",
    ],
    content: [],
  },
];

// ── Quiz intermédiaires par chapitre (3-5 questions chacun) ──
export const CHAPTER_QUIZZES = [
  // Chapitre 1 — Introduction (3 leçons)
  [
    {
      q: "Qu'est-ce que la panneautique ?",
      options: [
        "L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires",
        "La seule vente d'espaces publicitaires",
        "La fabrication du mobilier urbain",
        "La régulation des réseaux sociaux",
      ],
      correct: 0,
      explain: "La panneautique est un corps de métier pluridisciplinaire couvrant l'installation et la gestion des panneaux publicitaires.",
    },
    {
      q: "Quel est le rôle économique du panneau publicitaire ?",
      options: [
        "Il remplace les marchés publics",
        "Il booste la concurrence entre les entreprises et propulse l'économie",
        "Il sert uniquement à décorer les villes",
        "Il n'a aucun impact économique",
      ],
      correct: 1,
      explain: "Le panneau stimule la concurrence, améliore la compétitivité des acteurs et favorise la consommation.",
    },
    {
      q: "Quelle est la source de la pollution visuelle dans les villes ?",
      options: [
        "Les panneaux trop colorés",
        "Un secteur d'exploitation mal organisé ou pas encadré",
        "La présence de trop peu de panneaux",
        "Les horaires d'affichage",
      ],
      correct: 1,
      explain: "Un secteur mal organisé, avec des panneaux délabrés et absence de normes, est à l'origine de la pollution visuelle.",
    },
  ],
  // Chapitre 2 — Réorganisation (7 étapes)
  [
    {
      q: "Quelle est la première étape de la réorganisation du secteur ?",
      options: [
        "Le zonage",
        "L'audit de la gestion en cours",
        "La constitution des lots",
        "La mise en concession",
      ],
      correct: 1,
      explain: "L'audit est la première étape : il consiste à établir la liste exhaustive des acteurs et examiner le mécanisme d'attribution.",
    },
    {
      q: "À quoi sert le zonage ?",
      options: [
        "À multiplier les panneaux",
        "À délimiter des espaces pour un paysage publicitaire harmonieux et équilibré",
        "À supprimer toute publicité",
        "À uniformiser les tarifs à l'échelle nationale",
      ],
      correct: 1,
      explain: "Le zonage délimite des espaces selon des normes spécifiques pour un développement harmonieux du paysage publicitaire.",
    },
    {
      q: "Qu'est-ce que le « Mobilier Urbain de Publicité » ?",
      options: [
        "Les panneaux posés sur le mobilier des cafés",
        "Des panneaux devenus de véritables objets d'embellissement des villes",
        "La publicité diffusée à la télévision",
        "Les panneaux strictement destinés à la location",
      ],
      correct: 1,
      explain: "Le Mobilier Urbain de Publicité désigne des panneaux qui ne sont plus de simples supports, mais de véritables objets d'embellissement.",
    },
    {
      q: "Comment s'effectue l'attribution des espaces ?",
      options: [
        "Au hasard",
        "Sur la base du cahier des charges dans le dossier d'appel d'offres",
        "Par décision unilatérale du maire",
        "Par enchères publiques uniquement",
      ],
      correct: 1,
      explain: "L'attribution se fait sur la base du cahier des charges contenu dans le dossier d'appel d'offres.",
    },
  ],
  // Chapitre 3 — Évaluation
  [
    {
      q: "Pourquoi évaluer le système d'exploitation ?",
      options: [
        "Pour augmenter le nombre de panneaux",
        "Pour prévenir les dérapages et sécuriser les intérêts des acteurs sur le long terme",
        "Pour supprimer les régies publicitaires",
        "Pour simplifier le cahier des charges",
      ],
      correct: 1,
      explain: "L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs et des populations.",
    },
    {
      q: "Quelle caractéristique doit avoir le mécanisme d'évaluation ?",
      options: [
        "Être géré par les régies publicitaires",
        "Être scientifiquement soutenable avec une autonomie certaine dans son pilotage",
        "Être optionnel",
        "Être limité à l'audit seul",
      ],
      correct: 1,
      explain: "Le mécanisme doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage.",
    },
  ],
  // Chapitre 4 — Mise à jour
  [
    {
      q: "Pourquoi la mise à jour du secteur est-elle importante ?",
      options: [
        "Pour augmenter les taxes",
        "Pour pérenniser les acquis de développement et accompagner l'urbanisation",
        "Pour réduire le nombre d'acteurs",
        "Pour simplifier le zonage",
      ],
      correct: 1,
      explain: "La mise à jour pérennise les acquis et favorise l'essor de l'activité en phase avec l'urbanisation.",
    },
    {
      q: "Concrètement, en quoi consiste la mise à jour ?",
      options: [
        "À supprimer les anciens panneaux",
        "À s'assurer que le secteur soit en phase avec l'évolution démographique et infrastructurelle",
        "À augmenter le nombre de zones",
        "À privatiser le secteur",
      ],
      correct: 1,
      explain: "Elle consiste à aligner le secteur sur l'évolution démographique et le développement infrastructurel des villes.",
    },
  ],
];

// ── Mini-quiz intégrés dans chaque leçon (1-2 questions de compréhension rapide) ──
export const MINI_QUIZZES = {
  "lecon1-importance": [
    {
      q: "Le panneau publicitaire est-il un simple support publicitaire ?",
      options: [
        "Oui, il sert uniquement à la publicité",
        "Non, c'est aussi un facteur d'embellissement des villes",
      ],
      correct: 1,
      explain: "Bien au-delà de la publicité, le panneau contribue à l'embellissement des villes et à l'amélioration du cadre de vie.",
    },
    {
      q: "Le panneau publicitaire doit-il être payant pour être regardé ?",
      options: [
        "Oui, il faut payer pour le voir",
        "Non, c'est le support publicitaire par excellence car il est gratuit à la lecture",
      ],
      correct: 1,
      explain: "On ne paie pas pour regarder un panneau : c'est ce qui en fait le support publicitaire par excellence.",
    },
  ],
  "lecon2-constat": [
    {
      q: "Qu'est-ce qui cause la pléthore de panneaux dans certaines villes ?",
      options: [
        "Une forte demande des citoyens",
        "Un secteur d'exploitation mal organisé ou pas encadré",
      ],
      correct: 1,
      explain: "Un secteur mal organisé, où règnent l'anarchie et le désordre, est la cause directe de la pléthore de panneaux.",
    },
  ],
  audit: [
    {
      q: "Que recherche-t-on lors de l'audit ?",
      options: [
        "Le meilleur emplacement pour de nouveaux panneaux",
        "La liste exhaustive de tous les acteurs et l'examen du mécanisme d'attribution",
      ],
      correct: 1,
      explain: "L'audit consiste à établir la liste de tous les acteurs et à examiner le mécanisme d'attribution et le cahier des charges.",
    },
  ],
  "etat-lieux": [
    {
      q: "Qu'est-ce qu'un plan piqué géolocalisable ?",
      options: [
        "Une carte papier classique",
        "Un plan où chaque panneau est localisé avec précision sur le territoire via GPS",
      ],
      correct: 1,
      explain: "Le plan piqué géolocalisable permet de situer chaque support avec précision grâce au relevé GPS.",
    },
  ],
  zonage: [
    {
      q: "Le zonage permet-il d'établir des grilles tarifaires ?",
      options: [
        "Non, les tarifs sont fixés par le gouvernement",
        "Oui, le zonage permet d'établir des grilles tarifaires adaptées aux réalités économiques",
      ],
      correct: 1,
      explain: "Le zonage crée les conditions d'un développement harmonieux et permet l'établissement de grilles tarifaires adaptées.",
    },
  ],
  "constitution-lots": [
    {
      q: "Comment les lots doivent-ils être constitués ?",
      options: [
        "Au hasard, sans critère particulier",
        "De manière à garantir l'équilibre des espaces et des types de supports",
      ],
      correct: 1,
      explain: "La constitution des lots garantit l'équilibre des espaces et celui en matière de type de support des différentes régies.",
    },
  ],
  "mise-concession": [
    {
      q: "La technique de mise en concession est-elle la même partout ?",
      options: [
        "Oui, elle est universelle",
        "Non, elle varie selon les réalités économiques, politiques et législatives de chaque pays",
      ],
      correct: 1,
      explain: "La technique est variable selon les réalités économiques, politico-administratives et la législation de chaque pays.",
    },
  ],
  attribution: [
    {
      q: "Sur quel document repose l'attribution des espaces ?",
      options: [
        "Sur le plan de zonage",
        "Sur le cahier des charges contenu dans le dossier d'appel d'offres",
      ],
      correct: 1,
      explain: "L'attribution se fait sur la base du cahier des charges contenu dans le dossier d'appel d'offres.",
    },
  ],
  gestion: [
    {
      q: "Qu'est-ce qui doit guider la gestion des régies publicitaires ?",
      options: [
        "La rapidité de construction",
        "La transparence, le professionnalisme et l'efficience",
      ],
      correct: 1,
      explain: "La transparence, le professionnalisme et l'efficience sont les piliers de la gestion par les régies.",
    },
  ],
  evaluation: [
    {
      q: "L'évaluation couvre-t-elle tout le processus ?",
      options: [
        "Non, seulement l'audit",
        "Oui, elle couvre l'ensemble du processus, de l'audit à la gestion",
      ],
      correct: 1,
      explain: "L'évaluation porte sur l'ensemble du processus, de l'audit jusqu'à la gestion par les régies publicitaires.",
    },
  ],
  "mise-a-jour": [
    {
      q: "La mise à jour du secteur est-elle ponctuelle ?",
      options: [
        "Oui, elle se fait une seule fois",
        "Non, elle doit accompagner en continu l'évolution démographique et infrastructurelle",
      ],
      correct: 1,
      explain: "La mise à jour est un processus continu qui aligne le secteur sur l'évolution des villes.",
    },
  ],
};

export const QUIZ = [
  {
    q: "Que désigne la panneautique ?",
    options: [
      "L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires",
      "La seule vente d'espaces publicitaires",
      "La fabrication du mobilier urbain",
      "La régulation des réseaux sociaux",
    ],
    correct: 0,
    explain:
      "La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires - un corps de métier pluridisciplinaire.",
  },
  {
    q: "Quel est le but du zonage ?",
    options: [
      "Multiplier les panneaux pour maximiser les recettes",
      "Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire",
      "Supprimer toute publicité des villes",
      "Uniformiser tous les panneaux du pays",
    ],
    correct: 1,
    explain:
      "Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques.",
  },
  {
    q: "Que désigne le « Mobilier Urbain de Publicité » ?",
    options: [
      "Les panneaux posés sur le mobilier des cafés",
      "La publicité diffusée à la télévision urbaine",
      "Des panneaux devenus de véritables objets d'embellissement et de décoration des villes",
      "Les panneaux strictement destinés à la location",
    ],
    correct: 2,
    explain:
      "Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes.",
  },
  {
    q: "Qu'est-ce qu'une régie publicitaire ?",
    options: [
      "L'organisme autorisé à gérer et exploiter des espaces publicitaires",
      "L'autorité qui interdit la publicité",
      "L'entreprise qui imprime les affiches",
      "L'organisme de contrôle des réseaux sociaux",
    ],
    correct: 0,
    explain:
      "Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres.",
  },
  {
    q: "Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",
    options: [
      "Les panneaux trop colorés",
      "La publicité lumineuse la nuit",
      "Le bruit produit par les panneaux numériques",
      "Une pléthore de panneaux mal organisés qui dégrade le cadre de vie",
    ],
    correct: 3,
    explain:
      "Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité.",
  },
  {
    q: "En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",
    options: [
      "À augmenter le nombre d'exploitants",
      "À privatiser tous les supports",
      "À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion",
      "À supprimer le cahier des charges",
    ],
    correct: 2,
    explain:
      "La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion par les régies.",
  },
  {
    q: "En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",
    options: [
      "Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité",
      "Remplacer tous les panneaux par des écrans numériques",
      "Retirer les panneaux des centres-villes",
      "Uniformiser les tarifs à l'échelle nationale",
    ],
    correct: 0,
    explain:
      "Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie.",
  },
  {
    q: "Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",
    options: [
      "En interdisant toute nouvelle publicité",
      "En augmentant le nombre de panneaux",
      "En confiant le secteur à une seule régie",
      "En réglementant, auditant et zonant le secteur d'exploitation",
    ],
    correct: 3,
    explain:
      "Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle.",
  },
  {
    q: "Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",
    options: [
      "En baissant tous les tarifs",
      "Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière",
      "En vendant les panneaux aux enchères chaque année",
      "En supprimant l'évaluation",
    ],
    correct: 1,
    explain:
      "Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur.",
  },
  {
    q: "Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",
    options: [
      "Oui, la liberté d'entreprendre le permet",
      "Oui, sauf dans les capitales",
      "Non, l'implantation suit des normes, un zonage et des délimitations",
      "Non, uniquement sur les autoroutes",
    ],
    correct: 2,
    explain:
      "L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable.",
  },
  {
    q: "Quelle est l'importance du panneau publicitaire dans une ville ?",
    options: [
      "Il booste la concurrence, l'économie et embellit le cadre de vie",
      "Il ne sert qu'à décorer",
      "Il remplace les marchés publics",
      "Il est surtout un obstacle à la circulation",
    ],
    correct: 0,
    explain:
      "Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes.",
  },
  {
    q: "N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",
    options: [
      "Oui, c'est totalement libre",
      "Oui, moyennant une simple taxe",
      "Non, seuls les ministères peuvent exploiter",
      "Non : acteurs identifiés, appels d'offres et gestion encadrée",
    ],
    correct: 3,
    explain:
      "Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur.",
  },
];
