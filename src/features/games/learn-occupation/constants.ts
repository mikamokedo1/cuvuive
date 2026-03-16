import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-occupation/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-occupation/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-occupation/group3.webp";

// Import Community Helpers (Group 1)
const Police = "https://assets.cuthongminh.com/games/learn-occupation/police.webp";
const Firefighter = "https://assets.cuthongminh.com/games/learn-occupation/firefighter.webp";
const Teacher = "https://assets.cuthongminh.com/games/learn-occupation/teacher.webp";
const Chef = "https://assets.cuthongminh.com/games/learn-occupation/chef.webp";
const Farmer = "https://assets.cuthongminh.com/games/learn-occupation/farmer.webp";
const Driver = "https://assets.cuthongminh.com/games/learn-occupation/driver.webp";

// Import Medical & Science (Group 2)
const Doctor = "https://assets.cuthongminh.com/games/learn-occupation/doctor.webp";
const Nurse = "https://assets.cuthongminh.com/games/learn-occupation/nurse.webp";
const Dentist = "https://assets.cuthongminh.com/games/learn-occupation/dentist.webp";
const Scientist = "https://assets.cuthongminh.com/games/learn-occupation/scientist.webp";
const Pharmacist = "https://assets.cuthongminh.com/games/learn-occupation/pharmacist.webp";
const Veterinarian = "https://assets.cuthongminh.com/games/learn-occupation/veterinarian.webp";

// Import Creative & Entertainment (Group 3)
const Singer = "https://assets.cuthongminh.com/games/learn-occupation/singer.webp";
const Painter = "https://assets.cuthongminh.com/games/learn-occupation/painter.webp";
const Dancer = "https://assets.cuthongminh.com/games/learn-occupation/dancer.webp";
const Photographer = "https://assets.cuthongminh.com/games/learn-occupation/photographer.webp";
const Athlete = "https://assets.cuthongminh.com/games/learn-occupation/athlete.webp";
const Astronaut = "https://assets.cuthongminh.com/games/learn-occupation/astronaut.webp";

// Import Tool images
const ToolPolice = "https://assets.cuthongminh.com/games/learn-occupation/tool_police.webp";
const ToolFirefighter = "https://assets.cuthongminh.com/games/learn-occupation/tool_firefighter.webp";
const ToolTeacher = "https://assets.cuthongminh.com/games/learn-occupation/tool_teacher.webp";
const ToolChef = "https://assets.cuthongminh.com/games/learn-occupation/tool_chef.webp";
const ToolFarmer = "https://assets.cuthongminh.com/games/learn-occupation/tool_farmer.webp";
const ToolDriver = "https://assets.cuthongminh.com/games/learn-occupation/tool_driver.webp";
const ToolDoctor = "https://assets.cuthongminh.com/games/learn-occupation/tool_doctor.webp";
const ToolNurse = "https://assets.cuthongminh.com/games/learn-occupation/tool_nurse.webp";
const ToolDentist = "https://assets.cuthongminh.com/games/learn-occupation/tool_dentist.webp";
const ToolScientist = "https://assets.cuthongminh.com/games/learn-occupation/tool_scientist.webp";
const ToolPharmacist = "https://assets.cuthongminh.com/games/learn-occupation/tool_pharmacist.webp";
const ToolVeterinarian = "https://assets.cuthongminh.com/games/learn-occupation/tool_veterinarian.webp";
const ToolSinger = "https://assets.cuthongminh.com/games/learn-occupation/tool_singer.webp";
const ToolPainter = "https://assets.cuthongminh.com/games/learn-occupation/tool_painter.webp";
const ToolDancer = "https://assets.cuthongminh.com/games/learn-occupation/tool_dancer.webp";
const ToolPhotographer = "https://assets.cuthongminh.com/games/learn-occupation/tool_photographer.webp";
const ToolAthlete = "https://assets.cuthongminh.com/games/learn-occupation/tool_athlete.webp";
const ToolAstronaut = "https://assets.cuthongminh.com/games/learn-occupation/tool_astronaut.webp";
import { EntityData } from "@/types/game";

export interface OccupationData extends EntityData {
  toolImage: string | StaticImageData;
  toolName: string;
}

