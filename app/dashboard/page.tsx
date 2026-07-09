import { createClient } from "@/lib/supabase/server";
import DashboardShell from "./dashboard-shell";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email;

  return <DashboardShell displayName={displayName} />;
}
