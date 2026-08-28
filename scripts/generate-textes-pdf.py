#!/usr/bin/env python3
"""Génère un PDF inventaire des textes affichés sur la landing Panotik / aanid."""

from pathlib import Path
from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "docs" / "panotik-textes-sections.pdf"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_I = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf"


class Doc(FPDF):
    def __init__(self):
        super().__init__(format="A4")
        self.add_font("DejaVu", "", FONT)
        self.add_font("DejaVu", "B", FONT_B)
        self.add_font("DejaVu", "I", FONT_I)

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("DejaVu", "I", 9)
        self.set_text_color(120, 110, 100)
        self.cell(0, 8, "Panotik - Textes affichés sur le site", align="L")
        self.ln(12)

    def footer(self):
        self.set_y(-15)
        self.set_font("DejaVu", "I", 8)
        self.set_text_color(140, 130, 120)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def cover(self):
        self.add_page()
        self.ln(50)
        self.set_font("DejaVu", "B", 28)
        self.set_text_color(46, 42, 36)
        self.multi_cell(0, 14, "Panotik  ×  aanid", align="C")
        self.ln(6)
        self.set_font("DejaVu", "", 14)
        self.set_text_color(140, 106, 67)
        self.multi_cell(0, 8, "Les textes du site, partie par partie", align="C")
        self.ln(4)
        self.set_font("DejaVu", "", 11)
        self.set_text_color(90, 85, 78)
        self.multi_cell(
            0,
            7,
            "Ce document reprend simplement ce que le visiteur lit\n"
            "sur chaque partie de la page d'accueil.",
            align="C",
        )
        self.ln(20)
        self.set_font("DejaVu", "I", 10)
        self.multi_cell(0, 6, "Site : panotik.site", align="C")

    def section_title(self, number, title):
        self.ln(4)
        self.set_fill_color(46, 42, 36)
        self.set_text_color(249, 241, 229)
        self.set_font("DejaVu", "B", 12)
        self.cell(0, 10, f"  {number}  -  {title}", fill=True, new_x="LMARGIN", new_y="NEXT")
        self.ln(4)
        self.set_text_color(46, 42, 36)

    def label(self, text):
        self.set_font("DejaVu", "B", 10)
        self.set_text_color(140, 106, 67)
        self.cell(0, 6, text, new_x="LMARGIN", new_y="NEXT")
        self.set_text_color(46, 42, 36)

    def body(self, text):
        self.set_font("DejaVu", "", 10)
        self.set_text_color(46, 42, 36)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def quote(self, text):
        self.set_font("DejaVu", "I", 10)
        self.set_text_color(70, 65, 58)
        self.multi_cell(0, 5.5, f"« {text} »")
        self.ln(2)
        self.set_text_color(46, 42, 36)

    def bullet(self, text):
        self.set_font("DejaVu", "", 10)
        self.set_x(self.l_margin + 4)
        self.multi_cell(self.epw - 4, 5.5, f"• {text}")
        self.ln(1)


