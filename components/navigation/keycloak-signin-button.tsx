"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const KeycloakSignInButton = () => {
    const handleClick = () => {
      signIn("keycloak", { callbackUrl: "http://localhost:3000/freezes" });
    };
  
    return (
      <Button variant="ghost" onClick={handleClick}>Continue with Keycloak</Button>
    );
  }