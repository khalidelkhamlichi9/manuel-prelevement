import React from "react";
import ModifierExamenClient from "./ModifierExamenClient";
import { Examen } from "@/data/examens";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/v1/examens/`);
    if (!res.ok) return [];
    const examens: Examen[] = await res.json();
    return examens.map((examen) => ({
      id: examen.id,
    }));
  } catch (error) {
    console.error("Error generating static params for modifier:", error);
    return [];
  }
}

export default async function ModifierExamenPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  return <ModifierExamenClient id={id} />;
}
