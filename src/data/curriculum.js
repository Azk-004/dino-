/**
 * Panneautique — contenu du cursus, structuré à partir du PDF « Formation
 * sur la panneautique : domaine public » (Module 1).
 *
 * Types de blocs de leçon :
 *   p       — paragraphe
 *   h3      — sous-titre
 *   callout — encadré définition / point clé (title + text)
 *   list    — liste à puces (items)
 *   steps   — étapes numérotées (items : { n, title, text })
 *   quote   — citation
 */

export const terms = {
  panneautique: {
    term: "Panneautique",
    def: "Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires ; un véritable corps de métier dont l'étude est pluridisciplinaire.",
  },
  zonage: {
    term: "Zonage",
    def: "Délimitation d'espaces selon des normes spécifiques du territoire, pour un développement harmonieux et équilibré du paysage de l'affichage publicitaire et l'établissement de grilles tarifaires en adéquation avec les réalités économiques des Villes.",
  },
  mup: {
    term: "Mobilier Urbain de Publicité",
    def: "Panneaux publicitaires devenus de véritables objets (meubles) d'embellissement et de décoration des Villes, au-delà de leur seule fonction publicitaire.",
  },
  regie: {
    term: "Régie publicitaire",
    def: "Entreprise exploitant des panneaux publicitaires à des fins publicitaires, à laquelle les espaces sont attribués sur la base du cahier des charges du dossier d'appel d'offres.",
  },
  pollution: {
    term: "Pollution visuelle",
    def: "Pléthore de panneaux publicitaires dans l'espace public, source de nuisance visuelle, d'insalubrité et d'insécurité pour les personnes et les biens.",
  },
  audit: {
    term: "Audit",
    def: "Étape de réorganisation consistant à établir la liste exhaustive des acteurs et à examiner le mécanisme d'attribution des supports et le cahier des charges.",
  },
  concession: {
    term: "Mise en concession",
    def: "Technique variable de cession des espaces publicitaires à des régies, fonction des réalités économiques, politico-administratives et de la législation de chaque pays.",
  },
  cahier: {
    term: "Cahier des charges",
    def: "Document contenu dans le dossier d'appel d'offres, sur la base duquel est faite l'attribution des espaces publicitaires aux régies.",
  },
};

