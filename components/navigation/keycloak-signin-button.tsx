"use client"

import { User } from "lucide-react"
import { signIn } from "next-auth/react";

export const KeycloakSignInButton = () => {
  const handleClick = () => {
    signIn("keycloak", { callbackUrl: "http://localhost:3000/freezes" });
  };

  return (
    <User onClick={handleClick} className="cursor-pointer h-4" />
  );
}