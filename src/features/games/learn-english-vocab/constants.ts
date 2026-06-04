import { StaticImageData } from "next/image";

// Reuse images from existing games
const Dog = "https://assets.cuthongminh.com/games/learn-animal/dog.webp";
const Cat = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
const Fish = "https://assets.cuthongminh.com/games/learn-animal/fish.webp";
const Duck = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const Cow = "https://assets.cuthongminh.com/games/learn-animal/cow.webp";
const Pig = "https://assets.cuthongminh.com/games/learn-animal/pig.webp";

// Fruit images - placeholder using existing assets
const Apple = "https://assets.cuthongminh.com/games/learn-fruit/apple.webp";
const Banana = "https://assets.cuthongminh.com/games/learn-fruit/banana.webp";
const Orange = "https://assets.cuthongminh.com/games/learn-fruit/orange.webp";
const Grape = "https://assets.cuthongminh.com/games/learn-fruit/grape.webp";
const Watermelon = "https://assets.cuthongminh.com/games/learn-fruit/watermelon.webp";
const Strawberry = "https://assets.cuthongminh.com/games/learn-fruit/strawberry.webp";

// Group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-animal/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-fruit/logo.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-color-color.webp";
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp";

export interface EnglishWord {
  id: string;
  english: string;
  vietnamese: string;
  image: string | StaticImageData;
  category: "animal" | "fruit" | "color" | "number" | "vehicle" | "family" | "body";
}

