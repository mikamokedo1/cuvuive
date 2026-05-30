import Link from "next/link";
import { GROUPS } from "./constants";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

interface TalkWithOwlSeoSectionProps {
  groupId: string;
}

interface TopicSeoConfig {
  vocab: { eng: string; vi: string }[];
  introduction: string;
  relatedGames: { id: string; title: string; ogImage: string }[];
}

const SEO_TOPIC_CONFIGS: Record<string, TopicSeoConfig> = {
  greetings: {
    vocab: [
      { eng: "Hello / Hi", vi: "Xin chào" },
      { eng: "Good morning", vi: "Chào buổi sáng" },
      { eng: "Good afternoon", vi: "Chào buổi chiều" },
      { eng: "Good night", vi: "Chúc ngủ ngon" },
      { eng: "Goodbye", vi: "Tạm biệt" },
      { eng: "See you", vi: "Hẹn gặp lại" },
      { eng: "How are you?", vi: "Bạn khỏe không?" },
      { eng: "I'm fine, thank you", vi: "Tôi khỏe, cảm ơn" }
    ],
    introduction: "Luyện nói tiếng Anh chủ đề Chào Hỏi (Greetings) giúp các bé mầm non và tiểu học từ 3-8 tuổi làm quen với các câu chào xã giao cơ bản trong cuộc sống hàng ngày. Cô giáo AI Cú Thông Minh sẽ hướng dẫn bé cách phát âm chuẩn xác từ câu chào đơn giản như Hello, Hi cho đến các lời chúc ngủ ngon Good night, chào tạm biệt Goodbye. Bé sẽ tự tin phản xạ tự nhiên thông qua giọng nói trực tiếp.",
    relatedGames: [
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" },
      { id: "learn-english-alphabet", title: "Bảng chữ cái Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-alphabet/logo.webp" }
    ]
  },
  fruits: {
    vocab: [
      { eng: "Apple", vi: "Quả táo" },
      { eng: "Banana", vi: "Quả chuối" },
      { eng: "Orange", vi: "Quả cam" },
      { eng: "Grape", vi: "Quả nho" },
      { eng: "Mango", vi: "Quả xoài" },
      { eng: "Watermelon", vi: "Quả dưa hấu" },
      { eng: "Strawberry", vi: "Quả dâu tây" },
      { eng: "Pineapple", vi: "Quả dứa / thơm" },
      { eng: "Lemon", vi: "Quả chanh" }
    ],
    introduction: "Trò chơi giao tiếp chủ đề Trái Cây (Fruits) là nơi bé học các từ vựng về các loại quả ngọt ngào, quen thuộc xung quanh mình. Luyện phát âm chuẩn Anh - Mỹ trực tiếp qua giọng nói các từ như Apple, Banana, Orange, Mango giúp phát triển tư duy ngôn ngữ sớm. Cô giáo Cú luôn ấm áp đồng hành sửa lỗi phát âm và khích lệ bé học tốt hơn mỗi ngày.",
    relatedGames: [
      { id: "learn-fruit", title: "Trò chơi học Trái Cây", ogImage: "https://assets.cuthongminh.com/games/learn-fruit/logo.webp" },
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" }
    ]
  },
  colors: {
    vocab: [
      { eng: "Red", vi: "Màu đỏ" },
      { eng: "Blue", vi: "Màu xanh dương" },
      { eng: "Yellow", vi: "Màu vàng" },
      { eng: "Green", vi: "Màu xanh lá" },
      { eng: "Orange", vi: "Màu cam" },
      { eng: "Purple", vi: "Màu tím" },
      { eng: "Pink", vi: "Màu hồng" },
      { eng: "White", vi: "Màu trắng" },
      { eng: "Black", vi: "Màu đen" },
      { eng: "Brown", vi: "Màu nâu" }
    ],
    introduction: "Thế giới màu sắc sinh động (Colors) được đưa vào bài học tiếng Anh giao tiếp thông qua trò chơi đầy màu sắc. Bé tập nói các màu cơ bản như Red, Blue, Yellow và các màu nâng cao. Cô giáo AI Cú Thông Minh áp dụng phương pháp dạy song ngữ kết hợp trò chơi phản xạ bằng giọng nói trực quan giúp bé ghi nhớ nhanh, phát âm chuẩn tự nhiên.",
    relatedGames: [
      { id: "learn-color", title: "Trò chơi học Màu Sắc", ogImage: "https://assets.cuthongminh.com/games/learn-color-color.webp" },
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" }
    ]
  },
  numbers: {
    vocab: [
      { eng: "One", vi: "Số một (1)" },
      { eng: "Two", vi: "Số hai (2)" },
      { eng: "Three", vi: "Số ba (3)" },
      { eng: "Four", vi: "Số bốn (4)" },
      { eng: "Five", vi: "Số năm (5)" },
      { eng: "Six", vi: "Số sáu (6)" },
      { eng: "Seven", vi: "Số bảy (7)" },
      { eng: "Eight", vi: "Số tám (8)" },
      { eng: "Nine", vi: "Số chín (9)" },
      { eng: "Ten", vi: "Số mười (10)" },
      { eng: "Twenty", vi: "Số hai mươi (20)" }
    ],
    introduction: "Luyện đếm số bằng tiếng Anh chủ đề Số Đếm (Numbers) từ 1 đến 20 cùng cô giáo AI. Bé không chỉ đếm chay mà còn được rèn luyện nói trực tiếp các số đếm như One, Two, Three... trong các ngữ cảnh hội thoại giao tiếp vui nhộn. Phương pháp phản xạ giọng nói kích thích vùng ngôn ngữ não bộ của bé phát triển vượt trội.",
    relatedGames: [
      { id: "learn-numbers", title: "Trò chơi đếm số", ogImage: "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp" },
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" }
    ]
  },
  animals: {
    vocab: [
      { eng: "Dog", vi: "Con chó" },
      { eng: "Cat", vi: "Con mèo" },
      { eng: "Bird", vi: "Con chim" },
      { eng: "Fish", vi: "Con cá" },
      { eng: "Rabbit", vi: "Con thỏ" },
      { eng: "Elephant", vi: "Con voi" },
      { eng: "Lion", vi: "Sư tử" },
      { eng: "Monkey", vi: "Con khỉ" },
      { eng: "Bear", vi: "Con gấu" },
      { eng: "Duck", vi: "Con vịt" },
      { eng: "Chicken", vi: "Con gà" },
      { eng: "Cow", vi: "Con bò" }
    ],
    introduction: "Khám phá thế giới con vật (Animals) kỳ thú và luyện nói tên các loài động vật bằng tiếng Anh. Từ những thú cưng gần gũi như Dog, Cat đến thế giới hoang dã kỳ vĩ như Elephant, Lion, bé sẽ được học và luyện nói một cách đầy lôi cuốn. Trò chuyện trực tiếp cùng Cú mang lại cảm giác học mà chơi cực kỳ thú vị.",
    relatedGames: [
      { id: "learn-animal", title: "Trò chơi học Động Vật", ogImage: "https://assets.cuthongminh.com/games/learn-animal/logo.webp" },
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" }
    ]
  },
  food: {
    vocab: [
      { eng: "Rice", vi: "Cơm" },
      { eng: "Bread", vi: "Bánh mì" },
      { eng: "Egg", vi: "Quả trứng" },
      { eng: "Milk", vi: "Sữa" },
      { eng: "Water", vi: "Nước" },
      { eng: "Cake", vi: "Bánh ngọt" },
      { eng: "Soup", vi: "Canh / Súp" },
      { eng: "Noodle", vi: "Mì / Phở" },
      { eng: "Chicken", vi: "Thịt gà" },
      { eng: "Candy", vi: "Kẹo" },
      { eng: "Ice cream", vi: "Kem" }
    ],
    introduction: "Chủ đề Đồ Ăn (Food) giới thiệu cho bé các món ăn quen thuộc hàng ngày bằng tiếng Anh. Bé sẽ học cách gọi tên cơm Rice, bánh mì Bread, sữa Milk và thực hành trò chuyện, bày tỏ sở thích ăn uống của mình trực tiếp bằng tiếng Anh với Cú Thông Minh. Trải nghiệm học nói tương tác giúp bé tự tin giao tiếp.",
    relatedGames: [
      { id: "learn-food", title: "Trò chơi học Món Ăn", ogImage: "https://assets.cuthongminh.com/games/learn-food/logo.webp" },
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" }
    ]
  },
  transport: {
    vocab: [
      { eng: "Car", vi: "Xe ô tô" },
      { eng: "Bus", vi: "Xe buýt" },
      { eng: "Bicycle", vi: "Xe đạp" },
      { eng: "Motorbike", vi: "Xe máy" },
      { eng: "Train", vi: "Tàu hỏa" },
      { eng: "Airplane", vi: "Máy bay" },
      { eng: "Boat", vi: "Thuyền / Tàu thủy" },
      { eng: "Truck", vi: "Xe tải" },
      { eng: "Helicopter", vi: "Trực thăng" }
    ],
    introduction: "Học từ vựng về các phương tiện giao thông (Transport) phổ biến xung quanh bé. Trò chuyện bằng tiếng Anh với AI về xe ô tô Car, xe buýt Bus hay máy bay Airplane bay trên bầu trời. Bé vừa chơi game vừa rèn luyện kỹ năng nghe nói phản xạ tiếng Anh mầm non hiệu quả.",
    relatedGames: [
      { id: "learn-vehicle", title: "Trò chơi học Phương Tiện", ogImage: "https://assets.cuthongminh.com/games/learn-vehicle/logo.webp" },
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" }
    ]
  },
  family: {
    vocab: [
      { eng: "Father / Dad", vi: "Bố / Ba" },
      { eng: "Mother / Mom", vi: "Mẹ / Má" },
      { eng: "Brother", vi: "Anh / Em trai" },
      { eng: "Sister", vi: "Chị / Em gái" },
      { eng: "Grandpa", vi: "Ông nội / ngoại" },
      { eng: "Grandma", vi: "Bà nội / ngoại" },
      { eng: "Baby", vi: "Em bé" },
      { eng: "Uncle", vi: "Chú / Bác / Cậu" },
      { eng: "Aunt", vi: "Cô / Dì / Mợ" }
    ],
    introduction: "Gia đình yêu thương (Family) là chủ đề gần gũi nhất với bé. Cú Thông Minh sẽ cùng bé luyện nói tên các thành viên trong gia đình như bố Dad, mẹ Mom, anh chị em và ông bà bằng tiếng Anh. Giọng nói ấm áp, kiên nhẫn của AI giúp trẻ cảm giác như đang trò chuyện cùng người thân.",
    relatedGames: [
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" },
      { id: "learn-word", title: "Học từ vựng Tiếng Việt", ogImage: "https://assets.cuthongminh.com/games/learn-word/logo.webp" }
    ]
  },
  body: {
    vocab: [
      { eng: "Head", vi: "Đầu" },
      { eng: "Eye", vi: "Mắt" },
      { eng: "Ear", vi: "Tai" },
      { eng: "Nose", vi: "Mũi" },
      { eng: "Mouth", vi: "Miệng" },
      { eng: "Hand", vi: "Bàn tay" },
      { eng: "Finger", vi: "Ngón tay" },
      { eng: "Leg", vi: "Chân" },
      { eng: "Foot", vi: "Bàn chân" },
      { eng: "Hair", vi: "Tóc" },
      { eng: "Teeth", vi: "Răng" }
    ],
    introduction: "Chủ đề Cơ Thể (Body Parts) giúp trẻ nhận diện và gọi tên tiếng Anh các bộ phận trên cơ thể mình như Head, Eye, Nose, Mouth... Bé vừa học vừa chỉ vào cơ thể mình để luyện phản xạ tiếng Anh toàn diện cực kỳ hiệu quả, rèn luyện kỹ năng nghe nói tương tác sớm.",
    relatedGames: [
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" },
      { id: "learn-body", title: "Học bộ phận cơ thể", ogImage: "https://assets.cuthongminh.com/games/learn-body/logo.webp" }
    ]
  },
  school: {
    vocab: [
      { eng: "Pen", vi: "Bút mực" },
      { eng: "Pencil", vi: "Bút chì" },
      { eng: "Book", vi: "Quyển sách" },
      { eng: "Notebook", vi: "Quyển vở" },
      { eng: "Ruler", vi: "Cây thước" },
      { eng: "Eraser", vi: "Cục tẩy" },
      { eng: "Bag", vi: "Cặp sách" },
      { eng: "Scissors", vi: "Cái kéo" },
      { eng: "Paper", vi: "Tờ giấy" },
      { eng: "Crayon", vi: "Bút màu sáp" }
    ],
    introduction: "Luyện nói các dụng cụ học tập (School Supplies) bé thường mang đến lớp học. Học cách nói tên bút Pencil, sách Book, thước Ruler bằng tiếng Anh chuẩn xác. Trò chơi tương tác giọng nói với cô giáo Cú giúp bé chuẩn bị hành trang học tập thật tốt và hứng thú.",
    relatedGames: [
      { id: "learn-english-vocab", title: "Học từ vựng Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp" },
      { id: "learn-english-alphabet", title: "Bảng chữ cái Tiếng Anh", ogImage: "https://assets.cuthongminh.com/games/learn-english-alphabet/logo.webp" }
    ]
  }
};

