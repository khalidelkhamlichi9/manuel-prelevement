"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { PlusIcon, UserCircleIcon } from "@/icons";
import { FaSearch, FaFilter, FaUserShield, FaUser, FaTrashAlt, FaEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

interface User {
  id: number;
  identifiant: string;
  nom: string;
  prenom: string;
  email: string | null;
  role: string;
  organisme: string | null;
  actif: boolean;
}

export default function UtilisateursPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("tous");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiClient.get<User[]>("/api/v1/auth/users");
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération des utilisateurs");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.identifiant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "tous" || u.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Voulez-vous vraiment désactiver cet utilisateur ?")) {
      try {
        await apiClient.delete(`/api/v1/auth/users/${id}`);
        setUsers(users.map(u => u.id === id ? { ...u, actif: false } : u));
      } catch (err: any) {
        alert("Erreur lors de la désactivation");
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30">Erreur : {error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-['Poppins'] flex items-center gap-2">
            <UserCircleIcon className="w-6 h-6 text-brand-500" />
            Gestion des Utilisateurs
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez les accès et les rôles des utilisateurs de la plateforme
          </p>
        </div>
        <Link href="/utilisateurs/nouveau">
          <Button size="sm" variant="primary" startIcon={<PlusIcon className="w-4 h-4" />}>
            Nouvel Utilisateur
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-brand-500 outline-none dark:text-white transition-all"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-full sm:w-auto">
            <button 
              onClick={() => setRoleFilter("tous")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${roleFilter === "tous" ? "bg-white dark:bg-gray-700 text-brand-600 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              Tous
            </button>
            <button 
              onClick={() => setRoleFilter("laboratoire")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${roleFilter === "laboratoire" ? "bg-white dark:bg-gray-700 text-brand-600 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              Labo
            </button>
            <button 
              onClick={() => setRoleFilter("client")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${roleFilter === "client" ? "bg-white dark:bg-gray-700 text-brand-600 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              Clients
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Utilisateur</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Rôle</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Organisme</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Statut</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${u.role === 'laboratoire' ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10' : 'bg-gray-100 text-gray-600 dark:bg-gray-800'}`}>
                          {u.nom[0]}{u.prenom[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white">{u.nom} {u.prenom}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">@{u.identifiant}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {u.role === "laboratoire" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 text-[11px] font-bold uppercase">
                          <FaUserShield /> Labo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 text-[11px] font-bold uppercase">
                          <FaUser /> Client
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                      {u.organisme || "—"}
                    </td>
                    <td className="py-4 px-6">
                      {u.actif ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-[10px] font-bold uppercase">
                          <FaCheckCircle /> Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 text-[10px] font-bold uppercase">
                          <FaTimesCircle /> Inactif
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-brand-500 transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 text-sm italic">
                    Aucun utilisateur trouvé
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
