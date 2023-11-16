"use client"

import { Button } from "../ui/button";
import { Power } from "lucide-react"
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  const handleClick = () => {
    signOut({ callbackUrl: "http://localhost:3000" })
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex flex-row items-center justify-center h-9 border rounded-sm"
      onClick={handleClick}
    >
      <Power className="h-4" />
    </Button>

  );
}