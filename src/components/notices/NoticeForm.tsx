"use client";

import { useTransition } from "react";
import type { Notice } from "@/types";

type Props = {
  notice?: Notice;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export default function NoticeForm({ notice, action, submitLabel }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={notice?.title ?? ""}
          placeholder="제목을 입력하세요"
          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          defaultValue={notice?.content ?? ""}
          placeholder="내용을 입력하세요"
          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors resize-y leading-relaxed"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {isPending ? "처리 중..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
