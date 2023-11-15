"use client"

import { Power } from "lucide-react"
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
    const handleClick = () => {
      signOut({ callbackUrl: "http://localhost:3000" })
    };
  
    return (
      <Power onClick={handleClick} className="cursor-pointer h-4" />
    );
  }