"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-md bg-brand-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-maroon/90"
    >
      Sign Out
    </button>
  );
}
