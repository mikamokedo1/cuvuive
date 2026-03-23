import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

/**
 * Build a truncated list of page numbers with ellipsis.
 * Always shows: first page, last page, and a window of ±1 around current page.
 * Example outputs for currentPage=6, totalPages=20:
 *   [1, '…', 5, 6, 7, '…', 20]
 */
function getPageRange(current: number, total: number): (number | "…")[] {
  const SIBLING = 1; // pages shown on each side of current
  const items: (number | "…")[] = [];

  const rangeStart = Math.max(2, current - SIBLING);
  const rangeEnd = Math.min(total - 1, current + SIBLING);

  // Always add first page
  items.push(1);

  // Left ellipsis
  if (rangeStart > 2) {
    items.push("…");
  }

  // Middle range
  for (let i = rangeStart; i <= rangeEnd; i++) {
    items.push(i);
  }

  // Right ellipsis
  if (rangeEnd < total - 1) {
    items.push("…");
  }

  // Always add last page (if more than 1 page)
  if (total > 1) {
    items.push(total);
  }

  return items;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageRange = getPageRange(currentPage, totalPages);

  // Helper to construct page URLs
  const getPageUrl = (page: number) => {
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center space-x-1 sm:space-x-2 py-12" aria-label="Pagination">
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
        {pageRange.map((item, idx) =>
          item === "…" ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 sm:w-10 h-10 flex items-center justify-center text-slate-400 select-none"
            >
              …
            </span>
          ) : (
            <Link
              key={item}
              href={getPageUrl(item)}
              className={`w-8 sm:w-10 h-10 flex items-center justify-center rounded-xl text-sm sm:text-base font-semibold transition-all ${
                currentPage === item
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
              }`}
            >
              {item}
            </Link>
          )
        )}
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
