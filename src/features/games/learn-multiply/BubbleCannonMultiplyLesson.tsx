"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import {
  FeedbackCard,
  NumberBox,
  OperatorSign,
  BlankBox,
  SpeakerButton,
} from "@/features/games/_shared/math";
import { generateSharedMathQuestion, MathOperationType } from "./constants";

interface BubbleCannonMultiplyLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
  operation?: MathOperationType;
}

interface BubbleItem {
  body: Matter.Body;
  value: number;
  color: string;
  radius: number;
  popped?: boolean;
  flashWrong?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const BUBBLE_PALETTE = [
  "#ec4899",
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#06b6d4",
];

function playArcadeSound(type: "shoot" | "hit_correct" | "hit_wrong") {
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

    if (type === "shoot") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "hit_correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(190, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }
  } catch {
    // Ignore audio context restriction
  }
}

function generateBubbleNumbers(
  correctAnswer: number,
  multiplier: number | "mixed",
  maxProduct: number,
  operation: MathOperationType,
): number[] {
  const nums = new Set<number>([correctAnswer]);

  if (operation === "divide") {
    const candidates = [
      correctAnswer + 1,
      correctAnswer - 1,
      correctAnswer + 2,
      correctAnswer - 2,
      correctAnswer + 3,
      correctAnswer + 4,
    ];
    for (const c of candidates) {
      if (nums.size >= 6) break;
      if (c >= 1 && c <= 12 && c !== correctAnswer) {
        nums.add(c);
      }
    }
    while (nums.size < 6) {
      const r = Math.floor(Math.random() * 10) + 1;
      if (r !== correctAnswer) nums.add(r);
    }
    return Array.from(nums).sort(() => Math.random() - 0.5);
  }

  if (operation === "add" || operation === "sub" || operation === "add-sub") {
    const step = maxProduct > 20 ? 10 : 2;
    const candidates = [
      correctAnswer + 1,
      correctAnswer - 1,
      correctAnswer + 2,
      correctAnswer - 2,
      correctAnswer + step,
      correctAnswer - step,
      correctAnswer + 3,
    ];
    for (const c of candidates) {
      if (nums.size >= 6) break;
      if (c >= 1 && c <= Math.max(maxProduct, 10) && c !== correctAnswer) {
        nums.add(c);
      }
    }
    while (nums.size < 6) {
      const r = Math.floor(Math.random() * Math.max(maxProduct, 10)) + 1;
      if (r !== correctAnswer) nums.add(r);
    }
    return Array.from(nums).sort(() => Math.random() - 0.5);
  }

  const mult = multiplier === "mixed" ? 5 : multiplier;

  const candidates = [
    correctAnswer + mult,
    correctAnswer - mult,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer + 5,
    mult * (Math.floor(Math.random() * 9) + 2),
  ];
  for (const c of candidates) {
    if (nums.size >= 6) break;
    if (c > 0 && c <= Math.max(maxProduct, 90) && c !== correctAnswer) {
      nums.add(c);
    }
  }
  while (nums.size < 6) {
    const r = Math.floor(Math.random() * Math.max(maxProduct, 20)) + 2;
    if (r !== correctAnswer) nums.add(r);
  }
  return Array.from(nums).sort(() => Math.random() - 0.5);
}

