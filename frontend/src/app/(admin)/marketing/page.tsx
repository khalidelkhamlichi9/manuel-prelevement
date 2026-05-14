"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { PlusIcon, PieChartIcon } from "@/icons";
import { 
  FaBullhorn, 
  FaEnvelopeOpenText, 
  FaPaperPlane, 
  FaUsers, 
  FaChartLine, 
  FaEllipsisH, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationCircle 
} from "react-icons/fa";
import apiClient from "@/lib/apiClient";

interface Campaign {
  id: number;
  nom: string;
  type: string;
  statut: string;
  created_at: string;
  date_programmee?: string;
  total_destinataires: number;
  total_ouvertures: number;
  total_clics: number;
}

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get<Campaign[]>("/api/v1/marketing/");
      setCampaigns(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la récupération des campagnes");
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (statut: string) => {
    const mapping: Record<string, string> = {
      "brouillon": "Brouillon",
      "programme": "Programmé",
      "envoye": "Envoyé",
      "echec": "Échec"
    };
    return mapping[statut] || statut;
  };

  const getTypeLabel = (type: string) => {
    const mapping: Record<string, string> = {
      "mailing": "Mailing",
      "sms": "SMS",
      "notification": "Notification"
    };
    return mapping[type] || type;
  };

  const calculateOpenRate = (c: Campaign) => {
    if (c.total_destinataires === 0) return "0%";
    return `${Math.round((c.total_ouvertures / c.total_destinataires) * 100)}%`;
  };

  const calculateClickRate = (c: Campaign) => {
    if (c.total_destinataires === 0) return "0%";
    return `${Math.round((c.total_clics / c.total_destinataires) * 100)}%`;
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse p-6">
        <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-50 dark:bg-gray-800/50 rounded-2xl" />)}
        </div>
        <div className="h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl" />
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30">Erreur : {error}</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins'] flex items-center gap-2">
            <FaBullhorn className="text-brand-500" />
            Campagnes Marketing
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos communications et analysez l'impact de vos campagnes.
          </p>
        </div>
        <Button size="sm" variant="primary" startIcon={<PlusIcon className="w-4 h-4" />}>
          Nouvelle Campagne
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-300 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
              <FaPaperPlane className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Envoyés</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {campaigns.filter(c => c.statut === "envoye").reduce((acc, c) => acc + c.total_destinataires, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
            <FaChartLine /> Performance globale
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-300 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600">
              <FaEnvelopeOpenText className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Taux d'ouverture</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {campaigns.length > 0 ? "64.2%" : "0%"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
            <FaChartLine /> +5% vs moyenne
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-300 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">
              <FaUsers className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Abonnés actifs</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">5,200</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
            <FaUsers /> Base qualifiée
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-brand-300 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600">
              <FaClock className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">En attente</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {campaigns.filter(c => c.statut === "programme").length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-orange-500 text-xs font-bold">
            <FaClock /> À venir
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 dark:text-white font-['Poppins'] tracking-tight">Campagnes Récentes</h3>
          <button className="text-gray-400 hover:text-brand-500 transition-colors">
            <FaEllipsisH />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Campagne</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Audience</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Performance</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {campaigns.length > 0 ? campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="py-5 px-6">
                    <p className="font-bold text-gray-800 dark:text-white mb-0.5">{camp.nom}</p>
                    <p className="text-xs text-gray-400 italic">Créée le: {new Date(camp.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="py-5 px-6 text-sm">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      camp.type === 'mailing' ? 'bg-blue-50 text-blue-600' : 
                      camp.type === 'sms' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {getTypeLabel(camp.type)}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    {camp.statut === "envoye" ? (
                      <span className="inline-flex items-center gap-1.5 text-green-500 text-xs font-bold">
                        <FaCheckCircle className="text-[10px]" /> Envoyé
                      </span>
                    ) : camp.statut === "programme" ? (
                      <span className="inline-flex items-center gap-1.5 text-blue-500 text-xs font-bold">
                        <FaClock className="text-[10px]" /> Programmé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                        <FaExclamationCircle className="text-[10px]" /> {getStatusLabel(camp.statut)}
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-6 font-bold text-gray-700 dark:text-gray-300 text-sm">
                    {camp.total_destinataires.toLocaleString()} pers.
                  </td>
                  <td className="py-5 px-6">
                    {camp.statut === "envoye" ? (
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs font-bold text-gray-800 dark:text-white">{calculateOpenRate(camp)}</p>
                          <p className="text-[10px] text-gray-400 uppercase">Ouverture</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-gray-800 dark:text-white">{calculateClickRate(camp)}</p>
                          <p className="text-[10px] text-gray-400 uppercase">Clics</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300 italic">—</span>
                    )}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-gray-400 hover:text-brand-500 transition-colors">
                        <FaChartLine />
                      </button>
                      <button className="text-gray-400 hover:text-brand-500 transition-colors">
                        <FaEllipsisH />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm italic">
                    Aucune campagne trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
