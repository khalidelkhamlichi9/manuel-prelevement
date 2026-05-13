import React from "react";
import Link from "next/link";
import { Examen } from "@/data/examens";
import { FaArrowLeft, FaPrint, FaEdit, FaInfoCircle, FaVial, FaMicroscope, FaFileInvoiceDollar, FaFilePdf, FaTemperatureHigh, FaClock, FaHistory, FaUserTag, FaFlask, FaCheckCircle, FaExclamationTriangle, FaUtensils, FaBolt } from "react-icons/fa";
import Button from "@/components/ui/button/Button";
import { RECIPIENTS_MAPPING } from "@/constants/recipients";
import Image from "next/image";
import HeaderActions from "./HeaderActions";



export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/v1/examens/`);
    if (!res.ok) return [];
    const examens: Examen[] = await res.json();
    return examens.map((examen) => ({
      id: examen.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ExamenDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  let examen: Examen | null = null;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/v1/examens/${id}`, { cache: 'no-store' });
    if (res.ok) {
      examen = await res.json();
    }
  } catch (error) {
    console.error("Error fetching examen:", error);
  }

  if (!examen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Examen introuvable</h2>
      
      </div>
    );
  }

  const isExternal = examen.type.includes("Cerba") || examen.laboratoireExecutant?.toLowerCase() === "cerba";

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6">
        <div className="flex items-start gap-5">
          <Link href="/examens" className="mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-theme-xs">
            <FaArrowLeft className="text-gray-500" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
               <h2 className="text-3xl font-bold text-gray-800 dark:text-white font-['Poppins'] tracking-tight">
                {examen.nom}
              </h2>
              <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                isExternal ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" : "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
              }`}>
                {examen.type}
              </span>
              {examen.a_jeun && (
                <span className="px-3 py-1 bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <FaUtensils className="text-[10px]" /> À JEUN
                </span>
              )}
              {examen.urgent && (
                <span className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse">
                  <FaBolt className="text-[10px]" /> URGENT
                </span>
              )}
              {examen.ficheRenseignements && (
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 dark:bg-red-500/10 dark:text-red-400">
                  <FaExclamationTriangle /> Fiche de renseignements requise
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 font-['Poppins']">
              <span className="flex items-center gap-2">
                <span className="font-bold text-gray-400 uppercase text-[10px]">Code</span>
                <span className="font-mono font-bold text-gray-700 dark:text-gray-300">{examen.codeNABM || examen.code || "N/A"}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-gray-400 uppercase text-[10px]">Spécialité</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{examen.specialite || "N/A"}</span>
              </span>
              {examen.revisionDate && (
                <span className="flex items-center gap-2">
                  <FaHistory className="text-gray-300" />
                  <span className="text-xs">Révisé le {examen.revisionDate}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <HeaderActions examenId={examen.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Analyse / Indications */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-theme-sm">
             <h3 className="text-lg font-semibold text-[#26AAD9] mb-6 flex items-center gap-2 font-['Poppins'] uppercase tracking-wide border-b border-gray-50 dark:border-gray-800 pb-4">
                <FaInfoCircle /> Analyse
             </h3>
             <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2 font-['Poppins']">Synonymes</p>
                  <div className="flex flex-wrap gap-2">
                    {examen.synonymes.map((syn, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-lg border border-gray-100 dark:border-gray-700 font-['Poppins']">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
                {examen.principalesIndications && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2 font-['Poppins']">Principales indications</p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 text-justify font-['Poppins']">
                      {examen.principalesIndications}
                    </p>
                  </div>
                )}
             </div>
          </div>

          {/* Section: Pré-analytique */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-theme-sm">
             <h3 className="text-lg font-semibold text-[#26AAD9] mb-6 flex items-center gap-2 font-['Poppins'] uppercase tracking-wide border-b border-gray-50 dark:border-gray-800 pb-4">
                <FaVial /> Phase Pré-analytique
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Récipients */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-4 flex items-center gap-2 font-['Poppins']">
                    <FaFlask className="text-[#8dc549]" /> Récipients & Tubes
                  </p>
                  <div className="flex flex-wrap gap-5">
                    {examen.recipients.map((recId, i) => {
                      const recipient = RECIPIENTS_MAPPING.find(r => r.id === recId);
                      return (
                        <div key={i} className="flex flex-col items-center gap-2">
                           <div
                              className={`relative w-8 h-12 transition-transform hover:scale-110 cursor-help ${recId === 'flc_24h' ? 'w-12' : ''}`}
                              title={recipient?.label || recId}
                            >
                              <img 
                                src={recipient?.image || "https://placehold.co/40x80?text=Tube"} 
                                alt={recId}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter font-['Poppins']">
                              {recipient?.label || recId}
                            </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Echantillon / Nature */}
                <div className="space-y-4">
                   <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                     <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1 font-['Poppins']">Nature / Échantillon</p>
                     <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-['Poppins']">{examen.nature || examen.echantillon || "-"}</p>
                   </div>
                   <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                     <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1 font-['Poppins']">Type de prélèvement</p>
                     <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-['Poppins']">{examen.typePrélèvement || "-"}</p>
                   </div>
                </div>
             </div>

             {/* Instructions / Préparation */}
             <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50 dark:border-gray-800">
                <div className="space-y-6">
                   {examen.preparationPatient && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-2 font-['Poppins']">
                           <FaUserTag className="text-[#8dc549]" /> Préparation du patient
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-brand-50/50 dark:bg-brand-500/5 p-4 rounded-2xl border border-brand-100 dark:border-brand-500/20 italic font-['Poppins']">
                          "{examen.preparationPatient}"
                        </p>
                      </div>
                   )}
                   {examen.instructionsComplementaires && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2 font-['Poppins']">Instructions complémentaires</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-['Poppins']">
                          {examen.instructionsComplementaires}
                        </p>
                      </div>
                   )}
                </div>

                <div className="space-y-4">
                   <p className="text-xs font-semibold text-gray-400 uppercase mb-3 font-['Poppins']">Conditions d'acheminement</p>
                   <ul className="space-y-3">
                      {examen.conditions.length > 0 ? examen.conditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 font-['Poppins']">
                          <FaCheckCircle className="text-[#8dc549] mt-1 shrink-0" />
                          <span>{cond}</span>
                        </li>
                      )) : (
                        <li className="text-sm text-gray-400 italic font-['Poppins']">Respecter les conditions standards de conservation.</li>
                      )}
                   </ul>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Facturation */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-theme-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#26AAD9]/5 rounded-bl-full -mr-8 -mt-8"></div>
             <h3 className="text-lg font-semibold text-[#26AAD9] mb-6 flex items-center gap-2 font-['Poppins'] uppercase tracking-wide">
                <FaFileInvoiceDollar /> Facturation
             </h3>
             <div className="space-y-5">
                <div className="flex items-center justify-between">
                   <span className="text-xs font-semibold text-gray-400 uppercase font-['Poppins']">Cotation</span>
                   <span className="text-sm font-mono font-semibold text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    {examen.cotation || "Nomenclature"}
                   </span>
                </div>
                {examen.prixHN && (
                   <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400 uppercase font-['Poppins']">Prix HN (Euro)</span>
                      <span className="text-sm font-semibold text-orange-600 font-['Poppins']">{examen.prixHN}</span>
                   </div>
                )}
                <div className="flex flex-col gap-1 pt-5 border-t border-gray-50 dark:border-gray-800">
                   <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center font-['Poppins']">Total en MAD</span>
                   <span className="text-4xl font-bold text-brand-600 dark:text-brand-400 text-center tracking-tight font-['Poppins']">
                    {examen.prix}
                   </span>
                </div>
                {examen.prixFixe && (
                  <div className="text-center">
                    <span className="inline-block px-2 py-0.5 bg-brand-50 text-brand-600 text-[9px] font-bold uppercase rounded dark:bg-brand-500/10 dark:text-brand-400 font-['Poppins']">Prix Fixe</span>
                  </div>
                )}
             </div>
          </div>

          {/* Card: Analytique (Sidebar for small space) */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-theme-sm">
             <h3 className="text-lg font-semibold text-[#26AAD9] mb-6 flex items-center gap-2 font-['Poppins'] uppercase tracking-wide">
                <FaMicroscope /> Analytique
             </h3>
             <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1 font-['Poppins']">Technique</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-['Poppins']">{examen.technique}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1 font-['Poppins']">Fréquence</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-['Poppins']">{examen.frequence}</p>
                </div>
             </div>
          </div>

          {/* Card: Post-analytique (Specific to Type 1) */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-theme-sm">
             <h3 className="text-lg font-semibold text-[#26AAD9] mb-6 flex items-center gap-2 font-['Poppins'] uppercase tracking-wide">
                <FaClock /> Post-analytique
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-['Poppins']">
                   <span className="text-gray-500">Délai de rendu</span>
                   <span className="font-semibold text-gray-800 dark:text-gray-200">{examen.delai}</span>
                </div>
                {examen.dureeConservation && (
                   <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-50 dark:border-gray-800 font-['Poppins']">
                      <span className="text-gray-500">Conservation (jours)</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{examen.dureeConservation}</span>
                   </div>
                )}
                {examen.temperatureConservation && (
                   <div className="flex justify-between items-center text-sm font-['Poppins']">
                      <span className="text-gray-500">Temp. conservation</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{examen.temperatureConservation}</span>
                   </div>
                )}
             </div>
          </div>

          {/* Card: Liens & Documents */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-theme-sm">
             <h3 className="text-lg font-semibold text-[#26AAD9] mb-6 flex items-center gap-2 font-['Poppins'] uppercase tracking-wide">
                <FaFilePdf /> Liens / Documents
             </h3>
             <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                   <div className="flex items-center gap-3 font-['Poppins']">
                      <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                        <FaFilePdf className="text-red-500" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fiche technique</span>
                   </div>
                   <FaClock className="text-[10px] text-gray-300 group-hover:text-brand-500" />
                </button>
                {examen.lienExterne && (
                   <a href={examen.lienExterne} target="_blank" className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group font-['Poppins']">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                            <FaFilePdf className="text-blue-500" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Catalogue {examen.laboratoireExecutant}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 group-hover:text-brand-500">Visiter</span>
                   </a>
                )}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
