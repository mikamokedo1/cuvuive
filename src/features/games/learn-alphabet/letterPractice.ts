import type { LetterData } from "./constants";

/**
 * How each letter is read aloud in Vietnamese grade-1 phonics (SGK Tiếng Việt 1):
 * vowels by their sound, consonants as "<sound> + ờ". Keyed by LetterData.id.
 */
export const LETTER_SOUNDS: Record<string, string> = {
  a: "a",
  ă: "á",
  â: "ớ",
  e: "e",
  ê: "ê",
  i: "i",
  o: "o",
  ô: "ô",
  ơ: "ơ",
  u: "u",
  ư: "ư",
  y: "i dài",
  b: "bờ",
  c: "cờ",
  d: "dờ",
  đ: "đờ",
  g: "gờ",
  h: "hờ",
  k: "ca",
  l: "lờ",
  m: "mờ",
  n: "nờ",
  p: "pờ",
  q: "cu",
  r: "rờ",
  s: "sờ",
  t: "tờ",
  v: "vờ",
  x: "xờ",
};

export function letterSound(letter: LetterData): string {
  return LETTER_SOUNDS[letter.id] ?? letter.id;
}

/**
 * Wrong readings allowed on one letter. The AI reports each wrong reading (be_doc_sai) and the
 * page counts them: in testing the model judged single readings well but never counted to 5.
 */
export const MAX_ATTEMPTS_PER_LETTER = 5;

/** "Ơ (đọc là "ơ", như trong "Quả ớt")" */
export function describeLetter(letter: LetterData): string {
  return `${letter.letter} (đọc là "${letterSound(letter)}", như trong "${letter.word}")`;
}

/**
 * System prompt for Gemini Live: a fixed teaching script. The app, not the AI, owns the
 * order of letters: the AI must report every verdict through a function call and then
 * follow the function result, which names the next letter.
 */
export function buildLetterPracticeInstruction(letters: LetterData[]): string {
  const list = letters
    .map((l, i) => `${i + 1}. Chữ ${l.letter}: đọc là "${letterSound(l)}", từ ví dụ "${l.word}"`)
    .join("\n");
  const first = letters[0];
  const example = first ? `${letterSound(first)}… ${first.word.toLowerCase()}` : "";
  return `VAI TRÒ
Bạn là "Cú Thông Minh", cô giáo mầm non dạy bé 3-6 tuổi đọc chữ cái tiếng Việt. Chỉ nói tiếng Việt. Giọng ấm áp, chậm rãi, vui vẻ. Gọi bé là "con", xưng "cô".

BÀI HỌC HÔM NAY (đúng thứ tự này, không thêm, không bớt, không đổi thứ tự):
${list}

KỊCH BẢN CHO MỖI CHỮ (làm đúng từng bước):
Bước 1. Giới thiệu, 1 câu. Ví dụ: "Đây là chữ ${first?.letter ?? "Ơ"}, đọc là ${first ? letterSound(first) : "ơ"}, như ${first?.word.toLowerCase() ?? "quả ớt"}."
Bước 2. Mời bé đọc cả âm và từ ví dụ, 1 câu. Ví dụ: "Con đọc theo cô nhé: ${example}!" Rồi IM LẶNG chờ bé.
Bước 3. Nghe và chấm:
- Bé đọc được âm của chữ HOẶC từ ví dụ, đúng hoặc gần đúng: GỌI HÀM be_noi_dung. Sau khi gọi hàm chỉ khen 1 câu ngắn, rồi làm theo kết quả hàm.
- Bé đọc sai: GỌI HÀM be_doc_sai (mỗi lần sai đều gọi), rồi làm đúng theo kết quả hàm. Kết quả hàm cho biết nên đọc mẫu lại để bé thử tiếp, hay chuyển sang chữ khác. Bạn KHÔNG cần tự đếm số lần sai.
- Không nghe rõ, chỉ có tiếng ồn, hoặc bé nói chuyện khác: KHÔNG chấm, không tính là lần sai. Nói: "Cô chưa nghe rõ, con đọc to lại nhé: <âm>… <từ ví dụ>!"

QUY TẮC BẮT BUỘC:
- Tham số chu luôn là CHỮ CÁI trong danh sách (ví dụ "${first?.letter ?? "Ơ"}"), không phải cách đọc.
- KHÔNG BAO GIỜ nói "đúng rồi", "giỏi quá" khi chưa gọi hàm be_noi_dung. KHÔNG BAO GIỜ tự chuyển sang chữ khác: chỉ chuyển khi kết quả hàm bảo chuyển.
- Luôn nói tiếng Việt, kể cả khi không hiểu bé nói gì.
- Sau mỗi lần gọi hàm, kết quả hàm cho biết chữ tiếp theo. Chỉ dạy đúng chữ đó, bắt đầu lại từ Bước 1.
- Khi kết quả hàm báo bé đã học xong: khen bé và chào tạm biệt, không hỏi thêm, không dạy thêm.
- Mỗi lượt nói tối đa 2 câu ngắn. Không giảng giải dài.
- Bé hỏi chuyện khác: trả lời 1 câu thật ngắn rồi quay lại chữ đang học.
- Bé còn nhỏ nên dễ tính với phát âm, nhưng phải nghe được âm gần giống mới chấm đúng.`;
}

