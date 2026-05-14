"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import { FaSave, FaUserShield, FaUser, FaBuilding, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import apiClient from "@/lib/apiClient";

export default function NouveauUtilisateurPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifiant: "",
    password: "",
    nom: "",
    prenom: "",
    email: "",
    role: "client",
    organisme: ""
  });

  const handleSave = async () => {
    if (!formData.identifiant || !formData.password || !formData.nom || !formData.prenom) {
      alert("Veuillez remplir tous les champs obligatoires (Identifiant, Mot de passe, Nom, Prénom)");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post("/api/v1/auth/users", formData);
      alert("Utilisateur créé avec succès !");
      router.push("/utilisateurs");
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(`Erreur lors de la création: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins'] tracking-tight">
            Créer un nouvel utilisateur
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Définissez les accès et les informations du nouveau compte.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/utilisateurs">
            <Button variant="outline" size="sm">Annuler</Button>
          </Link>
          <Button 
            variant="primary" 
            size="sm" 
            startIcon={<FaSave />} 
            onClick={handleSave} 
            loading={loading}
          >
            Créer l'utilisateur
          </Button>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        {/* Section 1: Identifiants */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-brand-500 mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']">
            <FaLock className="text-sm" /> Identifiants de connexion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Identifiant (Login) <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="ex: j.dupont" 
                value={formData.identifiant} 
                onChange={(e) => setFormData({ ...formData, identifiant: e.target.value })} 
              />
            </div>
            <div>
              <Label>Mot de passe <span className="text-red-500">*</span></Label>
              <Input 
                type="password"
                placeholder="••••••••" 
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              />
            </div>
          </div>
        </div>

        {/* Section 2: Informations Personnelles */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-brand-500 mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']">
            <FaUser className="text-sm" /> Informations Personnelles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Nom <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="DUPONT" 
                value={formData.nom} 
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })} 
              />
            </div>
            <div>
              <Label>Prénom <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="Jean" 
                value={formData.prenom} 
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} 
              />
            </div>
            <div className="md:col-span-2">
              <Label>Adresse Email</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaEnvelope className="text-xs" />
                </span>
                <Input 
                  className="pl-10"
                  placeholder="jean.dupont@exemple.com" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Rôle et Organisation */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-brand-500 mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 font-['Poppins']">
            <FaUserTag className="text-sm" /> Rôle et Organisation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Type de compte</Label>
              <Select 
                options={[
                  { label: "Client (Consultation)", value: "client" },
                  { label: "Laboratoire (Administrateur)", value: "laboratoire" }
                ]} 
                value={formData.role} 
                onChange={(val) => setFormData({ ...formData, role: val })} 
              />
            </div>
            <div>
              <Label>Organisme / Laboratoire</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaBuilding className="text-xs" />
                </span>
                <Input 
                  className="pl-10"
                  placeholder="ex: Centre Médical CBW" 
                  value={formData.organisme} 
                  onChange={(e) => setFormData({ ...formData, organisme: e.target.value })} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
