import React from 'react';
import { FaFilePdf, FaFileWord, FaFileImage } from 'react-icons/fa6';
import { FaFolderOpen } from 'react-icons/fa';
import Link from 'next/link';

const documents = [
  { id: 1, title: "Fiche de prescription & consentement — Diagnostic moléculaire par NGS", icon: <FaFilePdf className="text-red-500" /> },
  { id: 2, title: "GÉNOTYPE RHD FŒTAL - DÉTERMINATION PRÉNATALE A PARTIR DU SANG", icon: <FaFilePdf className="text-red-500" /> },
  { id: 3, title: "Consentement-Demande-de-typage-HLA", icon: <FaFileWord className="text-blue-500" /> },
  { id: 4, title: "Formulaire d'informations cliniques - maladies génétiques (BRCA1/2)", icon: <FaFilePdf className="text-red-500" /> },
  { id: 5, title: "T21-FICHE DE RENSEIGNEMENT POUR ETUDE DES MARQUEURS SERIQUES", icon: <FaFileImage className="text-green-500" /> },
  { id: 6, title: "FICHE DE RENSEIGNEMENT DES LITHIASES URINAIRES", icon: <FaFilePdf className="text-red-500" /> },
];

export default function DocumentsSection() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-theme-sm overflow-hidden h-full flex flex-col min-h-[400px]">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFolderOpen className="text-[#8dc549] text-lg" />
          <h3 className="font-bold text-gray-800 dark:text-white uppercase tracking-wide">Documents</h3>
        </div>
        <Link href="/documents" className="text-xs font-medium text-brand-500 hover:underline">
          Voir tout
        </Link>
      </div>
      <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          {documents.map((doc) => (
            <li key={doc.id}>
              <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="mt-1 text-lg shrink-0">
                  {doc.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-500 transition-colors line-clamp-2 leading-relaxed">
                    {doc.title}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
