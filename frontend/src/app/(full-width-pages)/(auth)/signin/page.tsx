import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Manuel de Prélèvement - CBW",
  description: "This is Next.js Signin Page Manuel de Prélèvement CBW",
};

export default function SignIn() {
  return <SignInForm />;
}
