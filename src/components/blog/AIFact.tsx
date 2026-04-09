import { Sparkles, Info } from "lucide-react";
import React from "react";

interface AIFactProps {
  title?: string;
  source?: string;
  children: React.ReactNode;
}

export default function AIFact({ title = "Thông tin nổi bật", source, children }: AIFactProps) {
  return (
    <aside 
      className="my-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm flex flex-col sm:flex-row gap-4 relative overflow-hidden not-prose"
      data-component="ai-citation"
      itemScope 
      itemType="https://schema.org/Quotation"
    >
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent opacity-50 rounded-bl-full pointer-events-none"></div>
      
      <div className="flex-shrink-0">
        <div className="bg-white rounded-2xl p-3 inline-flex items-center justify-center shadow-[0_4px_14px_0_rgba(99,102,241,0.15)] border border-indigo-50 relative z-10 transform -rotate-3">
          <Sparkles className="w-6 h-6 text-indigo-500" />
        </div>
      </div>
      
      <div className="flex-1 relative z-10">
        <div className="font-bold text-indigo-900 mb-2 font-[family-name:var(--font-baloo-2)] text-xl flex items-center gap-2">
          {title}
        </div>
        
        <div className="text-slate-700 text-base leading-relaxed font-medium" itemProp="text">
          {children}
        </div>
        
        {source && (
          <div className="mt-4 text-sm text-slate-500 flex items-center gap-1.5 border-t border-indigo-100 pt-3">
             <Info className="w-4 h-4 text-indigo-400" />
             <cite itemProp="citation" className="not-italic font-semibold text-indigo-900/70">{source}</cite>
          </div>
        )}
      </div>
    </aside>
  );
}
