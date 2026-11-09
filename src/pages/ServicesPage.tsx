import React from 'react';
import {
  BookOpen,
  ClipboardCheck,
  HeartHandshake,
  Trophy,
  Sparkles,
  MessageSquare,
  Bus,
  Home,
  Utensils,
  Laptop,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { SchoolConfig } from '../types';
import { IMAGES } from '../services/storage';

interface ServicesPageProps {
  config: SchoolConfig;
  onNavigate: (tab: string, context?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ config, onNavigate }) => {
  const services = [
    {
      id: 'classroom-learning',
      title: 'Classroom Teaching & Academic Instruction',
      category: 'Core Academics',
      description:
        'Small class sizes, active learner participation, modern pedagogical tools, and dedicated teachers committed to individual learner growth.',
      icon: BookOpen,
      available: true,
      image: IMAGES.seniorSchoolFront,
      note: 'Available across all levels: ECD, Primary, JSS, and Senior School.',
    },
    {
      id: 'assessment-reporting',
      title: 'Learner Assessment & Progress Reporting',
      category: 'Core Academics',
      description:
        'Diagnostic and formative competency tracking with structured end-of-term academic reports and individualized parent conferences.',
      icon: ClipboardCheck,
      available: true,
      note: 'Aligned with Kenya National Examinations Council (KNEC) assessment guidelines.',
    },
    {
      id: 'guidance-support',
      title: 'Guidance, Counseling & Pastoral Support',
      category: 'Learner Welfare',
      description:
        'Professional emotional and academic guidance, peer mentoring, life skills instruction, and supportive pastoral counseling.',
      icon: HeartHandshake,
      available: true,
      note: 'Dedicated school counselor and pastoral team on campus.',
    },
    {
      id: 'sports-co-curricular',
      title: 'Sports & Co-Curricular Programmes',
      category: 'Holistic Growth',
      description:
        'Football, track and field athletics, volleyball, swimming basics, cross-country, and traditional indoor games fostering sportsmanship and physical health.',
      icon: Trophy,
      available: true,
      note: 'Weekly supervised sports sessions and inter-school competitions.',
    },
    {
      id: 'talent-development',
      title: 'Talent Development, Music & Drama',
      category: 'Holistic Growth',
      description:
        'Choral singing, instrumental music, drama, public speaking, poetry, Kenya Music Festival participation, and creative art clubs.',
      icon: Sparkles,
      available: true,
      note: 'Annual talent exhibitions and cultural performance showcases.',
    },
    {
      id: 'parent-communication',
      title: 'Parent-Teacher Communication & Portals',
      category: 'Family Partnership',
      description:
        'Timely SMS circulars, direct teacher consultations, school diary communication, and termly parent-teacher academic clinics.',
      icon: MessageSquare,
      available: true,
      note: 'Direct helpline and admissions desk open Monday through Saturday.',
    },
    {
      id: 'transport',
      title: 'School Transport & Bus Service',
      category: 'Logistics',
      description:
        'Safe, well-maintained school buses with trained drivers and route assistants serving designated routes in surrounding residential zones.',
      icon: Bus,
      available: true,
      note: 'Route plans, pickup points, and transport fee schedules available upon enquiry.',
    },
    {
      id: 'dining-nutrition',
      title: 'Balanced Meals & School Dining',
      category: 'Learner Welfare',
      description:
        'Wholesome, hot mid-morning snacks and well-balanced midday lunches prepared under strict hygiene standards by professional kitchen staff.',
      icon: Utensils,
      available: true,
      note: 'Nutritious Kenyan meal plan catering to growing young learners.',
    },
    {
      id: 'digital-learning',
      title: 'Digital Literacy & Computer Studies',
      category: 'Modern Skills',
      description:
        'Hands-on computer literacy, keyboard mastery, safe internet research, basic coding concepts, and educational software applications.',
      icon: Laptop,
      available: true,
      image: IMAGES.computerLab,
      note: 'Fully equipped digital laboratory integrated into the weekly timetable.',
    },
    {
      id: 'boarding-facilities',
      title: 'Boarding Facilities (Selective / Inquire)',
      category: 'Accommodation',
      description:
        'Clean, supervised boarding dormitories for eligible upper grades, subject to verified school board accommodation policies and availability.',
      icon: Home,
      available: true,
      image: IMAGES.girlsDormitory,
      note: 'Parents interested in boarding arrangements must consult the admissions team.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>School Services & Facilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Supportive Services for Every Child
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            From safe transportation and wholesome hot meals to vibrant athletic fields and digital laboratories, our school services create an enriching environment.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
              >
                {service.image && (
                  <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#0F2744]/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      Official Facility
                    </div>
                  </div>
                )}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-lg bg-[#0F2744]/5 flex items-center justify-center text-[#0F2744] group-hover:bg-[#0F2744] group-hover:text-amber-400 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {service.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit'] group-hover:text-[#0F2744] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-2 text-[11px] text-amber-900 bg-amber-50/70 p-2.5 rounded border border-amber-100">
                      <strong>Note:</strong> {service.note}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-4">
                    <button
                      onClick={() =>
                        onNavigate('contact', {
                          subject: `Service Enquiry: ${service.title}`,
                        })
                      }
                      className="w-full py-2 px-3 text-xs font-semibold text-[#0F2744] hover:text-white bg-slate-50 hover:bg-[#0F2744] rounded border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Enquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transport & Safety Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Bus className="w-4 h-4" />
              <span>Transportation & Route Inquiries</span>
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white">
              Planning Your Child's Daily Commute?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We operate supervised bus routes covering key local zones. Please contact our transport coordinator to confirm availability of stops and pickup timings near your residence.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact', { subject: 'School Bus Route Enquiry' })}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold text-xs rounded-md transition-colors whitespace-nowrap"
          >
            Check Bus Routes
          </button>
        </div>
      </section>
    </div>
  );
};
