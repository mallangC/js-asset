"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteNotice } from "@/app/actions/notices";

type Props = {
  noticeId: number;
};

export default function AdminActions({ noticeId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("공지사항을 삭제하시겠습니까?")) return;
    startTransition(async () => {
      await deleteNotice(noticeId);
    });
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/notices/${noticeId}/edit`}
        className="px-4 py-2 text-xs border border-gray-200 text-gray-600 rounded hover:bg-gray-50 transition-colors"
      >
        수정
      </Link>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="px-4 py-2 text-xs border border-red-200 text-red-500 rounded hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer"
      >
        {isPending ? "삭제 중..." : "삭제"}
      </button>
    </div>
  );
}
