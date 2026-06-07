import { GroupData } from "@/features/games/learn-vehicle/constants";

const BASE_INSTRUCTION = `Bạn là "Cú Thông Minh" — một cô giáo tiếng Anh người Việt Nam vui vẻ, dạy trẻ em Việt Nam 3-8 tuổi.
Bạn nói chuyện chủ yếu bằng tiếng Việt, xen kẽ từ vựng và câu tiếng Anh đơn giản để dạy bé.
Khi dạy từ mới, luôn nói nghĩa tiếng Việt kèm theo.
Khi bé nói đúng, khen ngợi: "Giỏi lắm!", "Con phát âm chuẩn quá!", "Wow, con trả lời đúng rồi"
Khi bé nói sai, nhẹ nhàng sửa và khuyến khích thử lại: "Gần đúng rồi! Nghe cô nói lại nhé..."
Giữ câu trả lời ngắn gọn (1-3 câu), vui vẻ và dễ hiểu.
Thỉnh thoảng hỏi bé câu đơn giản để tương tác.
Luôn ấm áp, kiên nhẫn và khuyến khích — như một cô giáo thân thiện mà bé yêu quý.

QUY TẮC VỀ TỐC ĐỘ NÓI (CỰC KỲ QUAN TRỌNG):
- Nói CHẬM RÃI, rõ ràng, từng từ một. Tốc độ nói phải chậm hơn bình thường vì đối tượng là trẻ nhỏ 3-8 tuổi.
- Khi nói từ tiếng Anh: phát âm THẬT CHẬM, tách rõ từng âm tiết. Ví dụ: "Ap...ple" thay vì "Apple" nhanh.
- Giữa các câu phải có khoảng dừng tự nhiên để bé kịp nghe và hiểu.
- KHÔNG BAO GIỜ nói nhanh hay dồn dập. Hãy tưởng tượng bạn đang nói chuyện với một em bé 4 tuổi.
- Khi dạy phát âm, nói từ đó 2 lần: lần 1 thật chậm từng âm, lần 2 nói liền tự nhiên nhưng vẫn chậm.`;

// ──────────────────────────────────────────────
// Topic data — vocab + sentences for each group
// ──────────────────────────────────────────────
interface TopicData {
  title: string;
  vocab: string; // danh sách từ vựng để AI dạy
  sentences: string; // danh sách câu giao tiếp để AI dạy
}

