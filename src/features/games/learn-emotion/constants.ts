import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-emotion/group1.png";
import LogoGroup2 from "@/assets/games/learn-emotion/group2.png";
import LogoGroup3 from "@/assets/games/learn-emotion/group3.png";

// Import Basic Emotions (Group 1)
import Happy from "@/assets/games/learn-emotion/happy.png";
import Sad from "@/assets/games/learn-emotion/sad.png";
import Angry from "@/assets/games/learn-emotion/angry.png";
import Scared from "@/assets/games/learn-emotion/scared.png";
import Surprised from "@/assets/games/learn-emotion/surprised.png";
import Love from "@/assets/games/learn-emotion/love.png";

// Import Advanced Emotions (Group 2)
import Shy from "@/assets/games/learn-emotion/shy.png";
import Proud from "@/assets/games/learn-emotion/proud.png";
import Worried from "@/assets/games/learn-emotion/worried.png";
import Jealous from "@/assets/games/learn-emotion/jealous.png";
import Excited from "@/assets/games/learn-emotion/excited.png";
import Bored from "@/assets/games/learn-emotion/bored.png";

// Import Scenario Emotions (Group 3) - using some created + thoughtful/focused/relaxed
import Thoughtful from "@/assets/games/learn-emotion/thoughtful.png";
import Focused from "@/assets/games/learn-emotion/focused.png";
import Relaxed from "@/assets/games/learn-emotion/relaxed.png";

import { EntityData } from "@/types/game";

