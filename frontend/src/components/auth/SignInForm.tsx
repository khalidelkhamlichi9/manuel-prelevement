"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/apiClient";
import Image from "next/image";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await apiClient.post("/api/v1/auth/login", {
        identifiant,
        password,
      });
      login(data.access_token, data.user);
    } catch (err: any) {
      // Si l'erreur est "Not Found" ou 404, on affiche un message plus parlant
      const msg = err.message === "Not Found" ? "Identifiant ou mot de passe incorrect" : err.message;
      setError(msg || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full p-8 sm:p-10">
      <div className="flex justify-center mb-8">
        <Image
          width={200}
          height={60}
          src="/CBW/images/LogoCBW.png"
          alt="CBW Logo"
          className="object-contain h-20 w-auto"
          priority
        />
      </div>
      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Connexion
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Veuillez saisir vos identifiants pour accéder.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/10 dark:border-red-900/50 dark:text-red-400 text-center">
            {error}
          </div>
        )}
        
        <div>
          <Label>
            Identifiant <span className="text-error-500">*</span>
          </Label>
          <Input 
            placeholder="Votre identifiant" 
            type="text" 
            value={identifiant}
            onChange={(e: any) => setIdentifiant(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        <div>
          <Label>
            Mot de passe <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
              className="w-full pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </span>
          </div>
        </div>
        
        <div className="pt-2">
          <Button className="w-full" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </div>
      </form>
    </div>
  );
}
