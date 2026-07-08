import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-brand-gray">
      <header className="flex items-center justify-between bg-brand-black px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-maroon text-sm font-bold text-white">
            H
          </div>
          <span className="text-lg font-bold text-white">Hendrickson</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">{user?.email}</span>
          <SignOutButton />
        </div>
      </header>

      <main className="p-8">
        <h1 className="text-2xl font-bold text-brand-maroon">Dashboard</h1>
        <p className="mt-1 text-black/60">Welcome back, {user?.email}</p>
      </main>
    </div>
  );
}
