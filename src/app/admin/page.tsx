import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인 | 에스제이에셋대부(주)",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 이미 로그인된 경우 공지사항 페이지로
  if (user) redirect("/notices");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">Admin</p>
          <h1 className="text-xl font-semibold text-gray-900">관리자 로그인</h1>
          <p className="text-xs text-gray-400 mt-2">
            에스제이에셋대부(주) 관리자 전용 페이지입니다.
          </p>
        </div>

        <div className="border border-gray-100 rounded-lg p-8 bg-white shadow-sm">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-300 mt-6">
          승인된 관리자만 접근 가능합니다.
        </p>
      </div>
    </div>
  );
}
