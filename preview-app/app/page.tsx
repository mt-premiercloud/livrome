import { redirect } from "next/navigation";

type SearchParams = Promise<{ book?: string }>;

export default async function Root({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const query = sp.book ? `?book=${encodeURIComponent(sp.book)}` : "";
  redirect(`/preview/start${query}`);
}
