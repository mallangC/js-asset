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

export async function createNotice(formData: FormData) {
  const supabase = await requireAuth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    throw new Error("제목과 내용을 입력해주세요.");
  }

  const { error } = await supabase
    .from("notices")
    .insert({ title: title.trim(), content: content.trim() });

  if (error) throw new Error("공지사항 작성에 실패했습니다.");

  revalidatePath("/notices");
  revalidatePath("/");
  redirect("/notices");
}

export async function updateNotice(id: number, formData: FormData) {
  const supabase = await requireAuth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title?.trim() || !content?.trim()) {
    throw new Error("제목과 내용을 입력해주세요.");
  }

  const { error } = await supabase
    .from("notices")
    .update({ title: title.trim(), content: content.trim() })
    .eq("id", id);

  if (error) throw new Error("공지사항 수정에 실패했습니다.");

  revalidatePath("/notices");
  revalidatePath(`/notices/${id}`);
  revalidatePath("/");
  redirect(`/notices/${id}`);
}

export async function deleteNotice(id: number) {
  const supabase = await requireAuth();

  const { error } = await supabase.from("notices").delete().eq("id", id);

  if (error) throw new Error("공지사항 삭제에 실패했습니다.");

  revalidatePath("/notices");
  revalidatePath("/");
  redirect("/notices");
}
