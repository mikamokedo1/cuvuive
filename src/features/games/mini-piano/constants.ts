export const PIANO_NOTES = [
    { note: "C", freq: 261.63, color: "bg-red-500", label: "Đồ" },
    { note: "D", freq: 293.66, color: "bg-orange-500", label: "Rê" },
    { note: "E", freq: 329.63, color: "bg-yellow-500", label: "Mi" },
    { note: "F", freq: 349.23, color: "bg-green-500", label: "Fa" },
    { note: "G", freq: 392.00, color: "bg-blue-500", label: "Sol" },
    { note: "A", freq: 440.00, color: "bg-indigo-500", label: "La" },
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
        notes: ["C", "D", "E", "C", "C", "D", "E", "C", "E", "F", "G", "E", "F", "G"],
    },
    "happy-birthday": {
        title: "Chúc mừng sinh nhật",
        notes: ["C", "C", "D", "C", "F", "E", "C", "C", "D", "C", "G", "F"],
    },
};
