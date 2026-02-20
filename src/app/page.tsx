import HeroSection from "@/components/home/HeroSection";
import LatestNotices from "@/components/home/LatestNotices";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <>
      <HeroSection />
      <LatestNotices notices={notices ?? []} />
    </>
  );
}