def build():
    pdf = Doc()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(18, 18, 18)

    pdf.cover()

    # --- Navbar ---
    pdf.add_page()
    pdf.section_title("01", "Barre de navigation (en haut)")
    pdf.label("Nom affiché")
    pdf.body("Panotik\naanid")
    pdf.label("Liens du menu")
    for item in ["Le constat", "Fonctionnalités", "Formation", "Publics"]:
        pdf.bullet(item)
    pdf.label("Boutons")
    pdf.bullet("Télécharger")
    pdf.bullet("Télécharger aanid  (sur téléphone)")

    # --- Chapter HUD ---
    pdf.section_title("02", "Indicateur de progression")
    pdf.label("Les étapes du parcours")
    for i, label in enumerate(
        ["Ouverture", "Le constat", "Fonctionnalités", "Formation", "Publics", "Le départ"],
        start=1,
    ):
        pdf.bullet(f"{i:02d} / 06 - {label}")

    # --- Hero ---
    pdf.section_title("03", "Accueil - Ouverture")
    pdf.label("Petite mention")
    pdf.quote("00 / 06 - Ouverture")
    pdf.label("Grand titre")
    pdf.quote("La nuit,\nvos panneaux s'éteignent.")
    pdf.label("Texte d'introduction")
    pdf.body(
        "aanid, l'application Panotik, rallume la panneautique urbaine : "
        "signalement, cartographie et valorisation des panneaux publicitaires, "
        "pour les citoyens comme pour les autorités."
    )
    pdf.label("Boutons")
    pdf.bullet("Télécharger aanid")
    pdf.bullet("Découvrir l'histoire")
    pdf.label("Chiffres mis en avant")
    pdf.bullet("128 panneaux")
    pdf.bullet("9 opportunités")
    pdf.bullet("24 formations")

    # --- Presentation ---
    pdf.section_title("04", "Le constat")
    pdf.label("Petite mention")
    pdf.quote("Le constat")
    pdf.label("Titre")
    pdf.quote("La panneautique urbaine se dégrade dans l'ombre.")
    pdf.label("Texte d'introduction")
    pdf.body(
        "aanid est la plateforme de Panotik dédiée à la gestion urbaine, "
        "la formation professionnelle et l'optimisation de l'exploitation du "
        "mobilier urbain de publicité en Afrique et au-delà- afin que chaque Ville "
        "sache ce qu'elle possède, l'entretienne et le rentabilise."
    )
    pdf.label("Carte 1 - Un hub par ville")
    pdf.body(
        "Chaque ville dispose de son espace : relais publicitaire, formations, "
        "état des lieux et fil social. Sélectionnez votre ville et accédez à tout, "
        "sans vous déconnecter."
    )
    pdf.label("Carte 2 - Une communauté connectée")
    pdf.body(
        "Citoyens, professionnels, régies publicitaires, formateurs et autorités "
        "locales collaborent sur une même plateforme, chacun dans son rôle, avec ses outils."
    )
    pdf.label("Carte 3 - Des données exploitables")
    pdf.body(
        "Cartographie, statistiques et études sur mesure : aanid transforme les "
        "signalements du terrain en analyses utiles pour moderniser la panneautique."
    )

    # --- Features ---
    pdf.add_page()
    pdf.section_title("05", "Fonctionnalités")
    pdf.label("Petite mention")
    pdf.quote("Fonctionnalités")
    pdf.label("Titre")
    pdf.quote("Huit outils, un seul boulevard.")
    pdf.label("Texte d'introduction")
    pdf.body(
        "Du signalement citoyen à l'étude commandée par une collectivité - "
        "faites défiler pour parcourir chaque panneau."
    )

    features = [
        (
            "1 - Villes - le hub central",
            "Choisissez une ville et retrouvez ses 4 rubriques : relais, formations, états des lieux et posts.",
        ),
        (
            "2 - Relais publicitaire",
            "Les annonceurs publient des missions de relais, les citoyens et professionnels postulent et sont payés via Mobile Money.",
        ),
        (
            "3 - Formation",
            "Introduction :\n\n"
            "La panneautique est une science pluridisciplinaire. En tant que telle, elle requiert plusieurs compétences pour sa réussite à savoir: un architecte urbaniste, un paysagiste, un spécialiste en communication, un géographe, un juriste, un expert en sécurité routière et un modeleur 3D.\n\n"
            "L'étudiant en panneautique bénéficiera donc au cours de sa formation des interventions, à titre de consultants, des experts dans chacun des domaines sus-cités lors des séances en présentiel. Pour une formation aboutie.",
        ),
        (
            "4 - État des lieux",
            "Face aux difficultés d'un état des lieux de l'aménagement existant et surtout qu'à priori même si nous y parvenions, cela ne sera pas d'un intérêt véritable dans le cadre de aanid qui a pour but véritable de sensibiliser les autorités et citoyens; et servir de levier à la réforme d'un secteur qui en définitive est propulseur de l'économie.\n\n"
            "Je suggère, au lieu d'un état des lieux de terrain, de partir d'indicateurs de développement dans le secteur. Faire un référencement en fonction de l'inexistant : le système signalera l'absence de supports modernes (pilotés à distance et numériques).\n\n"
            "En résumé, si aanid n'identifie pas de supports pilotables à distance, il signalera à l'utilisateur que la ville est en retard et nécessite un réaménagement. Il restera les cas de pléthore, de pollution visuelle et de dégradation, fournis par nos points focaux.",
        ),
        (
            "5 - Carte interactive",
            "Visualisez panneaux, signalements et zones sur une carte avec clustering et heatmap. Filtrez par ville, type, état ou date.",
        ),
        (
            "6 - Posts & réseaux",
            "Un fil social par ville autour de l'environnement, la santé, la famille et l'urbanisme.",
        ),
        (
            "7 - Consultation",
            "Commandez une étude sur la panneautique de votre ville : cartographie, conformité, étude de marché.",
        ),
        (
            "8 - Comptes & rôles",
            "Inscription sécurisée avec vérification email. Six rôles adaptés, du citoyen à l'administrateur.",
        ),
    ]
    for title, text in features:
        pdf.label(title)
        pdf.body(text)

    # --- Pricing ---
    pdf.add_page()
    pdf.section_title("06", "Formation et tarifs")
    pdf.label("Petite mention")
    pdf.quote("L'investissement")
    pdf.label("Titre")
    pdf.quote("Une formation qui se débloque, comme la ville s'éclaire.")
    pdf.label("Texte d'introduction")
    pdf.body(
        "La formation officielle aanid sur la panneautique, payable en tranches : "
        "500 000 FCFA pour l'ensemble du parcours."
    )
    pdf.label("Étape 1 - Inscription - accès au Module 1 - 100 000 FCFA")
    pdf.body(
        "Panneautique : domaine public. Introduction, réorganisation du secteur "
        "(audit, état des lieux, zonage), mise en concession, évaluation des supports "
        "et questionnaires."
    )
    pdf.label("Étape 2 - Accès au Module 2 - 250 000 FCFA")
    pdf.body(
        "Panneautique : domaine privé. Cadre juridique de l'affichage privé, "
        "contractualisation, fiscalité et redevances, gestion du parc privé."
    )
    pdf.label("Étape 3 - Mensualité de suivi - 50 000 FCFA / mois")
    pdf.body(
        "Suivi de formation pendant toute sa durée : accompagnement, corrections "
        "et évaluation continue jusqu'à la fin du parcours."
    )
    pdf.label("Formation complète - 500 000 FCFA au total")
    for item in [
        "Modules débloqués au fur et à mesure des paiements",
        "Paiement de chaque tranche via Mobile Money (KKiaPay)",
        "Suivi de progression, badges et certificat",
        "Accessible directement depuis l'application",
    ]:
        pdf.bullet(item)
    pdf.label("Bouton")
    pdf.bullet("S'inscrire à la formation")
    pdf.label("Précision")
    pdf.body(
        "L'application propose aussi des formations gratuites (environnement, espaces verts…) "
        "et d'autres formations payantes comme les premiers secours en milieu urbain."
    )

    # --- Audiences ---
    pdf.section_title("07", "Pour qui ?")
    pdf.label("Petite mention")
    pdf.quote("Les publics")
    pdf.label("Titre")
    pdf.quote("Six rôles, une même rue éclairée.")
    pdf.label("Texte d'introduction")
    pdf.body(
        "aanid réunit tous les acteurs de la panneautique urbaine autour d'outils "
        "adaptés à leur rôle."
    )
    audiences = [
        (
            "Citoyens",
            "Signalez les panneaux dégradés de votre quartier, suivez la vie de votre ville et accédez aux formations gratuites.",
        ),
        (
            "Professionnels",
            "Décrochez des missions de relais publicitaire rémunérées et développez vos compétences avec des certifications.",
        ),
        (
            "Annonceurs",
            "Diffusez vos campagnes grâce au réseau de relais et repérez les meilleurs emplacements.",
        ),
        (
            "Régies publicitaires",
            "Gérez votre inventaire de panneaux, analysez vos campagnes et pilotez votre activité via l'accès API administrateur complet et sécurisé.",
        ),
        (
            "Formateurs",
            "Créez et monétisez vos formations en signalétique, environnement, santé ou infrastructure.",
        ),
        (
            "Autorités & collectivités",
            "Supervisez les signalements, accédez aux statistiques de votre territoire et commandez des études pour réformer le secteur en profondeur.",
        ),
    ]
    for title, text in audiences:
        pdf.label(title)
        pdf.body(text)

    # --- Final CTA ---
    pdf.add_page()
    pdf.section_title("08", "Appel à l'action - Le départ")
    pdf.label("Petite mention")
    pdf.quote("05 / 06 - Le départ")
    pdf.label("Titre")
    pdf.quote("Rallumez\nvotre ville.")
    pdf.label("Texte")
    pdf.body(
        "Téléchargez aanid, l'application Panotik, et rejoignez les citoyens, "
        "professionnels et collectivités qui transforment déjà la signalétique urbaine."
    )
    pdf.label("Boutons")
    pdf.bullet("Télécharger l'application")
    pdf.bullet("Contacter l'équipe")
    pdf.label("Précision")
    pdf.body(
        "Une question, un projet d'étude ou une inscription à la formation ? "
        "Écrivez-nous, nous répondons rapidement."
    )

    # --- Footer ---
    pdf.section_title("09", "Pied de page")
    pdf.label("Présentation")
    pdf.body(
        "Panotik\n"
        "aanid\n"
        "Panotik édite aanid, l'application de gestion de la panneautique urbaine. "
        "Gestion urbaine, formation et signalétique publicitaire en Afrique."
    )
    pdf.label("Liens - Produit")
    for item in ["aanid", "Fonctionnalités", "Formation & tarifs", "Pour qui ?"]:
        pdf.bullet(item)
    pdf.label("Liens - Société")
    for item in ["À propos de Panotik", "Contact", "Consultation & études"]:
        pdf.bullet(item)
    pdf.label("Liens - Légal")
    for item in ["Mentions légales", "Conditions générales", "Confidentialité"]:
        pdf.bullet(item)
    pdf.label("Mention légale")
    pdf.body("© 2026 Panotik. Tous droits réservés.")

    # --- Meta ---
    pdf.section_title("10", "Titre de l'onglet du navigateur")
    pdf.label("Titre")
    pdf.quote("Panotik - aanid, gestion de la panneautique urbaine")
    pdf.label("Courte description")
    pdf.body(
        "Panotik présente aanid - l'application de gestion de la panneautique urbaine : "
        "relais publicitaire, formations, états des lieux et carte interactive."
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
