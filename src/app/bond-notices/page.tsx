import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BondNoticeAdminActions from "@/components/bond-notices/BondNoticeAdminActions";

export const metadata: Metadata = {
  title: "채권양도 예정공지 | 에스제이에셋대부(주)",
};

export default async function BondNoticesPage() {
  const supabase = await createClient();

  const [{ data: notices }, { data: { user } }] = await Promise.all([
    supabase.from("bond_notices").select("*").order("created_at", { ascending: false }).limit(1),
    supabase.auth.getUser(),
  ]);

  const isAdmin = !!user;
  const notice = notices?.[0] ?? null;

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

      {!notice ? (
        <div className="py-24 text-center border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400 text-sm">등록된 채권양도 예정공지가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{notice.title}</h2>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
              </p>
            </div>
            {isAdmin && <BondNoticeAdminActions noticeId={notice.id} />}
          </div>

          <div className="relative w-full rounded-lg overflow-hidden border border-gray-100">
            <Image
              src="/bond-notices/image.png"
              alt={notice.title}
              width={900}
              height={600}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>

          {notice.pdf_path && (
            <div className="flex justify-center pt-2">
              <a
                href={notice.pdf_path}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                PDF 다운로드
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
