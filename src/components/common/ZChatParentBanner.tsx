// Banner giới thiệu ZChat cho phụ huynh (quản lý Zalo của con), trỏ về zachat.vn/phu-huynh.
// Ảnh tự host trong public/images/partners/zchat (CSP img-src chỉ cho phép 'self' và CDN của Cú Thông Minh);
// bản gốc và script tạo ảnh nằm ở dự án ZChat: landing/scripts/banners/build.mjs.

type Placement = "trang-chu" | "blog" | "danh-sach-blog";

interface ZChatParentBannerProps {
  /** Vị trí đặt banner, ghi vào utm_content để so sánh hiệu quả từng chỗ */
  placement: Placement;
  /** "responsive": banner ngang, đổi sang banner khối trên điện thoại; "box": luôn dùng banner khối (cột hẹp) */
  variant?: "responsive" | "box";
  className?: string;
}

const IMG = "/images/partners/zchat";
const ALT =
  "Con bắt đầu dùng Zalo? Cùng con kết nối, bố mẹ xem tin nhắn và nhận thông báo khi có người lạ nhắn cho con. Tìm hiểu cách dùng cùng con trên ZChat.";

export function ZChatParentBanner({ placement, variant = "responsive", className = "" }: ZChatParentBannerProps) {
  const href = `https://zachat.vn/phu-huynh?utm_source=cuthongminh&utm_medium=banner&utm_campaign=phu-huynh&utm_content=${placement}`;

  return (
    <aside aria-label="Giới thiệu ZChat cho phụ huynh" className={className}>
      <p className="mb-2 text-[11px] font-medium text-slate-400">Sản phẩm cùng đội ngũ Cú Thông Minh</p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener"
        className="block overflow-hidden rounded-2xl shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {variant === "box" ? (
          <picture>
            <source srcSet={`${IMG}/phu-huynh-box.webp`} type="image/webp" />
            <img
              src={`${IMG}/phu-huynh-box.png`}
              alt={ALT}
              width={600}
              height={500}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
        ) : (
          <picture>
            <source media="(max-width: 640px)" srcSet={`${IMG}/phu-huynh-box.webp`} type="image/webp" width={600} height={500} />
            <source media="(max-width: 640px)" srcSet={`${IMG}/phu-huynh-box.png`} width={600} height={500} />
            <source srcSet={`${IMG}/phu-huynh-wide.webp`} type="image/webp" />
            <img
              src={`${IMG}/phu-huynh-wide.png`}
              alt={ALT}
              width={1200}
              height={300}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
        )}
      </a>
    </aside>
  );
}
