'use server';

import { createUser } from "@/lib/services/userService";
import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
  const nameValue = formData.get("name");
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  const name = typeof nameValue === "string" ? nameValue : "";
  const email = typeof emailValue === "string" ? emailValue : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password) {
    redirect("/signup?error=" + encodeURIComponent("Email and password are required."));
  }

  try {
    await createUser(email, password, name);
    redirect("/login");
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "User already exists") {
      redirect("/signup?error=" + encodeURIComponent("User already exists."));
    } else {
      redirect("/signup?error=" + encodeURIComponent("Internal server error."));
    }
  }
}