export function removeVietnameseDiacritics(str: string): string {
  // Replace standard Vietnamese characters with base characters
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

/**
 * Normalizes a string for comparison by removing diacritics,
 * converting to lowercase, and replacing multiple spaces with a single space.
 */
export function normalizeString(str: string): string {
  if (!str) return "";
  const noDiacritics = removeVietnameseDiacritics(str);
  return noDiacritics.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Compute Levenshtein edit distance between two strings.
 * Used to tolerate small speech recognition errors.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // Use a single-row DP approach for memory efficiency
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array(n + 1);

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(prev[j - 1], prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

/**
 * Get the max allowed edit distance based on the length of the expected string.
 * Short words get less tolerance, longer phrases get more.
 */
function getMaxEditDistance(str: string): number {
  const len = str.length;
  if (len <= 2) return 0; // Too short, must be exact (e.g. "gà")
  if (len <= 4) return 1; // Short words: 1 char tolerance (e.g. "mèo" → "meo")
  if (len <= 8) return 2; // Medium: 2 char tolerance (e.g. "con mèo")
  return 3; // Long phrases: 3 char tolerance
}

/**
 * Fuzzy match Vietnamese speech transcript against expected answer.
 * Uses multiple strategies:
 *   1. Exact match (after normalization)
 *   2. Substring containment
 *   3. Levenshtein edit distance (tolerates minor recognition errors)
 *   4. Individual word matching (for single-word recognition in noisy transcripts)
 */
export function fuzzyMatchVietnamese(transcript: string, expected: string): boolean {
  if (!transcript || !expected) return false;

  const normalizedTranscript = normalizeString(transcript);
  const normalizedExpected = normalizeString(expected);

  // 1. Exact match after normalization
  if (normalizedTranscript === normalizedExpected) return true;

  // 2. The transcript might be something like "con con gà" or "là con gà"
  // So we check if the expected phrase is fully contained within the transcript
  if (normalizedTranscript.includes(normalizedExpected)) return true;

  // 3. Levenshtein distance — tolerate small recognition errors
  // e.g. "con meo" vs "con mèo" (after normalization both become "con meo" anyway)
  // More useful for cases like "cong meo" vs "con meo"
  const maxDist = getMaxEditDistance(normalizedExpected);
  if (maxDist > 0 && levenshteinDistance(normalizedTranscript, normalizedExpected) <= maxDist) {
    return true;
  }

  // 4. Individual word matching — for single-word expected answers
  // Speech engine may return "à con mèo" when user says "con mèo"
  // Check if any contiguous subsequence of transcript words matches expected
  const transcriptWords = normalizedTranscript.split(" ");
  const expectedWords = normalizedExpected.split(" ");

  if (expectedWords.length <= transcriptWords.length) {
    for (let i = 0; i <= transcriptWords.length - expectedWords.length; i++) {
      const slice = transcriptWords.slice(i, i + expectedWords.length).join(" ");
      if (slice === normalizedExpected) return true;
      if (maxDist > 0 && levenshteinDistance(slice, normalizedExpected) <= maxDist) return true;
    }
  }

  // 5. For single expected word — check if ANY transcript word is close enough
  if (expectedWords.length === 1) {
    for (const word of transcriptWords) {
      if (word === normalizedExpected) return true;
      if (maxDist > 0 && levenshteinDistance(word, normalizedExpected) <= maxDist) return true;
    }
  }

  return false;
}
