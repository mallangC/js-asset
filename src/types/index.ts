export type Notice = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type BondNotice = {
  id: number;
  title: string;
  image_path: string | null;
  pdf_path: string | null;
  created_at: string;
};

export type DebtAdjustmentNotice = {
  id: number;
  title: string;
  image_path: string | null;
  hwp_path: string | null;
  created_at: string;
};
