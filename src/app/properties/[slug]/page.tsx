import { redirect } from "next/navigation";

export default function PropertiesSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/property/${params.slug}`);
}