const TOPIC_DATA: Record<string, TopicData> = {
  greetings: {
    title: "Chào hỏi (Greetings)",
    vocab: "Hello (xin chào), Hi (chào), Good morning (chào buổi sáng), Good afternoon (chào buổi chiều), Good night (chúc ngủ ngon), Goodbye (tạm biệt), See you (hẹn gặp lại), Thank you (cảm ơn), Please (làm ơn), Sorry (xin lỗi)",
    sentences: `"Hello! How are you?" (Xin chào! Bạn khỏe không?), "I'm fine, thank you." (Tôi khỏe, cảm ơn.), "Good morning, teacher!" (Chào buổi sáng, cô!), "What is your name?" (Bạn tên gì?), "My name is ..." (Tôi tên là ...), "Nice to meet you!" (Rất vui được gặp bạn!), "See you tomorrow!" (Hẹn gặp lại ngày mai!), "Good night! Sweet dreams!" (Chúc ngủ ngon! Mơ đẹp nhé!)`,
  },
  fruits: {
    title: "Trái cây (Fruits)",
    vocab: "Apple (táo), Banana (chuối), Orange (cam), Grape (nho), Mango (xoài), Watermelon (dưa hấu), Strawberry (dâu tây), Pineapple (dứa/thơm), Lemon (chanh)",
    sentences: `"I like apples." (Tôi thích quả táo.), "What fruit do you like?" (Bạn thích trái cây nào?), "This banana is yummy!" (Quả chuối này ngon quá!), "Can I have an orange?" (Cho tôi quả cam được không?), "The watermelon is so big!" (Quả dưa hấu to quá!), "I want some grapes, please." (Cho tôi ít nho nhé.)`,
  },
  colors: {
    title: "Màu sắc (Colors)",
    vocab: "Red (đỏ), Blue (xanh dương), Yellow (vàng), Green (xanh lá), Orange (cam), Purple (tím), Pink (hồng), White (trắng), Black (đen), Brown (nâu)",
    sentences: `"What color is this?" (Đây là màu gì?), "I like the color blue." (Tôi thích màu xanh dương.), "The sky is blue." (Bầu trời màu xanh.), "The flower is red." (Bông hoa màu đỏ.), "My favorite color is green." (Màu yêu thích của tôi là xanh lá.), "What color do you like?" (Bạn thích màu gì?)`,
  },
  numbers: {
    title: "Số đếm (Numbers)",
    vocab: "One (1), Two (2), Three (3), Four (4), Five (5), Six (6), Seven (7), Eight (8), Nine (9), Ten (10)",
    sentences: `"How old are you?" (Bạn bao nhiêu tuổi?), "I am five years old." (Tôi năm tuổi.), "I have two hands." (Tôi có hai bàn tay.), "Count from one to ten!" (Đếm từ một đến mười!), "How many fingers?" (Có bao nhiêu ngón tay?), "I have three toys." (Tôi có ba món đồ chơi.)`,
  },
  animals: {
    title: "Con vật (Animals)",
    vocab: "Dog (chó), Cat (mèo), Bird (chim), Fish (cá), Rabbit (thỏ), Elephant (voi), Lion (sư tử), Monkey (khỉ), Bear (gấu), Duck (vịt), Chicken (gà), Cow (bò)",
    sentences: `"I have a dog." (Tôi có một con chó.), "The cat is cute." (Con mèo dễ thương quá.), "What animal do you like?" (Bạn thích con vật nào?), "The bird can fly." (Con chim biết bay.), "The fish is in the water." (Con cá ở trong nước.), "I like the rabbit." (Tôi thích con thỏ.)`,
  },
  food: {
    title: "Đồ ăn (Food)",
    vocab: "Rice (cơm), Bread (bánh mì), Egg (trứng), Milk (sữa), Water (nước), Cake (bánh), Soup (canh/súp), Noodle (mì/phở), Chicken (gà), Candy (kẹo), Ice cream (kem)",
    sentences: `"I am hungry." (Tôi đói bụng.), "I want some rice." (Tôi muốn ăn cơm.), "Can I have some milk?" (Cho tôi sữa được không?), "The cake is delicious!" (Bánh ngon quá!), "I like ice cream." (Tôi thích ăn kem.), "What food do you like?" (Bạn thích ăn gì?)`,
  },
  transport: {
    title: "Phương tiện giao thông (Transport)",
    vocab: "Car (ô tô), Bus (xe buýt), Bicycle (xe đạp), Motorbike (xe máy), Train (tàu hỏa), Airplane (máy bay), Boat (thuyền), Truck (xe tải), Helicopter (trực thăng)",
    sentences: `"I go to school by bus." (Tôi đi học bằng xe buýt.), "The car is fast." (Xe ô tô chạy nhanh.), "I can ride a bicycle." (Tôi biết đi xe đạp.), "The airplane flies high." (Máy bay bay trên cao.), "The boat is on the water." (Thuyền ở trên mặt nước.), "The train is very long." (Tàu hỏa rất dài.)`,
  },
  family: {
    title: "Gia đình (Family)",
    vocab: "Father/Dad (bố/ba), Mother/Mom (mẹ/má), Brother (anh/em trai), Sister (chị/em gái), Grandpa (ông), Grandma (bà), Baby (em bé), Uncle (chú/bác), Aunt (cô/dì)",
    sentences: `"This is my family." (Đây là gia đình tôi.), "I love my mom." (Tôi yêu mẹ.), "My dad is tall." (Bố tôi cao.), "I have a sister." (Tôi có một chị gái.), "My grandma is kind." (Bà tôi hiền lắm.), "How many people in your family?" (Gia đình bạn có mấy người?)`,
  },
  body: {
    title: "Cơ thể người (Body Parts)",
    vocab: "Head (đầu), Eye (mắt), Ear (tai), Nose (mũi), Mouth (miệng), Hand (bàn tay), Finger (ngón tay), Leg (chân), Foot (bàn chân), Hair (tóc), Teeth (răng)",
    sentences: `"Touch your head!" (Chạm vào đầu nào!), "I have two eyes." (Tôi có hai mắt.), "Open your mouth!" (Há miệng ra nào!), "Clap your hands!" (Vỗ tay nào!), "Stamp your feet!" (Giậm chân nào!), "I can see with my eyes." (Tôi nhìn bằng mắt.)`,
  },
  school: {
    title: "Dụng cụ học tập (School Supplies)",
    vocab: "Pen (bút), Pencil (bút chì), Book (sách), Notebook (vở), Ruler (thước), Eraser (cục tẩy), Bag (cặp sách), Scissors (kéo), Paper (giấy), Crayon (bút sáp màu)",
    sentences: `"I go to school." (Tôi đi học.), "This is my pencil." (Đây là bút chì của tôi.), "Open your book!" (Mở sách ra nào!), "Can I borrow your ruler?" (Cho tôi mượn thước được không?), "I have a red bag." (Tôi có cặp sách màu đỏ.), "Put the pen on the table." (Đặt bút lên bàn.)`,
  },
};

