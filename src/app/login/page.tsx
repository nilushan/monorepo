import React from "react";
import LoginFormClient from "./LoginFormClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect authenticated users to home or callback URL
    redirect("/");
  }

  return <LoginFormClient />;
}