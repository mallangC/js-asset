import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import NoticeForm from "@/components/notices/NoticeForm";
import { createNotice } from "@/app/actions/notices";

export const metadata: Metadata = {
  title: "공지사항 작성 | 에스제이에셋대부(주)",
};

export default async function NewNoticePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Admin</p>
        <h1 className="text-2xl font-bold text-gray-900">공지사항 작성</h1>
        <div className="mt-4 h-px w-12 bg-gray-900" />
      </div>

      <NoticeForm action={createNotice} submitLabel="등록" />
    </div>
  );
}