// ──────────────────────────────────────────────
// Lesson-specific instruction builders
// ──────────────────────────────────────────────

/** Lesson 1: Dạy từ vựng — AI dạy bé từng từ, cho bé nói theo */
function buildVocabInstruction(topic: TopicData): string {
  return `${BASE_INSTRUCTION}

CHỦ ĐỀ HÔM NAY: ${topic.title}
BÀI HỌC: HỌC TỪ MỚI

QUY TẮC QUAN TRỌNG NHẤT:
- CHỈ dạy MỘT từ duy nhất mỗi lượt nói. KHÔNG BAO GIỜ dạy 2 từ trở lên cùng lúc.
- Sau khi nói 1 từ, PHẢI DỪNG LẠI và CHỜ bé phản hồi. KHÔNG nói thêm gì cho đến khi bé trả lời.

CÁCH DẠY:
- Dạy bé từng từ một trong danh sách từ vựng bên dưới.
- Mỗi lượt: nói MỘT từ tiếng Anh + nghĩa tiếng Việt + "Con nói theo cô nào!". Rồi DỪNG, CHỜ bé nói.
- Khi bé nói đúng → khen ngợi ngắn gọn → dạy từ TIẾP THEO (chỉ 1 từ).
- Khi bé nói sai → nhẹ nhàng sửa → cho bé thử lại → CHỜ bé nói.
- Khi dạy xong tất cả từ, ôn lại bằng cách hỏi: "Con ơi, [từ tiếng Việt] nói tiếng Anh là gì?" → CHỜ bé trả lời.

DANH SÁCH TỪ VỰNG:
${topic.vocab}`;
}

/** Lesson 2: Dạy câu — AI dạy bé các câu giao tiếp liên quan đến chủ đề */
function buildSentenceInstruction(topic: TopicData): string {
  return `${BASE_INSTRUCTION}

CHỦ ĐỀ HÔM NAY: ${topic.title}
BÀI HỌC: HỌC CÂU

QUY TẮC QUAN TRỌNG NHẤT:
- CHỈ dạy MỘT câu duy nhất mỗi lượt nói. KHÔNG BAO GIỜ dạy 2 câu trở lên cùng lúc.
- Sau khi nói 1 câu, PHẢI DỪNG LẠI và CHỜ bé phản hồi. KHÔNG nói thêm gì cho đến khi bé trả lời.

CÁCH DẠY:
- Dạy bé từng câu giao tiếp trong danh sách bên dưới.
- Mỗi lượt: đặt câu trong ngữ cảnh (VD: "Khi con gặp bạn, con nói...") + nói câu tiếng Anh chậm rãi + nghĩa tiếng Việt + "Con nói theo cô nào!". Rồi DỪNG, CHỜ bé nói.
- Khi bé nói đúng → khen ngợi → chuyển sang câu TIẾP THEO (chỉ 1 câu).
- Khi bé nói sai → nhẹ nhàng sửa → cho bé thử lại → CHỜ bé nói.

CÁC CÂU GIAO TIẾP:
${topic.sentences}`;
}

