import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BondNoticeAdminActions from "@/components/bond-notices/BondNoticeAdminActions";
import PdfViewer from "@/components/bond-notices/PdfViewer";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase.from("bond_notices").select("id").limit(1);
  const hasContent = (data ?? []).length > 0;

  return {
    title: "채권양도 예정공지",
    robots: hasContent ? undefined : { index: false, follow: false },
  };
}

export default async function BondNoticesPage() {
  const supabase = await createClient();

  const [{ data: notices }, { data: { user } }] = await Promise.all([
    supabase.from("bond_notices").select("*").order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);

  const isAdmin = !!user;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Bond Transfer Notice</p>
          <h1 className="text-3xl font-bold text-gray-900">채권양도 예정공지</h1>
          <div className="mt-4 h-px w-12 bg-gray-900" />
        </div>

        {isAdmin && (
          <Link
            href="/bond-notices/new"
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            + 공지 등록
          </Link>
        )}
      </div>

      {!notices || notices.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400 text-sm">등록된 채권양도 예정공지가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {notices.map((notice) => (
            <div key={notice.id} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{notice.title}</h2>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                {isAdmin && <BondNoticeAdminActions noticeId={notice.id} />}
              </div>

              {notice.pdf_path && <PdfViewer url={notice.pdf_path} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