export const curriculum = [
  {
    id: "m1",
    module: "Module 1",
    title: "Domaine public",
    subtitle: "Fondations du métier",
    chapters: [
      {
        id: "c1",
        title: "Introduction",
        lessons: [
          {
            id: "l1",
            num: "Leçon 1",
            title:
              "Le panneau publicitaire et son importance dans la vie socio-économique d'un pays",
            duration: "8 min",
            content: [
              {
                type: "p",
                text: "La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire.",
              },
              {
                type: "p",
                text: "L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Ce faisant, elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays.",
              },
              {
                type: "h3",
                text: "Comment l'exploitation des panneaux publicitaires booste-t-elle la concurrence ?",
              },
              {
                type: "p",
                text: "Vecteur de publicité, le panneau publicitaire stimule et encourage la consommation. Lorsque l'activité d'exploitation de panneaux publicitaires est bien réglementée et bien encadrée, les normes d'exercice de celle-ci garantissent l'équité dans la gestion du secteur par les autorités compétentes.",
              },
              {
                type: "callout",
                title: "À retenir",
                text: "On ne paie pas pour regarder un panneau publicitaire : le panneau publicitaire est le support de publicité par excellence. Cet atout intemporel fait de ce support un des plus populaires de tous les temps.",
              },
              {
                type: "p",
                text: "En outre, par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des Villes. Bien visibles dans l'espace public, ils participent au décor de celui-ci. Dès lors, il importe que le choix des supports ne soit plus motivé seulement par leurs aspects ou leur design, mais aussi par des critères qui font qu'à la fonction première de ceux-ci s'ajoute un besoin d'esthétique pour un environnement et un cadre de vie plus beau et plus agréable à la vue.",
              },
              {
                type: "quote",
                text: "Le panneau publicitaire est le support de publicité par excellence.",
              },
            ],
            keywords: ["panneau publicitaire", "concurrence", "embellissement", "consommation"],
          },
          {
            id: "l2",
            num: "Leçon 2",
            title: "Constat général",
            duration: "6 min",
            content: [
              {
                type: "p",
                text: "Dans beaucoup de Villes à travers le monde — l'Afrique en est un bel exemple — il est fréquent de constater, parfois dans des Capitales, des cas de pléthore de panneaux publicitaires, causes de pollution visuelle, d'insalubrité et d'insécurité pour des personnes et des biens.",
              },
              {
                type: "callout",
                title: "La source du problème",
                text: "Un secteur d'exploitation des panneaux publicitaires mal organisé, mal encadré ou pas encadré du tout, où règnent l'anarchie et le désordre, est la source de cette pléthore.",
              },
              {
                type: "p",
                text: "Dans un environnement tel que celui que nous venons de décrire, l'exploitation des panneaux publicitaires devient source de maux. L'état délabré et obsolète des supports, l'absence de normes et de réglementations sont causes de la contre-productivité du secteur et facteurs de dégradation de l'environnement.",
              },
              {
                type: "p",
                text: "Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des Villes, que des mesures adéquates soient prises.",
              },
            ],
            keywords: ["pollution visuelle", "insalubrité", "insécurité", "anarchie", "réglementation"],
          },
        ],
      },
      {
        id: "c2",
        title: "Réorganisation et réaménagement du secteur",
        lessons: [
          {
            id: "l3",
            num: "Leçon 3",
            title: "Les différentes étapes",
            duration: "20 min",
            content: [
              {
                type: "p",
                text: "Les différentes étapes pour une bonne réorganisation et un aménagement réussi du secteur d'exploitation des panneaux publicitaires sont au nombre de sept : de l'audit à la gestion des régies publicitaires.",
              },
              {
                type: "steps",
                items: [
                  {
                    n: "01",
                    title: "Audit",
                    text: "Afin de permettre que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une Ville (ou d'un Pays), il faut faire un audit de la gestion en cours. Il consiste en l'établissement de la liste exhaustive de tous les acteurs (entreprise ou personne exploitant des panneaux à des fins publicitaires) et en l'examen du mécanisme d'attribution des supports et du cahier des charges.",
                  },
                  {
                    n: "02",
                    title: "État des lieux",
                    text: "Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents, puis établir le plan piquet géolocalisable de ceux-ci.",
                  },
                  {
                    n: "03",
                    title: "Zonage",
                    text: "Pour parvenir à un réaménagement optimal du plan d'implantation des panneaux publicitaires, effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité. Le but du zonage est de créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des Villes.",
                  },
                  {
                    n: "04",
                    title: "Constitution des lots",
                    text: "Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports à des fins de publicité mais de véritables objets (ou meubles) d'embellissement et de décoration des Villes. Après études et validation des supports, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des espaces publicitaires. La constitution des lots garantit l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires.",
                  },
                  {
                    n: "05",
                    title: "Mise en concession des espaces publicitaires",
                    text: "La technique de mise en concession des espaces publicitaires est variable : elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays.",
                  },
                  {
                    n: "06",
                    title: "Attribution des espaces publicitaires",
                    text: "L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres.",
                  },
                  {
                    n: "07",
                    title: "Gestion des régies publicitaires",
                    text: "La gestion des régies publicitaires est faite dans certains pays par les collectivités locales, dans d'autres par le Gouvernement par l'intermédiaire du Ministère de la Communication, etc. L'essentiel : la transparence, le professionnalisme et l'efficience doivent être rigoureusement observés.",
                  },
                ],
              },
              {
                type: "callout",
                title: "Fil rouge",
                text: "De l'audit à la gestion des régies, chaque étape doit être transparente, professionnelle et efficiente pour garantir un secteur qui embellit la Ville tout en restant rentable.",
              },
            ],
            keywords: [
              "audit",
              "état des lieux",
              "zonage",
              "lots",
              "concession",
              "attribution",
              "régies",
            ],
          },
        ],
      },
      {
        id: "c3",
        title: "Évaluation du système d'exploitation",
        lessons: [
          {
            id: "l4",
            num: "Leçon 4",
            title: "Évaluation et pilotage",
            duration: "5 min",
            content: [
              {
                type: "p",
                text: "Afin de garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut, dans les réformes, prévoir un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion des régies publicitaires.",
              },
              {
                type: "p",
                text: "Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme.",
              },
            ],
            keywords: ["évaluation", "pilotage", "prévention des risques"],
          },
        ],
      },
      {
        id: "c4",
        title: "Mise à jour",
        lessons: [
          {
            id: "l5",
            num: "Leçon 5",
            title: "Pérenniser les acquis",
            duration: "5 min",
            content: [
              {
                type: "p",
                text: "La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité.",
              },
              {
                type: "p",
                text: "Elle est importante aussi pour le rayonnement des Villes par l'exploitation des supports de publicité, et favorisera l'essor de l'activité en adéquation avec l'urbanisation.",
              },
              {
                type: "p",
                text: "Elle consiste à s'assurer que le secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, dans son évolution, soit en phase avec celle démographique et le développement infrastructurel des Villes.",
              },
            ],
            keywords: ["mise à jour", "pérennité", "urbanisation"],
          },
        ],
      },
    ],
  },
];

