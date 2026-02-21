"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");
  return supabase;
}

export async function createFaq(formData: FormData) {
  const supabase = await requireAuth();

  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  const display_order = parseInt(formData.get("display_order") as string) || 0;

  if (!question?.trim() || !answer?.trim()) {
    throw new Error("질문과 답변을 입력해주세요.");
  }

  const { error } = await supabase
    .from("faqs")
    .insert({ question: question.trim(), answer: answer.trim(), display_order });

  if (error) throw new Error("FAQ 작성에 실패했습니다.");

  revalidatePath("/customer");
  redirect("/customer");
}

export async function updateFaq(id: number, formData: FormData) {
  const supabase = await requireAuth();

  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  const display_order = parseInt(formData.get("display_order") as string) || 0;

  if (!question?.trim() || !answer?.trim()) {
    throw new Error("질문과 답변을 입력해주세요.");
  }

  const { error } = await supabase
    .from("faqs")
    .update({ question: question.trim(), answer: answer.trim(), display_order })
    .eq("id", id);

  if (error) throw new Error("FAQ 수정에 실패했습니다.");

  revalidatePath("/customer");
  redirect("/customer");
}

export async function deleteFaq(id: number) {
  const supabase = await requireAuth();

  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) throw new Error("FAQ 삭제에 실패했습니다.");

  revalidatePath("/customer");
  redirect("/customer");
}
