import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createDebtAdjustmentNotice } from "@/app/actions/debt-adjustment";

export const metadata: Metadata = {
  title: "채무조정 지원제도 안내 등록 | 에스제이에셋대부(주)",
};

export default async function NewDebtAdjustmentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Admin</p>
        <h1 className="text-2xl font-bold text-gray-900">채무조정 지원제도 안내 등록</h1>
        <div className="mt-4 h-px w-12 bg-gray-900" />
      </div>

      <form action={createDebtAdjustmentNotice} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="예: 채무조정 지원제도 안내"
            className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="image_file" className="block text-sm font-medium text-gray-700 mb-2">
            이미지 파일 <span className="text-gray-400 font-normal">(선택)</span>
          </label>
          <input
            id="image_file"
            name="image_file"
            type="file"
            accept="image/*"
            className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          <p className="mt-1 text-xs text-gray-400">
            안내 내용 이미지를 선택하면 스토리지에 업로드됩니다.
          </p>
        </div>

        <div>
          <label htmlFor="hwp_file" className="block text-sm font-medium text-gray-700 mb-2">
            HWP 파일 <span className="text-gray-400 font-normal">(선택)</span>
          </label>
          <input
            id="hwp_file"
            name="hwp_file"
            type="file"
            accept=".hwp,.hwpx"
            className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          <p className="mt-1 text-xs text-gray-400">
            HWP 파일을 선택하면 스토리지에 업로드됩니다.
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <a
            href="/debt-adjustment"
            className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            취소
          </a>
          <button
            type="submit"
            className="px-5 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
