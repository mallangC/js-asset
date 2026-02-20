import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "공지사항 | 에스제이에셋대부(주)",
};

export default async function NoticesPage() {
  const supabase = await createClient();

  const [{ data: notices }, { data: { user } }] = await Promise.all([
    supabase.from("notices").select("*").order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);

  const isAdmin = !!user;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Notice</p>
          <h1 className="text-3xl font-bold text-gray-900">공지사항</h1>
          <div className="mt-4 h-px w-12 bg-gray-900" />
        </div>

        {isAdmin && (
          <Link
            href="/notices/new"
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            + 공지사항 작성
          </Link>
        )}
      </div>

      {!notices || notices.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400 text-sm">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <ul className="border-t border-gray-200">
          {notices.map((notice, i) => (
            <li key={notice.id} className="border-b border-gray-100">
              <Link
                href={`/notices/${notice.id}`}
                className="flex items-center gap-6 py-5 group hover:bg-gray-50 -mx-4 px-4 transition-colors"
              >
                <span className="text-xs text-gray-300 w-8 text-right shrink-0">
                  {(notices?.length ?? 0) - i}
                </span>
                <span className="flex-1 text-sm text-gray-800 group-hover:text-gray-900 truncate">
                  {notice.title}
                </span>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
