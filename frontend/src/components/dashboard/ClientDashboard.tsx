"use client";

import React, { useEffect, useState } from "react";
import { FaVial, FaClock, FaCheckCircle, FaFilePdf, FaHistory, FaSearch } from "react-icons/fa";
import apiClient from "@/lib/apiClient";
import Button from "@/components/ui/button/Button";

interface Dossier {
  id: number;
  examen: {
    id: string;
    nom: string;
    type: string;
  };
  date_prelevement: string;
  statut: string;
  commentaire: string | null;
  resultat_pdf: string | null;
}

export default function ClientDashboard() {
  const [dossiers, setDossiers] = useState<Dossier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyDossiers = async () => {
      try {
        const data = await apiClient.get<Dossier[]>("/api/v1/dossiers/me");
        setDossiers(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyDossiers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-50 dark:bg-gray-800/50 rounded-3xl" />
          <div className="h-64 bg-gray-50 dark:bg-gray-800/50 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 to-blue-500 rounded-3xl p-8 text-white shadow-lg">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-['Poppins'] mb-2">Bienvenue sur votre espace personnel</h2>
          <p className="text-blue-50 opacity-90">Suivez l'état de vos analyses en temps réel.</p>
        </div>
        <FaVial className="absolute -right-10 -bottom-10 text-white opacity-10 text-[200px] rotate-12" />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Analyses totales</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{dossiers.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">En cours</p>
          <p className="text-3xl font-bold text-orange-500">{dossiers.filter(d => d.statut !== 'termine').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Résultats disponibles</p>
          <p className="text-3xl font-bold text-green-500">{dossiers.filter(d => d.statut === 'termine').length}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Exams List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 dark:text-white font-['Poppins'] flex items-center gap-2">
              <FaHistory className="text-brand-500" /> Mes analyses récentes
            </h3>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {dossiers.length > 0 ? dossiers.map((d) => (
              <div key={d.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                    d.statut === 'termine' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {d.statut === 'termine' ? <FaCheckCircle /> : <FaClock />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{d.examen.nom}</h4>
                    <p className="text-xs text-gray-500">Prélevé le {new Date(d.date_prelevement).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    d.statut === 'termine' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {d.statut.replace('_', ' ')}
                  </span>
                  {d.statut === 'termine' && (
                    <Button size="sm" variant="outline" startIcon={<FaFilePdf />}>Résultat</Button>
                  )}
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-400 italic">
                Aucune analyse enregistrée pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar : Quick Help/Links */}
        <div className="space-y-6">
          <div className="bg-brand-50 dark:bg-brand-500/5 p-6 rounded-3xl border border-brand-100 dark:border-brand-900/20">
            <h4 className="font-bold text-brand-700 dark:text-brand-400 mb-2">Besoin d'aide ?</h4>
            <p className="text-sm text-brand-600/80 dark:text-brand-300/80 mb-4">Une question sur vos résultats ou sur un prélèvement à venir ?</p>
            <Button size="sm" variant="primary" className="w-full">Nous contacter</Button>
          </div>

          <div className="bg-gray-900 p-6 rounded-3xl text-white">
            <h4 className="font-bold mb-4">Rechercher un examen</h4>
            <p className="text-xs text-gray-400 mb-4">Consultez les conditions de prélèvement pour votre prochaine analyse.</p>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Ex: Glycémie..."
                className="w-full bg-gray-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-brand-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
