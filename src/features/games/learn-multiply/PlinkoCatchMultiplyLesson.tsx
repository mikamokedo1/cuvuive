"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

interface PlinkoCatchMultiplyLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
}

interface FallingOrb {
  body: Matter.Body;
  value: number;
  color: string;
}

interface CatchBurst {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

const ORB_COLORS = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

function playPlinkoSound(type: "peg" | "catch_good" | "catch_wrong") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "peg") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600 + Math.random() * 250, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "catch_good") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    }
  } catch {
    // Ignore audio context restriction
  }
}

export function PlinkoCatchMultiplyLesson({
  multiplier,
  maxProduct,
  onComplete,
}: PlinkoCatchMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const basketXRef = useRef<number>(320);
  const orbsRef = useRef<FallingOrb[]>([]);
  const burstsRef = useRef<CatchBurst[]>([]);
  const spawnCountRef = useRef<number>(0);
  const prevQuestionRef = useRef<string>("");
  const roundResolvedRef = useRef<boolean>(false);

  const [question, setQuestion] = useState(() =>
    generateMultiplyQuestion(multiplier, maxProduct),
  );

  const newQuestion = useCallback(() => {
    const q = generateMultiplyQuestion(multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    roundResolvedRef.current = false;
    setQuestion(q);
    quiz.resetFeedback();
    setTimeout(() => {
      speak(`${q.a} nhân ${q.b} bằng mấy?`);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplier, maxProduct, speak]);

  const quiz = useQuizLogic({
    correctAnswer: question.answer,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, bằng ${question.answer}`,
    requiredWins: 5,
  });

  const handleChoiceRef = useRef(quiz.handleChoice);
  handleChoiceRef.current = quiz.handleChoice;

  useEffect(() => {
    prevQuestionRef.current = question.questionKey;
    const t = setTimeout(() => {
      speak(`${question.a} nhân ${question.b} bằng mấy?`);
    }, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        basketXRef.current = Math.max(65, basketXRef.current - 42);
      } else if (e.key === "ArrowRight") {
        basketXRef.current = Math.min(575, basketXRef.current + 42);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 640;
    const H = 360;
    canvas.width = W;
    canvas.height = H;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.42, scale: 0.001 },
    });

    const leftWall = Matter.Bodies.rectangle(-10, H / 2, 20, H, {
      isStatic: true,
      restitution: 0.8,
    });
    const rightWall = Matter.Bodies.rectangle(W + 10, H / 2, 20, H, {
      isStatic: true,
      restitution: 0.8,
    });

    const pegs: Matter.Body[] = [];
    const rows = 4;
    for (let r = 0; r < rows; r++) {
      const cols = r % 2 === 0 ? 6 : 5;
      const spacingX = 92;
      const startX = (W - (cols - 1) * spacingX) / 2;
      const y = 76 + r * 52;
      for (let c = 0; c < cols; c++) {
        const peg = Matter.Bodies.circle(startX + c * spacingX, y, 8, {
          isStatic: true,
          restitution: 0.78,
          friction: 0.02,
          label: "peg",
        });
        pegs.push(peg);
      }
    }

    Matter.Composite.add(engine.world, [leftWall, rightWall, ...pegs]);

    Matter.Events.on(engine, "collisionStart", (ev) => {
      for (const pair of ev.pairs) {
        if (pair.bodyA.label === "peg" || pair.bodyB.label === "peg") {
          playPlinkoSound("peg");
          break;
        }
      }
    });

    orbsRef.current = [];

    const spawnOrb = () => {
      if (roundResolvedRef.current) return;
      spawnCountRef.current += 1;
      const isCorrect = spawnCountRef.current % 2 === 1 || Math.random() < 0.45;
      let val = question.answer;
      if (!isCorrect) {
        const offsets = [-question.a, question.a, 2, -2, 4, -3];
        const off = offsets[Math.floor(Math.random() * offsets.length)];
        val = Math.max(2, question.answer + off);
        if (val === question.answer) val += 2;
      }

      const spawnX = 110 + Math.random() * (W - 220);
      const body = Matter.Bodies.circle(spawnX, -18, 22, {
        restitution: 0.72,
        friction: 0.02,
        frictionAir: 0.008,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.8,
        y: 0.5,
      });

      const color = ORB_COLORS[spawnCountRef.current % ORB_COLORS.length];
      orbsRef.current.push({ body, value: val, color });
      Matter.Composite.add(engine.world, body);
    };

    spawnOrb();
    const spawnInterval = setInterval(spawnOrb, 1350);

    let animId: number;

    const renderLoop = () => {
      Matter.Engine.update(engine, 1000 / 60);

      const basketX = basketXRef.current;
      const basketY = H - 34;
      const basketW = 118;

      for (let i = orbsRef.current.length - 1; i >= 0; i--) {
        const orb = orbsRef.current[i];
        const { x, y } = orb.body.position;

        if (
          !roundResolvedRef.current &&
          y >= basketY - 24 &&
          y <= basketY + 20 &&
          Math.abs(x - basketX) <= basketW / 2 + 10
        ) {
          Matter.Composite.remove(engine.world, orb.body);
          orbsRef.current.splice(i, 1);

          if (orb.value === question.answer) {
            roundResolvedRef.current = true;
            playPlinkoSound("catch_good");
            burstsRef.current.push({
              x: basketX,
              y: basketY - 28,
              text: `+${orb.value}`,
              color: "#059669",
              alpha: 1,
              vy: -1.2,
            });
            handleChoiceRef.current(orb.value);
          } else {
            playPlinkoSound("catch_wrong");
            burstsRef.current.push({
              x: basketX,
              y: basketY - 25,
              text: `${orb.value} ✗`,
              color: "#dc2626",
              alpha: 1,
              vy: -1.1,
            });
            handleChoiceRef.current(orb.value);
          }
          continue;
        }

        if (y > H + 35) {
          Matter.Composite.remove(engine.world, orb.body);
          orbsRef.current.splice(i, 1);
        }
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "#ecfdf5");
        grad.addColorStop(0.6, "#d1fae5");
        grad.addColorStop(1, "#a7f3d0");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        for (const peg of pegs) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(peg.position.x, peg.position.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = "#d97706";
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "#fef3c7";
          ctx.stroke();
          ctx.restore();
        }

        for (const orb of orbsRef.current) {
          const { x, y } = orb.body.position;
          ctx.save();
          ctx.translate(x, y);

          ctx.fillStyle = "#16a34a";
          ctx.beginPath();
          ctx.ellipse(3, -22, 7, 4, -0.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, 22, 0, Math.PI * 2);
          ctx.fillStyle = orb.color;
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.font = "900 19px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${orb.value}`, 0, 1);

          ctx.restore();
        }

        ctx.save();
        ctx.translate(basketX, basketY);
        const basketGrad = ctx.createLinearGradient(-basketW / 2, -20, basketW / 2, 20);
        basketGrad.addColorStop(0, "#7c3aed");
        basketGrad.addColorStop(1, "#4f46e5");
        ctx.fillStyle = basketGrad;
        ctx.beginPath();
        ctx.roundRect(-basketW / 2, -18, basketW, 38, 16);
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = "#fde047";
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 19px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`🦉 ${question.a} × ${question.b}`, 0, 2);
        ctx.restore();

        for (let i = burstsRef.current.length - 1; i >= 0; i--) {
          const b = burstsRef.current[i];
          b.y += b.vy;
          b.alpha -= 0.022;
          if (b.alpha <= 0) {
            burstsRef.current.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = Math.max(0, b.alpha);
          ctx.fillStyle = b.color;
          ctx.font = "900 22px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(b.text, Math.max(80, Math.min(W - 80, b.x)), b.y);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      clearInterval(spawnInterval);
      cancelAnimationFrame(animId);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [question]);

  const moveBasketToPointer = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const x = (clientX - rect.left) * scaleX;
    basketXRef.current = Math.max(65, Math.min(canvas.width - 65, x));
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
            <OperatorSign symbol="×" speakText="dấu nhân" className="!text-3xl sm:!text-4xl" />
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
                onSpeak={() => speak(`${question.a} nhân ${question.b} bằng mấy?`)}
              />
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-emerald-300 bg-emerald-50">
            <canvas
              ref={canvasRef}
              onMouseMove={(e) => moveBasketToPointer(e.clientX)}
              onClick={(e) => moveBasketToPointer(e.clientX)}
              onTouchStart={(e) => {
                if (e.touches[0]) moveBasketToPointer(e.touches[0].clientX);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) moveBasketToPointer(e.touches[0].clientX);
              }}
              className="w-full h-auto block cursor-ew-resize touch-none"
            />
          </div>
        </div>
      </FeedbackCard>

      {/* Left/Right Arrow Controls */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={() => {
            basketXRef.current = Math.max(65, basketXRef.current - 65);
          }}
          className="flex items-center justify-center py-3 rounded-2xl bg-white hover:bg-emerald-50 active:scale-95 text-emerald-700 font-black border-2 border-emerald-200 shadow-md transition-all cursor-pointer"
          aria-label="Sang trái"
        >
          <ArrowLeft className="w-8 h-8 stroke-[3]" />
        </button>

        <button
          onClick={() => {
            basketXRef.current = Math.min(575, basketXRef.current + 65);
          }}
          className="flex items-center justify-center py-3 rounded-2xl bg-white hover:bg-emerald-50 active:scale-95 text-emerald-700 font-black border-2 border-emerald-200 shadow-md transition-all cursor-pointer"
          aria-label="Sang phải"
        >
          <ArrowRight className="w-8 h-8 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