export function TalkWithOwlSeoSection({ groupId }: TalkWithOwlSeoSectionProps) {
  const group = GROUPS.find((g) => g.id === groupId);
  const config = SEO_TOPIC_CONFIGS[groupId];

  if (!group || !config) return null;

  const pageTitle = `Luyện Nói Tiếng Anh Chủ Đề ${group.title} Với Cô Giáo AI`;
  const pageUrl = `https://cuthongminh.com/games/talk-with-owl/${groupId}`;

  // Dynamic WebApplication schema for this topic
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: pageTitle,
    description: `Bé luyện nói và giao tiếp tiếng Anh chủ đề ${group.title} trực tiếp qua giọng nói với cô giáo AI Cú Thông Minh. ${group.description}.`,
    url: pageUrl,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    audience: {
      "@type": "ChildAudience",
      suggestedMinAge: "3",
      suggestedMaxAge: "8",
    },
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
  };

  // Dynamic BreadcrumbList schema (Trang chủ -> Trò chơi -> Giao tiếp -> Topic)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://cuthongminh.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trò chơi",
        item: "https://cuthongminh.com/games",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Giao Tiếp Tiếng Anh Với AI",
        item: "https://cuthongminh.com/games/talk-with-owl",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: group.title,
        item: pageUrl,
      },
    ],
  };

  // Dynamic Course/Lesson schema to boost discoverability (E-E-A-T)
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Khóa học Giao tiếp Tiếng Anh Mầm non - Chủ đề ${group.title}`,
    description: config.introduction,
    provider: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      sameAs: "https://cuthongminh.com"
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: `Học Từ Mới - ${group.title}`,
        description: `AI dạy bé từng từ vựng tiếng Anh chủ đề ${group.title}, cho bé phát âm theo và sửa lỗi ngay lập tức.`,
        courseMode: "online",
      },
      {
        "@type": "CourseInstance",
        name: `Học Câu - ${group.title}`,
        description: `AI dạy bé các câu giao tiếp thông dụng chủ đề ${group.title}, đặt trong ngữ cảnh thực tế.`,
        courseMode: "online",
      },
      {
        "@type": "CourseInstance",
        name: `Hỏi Đáp Giao Tiếp - ${group.title}`,
        description: `AI hội thoại tự do với bé về chủ đề ${group.title}, đóng vai tình huống vui nhộn.`,
        courseMode: "online",
      },
    ],
  };

  // Other dynamic sibling topics (excluding current one)
  const otherTopics = GROUPS.filter((g) => g.id !== groupId).slice(0, 4);

  return (
    <>
      {/* Schema injections */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(courseJsonLd) }} />

      <section className="max-w-3xl mx-auto px-6 py-12 text-slate-600 font-[family-name:var(--font-nunito-sans)] border-t border-slate-100 mt-10">
        
        {/* Intro */}
        <h2 className="text-2xl font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
          {pageTitle}
        </h2>
        <p className="text-base leading-relaxed mb-8">{config.introduction}</p>

        {/* Vocab Table for indexing */}
        <h3 className="text-lg font-bold text-slate-800 mb-3 font-[family-name:var(--font-baloo-2)]">
          📚 Từ vựng bé sẽ được học và luyện nói:
        </h3>
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white mb-8 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-sm font-semibold text-slate-700">
                <th className="p-4 w-1/2">Từ vựng tiếng Anh (English)</th>
                <th className="p-4 w-1/2">Nghĩa tiếng Việt (Vietnamese)</th>
              </tr>
            </thead>
            <tbody>
              {config.vocab.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold text-orange-600">{item.eng}</td>
                  <td className="p-4 text-slate-700">{item.vi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Method explanation */}
        <div className="mb-10 rounded-2xl border border-orange-100 bg-orange-50/50 p-6">
          <h4 className="text-base font-bold text-orange-800 mb-2 font-[family-name:var(--font-baloo-2)]">
            💡 Phương pháp 3 bước luyện nói Tiếng Anh cùng AI
          </h4>
          <p className="text-sm leading-relaxed text-slate-600 mb-3">
            Mỗi chủ đề gồm <strong>3 bài học</strong> theo phương pháp học ngôn ngữ tự nhiên, tất cả đều sử dụng công nghệ <strong>Gemini Live AI</strong> cho phép trẻ (3-8 tuổi) giao tiếp trực tiếp qua giọng nói:
          </p>
          <ul className="text-sm leading-relaxed text-slate-600 space-y-2">
            <li><strong>📚 Bài 1 — Học Từ Mới:</strong> AI dạy bé từng từ vựng, cho bé phát âm theo, sửa lỗi và ôn tập ngay lập tức.</li>
            <li><strong>💬 Bài 2 — Học Câu:</strong> AI dạy bé các câu giao tiếp liên quan chủ đề, đặt trong ngữ cảnh thực tế để bé dễ hiểu.</li>
            <li><strong>🎤 Bài 3 — Hỏi Đáp:</strong> AI hội thoại tự do với bé, đóng vai tình huống vui nhộn, giúp bé tự tin phản xạ nói.</li>
          </ul>
        </div>

        {/* Related Games */}
        {config.relatedGames.length > 0 && (
          <div className="mb-10 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
              🎮 Trò chơi bổ trợ liên quan:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.relatedGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 transition-all group"
                >
                  <img
                    src={game.ogImage}
                    alt={game.title}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-100 p-1 shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors">
                      {game.title}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">Học vui qua trò chơi tương tác</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other dynamic topics */}
        <div className="pt-8 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 font-[family-name:var(--font-baloo-2)]">
            🦉 Các chủ đề luyện nói khác bé có thể thích:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {otherTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/games/talk-with-owl/${topic.id}`}
                className="flex flex-col items-center p-3 rounded-2xl border border-slate-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm text-center transition-all group"
              >
                <img
                  src={typeof topic.logo === "string" ? topic.logo : undefined}
                  alt={topic.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain rounded-lg mb-2"
                />
                <span className="text-xs font-bold text-slate-700 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {topic.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
