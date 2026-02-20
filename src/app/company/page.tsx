import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개 | 에스제이에셋대부(주)",
};

const items = [
  {
    label: "설립 연도",
    value: "2015년",
  },
  {
    label: "등록번호",
    value: "대부업 제00-00-0000호",
  },
  {
    label: "대표자",
    value: "홍길동",
  },
  {
    label: "소재지",
    value: "서울특별시 강남구 테헤란로 152, 4층",
  },
];

const values = [
  {
    title: "신뢰",
    desc: "10년 이상의 업력과 투명한 거래를 통해 고객과의 신뢰를 최우선으로 생각합니다.",
  },
  {
    title: "전문성",
    desc: "금융 분야 전문 인력이 고객의 상황에 맞는 최적의 자금 솔루션을 제공합니다.",
  },
  {
    title: "신속성",
    desc: "빠른 심사와 당일 지급을 원칙으로 고객의 자금 니즈에 즉시 대응합니다.",
  },
];

export default function CompanyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* 타이틀 */}
      <div className="mb-12">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">About Us</p>
        <h1 className="text-3xl font-bold text-gray-900">회사 소개</h1>
        <div className="mt-4 h-px w-12 bg-gray-900" />
      </div>

      {/* 인사말 */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">대표 인사말</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
          <p className="text-gray-600 leading-8 text-sm">
            에스제이에셋대부(주)를 방문해 주신 여러분께 진심으로 감사드립니다.
            <br />
            <br />
            저희 에스제이에셋대부는 2015년 설립 이래 고객 여러분의 금융 애로 사항을 해결하기
            위해 끊임없이 노력해 왔습니다. 급변하는 금융 환경 속에서도 고객의 편에서 생각하고,
            합리적인 금리와 유연한 상환 조건으로 실질적인 도움을 드리는 것이 저희의 사명입니다.
            <br />
            <br />
            투명하고 공정한 대출 관행을 바탕으로, 여러분의 소중한 자금 계획을 함께 설계해
            드리겠습니다. 앞으로도 더욱 신뢰받는 기업이 되도록 최선을 다하겠습니다.
            <br />
            <br />
            감사합니다.
          </p>
          <p className="mt-6 text-sm font-medium text-gray-800 text-right">
            에스제이에셋대부(주) 대표 홍길동
          </p>
        </div>
      </section>

      {/* 회사 정보 */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">회사 정보</h2>
        <dl className="border border-gray-100 rounded-lg overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex border-b border-gray-100 last:border-b-0"
            >
              <dt className="w-32 shrink-0 px-6 py-4 bg-gray-50 text-xs text-gray-500 font-medium flex items-center">
                {item.label}
              </dt>
              <dd className="px-6 py-4 text-sm text-gray-800">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 핵심 가치 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">핵심 가치</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="border border-gray-100 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <p className="text-base font-semibold text-gray-900 mb-2">{v.title}</p>
              <p className="text-xs text-gray-500 leading-6">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 법적 고지 */}
      <div className="mt-12 p-4 bg-amber-50 border border-amber-100 rounded text-xs text-amber-700 leading-5">
        ※ 대부업은 고금리이므로 꼭 필요한 경우에만 이용하시기 바라며, 과도한 부채는 신용도
        하락 및 재산 손실의 위험이 있습니다. 대출 전 금리 및 상환 방법을 반드시 확인하십시오.
      </div>
    </div>
  );
}
