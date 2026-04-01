"use client";

import Link from "next/link";

export function FacebookMessenger() {
  const pageId = "1034628276400741";

  if (!pageId) return null;

  return (
    <Link
      href={`https://m.me/${pageId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Chat với chúng tôi qua Messenger"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
      >
        <path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.915 1.505 5.505 3.823 7.185v3.465a.5.5 0 00.77.417l3.14-2.09c1.037.288 2.14.444 3.267.444 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.22 12.336l-2.484-2.65-4.832 2.65 5.3-5.636 2.505 2.65 4.81-2.65-5.3 5.636z" />
      </svg>
      
      {/* Tuỳ chọn: Thêm một chấm đỏ nhỏ giả lập thông báo (chưa đọc) để thu hút sự chú ý */}
      <span className="absolute right-0 top-0 flex h-3.5 w-3.5 pt-1">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white"></span>
      </span>
    </Link>
  );
}
