import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminActions from "@/components/notices/AdminActions";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("notices").select("title").eq("id", id).single();
  return {
    title: data ? `${data.title} | 에스제이에셋대부(주)` : "공지사항",
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: notice }, { data: { user } }] = await Promise.all([
    supabase.from("notices").select("*").eq("id", id).single(),
    supabase.auth.getUser(),
  ]);

  if (!notice) notFound();

  const isAdmin = !!user;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* 뒤로 가기 */}
      <Link
        href="/notices"
        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors mb-10"
      >
        ← 목록으로
      </Link>

      {/* 제목 영역 */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">{notice.title}</h1>
        <div className="mt-3 flex items-center justify-between">
          <time className="text-xs text-gray-400">
            {new Date(notice.created_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {notice.updated_at !== notice.created_at && (
              <span className="ml-2 text-gray-300">(수정됨)</span>
            )}
          </time>

          {isAdmin && <AdminActions noticeId={notice.id} />}
        </div>
      </div>

      {/* 본문 */}
      <div className="notice-content text-sm text-gray-700 min-h-40">{notice.content}</div>

      {/* 하단 네비게이션 */}
      <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
        <Link
          href="/notices"
          className="px-6 py-2.5 border border-gray-200 text-sm text-gray-600 rounded hover:bg-gray-50 transition-colors"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
}
