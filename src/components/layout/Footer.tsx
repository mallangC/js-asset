export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-800">에스제이에셋대부(주)</p>
            <p className="text-xs text-gray-500 mt-1">등록번호: 대부업 제00-00-0000호</p>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>서울특별시 강남구 테헤란로 152, 4층</p>
            <p>대표전화: 02-0000-0000 | 팩스: 02-0000-0001</p>
            <p>평일 09:00 ~ 18:00 (토·일·공휴일 휴무)</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} 에스제이에셋대부(주). All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            대부업은 고금리이므로 신중하게 이용하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
