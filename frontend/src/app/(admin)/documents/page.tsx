"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { FaFilePdf, FaFileWord, FaFileImage, FaSearch, FaFilter, FaDownload, FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";

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
  const { searchQuery } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const search = (searchQuery || localSearchTerm).toLowerCase();
    return (
      doc.title.toLowerCase().includes(search) ||
      doc.category.toLowerCase().includes(search)
    );
  });

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
    switch (type) {
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
            Consultez, téléchargez et gérez tous les documents et formulaires du laboratoire.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/documents/nouveau">
            <Button size="sm" variant="primary" startIcon={<PlusIcon className="w-4 h-4" />}>
              Ajouter un document
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
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
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors">
            <FaFilter className="text-gray-400" />
            <span>Filtrer</span>
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
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
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 rounded-md tracking-wider">
                  {doc.category}
                </span>
                <span className="text-[11px] text-gray-400">
                  {doc.size}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-400 italic">Modifié le {doc.date}</span>
              <button className="flex items-center gap-2 text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors">
                <FaDownload className="text-xs" />
                <span>Télécharger</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
