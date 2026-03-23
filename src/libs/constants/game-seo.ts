/**
 * SEO data for all game pages.
 * Used to generate metadata, JSON-LD, and SEO description sections.
 */

export interface GameSeoData {
  title: string;
  description: string;
  keywords: string[];
  seoText: string;
  seoFeatures: string[];
  ogImage: string;
  relatedGames: string[];
  videoUrl?: string;
}

export const GAME_SEO: Record<string, GameSeoData> = {
  "learn-tones": {
    title: "Học Dấu Tiếng Việt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học nhận biết và phát âm 5 dấu thanh tiếng Việt: sắc, huyền, hỏi, ngã, nặng qua trò chơi tương tác với hình ảnh và âm thanh sinh động.",
    keywords: ["học dấu tiếng việt", "dấu thanh cho bé", "tập viết dấu", "giáo dục tiếng việt"],
    seoText:
      "Trò chơi Học Dấu Tiếng Việt giúp bé từ 3-6 tuổi làm quen với 5 dấu thanh: sắc, huyền, hỏi, ngã, nặng. Bé sẽ được nghe phát âm chuẩn, tập nói theo, tập viết dấu và chơi trò chơi nhận diện chữ đúng. Mỗi bài học được thiết kế ngắn gọn, phù hợp với khả năng tập trung của trẻ nhỏ, giúp bé tiếp thu kiến thức một cách tự nhiên và vui vẻ.",
    seoFeatures: [
      "Học phát âm 5 dấu thanh tiếng Việt",
      "Tập viết dấu qua hình ảnh hướng dẫn",
      "Trò chơi nhận diện chữ đúng",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-tones/logo.webp",
    relatedGames: ["learn-alphabet", "learn-syllable"],
  },
  "learn-numbers": {
    title: "Học Đếm Số cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học đếm số từ 1 đến 20 qua hình ảnh sinh động và trò chơi tương tác. Rèn luyện kỹ năng nhận biết số, đếm đồ vật và tập viết số.",
    keywords: ["học đếm số", "bé học số", "đếm 1 đến 20", "toán cho bé mầm non"],
    seoText:
      "Trò chơi Học Đếm Số giúp bé từ 3-6 tuổi làm quen với các con số từ 1 đến 20. Qua các bài học tương tác, bé sẽ học nhận biết số, đếm đồ vật, chọn số đúng và tập viết số. Chương trình chia thành 5 nhóm từ dễ đến khó, giúp bé tiến bộ dần dần theo khả năng của mình.",
    seoFeatures: [
      "Học nhận biết số từ 1 đến 20",
      "Đếm đồ vật qua hình ảnh",
      "Tập viết số",
      "5 cấp độ từ dễ đến khó",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp",
    relatedGames: ["compare-quantity", "learn-shape", "learn-math"],
  },
  "compare-quantity": {
    title: "Học So Sánh Số Lượng cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học so sánh lớn hơn, nhỏ hơn, bằng nhau qua trò chơi tương tác với hình ảnh vui nhộn. Phát triển tư duy toán học sớm cho trẻ.",
    keywords: ["so sánh số lượng", "lớn hơn nhỏ hơn", "toán mầm non", "tư duy toán học cho bé"],
    seoText:
      "Trò chơi So Sánh Số Lượng giúp bé từ 3-6 tuổi hiểu các khái niệm lớn hơn, nhỏ hơn và bằng nhau thông qua hình ảnh trực quan. Bé sẽ so sánh các nhóm đồ vật, luyện tập phản xạ và thử thách bản thân qua các trò chơi hấp dẫn.",
    seoFeatures: [
      "Học khái niệm lớn hơn, nhỏ hơn, bằng nhau",
      "So sánh nhóm đồ vật bằng hình ảnh",
      "Luyện tập và thử thách tư duy",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/game-3-logo.webp",
    relatedGames: ["learn-numbers", "learn-shape", "learn-math"],
  },
  "learn-color": {
    title: "Học Màu Sắc cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết và phân biệt các màu sắc cơ bản và nâng cao qua trò chơi tương tác với hình ảnh sinh động và phát âm chuẩn.",
    keywords: ["học màu sắc", "bé nhận biết màu", "trò chơi màu sắc", "giáo dục mầm non"],
    seoText:
      "Trò chơi Học Màu Sắc giúp bé từ 3-6 tuổi nhận biết và phân biệt các màu sắc cơ bản như đỏ, xanh, vàng, cùng các màu nâng cao. Bé sẽ được nghe phát âm tên màu, tìm màu giống nhau và chơi các trò chơi thú vị về màu sắc. Hình ảnh sinh động với các đồ vật quen thuộc giúp bé ghi nhớ dễ dàng.",
    seoFeatures: [
      "Nhận biết màu sắc cơ bản và nâng cao",
      "Phát âm chuẩn tên các màu",
      "Trò chơi tìm màu giống nhau",
      "Hình ảnh đồ vật sinh động",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-color-color.webp",
    relatedGames: ["mix-color", "paint-picture"],
  },
  "learn-shape": {
    title: "Học Hình Dạng cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết các hình dạng cơ bản và nâng cao qua đồ vật thực tế. Tìm hình giống, ghép hình và chơi trò chơi hình dạng vui nhộn.",
    keywords: ["học hình dạng", "nhận biết hình", "hình tròn vuông tam giác", "toán mầm non"],
    seoText:
      "Trò chơi Học Hình Dạng giúp bé từ 3-6 tuổi nhận biết các hình dạng như tròn, vuông, tam giác, chữ nhật qua đồ vật thực tế xung quanh. Bé sẽ tìm hình giống nhau, tìm đồ vật có hình dạng tương ứng và chơi trò chơi hình dạng thú vị.",
    seoFeatures: [
      "Nhận biết hình dạng cơ bản và nâng cao",
      "Liên hệ hình dạng với đồ vật thực tế",
      "Trò chơi tìm hình và ghép hình",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp",
    relatedGames: ["learn-numbers", "compare-quantity", "learn-math"],
  },
  "learn-animal": {
    title: "Học Động Vật cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với các loài động vật nuôi, hoang dã và biển qua hình ảnh và âm thanh. Tập nói tên, nhận diện và ghép đôi động vật.",
    keywords: ["học động vật", "con vật cho bé", "động vật hoang dã", "khoa học cho bé"],
    seoText:
      "Trò chơi Học Động Vật giúp bé từ 3-6 tuổi khám phá thế giới động vật phong phú: từ động vật nuôi quen thuộc, động vật hoang dã đến các loài sinh vật biển. Bé được nghe tên, tập nói, nhận diện qua hình ảnh và chơi trò ghép đôi hấp dẫn.",
    seoFeatures: [
      "Học tên động vật nuôi, hoang dã và biển",
      "Nghe phát âm và tập nói tên",
      "Trò chơi nhận diện và ghép đôi",
      "Hình ảnh minh họa sinh động",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-animal/logo.webp",
    relatedGames: ["learn-fruit", "learn-food", "learn-dinosaur"],
  },
  "learn-vehicle": {
    title: "Học Phương Tiện Giao Thông cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết phương tiện giao thông đường bộ, đường thủy và hàng không. Tập nói tên, nhận diện và ghép đôi phương tiện.",
    keywords: ["phương tiện giao thông", "xe ô tô cho bé", "học phương tiện", "giáo dục bé"],
    seoText:
      "Trò chơi Học Phương Tiện Giao Thông giúp bé từ 3-6 tuổi nhận biết các phương tiện đường bộ (ô tô, xe máy, xe buýt), đường thủy (tàu, thuyền) và hàng không (máy bay, trực thăng). Bé sẽ học tên, chơi trò nhận diện, ghép đôi và tìm hiểu xe đi đâu.",
    seoFeatures: [
      "Phương tiện đường bộ, thủy và hàng không",
      "Tập nói tên phương tiện",
      "Trò chơi nhận diện và ghép đôi",
      "Tìm hiểu công dụng phương tiện",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-vehicle/logo.webp",
    relatedGames: ["learn-occupation", "learn-hygiene", "learn-traffic"],
  },
  "learn-fruit": {
    title: "Học Trái Cây cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết tên và hình dạng các loại trái cây phổ biến, nhiệt đới qua trò chơi tương tác với hình ảnh đẹp mắt.",
    keywords: ["học trái cây", "nhận biết trái cây", "trái cây cho bé", "khoa học cho bé"],
    seoText:
      "Trò chơi Học Trái Cây giúp bé từ 3-6 tuổi nhận biết các loại trái cây phổ biến và nhiệt đới: táo, chuối, cam, xoài, dưa hấu và nhiều loại khác. Bé sẽ học tên, chơi trò nhận diện và ghép đôi trái cây qua hình ảnh sắc nét, dễ thương.",
    seoFeatures: [
      "Nhận biết trái cây phổ biến và nhiệt đới",
      "Học tên trái cây bằng tiếng Việt",
      "Trò chơi nhận diện và ghép đôi",
      "Hình ảnh trái cây sống động",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-fruit/logo.webp",
    relatedGames: ["learn-animal", "learn-food", "learn-dinosaur"],
  },
  "learn-food": {
    title: "Học Món Ăn cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học tên các món ăn sáng, món chính và món tráng miệng qua trò chơi tương tác với hình ảnh hấp dẫn.",
    keywords: ["học món ăn", "nhận biết thức ăn", "món ăn cho bé", "giáo dục dinh dưỡng"],
    seoText:
      "Trò chơi Học Món Ăn giúp bé từ 3-6 tuổi nhận biết các loại thức ăn: món sáng (phở, bún, xôi), món chính (cơm, canh, thịt) và món tráng miệng (bánh, kẹo, kem). Bé sẽ học tên, nhận diện và ghép đôi qua hình ảnh món ăn đẹp mắt.",
    seoFeatures: [
      "Học tên món ăn sáng, chính, tráng miệng",
      "Hình ảnh thức ăn hấp dẫn",
      "Trò chơi nhận diện và ghép đôi",
      "Phù hợp bé 3-6 tuổi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-food/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-dinosaur"],
  },
  "learn-dinosaur": {
    title: "Học Khủng Long cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá thế giới khủng long: khủng long ăn cỏ, ăn thịt, khủng long bay và biển qua trò chơi tương tác hấp dẫn.",
    keywords: ["khủng long cho bé", "học khủng long", "thế giới khủng long", "khoa học cho bé"],
    seoText:
      "Trò chơi Học Khủng Long giúp bé từ 3-6 tuổi khám phá thế giới tiền sử đầy thú vị. Bé sẽ học tên các loài khủng long ăn cỏ (Brachiosaurus, Triceratops), ăn thịt (T-Rex, Velociraptor), cùng khủng long bay và biển. Mỗi bài học có hình ảnh minh họa sống động và trò chơi ghép đôi hấp dẫn.",
    seoFeatures: [
      "Khám phá khủng long ăn cỏ, ăn thịt, bay, biển",
      "Hình ảnh minh họa sống động",
      "Trò chơi nhận diện và ghép đôi",
      "Phù hợp bé yêu thích khám phá",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-food"],
  },
  "learn-instrument": {
    title: "Học Nhạc Cụ cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với nhạc cụ dây, gõ và hơi qua hình ảnh và âm thanh thực tế. Nghe, nhận diện và ghép đôi nhạc cụ.",
    keywords: ["học nhạc cụ", "nhạc cụ cho bé", "âm nhạc cho bé", "giáo dục âm nhạc"],
    seoText:
      "Trò chơi Học Nhạc Cụ giúp bé từ 3-6 tuổi làm quen với các loại nhạc cụ: nhạc cụ dây (guitar, violin, đàn bầu), nhạc cụ gõ (trống, xylophone) và nhạc cụ hơi (sáo, kèn). Bé sẽ nghe âm thanh thực tế, học tên và chơi trò ghép đôi nhạc cụ.",
    seoFeatures: [
      "Nhạc cụ dây, gõ và hơi",
      "Nghe âm thanh nhạc cụ thực tế",
      "Trò chơi nhận diện và ghép đôi",
      "Phát triển khả năng nghe nhạc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-instrument/logo.webp",
    relatedGames: ["mini-piano", "learn-notes"],
  },
  "learn-occupation": {
    title: "Học Nghề Nghiệp cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé tìm hiểu các nghề nghiệp phổ biến: cộng đồng, y tế, khoa học và nghệ thuật. Học tên nghề, nhận diện và nối dụng cụ.",
    keywords: ["học nghề nghiệp", "nghề nghiệp cho bé", "bác sĩ cảnh sát", "giáo dục kỹ năng sống"],
    seoText:
      "Trò chơi Học Nghề Nghiệp giúp bé từ 3-6 tuổi tìm hiểu về các nghề cộng đồng (cảnh sát, lính cứu hỏa, giáo viên), nghề y tế & khoa học (bác sĩ, y tá, nhà khoa học) và nghề nghệ thuật (ca sĩ, họa sĩ, nhiếp ảnh gia). Bé sẽ học tên nghề, nhận diện qua hình ảnh và nối nghề với dụng cụ làm việc.",
    seoFeatures: [
      "Nghề cộng đồng, y tế, khoa học, nghệ thuật",
      "Học tên nghề và nhận diện",
      "Nối nghề với dụng cụ làm việc",
      "Hình ảnh minh họa dễ thương",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-occupation/logo.webp",
    relatedGames: ["learn-vehicle", "learn-hygiene", "learn-traffic"],
  },
  "learn-flower": {
    title: "Học Hoa và Cây cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá các loài hoa phổ biến, hoa Tết và cây ăn quả quen thuộc ở Việt Nam qua trò chơi tương tác sinh động.",
    keywords: ["học hoa", "nhận biết cây", "hoa cho bé", "thiên nhiên cho bé"],
    seoText:
      "Trò chơi Học Hoa và Cây giúp bé từ 3-6 tuổi khám phá thiên nhiên Việt Nam: hoa phổ biến (hoa hồng, hoa cúc), hoa Tết & trang trí (mai, đào, hướng dương) và cây ăn quả (xoài, mít, bưởi). Bé sẽ học tên, nhận diện và ghép đôi qua hình ảnh đẹp mắt.",
    seoFeatures: [
      "Hoa phổ biến, hoa Tết và cây ăn quả",
      "Khám phá thiên nhiên Việt Nam",
      "Trò chơi nhận diện và ghép đôi",
      "Hình ảnh thiên nhiên tươi đẹp",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-flower/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-weather"],
  },
  "learn-weather": {
    title: "Học Thời Tiết cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với các hiện tượng thời tiết, mùa và khí hậu qua hình ảnh vui nhộn. Học tên, tập nói, nhận diện và ghép đôi.",
    keywords: ["học thời tiết", "thời tiết cho bé", "mùa trong năm", "khoa học tự nhiên"],
    seoText:
      "Trò chơi Học Thời Tiết giúp bé từ 3-6 tuổi làm quen với thời tiết cơ bản (nắng, mưa, gió), thời tiết đặc biệt (tuyết, sấm, cầu vồng) và các mùa trong năm. Bé sẽ học tên thời tiết, tập nói, nhận diện qua hình ảnh và chơi trò chơi mặc đồ đúng mùa.",
    seoFeatures: [
      "Thời tiết cơ bản và đặc biệt",
      "Học về 4 mùa trong năm",
      "Tập nói tên thời tiết",
      "Trò chơi mặc đồ đúng mùa",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-weather/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-flower"],
  },
  "learn-hygiene": {
    title: "Học Vệ Sinh Cá Nhân cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học thói quen vệ sinh hàng ngày, giữ gìn sức khỏe và sạch sẽ gọn gàng qua trò chơi tương tác với tình huống thực tế.",
    keywords: ["vệ sinh cá nhân", "thói quen sạch sẽ", "kỹ năng sống cho bé", "sức khỏe cho bé"],
    seoText:
      "Trò chơi Học Vệ Sinh Cá Nhân giúp bé từ 3-6 tuổi xây dựng thói quen tốt: vệ sinh hàng ngày (đánh răng, rửa tay), giữ gìn sức khỏe (ăn uống sạch sẽ) và sạch sẽ gọn gàng (dọn phòng, xếp đồ). Bé sẽ học qua tình huống thực tế, trả lời đúng/sai và sắp xếp thứ tự các bước.",
    seoFeatures: [
      "Thói quen vệ sinh hàng ngày",
      "Giữ gìn sức khỏe và sạch sẽ",
      "Tình huống thực tế sinh động",
      "Sắp xếp thứ tự các bước vệ sinh",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-traffic"],
  },
  "learn-traffic": {
    title: "Học An Toàn Giao Thông cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học quy tắc an toàn giao thông: đèn & biển báo, đi bộ an toàn, đi xe an toàn qua trò chơi tương tác và phiêu lưu.",
    keywords: ["an toàn giao thông", "biển báo giao thông", "kỹ năng sống", "giáo dục an toàn"],
    seoText:
      "Trò chơi An Toàn Giao Thông giúp bé từ 3-6 tuổi học các quy tắc quan trọng: nhận biết đèn giao thông & biển báo, quy tắc đi bộ an toàn và quy tắc đi xe an toàn. Bé sẽ khám phá phố, xử lý tình huống và lắp ráp biển báo qua trò chơi phiêu lưu hấp dẫn.",
    seoFeatures: [
      "Nhận biết đèn và biển báo giao thông",
      "Quy tắc đi bộ và đi xe an toàn",
      "Trò chơi phiêu lưu và tình huống",
      "Lắp ráp biển báo",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-traffic/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-hygiene"],
  },
  "learn-emotion": {
    title: "Học Cảm Xúc cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học nhận biết và gọi tên cảm xúc cơ bản qua hình ảnh khuôn mặt và tình huống kịch bản sinh động.",
    keywords: ["học cảm xúc", "quản lý cảm xúc", "kỹ năng sống", "trí tuệ cảm xúc cho bé"],
    seoText:
      "Trò chơi Học Cảm Xúc giúp bé từ 3-6 tuổi nhận biết và gọi tên các cảm xúc: vui, buồn, tức giận, sợ hãi, ngạc nhiên và xấu hổ. Bé sẽ học qua hình ảnh khuôn mặt biểu cảm, tập nói tên cảm xúc, phán đoán đúng/sai và chọn cảm xúc phù hợp với tình huống.",
    seoFeatures: [
      "Nhận biết cảm xúc cơ bản",
      "Gọi tên và tập nói cảm xúc",
      "Tình huống kịch bản sinh động",
      "Phát triển trí tuệ cảm xúc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-emotion/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-hygiene"],
  },
  "learn-flag": {
    title: "Học Cờ Quốc Gia cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết quốc kỳ các nước Châu Á, Châu Âu, Châu Mỹ qua trò chơi lật hình ghi nhớ và ghép hình.",
    keywords: ["học cờ quốc gia", "quốc kỳ cho bé", "địa lý cho bé", "cờ các nước"],
    seoText:
      "Trò chơi Học Cờ Quốc Gia giúp bé từ 3-8 tuổi nhận biết quốc kỳ các nước trên thế giới, chia theo châu lục: Châu Á, Châu Âu và Châu Mỹ. Bé sẽ học tên quốc kỳ, chọn cờ đúng, chơi trò lật hình ghi nhớ và ghép hình quốc kỳ.",
    seoFeatures: [
      "Quốc kỳ Châu Á, Châu Âu, Châu Mỹ",
      "Trò chơi lật hình ghi nhớ",
      "Ghép hình quốc kỳ",
      "Mở rộng kiến thức địa lý",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-flag/logo.webp",
    relatedGames: ["learn-landmark", "learn-costume", "learn-terrain"],
  },
  "learn-landmark": {
    title: "Học Địa Danh Nổi Tiếng cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá các địa danh nổi tiếng thế giới: tháp Eiffel, Vạn Lý Trường Thành, Kim tự tháp qua trò chơi tương tác.",
    keywords: ["địa danh nổi tiếng", "kỳ quan thế giới", "địa lý cho bé", "khám phá thế giới"],
    seoText:
      "Trò chơi Địa Danh Nổi Tiếng giúp bé từ 3-8 tuổi khám phá các kỳ quan và địa danh trên thế giới, chia theo châu lục. Bé sẽ học tên địa danh, chơi trò nhận diện, ghép đôi và xếp hình các công trình nổi tiếng.",
    seoFeatures: [
      "Địa danh Châu Á, Châu Âu, Châu Mỹ",
      "Hình ảnh các kỳ quan thế giới",
      "Trò chơi nhận diện và xếp hình",
      "Mở rộng kiến thức địa lý",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-landmark/logo.webp",
    relatedGames: ["learn-flag", "learn-costume", "learn-terrain"],
  },
  "learn-costume": {
    title: "Học Trang Phục Thế Giới cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé tìm hiểu trang phục truyền thống các quốc gia: áo dài Việt Nam, kimono Nhật, hanbok Hàn qua trò chơi tương tác.",
    keywords: ["trang phục truyền thống", "trang phục các nước", "văn hóa cho bé", "địa lý"],
    seoText:
      "Trò chơi Trang Phục Thế Giới giúp bé từ 3-8 tuổi khám phá trang phục truyền thống các quốc gia. Từ áo dài Việt Nam, kimono Nhật Bản đến hanbok Hàn Quốc, bé sẽ học tên trang phục, nhận biết trang phục nước nào và chơi trò mặc đúng cho bạn.",
    seoFeatures: [
      "Trang phục Châu Á, Châu Âu, Châu Mỹ",
      "Nhận biết trang phục các quốc gia",
      "Trò chơi mặc đúng cho bạn",
      "Tìm hiểu văn hóa thế giới",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-costume/logo.webp",
    relatedGames: ["learn-flag", "learn-landmark", "learn-terrain"],
  },
  "learn-math": {
    title: "Học Toán Đơn Giản cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học phép cộng và phép trừ đơn giản với các số đến 20 qua hình ảnh minh họa và trò chơi tương tác vui nhộn.",
    keywords: ["phép cộng trừ", "toán cho bé", "toán mầm non", "học cộng trừ đơn giản"],
    seoText:
      "Trò chơi Toán Đơn Giản giúp bé từ 3-8 tuổi học phép cộng và phép trừ với các con số đến 20. Bé sẽ hiểu khái niệm qua hình ảnh minh họa, thực hành cộng/trừ bằng hình và bằng số, tập viết dấu cộng trừ và luyện tập tổng hợp.",
    seoFeatures: [
      "Phép cộng và phép trừ đơn giản",
      "Giải thích bằng hình ảnh minh họa",
      "Tập viết dấu cộng và trừ",
      "Luyện tập tổng hợp",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-math/logo.webp",
    relatedGames: ["learn-numbers", "compare-quantity", "learn-multiply"],
  },
  "learn-multiply": {
    title: "Học Phép Nhân cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học bảng nhân 2-5 qua hình ảnh và trò chơi tương tác: nhân bằng hình, nhân bằng số, điền số thiếu và nhảy số.",
    keywords: ["bảng nhân", "phép nhân cho bé", "toán lớp 2", "bảng cửu chương"],
    seoText:
      "Trò chơi Học Phép Nhân giúp bé từ 5-8 tuổi làm quen với bảng nhân từ 2 đến 5. Mỗi bảng nhân có 5 bài học: giải thích khái niệm, nhân bằng hình ảnh, nhân bằng số, điền số thiếu và trò chơi nhảy số. Cách tiếp cận trực quan giúp bé hiểu bản chất phép nhân thay vì chỉ học thuộc.",
    seoFeatures: [
      "Bảng nhân 2, 3, 4, 5",
      "Giải thích nhân bằng hình ảnh",
      "Điền số thiếu và nhảy số",
      "Cách tiếp cận trực quan",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-multiply/logo.webp",
    relatedGames: ["learn-math", "learn-divide", "learn-numbers"],
  },
  "learn-divide": {
    title: "Học Phép Chia cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học bảng chia 2-5 qua hình ảnh và trò chơi tương tác: chia bằng hình, chia bằng số, điền số thiếu và nhân ngược.",
    keywords: ["phép chia cho bé", "bảng chia", "toán lớp 2", "chia đều"],
    seoText:
      "Trò chơi Học Phép Chia giúp bé từ 5-8 tuổi làm quen với bảng chia từ 2 đến 5. Mỗi bảng chia có 5 bài học: giải thích khái niệm chia đều, chia bằng hình ảnh, chia bằng số, điền số thiếu và nhân ngược để kiểm tra. Phương pháp trực quan giúp bé hiểu sâu.",
    seoFeatures: [
      "Bảng chia 2, 3, 4, 5",
      "Giải thích chia đều bằng hình ảnh",
      "Điền số thiếu và nhân ngược",
      "Phương pháp trực quan",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-divide/logo.webp",
    relatedGames: ["learn-math", "learn-multiply", "learn-numbers"],
  },
  "find-pattern": {
    title: "Học Tìm Quy Luật cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học tìm quy luật logic qua các bài tập hình dạng và màu sắc. Phát triển tư duy logic và khả năng quan sát.",
    keywords: ["tìm quy luật", "tư duy logic", "trò chơi trí tuệ", "phát triển tư duy"],
    seoText:
      "Trò chơi Tìm Quy Luật giúp bé từ 3-6 tuổi phát triển tư duy logic qua việc tìm quy luật màu sắc và hình dạng. Bé sẽ quan sát dãy hình, tìm phần tiếp theo và điền vào chỗ trống. Đây là nền tảng quan trọng cho tư duy toán học và khoa học sau này.",
    seoFeatures: [
      "Quy luật màu sắc và hình dạng",
      "Tìm phần tiếp theo trong dãy",
      "Điền vào chỗ trống",
      "Phát triển tư duy logic",
    ],
    ogImage: "https://assets.cuthongminh.com/games/find-pattern/logo.webp",
    relatedGames: ["find-differences", "odd-one-out", "maze-runner"],
  },
  "learn-alphabet": {
    title: "Học Bảng Chữ Cái Tiếng Việt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học bảng chữ cái tiếng Việt: nguyên âm và phụ âm qua hình ảnh, tập nói, tập viết và trò chơi nhận diện chữ.",
    keywords: ["bảng chữ cái", "học chữ cái tiếng việt", "tập viết chữ", "giáo dục ngôn ngữ"],
    seoText:
      "Trò chơi Học Bảng Chữ Cái giúp bé từ 3-6 tuổi học bảng chữ cái tiếng Việt đầy đủ, chia thành nhóm nguyên âm và phụ âm. Mỗi nhóm có 5 bài: học chữ cái, tập nói phát âm, tập viết theo nét, nhận diện chữ đúng và ghép đôi. Phương pháp đa giác quan giúp bé ghi nhớ nhanh và lâu.",
    seoFeatures: [
      "Nguyên âm và phụ âm tiếng Việt",
      "Tập nói phát âm chuẩn",
      "Tập viết theo nét hướng dẫn",
      "Nhận diện chữ và ghép đôi",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp",
    relatedGames: ["learn-tones", "learn-syllable"],
  },
  "find-differences": {
    title: "Tìm Điểm Khác Biệt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé luyện khả năng quan sát bằng cách tìm điểm khác biệt giữa hai bức tranh. Nhiều chủ đề: phòng khách, khu vườn, bãi biển.",
    keywords: ["tìm điểm khác biệt", "trò chơi quan sát", "phát triển tư duy", "trí tuệ cho bé"],
    seoText:
      "Trò chơi Tìm Điểm Khác Biệt giúp bé rèn luyện khả năng quan sát tỉ mỉ. So sánh hai bức tranh cùng chủ đề (phòng khách vui nhộn, khu vườn thú vị, bãi biển đầy nắng, vũ trụ, đại dương) để tìm ra các chi tiết khác nhau. Có 2 cấp độ: dễ và trung bình, phù hợp với mọi lứa tuổi.",
    seoFeatures: [
      "So sánh hai bức tranh",
      "Nhiều chủ đề hấp dẫn",
      "2 cấp độ: dễ và trung bình",
      "Rèn luyện khả năng quan sát",
    ],
    ogImage: "https://assets.cuthongminh.com/games/game-4-logo.webp",
    relatedGames: ["find-pattern", "odd-one-out", "maze-runner"],
  },
  "odd-one-out": {
    title: "Tìm Hình Khác Biệt cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé luyện nhãn quan bằng cách tìm hình khác với các hình còn lại. Tìm màu khác, hình khác và hình khác loại.",
    keywords: ["tìm hình khác biệt", "trò chơi tư duy", "luyện mắt", "trí tuệ cho bé"],
    seoText:
      "Trò chơi Tìm Hình Khác Biệt giúp bé rèn luyện nhãn quan và tư duy phân loại. Bé sẽ tìm ra hình khác với các hình còn lại trong nhóm: tìm màu khác biệt, tìm hình khác biệt và tìm hình khác loại. Trò chơi giúp phát triển khả năng quan sát và tư duy logic.",
    seoFeatures: [
      "Tìm màu khác biệt",
      "Tìm hình khác biệt",
      "Tìm hình khác loại",
      "Rèn luyện tư duy phân loại",
    ],
    ogImage: "https://assets.cuthongminh.com/games/odd-one-out/logo.webp",
    relatedGames: ["find-pattern", "find-differences", "maze-runner"],
  },
  "maze-runner": {
    title: "Mê Cung Phiêu Lưu cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé điều hướng qua các mê cung với 3 cấp độ: dễ, vừa và khó. Phát triển tư duy không gian và kỹ năng giải quyết vấn đề.",
    keywords: ["mê cung cho bé", "trò chơi mê cung", "tư duy không gian", "giải quyết vấn đề"],
    seoText:
      "Trò chơi Mê Cung Phiêu Lưu giúp bé phát triển tư duy không gian và kỹ năng giải quyết vấn đề. Bé sẽ điều hướng qua các mê cung với 3 cấp độ từ dễ đến khó, tìm đường đi đến ngôi sao. Trò chơi rèn luyện sự kiên nhẫn và khả năng lập kế hoạch.",
    seoFeatures: [
      "3 cấp độ: dễ, vừa, khó",
      "Điều hướng tìm đường trong mê cung",
      "Phát triển tư duy không gian",
      "Rèn luyện sự kiên nhẫn",
    ],
    ogImage: "https://assets.cuthongminh.com/games/maze-runner/logo.webp",
    relatedGames: ["find-pattern", "find-differences", "line-connect"],
  },
  "line-connect": {
    title: "Nối Điểm Trí Tuệ cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nối các điểm cùng màu để lấp đầy bảng. Phát triển tư duy logic, lập kế hoạch và khả năng quan sát.",
    keywords: ["nối điểm", "trò chơi trí tuệ", "tư duy logic", "puzzle cho bé"],
    seoText:
      "Trò chơi Nối Điểm Trí Tuệ thử thách bé nối các điểm cùng màu sao cho đường nối lấp đầy toàn bộ bảng. Với 3 cấp độ từ dễ đến khó, trò chơi giúp bé phát triển tư duy logic, khả năng lập kế hoạch và sự kiên nhẫn.",
    seoFeatures: [
      "Nối điểm cùng màu lấp đầy bảng",
      "3 cấp độ từ dễ đến khó",
      "Phát triển tư duy logic",
      "Rèn luyện lập kế hoạch",
    ],
    ogImage: "https://assets.cuthongminh.com/games/line-connect/logo.webp",
    relatedGames: ["find-pattern", "maze-runner", "odd-one-out"],
  },
  "mix-color": {
    title: "Học Pha Màu cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học cách pha trộn các màu cơ bản để tạo ra màu mới. Khám phá nghệ thuật phối màu qua trò chơi tương tác.",
    keywords: ["pha màu", "trộn màu sắc", "mỹ thuật cho bé", "nghệ thuật cho bé"],
    seoText:
      "Trò chơi Pha Màu giúp bé từ 3-6 tuổi khám phá nghệ thuật pha trộn màu sắc. Bé sẽ học cách kết hợp các màu cơ bản (đỏ + vàng = cam, xanh + vàng = xanh lá) và thử thách pha màu nâng cao. Trò chơi kích thích sáng tạo và phát triển khả năng mỹ thuật.",
    seoFeatures: [
      "Pha trộn màu cơ bản và nâng cao",
      "Khám phá nghệ thuật phối màu",
      "Thử thách sáng tạo",
      "Phát triển khả năng mỹ thuật",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-color-color.webp",
    relatedGames: ["learn-color", "paint-picture"],
  },
  "paint-picture": {
    title: "Tô Màu Sáng Tạo cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé tô màu các hình vẽ dễ thương: động vật, thiên nhiên, đồ chơi. Chế độ tô tự do và hoạ khám phá.",
    keywords: ["tô màu cho bé", "tô tranh", "mỹ thuật cho bé", "sáng tạo nghệ thuật"],
    seoText:
      "Trò chơi Tô Màu Sáng Tạo giúp bé từ 3-6 tuổi thỏa sức sáng tạo với các hình vẽ dễ thương theo chủ đề: động vật, thiên nhiên và đồ chơi. Bé có thể tô tự do theo ý thích hoặc chơi chế độ Hoạ Khám Phá để tô theo hướng dẫn. Phát triển khả năng phối màu và thẩm mỹ.",
    seoFeatures: [
      "Tô màu động vật, thiên nhiên, đồ chơi",
      "Chế độ tô tự do",
      "Chế độ Hoạ Khám Phá",
      "Phát triển thẩm mỹ và sáng tạo",
    ],
    ogImage: "https://assets.cuthongminh.com/games/paint-picture/logo.webp",
    relatedGames: ["learn-color", "mix-color"],
  },
  "learn-clock": {
    title: "Học Xem Đồng Hồ cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học cách xem đồng hồ kim và đồng hồ điện tử. Làm quen, chọn đúng giờ và chỉnh kim đồng hồ.",
    keywords: ["học xem đồng hồ", "đồng hồ cho bé", "xem giờ", "kỹ năng sống cho bé"],
    seoText:
      "Trò chơi Xem Đồng Hồ giúp bé từ 4-8 tuổi học cách đọc giờ trên đồng hồ kim và đồng hồ điện tử. Bé sẽ làm quen với các bộ phận đồng hồ, chọn đúng giờ theo yêu cầu và tự tay chỉnh kim đồng hồ. Kỹ năng thiết yếu cho cuộc sống hàng ngày.",
    seoFeatures: [
      "Đồng hồ kim và đồng hồ điện tử",
      "Làm quen các bộ phận đồng hồ",
      "Chọn đúng giờ theo yêu cầu",
      "Chỉnh kim đồng hồ tương tác",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-clock/logo-main.webp",
    relatedGames: ["learn-numbers", "compare-quantity", "learn-math"],
  },
  "mini-piano": {
    title: "Đàn Piano Tí Hon cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học chơi đàn piano, chơi theo bài hát vui nhộn và thử thách trí nhớ âm thanh. Khám phá âm nhạc vui vẻ.",
    keywords: ["đàn piano cho bé", "học chơi đàn", "âm nhạc cho bé", "bài hát thiếu nhi"],
    seoText:
      "Trò chơi Đàn Piano Tí Hon giúp bé từ 3-8 tuổi khám phá âm nhạc qua 3 chế độ: Học Đàn (chơi piano cổ điển tự do), Nhạc Công Nhí (chơi theo bài hát Kìa Con Bướm Vàng, Chúc Mừng Sinh Nhật...) và Đôi Tai Tinh Anh (thử thách tìm nốt đúng và lặp lại giai điệu).",
    seoFeatures: [
      "Piano cổ điển tương tác",
      "Chơi theo bài hát thiếu nhi",
      "Thử thách trí nhớ âm thanh",
      "Phát triển tai nghe nhạc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/mini-piano/logo.webp",
    relatedGames: ["learn-instrument", "learn-notes"],
  },
  "learn-syllable": {
    title: "Học Ghép Vần cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học cách kết hợp nguyên âm và phụ âm để tạo thành vần: ie, uo, ươ, oa, uy qua trò chơi tương tác.",
    keywords: ["ghép vần", "học vần tiếng việt", "nguyên âm phụ âm", "tập đọc cho bé"],
    seoText:
      "Trò chơi Ghép Vần giúp bé từ 4-7 tuổi học cách kết hợp nguyên âm và phụ âm để tạo thành tiếng. Bé sẽ học các vần ie, uo, ươ, oa, uy và nhiều vần khác. Mỗi vần có bài học giới thiệu và trò chơi chọn vần đúng để luyện tập.",
    seoFeatures: [
      "Học vần ie, uo, ươ, oa, uy",
      "Kết hợp nguyên âm và phụ âm",
      "Trò chơi chọn vần đúng",
      "Nền tảng cho kỹ năng đọc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-syllable/logo.webp",
    relatedGames: ["learn-tones", "learn-alphabet"],
  },
  "learn-terrain": {
    title: "Học Địa Hình cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé khám phá các dạng địa hình tự nhiên: núi, sông, biển, sa mạc qua trò chơi tương tác sáng tạo và phiêu lưu.",
    keywords: ["địa hình tự nhiên", "núi sông biển", "địa lý cho bé", "khám phá tự nhiên"],
    seoText:
      "Trò chơi Học Địa Hình giúp bé từ 3-8 tuổi khám phá các dạng địa hình tự nhiên: trên cạn (núi, đồi, đồng bằng), dưới nước (sông, biển, hồ) và địa hình đặc biệt (sa mạc, hang động). Bé sẽ nghe mô tả, xếp lớp địa hình, tìm hiểu ai sống ở đây và phiêu lưu khám phá.",
    seoFeatures: [
      "Địa hình trên cạn, dưới nước, đặc biệt",
      "Nghe đoán và xếp lớp địa hình",
      "Tìm hiểu sinh vật ở mỗi địa hình",
      "Phiêu lưu khám phá tự nhiên",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-terrain/logo.webp",
    relatedGames: ["learn-flag", "learn-landmark", "learn-costume"],
  },
  "learn-body": {
    title: "Học Bộ Phận Cơ Thể cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé nhận biết và gọi tên các bộ phận cơ thể: đầu & mặt, thân mình, bàn tay & chân qua trò chơi tương tác vui nhộn.",
    keywords: ["bộ phận cơ thể", "cơ thể người cho bé", "khoa học cho bé", "giáo dục sức khỏe"],
    seoText:
      "Trò chơi Học Bộ Phận Cơ Thể giúp bé từ 3-6 tuổi nhận biết và gọi tên các bộ phận: đầu & mặt (mắt, mũi, miệng, tai), thân mình (vai, bụng, lưng) và bàn tay & bàn chân. Bé sẽ khám phá qua hình ảnh, chạm và nói, tập nói tên, nhận diện và chơi trò ghép đôi.",
    seoFeatures: [
      "Đầu & mặt, thân mình, bàn tay & chân",
      "Khám phá cơ thể qua hình ảnh",
      "Chạm và nói tên bộ phận",
      "Tìm hiểu chức năng cơ thể",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-body/logo.webp",
    relatedGames: ["learn-animal", "learn-fruit", "learn-food"],
  },
  "learn-notes": {
    title: "Học Nốt Nhạc cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé làm quen với nốt nhạc Đồ Rê Mi Fa Sol La Si trên khuông nhạc qua hình ảnh và âm thanh sinh động.",
    keywords: ["học nốt nhạc", "đồ rê mi", "khuông nhạc cho bé", "âm nhạc giáo dục"],
    seoText:
      "Trò chơi Học Nốt Nhạc giúp bé từ 4-8 tuổi làm quen với các nốt nhạc Đồ, Rê, Mi, Fa, Sol, La, Si trên khuông nhạc. Chia thành nhóm cơ bản (Đồ-Fa) và nâng cao (Sol-Đố), bé sẽ nghe âm thanh, chọn nốt đúng, sắp xếp nốt và luyện tập tổng hợp.",
    seoFeatures: [
      "Nốt nhạc cơ bản: Đồ, Rê, Mi, Fa",
      "Nốt nhạc nâng cao: Sol, La, Si, Đố",
      "Nghe âm thanh và chọn nốt đúng",
      "Sắp xếp nốt trên khuông nhạc",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-notes/logo.webp",
    relatedGames: ["learn-instrument", "mini-piano"],
  },
  "learn-danger": {
    title: "Học Đồ Vật Nguy Hiểm cho bé - Trò chơi giáo dục Cú Thông Minh",
    description:
      "Bé học nhận biết đồ vật nguy hiểm trong bếp, phòng tắm và đồ điện. Rèn kỹ năng an toàn qua tình huống thực tế.",
    keywords: ["đồ vật nguy hiểm", "an toàn cho bé", "kỹ năng sống", "phòng tránh tai nạn"],
    seoText:
      "Trò chơi Đồ Vật Nguy Hiểm giúp bé từ 3-6 tuổi nhận biết các đồ vật nguy hiểm trong nhà: trong bếp (dao, bếp lửa), phòng tắm & xung quanh (hóa chất, sàn trơn) và đồ điện (ổ cắm, dây điện). Bé sẽ học tên, khám phá ngôi nhà, xử lý tình huống và trả lời đúng/sai.",
    seoFeatures: [
      "Đồ nguy hiểm trong bếp, phòng tắm, đồ điện",
      "Khám phá ngôi nhà tương tác",
      "Xử lý tình huống an toàn",
      "Rèn kỹ năng phòng tránh tai nạn",
    ],
    ogImage: "https://assets.cuthongminh.com/games/learn-danger/logo.webp",
    relatedGames: ["learn-vehicle", "learn-occupation", "learn-hygiene"],
  },
};
