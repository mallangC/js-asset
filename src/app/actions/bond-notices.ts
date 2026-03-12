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

async function uploadFile(supabase: Awaited<ReturnType<typeof requireAuth>>, file: File, contentType: string) {
  const ext = file.name.split(".").pop() ?? "bin";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { contentType, upsert: false });

  if (error) {
    console.error(`[bond-notices] storage upload error:`, error.message, error);
    throw new Error(`파일 업로드에 실패했습니다: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return publicUrl;
}

async function removeStorageFile(supabase: Awaited<ReturnType<typeof requireAuth>>, filePath: string | null) {
  if (!filePath) return;
  const url = new URL(filePath);
  const parts = url.pathname.split(`/object/public/${BUCKET}/`);
  if (parts[1]) {
    await supabase.storage.from(BUCKET).remove([parts[1]]);
  }
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
    pdf_path = await uploadFile(supabase, pdfFile, "application/pdf");
  }

  const { error } = await supabase.from("bond_notices").insert({
    title: title.trim(),
    pdf_path,
  });

  if (error) {
    console.error("[bond-notices] DB insert error:", error.message, error.details, error.hint, error.code);
    throw new Error(`채권양도 예정공지 등록 실패: ${error.message}`);
  }

  revalidatePath("/bond-notices");
  redirect("/bond-notices");
}

export async function deleteBondNotice(id: number) {
  const supabase = await requireAuth();

  const { data: notice } = await supabase
    .from("bond_notices")
    .select("pdf_path")
    .eq("id", id)
    .single();

  await removeStorageFile(supabase, notice?.pdf_path ?? null);

  const { error } = await supabase.from("bond_notices").delete().eq("id", id);
  if (error) throw new Error("채권양도 예정공지 삭제에 실패했습니다.");

  revalidatePath("/bond-notices");
  redirect("/bond-notices");
}
