"use client";

import { useEffect, useRef } from "react";

const ADDRESS = "서울특별시 강남구 테헤란로 152";
const LAT = 37.500713;
const LNG = 127.036427;

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        Marker: new (options: object) => { setMap: (map: object) => void };
      };
    };
  }
}

export default function DirectionsPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initKakaoMap = () => {
      if (!mapRef.current) return;
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;
        const center = new window.kakao.maps.LatLng(LAT, LNG);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });
        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(map);
      });
    };

    // 이미 로드된 경우 바로 초기화
    if (window.kakao) {
      initKakaoMap();
      return;
    }

    // 스크립트 동적 주입
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.onload = initKakaoMap;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Directions</p>
        <h1 className="text-3xl font-bold text-gray-900">오시는 길</h1>
        <div className="mt-4 h-px w-12 bg-gray-900" />
      </div>

      {/* 카카오 지도 */}
      <div
        ref={mapRef}
        className="w-full h-100 rounded-lg border border-gray-100 bg-gray-50"
      />

      {/* 주소 및 교통 정보 */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-4">주소</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="text-gray-400 shrink-0 w-16">도로명</dt>
              <dd className="text-gray-700">{ADDRESS}, 4층</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-gray-400 shrink-0 w-16">전화</dt>
              <dd className="text-gray-700">02-0000-0000</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-gray-400 shrink-0 w-16">운영시간</dt>
              <dd className="text-gray-700">평일 09:00 ~ 18:00</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-4">대중교통</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="text-gray-400 shrink-0 w-16">지하철</dt>
              <dd className="text-gray-700">
                2호선 강남역 4번 출구 도보 5분
                <br />
                신분당선 강남역 6번 출구 도보 7분
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-gray-400 shrink-0 w-16">버스</dt>
              <dd className="text-gray-700">강남역 정류장 하차 후 도보 5분</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
