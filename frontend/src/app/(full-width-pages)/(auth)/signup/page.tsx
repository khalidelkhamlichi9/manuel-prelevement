import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription | Manuel de Prélèvement - CBW",
  description: "This is Next.js SignUp Page Manuel de Prélèvement CBW",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
