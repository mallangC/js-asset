import Image from "next/image";
import { COMPANY } from "@/lib/company";

export default function HeroSection() {
  return (
    <section className="relative h-140 flex items-center justify-center overflow-hidden bg-gray-900">
      {/* 배경 이미지 */}
      <Image
        src="/hero.png"
        alt="회의하는 사람들"
        fill
        priority
        className="object-cover"
      />
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center px-6">
        <p className="text-gray-300 text-sm tracking-widest uppercase mb-4">
          {COMPANY.nameEn}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          {COMPANY.name}
        </h1>
        <p className="mt-6 text-gray-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          신뢰와 전문성을 바탕으로 고객의 자산을 지켜드립니다.
        </p>
      </div>
    </section>
  );
}
