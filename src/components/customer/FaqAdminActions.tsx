"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteFaq } from "@/app/actions/faqs";

type Props = {
  faqId: number;
};

export default function FaqAdminActions({ faqId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("FAQ를 삭제하시겠습니까?")) return;
    startTransition(async () => {
      await deleteFaq(faqId);
    });
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/customer/${faqId}/edit`}
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
