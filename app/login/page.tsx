"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-gray px-4">
      <div className="w-full max-w-md rounded-xl bg-brand-maroon p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2">
            <img
              src="/logo.png"
              alt="Hendrickson"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Hendrickson</h1>
          <p className="mt-1 text-sm text-white/70">Sign in to your account</p>
        </div>

        <form onSubmit={handleSignIn} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hendrickson.com.au"
              className="w-full rounded-md border border-black/10 bg-white px-4 py-2 text-black placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-black/10 bg-white px-4 py-2 text-black placeholder:text-black/40 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {error && (
            <p className="rounded-md bg-white px-3 py-2 text-sm text-brand-maroon">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-2.5 font-semibold text-white transition hover:bg-black/80 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
