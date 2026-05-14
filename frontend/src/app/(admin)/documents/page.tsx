"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { FaFilePdf, FaFileWord, FaFileImage, FaSearch, FaFilter, FaDownload, FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useAuth } from "@/context/AuthContext";

interface Document {
  id: number;
  title: string;
  type: string;
  size: string | null;
  category: string;
  date: string | null;
  file_url: string | null;
}

export default function DocumentsPage() {
  const { user } = useAuth();
  const { searchQuery } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["Tous", "Prescription", "Consentement", "Protocole", "Information", "Qualité"];
  const fileTypes = ["Tous", "pdf", "word", "image"];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const res = await fetch(`${apiUrl}/api/v1/documents/`);
        if (!res.ok) throw new Error("Erreur lors de la récupération des documents");
        const data = await res.json();
        setDocuments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    // Combine global and local search: prioritize local if present, otherwise use global
    const search = (localSearchTerm || searchQuery || "").toLowerCase().trim();

    const title = doc.title?.toLowerCase() || "";
    const category = doc.category?.toLowerCase() || "";
    
    const matchesSearch = !search || title.includes(search) || category.includes(search);
    
    const matchesCategory = categoryFilter === "Tous" || 
                           category === categoryFilter.toLowerCase().trim();
    
    const matchesType = typeFilter === "Tous" || 
                       doc.type?.toLowerCase().trim() === typeFilter.toLowerCase().trim();
    
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    if (sortBy === "date") {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    } else {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === "asc") return titleA.localeCompare(titleB);
      return titleB.localeCompare(titleA);
    }
  });

  const resetFilters = () => {
    setLocalSearchTerm("");
    setCategoryFilter("Tous");
    setTypeFilter("Tous");
    setSortBy("date");
    setSortOrder("desc");
  };

  const isFiltered = localSearchTerm !== "" || categoryFilter !== "Tous" || typeFilter !== "Tous";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center animate-pulse">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-10 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse border border-gray-200 dark:border-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30">Erreur : {error}</div>;

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf": return <FaFilePdf className="text-red-500 text-2xl" />;
      case "word": return <FaFileWord className="text-blue-500 text-2xl" />;
      case "image": return <FaFileImage className="text-green-500 text-2xl" />;
      default: return <FaFilePdf className="text-gray-400 text-2xl" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins']">
            Gestion des Documents
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Consultez, téléchargez et gérez tous les documents du laboratoire.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {user?.role === "laboratoire" && (
            <Link href="/documents/nouveau">
              <Button size="sm" variant="primary" startIcon={<PlusIcon className="w-4 h-4" />}>
                Ajouter un document
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-brand-500 focus:border-brand-500 dark:text-white"
              placeholder="Rechercher un document..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase hidden sm:block">Format:</span>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                {fileTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      typeFilter === type
                        ? "bg-white dark:bg-gray-700 text-brand-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 hidden md:block" />

            <div className="flex items-center gap-2">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-gray-500 dark:text-gray-400 border-none focus:ring-0 cursor-pointer"
              >
                <option value="date">Trier par date</option>
                <option value="title">Trier par titre</option>
              </select>
              <button 
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
                title={sortOrder === "asc" ? "Croissant" : "Décroissant"}
              >
                <FaFilter className={`text-xs transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs & Reset */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  categoryFilter === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                    : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800 hover:border-brand-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button 
              onClick={resetFilters}
              className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors flex items-center gap-1 px-3 py-2 bg-brand-50 dark:bg-brand-500/10 rounded-xl"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="group bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-theme-xs hover:shadow-theme-md hover:border-brand-300 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 transition-colors">
                  {getIcon(doc.type)}
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <FaEllipsisV />
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-gray-800 dark:text-white line-clamp-2 min-h-[40px] mb-1 group-hover:text-brand-500 transition-colors font-['Poppins']">
                  {doc.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    doc.category === 'Qualité' ? 'bg-purple-50 text-purple-600' :
                    doc.category === 'Prescription' ? 'bg-blue-50 text-blue-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {doc.category}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {doc.size}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-400 italic">Modifié le {doc.date}</span>
                {doc.file_url ? (
                  <a 
                    href={doc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors"
                  >
                    <FaDownload className="text-xs" />
                    <span>Télécharger</span>
                  </a>
                ) : (
                  <button className="flex items-center gap-2 text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors">
                    <FaDownload className="text-xs" />
                    <span>Télécharger</span>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 mb-4">
              <FaSearch className="text-3xl text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">Aucun document trouvé</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              Nous n'avons trouvé aucun document correspondant à vos critères de recherche.
            </p>
            {isFiltered && (
              <button 
                onClick={resetFilters}
                className="mt-6 text-sm font-bold text-brand-500 hover:underline"
              >
                Effacer tous les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