const numSvg = (num: string, bg: string, color: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='40' fill='%23${bg}'/%3E%3Ctext x='100' y='145' font-family='Arial, sans-serif' font-size='120' font-weight='bold' fill='%23${color}' text-anchor='middle'%3E${num}%3C/text%3E%3C/svg%3E`;

const emojiSvg = (emoji: string, bg: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='40' fill='%23${bg}'/%3E%3Ctext x='100' y='145' font-family='Arial, sans-serif' font-size='100' text-anchor='middle'%3E${encodeURIComponent(emoji)}%3C/text%3E%3C/svg%3E`;

export const ENGLISH_WORDS: EnglishWord[] = [
  // Animals (group1)
  { id: "dog", english: "Dog", vietnamese: "Con Chó", image: Dog, category: "animal" },
  { id: "cat", english: "Cat", vietnamese: "Con Mèo", image: Cat, category: "animal" },
  { id: "fish", english: "Fish", vietnamese: "Con Cá", image: Fish, category: "animal" },
  { id: "duck", english: "Duck", vietnamese: "Con Vịt", image: Duck, category: "animal" },
  { id: "cow", english: "Cow", vietnamese: "Con Bò", image: Cow, category: "animal" },
  { id: "pig", english: "Pig", vietnamese: "Con Lợn", image: Pig, category: "animal" },
  { id: "lion", english: "Lion", vietnamese: "Sư Tử", image: "https://assets.cuthongminh.com/games/learn-animal/lion.webp", category: "animal" },
  { id: "tiger", english: "Tiger", vietnamese: "Con Hổ", image: "https://assets.cuthongminh.com/games/learn-animal/tiger.webp", category: "animal" },
  { id: "elephant", english: "Elephant", vietnamese: "Con Voi", image: "https://assets.cuthongminh.com/games/learn-animal/elephant.webp", category: "animal" },
  { id: "monkey", english: "Monkey", vietnamese: "Con Khỉ", image: "https://assets.cuthongminh.com/games/learn-animal/monkey.webp", category: "animal" },
  { id: "rabbit", english: "Rabbit", vietnamese: "Con Thỏ", image: "https://assets.cuthongminh.com/games/learn-animal/rabbit.webp", category: "animal" },
  { id: "bear", english: "Bear", vietnamese: "Con Gấu", image: "https://assets.cuthongminh.com/games/learn-animal/bear.webp", category: "animal" },
  { id: "horse", english: "Horse", vietnamese: "Con Ngựa", image: "https://assets.cuthongminh.com/games/learn-animal/horse.webp", category: "animal" },
  { id: "bird", english: "Bird", vietnamese: "Con Chim", image: "https://assets.cuthongminh.com/games/learn-animal/bird.webp", category: "animal" },
  { id: "sheep", english: "Sheep", vietnamese: "Con Cừu", image: "https://assets.cuthongminh.com/games/learn-animal/sheep.webp", category: "animal" },
  { id: "chicken", english: "Chicken", vietnamese: "Con Gà", image: "https://assets.cuthongminh.com/games/learn-animal/chicken.webp", category: "animal" },
  { id: "giraffe", english: "Giraffe", vietnamese: "Hươu Cao Cổ", image: "https://assets.cuthongminh.com/games/learn-animal/giraffe.webp", category: "animal" },
  { id: "snake", english: "Snake", vietnamese: "Con Rắn", image: "https://assets.cuthongminh.com/games/learn-animal/snake.webp", category: "animal" },
  { id: "dolphin", english: "Dolphin", vietnamese: "Cá Heo", image: "https://assets.cuthongminh.com/games/learn-animal/dolphin.webp", category: "animal" },
  { id: "shark", english: "Shark", vietnamese: "Cá Mập", image: "https://assets.cuthongminh.com/games/learn-animal/shark.webp", category: "animal" },
  { id: "seaturtle", english: "Sea Turtle", vietnamese: "Rùa Biển", image: "https://assets.cuthongminh.com/games/learn-animal/seaturtle.webp", category: "animal" },
  { id: "octopus", english: "Octopus", vietnamese: "Bạch Tuộc", image: "https://assets.cuthongminh.com/games/learn-animal/octopus.webp", category: "animal" },
  { id: "starfish", english: "Starfish", vietnamese: "Sao Biển", image: "https://assets.cuthongminh.com/games/learn-animal/starfish.webp", category: "animal" },
  { id: "squid", english: "Squid", vietnamese: "Con Mực", image: "https://assets.cuthongminh.com/games/learn-animal/squid.webp", category: "animal" },
  { id: "crab", english: "Crab", vietnamese: "Con Cua", image: "https://assets.cuthongminh.com/games/learn-animal/crab.webp", category: "animal" },

  // Fruits (group2)
  { id: "apple", english: "Apple", vietnamese: "Quả Táo", image: Apple, category: "fruit" },
  { id: "banana", english: "Banana", vietnamese: "Quả Chuối", image: Banana, category: "fruit" },
  { id: "orange", english: "Orange", vietnamese: "Quả Cam", image: Orange, category: "fruit" },
  { id: "grape", english: "Grape", vietnamese: "Quả Nho", image: Grape, category: "fruit" },
  { id: "watermelon", english: "Watermelon", vietnamese: "Quả Dưa Hấu", image: Watermelon, category: "fruit" },
  { id: "strawberry", english: "Strawberry", vietnamese: "Quả Dâu Tây", image: Strawberry, category: "fruit" },
  { id: "mango", english: "Mango", vietnamese: "Quả Xoài", image: "https://assets.cuthongminh.com/games/learn-fruit/mango.webp", category: "fruit" },
  { id: "pineapple", english: "Pineapple", vietnamese: "Quả Dứa", image: "https://assets.cuthongminh.com/games/learn-fruit/pineapple.webp", category: "fruit" },
  { id: "coconut", english: "Coconut", vietnamese: "Quả Dừa", image: "https://assets.cuthongminh.com/games/learn-fruit/coconut.webp", category: "fruit" },
  { id: "peach", english: "Peach", vietnamese: "Quả Đào", image: "https://assets.cuthongminh.com/games/learn-fruit/peach.webp", category: "fruit" },
  { id: "cherry", english: "Cherry", vietnamese: "Quả Anh Đào", image: "https://assets.cuthongminh.com/games/learn-fruit/cherry.webp", category: "fruit" },
  { id: "kiwi", english: "Kiwi", vietnamese: "Quả Kiwi", image: "https://assets.cuthongminh.com/games/learn-fruit/kiwi.webp", category: "fruit" },
  { id: "lemon", english: "Lemon", vietnamese: "Quả Chanh", image: "https://assets.cuthongminh.com/games/learn-fruit/lemon.webp", category: "fruit" },
  { id: "melon", english: "Melon", vietnamese: "Dưa Lưới", image: "https://assets.cuthongminh.com/games/learn-fruit/melon.webp", category: "fruit" },
  { id: "pear", english: "Pear", vietnamese: "Quả Lê", image: "https://assets.cuthongminh.com/games/learn-fruit/pear.webp", category: "fruit" },

  // Colors (group3) - using emoji-style color blocks
  { id: "red", english: "Red", vietnamese: "Màu Đỏ", image: "https://assets.cuthongminh.com/games/learn-color/red-apple.webp", category: "color" },
  { id: "blue", english: "Blue", vietnamese: "Màu Xanh Dương", image: "https://assets.cuthongminh.com/games/learn-color/blue-whale.webp", category: "color" },
  { id: "green", english: "Green", vietnamese: "Màu Xanh Lá", image: "https://assets.cuthongminh.com/games/learn-color/green-frog.webp", category: "color" },
  { id: "yellow", english: "Yellow", vietnamese: "Màu Vàng", image: "https://assets.cuthongminh.com/games/learn-color/yellow-banana.webp", category: "color" },
  { id: "pink", english: "Pink", vietnamese: "Màu Hồng", image: "https://assets.cuthongminh.com/games/learn-color/pink-pig.webp", category: "color" },
  { id: "purple", english: "Purple", vietnamese: "Màu Tím", image: "https://assets.cuthongminh.com/games/learn-color/purple-grape.webp", category: "color" },
  { id: "black", english: "Black", vietnamese: "Màu Đen", image: "https://assets.cuthongminh.com/games/learn-color/black.webp", category: "color" },
  { id: "white", english: "White", vietnamese: "Màu Trắng", image: "https://assets.cuthongminh.com/games/learn-color/white.webp", category: "color" },
  { id: "brown", english: "Brown", vietnamese: "Màu Nâu", image: "https://assets.cuthongminh.com/games/learn-color/brown.webp", category: "color" },
  { id: "orange_color", english: "Orange", vietnamese: "Màu Cam", image: "https://assets.cuthongminh.com/games/learn-color/orange_color.webp", category: "color" },
  { id: "gray", english: "Gray", vietnamese: "Màu Xám", image: "https://assets.cuthongminh.com/games/learn-color/gray.webp", category: "color" },
  { id: "silver", english: "Silver", vietnamese: "Màu Bạc", image: "https://assets.cuthongminh.com/games/learn-color/silver.webp", category: "color" },
  { id: "gold", english: "Gold", vietnamese: "Màu Vàng Kim", image: "https://assets.cuthongminh.com/games/learn-color/gold.webp", category: "color" },
  { id: "cyan", english: "Cyan", vietnamese: "Màu Xanh Lơ", image: "https://assets.cuthongminh.com/games/learn-color/cyan.webp", category: "color" },
  { id: "magenta", english: "Magenta", vietnamese: "Màu Đỏ Tươi", image: "https://assets.cuthongminh.com/games/learn-color/magenta.webp", category: "color" },

  // Numbers (group4) - using generated SVG images
  { id: "one", english: "One", vietnamese: "Số 1", image: "https://assets.cuthongminh.com/games/learn-number/one.webp", category: "number" },
  { id: "two", english: "Two", vietnamese: "Số 2", image: "https://assets.cuthongminh.com/games/learn-number/two.webp", category: "number" },
  { id: "three", english: "Three", vietnamese: "Số 3", image: "https://assets.cuthongminh.com/games/learn-number/three.webp", category: "number" },
  { id: "four", english: "Four", vietnamese: "Số 4", image: "https://assets.cuthongminh.com/games/learn-number/four.webp", category: "number" },
  { id: "five", english: "Five", vietnamese: "Số 5", image: "https://assets.cuthongminh.com/games/learn-number/five.webp", category: "number" },
  { id: "six", english: "Six", vietnamese: "Số 6", image: "https://assets.cuthongminh.com/games/learn-number/six.webp", category: "number" },
  { id: "seven", english: "Seven", vietnamese: "Số 7", image: "https://assets.cuthongminh.com/games/learn-number/seven.webp", category: "number" },
  { id: "eight", english: "Eight", vietnamese: "Số 8", image: "https://assets.cuthongminh.com/games/learn-number/eight.webp", category: "number" },
  { id: "nine", english: "Nine", vietnamese: "Số 9", image: "https://assets.cuthongminh.com/games/learn-number/nine.webp", category: "number" },
  { id: "ten", english: "Ten", vietnamese: "Số 10", image: "https://assets.cuthongminh.com/games/learn-number/ten.webp", category: "number" },
  { id: "eleven", english: "Eleven", vietnamese: "Số 11", image: "https://assets.cuthongminh.com/games/learn-number/eleven.webp", category: "number" },
  { id: "twelve", english: "Twelve", vietnamese: "Số 12", image: "https://assets.cuthongminh.com/games/learn-number/twelve.webp", category: "number" },
  { id: "thirteen", english: "Thirteen", vietnamese: "Số 13", image: "https://assets.cuthongminh.com/games/learn-number/thirteen.webp", category: "number" },
  { id: "fourteen", english: "Fourteen", vietnamese: "Số 14", image: "https://assets.cuthongminh.com/games/learn-number/fourteen.webp", category: "number" },
  { id: "fifteen", english: "Fifteen", vietnamese: "Số 15", image: "https://assets.cuthongminh.com/games/learn-number/fifteen.webp", category: "number" },

  // Vehicles (group5)
  { id: "car", english: "Car", vietnamese: "Ô tô", image: "https://assets.cuthongminh.com/games/learn-vehicle/car.webp", category: "vehicle" },
  { id: "bus", english: "Bus", vietnamese: "Xe buýt", image: "https://assets.cuthongminh.com/games/learn-vehicle/bus.webp", category: "vehicle" },
  { id: "train", english: "Train", vietnamese: "Tàu hỏa", image: "https://assets.cuthongminh.com/games/learn-vehicle/train.webp", category: "vehicle" },
  { id: "plane", english: "Plane", vietnamese: "Máy bay", image: "https://assets.cuthongminh.com/games/learn-vehicle/plane.webp", category: "vehicle" },
  { id: "boat", english: "Boat", vietnamese: "Thuyền", image: "https://assets.cuthongminh.com/games/learn-vehicle/boat.webp", category: "vehicle" },
  { id: "bicycle", english: "Bicycle", vietnamese: "Xe đạp", image: "https://assets.cuthongminh.com/games/learn-vehicle/bicycle.webp", category: "vehicle" },
  { id: "motorcycle", english: "Motorcycle", vietnamese: "Xe Máy", image: "https://assets.cuthongminh.com/games/learn-vehicle/motorcycle.webp", category: "vehicle" },
  { id: "truck", english: "Truck", vietnamese: "Xe Tải", image: "https://assets.cuthongminh.com/games/learn-vehicle/truck.webp", category: "vehicle" },
  { id: "helicopter", english: "Helicopter", vietnamese: "Trực Thăng", image: "https://assets.cuthongminh.com/games/learn-vehicle/helicopter.webp", category: "vehicle" },
  { id: "ship", english: "Ship", vietnamese: "Tàu Thủy", image: "https://assets.cuthongminh.com/games/learn-vehicle/ship.webp", category: "vehicle" },
  { id: "submarine", english: "Submarine", vietnamese: "Tàu Ngầm", image: "https://assets.cuthongminh.com/games/learn-vehicle/submarine.webp", category: "vehicle" },
  { id: "ambulance", english: "Ambulance", vietnamese: "Xe Cứu Thương", image: "https://assets.cuthongminh.com/games/learn-vehicle/ambulance.webp", category: "vehicle" },
  { id: "police_car", english: "Police Car", vietnamese: "Xe Cảnh Sát", image: "https://assets.cuthongminh.com/games/learn-vehicle/police_car.webp", category: "vehicle" },
  { id: "fire_engine", english: "Fire Engine", vietnamese: "Xe Cứu Hỏa", image: "https://assets.cuthongminh.com/games/learn-vehicle/fire_engine.webp", category: "vehicle" },
  { id: "tractor", english: "Tractor", vietnamese: "Máy Kéo", image: "https://assets.cuthongminh.com/games/learn-vehicle/tractor.webp", category: "vehicle" },

  // Family (group6)
  { id: "father", english: "Father", vietnamese: "Bố", image: "https://assets.cuthongminh.com/games/learn-family/father.webp", category: "family" },
  { id: "mother", english: "Mother", vietnamese: "Mẹ", image: "https://assets.cuthongminh.com/games/learn-family/mother.webp", category: "family" },
  { id: "grandfather", english: "Grandfather", vietnamese: "Ông", image: "https://assets.cuthongminh.com/games/learn-family/grandfather.webp", category: "family" },
  { id: "grandmother", english: "Grandmother", vietnamese: "Bà", image: "https://assets.cuthongminh.com/games/learn-family/grandmother.webp", category: "family" },
  { id: "brother", english: "Brother", vietnamese: "Anh/Em trai", image: "https://assets.cuthongminh.com/games/learn-family/brother.webp", category: "family" },
  { id: "sister", english: "Sister", vietnamese: "Chị/Em gái", image: "https://assets.cuthongminh.com/games/learn-family/sister.webp", category: "family" },
  { id: "uncle", english: "Uncle", vietnamese: "Chú / Bác Trai", image: "https://assets.cuthongminh.com/games/learn-family/uncle.webp", category: "family" },
  { id: "aunt", english: "Aunt", vietnamese: "Cô / Bác Gái", image: "https://assets.cuthongminh.com/games/learn-family/aunt.webp", category: "family" },
  { id: "cousin", english: "Cousin", vietnamese: "Anh Chị Em Họ", image: "https://assets.cuthongminh.com/games/learn-family/cousin.webp", category: "family" },
  { id: "baby", english: "Baby", vietnamese: "Em Bé", image: "https://assets.cuthongminh.com/games/learn-family/baby.webp", category: "family" },
  { id: "son", english: "Son", vietnamese: "Con Trai", image: "https://assets.cuthongminh.com/games/learn-family/son.webp", category: "family" },
  { id: "daughter", english: "Daughter", vietnamese: "Con Gái", image: "https://assets.cuthongminh.com/games/learn-family/daughter.webp", category: "family" },
  { id: "husband", english: "Husband", vietnamese: "Chồng", image: "https://assets.cuthongminh.com/games/learn-family/husband.webp", category: "family" },
  { id: "wife", english: "Wife", vietnamese: "Vợ", image: "https://assets.cuthongminh.com/games/learn-family/wife.webp", category: "family" },
  { id: "parents", english: "Parents", vietnamese: "Bố Mẹ", image: "https://assets.cuthongminh.com/games/learn-family/parents.webp", category: "family" },

  // Body (group7)
  { id: "head", english: "Head", vietnamese: "Cái đầu", image: "https://assets.cuthongminh.com/games/learn-body/head.webp", category: "body" },
  { id: "eye", english: "Eye", vietnamese: "Con mắt", image: "https://assets.cuthongminh.com/games/learn-body/eye.webp", category: "body" },
  { id: "ear", english: "Ear", vietnamese: "Cái tai", image: "https://assets.cuthongminh.com/games/learn-body/ear.webp", category: "body" },
  { id: "nose", english: "Nose", vietnamese: "Cái mũi", image: "https://assets.cuthongminh.com/games/learn-body/nose.webp", category: "body" },
  { id: "mouth", english: "Mouth", vietnamese: "Cái miệng", image: "https://assets.cuthongminh.com/games/learn-body/mouth.webp", category: "body" },
  { id: "hand", english: "Hand", vietnamese: "Bàn tay", image: "https://assets.cuthongminh.com/games/learn-body/hand.webp", category: "body" },
  { id: "arm", english: "Arm", vietnamese: "Cánh Tay", image: "https://assets.cuthongminh.com/games/learn-body/arm.webp", category: "body" },
  { id: "leg", english: "Leg", vietnamese: "Cái Chân", image: "https://assets.cuthongminh.com/games/learn-body/leg.webp", category: "body" },
  { id: "foot", english: "Foot", vietnamese: "Bàn Chân", image: "https://assets.cuthongminh.com/games/learn-body/foot.webp", category: "body" },
  { id: "hair", english: "Hair", vietnamese: "Tóc", image: "https://assets.cuthongminh.com/games/learn-body/hair.webp", category: "body" },
  { id: "tooth", english: "Tooth", vietnamese: "Răng", image: "https://assets.cuthongminh.com/games/learn-body/tooth.webp", category: "body" },
  { id: "tongue", english: "Tongue", vietnamese: "Lưỡi", image: "https://assets.cuthongminh.com/games/learn-body/tongue.webp", category: "body" },
  { id: "finger", english: "Finger", vietnamese: "Ngón Tay", image: "https://assets.cuthongminh.com/games/learn-body/finger.webp", category: "body" },
  { id: "toe", english: "Toe", vietnamese: "Ngón Chân", image: "https://assets.cuthongminh.com/games/learn-body/toe.webp", category: "body" },
  { id: "shoulder", english: "Shoulder", vietnamese: "Vai", image: "https://assets.cuthongminh.com/games/learn-body/shoulder.webp", category: "body" },
];

const CATEGORY_MAP: Record<string, string[]> = {
  group1: ["dog", "cat", "fish", "duck", "cow", "pig", "lion", "tiger", "elephant", "monkey", "rabbit", "bear", "horse", "bird", "sheep"],
  group2: ["apple", "banana", "orange", "grape", "watermelon", "strawberry", "mango", "pineapple", "coconut", "peach", "cherry", "kiwi", "lemon", "melon", "pear"],
  group3: ["red", "blue", "green", "yellow", "pink", "purple", "black", "white", "brown", "orange_color", "gray", "silver", "gold", "cyan", "magenta"],
  group4: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"],
  group5: ["car", "bus", "train", "plane", "boat", "bicycle", "motorcycle", "truck", "helicopter", "ship", "submarine", "ambulance", "police_car", "fire_engine", "tractor"],
  group6: ["father", "mother", "grandfather", "grandmother", "brother", "sister", "uncle", "aunt", "cousin", "baby", "son", "daughter", "husband", "wife", "parents"],
  group7: ["head", "eye", "ear", "nose", "mouth", "hand", "arm", "leg", "foot", "hair", "tooth", "tongue", "finger", "toe", "shoulder"],
};

export const GROUPS = [
  {
    id: "group1",
    title: "Động Vật",
    description: "Học tên các con vật bằng tiếng Anh",
    words: CATEGORY_MAP.group1,
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Trái Cây",
    description: "Học tên các loại trái cây bằng tiếng Anh",
    words: CATEGORY_MAP.group2,
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Màu Sắc",
    description: "Học tên các màu sắc bằng tiếng Anh",
    words: CATEGORY_MAP.group3,
    logo: LogoGroup3,
    variant: "purple" as const,
  },
  {
    id: "group4",
    title: "Số Đếm",
    description: "Học đếm số bằng tiếng Anh",
    words: CATEGORY_MAP.group4,
    logo: LogoGroup4,
    variant: "blue" as const,
  },
  {
    id: "group5",
    title: "Giao Thông",
    description: "Học tên các phương tiện giao thông",
    words: CATEGORY_MAP.group5,
    logo: "https://assets.cuthongminh.com/games/learn-english-vocab/group5.webp",
    variant: "orange" as const,
  },
  {
    id: "group6",
    title: "Gia Đình",
    description: "Học từ vựng về các thành viên trong gia đình",
    words: CATEGORY_MAP.group6,
    logo: "https://assets.cuthongminh.com/games/learn-english-vocab/group6.webp",
    variant: "green" as const,
  },
  {
    id: "group7",
    title: "Cơ Thể Người",
    description: "Học từ vựng về các bộ phận cơ thể",
    words: CATEGORY_MAP.group7,
    logo: "https://assets.cuthongminh.com/games/learn-english-vocab/group7.webp",
    variant: "purple" as const,
  },
];

// Helper to get words for a specific group
export function getWordsForGroup(groupId: string): EnglishWord[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return ENGLISH_WORDS.filter((word) => group.words.includes(word.id));
}
