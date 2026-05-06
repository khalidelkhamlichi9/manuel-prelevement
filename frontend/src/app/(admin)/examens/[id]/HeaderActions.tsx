"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaPrint, FaTrash } from "react-icons/fa";
import Button from "@/components/ui/button/Button";
import apiClient from "@/lib/apiClient";

interface HeaderActionsProps {
  examenId: string;
}

export default function HeaderActions({ examenId }: HeaderActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet examen ? Cette action est irréversible.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await apiClient.delete(`/api/v1/examens/${examenId}`);
      alert("Examen supprimé avec succès.");
      router.push("/examens");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Une erreur est survenue lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 shrink-0">
      <Button variant="outline" size="sm" startIcon={<FaPrint />}>
        Print Sticker
      </Button>
      <Button variant="primary" size="sm" startIcon={<FaEdit />}>
        Modifier
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        startIcon={<FaTrash />} 
        onClick={handleDelete}
        loading={isDeleting}
        className="!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10 border-red-200 dark:border-red-500/30"
      >
        Supprimer
      </Button>
    </div>
  );
}
