"use client"

import { Button } from "../ui/button";
import { User } from "lucide-react"
import { signIn } from "next-auth/react";

export const KeycloakSignInButton = () => {
  const handleClick = () => {
    signIn("keycloak", { callbackUrl: "http://localhost:3000/freezes" });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex flex-row items-center justify-center h-9 border rounded-sm"
      onClick={handleClick}
    >
      <User className="h-4" />
    </Button>
  );
}