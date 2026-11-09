import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SchoolConfig } from '../../types';
import { IMAGES } from '../../services/storage';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  config: SchoolConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, config }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics' },
    { id: 'services', label: 'Services' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News & Events' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F2744] text-white shadow-md border-b border-white/10 overflow-hidden">
      {/* Translucent Animated School Photo Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15 overflow-hidden">
        <img
          src={IMAGES.seniorSchoolFront}
          alt=""
          className="w-full h-full object-cover animate-kenburns-2 select-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2E]/95 via-[#0F2744]/90 to-[#0F2744]/95" />
      </div>

      <div className="relative z-10">
        {/* Top utility stripe with official contact & season notice */}
        <div className="bg-[#0A1A2E]/80 backdrop-blur-sm text-slate-300 text-xs py-1.5 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span>Kenya · ECD through Secondary (CBE)</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-amber-300 font-medium">{config.currentAdmissionSeason}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Helplines:</span>
              <a href="tel:0181910714" className="hover:text-amber-300 transition-colors font-medium">0181910714</a>
              <span className="text-white/20">|</span>
              <a href="tel:0181983490" className="hover:text-amber-300 transition-colors font-medium">0181983490</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 distinct zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (single line text element with school crest) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left whitespace-nowrap shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
        >
          <img
            src={config.logoUrl || IMAGES.logo}
            alt={`${config.schoolName} Crest Logo`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover bg-white p-0.5 shadow-sm border border-amber-400/60 transition-transform group-hover:scale-105"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Outfit']">
            {config.schoolName}
          </span>
        </button>

        {/* Zone 2: Navigation Links (single line, subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded ${
                  isActive
                    ? 'text-amber-300 font-semibold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Apply for Admission button + mobile toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 rounded-md transition-colors whitespace-nowrap"
          >
            Enquire Now
          </button>
          <button
            onClick={() => handleNavClick('admissions')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F2744] bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm hover:shadow whitespace-nowrap"
          >
            Apply for Admission
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1C30] border-t border-white/10 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-300 font-semibold'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-white/10 rounded-md hover:bg-white/15 transition-colors"
            >
              Enquire Now
            </button>
            <button
              onClick={() => handleNavClick('admissions')}
              className="w-full py-2.5 text-center text-sm font-semibold text-[#0F2744] bg-amber-400 rounded-md hover:bg-amber-300 transition-colors"
            >
              Apply for Admission
            </button>
          </div>
        </div>
      )}
      </div>
    </header>
  );
};
