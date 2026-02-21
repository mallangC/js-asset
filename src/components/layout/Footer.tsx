import { COMPANY } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-800">{COMPANY.name}</p>
            <p className="text-xs text-gray-500 mt-1">주요사업: {COMPANY.businessType}</p>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>{COMPANY.address}</p>
            <p>대표번호: {COMPANY.phone} | 팩스: {COMPANY.fax}</p>
            <p>평일 09:00 ~ 18:00 (토·일·공휴일 휴무)</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            대부업은 고금리이므로 신중하게 이용하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
