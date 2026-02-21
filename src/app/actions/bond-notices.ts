"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BUCKET = "bond-notices";

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin");
  return supabase;
}

export async function createBondNotice(formData: FormData) {
  const supabase = await requireAuth();

  const title = formData.get("title") as string;
  const pdfFile = formData.get("pdf_file") as File | null;

  if (!title?.trim()) {
    throw new Error("제목을 입력해주세요.");
  }

  let pdf_path: string | null = null;

  if (pdfFile && pdfFile.size > 0) {
    const ext = pdfFile.name.split(".").pop() ?? "pdf";
    const fileName = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, pdfFile, { contentType: "application/pdf", upsert: false });

    if (uploadError) throw new Error("PDF 업로드에 실패했습니다.");

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    pdf_path = publicUrl;
  }

  const { error } = await supabase.from("bond_notices").insert({
    title: title.trim(),
    pdf_path,
  });

  if (error) {
    console.error("DB 상세 에러:", error.message, error.details, error.hint);
    throw new Error("채권양도 예정공지 등록에 실패했습니다.");
  }

  revalidatePath("/bond-notices");
  redirect("/bond-notices");
}

export async function deleteBondNotice(id: number) {
  const supabase = await requireAuth();

  // PDF Storage 파일도 함께 삭제
  const { data: notice } = await supabase
    .from("bond_notices")
    .select("pdf_path")
    .eq("id", id)
    .single();

  if (notice?.pdf_path) {
    const url = new URL(notice.pdf_path);
    const parts = url.pathname.split(`/object/public/${BUCKET}/`);
    if (parts[1]) {
      await supabase.storage.from(BUCKET).remove([parts[1]]);
    }
  }

  const { error } = await supabase.from("bond_notices").delete().eq("id", id);
  if (error) throw new Error("채권양도 예정공지 삭제에 실패했습니다.");

  revalidatePath("/bond-notices");
  redirect("/bond-notices");
}
