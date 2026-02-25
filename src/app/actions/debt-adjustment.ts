"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BUCKET = "debt-adjustment";

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
    console.error(`[debt-adjustment] storage upload error:`, error.message, error);
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

export async function createDebtAdjustmentNotice(formData: FormData) {
  const supabase = await requireAuth();

  const title = formData.get("title") as string;
  const imageFile = formData.get("image_file") as File | null;
  const hwpFile = formData.get("hwp_file") as File | null;

  if (!title?.trim()) {
    throw new Error("제목을 입력해주세요.");
  }

  let image_path: string | null = null;
  let hwp_path: string | null = null;

  if (imageFile && imageFile.size > 0) {
    image_path = await uploadFile(supabase, imageFile, imageFile.type || "image/png");
  }

  if (hwpFile && hwpFile.size > 0) {
    hwp_path = await uploadFile(supabase, hwpFile, "application/x-hwp");
  }

  const { error } = await supabase.from("debt_adjustment_notices").insert({
    title: title.trim(),
    image_path,
    hwp_path,
  });

  if (error) {
    console.error("[debt-adjustment] DB insert error:", error.message, error.details, error.hint, error.code);
    throw new Error(`채무조정 지원제도 안내 등록 실패: ${error.message}`);
  }

  revalidatePath("/debt-adjustment");
  redirect("/debt-adjustment");
}

export async function deleteDebtAdjustmentNotice(id: number) {
  const supabase = await requireAuth();

  const { data: notice } = await supabase
    .from("debt_adjustment_notices")
    .select("image_path, hwp_path")
    .eq("id", id)
    .single();

  await removeStorageFile(supabase, notice?.image_path ?? null);
  await removeStorageFile(supabase, notice?.hwp_path ?? null);

  const { error } = await supabase.from("debt_adjustment_notices").delete().eq("id", id);
  if (error) throw new Error("채무조정 지원제도 안내 삭제에 실패했습니다.");

  revalidatePath("/debt-adjustment");
  redirect("/debt-adjustment");
}
