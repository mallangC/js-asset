"use client";

import { useTransition } from "react";
import { deleteDebtAdjustmentNotice } from "@/app/actions/debt-adjustment";

type Props = {
  noticeId: number;
};

export default function DebtAdjustmentAdminActions({ noticeId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("채무조정 지원제도 안내를 삭제하시겠습니까?")) return;
    startTransition(async () => {
      await deleteDebtAdjustmentNotice(noticeId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 text-xs border border-red-200 text-red-500 rounded hover:bg-red-50 disabled:opacity-50 transition-colors cursor-pointer"
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
