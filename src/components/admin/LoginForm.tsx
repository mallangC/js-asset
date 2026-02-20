"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setIsLoading(false);
      return;
    }

    router.push("/notices");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="admin@example.com"
          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1.5">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 pt-1">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50 transition-colors mt-2"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