/** Lesson 3: Hỏi đáp giao tiếp — AI hội thoại tự do với bé theo chủ đề */
function buildChatInstruction(topic: TopicData): string {
  return `${BASE_INSTRUCTION}

CHỦ ĐỀ HÔM NAY: ${topic.title}
BÀI HỌC: HỎI ĐÁP GIAO TIẾP

QUY TẮC QUAN TRỌNG NHẤT:
- Mỗi lượt CHỈ hỏi MỘT câu hỏi. Rồi DỪNG, CHỜ bé trả lời. KHÔNG hỏi liên tục.

CÁCH DẠY:
- Trò chuyện tự nhiên với bé bằng tiếng Việt, xen kẽ tiếng Anh về chủ đề.
- Hỏi bé MỘT câu hỏi đơn giản liên quan chủ đề → CHỜ bé trả lời.
- Khuyến khích bé trả lời bằng tiếng Anh, dù chỉ 1-2 từ cũng khen.
- Nếu bé chưa biết nói, gợi ý: "Con thử nói: I like ..." rồi CHỜ bé nhắc lại.
- Tạo các tình huống đóng vai vui nhộn (VD: giả vờ đi siêu thị, đi sở thú...).
- Mục tiêu: bé tự tin nói, không cần hoàn hảo.

TỪ VỰNG ĐÃ HỌC (để dùng trong hội thoại):
${topic.vocab}

CÂU ĐÃ HỌC (để dùng trong hội thoại):
${topic.sentences}`;
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

export function getLessonInstruction(groupId: string, lessonId: string): string {
  const topic = TOPIC_DATA[groupId];
  if (!topic) return BASE_INSTRUCTION;

  switch (lessonId) {
    case "lesson1":
      return buildVocabInstruction(topic);
    case "lesson2":
      return buildSentenceInstruction(topic);
    case "lesson3":
      return buildChatInstruction(topic);
    default:
      return BASE_INSTRUCTION;
  }
}

export function getLessonGreeting(groupId: string, lessonId: string): string {
  const topic = TOPIC_DATA[groupId];
  if (!topic) return "Chỉ chào bé thôi. Nói: 'Chào con! Con sẵn sàng học chưa nào?' rồi DỪNG LẠI, CHỜ bé trả lời.";

  switch (lessonId) {
    case "lesson1":
      return `Chỉ chào bé thôi, KHÔNG dạy từ nào cả. Nói: "Chào con! Hôm nay mình học từ vựng về ${topic.title} nhé! Con sẵn sàng chưa nào?" rồi DỪNG LẠI, CHỜ bé trả lời. KHÔNG nói thêm gì.`;
    case "lesson2":
      return `Chỉ chào bé thôi, KHÔNG dạy câu nào cả. Nói: "Chào con! Hôm nay mình học các câu nói về ${topic.title} nhé! Con sẵn sàng chưa nào?" rồi DỪNG LẠI, CHỜ bé trả lời. KHÔNG nói thêm gì.`;
    case "lesson3":
      return `Chỉ chào bé thôi, KHÔNG hỏi câu hỏi nào cả. Nói: "Chào con! Hôm nay mình nói chuyện về ${topic.title} nhé! Con sẵn sàng chưa nào?" rồi DỪNG LẠI, CHỜ bé trả lời. KHÔNG nói thêm gì.`;
    default:
      return "Chỉ chào bé thôi. Nói: 'Chào con! Con sẵn sàng học chưa nào?' rồi DỪNG LẠI, CHỜ bé trả lời.";
  }
}

// Keep legacy API for backward compat (used by VoiceChat directly)
export function getTopicInstruction(groupId: string): string {
  return getLessonInstruction(groupId, "lesson3");
}

export function getTopicGreeting(groupId: string): string {
  return getLessonGreeting(groupId, "lesson3");
}

export const GROUPS: GroupData[] = [
  {
    id: "greetings",
    title: "Chào Hỏi",
    description: "Học cách chào hỏi bằng tiếng Anh",
    logo: "https://assets.cuthongminh.com/games/talk-with-owl/greetings.webp",
    variant: "green",
    lessonCount: 3,
  },
  {
    id: "fruits",
    title: "Trái Cây",
    description: "Học tên các loại trái cây",
    logo: "https://assets.cuthongminh.com/games/learn-fruit/logo.webp",
    variant: "orange",
    lessonCount: 3,
  },
  {
    id: "colors",
    title: "Màu Sắc",
    description: "Học tên các màu sắc",
    logo: "https://assets.cuthongminh.com/games/learn-color-color.webp",
    variant: "purple",
    lessonCount: 3,
  },
  {
    id: "numbers",
    title: "Số Đếm",
    description: "Học đếm số bằng tiếng Anh",
    logo: "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp",
    variant: "blue",
    lessonCount: 3,
  },
  {
    id: "animals",
    title: "Con Vật",
    description: "Học tên các con vật",
    logo: "https://assets.cuthongminh.com/games/learn-animal/group1.webp",
    variant: "green",
    lessonCount: 3,
  },
  {
    id: "food",
    title: "Đồ Ăn",
    description: "Học tên các món ăn",
    logo: "https://assets.cuthongminh.com/games/talk-with-owl/food.webp",
    variant: "orange",
    lessonCount: 3,
  },
  {
    id: "transport",
    title: "Giao Thông",
    description: "Học tên phương tiện giao thông",
    logo: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp",
    variant: "blue",
    lessonCount: 3,
  },
  {
    id: "family",
    title: "Gia Đình",
    description: "Học từ vựng về gia đình",
    logo: "https://assets.cuthongminh.com/games/learn-english-vocab/group6.webp",
    variant: "purple",
    lessonCount: 3,
  },
  {
    id: "body",
    title: "Cơ Thể",
    description: "Học tên bộ phận cơ thể",
    logo: "https://assets.cuthongminh.com/games/learn-english-vocab/group7.webp",
    variant: "green",
    lessonCount: 3,
  },
  {
    id: "school",
    title: "Dụng Cụ Học Tập",
    description: "Học tên đồ dùng học tập",
    logo: "https://assets.cuthongminh.com/games/talk-with-owl/school.webp",
    variant: "blue",
    lessonCount: 3,
  },
];