export const allLessons = curriculum
  .flatMap((m) =>
    m.chapters.flatMap((c) =>
      c.lessons.map((l) => ({ ...l, chapter: c.title, module: m.module, chapterId: c.id, moduleId: m.id }))
    )
  )
  .map((l, i, arr) => ({ ...l, prev: arr[i - 1]?.id ?? null, next: arr[i + 1]?.id ?? null }));

export const getLesson = (id) => allLessons.find((l) => l.id === id) ?? null;

/** Aplatit une leçon en segments lisibles (pour le TTS et la surbrillance). */
export function lessonSegments(lesson) {
  const segs = [];
  lesson.content.forEach((block, i) => {
    if (block.type === "p" || block.type === "callout" || block.type === "quote") {
      segs.push({ blockIndex: i, text: block.text });
    } else if (block.type === "list") {
      block.items.forEach((it) => segs.push({ blockIndex: i, text: it }));
    } else if (block.type === "steps") {
      block.items.forEach((it) =>
        segs.push({ blockIndex: i, text: `${it.title}. ${it.text}` })
      );
    }
  });
  return segs;
}

/** Questionnaire (définitions + questions du PDF). */
export const questionnaire = {
  definitions: [
    { id: "d1", term: "Panneautique", answer: terms.panneautique.def },
    { id: "d2", term: "Zonage", answer: terms.zonage.def },
    { id: "d3", term: "Mobilier Urbain de Publicité", answer: terms.mup.def },
    { id: "d4", term: "Régie publicitaire", answer: terms.regie.def },
    { id: "d5", term: "Pollution visuelle", answer: terms.pollution.def },
  ],
  openQuestions: [
    { id: "q6", text: "En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?", answer: "Elle consiste à passer par les sept étapes clés : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion des régies publicitaires, afin de sortir le secteur de l'anarchie et du désordre." },
    { id: "q7", text: "En quoi consiste le réaménagement de l'espace publicitaire d'une Ville, du point de vue de l'exploitation du Mobilier Urbain de Publicité ?", answer: "Il consiste à délimiter des espaces selon des normes spécifiques du territoire et à proposer des supports facteurs d'embellissement et symboles de modernité, faisant des panneaux de véritables meubles de décoration urbaine." },
    { id: "q8", text: "Comment prévenir la pollution visuelle due à l'exploitation des panneaux publicitaires ?", answer: "En encadrant strictement le secteur : audit, normes et réglementations, zonage harmonieux, équilibre des lots entre régies, et évaluation continue du processus." },
    { id: "q9", text: "Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur d'exploitation des panneaux publicitaires ?", answer: "Par un mécanisme d'évaluation scientifiquement soutenable, une mise à jour régulière en phase avec la démographie et le développement infrastructurel, et une gestion transparente, professionnelle et efficiente." },
    { id: "q10", text: "Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?", answer: "Non. L'implantation doit respecter un zonage établi selon des normes spécifiques du territoire, pour éviter la pollution visuelle, l'insalubrité et l'insécurité, et garantir un paysage publicitaire harmonieux." },
    { id: "q11", text: "Quelle est l'importance du panneau publicitaire dans une Ville ?", answer: "Il booste la concurrence et l'économie, stimule la consommation, et par ses aménagements contribue à l'embellissement et au décor de l'espace public." },
    { id: "q12", text: "N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?", answer: "Non. L'activité doit être réglementée et encadrée : les espaces sont attribués aux régies publicitaires sur la base du cahier des charges du dossier d'appel d'offres." },
  ],
};

