import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 공지사항 동적 페이지 목록 조회
  const { data: notices } = await supabase
    .from("notices")
    .select("id, updated_at")
    .order("created_at", { ascending: false });

  const noticeUrls: MetadataRoute.Sitemap = (notices ?? []).map((notice) => ({
    url: `${SITE_URL}/notices/${notice.id}`,
    lastModified: new Date(notice.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/company`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/notices`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/debt-adjustment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bond-notices`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/customer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/directions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...noticeUrls,
  ];
}
