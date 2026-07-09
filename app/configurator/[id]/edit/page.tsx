import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ConfiguratorForm, { type ConfiguratorRecord } from "../../ConfiguratorForm";

export default async function EditConfiguratorRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("configurator_records")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const initialData: ConfiguratorRecord = {
    id: data.id,
    customer: data.customer ?? "",
    contact: data.contact ?? "",
    job_number: data.job_number ?? "",
    fleet: data.fleet ?? "",
    phone: data.phone ?? "",
    order_number: data.order_number ?? "",
    dispatch_date_axle: data.dispatch_date_axle ?? "",
    dispatch_date_hanger: data.dispatch_date_hanger ?? "",
    group_type: data.group_type ?? "Tridem Axle",
    trailer_type: data.trailer_type ?? "Dolly/Dog",
    body_type: data.body_type ?? "General Freight",
    comments: data.comments ?? "",
  };

  return <ConfiguratorForm recordId={id} initialData={initialData} />;
}