export function BubbleCannonMultiplyLesson({
  multiplier,
  maxProduct,
  onComplete,
  operation = "multiply",
}: BubbleCannonMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bubblesRef = useRef<BubbleItem[]>([]);
  const bulletRef = useRef<Matter.Body | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const aimAngleRef = useRef<number>(-Math.PI / 2);
  const prevQuestionRef = useRef<string>("");
  const roundResolvedRef = useRef<boolean>(false);

  const [question, setQuestion] = useState(() =>
    generateSharedMathQuestion(operation, multiplier, maxProduct),
  );
  const opSymbol = question.opSymbol;
  const opWord = question.opWord;

  const spawnBubblesForQuestion = useCallback(
    (q: { a: number; b: number; answer: number }) => {
      const engine = engineRef.current;
      if (!engine) return;

      for (const b of bubblesRef.current) {
        Matter.Composite.remove(engine.world, b.body);
      }
      if (bulletRef.current) {
        Matter.Composite.remove(engine.world, bulletRef.current);
        bulletRef.current = null;
      }

      const values = generateBubbleNumbers(q.answer, multiplier, maxProduct, operation);
      const newBubbles: BubbleItem[] = values.map((val, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const x = 135 + col * 185 + (Math.random() - 0.5) * 35;
        const y = 80 + row * 92 + (Math.random() - 0.5) * 18;
        const radius = 36;

        const body = Matter.Bodies.circle(x, y, radius, {
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          inertia: Infinity,
          label: `bubble-${val}`,
        });

        const speed = 1.65;
        const dir = Math.random() * Math.PI * 2;
        Matter.Body.setVelocity(body, {
          x: Math.cos(dir) * speed,
          y: Math.sin(dir) * speed,
        });

        return {
          body,
          value: val,
          color: BUBBLE_PALETTE[idx % BUBBLE_PALETTE.length],
          radius,
        };
      });

      bubblesRef.current = newBubbles;
      Matter.Composite.add(
        engine.world,
        newBubbles.map((b) => b.body),
      );
    },
    [multiplier, maxProduct, operation],
  );

  const newQuestion = useCallback(() => {
    const q = generateSharedMathQuestion(operation, multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    roundResolvedRef.current = false;
    setQuestion(q);
    spawnBubblesForQuestion(q);
    quiz.resetFeedback();
    setTimeout(() => {
      speak(`${q.a} ${q.opWord} ${q.b} bằng mấy?`);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation, multiplier, maxProduct, spawnBubblesForQuestion, speak]);

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
      speak(`${question.a} ${opWord} ${question.b} bằng mấy?`);
    }, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 640;
    const H = 370;
    canvas.width = W;
    canvas.height = H;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });
    engineRef.current = engine;

    const wallOpts = { isStatic: true, restitution: 1, friction: 0 };
    const topWall = Matter.Bodies.rectangle(W / 2, -15, W, 30, wallOpts);
    const leftWall = Matter.Bodies.rectangle(-15, H / 2, 30, H, wallOpts);
    const rightWall = Matter.Bodies.rectangle(W + 15, H / 2, 30, H, wallOpts);
    const bubbleFloor = Matter.Bodies.rectangle(W / 2, 245, W, 16, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      collisionFilter: { category: 0x0002, mask: 0x0001 },
    });

    Matter.Composite.add(engine.world, [topWall, leftWall, rightWall, bubbleFloor]);

    spawnBubblesForQuestion(question);

    let animId: number;

    const renderLoop = () => {
      Matter.Engine.update(engine, 1000 / 60);

      for (const b of bubblesRef.current) {
        if (b.popped) continue;
        const v = b.body.velocity;
        const speed = Math.hypot(v.x, v.y);
        const targetSpeed = 1.75;
        if (speed > 0.05 && Math.abs(speed - targetSpeed) > 0.2) {
          Matter.Body.setVelocity(b.body, {
            x: (v.x / speed) * targetSpeed,
            y: (v.y / speed) * targetSpeed,
          });
        }
        if (b.body.position.y > 215 && v.y > 0) {
          Matter.Body.setVelocity(b.body, { x: v.x, y: -Math.abs(v.y) });
        }
        if (b.flashWrong && b.flashWrong > 0) {
          b.flashWrong -= 1;
        }
      }

      const bullet = bulletRef.current;
      if (bullet) {
        if (
          bullet.position.y < -20 ||
          bullet.position.y > H + 20 ||
          bullet.position.x < -20 ||
          bullet.position.x > W + 20
        ) {
          Matter.Composite.remove(engine.world, bullet);
          bulletRef.current = null;
        } else {
          for (const b of bubblesRef.current) {
            if (b.popped) continue;
            const dist = Math.hypot(
              bullet.position.x - b.body.position.x,
              bullet.position.y - b.body.position.y,
            );
            if (dist <= b.radius + 14) {
              Matter.Composite.remove(engine.world, bullet);
              bulletRef.current = null;

              if (b.value === question.answer && !roundResolvedRef.current) {
                roundResolvedRef.current = true;
                b.popped = true;
                Matter.Composite.remove(engine.world, b.body);
                playArcadeSound("hit_correct");

                for (let i = 0; i < 28; i++) {
                  const ang = (Math.PI * 2 * i) / 28 + Math.random() * 0.2;
                  const spd = 2 + Math.random() * 5.5;
                  particlesRef.current.push({
                    x: b.body.position.x,
                    y: b.body.position.y,
                    vx: Math.cos(ang) * spd,
                    vy: Math.sin(ang) * spd,
                    radius: 4 + Math.random() * 5,
                    color: i % 2 === 0 ? b.color : "#fde047",
                    alpha: 1,
                  });
                }

                handleChoiceRef.current(b.value);
              } else if (b.value !== question.answer) {
                playArcadeSound("hit_wrong");
                b.flashWrong = 18;
                handleChoiceRef.current(b.value);
              }
              break;
            }
          }
        }
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "#1e1b4b");
        grad.addColorStop(0.65, "#312e81");
        grad.addColorStop(1, "#4338ca");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255,255,255,0.22)";
        for (let i = 0; i < 16; i++) {
          const sx = ((i * 97) % (W - 20)) + 10;
          const sy = ((i * 53) % 210) + 15;
          ctx.beginPath();
          ctx.arc(sx, sy, (i % 2) + 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        const cannonX = W / 2;
        const cannonY = H - 36;
        const aimAngle = aimAngleRef.current;

        ctx.save();
        ctx.strokeStyle = "rgba(253, 224, 71, 0.65)";
        ctx.lineWidth = 3;
        ctx.setLineDash([7, 9]);
        ctx.beginPath();
        ctx.moveTo(cannonX, cannonY);
        ctx.lineTo(cannonX + Math.cos(aimAngle) * 210, cannonY + Math.sin(aimAngle) * 210);
        ctx.stroke();
        ctx.restore();

        for (const b of bubblesRef.current) {
          if (b.popped) continue;
          const { x, y } = b.body.position;
          ctx.save();
          ctx.translate(x, y);

          ctx.beginPath();
          ctx.arc(0, 0, b.radius + 4, 0, Math.PI * 2);
          ctx.fillStyle = b.flashWrong ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.18)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = b.flashWrong ? "#ef4444" : b.color;
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(-b.radius * 0.32, -b.radius * 0.32, b.radius * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.45)";
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.font = "900 24px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${b.value}`, 0, 2);

          ctx.restore();
        }

        if (bulletRef.current) {
          const bp = bulletRef.current.position;
          ctx.save();
          ctx.beginPath();
          ctx.arc(bp.x, bp.y, 13, 0, Math.PI * 2);
          ctx.fillStyle = "#fde047";
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();
          ctx.restore();
        }

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12;
          p.alpha -= 0.024;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.save();
        ctx.translate(cannonX, cannonY);
        ctx.rotate(aimAngle + Math.PI / 2);
        const barrelGrad = ctx.createLinearGradient(-18, -50, 18, 0);
        barrelGrad.addColorStop(0, "#f59e0b");
        barrelGrad.addColorStop(1, "#d97706");
        ctx.fillStyle = barrelGrad;
        ctx.beginPath();
        ctx.roundRect(-16, -50, 32, 50, 10);
        ctx.fill();
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.arc(cannonX, cannonY + 6, 26, Math.PI, 0);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fef08a";
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [question, spawnBubblesForQuestion]);

  const updateAimFromPointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const cannonX = canvas.width / 2;
    const cannonY = canvas.height - 36;
    let angle = Math.atan2(y - cannonY, x - cannonX);
    angle = Math.max(-Math.PI + 0.22, Math.min(-0.22, angle));
    aimAngleRef.current = angle;
  };

  const fireCannon = (clientX?: number, clientY?: number) => {
    if (roundResolvedRef.current || !engineRef.current || !canvasRef.current) return;
    if (clientX !== undefined && clientY !== undefined) {
      updateAimFromPointer(clientX, clientY);
    }

    if (bulletRef.current) {
      Matter.Composite.remove(engineRef.current.world, bulletRef.current);
      bulletRef.current = null;
    }

    const cannonX = canvasRef.current.width / 2;
    const cannonY = canvasRef.current.height - 36;
    const angle = aimAngleRef.current;
    const speed = 11.5;

    const bullet = Matter.Bodies.circle(
      cannonX + Math.cos(angle) * 44,
      cannonY + Math.sin(angle) * 44,
      12,
      {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        collisionFilter: { category: 0x0004, mask: 0x0001 },
      },
    );

    Matter.Body.setVelocity(bullet, {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    });

    bulletRef.current = bullet;
    Matter.Composite.add(engineRef.current.world, bullet);
    playArcadeSound("shoot");
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

          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-indigo-300 bg-indigo-950">
            <canvas
              ref={canvasRef}
              onMouseMove={(e) => updateAimFromPointer(e.clientX, e.clientY)}
              onClick={(e) => fireCannon(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  updateAimFromPointer(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) {
                  updateAimFromPointer(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchEnd={(e) => {
                const t = e.changedTouches[0];
                if (t) fireCannon(t.clientX, t.clientY);
                else fireCannon();
              }}
              className="w-full h-auto block cursor-crosshair touch-none"
            />
          </div>
        </div>
      </FeedbackCard>
    </div>
  );
}
