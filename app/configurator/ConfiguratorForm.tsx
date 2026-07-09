"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type ConfiguratorRecord = {
  id?: string;
  customer: string;
  contact: string;
  job_number: string;
  fleet: string;
  phone: string;
  order_number: string;
  dispatch_date_axle: string;
  dispatch_date_hanger: string;
  group_type: string;
  trailer_type: string;
  body_type: string;
  comments: string;
};

const emptyRecord: ConfiguratorRecord = {
  customer: "",
  contact: "",
  job_number: "",
  fleet: "",
  phone: "",
  order_number: "",
  dispatch_date_axle: "",
  dispatch_date_hanger: "",
  group_type: "Tridem Axle",
  trailer_type: "Dolly/Dog",
  body_type: "General Freight",
  comments: "",
};

export default function ConfiguratorForm({
  recordId,
  initialData,
}: {
  recordId?: string;
  initialData?: ConfiguratorRecord;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState<ConfiguratorRecord>(
    initialData ?? emptyRecord
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof ConfiguratorRecord, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      customer: form.customer || null,
      contact: form.contact || null,
      job_number: form.job_number || null,
      fleet: form.fleet || null,
      phone: form.phone || null,
      order_number: form.order_number || null,
      dispatch_date_axle: form.dispatch_date_axle || null,
      dispatch_date_hanger: form.dispatch_date_hanger || null,
      group_type: form.group_type || null,
      trailer_type: form.trailer_type || null,
      body_type: form.body_type || null,
      comments: form.comments || null,
    };

    const { error } = recordId
      ? await supabase
          .from("configurator_records")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", recordId)
      : await supabase.from("configurator_records").insert(payload);

    if (error) {
      setSaving(false);
      setError(error.message);
      return;
    }

    // No further steps built yet - save and return to the records list.
    router.push("/dashboard");
    router.refresh();
  };

  const inputClass =
    "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 focus:border-brand-maroon focus:outline-none focus:ring-1 focus:ring-brand-maroon";
  const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-black/70";

  return (
    <div className="min-h-screen bg-brand-gray p-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="mb-4 text-sm text-black/60 hover:text-black"
        >
          &larr; Back to records
        </button>

        <form
          onSubmit={handleNext}
          className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
        >
          <div className="bg-brand-maroon px-6 py-3 text-center text-lg font-bold text-white">
            Details
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Customer</label>
              <input
                className={inputClass}
                value={form.customer}
                onChange={(e) => update("customer", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Fleet</label>
              <input
                className={inputClass}
                value={form.fleet}
                onChange={(e) => update("fleet", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Contact</label>
              <input
                className={inputClass}
                value={form.contact}
                onChange={(e) => update("contact", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Job #</label>
              <input
                className={inputClass}
                value={form.job_number}
                onChange={(e) => update("job_number", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Order #</label>
              <input
                className={inputClass}
                value={form.order_number}
                onChange={(e) => update("order_number", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Dispatch Date - Axle</label>
              <input
                type="date"
                className={inputClass}
                value={form.dispatch_date_axle}
                onChange={(e) => update("dispatch_date_axle", e.target.value)}
              />
            </div>
            <div className="row-span-2">
              <label className={labelClass}>Comments</label>
              <textarea
                className={`${inputClass} h-[104px] resize-none`}
                value={form.comments}
                onChange={(e) => update("comments", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Dispatch Date - Hanger</label>
              <input
                type="date"
                className={inputClass}
                value={form.dispatch_date_hanger}
                onChange={(e) => update("dispatch_date_hanger", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Group Type</label>
              <select
                className={inputClass}
                value={form.group_type}
                onChange={(e) => update("group_type", e.target.value)}
              >
                <option>Tridem Axle</option>
                <option>Tandem Axle</option>
                <option>Single Axle</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Trailer Type</label>
              <select
                className={inputClass}
                value={form.trailer_type}
                onChange={(e) => update("trailer_type", e.target.value)}
              >
                <option>Dolly/Dog</option>
                <option>Semi</option>
                <option>Full Trailer</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Body Type</label>
              <select
                className={inputClass}
                value={form.body_type}
                onChange={(e) => update("body_type", e.target.value)}
              >
                <option>General Freight</option>
                <option>Refrigerated</option>
                <option>Tanker</option>
                <option>Flat Deck</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="mx-6 mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-brand-maroon">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-black/10 bg-black/[0.02] px-6 py-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-md px-4 py-2 text-sm font-semibold text-black/70 transition hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-black px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#B3B3B3] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
