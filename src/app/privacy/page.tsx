import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { HeaderHome } from "@/components/layout/HeaderHome";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | Cú Thông Minh",
  description: "Chính sách bảo mật và quyền riêng tư của ứng dụng Cú Thông Minh dành cho trẻ em.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Chính sách bảo mật | Cú Thông Minh",
    description: "Chính sách bảo mật và quyền riêng tư của ứng dụng Cú Thông Minh dành cho trẻ em.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Chính sách bảo mật" }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)]">
      <HeaderHome />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-lg text-slate-500">Cập nhật lần cuối: 23 tháng 3, 2026</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-baloo-2)] prose-headings:text-slate-900 prose-a:text-[#FF9C01] hover:prose-a:text-orange-600">
          <p className="lead text-lg text-slate-600 font-medium mb-8">
            Chào mừng bạn đến với Cú Thông Minh. Việc bảo vệ dữ liệu cá nhân của người dùng, đặc biệt là trẻ em, là ưu
            tiên hàng đầu của chúng tôi. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin
            của bạn.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. Thông tin chúng tôi thu thập</h2>
          <ul className="space-y-2 text-slate-600">
            <li>
              <strong>Thông tin tài khoản:</strong> Khi quý phụ huynh đăng ký tài khoản, chúng tôi lưu trữ Tên, Địa chỉ
              Email và Mật khẩu (được mã hóa) để phục vụ việc đăng nhập.
            </li>
            <li>
              <strong>Thông tin hồ sơ trẻ em:</strong> Biệt danh (Nickname), tuổi và giới tính của bé để cá nhân hóa lộ
              trình học tập và giao diện trò chơi.
            </li>
            <li>
              <strong>Dữ liệu học tập:</strong> Tiến trình hoàn thành trò chơi, các bài học đã vượt qua, và điểm số của
              bé nhằm giúp phụ huynh theo dõi sát sao sự tiến bộ của con.
            </li>
            <li>
              <strong>Thông tin thiết bị:</strong> Phiên bản hệ điều hành, loại trình duyệt để tối ưu hóa hiệu suất ứng
              dụng.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">2. Mục đích sử dụng thông tin</h2>
          <p className="text-slate-600">Những thông tin thu thập được sử dụng duy nhất cho các mục đích:</p>
          <ul className="space-y-2 text-slate-600">
            <li>Cung cấp, duy trì và cải thiện các tính năng trò chơi giáo dục trên Cú Thông Minh.</li>
            <li>Tạo biểu đồ và báo cáo tiến trình học tập để hiển thị trong khu vực dành riêng cho Phụ huynh.</li>
            <li>Hỗ trợ kỹ thuật và giải quyết các sự cố phát sinh trong quá trình sử dụng.</li>
            <li>Gửi các thông báo liên quan đến tài khoản (ví dụ: đặt lại mật khẩu).</li>
          </ul>

          <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl my-8">
            <h3 className="text-xl font-bold text-orange-800 mb-2 mt-0">Tuyệt đối không có quảng cáo</h3>
            <p className="text-slate-700 m-0">
              Chúng tôi cam kết 100% không thu thập dữ liệu người dùng để phục vụ cho mục đích chạy quảng cáo, và hoàn
              toàn không có quảng cáo của bên thứ ba nào xuất hiện trong ứng dụng dành cho trẻ em.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">3. Bảo vệ dữ liệu của trẻ em (COPPA)</h2>
          <p className="text-slate-600">
            Cú Thông Minh tuân thủ nghiêm ngặt các quy định về bảo vệ quyền riêng tư của trẻ em trên không gian mạng.
            Trẻ em không thể tự tạo tài khoản; chỉ phụ huynh hoặc người giám hộ hợp pháp mới có quyền đăng ký và quản lý
            tài khoản. Chúng tôi không bao giờ yêu cầu trẻ em cung cấp họ tên thật, địa chỉ nhà hoặc thông tin liên lạc.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">4. Chia sẻ thông tin với bên thứ ba</h2>
          <p className="text-slate-600">
            Chúng tôi <strong>không bán, không trao đổi và không cho thuê</strong> thông tin cá nhân của người dùng cho
            bất kỳ bên thứ ba nào. Dữ liệu chỉ được chia sẻ trong các trường hợp thật sự cần thiết như:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>Khi có yêu cầu hợp pháp từ cơ quan thực thi pháp luật có thẩm quyền.</li>
            <li>
              Sử dụng các dịch vụ lưu trữ đám mây (Cloud Server) từ các đối tác uy tín, những đối tác này cũng bị ràng
              buộc nghiêm ngặt bởi các điều khoản bảo mật tương tự.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">5. Thời gian lưu trữ dữ liệu</h2>
          <p className="text-slate-600" id="delete-data">
            Dữ liệu cá nhân và lịch sử học tập sẽ được lưu trữ an toàn trên hệ thống máy chủ của chúng tôi trong suốt
            quá trình tài khoản vẫn còn hiệu lực (chưa bị xóa). Bạn có quyền yêu cầu xóa toàn bộ dữ liệu hoặc xóa tài
            khoản vĩnh viễn bất kỳ lúc nào thông qua phần Cài đặt trong ứng dụng.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">6. Hướng Dẫn Xóa Dữ Liệu (User Data Deletion)</h2>
          <p className="text-slate-600">
            Người dùng (bao gồm cả những người đăng nhập thông qua Facebook hoặc các nền tảng khác) có toàn quyền yêu
            cầu xóa tài khoản và xóa mọi dữ liệu cá nhân bất kỳ lúc nào. Để thực hiện, vui lòng làm theo một trong các
            cách sau:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>
              <strong>Trong ứng dụng:</strong> Đăng nhập vào ứng dụng Cú Thông Minh, truy cập phần{" "}
              <strong>Cài đặt</strong> và chọn <strong>Xóa Tài Khoản</strong>. Dữ liệu sẽ được xóa hoàn toàn.
            </li>
            <li>
              <strong>Qua Facebook:</strong> Đi tới Cài đặt & Quyền riêng tư trên Facebook &gt; Cài đặt &gt; Ứng dụng và
              Trang web &gt; Tìm Cú Thông Minh và chọn <strong>Gỡ</strong>. Sau đó, bạn có thể nhấp vào{" "}
              <em>Gửi yêu cầu xóa dữ liệu</em>.
            </li>
            <li>
              <strong>Qua Email:</strong> Gửi email đến <strong>hotro@cuthongminh.com</strong> với tiêu đề{" "}
              <em>"Yêu cầu xóa dữ liệu cá nhân (Data Deletion Request)"</em> kèm địa chỉ email đăng ký tài khoản của
              bạn. Chúng tôi sẽ xác nhận và xóa dữ liệu trong vòng tối đa 3 ngày làm việc.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">7. Quyền của phụ huynh</h2>
          <ul className="space-y-2 text-slate-600">
            <li>Xem lại toàn bộ thông tin cá nhân mà chúng tôi đã thu thập từ gia đình.</li>
            <li>Yêu cầu chúng tôi xóa dữ liệu liên quan đến trẻ hoặc tài khoản của bạn.</li>
            <li>Từ chối bất kỳ sự thu thập hoặc sử dụng thông tin mới nào trong tương lai.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">8. Thay đổi Chính sách Bảo mật</h2>
          <p className="text-slate-600">
            Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian do các thay đổi về tính năng, luật pháp hoặc
            sự phát triển của công nghệ. Mọi thay đổi lớn sẽ được thông báo rõ ràng bằng email hoặc thông báo trực tiếp
            khi phụ huynh mở ứng dụng.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">9. Liên hệ</h2>
          <p className="text-slate-600">
            Nếu có bất kỳ thắc mắc nào về Chính sách Bảo mật, vui lòng liên hệ với chúng tôi:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>
              <strong>Email:</strong> hotro@cuthongminh.com
            </li>
            <li>
              <strong>Hotline:</strong> 0888222293
            </li>
            {/* <li>
              <strong>Địa chỉ:</strong> [Địa chỉ văn phòng công ty]
            </li> */}
          </ul>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white py-10 border-t border-slate-200 mt-10">
        <div className="container mx-auto px-6 text-center text-slate-500 font-medium text-sm">
          &copy; {new Date().getFullYear()} Cú Thông Minh. Bản quyền thuộc về Cú Thông Minh Educational.
        </div>
      </footer>
    </div>
  );
}
