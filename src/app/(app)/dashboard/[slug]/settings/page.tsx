import { redirect } from "next/navigation";

export default function SettingsPage({ params }: { params: { slug: string } }) {
  redirect(`/dashboard/${params.slug}/settings/account`);
}
