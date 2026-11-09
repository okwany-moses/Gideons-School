import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { SchoolConfig, EducationLevelId } from '../types';
import { IMAGES } from '../services/storage';

interface AcademicsPageProps {
  config: SchoolConfig;
  onNavigate: (tab: string, context?: any) => void;
  initialLevel?: EducationLevelId;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({
  config,
  onNavigate,
  initialLevel = 'ecd',
}) => {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevelId>(initialLevel);

  useEffect(() => {
    if (initialLevel) {
      setSelectedLevel(initialLevel);
    }
  }, [initialLevel]);

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Academic Curriculum & Levels</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Nurturing Inquiring Minds at Every Stage
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            From foundational early childhood discovery through primary competencies and specialized secondary pathways under Kenya’s Competency-Based Education (CBE).
          </p>
        </div>
      </section>

      {/* Level Selector Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-1.5 bg-slate-200/80 rounded-xl flex flex-wrap gap-1.5">
          {[
            { id: 'ecd', label: 'Early Childhood (ECD)', sub: 'Playgroup – PP2' },
            { id: 'primary', label: 'Primary School', sub: 'Grades 1 – 6' },
            { id: 'junior-secondary', label: 'Junior Secondary', sub: 'Grades 7 – 9 (CBE)' },
            { id: 'senior-secondary', label: 'Senior Secondary', sub: 'Grades 10 – 12 (CBE)' },
          ].map((tab) => {
            const active = selectedLevel === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as EducationLevelId)}
                className={`flex-1 min-w-[200px] text-left px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <div className="text-xs font-bold font-['Outfit'] flex items-center justify-between">
                  <span>{tab.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{tab.sub}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Details for Selected Level */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {selectedLevel === 'ecd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Foundational Stage · Ages 3–5
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] mt-1">
                  Early Childhood Development (ECD)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Playgroup, Pre-Primary 1 (PP1), and Pre-Primary 2 (PP2)
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                The Early Years at Gideons School are dedicated to igniting the natural curiosity of young learners in a loving, secure, and playful environment. We lay a robust foundation for phonics, language expression, early mathematical concepts, and emotional regulation.
              </p>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  Core Developmental Areas:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Language & Communication',
                      desc: 'Storytelling, vocabulary expansion, sound recognition, phonics and pre-writing activities.',
                    },
                    {
                      title: 'Mathematical Activities',
                      desc: 'Counting, sorting, identifying shapes, recognizing numbers and spatial relationships.',
                    },
                    {
                      title: 'Psychomotor & Creative Arts',
                      desc: 'Coloring, modeling with clay/playdough, running, balancing and coordination games.',
                    },
                    {
                      title: 'Environmental & Social Skills',
                      desc: 'Health, hygiene habits, sharing, emotional empathy and school readiness.',
                    },
                  ].map((area, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{area.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  ECD Admissions & Transition
                </h4>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Admissions to Playgroup and PP1 are open year-round based on class capacity. Children must be toilet-trained for PP1. We facilitate a gentle settling-in orientation to ensure children love coming to school.
                </p>
                <button
                  onClick={() => onNavigate('admissions', { level: 'ecd' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2744] hover:text-amber-800"
                >
                  <span>Apply for ECD Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-slate-100 border border-slate-200">
                <img
                  src={IMAGES.primaryStudents}
                  alt="Young learners gathered on the school lawn in uniform"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  ECD Day Schedule & Routine
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex justify-between py-1 border-b border-slate-100">
                    <span>Morning Arrival & Circle Time</span>
                    <span className="font-semibold text-slate-800">7:45 AM – 8:30 AM</span>
                  </li>
                  <li className="flex justify-between py-1 border-b border-slate-100">
                    <span>Guided Learning & Phonics</span>
                    <span className="font-semibold text-slate-800">8:30 AM – 10:00 AM</span>
                  </li>
                  <li className="flex justify-between py-1 border-b border-slate-100">
                    <span>Healthy Snack & Supervised Outdoor Play</span>
                    <span className="font-semibold text-slate-800">10:00 AM – 10:45 AM</span>
                  </li>
                  <li className="flex justify-between py-1 border-b border-slate-100">
                    <span>Maths & Creative Arts</span>
                    <span className="font-semibold text-slate-800">10:45 AM – 12:15 PM</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>Lunch, Rest & Story Hour</span>
                    <span className="font-semibold text-slate-800">12:15 PM – 2:30 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedLevel === 'primary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Primary Stage · Ages 6–11
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] mt-1">
                  Primary School Education (Grades 1–6)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aligned with the Kenyan Competency-Based Curriculum (CBC)
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Primary education at GIdeons Schools equips children with robust foundational literacy, mathematical reasoning, scientific curiosity, and ethical values. Available for both day scholars and boarders, we emphasize active inquiry, digital awareness, and practical learning areas that help every pupil discover their unique talents.
              </p>

              {/* Nursery & Primary Division Motto Card */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 text-[11px] uppercase tracking-wide">
                    Nursery & Primary Motto:
                  </span>
                  <span className="text-[10px] text-amber-700 font-semibold">Day Scholars & Boarders</span>
                </div>
                <p className="text-sm font-bold font-['Outfit'] italic text-slate-900">
                  "{config.primaryMotto}"
                </p>
                <div className="text-[11px] text-slate-700 pt-0.5">
                  <strong>Mission:</strong> {config.primaryMission}
                </div>
                <div className="text-[11px] text-slate-700">
                  <strong>Vision:</strong> {config.primaryVision}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  CBC Learning Areas Covered:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Languages & Literacy',
                      desc: 'English Language, Kiswahili Language, and Indigenous Language activities.',
                    },
                    {
                      name: 'Mathematics',
                      desc: 'Numeracy, measurements, geometry, data handling, and logical problem-solving.',
                    },
                    {
                      name: 'Science & Technology',
                      desc: 'Observation, living things, materials, simple machines, and hands-on experiments.',
                    },
                    {
                      name: 'Agriculture & Nutrition',
                      desc: 'Crop care, animal rearing basics, hygiene, nutrition, and food preparation.',
                    },
                    {
                      name: 'Creative & Performing Arts',
                      desc: 'Visual arts, craftwork, singing, instrumental music, and traditional Kenyan games.',
                    },
                    {
                      name: 'Social Studies & Religious Studies',
                      desc: 'Citizenship, community history, geography, Christian Religious Education (CRE), and values.',
                    },
                  ].map((subject, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{subject.name}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{subject.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  Grade 6 Kenya Primary School Education Assessment (KPSEA)
                </h4>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  In Grade 6, learners participate in the KPSEA formative assessment. Our teachers provide structured guidance and supportive preparation without excessive test-related anxiety, ensuring learners make a confident transition to Junior Secondary School.
                </p>
                <button
                  onClick={() => onNavigate('admissions', { level: 'primary' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2744] hover:text-amber-800"
                >
                  <span>Apply for Primary School Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-slate-100 border border-slate-200">
                <img
                  src={IMAGES.classroomWing}
                  alt="Primary and academic classroom wings at Gideons School"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Competency Building & Assessment
                </h4>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Regular formative portfolio assessments and learner self-reflection.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Termly parent academic clinics to review individualized learning records.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Remedial literacy and mathematics clinics for learners needing support.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedLevel === 'junior-secondary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Junior School Stage · Ages 12–14
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] mt-1">
                  Junior Secondary School (JSS Grades 7–9)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kenya’s Competency-Based Education (CBE) Framework
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                Junior Secondary School at Gideons School marks a pivotal transition where learners broaden their academic horizons, delve into experimental sciences, develop practical pre-technical skills, and prepare to select their specialized Senior School pathways.
              </p>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  Junior Secondary Learning Areas:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Integrated Science & Health',
                      desc: 'Biology, chemistry and physics fundamentals taught with real laboratory investigations.',
                    },
                    {
                      name: 'Pre-Technical & Pre-Career Studies',
                      desc: 'Technical drawing, materials science, basic electronics, entrepreneurship, and safety.',
                    },
                    {
                      name: 'Agriculture & Nutrition',
                      desc: 'Sustainable food production, farm tools, agricultural economics, and healthy living.',
                    },
                    {
                      name: 'Mathematics & Computer Studies',
                      desc: 'Algebra, geometry, statistics, spreadsheet modeling, and digital ethics.',
                    },
                    {
                      name: 'Social Studies & Life Skills',
                      desc: 'Kenyan and African history, government, civic duties, emotional intelligence, and integrity.',
                    },
                    {
                      name: 'Languages & Creative Arts',
                      desc: 'English, Kiswahili, Foreign Language options, Visual Arts, Performing Arts, and Music.',
                    },
                  ].map((area, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{area.name}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  Preparation for Senior School Pathways
                </h4>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Throughout Grades 7 to 9, teachers and career mentors document each learner's aptitudes and interests, guiding families during Grade 9 on optimal pathway selection for Senior Secondary.
                </p>
                <button
                  onClick={() => onNavigate('admissions', { level: 'junior-secondary' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2744] hover:text-amber-800"
                >
                  <span>Apply for Junior Secondary Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-slate-100 border border-slate-200">
                <img
                  src={IMAGES.computerLab}
                  alt="Computer laboratory and digital learning environment at Gideons School"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Assessment Structure in JSS
                </h4>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>60% Continuous School-Based Assessment (SBA) across projects and practicals.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>40% Kenya Junior School Education Assessment (KJSEA) at the end of Grade 9.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Individualised competency portfolios submitted to KNEC.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedLevel === 'senior-secondary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Senior School Stage · Ages 15–17
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] mt-1">
                  Senior Secondary School (SSS Grades 10–12)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Specialized Career Pathways under Kenya CBE
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                In Senior Secondary School, learners choose specialized pathways tailored to their demonstrated talents and future ambitions. GIdeons Schools provides premier learning for day scholars and boarders, guiding learners toward excellence in university entrance, tertiary colleges, and career readiness.
              </p>

              {/* Senior Secondary Division Motto Card */}
              <div className="p-3.5 bg-[#0F2744] text-white rounded-xl border border-white/10 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-[11px] uppercase tracking-wide">
                    Senior Secondary Motto:
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold">Day Scholars & Boarders</span>
                </div>
                <p className="text-sm font-bold font-['Outfit'] italic text-white">
                  "{config.seniorSecondaryMotto}"
                </p>
                <div className="text-[11px] text-slate-200 pt-0.5">
                  <strong className="text-amber-300">Mission:</strong> {config.seniorSecondaryMission}
                </div>
                <div className="text-[11px] text-slate-200">
                  <strong className="text-amber-300">Vision:</strong> {config.seniorSecondaryVision}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  Approved CBE Pathways:
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-bold text-slate-900">1. STEM Pathway (Science, Technology, Engineering & Mathematics)</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Pure Sciences (Physics, Chemistry, Biology), Applied Sciences, Advanced Mathematics, Technical Studies, and Information Technology. Ideal for medicine, engineering, computing, and biotechnology.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-bold text-slate-900">2. Social Sciences Pathway</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Humanities (History, Geography, Religious Studies), Business Studies, Economics, Law concepts, and Languages. Ideal for commerce, legal studies, diplomacy, public policy, and media.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      <h4 className="text-xs font-bold text-slate-900">3. Arts & Sports Science Pathway</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Visual Arts, Performing Arts (Music, Theatre), and Sports Science. Ideal for creative industries, athletic administration, industrial design, and sports management.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-200/80 space-y-3">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  Senior School Admissions
                </h4>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Admission into Senior Secondary depends on the learner's Junior Secondary performance, competency profile, and subject cluster requirements. Contact our academic office to discuss pathway availability.
                </p>
                <button
                  onClick={() => onNavigate('admissions', { level: 'senior-secondary' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2744] hover:text-amber-800"
                >
                  <span>Apply for Senior School Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-slate-100 border border-slate-200">
                <img
                  src={IMAGES.seniorStudents}
                  alt="Senior secondary students in official royal blue uniform at Gideons School"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Informational Legacy 8-4-4 Clarification Box */}
              <div className="bg-slate-900 text-white p-6 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>Curriculum Transition Notice</span>
                </div>
                <h4 className="text-sm font-bold font-['Outfit'] text-white">
                  Legacy 8-4-4 Form Four vs. Grade 12 CBE
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Please note that Form Four under the former 8-4-4 system and Grade 12 under the Competency-Based Education (CBE) are distinct curriculum frameworks with differing syllabi, examination formats, and grading systems.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gideons School implements the approved national curriculum guidelines as gazetted by the Kenya Ministry of Education and KNEC.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Academic Calendar & Guidance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              School Terms & Academic Calendar
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our academic year follows the Kenya Ministry of Education 3-Term structure: Term 1 (January – April), Term 2 (May – August), and Term 3 (September – November/December), complemented by termly midterm breaks.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-[#0F2744] hover:bg-[#163860] text-white text-xs font-semibold rounded-md transition-colors whitespace-nowrap"
          >
            Request Term Dates & Prospectus
          </button>
        </div>
      </section>
    </div>
  );
};
