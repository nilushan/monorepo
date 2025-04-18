"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || null;
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      setFormError(res.error);
    } else if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setFormError("Unexpected error during sign in.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 8 }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {(error || formError) && <div style={{ color: "red", marginTop: 12 }}>{error || formError}</div>}
      </form>
      <div style={{ marginTop: 16 }}>
        Need an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}