/** Sent as the first user turn so Cú speaks first. */
export const LETTER_PRACTICE_GREETING = "Bắt đầu bài học";

/** First turn of a session: start the lesson, or pick up where a dropped connection left off. */
export function greetingFor(letters: LetterData[], startIndex: number): string {
  const letter = letters[startIndex];
  if (startIndex <= 0 || !letter) return LETTER_PRACTICE_GREETING;
  return `Bé đã học xong ${startIndex} chữ đầu. Tiếp tục bài học từ chữ ${describeLetter(letter)}.`;
}

/** Sent when the mic heard the child but Gemini did not react (its voice detection missed it). */
export const NUDGE_TEXT =
  "(Bé vừa nói nhưng cô chưa nghe rõ.) Hãy mời bé đọc to lại chữ đang học, không tính là lần sai.";

export const NO_CURRENT_LETTER_RESULT = "Không có chữ nào đang học.";

export function stayOnLetterResult(letter: LetterData): string {
  return `Chữ đang học là ${letter.letter}. Hãy tiếp tục với chữ ${letter.letter}.`;
}

/** What we answer to a function call: either the next letter or the end of the lesson. */
export function toolResultFor(letters: LetterData[], nextIndex: number): string {
  const next = letters[nextIndex];
  if (!next) {
    return "Đã ghi nhận. Bé đã học xong tất cả các chữ. Hãy khen bé thật nhiệt tình trong 1-2 câu và chào tạm biệt. Không hỏi thêm.";
  }
  return `Đã ghi nhận. Khen bé 1 câu ngắn, rồi dạy chữ tiếp theo: ${describeLetter(next)}.`;
}

/** Answer to be_doc_sai while the child still has attempts left on this letter. */
export function retryResultFor(letter: LetterData, wrongCount: number): string {
  return `Đã ghi nhận lần sai thứ ${wrongCount}/${MAX_ATTEMPTS_PER_LETTER}. Vẫn là chữ ${letter.letter}. Khen bé đã cố gắng bằng một câu khác lần trước, đọc mẫu lại thật chậm: ${letterSound(letter)}… ${letter.word.toLowerCase()}, rồi mời bé thử lại.`;
}

/** Answer to the be_doc_sai that uses up the last attempt: the page has already moved on. */
export function skipResultFor(letters: LetterData[], nextIndex: number): string {
  return `Bé đã thử ${MAX_ATTEMPTS_PER_LETTER} lần. Động viên bé 1 câu, không chê bé. ${toolResultFor(letters, nextIndex).replace(/^Đã ghi nhận\. /, "")}`;
}

/** Same instruction as toolResultFor, sent as text when a grown-up taps "next" without the AI. */
export function manualNextMessage(letters: LetterData[], nextIndex: number): string {
  return `(Phụ huynh đã bấm chuyển chữ.) ${toolResultFor(letters, nextIndex).replace(/^Đã ghi nhận\. /, "")}`;
}

/**
 * Does the AI's `chu` argument refer to this letter? Accepts the letter itself (Ơ), its reading
 * (bờ) or its example word, since the model sometimes passes those. Diacritics matter (Ơ is
 * not O), but case, surrounding spaces, a leading "chữ" and quotes do not.
 */
export function matchesLetter(arg: unknown, letter: LetterData): boolean {
  if (typeof arg !== "string") return false;
  const norm = (v: string) =>
    v
      .normalize("NFC")
      .trim()
      .replace(/^chữ\s+/i, "")
      .replace(/["'“”….!]/g, "")
      .trim()
      .toLocaleLowerCase("vi");
  const said = norm(arg);
  const accepted = [letter.letter, letterSound(letter), letter.word].map(norm);
  return accepted.includes(said);
}

/**
 * Every function result the page may send for this lesson. The relay only forwards results from
 * this list, so a tampered client cannot slip its own instructions to the model.
 */
export function allowedToolResults(letters: LetterData[]): Set<string> {
  const allowed = new Set<string>([NO_CURRENT_LETTER_RESULT]);
  for (let i = 0; i <= letters.length; i++) {
    allowed.add(toolResultFor(letters, i));
    if (i > 0) allowed.add(skipResultFor(letters, i));
  }
  for (const letter of letters) {
    allowed.add(stayOnLetterResult(letter));
    for (let n = 1; n < MAX_ATTEMPTS_PER_LETTER; n++) allowed.add(retryResultFor(letter, n));
  }
  return allowed;
}
