import React, { Suspense } from "react";
import LoginFormClient from "./LoginFormClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormClient />
    </Suspense>
  );
}