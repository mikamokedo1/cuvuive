/**
 * Audio utility functions for PCM encoding/decoding used by voice chat.
 */

/** Convert a Uint8Array of bytes to a base64 string. */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

/** Convert a base64 string to a Uint8Array of bytes. */
export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Downsample Float32 audio from sourceRate to targetRate. */
export function downsample(
  input: Float32Array,
  sourceRate: number,
  targetRate: number,
): Float32Array {
  if (sourceRate === targetRate) return input;
  const ratio = sourceRate / targetRate;
  const outputLength = Math.max(1, Math.round(input.length / ratio));
  const output = new Float32Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(input.length, Math.floor((i + 1) * ratio));
    let sum = 0;
    let count = 0;
    for (let j = start; j < end; j++) {
      sum += input[j];
      count++;
    }
    output[i] = count ? sum / count : input[Math.min(start, input.length - 1)] || 0;
  }
  return output;
}

/**
 * Convert Float32 audio samples to 16-bit PCM base64 string.
 * Optionally downsamples from sourceRate to targetRate (default 16kHz).
 */
export function floatToPcm16Base64(
  samples: Float32Array,
  sourceRate: number,
  targetRate: number = 16000,
): string {
  const resampled = downsample(samples, sourceRate, targetRate);
  const pcm = new Int16Array(resampled.length);
  for (let i = 0; i < resampled.length; i++) {
    const s = Math.max(-1, Math.min(1, resampled[i]));
    pcm[i] = s < 0 ? s * 32768 : s * 32767;
  }
  return bytesToBase64(new Uint8Array(pcm.buffer));
}

/** Estimate RMS level (0–1) from Float32 audio samples. */
export function estimateLevel(samples: Float32Array): number {
  if (!samples.length) return 0;
  let energy = 0;
  for (let i = 0; i < samples.length; i++) {
    energy += samples[i] * samples[i];
  }
  return Math.min(1, Math.sqrt(energy / samples.length) * 8);
}
