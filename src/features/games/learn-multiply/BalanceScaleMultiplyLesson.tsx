"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import {
  FeedbackCard,
  NumberBox,
  OperatorSign,
  BlankBox,
  SpeakerButton,
} from "@/features/games/_shared/math";
import { generateMultiplyQuestion } from "./constants";

interface BalanceScaleMultiplyLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
  operation?: "multiply" | "divide";
}

function generateMathScaleQuestion(
  operation: "multiply" | "divide",
  multiplier: number | "mixed",
  maxProduct: number,
  prevQuestion?: string,
): { a: number; b: number; answer: number; questionKey: string } {
  const q = generateMultiplyQuestion(multiplier, maxProduct, prevQuestion);
  if (operation === "divide") {
    // q.a is table (2..9), q.b is quotient (1..10), q.answer is dividend (a * b)
    return {
      a: q.answer,
      b: q.a,
      answer: q.b,
      questionKey: `div-${q.questionKey}`,
    };
  }
  return q;
}

interface DroppedBlock {
  id: number;
  value: number;
  color: string;
  dropOffsetY: number;
  dropVelY: number;
  screenX: number;
  screenY: number;
}

const BLOCK_COLORS: Record<number, string> = {
  1: "#f59e0b",
  2: "#10b981",
  3: "#3b82f6",
  4: "#8b5cf6",
  5: "#ec4899",
  6: "#06b6d4",
  7: "#f97316",
  8: "#6366f1",
  9: "#14b8a6",
  10: "#ef4444",
};

function playTone(freq: number, duration = 0.12, type: OscillatorType = "sine") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio context restriction
  }
}

