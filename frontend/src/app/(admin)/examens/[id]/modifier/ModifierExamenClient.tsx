"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import { FaSave, FaInfoCircle, FaVial, FaMicroscope, FaFileInvoiceDollar, FaBolt, FaUtensils } from "react-icons/fa";
import apiClient from "@/lib/apiClient";

import { RECIPIENTS_MAPPING } from "@/constants/recipients";
import { Examen } from "@/data/examens";

interface DynamicOption {
  id: number;
  nom: string;
}

interface ModifierExamenClientProps {
  id: string;
}

export default function ModifierExamenClient({ id }: ModifierExamenClientProps) {
  const router = useRouter();
  
  const [isMounting, setIsMounting] = useState(true);
  const [specialites, setSpecialites] = useState<DynamicOption[]>([]);
  const [laboratoires, setLaboratoires] = useState<DynamicOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState<any>({
    nom: "",
    code: "",
    code_kalisil: "",
    specialite: "",
    laboratoireExecutant: "",
    type: "Interne",
    a_jeun: false,
    urgent: false,
    recipients: [] as string[],
    typePrelevement: "",
    quantiteMinimale: "",
    technique: "",
    delai: "",
    cotation: "",
    prix: "",
    synonymes: [],
    nature: "",
    volume: "",
    echantillon: "",
    preparationPatient: "",
    instructionsComplementaires: "",
    conditions: [],
    commentaires: [],
    ficheRenseignements: false,
    temperatureTransport: "",
    frequence: "",
    dureeConservation: "",
    temperatureConservation: "",
    dureeStabiliteTheorique: "",
    lienExterne: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const [examenData, specs, labs] = await Promise.all([
          apiClient.get<Examen>(`/api/v1/examens/${id}`),
          apiClient.get<DynamicOption[]>("/api/v1/specialites/"),
          apiClient.get<DynamicOption[]>("/api/v1/laboratoires/")
        ]);

        setFormData({
          nom: examenData.nom || "",
          code: examenData.code || "",
          code_kalisil: examenData.code_kalisil || "",
          specialite: examenData.specialite || "",
          laboratoireExecutant: examenData.laboratoireExecutant || "",
          type: examenData.type || "Interne",
          a_jeun: !!examenData.a_jeun,
          urgent: !!examenData.urgent,
          recipients: examenData.recipients || [],
          typePrelevement: examenData.typePrelevement || "",
          quantiteMinimale: examenData.quantiteMinimale || "",
          technique: examenData.technique || "",
          delai: examenData.delai || "",
          cotation: examenData.cotation || "",
          prix: examenData.prix || "",
          synonymes: examenData.synonymes || [],
          nature: examenData.nature || "",
          volume: examenData.volume || "",
          echantillon: examenData.echantillon || "",
          preparationPatient: examenData.preparationPatient || "",
          instructionsComplementaires: examenData.instructionsComplementaires || "",
          conditions: examenData.conditions || [],
          commentaires: examenData.commentaires || [],
          ficheRenseignements: !!examenData.ficheRenseignements,
          temperatureTransport: examenData.temperatureTransport || "",
          frequence: examenData.frequence || "",
          dureeConservation: examenData.dureeConservation || "",
          temperatureConservation: examenData.temperatureConservation || "",
          dureeStabiliteTheorique: examenData.dureeStabiliteTheorique || "",
          lienExterne: examenData.lienExterne || ""
        });

        setSpecialites(specs);
        setLaboratoires(labs);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        alert("Impossible de charger les données de l'examen.");
        router.push("/examens");
      } finally {
        setFetching(false);
        setIsMounting(false);
      }
    };

    fetchData();
  }, [id, router]);

  const toggleRecipient = (recId: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(recId)
        ? prev.recipients.filter(r => r !== recId)
        : [...prev.recipients, recId]
    }));
  };

  const handleSave = async () => {
    if (!formData.nom) {
      alert("Le nom de l'examen est requis");
      return;
    }

    try {
      setLoading(true);
      await apiClient.put(`/api/v1/examens/${id}`, formData);
      alert("Examen mis à jour avec succès !");
      router.push(`/examens/${id}`);
      router.refresh();
    } catch (error: any) {
      console.error("Error updating exam:", error);
      alert(`Erreur lors de la mise à jour: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching || isMounting) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800/50 rounded-lg" />
          </div>
        </div>
        <div className="h-[500px] w-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 rounded-2xl p-8" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins'] tracking-tight">Modifier l'examen</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/examens/${id}`}><Button variant="outline" size="sm">Annuler</Button></Link>
          <Button variant="primary" size="sm" startIcon={<FaSave />} onClick={handleSave} loading={loading}>Enregistrer les modifications</Button>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#26AAD9] mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']">
            <FaInfoCircle /> Informations Générales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><Label>Nom de l'examen</Label><Input placeholder="ex: ACIDE LACTIQUE" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} /></div>
              <div><Label>Code Interne</Label><Input placeholder="ex: ALAC" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} /></div>
              <div><Label>Code KaliSil</Label><Input placeholder="ex: KS-001" value={formData.code_kalisil} onChange={(e) => setFormData({ ...formData, code_kalisil: e.target.value })} /></div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><Label>Spécialité</Label><Select placeholder="Choisir..." value={formData.specialite} options={specialites.map(s => ({ label: s.nom, value: s.nom }))} onChange={(val) => setFormData({ ...formData, specialite: val })} /></div>
              <div><Label>Laboratoire Exécutant</Label><Select placeholder="Choisir..." value={formData.laboratoireExecutant} options={laboratoires.map(l => ({ label: l.nom, value: l.nom }))} onChange={(val) => setFormData({ ...formData, laboratoireExecutant: val })} /></div>
              <div><Label>Type d'examen</Label><Select placeholder="Choisir..." options={[{ label: "Interne", value: "Interne" }, { label: "Externe (Cerba)", value: "Externe (Cerba)" }]} value={formData.type} onChange={(val) => setFormData({ ...formData, type: val })} /></div>
            </div>

            <div className="flex gap-8 md:col-span-2">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${formData.a_jeun ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => setFormData({...formData, a_jeun: !formData.a_jeun})}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.a_jeun ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaUtensils className={formData.a_jeun ? 'text-orange-500' : 'text-gray-400'} /> À JEUN
                  </span>
               </label>

               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${formData.urgent ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => setFormData({...formData, urgent: !formData.urgent})}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.urgent ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FaBolt className={formData.urgent ? 'text-red-500' : 'text-gray-400'} /> URGENT
                  </span>
               </label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#26AAD9] mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']"><FaVial /> Phase Pré-analytique</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div><Label>Type de prélèvement</Label><Input placeholder="Sang veineux, LCR..." value={formData.typePrelevement} onChange={(e) => setFormData({ ...formData, typePrelevement: e.target.value })} /></div>
            <div><Label>Quantité minimale</Label><Input placeholder="0.5 mL..." value={formData.quantiteMinimale} onChange={(e) => setFormData({ ...formData, quantiteMinimale: e.target.value })} /></div>

            <div className="md:col-span-2">
              <Label className="mb-4">Récipients / Tubes autorisés</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RECIPIENTS_MAPPING.map((rec) => (
                  <label
                    key={rec.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${formData.recipients.includes(rec.id)
                        ? "bg-brand-50 border-brand-200 dark:bg-brand-900/10 dark:border-brand-900/30"
                        : "bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-700 hover:border-brand-200"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.recipients.includes(rec.id)}
                      onChange={() => toggleRecipient(rec.id)}
                    />
                    <div className="relative w-6 h-9 flex-shrink-0">
                      <img
                        src={rec.image}
                        alt={rec.label}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as any).src = "https://placehold.co/40x80?text=Tube";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold leading-tight ${formData.recipients.includes(rec.id) ? "text-brand-600" : "text-gray-700 dark:text-gray-300"}`}>
                        {rec.label}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.recipients.includes(rec.id) ? "bg-brand-500 border-brand-500" : "border-gray-300"}`}>
                      {formData.recipients.includes(rec.id) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#26AAD9] mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']"><FaMicroscope /> Analytique</h3>
            <div className="space-y-4">
              <div><Label>Technique</Label><Input placeholder="Spectrophotométrie..." value={formData.technique} onChange={(e) => setFormData({ ...formData, technique: e.target.value })} /></div>
              <div><Label>Délai de rendu</Label><Input placeholder="1 jour..." value={formData.delai} onChange={(e) => setFormData({ ...formData, delai: e.target.value })} /></div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#26AAD9] mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']"><FaFileInvoiceDollar /> Facturation</h3>
            <div className="space-y-4">
              <div><Label>Cotation</Label><Input placeholder="B 100..." value={formData.cotation} onChange={(e) => setFormData({ ...formData, cotation: e.target.value })} /></div>
              <div><Label>Prix (MAD)</Label><Input placeholder="110 MAD..." value={formData.prix} onChange={(e) => setFormData({ ...formData, prix: e.target.value })} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
