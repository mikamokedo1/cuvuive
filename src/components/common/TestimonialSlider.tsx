"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialSlider() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Nhờ có Cú Thông Minh, hai bé nhà mình hào hứng học toán hơn hẳn. Mỗi tối đều nhắc mẹ cho chơi 'trò con cú'. Hình ảnh đẹp, dễ thương lắm!",
      author: "Mẹ Thúy Hạnh",
      role: "Phụ huynh bé 4 & 6 tuổi",
    },
    {
      text: "Mình rất yên tâm khi bé chơi trên Cú Thông Minh vì không có quảng cáo độc hại. Tính năng học chữ cái bằng hình ảnh rất trực quan, bé nhận mặt chữ rất nhanh.",
      author: "Bố Hoàng Nam",
      role: "Phụ huynh bé 5 tuổi",
    },
    {
      text: "Ứng dụng rất mượt, các trò chơi tìm điểm khác biệt giúp con rèn luyện sự tập trung rất tốt. Giao diện thân thiện và màu sắc tươi sáng thích hợp cho trẻ nhỏ.",
      author: "Cô Mai Anh",
      role: "Giáo viên mầm non",
    },
    {
      text: "Phần học Cảm xúc (EQ) thực sự độc đáo! Bọn trẻ học được cách nhận diện và đồng cảm qua những tình huống rất đời thường. Cực kỳ vote cho app!",
      author: "Mẹ Bảo Ngọc",
      role: "Phụ huynh bé 4 tuổi",
    },
    {
      text: "Các trò chơi toán học được lồng ghép cực kỳ khéo léo. Bé nhà mình trước đây ghét học số, giờ lại chủ động xin mẹ cho đếm cà rốt trên ứng dụng.",
      author: "Mẹ Tuấn Khang",
      role: "Phụ huynh bé 5 tuổi",
    },
    {
      text: "Tuyệt vời! App chạy mượt trên cả điện thoại và iPad mà không cần tải. Hình ảnh các con vật rất đáng yêu, âm thanh cực kỳ chuẩn tiếng Việt.",
      author: "Bố Minh Nhật",
      role: "Kỹ sư công nghệ",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="bg-orange-50 rounded-[3rem] p-8 lg:p-16 border border-orange-100 text-center relative shadow-sm group">
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-orange-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>

      <div className="flex justify-center mb-6 gap-2 relative z-10 transition-all duration-300">
        {[...Array(5)].map((_, i) => (
          <CheckCircle2 key={i} className="w-8 h-8 text-[#FF9C01] fill-[#FF9C01]/20" />
        ))}
      </div>

      <div className="relative z-10 min-h-[160px] flex flex-col justify-center overflow-hidden">
        <div className="transition-all duration-500 transform" key={currentTestimonial}>
          <h3 className="text-xl md:text-3xl font-bold text-slate-800 mb-8 font-[family-name:var(--font-baloo-2)] leading-relaxed italic max-w-4xl mx-auto px-4 md:px-12">
            "{testimonials[currentTestimonial].text}"
          </h3>
          <div className="flex flex-col items-center">
            <p className="text-slate-900 font-extrabold text-lg mb-1">{testimonials[currentTestimonial].author}</p>
            <p className="text-orange-600 font-semibold text-sm bg-orange-100 px-4 py-1.5 rounded-full inline-block">
              {testimonials[currentTestimonial].role}
            </p>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex justify-center items-center gap-4 mt-10 relative z-20">
        <button
          onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-200 border border-orange-100"
          aria-label="Xem nhận xét trước đó"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              aria-label={`Chuyển đến nhận xét ${i + 1}`}
              className="p-2 cursor-pointer outline-none touch-manipulation group"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 group-focus-visible:ring-4 group-focus-visible:ring-orange-300 ${
                  i === currentTestimonial ? "bg-orange-500 w-8" : "bg-orange-200 hover:bg-orange-300"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-200 border border-orange-100"
          aria-label="Xem nhận xét tiếp theo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
