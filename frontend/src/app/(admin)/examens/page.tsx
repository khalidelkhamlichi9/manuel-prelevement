"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { PlusIcon, ChevronDownIcon, ChevronUpIcon } from "@/icons";
import { FaInfoCircle, FaVial, FaMicroscope, FaFileInvoiceDollar, FaExternalLinkAlt, FaBolt, FaUtensils, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearch } from "@/context/SearchContext";
import apiClient from "@/lib/apiClient";
import { RECIPIENTS_MAPPING } from "@/constants/recipients";
import { Examen } from "@/data/examens";

interface DynamicOption {
  id: number;
  nom: string;
}

export default function ExamensPage() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [examens, setExamens] = useState<Examen[]>([]);
  const [specialites, setSpecialites] = useState<DynamicOption[]>([]);
  const [laboratoires, setLaboratoires] = useState<DynamicOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // États des filtres
  const [filterKaliSil, setFilterKaliSil] = useState("");
  const [filterSpecialite, setFilterSpecialite] = useState("");
  const [filterLabo, setFilterLabo] = useState("");
  const [filterAJeun, setFilterAJeun] = useState<boolean | null>(null);
  const [filterUrgent, setFilterUrgent] = useState<boolean | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filterKaliSil, filterSpecialite, filterLabo, filterAJeun, filterUrgent]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [examensData, specsData, labsData] = await Promise.all([
        apiClient.get<Examen[]>("/api/v1/examens/"),
        apiClient.get<DynamicOption[]>("/api/v1/specialites/"),
        apiClient.get<DynamicOption[]>("/api/v1/laboratoires/")
      ]);
      setExamens(examensData);
      setSpecialites(specsData);
      setLaboratoires(labsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="h-40 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30">Erreur : {error}</div>;


  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const filteredExamens = examens.filter((examen) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      examen.nom.toLowerCase().includes(searchLower) ||
      examen.synonymes.some((s) => s.toLowerCase().includes(searchLower)) ||
      (examen.code && examen.code.toLowerCase().includes(searchLower)) ||
      (examen.code_kalisil && examen.code_kalisil.toLowerCase().includes(searchLower));

    const matchesKaliSil = !filterKaliSil || (examen.code_kalisil && examen.code_kalisil.toLowerCase().includes(filterKaliSil.toLowerCase()));
    const matchesSpec = !filterSpecialite || examen.specialite === filterSpecialite;
    const matchesLabo = !filterLabo || examen.laboratoireExecutant === filterLabo;
    const matchesAJeun = filterAJeun === null || examen.a_jeun === filterAJeun;
    const matchesUrgent = filterUrgent === null || examen.urgent === filterUrgent;

    return matchesSearch && matchesKaliSil && matchesSpec && matchesLabo && matchesAJeun && matchesUrgent;
  });

  // Logic for pagination
  const totalPages = Math.ceil(filteredExamens.length / itemsPerPage);
  const paginatedExamens = filteredExamens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins']">Catalogue des Examens</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Consultez les protocoles et conditions de prélèvement</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            variant="outline" 
            startIcon={<FaFilter className="w-3 h-3" />}
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-brand-50 border-brand-200 text-brand-600" : ""}
          >
            Filtres
          </Button>
          <Link href="/examens/nouveau">
            <Button size="sm" variant="primary" startIcon={<PlusIcon className="w-4 h-4" />}>
              Ajouter un examen
            </Button>
          </Link>
        </div>
      </div>

      {/* Panneau de Filtres Conditonnels */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Code KaliSil</label>
              <input
                type="text"
                placeholder="Ex: KS-001"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                value={filterKaliSil}
                onChange={(e) => setFilterKaliSil(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Spécialité</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
                value={filterSpecialite}
                onChange={(e) => setFilterSpecialite(e.target.value)}
              >
                <option value="">Toutes les spécialités</option>
                {specialites.map((spec) => (
                  <option key={spec.id} value={spec.nom}>{spec.nom}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Laboratoire</label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
                value={filterLabo}
                onChange={(e) => setFilterLabo(e.target.value)}
              >
                <option value="">Tous les laboratoires</option>
                {laboratoires.map((lab) => (
                  <option key={lab.id} value={lab.nom}>{lab.nom}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Accès Rapide avec Listes Déroulantes */}
          <div className="flex flex-wrap items-end gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex-1 min-w-[200px]">
              <label className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase mb-2 ml-1">
                <FaUtensils /> Examens à jeun courants
              </label>
              <select
                className="w-full px-4 py-2 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl text-sm text-orange-700 dark:text-orange-400 outline-none cursor-pointer focus:ring-2 focus:ring-orange-500/20"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFilterAJeun(true);
                }}
              >
                <option value="">Sélectionner...</option>
                {examens.filter(ex => ex.a_jeun).map(ex => (
                  <option key={ex.id} value={ex.nom}>{ex.nom}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase mb-2 ml-1">
                <FaBolt /> Examens urgents courants
              </label>
              <select
                className="w-full px-4 py-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-sm text-red-700 dark:text-red-400 outline-none cursor-pointer focus:ring-2 focus:ring-red-500/20"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFilterUrgent(true);
                }}
              >
                <option value="">Sélectionner...</option>
                {examens.filter(ex => ex.urgent).map(ex => (
                  <option key={ex.id} value={ex.nom}>{ex.nom}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setFilterKaliSil("");
                setFilterSpecialite("");
                setFilterLabo("");
                setFilterAJeun(null);
                setFilterUrgent(null);
                setSearchQuery("");
              }}
              className="h-10 px-4 text-xs font-bold text-gray-400 hover:text-brand-500 transition-colors uppercase tracking-wider"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}

      {/* Liste des Examens */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <th className="py-4 px-6 font-bold text-xs uppercase text-gray-400">Examen</th>
              <th className="py-4 px-6 font-bold text-xs uppercase text-gray-400 text-center">Récipients</th>
              <th className="py-4 px-6 font-bold text-xs uppercase text-gray-400 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExamens.map((examen) => (
              <React.Fragment key={examen.id}>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <Link href={`/examens/${examen.id}`} className="font-bold text-brand-500 text-base hover:underline">{examen.nom}</Link>
                    <div className="flex gap-2 mt-2">
                      {examen.a_jeun && <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"><FaUtensils /> À JEUN</span>}
                      {examen.urgent && <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 animate-pulse"><FaBolt /> URGENT</span>}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-2">
                      {examen.recipients.map((recId, i) => {
                        const recipient = RECIPIENTS_MAPPING.find(r => r.id === recId);
                        return (
                          <div key={i} className="relative w-4 h-7 flex-shrink-0" title={recipient?.label || recId}>
                            <img 
                              src={recipient?.image || "https://placehold.co/40x80?text=Tube"} 
                              alt={recId}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button onClick={() => toggleRow(examen.id)} className="text-gray-400 hover:text-brand-500">
                      {expandedRow === examen.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </button>
                  </td>
                </tr>
                {expandedRow === examen.id && (
                  <tr className="bg-[#ccc]/20 dark:bg-gray-800/50">
                    <td colSpan={3} className="p-8 border-b border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="space-y-4 p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl">
                          <span className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                            <FaInfoCircle className="w-4 h-4" /> Général
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Labo:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.laboratoireExecutant}</span></p>
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Spécialité:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.specialite}</span></p>
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Type:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.type}</span></p>
                          </div>
                        </div>

                        <div className="space-y-4 p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl">
                          <span className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                            <FaVial className="w-4 h-4" /> Pré-analytique
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Prélèvement:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.typePrelevement}</span></p>
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Quantité:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.quantiteMinimale}</span></p>
                          </div>
                        </div>

                        <div className="space-y-4 p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl">
                          <span className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                            <FaMicroscope className="w-4 h-4" /> Analytique
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Technique:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.technique}</span></p>
                            <p className="text-base"><span className="font-semibold text-gray-500 dark:text-gray-400">Délai:</span> <span className="text-gray-900 dark:text-gray-100 font-medium">{examen.delai}</span></p>
                          </div>
                        </div>

                        <div className="space-y-4 p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl">
                          <span className="text-sm font-bold text-brand-600 uppercase tracking-wider flex items-center gap-2">
                            <FaFileInvoiceDollar className="w-4 h-4" /> Facturation
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            <p className="text-xl font-bold text-brand-600">{examen.prix}</p>
                            <p className="text-sm font-mono text-gray-500 dark:text-gray-400">{examen.cotation}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium">
              Affichage de <span className="font-bold text-gray-800 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> à <span className="font-bold text-gray-800 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredExamens.length)}</span> sur <span className="font-bold text-gray-800 dark:text-white">{filteredExamens.length}</span> examens
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page 
                        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                        : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
