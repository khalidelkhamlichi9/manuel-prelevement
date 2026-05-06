"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import FileInput from "@/components/form/input/FileInput";
import { FaSave, FaArrowLeft } from "react-icons/fa";

export default function NouveauDocumentPage() {
  const [isMounting, setIsMounting] = React.useState(true);

  React.useEffect(() => {
    setIsMounting(false);
  }, []);

  const handleSelectChange = (value: string) => {
    console.log("Selected:", value);
  };

  if (isMounting) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-4 w-48 bg-gray-100 dark:bg-gray-800/50 rounded-lg" />
        </div>
        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
              <div className="h-11 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl" />
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-4">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
   
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins']">
              Ajouter un document
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Uploader un nouveau fichier dans la bibliothèque du laboratoire.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-8 shadow-theme-sm">
          <div className="space-y-5">
            <div>
              <Label>Titre du document</Label>
              <Input placeholder="ex: Fiche de prescription NGS" />
            </div>

            <div>
              <Label>Catégorie</Label>
              <Select 
                onChange={handleSelectChange}
                placeholder="Sélectionner une catégorie"
                options={[
                    { label: "Prescription", value: "Prescription" },
                    { label: "Consentement", value: "Consentement" },
                    { label: "Protocole", value: "Protocole" },
                    { label: "Information", value: "Information" },
                    { label: "Qualité", value: "Qualité" },
                ]}
              />
            </div>

            <div>
              <Label>Fichier (PDF, Word, Image)</Label>
              <div className="mt-1">
                <FileInput />
              </div>
              <p className="mt-2 text-xs text-gray-500 italic font-['Poppins']">
                Taille maximale : 10 Mo. Formats acceptés : .pdf, .doc, .docx, .png, .jpg
              </p>
            </div>

            <div>
              <Label>Description (optionnel)</Label>
              <TextArea placeholder="Brève description du contenu du document..." rows={3} />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
              <Link href="/documents">
                <Button variant="outline">Annuler</Button>
              </Link>
              <Button variant="primary" startIcon={<FaSave />}>Mettre en ligne</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
