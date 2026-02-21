import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createFaq } from "@/app/actions/faqs";

export const metadata: Metadata = {
  title: "FAQ 추가 | 에스제이에셋대부(주)",
};

export default async function NewFaqPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Admin</p>
        <h1 className="text-2xl font-bold text-gray-900">FAQ 추가</h1>
        <div className="mt-4 h-px w-12 bg-gray-900" />
      </div>

      <FaqForm action={createFaq} submitLabel="등록" />
    </div>
  );
}

function FaqForm({
  action,
  submitLabel,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  defaultValues?: { question?: string; answer?: string; display_order?: number };
}) {
  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
          질문 <span className="text-red-500">*</span>
        </label>
        <input
          id="question"
          name="question"
          type="text"
          required
          defaultValue={defaultValues?.question ?? ""}
          placeholder="질문을 입력하세요"
          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
          답변 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="answer"
          name="answer"
          required
          rows={8}
          defaultValue={defaultValues?.answer ?? ""}
          placeholder="답변을 입력하세요"
          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors resize-y leading-relaxed"
        />
      </div>

      <div>
        <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-2">
          정렬 순서
        </label>
        <input
          id="display_order"
          name="display_order"
          type="number"
          defaultValue={defaultValues?.display_order ?? 0}
          placeholder="0"
          className="w-32 px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors"
        />
        <p className="mt-1 text-xs text-gray-400">숫자가 작을수록 위에 표시됩니다.</p>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <a
          href="/customer"
          className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          취소
        </a>
        <button
          type="submit"
          className="px-5 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
