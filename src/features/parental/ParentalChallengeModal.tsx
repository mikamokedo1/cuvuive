"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { ActionButton } from "@/components/common/ActionButton";
import owlHi from "@/assets/games/common/owl-say-hi.webp";

interface ParentalChallengeModalProps {
  isOpen: boolean;
  onSuccess: () => void;
}

function generateQuestion() {
  const a = Math.floor(Math.random() * 40) + 10; // 10–49
  const b = Math.floor(Math.random() * 40) + 10; // 10–49
  return { a, b, answer: a + b };
}

export function ParentalChallengeModal({ isOpen, onSuccess }: ParentalChallengeModalProps) {
  const [question, setQuestion] = useState(generateQuestion);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const parsed = parseInt(input, 10);
      if (parsed === question.answer) {
        setError(false);
        setInput("");
        onSuccess();
      } else {
        setError(true);
        setInput("");
        // Generate a new question on wrong answer
        setQuestion(generateQuestion());
      }
    },
    [input, question.answer, onSuccess],
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-white/50 animate-scale-in">
        <div className="p-8 flex flex-col items-center bg-white">
          {/* Header */}
          <div className="flex justify-center mb-4">
            <Image src={owlHi} alt="Cú Thông Minh" width={90} height={90} className="drop-shadow-lg object-contain" />
          </div>
          <h2 className="text-2xl text-purple-600 font-display mb-1 drop-shadow-sm text-center">
            ⏰ Nghỉ giải lao nhé!
          </h2>
          <p className="text-gray-500 font-medium text-sm text-center mb-6">
            Bé hãy hỏi ba mẹ trả lời câu hỏi dưới đây để chơi tiếp nha!
          </p>

          {/* Question */}
          <div className="bg-purple-50 rounded-2xl px-6 py-5 mb-6 w-full text-center">
            <p className="text-4xl font-bold text-purple-700 font-display tracking-wide">
              {question.a} + {question.b} = ?
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="number"
              inputMode="numeric"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="Nhập đáp án"
              className={`w-full text-center text-2xl font-bold py-4 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all ${
                error
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100 text-red-700"
                  : "border-gray-200 focus:border-purple-400 focus:ring-purple-100 text-gray-700"
              }`}
              autoFocus
            />

            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl flex items-center justify-center gap-2 font-semibold">
                ❌ Sai rồi, thử lại nhé!
              </div>
            )}

            <ActionButton
              type="submit"
              variant="glossy"
              color="purple"
              className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl mt-1"
              disabled={!input.trim()}
            >
              Xác nhận
            </ActionButton>
          </form>
        </div>
      </div>
    </div>
  );
}
