"use client";

import { Facebook, Link2, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://cuthongminh.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = fullUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-500">Chia sẻ:</span>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all"
        aria-label="Chia sẻ lên Facebook"
        title="Chia sẻ lên Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      {/* Zalo */}
      {/* <a
        href={`https://zalo.me/share?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-sky-600 hover:bg-sky-100 hover:scale-110 transition-all"
        aria-label="Chia sẻ qua Zalo"
        title="Chia sẻ qua Zalo"
      >
        <MessageCircle className="w-4 h-4" />
      </a> */}

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
          copied ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
        }`}
        aria-label="Sao chép liên kết"
        title={copied ? "Đã sao chép!" : "Sao chép liên kết"}
      >
        <Link2 className="w-4 h-4" />
      </button>

      {copied && (
        <span className="text-xs font-semibold text-green-600 animate-[fadeIn_0.2s_ease-out]">Đã sao chép!</span>
      )}
    </div>
  );
}
