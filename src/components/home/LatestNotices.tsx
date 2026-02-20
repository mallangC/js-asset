import Link from "next/link";
import type { Notice } from "@/types";

type Props = {
  notices: Notice[];
};

function isNew(createdAt: string) {
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

export default function LatestNotices({ notices }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">최신 공지사항</h2>
        <Link
          href="/notices"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          전체 보기 →
        </Link>
      </div>

      {notices.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center border border-dashed border-gray-200 rounded">
          등록된 공지사항이 없습니다.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <li key={notice.id}>
              <Link
                href={`/notices/${notice.id}`}
                className="flex items-center justify-between py-4 group hover:bg-gray-50 -mx-4 px-4 rounded transition-colors"
              >
                <span className="flex items-center gap-2 truncate mr-4">
                  {isNew(notice.created_at) && (
                    <span className="shrink-0 text-[10px] font-bold text-red-500 border border-red-400 rounded px-1 py-px leading-none">
                      NEW
                    </span>
                  )}
                  <span className="text-sm text-gray-800 group-hover:text-gray-900 truncate">
                    {notice.title}
                  </span>
                </span>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
