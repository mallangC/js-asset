"use client";

import { useState } from "react";
import type { Faq } from "@/types";
import FaqAdminActions from "./FaqAdminActions";

type Props = {
  faqs: Faq[];
  isAdmin: boolean;
};

export default function FaqAccordion({ faqs, isAdmin }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (faqs.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-400 text-sm">등록된 FAQ가 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="border-t border-gray-200">
      {faqs.map((faq) => (
        <li key={faq.id} className="border-b border-gray-100">
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left group hover:bg-gray-50 -mx-4 px-4 transition-colors"
          >
            <span className="text-sm text-gray-800 font-medium group-hover:text-gray-900">
              Q. {faq.question}
            </span>
            <span className="shrink-0 text-gray-400 transition-transform duration-200" style={{ transform: openId === faq.id ? "rotate(180deg)" : "rotate(0deg)" }}>
              ▾
            </span>
          </button>

          {openId === faq.id && (
            <div className="px-4 pb-5">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {faq.answer}
              </p>
              {isAdmin && (
                <div className="mt-4">
                  <FaqAdminActions faqId={faq.id} />
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
