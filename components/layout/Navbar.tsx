'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, Gamepad2, Home } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-[#e7edeb]/80 backdrop-blur-md border-b border-[#1a1a1a]/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentView('landing')}
        >
          <div className="bg-[#7c1f31] p-2.5 rounded-xl group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#1a1a1a]">
            Ctrl+Alt+Truth
          </h1>
        </div>
        
        <div className="flex gap-1 md:gap-2 bg-white p-1.5 rounded-2xl border border-[#1a1a1a]/10 shadow-sm">
          <button 
            onClick={() => setCurrentView('landing')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${currentView === 'landing' ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
          >
            <Home className="w-4 h-4 hidden md:block" />
            <span className="hidden md:inline">Acasă</span>
          </button>
          <button 
            onClick={() => setCurrentView('analyzer')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${currentView === 'analyzer' ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
          >
            <ShieldAlert className="w-4 h-4 hidden md:block" />
            Laboratorul de Adevăr
          </button>
          <button 
            onClick={() => setCurrentView('swipegame')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${currentView === 'swipegame' ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
          >
            <Gamepad2 className="w-4 h-4 hidden md:block" />
            <span className="hidden md:inline">Swipe</span> Game
          </button>
          <button 
            onClick={() => setCurrentView('lessons')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${currentView === 'lessons' ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
          >
            <BookOpen className="w-4 h-4 hidden md:block" />
            Lecții
          </button>
          <button 
            onClick={() => setCurrentView('documentation')}
            className={`px-4 py-2 min-h-[44px] rounded-xl text-sm md:text-base font-bold transition-all flex items-center gap-2 ${currentView === 'lessons' ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
          >
            <BookOpen className="w-4 h-4 hidden md:block" />
            Documentatie
          </button>
        </div>
      </div>
    </nav>
  );
}
