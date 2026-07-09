import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email;

  return (
    <div className="min-h-screen bg-brand-gray">
      <header className="flex items-center justify-between bg-brand-maroon px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-1">
            <img
              src="/logo.png"
              alt="Hendrickson"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-lg font-bold text-white">Hendrickson</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">{displayName}</span>
          <SignOutButton />
        </div>
      </header>

      <main className="p-8">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="mt-1 text-black/60">Welcome back, {displayName}</p>
      </main>
    </div>
  );
}
