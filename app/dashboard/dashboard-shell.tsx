"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SignOutButton from "./sign-out-button";

type Theme = "light" | "dark";

type ConfiguratorRecord = {
  id: string;
  customer: string | null;
  fleet: string | null;
  dispatch_date_axle: string | null;
  dispatch_date_hanger: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-AU");
}

export default function DashboardShell({
  displayName,
  records,
}: {
  displayName?: string | null;
  records: ConfiguratorRecord[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [theme, setTheme] = useState<Theme>("light");
  const [hydrated, setHydrated] = useState(false);
  const [rows, setRows] = useState<ConfiguratorRecord[]>(records);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("hendrickson-theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    setRows(records);
  }, [records]);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("hendrickson-theme", next);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this record? This can't be undone.")) return;
    setDeletingId(id);
    const { error } = await supabase
      .from("configurator_records")
      .delete()
      .eq("id", id);
    setDeletingId(null);
    if (error) {
      window.alert(`Could not delete record: ${error.message}`);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const isDark = theme === "dark";

  // Avoid a light/dark flash on first paint before localStorage is read.
  if (!hydrated) {
    return <div className="min-h-screen bg-brand-gray" />;
  }

  return (
    <div className={isDark ? "min-h-screen bg-neutral-900" : "min-h-screen bg-brand-gray"}>
      <header className="relative z-10 flex items-center justify-between bg-brand-maroon px-6 py-4 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
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
          <span className="text-sm text-white">{displayName}</span>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-black text-white transition hover:bg-[#B3B3B3]"
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            )}
          </button>

          <SignOutButton />
        </div>
      </header>

      <main className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1
              className={
                isDark
                  ? "text-2xl font-bold text-white"
                  : "text-2xl font-bold text-black"
              }
            >
              Dashboard
            </h1>
            <p className={isDark ? "mt-1 text-white/60" : "mt-1 text-black/60"}>
              Welcome back, {displayName}
            </p>
          </div>

          <button
            onClick={() => router.push("/configurator/new")}
            className="rounded-md bg-brand-maroon px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-maroon/90"
          >
            + Add
          </button>
        </div>

        <div
          className={
            isDark
              ? "overflow-hidden rounded-lg border border-white/10 bg-neutral-800"
              : "overflow-hidden rounded-lg border border-black/10 bg-white"
          }
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr
                className={
                  isDark
                    ? "border-b border-white/10 text-white/70"
                    : "border-b border-black/10 text-black/70"
                }
              >
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Dispatch Date - Axle</th>
                <th className="px-4 py-3 font-semibold">Dispatch Date - Hanger</th>
                <th className="px-4 py-3 font-semibold">Fleet</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className={
                      isDark
                        ? "px-4 py-8 text-center text-white/50"
                        : "px-4 py-8 text-center text-black/50"
                    }
                  >
                    No records yet. Click + Add to create one.
                  </td>
                </tr>
              )}
              {rows.map((record) => (
                <tr
                  key={record.id}
                  className={
                    isDark
                      ? "border-b border-white/5 last:border-0"
                      : "border-b border-black/5 last:border-0"
                  }
                >
                  <td className={isDark ? "px-4 py-3 text-white" : "px-4 py-3 text-black"}>
                    {record.customer || "-"}
                  </td>
                  <td className={isDark ? "px-4 py-3 text-white/80" : "px-4 py-3 text-black/80"}>
                    {formatDate(record.dispatch_date_axle)}
                  </td>
                  <td className={isDark ? "px-4 py-3 text-white/80" : "px-4 py-3 text-black/80"}>
                    {formatDate(record.dispatch_date_hanger)}
                  </td>
                  <td className={isDark ? "px-4 py-3 text-white/80" : "px-4 py-3 text-black/80"}>
                    {record.fleet || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => router.push(`/configurator/${record.id}/edit`)}
                        className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#B3B3B3]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        className="rounded-md bg-brand-maroon px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-maroon/90 disabled:opacity-60"
                      >
                        {deletingId === record.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