export function BalanceScaleMultiplyLesson({
  multiplier,
  maxProduct,
  onComplete,
  operation = "multiply",
}: BalanceScaleMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blocksRef = useRef<DroppedBlock[]>([]);
  const beamAngleRef = useRef<number>(-0.28);
  const beamVelRef = useRef<number>(0);
  const prevQuestionRef = useRef<string>("");

  const isDivide = operation === "divide";
  const opSymbol = isDivide ? "÷" : "×";
  const opWord = isDivide ? "chia" : "nhân";

  const [question, setQuestion] = useState(() =>
    generateMathScaleQuestion(operation, multiplier, maxProduct),
  );
  const [droppedValues, setDroppedValues] = useState<number[]>([]);

  const currentSum = droppedValues.reduce((acc, v) => acc + v, 0);

  const newQuestion = useCallback(() => {
    const q = generateMathScaleQuestion(operation, multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setDroppedValues([]);
    blocksRef.current = [];
    beamVelRef.current = -0.04;
    quiz.resetFeedback();

    setTimeout(() => {
      speak(`${q.a} ${opWord} ${q.b} bằng mấy?`);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation, multiplier, maxProduct, opWord]);

  const quiz = useQuizLogic({
    correctAnswer: question.answer,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, bằng ${question.answer}`,
    wrongMessage: "Nặng quá rồi, chạm vào quả cân trên đĩa để bỏ ra nhé",
    requiredWins: 5,
  });

  // Available weight options for the current question
  const weightOptions = React.useMemo(() => {
    const opts = new Set<number>();
    if (isDivide) {
      opts.add(1);
      opts.add(2);
      opts.add(3);
      opts.add(5);
    } else {
      opts.add(question.a);
      opts.add(question.b);
      if (question.answer >= 10) opts.add(10);
      opts.add(1);
      if (opts.size < 4) {
        opts.add(2);
        opts.add(5);
      }
    }
    return Array.from(opts).slice(0, 4).sort((x, y) => x - y);
  }, [question, isDivide]);

  useEffect(() => {
    prevQuestionRef.current = question.questionKey;
    const t = setTimeout(() => {
      speak(`${question.a} ${opWord} ${question.b} bằng mấy?`);
    }, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delegate win / over-weight state to shared useQuizLogic
  useEffect(() => {
    if (quiz.feedback === "correct") return;

    if (currentSum === question.answer && droppedValues.length > 0) {
      playTone(587.33, 0.15, "triangle");
      setTimeout(() => playTone(880, 0.25, "triangle"), 130);
      quiz.handleChoice(question.answer);
    } else if (currentSum > question.answer) {
      playTone(220, 0.2, "sawtooth");
      quiz.handleChoice(currentSum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSum, question.answer, droppedValues.length]);

  // Spring-physics scale + locked pan stacking renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 640;
    const H = 290;
    canvas.width = W;
    canvas.height = H;

    let animId: number;

    const renderLoop = () => {
      const sumRight = blocksRef.current.reduce((s, b) => s + b.value, 0);
      const weightLeft = question.answer;
      const diff = sumRight - weightLeft;
      const maxTilt = 0.32;
      const targetAngle = Math.max(
        -maxTilt,
        Math.min(maxTilt, (diff / Math.max(weightLeft, 6)) * 0.42),
      );

      const stiffness = 0.085;
      const damping = 0.84;
      const force = (targetAngle - beamAngleRef.current) * stiffness;
      beamVelRef.current = (beamVelRef.current + force) * damping;
      beamAngleRef.current += beamVelRef.current;

      const pivotX = W / 2;
      const pivotY = 128;
      const armLen = 155;
      const angle = beamAngleRef.current;

      const leftTipX = pivotX - Math.cos(angle) * armLen;
      const leftTipY = pivotY - Math.sin(angle) * armLen;
      const rightTipX = pivotX + Math.cos(angle) * armLen;
      const rightTipY = pivotY + Math.sin(angle) * armLen;

      const leftPanY = leftTipY + 58;
      const rightPanY = rightTipY + 58;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, W, H);

        // Sky / laboratory gradient background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
        bgGrad.addColorStop(0, "#f0f9ff");
        bgGrad.addColorStop(1, "#e0f2fe");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Table surface at bottom
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(0, H - 28, W, 28);
        ctx.fillStyle = "#94a3b8";
        ctx.fillRect(0, H - 28, W, 4);

        // Central pillar & base
        ctx.fillStyle = "#475569";
        ctx.beginPath();
        ctx.roundRect(pivotX - 55, H - 44, 110, 18, 9);
        ctx.fill();

        const pillarGrad = ctx.createLinearGradient(pivotX - 14, pivotY, pivotX + 14, H - 40);
        pillarGrad.addColorStop(0, "#64748b");
        pillarGrad.addColorStop(1, "#334155");
        ctx.fillStyle = pillarGrad;
        ctx.beginPath();
        ctx.roundRect(pivotX - 12, pivotY, 24, H - 40 - pivotY, 8);
        ctx.fill();

        // Strings holding left and right pans
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(leftTipX, leftTipY);
        ctx.lineTo(leftTipX - 58, leftPanY);
        ctx.moveTo(leftTipX, leftTipY);
        ctx.lineTo(leftTipX + 58, leftPanY);
        ctx.moveTo(rightTipX, rightTipY);
        ctx.lineTo(rightTipX - 65, rightPanY);
        ctx.moveTo(rightTipX, rightTipY);
        ctx.lineTo(rightTipX + 65, rightPanY);
        ctx.stroke();

        // Balance beam bar
        ctx.save();
        ctx.translate(pivotX, pivotY);
        ctx.rotate(angle);
        const isBal = sumRight === weightLeft;
        ctx.fillStyle = isBal ? "#10b981" : "#7c3aed";
        ctx.beginPath();
        ctx.roundRect(-armLen - 10, -8, (armLen + 10) * 2, 16, 8);
        ctx.fill();
        ctx.restore();

        // Pivot dial
        ctx.fillStyle = sumRight === weightLeft ? "#10b981" : "#f59e0b";
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Left Pan + Question Crate
        ctx.fillStyle = "#475569";
        ctx.beginPath();
        ctx.roundRect(leftTipX - 68, leftPanY - 6, 136, 12, 6);
        ctx.fill();

        const qBoxW = 112;
        const qBoxH = 62;
        const qBoxX = leftTipX - qBoxW / 2;
        const qBoxY = leftPanY - 6 - qBoxH;

        const qGrad = ctx.createLinearGradient(qBoxX, qBoxY, qBoxX, qBoxY + qBoxH);
        qGrad.addColorStop(0, "#8b5cf6");
        qGrad.addColorStop(1, "#6d28d9");
        ctx.fillStyle = qGrad;
        ctx.beginPath();
        ctx.roundRect(qBoxX, qBoxY, qBoxW, qBoxH, 14);
        ctx.fill();
        ctx.strokeStyle = "#ddd6fe";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 25px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${question.a} ${opSymbol} ${question.b}`, leftTipX, qBoxY + qBoxH / 2);

        // Right Pan tray
        ctx.fillStyle =
          sumRight === weightLeft ? "#059669" : sumRight > weightLeft ? "#dc2626" : "#475569";
        ctx.beginPath();
        ctx.roundRect(rightTipX - 75, rightPanY - 6, 150, 12, 6);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(rightTipX - 75, rightPanY - 26, 8, 24, 4);
        ctx.roundRect(rightTipX + 67, rightPanY - 26, 8, 24, 4);
        ctx.fill();

        // Right Pan total number badge
        ctx.fillStyle =
          sumRight === weightLeft ? "#10b981" : sumRight > weightLeft ? "#ef4444" : "#334155";
        ctx.font = "900 23px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${sumRight}`, rightTipX, rightPanY + 26);

        // Draw blocks locked onto the Right Pan in a neat 3-column stack
        const totalBlocks = blocksRef.current.length;
        const isCompactBlock = totalBlocks > 6;
        const bW = isCompactBlock ? 38 : 44;
        const bH = isCompactBlock ? 30 : 38;
        const gapX = 4;
        const gapY = 3;

        blocksRef.current.forEach((blk, idx) => {
          if (blk.dropOffsetY < 0 || Math.abs(blk.dropVelY) > 0.1) {
            blk.dropVelY += 1.5;
            blk.dropOffsetY += blk.dropVelY;
            if (blk.dropOffsetY >= 0) {
              blk.dropOffsetY = 0;
              if (Math.abs(blk.dropVelY) > 2.2) {
                blk.dropVelY = -blk.dropVelY * 0.28;
              } else {
                blk.dropVelY = 0;
              }
            }
          }

          const row = Math.floor(idx / 3);
          const col = idx % 3;
          const itemsInThisRow = Math.min(3, totalBlocks - row * 3);
          const rowWidth = itemsInThisRow * bW + (itemsInThisRow - 1) * gapX;
          const startX = rightTipX - rowWidth / 2 + bW / 2;

          const x = startX + col * (bW + gapX);
          const y = rightPanY - 6 - bH / 2 - row * (bH + gapY) + blk.dropOffsetY;

          blk.screenX = x;
          blk.screenY = y;

          ctx.save();
          ctx.translate(x, y);

          ctx.fillStyle = blk.color;
          ctx.beginPath();
          ctx.roundRect(-bW / 2, -bH / 2, bW, bH, 8);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.font = isCompactBlock
            ? "900 15px system-ui, sans-serif"
            : "900 18px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`+${blk.value}`, 0, 1);
          ctx.restore();
        });
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [question, opSymbol]);

  const handleDropBlock = (val: number) => {
    if (quiz.feedback === "correct") return;

    playTone(320 + val * 30, 0.1, "sine");

    const newBlk: DroppedBlock = {
      id: Date.now() + Math.random(),
      value: val,
      color: BLOCK_COLORS[val] || "#6366f1",
      dropOffsetY: -100,
      dropVelY: 2,
      screenX: 475,
      screenY: 165,
    };

    blocksRef.current.push(newBlk);
    beamVelRef.current += 0.04;
    setDroppedValues((prev) => [...prev, val]);
  };

  const handleCanvasTap = (clientX: number, clientY: number) => {
    if (quiz.feedback === "correct" || blocksRef.current.length === 0 || !canvasRef.current) {
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const cx = (clientX - rect.left) * scaleX;
    const cy = (clientY - rect.top) * scaleY;

    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = blocksRef.current.length - 1; i >= 0; i--) {
      const blk = blocksRef.current[i];
      const dist = Math.hypot(cx - blk.screenX, cy - blk.screenY);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }

    if (bestIdx !== -1 && bestDist <= 55) {
      blocksRef.current.splice(bestIdx, 1);
      playTone(250, 0.08, "sine");
      beamVelRef.current -= 0.03;
      setDroppedValues(blocksRef.current.map((b) => b.value));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-2xl px-3 select-none">
      {/* Shared FeedbackCard + Shared NumberBox / OperatorSign / BlankBox / SpeakerButton */}
      <FeedbackCard feedback={quiz.feedback} className="!p-3 sm:!p-5">
        <div className="flex flex-col items-center gap-2.5 sm:gap-3">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <NumberBox
              value={question.a}
              gradient="purple"
              speakText={`${question.a}`}
              className="!w-12 !h-12 sm:!w-16 sm:!h-16 !rounded-xl [&_span]:!text-2xl sm:[&_span]:!text-3xl"
            />
            <OperatorSign
              symbol={opSymbol}
              speakText={`dấu ${opWord}`}
              className="!text-3xl sm:!text-4xl"
            />
            <NumberBox
              value={question.b}
              gradient="blue"
              speakText={`${question.b}`}
              className="!w-12 !h-12 sm:!w-16 sm:!h-16 !rounded-xl [&_span]:!text-2xl sm:[&_span]:!text-3xl"
            />
            <OperatorSign symbol="=" speakText="dấu bằng" className="!text-3xl sm:!text-4xl" />
            <BlankBox
              answered={quiz.feedback === "correct"}
              answerValue={question.answer}
              className="!w-14 !h-12 sm:!w-18 sm:!h-16 !rounded-xl [&_span]:!text-2xl sm:[&_span]:!text-3xl"
            />
            <div className="ml-1">
              <SpeakerButton
                onSpeak={() => speak(`${question.a} ${opWord} ${question.b} bằng mấy?`)}
              />
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-sky-200 bg-sky-50">
            <canvas
              ref={canvasRef}
              onClick={(e) => handleCanvasTap(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  e.preventDefault();
                  handleCanvasTap(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              className={`w-full h-auto block touch-none ${
                droppedValues.length > 0 && quiz.feedback !== "correct" ? "cursor-pointer" : ""
              }`}
            />
          </div>
        </div>
      </FeedbackCard>

      {/* Weight Block Buttons */}
      <div
        className={`grid ${
          weightOptions.length === 3 ? "grid-cols-3" : "grid-cols-4"
        } gap-2.5 sm:gap-4 w-full max-w-lg`}
      >
        {weightOptions.map((val) => (
          <button
            key={val}
            onClick={() => handleDropBlock(val)}
            disabled={quiz.feedback === "correct"}
            style={{ backgroundColor: BLOCK_COLORS[val] || "#6366f1" }}
            className="flex items-center justify-center py-3 sm:py-3.5 rounded-2xl text-white font-black shadow-lg border-b-4 border-black/20 hover:-translate-y-1 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <span className="text-2xl sm:text-3xl">+{val}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