export const OCCUPATIONS: OccupationData[] = [
  // Community Helpers (Group 1)
  {
    id: "police",
    name: "Cảnh sát",
    image: Police,
    toolImage: ToolPolice,
    toolName: "Còi và khiên",
    category: "community",
  },
  {
    id: "firefighter",
    name: "Lính cứu hỏa",
    image: Firefighter,
    toolImage: ToolFirefighter,
    toolName: "Vòi nước",
    category: "community",
  },
  {
    id: "teacher",
    name: "Giáo viên",
    image: Teacher,
    toolImage: ToolTeacher,
    toolName: "Bảng đen",
    category: "community",
  },
  { id: "chef", name: "Đầu bếp", image: Chef, toolImage: ToolChef, toolName: "Chảo", category: "community" },
  { id: "farmer", name: "Nông dân", image: Farmer, toolImage: ToolFarmer, toolName: "Cuốc", category: "community" },
  { id: "driver", name: "Tài xế", image: Driver, toolImage: ToolDriver, toolName: "Vô lăng", category: "community" },

  // Medical & Science (Group 2)
  { id: "doctor", name: "Bác sĩ", image: Doctor, toolImage: ToolDoctor, toolName: "Ống nghe", category: "medical" },
  { id: "nurse", name: "i tá", image: Nurse, toolImage: ToolNurse, toolName: "Ống tiêm", category: "medical" },
  {
    id: "dentist",
    name: "Nha sĩ",
    image: Dentist,
    toolImage: ToolDentist,
    toolName: "Bàn chải răng",
    category: "medical",
  },
  {
    id: "scientist",
    name: "Nhà khoa học",
    image: Scientist,
    toolImage: ToolScientist,
    toolName: "Kính hiển vi",
    category: "medical",
  },
  {
    id: "pharmacist",
    name: "Dược sĩ",
    image: Pharmacist,
    toolImage: ToolPharmacist,
    toolName: "Lọ thuốc",
    category: "medical",
  },
  {
    id: "veterinarian",
    name: "Bác sĩ thú i",
    image: Veterinarian,
    toolImage: ToolVeterinarian,
    toolName: "Chó mèo",
    category: "medical",
  },

  // Creative & Entertainment (Group 3)
  { id: "singer", name: "Ca sĩ", image: Singer, toolImage: ToolSinger, toolName: "Mi cờ rô", category: "creative" },
  { id: "painter", name: "Họa sĩ", image: Painter, toolImage: ToolPainter, toolName: "Bảng vẽ", category: "creative" },
  {
    id: "dancer",
    name: "Vũ công",
    image: Dancer,
    toolImage: ToolDancer,
    toolName: "Giày ba-lê",
    category: "creative",
  },
  {
    id: "photographer",
    name: "Nhiếp ảnh gia",
    image: Photographer,
    toolImage: ToolPhotographer,
    toolName: "Máy ảnh",
    category: "creative",
  },
  {
    id: "athlete",
    name: "Vận động viên",
    image: Athlete,
    toolImage: ToolAthlete,
    toolName: "Huy chương",
    category: "creative",
  },
  {
    id: "astronaut",
    name: "Phi hành gia",
    image: Astronaut,
    toolImage: ToolAstronaut,
    toolName: "Tàu vũ trụ",
    category: "creative",
  },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Cộng đồng",
    description: "Học các nghề cộng đồng",
    occupations: ["police", "firefighter", "teacher", "chef", "farmer", "driver"],
    logo: LogoGroup1,
    variant: "green" as const,
    lessonCount: 3,
  },
  {
    id: "group2",
    title: "Y tế & Khoa học",
    description: "Học các nghề y tế và khoa học",
    occupations: ["doctor", "nurse", "dentist", "scientist", "pharmacist", "veterinarian"],
    logo: LogoGroup2,
    variant: "orange" as const,
    lessonCount: 3,
  },
  {
    id: "group3",
    title: "Nghệ thuật",
    description: "Học các nghề nghệ thuật",
    occupations: ["singer", "painter", "dancer", "photographer", "athlete", "astronaut"],
    logo: LogoGroup3,
    variant: "purple" as const,
    lessonCount: 3,
  },
];

export function getOccupationsForGroup(groupId: string): OccupationData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.occupations.map((occId) => OCCUPATIONS.find((o) => o.id === occId)).filter(Boolean) as OccupationData[];
}

export function getAllOccupations(): OccupationData[] {
  return OCCUPATIONS;
}

// ──── Occupation Descriptions (for explore lesson) ────
export const OCCUPATION_DESCRIPTIONS: Record<string, string> = {
  // Community
  police: "Cảnh sát giữ gìn trật tự và bảo vệ mọi người. Cảnh sát rất dũng cảm!",
  firefighter: "Lính cứu hỏa dập lửa và cứu người. Họ rất dũng cảm khi lao vào đám cháy!",
  teacher: "Giáo viên dạy học và yêu thương học trò. Cô thầy giúp pé học đọc, viết và tính toán!",
  chef: "Đầu bếp nấu ra những món ăn ngon tuyệt vời. Đầu bếp giỏi phải học rất nhiều năm!",
  farmer: "Nông dân trồng lúa, rau và nuôi gia súc. Nhờ nông dân mà chúng ta có cơm ăn mỗi ngày!",
  driver: "Tài xế lái xe chở người và hàng hóa. Tài xế phải lái xe rất cẩn thận!",
  // Medical
  doctor: "Bác sĩ khám bệnh và chữa bệnh cho mọi người. Bác sĩ mặc áo trắng và dùng ống nghe!",
  nurse: "Y tá chăm sóc bệnh nhân và giúp bác sĩ. Y tá rất ân cần và nhẹ nhàng!",
  dentist: "Nha sĩ chăm sóc răng miệng cho mọi người. Nhớ đánh răng mỗi ngày để răng khỏe mạnh!",
  scientist: "Nhà khoa học nghiên cứu và phát minh ra nhiều điều mới. Họ làm việc trong phòng thí nghiệm!",
  pharmacist: "Dược sĩ pha chế và bán thuốc cho bệnh nhân. Dược sĩ hiểu biết về các loại thuốc!",
  veterinarian: "Bác sĩ thú y chữa bệnh cho các con vật. Họ rất yêu thương động vật!",
  // Creative
  singer: "Ca sĩ hát những bài hát hay. Ca sĩ biểu diễn trên sân khấu trước nhiều khán giả!",
  painter: "Họa sĩ vẽ tranh rất đẹp bằng cọ và màu. Họa sĩ có trí tưởng tượng phong phú!",
  dancer: "Vũ công nhảy múa uyển chuyển theo nhạc. Vũ công tập luyện rất chăm chỉ mỗi ngày!",
  photographer: "Nhiếp ảnh gia chụp những bức ảnh đep. Họ dùng máy ảnh để ghi lại khoảnh khắc!",
  athlete: "Vận động viên thi đấu thể thao và giành huy chương. Họ tập luyện rất vất vả!",
  astronaut: "Phi hành gia bay vào vũ trụ và khám phá không gian. Phi hành gia rất dũng cảm!",
};
