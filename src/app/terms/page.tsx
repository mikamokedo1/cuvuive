import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { HeaderHome } from "@/components/layout/HeaderHome";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | Cú Thông Minh",
  description: "Điều khoản và điều kiện sử dụng dịch vụ của Cú Thông Minh dành cho phụ huynh và học sinh.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-[family-name:var(--font-nunito-sans)]">
      <HeaderHome />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 shadow-sm">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-4 tracking-tight">
            Điều Khoản Sử Dụng
          </h1>
          <p className="text-lg text-slate-500">Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12 prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-baloo-2)] prose-headings:text-slate-900 prose-a:text-[#FF9C01] hover:prose-a:text-orange-600">
          <p className="lead text-lg text-slate-600 font-medium mb-8">
            Chào mừng bạn đến với Cú Thông Minh! Các Điều khoản sử dụng này ("Điều khoản") quy định quan hệ giữa Cú
            Thông Minh ("Chúng tôi") và Bạn ("Người dùng", "Phụ huynh" hoặc "Người giám hộ") khi sử dụng ứng dụng và các
            dịch vụ liên quan.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">1. Chấp nhận Điều khoản</h2>
          <p className="text-slate-600">
            Bằng việc tải xuống, truy cập hoặc sử dụng ứng dụng Cú Thông Minh, bạn đồng ý tuân thủ và bị ràng buộc bởi
            các Điều khoản này. Nếu bạn không đồng ý với toàn bộ Điều khoản, vui lòng không sử dụng dịch vụ của chúng
            tôi.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">2. Đối tượng Người Dùng</h2>
          <p className="text-slate-600">
            Ứng dụng Cú Thông Minh chủ yếu hướng tới đối tượng người dùng là trẻ em từ 3 đến 8 tuổi. Tuy nhiên, việc
            đăng ký tạo lập tài khoản, thực hiện các giao dịch mua bán gói cước (nếu có) và quản lý thiết lập phải được
            thực hiện bởi người lớn (bố mẹ hoặc người giám hộ hợp pháp trên 18 tuổi). Bạn chịu trách nhiệm giám sát hoạt
            động của con em mình trên ứng dụng.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">3. Quyền Sở Hữu Trí Tuệ</h2>
          <ul className="space-y-2 text-slate-600">
            <li>
              Tất cả hình ảnh động vật, thiết kế giao diện, logo (như Cú Vui Vẻ), mã nguồn, kịch bản trò chơi bài học
              thuộc bản quyền và tài sản duy nhất của Cú Thông Minh Educational.
            </li>
            <li>
              Người dùng được cấp một giấy phép không độc quyền, không thể chuyển nhượng để cài đặt ứng dụng và chỉ sử
              dụng cho mục đích cá nhân, phi thương mại. Bất cứ hành vi sao chép, làm lại hay bán lại sản phẩm đều vi
              phạm bản quyền gốc.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">4. Phí Dịch Vụ và Gói Đăng Ký (Premium)</h2>
          <ul className="space-y-2 text-slate-600">
            <li>
              Cú Thông Minh có thể cung cấp các tài khoản trải nghiệm miễn phí với quyền truy cập một số bài học cơ
              bản.{" "}
            </li>
            <li>
              Để mở khóa toàn bộ kho trò chơi, bạn cần thanh toán qua một "Gói định kỳ" theo tháng hoặc năm được thiết
              lập trên ứng dụng.
            </li>
            <li>
              Tất cả khoản thanh toán là khoản phí cuối cùng. Việc gia hạn có thể là tự động (nếu thông qua App
              Store/Google Play), và bạn hoàn toàn có thể tự hủy đăng ký ngay ở Cài đặt thiết bị nếu không có nhu cầu
              tiếp tục.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">5. Hành vi bị cấm</h2>
          <p className="text-slate-600">
            Là một nền tảng giáo dục cho trẻ nhỏ, chúng tôi có các yêu cầu nghiêm khắc. Bạn không được phép:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>
              Nỗ lực can thiệp, sử dụng bot (robotic tools), hay cố ý vượt rào cản tính năng, xâm phạm và trích xuất dữ
              liệu của Cú Thông Minh.
            </li>
            <li>Chia sẻ tài khoản công khai với số lượng thiết bị lớn vượt qua quy định nhằm mục đích thương mại.</li>
            <li>
              Thực hiện các chỉnh sửa nội dung vi phạp nguyên tắc đạo đức với tư cách phụ huynh trong quá trình nhập dữ
              liệu tên bé hoặc lời nhắc nhở.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">6. Giới hạn Trách nhiệm pháp lý</h2>
          <p className="text-slate-600">
            Chúng tôi nỗ lực mang đến các nội dung giáo dục chất lượng cao với tần suất hoạt động ổn định nhất, tuy
            nhiên không đảm bảo và không thể chịu trách nhiệm trong trường hợp ứng dụng gặp lỗi do hệ thống, thiết bị
            phần cứng của người dùng hay đường truyền kết nối mạng không đảm bảo.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">7. Liên hệ Hỗ trợ</h2>
          <p className="text-slate-600">
            Nếu bạn có thắc mắc liên quan tới quy tụ điều khoản, báo cáo lỗi bất thường trên Tài khoản, vui lòng liên
            hệ:
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>
              <strong>Email:</strong> hotro@cuthongminh.com
            </li>
            <li>
              <strong>Hotline:</strong> 0888222293
            </li>
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
