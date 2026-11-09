import React from 'react';
import {
  Compass,
  Heart,
  Shield,
  Award,
  Users,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SchoolConfig } from '../types';
import { IMAGES } from '../services/storage';

interface AboutPageProps {
  config: SchoolConfig;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onNavigate }) => {
  const coreValues = [
    {
      title: 'Academic Excellence',
      description: 'Cultivating critical thinking, intellectual curiosity, and diligence in all academic disciplines.',
      icon: Award,
    },
    {
      title: 'Integrity & Discipline',
      description: 'Guiding learners to uphold honesty, moral courage, punctuality, and personal accountability.',
      icon: Shield,
    },
    {
      title: 'Compassion & Service',
      description: 'Fostering empathy, kindness, mutual respect, and active care for our community and neighbors.',
      icon: Heart,
    },
    {
      title: 'Creativity & Innovation',
      description: 'Encouraging problem-solving, hands-on discovery, and original artistic and scientific expression.',
      icon: Sparkles,
    },
    {
      title: 'Stewardship & Leadership',
      description: 'Teaching responsibility over talents, resources, and environment to develop servant leaders.',
      icon: Compass,
    },
    {
      title: 'Holistic Development',
      description: 'Harmonizing intellectual, physical, emotional, and social growth through balanced education.',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>About Gideons School</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Nurturing Knowledge, Character and Purpose
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Discover our institutional vision, foundational values, educational philosophy, and commitment to every Kenyan learner under our care.
          </p>
        </div>
      </section>

      {/* Welcome & Institutional Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Our Story & Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              A Welcoming Learning Community Rooted in Kenya
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Gideons School was established with a singular, resolute objective: to deliver high-quality, values-centered education that empowers learners to thrive academically, morally, and socially in a rapidly evolving world.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              From our early childhood classes to our senior secondary cohorts, we have built an environment characterised by warmth, academic rigour, and mutual respect. We honour Kenya’s rich heritage and align closely with the national Competency-Based Education (CBE) standards to ensure our learners are thoroughly prepared for higher education and dynamic career pathways.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Located at <strong>Gideons Children Home Ramba, off Kadongo-Mawego Road in Kabondo Kasipul, Homa Bay County</strong>, our serene campus provides a supportive academic home for day scholars and boarding learners across Kabondo Kasipul, Oyugis, Mawego, Ringa, and neighbouring communities.
            </p>

            <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5">Note on School Archives & Milestones:</strong>
                <span className="text-amber-800">
                  Detailed chronological milestones, founding board documentation, and registration certificates are maintained at the school registry and will be published upon verified school administrative updates.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 aspect-[4/3]">
              <img
                src={IMAGES.seniorSchoolFront}
                alt="Gideon Senior School administration and academic block"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Division-Specific Motto, Mission & Vision (Senior Secondary vs Nursery & Primary) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2">
            <img
              src={config.logoUrl || IMAGES.logo}
              alt={`${config.schoolName} Crest`}
              className="w-12 h-12 rounded-full object-cover bg-white p-1 shadow border border-amber-400"
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Guiding Stars of GIdeons Schools
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Our Motto, Mission & Vision by School Division
          </h2>
          <p className="text-sm text-slate-600">
            Tailored pedagogical guiding principles providing clarity, discipline, and purpose for both our senior secondary scholars and foundational young learners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Senior Secondary Division */}
          <div className="bg-gradient-to-br from-[#0F2744] via-[#143359] to-[#0A1A2E] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="px-3 py-1 bg-amber-400 text-[#0F2744] font-extrabold text-xs rounded-full uppercase tracking-wider">
                  Senior Secondary School
                </span>
                <span className="text-xs text-amber-300 font-medium">Grades 10, 11 & 12</span>
              </div>

              {/* Senior Secondary Motto */}
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-1">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest block">
                  Senior School Motto
                </span>
                <p className="text-lg sm:text-xl font-bold font-['Outfit'] italic text-white">
                  "{config.seniorSecondaryMotto || 'To labour for academic excellence'}"
                </p>
              </div>

              {/* Senior Secondary Mission */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Mission</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed pl-6">
                  {config.seniorSecondaryMission || 'To be a leading center for academic excellence'}
                </p>
              </div>

              {/* Senior Secondary Vision */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Compass className="w-4 h-4" />
                  <span>Vision</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed pl-6">
                  {config.seniorSecondaryVision || 'To create conducive environment for learning and teaching'}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Day Scholars & Boarding Residency</span>
              <button
                onClick={() => onNavigate('academics')}
                className="text-amber-400 hover:text-amber-300 font-semibold underline"
              >
                Explore Senior Pathways →
              </button>
            </div>
          </div>

          {/* Card 2: Nursery (ECD) and Primary School Division */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200/90 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="px-3 py-1 bg-[#0F2744] text-white font-extrabold text-xs rounded-full uppercase tracking-wider">
                  Nursery (ECD) & Primary School
                </span>
                <span className="text-xs text-amber-700 font-bold">Playgroup to Grade 6 (CBC)</span>
              </div>

              {/* Nursery & Primary Motto */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-1">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-widest block">
                  Nursery & Primary Motto
                </span>
                <p className="text-lg sm:text-xl font-bold font-['Outfit'] italic text-slate-900">
                  "{config.primaryMotto || 'Labour for excellence'}"
                </p>
              </div>

              {/* Nursery & Primary Mission */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-[#0F2744] font-bold text-sm">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Mission</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pl-6">
                  {config.primaryMission || 'To help learners be dutyful, God fearing and responsible citizens'}
                </p>
              </div>

              {/* Nursery & Primary Vision */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-[#0F2744] font-bold text-sm">
                  <Compass className="w-4 h-4 text-[#0F2744]" />
                  <span>Vision</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pl-6">
                  {config.primaryVision || 'A center for academic excellence'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Nurturing foundational values & habits</span>
              <button
                onClick={() => onNavigate('academics')}
                className="text-[#0F2744] hover:text-amber-700 font-bold underline"
              >
                Explore Early Years →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100/70 py-14 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-600">
              The ethical compass guiding all interactions, teaching methodologies, and community life at Gideons School.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0F2744]/5 flex items-center justify-center text-[#0F2744]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Philosophy & Approach to Teaching */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 aspect-[4/3]">
              <img
                src={IMAGES.seniorStudents}
                alt="Gideons School senior learners cohort in uniform on campus"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Pedagogy & Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              Our Approach to Teaching and Learning
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We subscribe to a learner-centered educational approach. Rather than relying solely on passive rote memorisation, our educators guide learners through inquiry, collaborative discussions, laboratory experimentation, and practical projects.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Formative & Diagnostic Assessment:</strong> Continuous feedback that tracks mastery of specific competencies rather than high-stress single examinations.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Differentiated Instruction:</strong> Structured remedial support for learners who need extra time, alongside enrichment challenges for high flyers.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Practical Competence:</strong> Integration of hands-on pre-technical skills, digital research, agriculture, and expressive arts.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configurable Christian Values Section */}
      {config.hasChristianValuesFocus && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-800 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Christian Values & Moral Grounding
              </h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {config.christianValuesStatement}
            </p>
            <p className="text-xs text-slate-500">
              Our pastoral care and moral education encourage learners to develop inner discipline, integrity, kindness, and reverence for God while treating all peers with dignity and grace.
            </p>
          </div>
        </section>
      )}

      {/* School Leadership & Staff Structure (Placeholders clearly guided) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Governance & Faculty
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
            School Leadership and Academic Staff
          </h2>
          <p className="text-sm text-slate-600">
            Led by experienced Kenyan educationists dedicated to high standards of child welfare and curriculum delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              role: 'Board of Management',
              summary: 'Oversees institutional policy, strategic governance, physical infrastructure development, and compliance.',
            },
            {
              role: 'Head of School / Principal',
              summary: 'Directs daily pedagogical execution, teacher supervision, school ethos, and community partnerships.',
            },
            {
              role: 'Academic & CBC Coordinators',
              summary: 'Manages curriculum implementation, teacher continuous professional development, and learner assessments.',
            },
            {
              role: 'Departmental Faculty & Pastoral Team',
              summary: 'Qualified educators, guidance counselors, sports coaches, and early childhood specialists.',
            },
          ].map((lead, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0F2744]/10 text-[#0F2744] flex items-center justify-center text-xs font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                {lead.role}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lead.summary}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 italic max-w-xl mx-auto">
          Specific faculty profiles, staff credentials, and biographies will be displayed following official verification by the school administration.
        </div>
      </section>

      {/* Partnership with Parents & Community */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0F2744] text-white rounded-2xl p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Parent Partnership
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
              Working Hand-in-Hand with Families
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              We recognise that parents are the first and most enduring educators of their children. Gideons School maintains active communication through termly academic clinics, interactive parent-teacher conferences, open days, and prompt digital notices.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('admissions')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold rounded-md transition-colors text-xs sm:text-sm"
            >
              Apply for Admission
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md border border-white/20 transition-colors text-xs sm:text-sm"
            >
              Schedule a Campus Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
