export const RECIPIENTS_MAPPING = [
  { id: "heparine", label: "Héparine de Lithium", image: "/CBW/recipient/heparine.jpg" },
  { id: "citrate", label: "Citrate de Sodium 9NC", image: "/CBW/recipient/citrate.jpg" },
  { id: "sec_activateur", label: "Sec + activateur de la coagulation", image: "/CBW/recipient/sec_activateur.jpg" },
  { id: "edta", label: "EDTA K3 ou EDTA K2", image: "/CBW/recipient/edta.jpg" },
  { id: "sst", label: "Tube sec SST avec séparateur de sérum", image: "/CBW/recipient/sst.jpg" },
  { id: "fluorure", label: "Florure de Sodium", image: "/CBW/recipient/bch_gris.jpg" },
  { id: "urine", label: "Flacon stérile pour recueil d'urines", image: "/CBW/recipient/urine.jpg" },
  { id: "flacon_24h", label: "Flacon 24h", image: "/CBW/recipient/flc_24h.jpg" },
];

export const getRecipientImage = (id: string) => {
  const recipient = RECIPIENTS_MAPPING.find(r => r.id === id);
  return recipient ? recipient.image : "https://placehold.co/40x80?text=Tube";
};

export const getRecipientLabel = (id: string) => {
  const recipient = RECIPIENTS_MAPPING.find(r => r.id === id);
  return recipient ? recipient.label : id;
};
