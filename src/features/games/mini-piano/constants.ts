export const PIANO_NOTES = [
  { note: "C", freq: 261.63, color: "bg-red-500", label: "Đồ" },
  { note: "D", freq: 293.66, color: "bg-orange-500", label: "Rê" },
  { note: "E", freq: 329.63, color: "bg-yellow-500", label: "Mi" },
  { note: "F", freq: 349.23, color: "bg-green-500", label: "Fa" },
  { note: "G", freq: 392.0, color: "bg-blue-500", label: "Sol" },
  { note: "A", freq: 440.0, color: "bg-indigo-500", label: "La" },
  { note: "B", freq: 493.88, color: "bg-purple-500", label: "Si" },
  { note: "C2", freq: 523.25, color: "bg-pink-500", label: "Đố" },
];

export const SOUND_SETS = {
  classic: { id: "classic", title: "Piano" },
  animal: {
    id: "animal",
    title: "Động vật",
    map: {
      C: "Meo meo",
      D: "Gâu gâu",
      E: "Quạc quạc",
      F: "Ụt ịt",
      G: "Chíp chíp",
      A: "Ò ó o",
      B: "Be be",
      C2: "Hú hú",
    },
  },
  funny: {
    id: "funny",
    title: "Kỳ thú",
    map: {
      C: "Hì hì",
      D: "Boing",
      E: "Ting",
      F: "Viuuu",
      G: "Píp píp",
      A: "Ha ha",
      B: "Oa oa",
      C2: "Bùm",
    },
  },
};

export const SONGS = {
  "kia-con-buom-vang": {
    title: "Kìa con bướm vàng",
    // Bổ sung đoạn kết: "Đùng đoàng đoàng" (C-G-C)
    notes: [
      "C",
      "D",
      "E",
      "C",
      "C",
      "D",
      "E",
      "C", // Kìa con bướm vàng...
      "E",
      "F",
      "G",
      "E",
      "F",
      "G", // Xòe đôi cánh...
      "G",
      "A",
      "G",
      "F",
      "E",
      "C", // Bướm bay trên cao...
      "G",
      "A",
      "G",
      "F",
      "E",
      "C",
      "C",
      "G",
      "C",
      "C",
      "G",
      "C", // Đùng đoàng đoàng...
    ],
  },
  "happy-birthday": {
    title: "Chúc mừng sinh nhật",
    // Bổ sung đoạn kết và sửa nốt Bb (B giáng) ở câu cuối cho đúng giai điệu
    notes: [
      "C",
      "C",
      "D",
      "C",
      "F",
      "E", // Happy birthday to you
      "C",
      "C",
      "D",
      "C",
      "G",
      "F", // Happy birthday to you
      "C",
      "C",
      "C2",
      "A",
      "F",
      "E",
      "D", // Happy birthday dear...
      "A#",
      "A#",
      "A",
      "F",
      "G",
      "F", // Happy birthday to you
    ],
  },
  "ngoi-sao-lap-lanh": {
    title: "Ngôi sao lấp lánh",
    // Bổ sung câu kết lặp lại giai điệu chính
    notes: [
      "C",
      "C",
      "G",
      "G",
      "A",
      "A",
      "G", // Twinkle twinkle little star
      "F",
      "F",
      "E",
      "E",
      "D",
      "D",
      "C", // How I wonder what you are
      "G",
      "G",
      "F",
      "F",
      "E",
      "E",
      "D", // Up above the world so high
      "G",
      "G",
      "F",
      "F",
      "E",
      "E",
      "D", // Like a diamond in the sky
      "C",
      "C",
      "G",
      "G",
      "A",
      "A",
      "G", // (Lặp lại)
      "F",
      "F",
      "E",
      "E",
      "D",
      "D",
      "C",
    ],
  },
  "ba-oi-ba": {
    title: "Bà ơi bà",
    // Sửa lại các nốt cho đúng cao độ dân dã của bài hát
    notes: [
      "G",
      "E",
      "G",
      "A",
      "G",
      "E",
      "G", // Bà ơi bà cháu yêu bà lắm
      "A",
      "G",
      "E",
      "D",
      "C",
      "D",
      "E", // Tóc bà trắng màu trắng như mây
      "G",
      "E",
      "G",
      "A",
      "G",
      "E",
      "G", // Cháu yêu bà cháu nắm bàn tay
      "A",
      "G",
      "E",
      "D",
      "C",
      "D",
      "C", // Khi cháu vâng lời cháu mới biết bà vui
    ],
  },
  "doi-ken-ti-hon": {
    title: "Đội kèn tí hon",
    // Chỉnh lại nhịp câu "Tè tì te"
    notes: [
      "C",
      "D",
      "E",
      "C",
      "D",
      "E", // Tè tì te đây là ban kèn
      "G",
      "G",
      "E",
      "D",
      "C", // Tí hon
      "D",
      "E",
      "G",
      "G",
      "E",
      "D",
      "C", // Sáng sớm vang lên tưng bừng
      "C",
      "D",
      "E",
      "C",
      "D",
      "E", // Tè tì te...
      "G",
      "G",
      "E",
      "D",
      "C",
    ],
  },
};
