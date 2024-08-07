"use client";

import { useStoreUserEffect } from "@/components/providers/auth-status";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  const { isAdmin, isAuthenticated, isLoading } = useStoreUserEffect();
  return (
    <div>
      <SignInButton>Sign in</SignInButton>

      <SignUpButton>sign up</SignUpButton>
      {isAdmin ? "You are an admin" : "you are not an admin "}
    </div>
  );
};

export default page;
