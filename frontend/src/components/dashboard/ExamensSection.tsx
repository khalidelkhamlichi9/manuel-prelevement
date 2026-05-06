"use client";
import React, { useState } from 'react';
import { FaSyncAlt, FaVial, FaStethoscope } from 'react-icons/fa';
import Link from 'next/link';

const aJeun = [
  "CHOLESTÉROL HDL", "CHOLESTÉROL LDL", "CHOLESTEROL TOTAL", 
  "GLYCEMIE", "HELICOBACTER PILORI (TEST RESPIRATOIRE À L'URÉE)", 
  "HYPERGLYCEMIE PROVOQUÉE PÄR VOIE ORALE", "Test de O’Sullivan", 
  "Triglycérides"
];

const urgents = [
  "CK-MB", "Gazometrie arterielle", "PCR MULTIPLEX RESPIRATOIRES", 
  "TROPONINE Ic", "TROPONINE T US"
];

export default function ExamensSection() {
  const [activeTab, setActiveTab] = useState<'ajeun' | 'urgents'>('ajeun');

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-theme-sm overflow-hidden h-full flex flex-col min-h-[400px]">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaSyncAlt className="text-[#8dc549] text-lg" />
          <h3 className="font-bold text-gray-800 dark:text-white uppercase tracking-wide">Accès Rapide</h3>
        </div>
        <Link href="/examens" className="text-xs font-medium text-brand-500 hover:underline">
          Catalogue complet
        </Link>
      </div>
      
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => setActiveTab('ajeun')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'ajeun' ? 'bg-brand-50 text-brand-600 border-b-2 border-brand-500 dark:bg-brand-500/10' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
        >
          <FaVial /> À jeun
        </button>
        <button 
          onClick={() => setActiveTab('urgents')}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'urgents' ? 'bg-brand-50 text-brand-600 border-b-2 border-brand-500 dark:bg-brand-500/10' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
        >
          <FaStethoscope /> Urgents
        </button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          {activeTab === 'ajeun' && aJeun.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
              <div className="w-2 h-2 rounded-full bg-[#8dc549] shrink-0"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-500 transition-colors leading-relaxed">{item}</span>
            </li>
          ))}
          {activeTab === 'urgents' && urgents.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