export const EMOTION_ITEMS: EntityData[] = [
  // Basic Emotions (Group 1)
  { id: "happy", name: "Vui vẻ", image: Happy, category: "basic" },
  { id: "sad", name: "Buồn bã", image: Sad, category: "basic" },
  { id: "angry", name: "Tức giận", image: Angry, category: "basic" },
  { id: "scared", name: "Sợ hãi", image: Scared, category: "basic" },
  { id: "surprised", name: "Ngạc nhiên", image: Surprised, category: "basic" },
  { id: "love", name: "Yêu thương", image: Love, category: "basic" },

  // Advanced Emotions (Group 2)
  { id: "shy", name: "Xấu hổ", image: Shy, category: "advanced" },
  { id: "proud", name: "Tự hào", image: Proud, category: "advanced" },
  { id: "worried", name: "Lo lắng", image: Worried, category: "advanced" },
  { id: "jealous", name: "Ghen tị", image: Jealous, category: "advanced" },
  { id: "excited", name: "Hào hứng", image: Excited, category: "advanced" },
  { id: "bored", name: "Chán nản", image: Bored, category: "advanced" },

  // Scenario Emotions (Group 3) - mixing some existing and new ones
  { id: "thoughtful", name: "Suy nghĩ", image: Thoughtful, category: "scenario" },
  { id: "focused", name: "Tập trung", image: Focused, category: "scenario" },
  { id: "relaxed", name: "Thư giãn", image: Relaxed, category: "scenario" },
  { id: "happy_sz", name: "Vui vẻ", image: Happy, category: "scenario" },
  { id: "surprised_sz", name: "Ngạc nhiên", image: Surprised, category: "scenario" },
  { id: "sad_sz", name: "Buồn bã", image: Sad, category: "scenario" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Cảm xúc cơ bản",
    description: "Học các cảm xúc thường ngày",
    items: ["happy", "sad", "angry", "scared", "surprised", "love"],
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Cảm xúc khác",
    description: "Học các cảm xúc phức tạp hơn",
    items: ["shy", "proud", "worried", "jealous", "excited", "bored"],
    logo: LogoGroup2,
    variant: "purple" as const,
  },
  {
    id: "group3",
    title: "Pé cảm thấy gì?",
    description: "Nhận biết cảm xúc qua tình huống",
    items: ["thoughtful", "focused", "relaxed", "happy_sz", "surprised_sz", "sad_sz"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

export function getEmotionsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return EMOTION_ITEMS.filter((item) => group.items.includes(item.id));
}

// ============ RIGHT OR WRONG SCENARIOS ============

export interface RightWrongScenario {
  id: string;
  text: string;
  image: StaticImageData;
  isCorrect: boolean;
  category: string;
}

// Note: Reusing emotion images for the scenario images as a placeholder for lesson 3
export const RIGHT_WRONG_SCENARIOS: RightWrongScenario[] = [
  // Group 1
  { id: "rw_basic_1", text: "Được tặng quà, pé cảm thấy rất vui", image: Happy, isCorrect: true, category: "basic" },
  { id: "rw_basic_2", text: "Làm vỡ ly, pé cảm thấy tức giận", image: Angry, isCorrect: false, category: "basic" },
  {
    id: "rw_basic_3",
    text: "Trời mưa không được đi chơi, pé thấy buồn",
    image: Sad,
    isCorrect: true,
    category: "basic",
  },
  { id: "rw_basic_4", text: "Bất ngờ gặp bạn cũ, pé thấy sợ hãi", image: Scared, isCorrect: false, category: "basic" },
  { id: "rw_basic_5", text: "Pé ôm mẹ vì pé cảm thấy yêu thương", image: Love, isCorrect: true, category: "basic" },
  { id: "rw_basic_6", text: "Thấy con nhện, pé cảm thấy vui vẻ", image: Happy, isCorrect: false, category: "basic" },

  // Group 2
  {
    id: "rw_adv_1",
    text: "Được cô giáo khen, pé cảm thấy tự hào",
    image: Proud,
    isCorrect: true,
    category: "advanced",
  },
  { id: "rw_adv_2", text: "Lên sân khấu hát, pé thấy chán nản", image: Bored, isCorrect: false, category: "advanced" },
  {
    id: "rw_adv_3",
    text: "Sắp được đi sở thú, pé thấy hào hứng",
    image: Excited,
    isCorrect: true,
    category: "advanced",
  },
  {
    id: "rw_adv_4",
    text: "Mẹ mua đồ chơi cho em pé, pé thấy vui vẻ",
    image: Happy,
    isCorrect: false,
    category: "advanced",
  },
  {
    id: "rw_adv_5",
    text: "Quên mang vở bài tập, pé cảm thấy lo lắng",
    image: Worried,
    isCorrect: true,
    category: "advanced",
  },
  { id: "rw_adv_6", text: "Gặp người lạ, pé thấy tự hào", image: Proud, isCorrect: false, category: "advanced" },

  // Group 3
  {
    id: "rw_scen_1",
    text: "Đang làm bài tập khó, pé rất tập trung",
    image: Focused,
    isCorrect: true,
    category: "scenario",
  },
  { id: "rw_scen_2", text: "Nghe nhạc êm dịu, pé thấy tức giận", image: Angry, isCorrect: false, category: "scenario" },
  {
    id: "rw_scen_3",
    text: "Đang giải câu đố, pé cảm thấy suy nghĩ",
    image: Thoughtful,
    isCorrect: true,
    category: "scenario",
  },
  { id: "rw_scen_4", text: "Nằm trên thảm cỏ, pé thấy sợ hãi", image: Scared, isCorrect: false, category: "scenario" },
  { id: "rw_scen_5", text: "Được đi công viên, pé thấy vui vẻ", image: Happy, isCorrect: true, category: "scenario" },
  {
    id: "rw_scen_6",
    text: "Bạn lấy mất đồ chơi, pé thấy ngạc nhiên",
    image: Surprised,
    isCorrect: false,
    category: "scenario",
  },
];

export function getScenariosForGroup(groupId: string): RightWrongScenario[] {
  const categoryMap: Record<string, string> = {
    group1: "basic",
    group2: "advanced",
    group3: "scenario",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return RIGHT_WRONG_SCENARIOS.filter((s) => s.category === category);
}

// ============ SCENARIO MATCHING DATA ============

export interface ScenarioMatchActivity {
  id: string;
  situationText: string;
  image: StaticImageData;
  correctEmotionId: string;
  options: string[]; // array of emotion ids (4 items including correct one)
  category: string;
}

export const SCENARIO_MATCH_ACTIVITIES: ScenarioMatchActivity[] = [
  // Group 1
  {
    id: "sm_basic_1",
    situationText: "Pé được bố đưa đi chơi nhà bóng.",
    image: Happy, // Placeholder
    correctEmotionId: "happy",
    options: ["sad", "angry", "happy", "scared"],
    category: "basic",
  },
  {
    id: "sm_basic_2",
    situationText: "Chiếc xe đồ chơi yêu thích bị hỏng.",
    image: Sad, // Placeholder
    correctEmotionId: "sad",
    options: ["happy", "sad", "surprised", "love"],
    category: "basic",
  },
  {
    id: "sm_basic_3",
    situationText: "Bỗng nhiên có tiếng sấm rất to.",
    image: Scared, // Placeholder
    correctEmotionId: "scared",
    options: ["love", "angry", "happy", "scared"],
    category: "basic",
  },
  {
    id: "sm_basic_4",
    situationText: "Mở hộp quà sinh nhật ra thấy món đồ chơi ao ước.",
    image: Surprised, // Placeholder
    correctEmotionId: "surprised",
    options: ["surprised", "sad", "angry", "scared"],
    category: "basic",
  },

  // Group 2
  {
    id: "sm_adv_1",
    situationText: "Pé tự mình xếp xong một ngôi nhà lego khổng lồ.",
    image: Proud, // Placeholder
    correctEmotionId: "proud",
    options: ["shy", "bored", "jealous", "proud"],
    category: "advanced",
  },
  {
    id: "sm_adv_2",
    situationText: "Lần đầu tiên đứng hát trước nhiều người lạ.",
    image: Shy, // Placeholder
    correctEmotionId: "shy",
    options: ["shy", "excited", "proud", "angry"],
    category: "advanced",
  },
  {
    id: "sm_adv_3",
    situationText: "Ngày mai là ngày đi dã ngoại cùng cả lớp.",
    image: Excited, // Placeholder
    correctEmotionId: "excited",
    options: ["bored", "worried", "excited", "jealous"],
    category: "advanced",
  },
  {
    id: "sm_adv_4",
    situationText: "Pé không mang bút màu đi học vẽ.",
    image: Worried, // Placeholder
    correctEmotionId: "worried",
    options: ["proud", "worried", "excited", "happy"],
    category: "advanced",
  },

  // Group 3
  {
    id: "sm_scen_1",
    situationText: "Pé đang cố gắng ghép bức tranh 100 mảnh.",
    image: Focused, // Placeholder
    correctEmotionId: "focused",
    options: ["sad_sz", "focused", "relaxed", "happy_sz"],
    category: "scenario",
  },
  {
    id: "sm_scen_2",
    situationText: "Pé đang tắm nước ấm thơm mùi bọt xà phòng.",
    image: Relaxed, // Placeholder
    correctEmotionId: "relaxed",
    options: ["surprised_sz", "focused", "thoughtful", "relaxed"],
    category: "scenario",
  },
  {
    id: "sm_scen_3",
    situationText: "Mẹ hỏi pé tối nay muốn ăn món gì.",
    image: Thoughtful, // Placeholder
    correctEmotionId: "thoughtful",
    options: ["sad_sz", "thoughtful", "focused", "relaxed"],
    category: "scenario",
  },
  {
    id: "sm_scen_4",
    situationText: "Thấy mẹ đi làm về, pé chạy ra đón.",
    image: Happy, // Placeholder
    correctEmotionId: "happy_sz",
    options: ["happy_sz", "sad_sz", "thoughtful", "focused"],
    category: "scenario",
  },
];

export function getScenarioMatchForGroup(groupId: string): ScenarioMatchActivity[] {
  const categoryMap: Record<string, string> = {
    group1: "basic",
    group2: "advanced",
    group3: "scenario",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SCENARIO_MATCH_ACTIVITIES.filter((s) => s.category === category);
}