/** QCM générés pour la vue quiz. */
export const mcq = [
  {
    id: "mcq1",
    question: "Qu'est-ce que la panneautique ?",
    options: [
      "L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires",
      "La fabrication des panneaux publicitaires en usine",
      "La vente de supports d'affichage au détail",
      "L'impression des affiches publicitaires",
    ],
    correct: 0,
    explain: "La panneautique est un corps de métier pluridisciplinaire : installation et gestion des panneaux publicitaires.",
  },
  {
    id: "mcq2",
    question: "Qu'est-ce que le zonage ?",
    options: [
      "La peinture des supports publicitaires",
      "La délimitation d'espaces selon des normes spécifiques du territoire pour un affichage harmonieux",
      "Le classement des panneaux par taille",
      "La géolocalisation des panneaux par GPS",
    ],
    correct: 1,
    explain: "Le zonage délimite des espaces selon des normes, pour un développement harmonieux et des grilles tarifaires adaptées.",
  },
  {
    id: "mcq3",
    question: "Que désigne le « Mobilier Urbain de Publicité » ?",
    options: [
      "Les panneaux publicitaires devenus de véritables objets d'embellissement et de décoration des Villes",
      "Les abribus uniquement",
      "Le mobilier des bureaux municipaux",
      "Les panneaux de signalisation routière",
    ],
    correct: 0,
    explain: "Le M.U.P. intègre un besoin d'embellissement : les panneaux deviennent des meubles de décoration urbaine.",
  },
  {
    id: "mcq4",
    question: "Qu'est-ce qu'une régie publicitaire ?",
    options: [
      "Une entreprise qui exploite des panneaux à des fins publicitaires",
      "Une administration qui interdit l'affichage",
      "Un organisme de contrôle des impôts",
      "Une association de riverains",
    ],
    correct: 0,
    explain: "Les régies publicitaires sont les acteurs à qui les espaces sont attribués via appel d'offres.",
  },
  {
    id: "mcq5",
    question: "Qu'est-ce que la pollution visuelle ?",
    options: [
      "La pléthore de panneaux publicitaires causant nuisance, insalubrité et insécurité",
      "L'éclairage nocturne des panneaux",
      "La présence d'affiches en intérieur",
      "Les couleurs trop vives sur une affiche",
    ],
    correct: 0,
    explain: "Un secteur mal encadré où règnent l'anarchie et le désordre génère la pollution visuelle.",
  },
  {
    id: "mcq6",
    question: "Quelle est la première étape de la réorganisation du secteur ?",
    options: ["L'audit", "La mise en concession", "La gestion des régies", "La constitution des lots"],
    correct: 0,
    explain: "Tout commence par l'audit de la gestion en cours : liste exhaustive des acteurs et examen du cahier des charges.",
  },
  {
    id: "mcq7",
    question: "Sur quelle base se fait l'attribution des espaces publicitaires aux régies ?",
    options: [
      "Le cahier des charges du dossier d'appel d'offres",
      "Le choix personnel du maire",
      "L'ancienneté des entreprises",
      "Le tirage au sort",
    ],
    correct: 0,
    explain: "L'attribution est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres.",
  },
  {
    id: "mcq8",
    question: "Pourquoi le panneau publicitaire est-il important pour l'économie ?",
    options: [
      "Il booste la concurrence et propulse la compétitivité des acteurs économiques",
      "Il rapporte des impôts directs aux citoyens",
      "Il remplace la presse écrite",
      "Il n'a aucun impact économique",
    ],
    correct: 0,
    explain: "Vecteur de publicité, il stimule la consommation et renforce la compétitivité des entreprises.",
  },
  {
    id: "mcq9",
    question: "Que permet l'évaluation du système d'exploitation des supports ?",
    options: [
      "Prévenir les risques de dérapage et sécuriser les intérêts des acteurs et des populations",
      "Augmenter le nombre de panneaux",
      "Supprimer toutes les régies publicitaires",
      "Éviter le paiement des taxes",
    ],
    correct: 0,
    explain: "Le mécanisme d'évaluation, scientifiquement soutenable, prévient les dérapages et sécurise les acteurs à long terme.",
  },
  {
    id: "mcq10",
    question: "En quoi consiste la mise à jour du secteur ?",
    options: [
      "Assurer que le secteur évolue en phase avec la démographie et le développement infrastructurel des Villes",
      "Remplacer tous les panneaux chaque année",
      "Changer le nom du ministère de tutelle",
      "Interdire la publicité en ville",
    ],
    correct: 0,
    explain: "La mise à jour pérennise les acquis et garde le secteur en adéquation avec l'urbanisation.",
  },
];
