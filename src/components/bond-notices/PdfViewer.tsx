"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  url: string;
};

export default function PdfViewer({ url }: Props) {
  const [numPages, setNumPages] = useState<number>(0);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  }, []);

  return (
    <div className="w-full border border-gray-100 rounded-lg overflow-auto bg-gray-50">
      <Document
        file={url}
        onLoadSuccess={onLoadSuccess}
        loading={
          <div className="py-20 text-center text-sm text-gray-400">PDF 불러오는 중...</div>
        }
        error={
          <div className="py-20 text-center text-sm text-red-400">PDF를 불러올 수 없습니다.</div>
        }
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div key={i + 1} className="flex justify-center py-2">
            <Page
              pageNumber={i + 1}
              width={800}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
