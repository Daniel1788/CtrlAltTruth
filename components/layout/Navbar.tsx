'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, Gamepad2, Home, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
}

export default function Navbar({ currentView, setCurrentView }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Acasă', icon: Home },
    { id: 'analyzer', label: 'Laboratorul de Adevăr', icon: ShieldAlert },
    { id: 'swipegame', label: 'Swipe Game', icon: Gamepad2 },
    { id: 'lessons', label: 'Lecții', icon: BookOpen },
    { id: 'documentation', label: 'Documentație', icon: FileText },
  ] as const;

  const handleNav = (id: string) => {
    setCurrentView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#e7edeb]/90 backdrop-blur-md border-b border-[#1a1a1a]/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav('landing')}
        >
          <div className="bg-[#7c1f31] p-2.5 rounded-xl group-hover:scale-105 transition-transform shadow-md">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#1a1a1a]">
            Ctrl+Alt+Truth
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-1 xl:gap-2 bg-white p-1.5 rounded-2xl border border-[#1a1a1a]/10 shadow-sm">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button 
              key={id}
              onClick={() => handleNav(id)}
              className={`px-3 xl:px-4 py-2 min-h-[44px] rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-2 ${currentView === id ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-[#1a1a1a] hover:bg-[#1a1a1a]/10 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#1a1a1a]/10 shadow-lg py-4 px-4 flex flex-col gap-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button 
              key={id}
              onClick={() => handleNav(id)}
              className={`px-4 py-3 min-h-[44px] rounded-xl text-base font-bold transition-all flex items-center gap-3 ${currentView === id ? 'bg-[#7c1f31] text-white shadow-md' : 'text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5 hover:text-[#1a1a1a]'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
