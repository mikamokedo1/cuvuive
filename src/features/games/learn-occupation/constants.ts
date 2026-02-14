import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-occupation/group1.png";
import LogoGroup2 from "@/assets/games/learn-occupation/group2.png";
import LogoGroup3 from "@/assets/games/learn-occupation/group3.png";

// Import Community Helpers (Group 1)
import Police from "@/assets/games/learn-occupation/police.png";
import Firefighter from "@/assets/games/learn-occupation/firefighter.png";
import Teacher from "@/assets/games/learn-occupation/teacher.png";
import Chef from "@/assets/games/learn-occupation/chef.png";
import Farmer from "@/assets/games/learn-occupation/farmer.png";
import Driver from "@/assets/games/learn-occupation/driver.png";

// Import Medical & Science (Group 2)
import Doctor from "@/assets/games/learn-occupation/doctor.png";
import Nurse from "@/assets/games/learn-occupation/nurse.png";
import Dentist from "@/assets/games/learn-occupation/dentist.png";
import Scientist from "@/assets/games/learn-occupation/scientist.png";
import Pharmacist from "@/assets/games/learn-occupation/pharmacist.png";
import Veterinarian from "@/assets/games/learn-occupation/veterinarian.png";

// Import Creative & Entertainment (Group 3)
import Singer from "@/assets/games/learn-occupation/singer.png";
import Painter from "@/assets/games/learn-occupation/painter.png";
import Dancer from "@/assets/games/learn-occupation/dancer.png";
import Photographer from "@/assets/games/learn-occupation/photographer.png";
import Athlete from "@/assets/games/learn-occupation/athlete.png";
import Astronaut from "@/assets/games/learn-occupation/astronaut.png";

// Import Tool images
import ToolPolice from "@/assets/games/learn-occupation/tool_police.png";
import ToolFirefighter from "@/assets/games/learn-occupation/tool_firefighter.png";
import ToolTeacher from "@/assets/games/learn-occupation/tool_teacher.png";
import ToolChef from "@/assets/games/learn-occupation/tool_chef.png";
import ToolFarmer from "@/assets/games/learn-occupation/tool_farmer.png";
import ToolDriver from "@/assets/games/learn-occupation/tool_driver.png";
import ToolDoctor from "@/assets/games/learn-occupation/tool_doctor.png";
import ToolNurse from "@/assets/games/learn-occupation/tool_nurse.png";
import ToolDentist from "@/assets/games/learn-occupation/tool_dentist.png";
import ToolScientist from "@/assets/games/learn-occupation/tool_scientist.png";
import ToolPharmacist from "@/assets/games/learn-occupation/tool_pharmacist.png";
import ToolVeterinarian from "@/assets/games/learn-occupation/tool_veterinarian.png";
import ToolSinger from "@/assets/games/learn-occupation/tool_singer.png";
import ToolPainter from "@/assets/games/learn-occupation/tool_painter.png";
import ToolDancer from "@/assets/games/learn-occupation/tool_dancer.png";
import ToolPhotographer from "@/assets/games/learn-occupation/tool_photographer.png";
import ToolAthlete from "@/assets/games/learn-occupation/tool_athlete.png";
import ToolAstronaut from "@/assets/games/learn-occupation/tool_astronaut.png";

export type OccupationCategory = "community" | "medical" | "creative";

export interface OccupationData {
  id: string;
  name: string;
  image: StaticImageData;
  toolImage: StaticImageData;
  toolName: string;
  category: OccupationCategory;
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
  { id: "singer", name: "Ca sĩ", image: Singer, toolImage: ToolSinger, toolName: "Micro", category: "creative" },
  { id: "painter", name: "Họa sĩ", image: Painter, toolImage: ToolPainter, toolName: "Bảng vẽ", category: "creative" },
  {
    id: "dancer",
    name: "Vũ công",
    image: Dancer,
    toolImage: ToolDancer,
    toolName: "Giày ballet",
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
    toolName: "Tên lửa",
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
