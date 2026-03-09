import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Helper to construct page URLs
  const getPageUrl = (page: number) => {
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center space-x-2 py-12" aria-label="Pagination">
      {/* Previous Page */}
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        className={`p-2 rounded-xl border border-slate-200 transition-all ${
          currentPage > 1
            ? "text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500"
            : "text-slate-300 cursor-not-allowed pointer-events-none"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pages.map((page) => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all ${
              currentPage === page
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next Page */}
      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
        className={`p-2 rounded-xl border border-slate-200 transition-all ${
          currentPage < totalPages
            ? "text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500"
            : "text-slate-300 cursor-not-allowed pointer-events-none"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}
