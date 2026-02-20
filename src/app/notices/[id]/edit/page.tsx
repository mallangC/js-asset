import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import NoticeForm from "@/components/notices/NoticeForm";
import { updateNotice } from "@/app/actions/notices";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "공지사항 수정 | 에스제이에셋대부(주)",
};

export default async function EditNoticePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: notice }, { data: { user } }] = await Promise.all([
    supabase.from("notices").select("*").eq("id", id).single(),
    supabase.auth.getUser(),
  ]);

  if (!user) redirect("/admin");
  if (!notice) notFound();

  const action = updateNotice.bind(null, notice.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Admin</p>
        <h1 className="text-2xl font-bold text-gray-900">공지사항 수정</h1>
        <div className="mt-4 h-px w-12 bg-gray-900" />
      </div>

      <NoticeForm notice={notice} action={action} submitLabel="수정 완료" />
    </div>
  );
}
