import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import FaqAccordion from "@/components/customer/FaqAccordion";

export const metadata: Metadata = {
  title: "고객센터 | 에스제이에셋대부(주)",
};

export default async function CustomerPage() {
  const supabase = await createClient();

  const [{ data: faqs }, { data: { user } }] = await Promise.all([
    supabase.from("faqs").select("*").order("display_order", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  const isAdmin = !!user;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Customer Center</p>
          <h1 className="text-3xl font-bold text-gray-900">고객센터</h1>
          <div className="mt-4 h-px w-12 bg-gray-900" />
        </div>

        {isAdmin && (
          <Link
            href="/customer/new"
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            + FAQ 추가
          </Link>
        )}
      </div>

      <p className="mb-6 text-lg text-gray-500">자주하는 질문</p>
      <FaqAccordion faqs={faqs ?? []} isAdmin={isAdmin} />
    </div>
  );
}
