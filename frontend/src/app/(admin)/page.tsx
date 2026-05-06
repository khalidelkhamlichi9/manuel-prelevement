import type { Metadata } from "next";
import React from "react";
import HeroSection from "@/components/dashboard/HeroSection";
import DocumentsSection from "@/components/dashboard/DocumentsSection";
import ExamensSection from "@/components/dashboard/ExamensSection";
import NewsSliderWrapper from "@/components/dashboard/NewsSliderWrapper";


export const metadata: Metadata = {
  title: "Tableau de bord | Manuel de Prélèvement - CBW",
  description: "Tableau de bord de l'application Manuel de prélèvement - CBW",
};

export default function Dashboard() {
  return (
    <div className="w-full">
      {/* Section Hero : Bannière avec fond, titre et recherche */}
      <HeroSection />

      {/* Section Contenu : 3 colonnes flexibles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1 : Actualités (Carrousel) */}
        <div className="lg:col-span-1">
          <NewsSliderWrapper />
        </div>

        {/* Colonne 2 : Documents */}
        <div className="lg:col-span-1">
          <DocumentsSection />
        </div>

        {/* Colonne 3 : Accès rapide Examens */}
        <div className="lg:col-span-1">
          <ExamensSection />
        </div>
      </div>
    </div>
  );
}
