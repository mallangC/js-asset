import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import { COMPANY } from "@/lib/company";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navLinks = [
    { href: "/company", label: "회사소개" },
    { href: "/notices", label: "공지사항" },
    { href: "/bond-notices", label: "채권양도 예정공지" },
    { href: "/customer", label: "고객센터" },
    { href: "/directions", label: "오시는 길" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 relative flex items-center">
        {/* 로고 - 왼쪽 */}
        <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900">
          {COMPANY.nameShort}<span className="text-gray-400 font-normal text-sm ml-1">{COMPANY.nameParenthesis}</span>
        </Link>

        {/* 네비게이션 - 절대 중앙 */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 우측 */}
        <div className="ml-auto flex items-center gap-3">
          {user && <LogoutButton />}
        </div>
      </div>
    </header>
  );
}
