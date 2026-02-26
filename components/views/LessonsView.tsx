'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, X } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface LessonsViewProps {
  lessons: any[];
  activeLesson: number | null;
  setActiveLesson: (id: number | null) => void;
}

export default function LessonsView({ lessons, activeLesson, setActiveLesson }: LessonsViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 py-10"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a]">Academia Ctrl+Alt+Truth</h2>
        <p className="text-xl text-[#7c1f31] font-medium">Cum să detectezi falsurile și manipularea</p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        {lessons.map((lesson) => {
          const Icon = lesson.icon;
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson.id)}
              className="bg-white p-8 rounded-3xl border border-[#1a1a1a]/10 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left flex flex-col items-start"
            >
              <div className="bg-[#7c1f31]/10 p-4 rounded-2xl inline-block mb-6">
                <Icon className="w-8 h-8 text-[#7c1f31]" />
              </div>
              <span className="text-sm font-bold text-[#7c1f31] mb-2 uppercase tracking-wider">{lesson.level}</span>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{lesson.title}</h3>
              <div className="text-[#1a1a1a]/80 leading-relaxed text-lg line-clamp-3">
                {lesson.content}
              </div>
              <div className="mt-6 text-[#7c1f31] font-semibold flex items-center gap-2">
                Citește lecția <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Notion-style Modal */}
      {activeLesson !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm"
            onClick={() => setActiveLesson(null)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-3xl max-h-[80vh] bg-[#e7edeb] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]/10 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-[#7c1f31]/10 p-2 rounded-xl">
                  {React.createElement(lessons.find(l => l.id === activeLesson)?.icon || BookOpen, { className: "w-6 h-6 text-[#7c1f31]" })}
                </div>
                <span className="font-bold text-[#7c1f31] uppercase tracking-wider text-sm">
                  {lessons.find(l => l.id === activeLesson)?.level}
                </span>
              </div>
              <button 
                onClick={() => setActiveLesson(null)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#1a1a1a]/10 transition-colors text-[#1a1a1a]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 sm:p-12 overflow-y-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] mb-8 leading-tight">
                {lessons.find(l => l.id === activeLesson)?.title}
              </h2>
              <div className="prose prose-lg prose-stone max-w-none text-[#1a1a1a]/80 leading-relaxed font-serif">
                {lessons.find(l => l.id === activeLesson)?.content}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}


