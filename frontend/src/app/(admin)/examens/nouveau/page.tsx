"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import { FaSave, FaInfoCircle, FaVial, FaMicroscope, FaFileInvoiceDollar, FaBolt, FaUtensils } from "react-icons/fa";
import apiClient from "@/lib/apiClient";

import { RECIPIENTS_MAPPING } from "@/constants/recipients";

interface DynamicOption {
  id: number;
  nom: string;
}


export default function NouveauExamenPage() {
  const router = useRouter();
  const [isMounting, setIsMounting] = useState(true);
  const [specialites, setSpecialites] = useState<DynamicOption[]>([]);
  const [laboratoires, setLaboratoires] = useState<DynamicOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounting(false);
  }, []);

  const [formData, setFormData] = useState({
    nom: "",
    code: "",
    code_kalisil: "",
    specialite: "",
    laboratoireExecutant: "",
    a_jeun: false,
    urgent: false,
    recipients: [] as string[]
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [specs, labs] = await Promise.all([
          apiClient.get<DynamicOption[]>("/api/v1/specialites/"),
          apiClient.get<DynamicOption[]>("/api/v1/laboratoires/")
        ]);
        setSpecialites(specs);
        setLaboratoires(labs);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchOptions();
  }, []);

  const toggleRecipient = (id: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(id)
        ? prev.recipients.filter(r => r !== id)
        : [...prev.recipients, id]
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      alert("Examen enregistré avec succès !");
      router.push("/examens");
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  if (isMounting) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800/50 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
        <div className="h-[500px] w-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-md mb-8" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
                <div className="h-11 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins'] tracking-tight">Ajouter un nouvel examen</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Remplissez les détails techniques du prélèvement.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/examens"><Button variant="outline" size="sm">Annuler</Button></Link>
          <Button variant="primary" size="sm" startIcon={<FaSave />} onClick={handleSave} loading={loading}>Enregistrer l'examen</Button>
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

            <div><Label>Spécialité</Label><Select placeholder="Choisir..." options={specialites.map(s => ({ label: s.nom, value: s.nom }))} onChange={(val) => setFormData({ ...formData, specialite: val })} /></div>
            <div><Label>Laboratoire Exécutant</Label><Select placeholder="Choisir..." options={laboratoires.map(l => ({ label: l.nom, value: l.nom }))} onChange={(val) => setFormData({ ...formData, laboratoireExecutant: val })} /></div>

            <div>
              <Label className="flex items-center gap-2 text-orange-600"><FaUtensils className="text-xs" /> Examen à jeun ?</Label>
              <Select placeholder="Sélectionner..." options={[{ label: "OUI", value: "true" }, { label: "NON", value: "false" }]} onChange={(val) => setFormData({ ...formData, a_jeun: val === "true" })} />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-red-600"><FaBolt className="text-xs" /> Examen urgent ?</Label>
              <Select placeholder="Sélectionner..." options={[{ label: "OUI", value: "true" }, { label: "NON", value: "false" }]} onChange={(val) => setFormData({ ...formData, urgent: val === "true" })} />
            </div>
          </div>
        </div>

        {/* Section Récipients mise à jour */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#26AAD9] mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']"><FaVial /> Phase Pré-analytique</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div><Label>Type de prélèvement</Label><Input placeholder="Sang veineux, LCR..." /></div>
            <div><Label>Quantité minimale</Label><Input placeholder="0.5 mL..." /></div>

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
                          // Fallback si l'image n'existe pas encore
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
              <div><Label>Technique</Label><Input placeholder="Spectrophotométrie..." /></div>
              <div><Label>Délai de rendu</Label><Input placeholder="1 jour..." /></div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#26AAD9] mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']"><FaFileInvoiceDollar /> Facturation</h3>
            <div className="space-y-4">
              <div><Label>Cotation</Label><Input placeholder="B 100..." /></div>
              <div><Label>Prix (MAD)</Label><Input placeholder="110 MAD..." /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
