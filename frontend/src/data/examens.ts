export interface Examen {
  id: string;
  nom: string;
  synonymes: string[];
  codeNABM?: string;
  code?: string;
  specialite?: string;
  type: 'Interne' | 'Externe (Cerba)' | string;
  laboratoireExecutant?: string;
  revisionDate?: string;
  
  // Récipients
  recipients: string[]; 

  // Facturation
  prixFixe?: boolean;
  cotation?: string;
  prix?: string;
  prixHN?: string; // Pour les hors nomenclature (Type 2)
  
  // Analyse
  descriptionAnalyse?: string;
  principalesIndications?: string;

  // Pré-analytique
  nature?: string;
  volume?: string;
  typePrélèvement?: string;
  echantillon?: string;
  quantiteMinimale?: string;
  preparationPatient?: string;
  instructionsComplementaires?: string;
  conditions: string[];
  commentaires: string[];
  ficheRenseignements?: boolean; // Type 2 specific

  // Transport / Conservation
  temperatureTransport?: string;

  // Analytique
  technique: string;
  frequence: string;

  // Post-analytique
  delai: string;
  dureeConservation?: string;
  temperatureConservation?: string;
  dureeStabiliteTheorique?: string;

  // Liens
  lienExterne?: string;
}

export const examensMock: Examen[] = [
  {
    id: "A1",
    nom: "17 Hydroxy progestérone",
    synonymes: ["17 OH P", "PROGESTERONE 17 OH", "17 ALPHA HYDROXYPROGESTERONE", "ALPHA HYDOXY PROGESTERONE", "17 OH progestérone"],
    code: "17OHP",
    specialite: "HORMONOLOGIE",
    type: "Interne",
    laboratoireExecutant: "CENTRE DE BIOLOGIE AL WIFAK",
    revisionDate: "05/06/2024 13:38:43",
    recipients: ["vert", "bleu", "rouge", "violet", "jaune"],
    cotation: "B 400 - Code acte : 0383",
    prix: "440 MAD",
    principalesIndications: "Stéroïde intermédiaire dans la biosynthèse des glucocorticoïdes et des androgènes,elle provient de la progestérone et/ou des la 17 OH-prégnénolone. Elle est métabolisée en delta-4-androsténédione (voie des androgènes) ou en 11-désoxycortisol (voie des glucocorticoïdes). Le catabolite urinaire est le prégnanetriol. L'intérêt de son dosage réside dans l'exploration des hyperandrogénies liées à un déficit enzymatique surrénalien en 21-hydroxylase. Rythme circadien.",
    preparationPatient: "Le prélèvement chez la femme doit être effectué en début de phase folliculaire.",
    instructionsComplementaires: "Préciser l'âge, le sexe et la phase du cycle.",
    typePrélèvement: "Sang veineux",
    echantillon: "Sérum ou plasma",
    quantiteMinimale: "0.2 mL sérum ou plasma",
    conditions: [
        "-Plasma/ sérum:",
        "Réfrigéré (2-8 °C): 3 jours.",
        "Congelé (-15 à -25°C): 3 mois."
    ],
    commentaires: [],
    temperatureTransport: "Réfrigéré",
    technique: "ELISA",
    frequence: "2 Jours",
    delai: "2 jours",
    dureeConservation: "4 jours",
    temperatureConservation: "Réfrigérée 2-8°C",
    dureeStabiliteTheorique: "4 jours"
  },
  {
    id: "A11",
    nom: "11 DESOXYCORTICOSTERONE - Sérum",
    synonymes: ["DOC"],
    type: "Externe (Cerba)",
    laboratoireExecutant: "Cerba",
    revisionDate: "21/12/2023 14:38:50",
    ficheRenseignements: true,
    specialite: "Endocrinologie",
    prixFixe: true,
    prixHN: "51,00 €",
    prix: "560 MAD", // Equivalent MAD approx
    nature: "Sérum",
    volume: "1 ml",
    recipients: ["rouge"],
    temperatureTransport: "Réfrigéré",
    technique: "LC-MS-MS",
    frequence: "1/s",
    delai: "7 J",
    conditions: [],
    commentaires: [],
    lienExterne: "https://www.lab-cerba.com/"
  },
  {
    id: "A7",
    nom: "ACIDE LACTIQUE",
    synonymes: ["LACTATE"],
    codeNABM: "0530",
    specialite: "Diabétologie",
    type: "Externe (Cerba)",
    laboratoireExecutant: "Cerba",
    recipients: ["gris"], 
    prixFixe: true,
    cotation: "B 100",
    prix: "110 MAD",
    nature: "Surnageant",
    volume: "1 ml",
    typePrélèvement: "Sang veineux ou LCR",
    quantiteMinimale: "0.5mL",
    conditions: ["Congélation immédiate requise", "Échantillon limpide obligatoire"],
    commentaires: [
      "Le repos avant le prélèvement est préférable",
      "Le taux de lactate augmente rapidement en cours d’exercice physique."
    ],
    temperatureTransport: "Congelé",
    technique: "Spectrophotométrie d'absorption-Enzymatique, colorimétrique (LOD/PAP)",
    frequence: "5/s (Chaque jour)",
    delai: "1 jour",
    lienExterne: "http://cerbaexamen.fr/"
  }
];
