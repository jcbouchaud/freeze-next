"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
    const handleClick = () => {
      signOut({ callbackUrl: "http://localhost:3000" })
    };
  
    return (
      <Button variant="ghost" onClick={handleClick}>Sign Out</Button>
    );
  }