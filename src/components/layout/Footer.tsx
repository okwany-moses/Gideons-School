import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SchoolConfig } from '../../types';
import { IMAGES } from '../../services/storage';

interface FooterProps {
  onNavigate: (tab: string) => void;
  config: SchoolConfig;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, config }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1A2E] text-slate-300 border-t border-slate-800 text-sm">
      {/* Top Banner stripe for admissions CTA */}
      <div className="bg-[#0F2744] border-b border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
              Join Our Community
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
              Admissions Open for All Education Levels
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              From early foundational learning in ECD to academic excellence in Junior and Senior Secondary School.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onNavigate('admissions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-semibold rounded-md transition-colors shadow-sm"
            >
              Apply for Admission
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium rounded-md transition-colors"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: School Identity */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img
              src={config.logoUrl || IMAGES.logo}
              alt={`${config.schoolName} Crest Logo`}
              className="w-10 h-10 rounded-full object-cover bg-white p-0.5 shadow-sm border border-amber-400/50"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-xl font-bold text-white font-['Outfit']">
              {config.schoolName}
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            A welcoming, trustworthy, learner-focused Kenyan institution nurturing academic excellence, discipline, creativity, Christian values, and holistic development for day scholars and boarders.
          </p>
          <div className="space-y-1.5 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg">
            <div>
              <span className="font-semibold text-white">Senior Secondary Motto:</span>
              <p className="italic text-amber-200">"{config.seniorSecondaryMotto}"</p>
            </div>
            <div className="pt-1 border-t border-white/10">
              <span className="font-semibold text-white">Nursery & Primary Motto:</span>
              <p className="italic text-amber-200">"{config.primaryMotto}"</p>
            </div>
          </div>
        </div>

        {/* Column 2: Education Levels */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase text-xs">
            Education Levels
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <button
                onClick={() => onNavigate('academics')}
                className="hover:text-amber-400 transition-colors text-left"
              >
                Early Childhood Development (Playgroup, PP1, PP2)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('academics')}
                className="hover:text-amber-400 transition-colors text-left"
              >
                Primary School (Grade 1 to Grade 6 CBC)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('academics')}
                className="hover:text-amber-400 transition-colors text-left"
              >
                Junior Secondary School (Grades 7–9 CBE)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('academics')}
                className="hover:text-amber-400 transition-colors text-left"
              >
                Senior Secondary School (Grades 10–12 CBE)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('academics')}
                className="hover:text-amber-400 transition-colors text-left text-slate-400"
              >
                Legacy 8-4-4 Form Four Transition Advisory
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase text-xs">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                About Us & Values
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                School Services & Co-Curricular
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admissions')} className="hover:text-amber-400 transition-colors">
                Admission Process & Application Form
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('gallery')} className="hover:text-amber-400 transition-colors">
                School Life Gallery
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('news')} className="hover:text-amber-400 transition-colors">
                School News & Announcements
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                Contact & Campus Direction
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors">
                Privacy Policy (Kenya Data Protection Act)
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Official Contacts & Location */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase text-xs">
            School Office & Location
          </h4>
          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 font-medium">{config.physicalAddress}</p>
                <a
                  href={config.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 text-[11px] underline inline-block mt-0.5"
                >
                  Open Google Maps
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <a href="tel:0181910714" className="block text-slate-200 hover:text-amber-400 transition-colors font-medium">
                  Primary: 0181910714
                </a>
                <a href="tel:0181983490" className="block text-slate-400 hover:text-amber-400 transition-colors">
                  Secondary: 0181983490
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <a href="mailto:admissions@gideonskenya.school" className="block text-slate-200 hover:text-amber-400 transition-colors font-medium">
                  admissions@gideonskenya.school
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <p>{config.officeHoursWeekdays}</p>
                <p className="text-slate-400">{config.officeHoursSaturdays}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="border-t border-slate-800 py-6 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {currentYear} {config.schoolName}, Kenya. All rights reserved. Registered Educational Institution.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-white transition-colors underline"
            >
              Privacy Policy & Child Safety
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
