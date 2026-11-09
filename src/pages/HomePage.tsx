import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Send,
  Mail,
  Shield,
  Layers,
  Award,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  ZoomIn,
  Maximize2,
  Eye,
  MapPin,
  Phone,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { SchoolConfig, NewsArticle, GalleryItem, EducationLevelId } from '../types';
import { EDUCATION_LEVELS_METADATA, LEGACY_844_ADVISORY, WHY_CHOOSE_ITEMS } from '../config/schoolConfig';
import { storage, IMAGES } from '../services/storage';

interface HomePageProps {
  config: SchoolConfig;
  onNavigate: (tab: string, context?: any) => void;
  onOpenGalleryItem: (index: number) => void;
  galleryItems: GalleryItem[];
  newsItems: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  config,
  onNavigate,
  onOpenGalleryItem,
  galleryItems,
  newsItems,
  onOpenArticle,
}) => {
  // Hero photo gallery switcher state with genuine uploaded school photos
  const [currentHeroPhoto, setCurrentHeroPhoto] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  const heroPhotos = [
    {
      src: IMAGES.seniorSchoolFront,
      label: 'Gideon Senior School Block',
      tag: 'Official Campus Building',
      desc: 'Administrative and academic wing featuring blue roofing, brick finishes, and landscaped hedges.',
    },
    {
      src: IMAGES.seniorStudents,
      label: 'Senior Secondary Learners',
      tag: 'Student Body',
      desc: 'Senior school students in official royal blue school uniforms on the lush school lawn.',
    },
    {
      src: IMAGES.primaryStudents,
      label: 'Primary School Learners',
      tag: 'Foundational Years',
      desc: 'Younger pupils gathered on the lawn in neat burgundy school sweaters and checked uniforms.',
    },
    {
      src: IMAGES.computerLab,
      label: 'Computer Studies Laboratory',
      tag: 'Digital Learning',
      desc: 'Spacious dedicated computer lab with desktop workstations for ICT literacy and research.',
    },
    {
      src: IMAGES.girlsDormitory,
      label: 'Girls Boarding Dormitory',
      tag: 'Boarding Facilities',
      desc: 'Clean, secure, and serene boarding accommodations with landscaped gardens.',
    },
    {
      src: IMAGES.quadrangleTree,
      label: 'Central Courtyard & Grounds',
      tag: 'School Grounds',
      desc: 'Iconic central shade tree and open quadrangle providing a peaceful environment.',
    },
  ];

  // Verified authentic photo map for education levels
  const levelPhotos: Record<EducationLevelId, { src: string; caption: string }> = {
    'ecd': {
      src: IMAGES.primaryStudents,
      caption: 'Foundational & Play Learning',
    },
    'primary': {
      src: IMAGES.classroomWing,
      caption: 'Grades 1–6 CBC Classrooms',
    },
    'junior-secondary': {
      src: IMAGES.juniorStudents,
      caption: 'Grades 7–9 CBE Cohort',
    },
    'senior-secondary': {
      src: IMAGES.seniorStudents,
      caption: 'Grades 10–12 CBE Scholars',
    },
  };

  // Facilities showcase data for interactive campus tour strip
  const campusFacilities = [
    {
      title: 'Senior School Complex',
      src: IMAGES.seniorSchoolFront,
      tag: 'Academic Block',
      desc: 'Modern brick architecture with expansive learning spaces.',
      galleryIdx: 0,
    },
    {
      title: 'Girls Boarding Dormitory',
      src: IMAGES.girlsDormitory,
      tag: 'Boarding Facilities',
      desc: 'Safe, hygienic, and serene residential accommodation.',
      galleryIdx: 4,
    },
    {
      title: 'Computer Studies Lab',
      src: IMAGES.computerLab,
      tag: 'ICT Education',
      desc: 'High-speed desktop workstations for coding and research.',
      galleryIdx: 3,
    },
    {
      title: 'Central Quadrangle Tree',
      src: IMAGES.quadrangleTree,
      tag: 'School Grounds',
      desc: 'Lush tree and courtyard for assembly and outdoor reading.',
      galleryIdx: 5,
    },
    {
      title: 'Digital Literacy Workstations',
      src: IMAGES.computerWorkstations,
      tag: 'ICT Workstations',
      desc: 'Dedicated computer hardware enabling hands-on practice.',
      galleryIdx: 6,
    },
    {
      title: 'Classroom Wings & Lawns',
      src: IMAGES.classroomHedges,
      tag: 'Learning Environment',
      desc: 'Tranquil brick buildings surrounded by vibrant greenery.',
      galleryIdx: 9,
    },
  ];

  // Automatic slideshow cycle: advances every 4.5 seconds unless paused
  useEffect(() => {
    if (isHeroPaused) return;

    const timer = setInterval(() => {
      setCurrentHeroPhoto((prev) => (prev + 1) % heroPhotos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isHeroPaused, heroPhotos.length]);

  // Parent Quick Enquiry state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryLevel, setEnquiryLevel] = useState<EducationLevelId>('junior-secondary');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquiryConsent, setEnquiryConsent] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [enquiryError, setEnquiryError] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterFirstName, setNewsletterFirstName] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  // Handle Quick Enquiry Submission
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName.trim() || !enquiryPhone.trim()) {
      setEnquiryError('Please provide your name and phone number so our admissions team can reach you.');
      return;
    }
    if (!enquiryConsent) {
      setEnquiryError('Please confirm your consent to be contacted regarding your admission enquiry.');
      return;
    }

    setEnquiryStatus('submitting');
    setEnquiryError('');

    try {
      storage.submitEnquiry({
        fullName: enquiryName.trim(),
        contactInfo: enquiryPhone.trim(),
        email: enquiryEmail.trim() || undefined,
        subject: `Admission Enquiry: ${enquiryLevel.toUpperCase()}`,
        educationLevelOfInterest: enquiryLevel,
        message: enquiryMessage.trim() || 'General admission enquiry regarding admission requirements and school visits.',
        consentToContact: true,
      });

      setEnquiryStatus('success');
      setEnquiryName('');
      setEnquiryPhone('');
      setEnquiryEmail('');
      setEnquiryMessage('');
      setEnquiryConsent(false);
    } catch {
      setEnquiryStatus('error');
      setEnquiryError('We could not submit your enquiry at this time. Please call our admissions desk directly.');
    }
  };

  // Handle Newsletter Submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterMessage('Please enter a valid email address.');
      setNewsletterStatus('error');
      return;
    }
    if (!newsletterConsent) {
      setNewsletterMessage('Please acknowledge consent to receive school newsletters.');
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('submitting');
    const result = storage.subscribeNewsletter(newsletterEmail, newsletterFirstName);
    if (result.success) {
      setNewsletterStatus('success');
      setNewsletterMessage(result.message);
      setNewsletterEmail('');
      setNewsletterFirstName('');
      setNewsletterConsent(false);
    } else {
      setNewsletterStatus('error');
      setNewsletterMessage('Subscription failed. Please try again later.');
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 5.A: Hero Section with Translucent Animated Campus Photos */}
      <section className="relative bg-[#0F2744] text-white overflow-hidden">
        {/* Translucent Animated Background Photos across the entire top navy area */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          {heroPhotos.map((photo, pIdx) => {
            const isActive = currentHeroPhoto === pIdx;
            const animClass = pIdx % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2';
            return (
              <div
                key={pIdx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-25' : 'opacity-0'
                }`}
              >
                <img
                  src={photo.src}
                  alt=""
                  className={`w-full h-full object-cover select-none ${animClass}`}
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })}

          {/* Deep Navy Gradient Scrims to ensure WCAG AAA text legibility and rich tone */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/95 via-[#0F2744]/90 to-[#0F2744]/75 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2E]/80 via-transparent to-[#0F2744] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-md text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{config.heroSupportingLine}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-['Outfit'] text-balance">
              {config.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {config.heroSupportingText}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold rounded-md transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md border border-white/20 transition-all flex items-center justify-center text-sm sm:text-base"
              >
                Explore Our School
              </button>
            </div>

            {/* Supporting Trust Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kenyan CBE & CBC Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Nurturing Christian Values</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Holistic Co-Curriculars</span>
              </div>
            </div>

            {/* Translucent Backdrop Campus Indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 text-[11px] text-slate-300/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Campus Atmosphere: {heroPhotos[currentHeroPhoto].label}</span>
            </div>
          </div>

          {/* Hero Visual Column (Targeted by CSS Selector) */}
          <div
            className="lg:col-span-5 relative"
            onMouseEnter={() => setIsHeroPaused(true)}
            onMouseLeave={() => setIsHeroPaused(false)}
          >
            {/* Ambient Animated Halo Glow behind the photo frame */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/25 via-blue-600/30 to-amber-400/25 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000 -z-10 animate-pulse-ring" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/15 bg-slate-950 group aspect-[4/3] lg:aspect-auto lg:h-[480px] flex flex-col justify-end">
              {/* Stacked animated slides with alternating Ken Burns drift and cross-fade */}
              {heroPhotos.map((photo, pIdx) => {
                const isActive = currentHeroPhoto === pIdx;
                const animClass = pIdx % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2';
                return (
                  <div
                    key={pIdx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out overflow-hidden ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className={`w-full h-full object-cover select-none ${
                        isActive ? animClass : 'scale-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}

              {/* Shimmer / light sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-15" />

              {/* Gradient Scrim for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-15 pointer-events-none" />

              {/* Enlarge Lightbox Button */}
              <button
                type="button"
                onClick={() => {
                  const matchIdx = galleryItems.findIndex((g) => g.imageUrl === heroPhotos[currentHeroPhoto].src);
                  onOpenGalleryItem(matchIdx !== -1 ? matchIdx : 0);
                }}
                className="absolute top-4 left-4 z-25 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-md transition-all duration-300 hover:scale-105 group/btn"
                title="View full resolution school photo"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                <span className="hidden sm:inline">Enlarge Photo</span>
              </button>

              {/* Interactive Controls Bar: Prev, Play/Pause, Next */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-25">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentHeroPhoto((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length)
                  }
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white transition-all transform hover:scale-105 border border-white/20 shadow"
                  aria-label="Previous school photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsHeroPaused(!isHeroPaused)}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white transition-all transform hover:scale-105 border border-white/20 shadow"
                  title={isHeroPaused ? 'Play slideshow' : 'Pause slideshow'}
                  aria-label={isHeroPaused ? 'Play slideshow' : 'Pause slideshow'}
                >
                  {isHeroPaused ? (
                    <Play className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Pause className="w-4 h-4 text-white/90" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentHeroPhoto((prev) => (prev + 1) % heroPhotos.length)
                  }
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white transition-all transform hover:scale-105 border border-white/20 shadow"
                  aria-label="Next school photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Animated Text Content Box & Interactive Thumbnails */}
              <div className="relative z-20 p-5 sm:p-6 space-y-3">
                <div>
                  <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>{heroPhotos[currentHeroPhoto].tag}</span>
                  </span>
                  <h3 className="text-white text-base sm:text-xl font-bold font-['Outfit'] mt-1 transition-all duration-300">
                    {heroPhotos[currentHeroPhoto].label}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-snug line-clamp-2 max-w-md transition-all duration-300">
                    {heroPhotos[currentHeroPhoto].desc}
                  </p>
                </div>

                {/* Animated Mini Thumbnail Selector Strip */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/15">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                    {heroPhotos.map((photo, pIdx) => {
                      const isActive = currentHeroPhoto === pIdx;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setCurrentHeroPhoto(pIdx)}
                          className={`relative shrink-0 rounded-md overflow-hidden border transition-all duration-300 group/thumb ${
                            isActive
                              ? 'border-amber-400 scale-110 shadow-sm shadow-amber-400/50 ring-1 ring-amber-400'
                              : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/70'
                          }`}
                          aria-label={`Switch to ${photo.label}`}
                        >
                          <img
                            src={photo.src}
                            alt=""
                            className="w-8 h-6 sm:w-10 sm:h-7 object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Slide Indicator */}
                  <div className="text-[10px] text-white/75 font-mono tracking-wider shrink-0">
                    0{currentHeroPhoto + 1}/0{heroPhotos.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.B: Welcome to Gideons School */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div
              onClick={() => onOpenGalleryItem(1)}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-900 group border-4 border-slate-100 hover:border-amber-400 transition-all duration-500 cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Enlarge Gideons School primary learners photograph"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenGalleryItem(1);
                }
              }}
            >
              {/* Photo with Ken Burns ambient drift and hover zoom */}
              <img
                src={IMAGES.primaryStudents}
                alt="Gideons School primary learners gathered on campus lawn in uniform"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 animate-kenburns-1"
                referrerPolicy="no-referrer"
              />

              {/* Interactive Shine Wipe Sweep on Hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-15" />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/95 via-[#0F2744]/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-semibold border border-white/25 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified School Learners</span>
              </div>

              {/* Center Zoom In Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-amber-400/90 text-[#0F2744] flex items-center justify-center shadow-lg transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              {/* Floating Bottom Info & Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-20">
                <div>
                  <span className="text-[10px] text-amber-300 uppercase tracking-widest font-bold block">
                    GIdeons Schools Community
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    Primary Learners & Campus Grounds
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F2744]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 text-[10px] font-medium border border-amber-400/30 animate-float-subtle">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Day & Boarding</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="flex items-center gap-2.5">
              <img
                src={config.logoUrl || IMAGES.logo}
                alt={`${config.schoolName} Official Crest`}
                className="w-10 h-10 rounded-full object-cover bg-white p-0.5 shadow-sm border border-amber-400"
              />
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Welcome to GIdeons Schools
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit'] text-balance">
              Nurturing Academic Excellence, Strong Character & Real-World Competence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At GIdeons Schools, we believe that true education reaches beyond textbooks. Located near Ramba Market off Kadongo-Mawego road, our educational philosophy centers on developing the whole child—fostering sharp intellect, strong moral discipline, practical innovation, and mutual empathy.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We partner closely with parents and guardians to establish a secure, joyful, and inspiring learning community where both day scholars and boarding learners from Early Childhood Development through Junior and Senior Secondary are known, valued, and empowered to fulfill their God-given potential.
            </p>

            {/* Division Motto Highlights on Homepage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-[#0F2744] uppercase tracking-wider block">Senior Secondary Motto:</span>
                <p className="text-xs font-semibold text-slate-800 italic mt-0.5">"{config.seniorSecondaryMotto}"</p>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">Nursery & Primary Motto:</span>
                <p className="text-xs font-semibold text-slate-800 italic mt-0.5">"{config.primaryMotto}"</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2744] hover:text-amber-600 transition-colors group"
              >
                <span>Read more about our vision, leadership and values</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5.C: Our Education Levels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Curriculum & Stages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
            Our Education Levels
          </h2>
          <p className="text-sm text-slate-600">
            A seamless academic journey designed in accordance with Kenya’s Competency-Based Education framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDUCATION_LEVELS_METADATA.map((level) => {
            const photoData = levelPhotos[level.id];
            return (
              <div
                key={level.id}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Animated Card Photo Banner */}
                  <div className="relative h-40 overflow-hidden bg-slate-900 group/img">
                    <img
                      src={photoData.src}
                      alt={photoData.caption}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover/img:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover light wipe */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-15" />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                    {/* Floating Grades Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-semibold border border-white/20 z-20">
                      {level.grades}
                    </div>
                    {/* Photo Label Pill */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-semibold truncate flex items-center gap-1.5 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>{photoData.caption}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0F2744]/5 flex items-center justify-center text-[#0F2744] group-hover:bg-[#0F2744] group-hover:text-amber-400 transition-colors shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                        {level.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {level.summary}
                    </p>

                    {/* Focus Highlights */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-700">Key Focus Areas:</div>
                      <ul className="text-[11px] text-slate-500 space-y-1">
                        {level.focusAreas.slice(0, 3).map((area, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            <span className="truncate">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onNavigate('academics', { level: level.id })}
                    className="w-full py-2.5 px-3 bg-slate-50 hover:bg-[#0F2744] text-[#0F2744] hover:text-white text-xs font-semibold rounded-md border border-slate-200 hover:border-[#0F2744] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{level.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clearly labelled 8-4-4 Legacy Transition Note */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Shield className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{LEGACY_844_ADVISORY.title}</span>
            </div>
            <p className="text-amber-900/80 text-[11px] leading-relaxed">
              {LEGACY_844_ADVISORY.content}
            </p>
          </div>
          <button
            onClick={() => onNavigate('academics')}
            className="shrink-0 px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold rounded text-xs transition-colors"
          >
            Curriculum Details
          </button>
        </div>
      </section>

      {/* 5.D: Why Choose GIdeons Schools? */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Our Core Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              Why Families Choose GIdeons Schools
            </h2>
            <p className="text-sm text-slate-600">
              Key pillars that make our learning environment supportive, safe, and academically enriching for day scholars and boarders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-amber-600">
                    0{idx + 1}.
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.E: Admissions Call to Action with Animated Campus Backdrop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl bg-[#0F2744] text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-white/10 group">
          {/* Animated Background Photo with Ken Burns motion */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={IMAGES.seniorSchoolFront}
              alt="Gideon Senior School Block"
              className="w-full h-full object-cover opacity-20 scale-105 animate-kenburns-2 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2744] via-[#0F2744]/95 to-[#0A1A2E]/85" />
          </div>

          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Enrollment Opportunities</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
              Your Child’s Next Chapter Starts Here
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Are you looking for a school where your child can learn, grow and develop their potential? We invite you to discover GIdeons Schools and begin the admission process today.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold rounded-md transition-all shadow-md hover:shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 group/btn"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md border border-white/20 transition-colors text-sm sm:text-base flex items-center justify-center"
              >
                Talk to Our Admissions Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Campus Facilities Showcase (Animated Photo Strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Campus Walkthrough</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              Explore Our Campus & Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Purpose-built learning spaces, clean dormitories, and modern ICT infrastructure.
            </p>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2744] hover:text-amber-600 transition-colors self-start sm:self-auto"
          >
            <span>See All Campus Spaces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusFacilities.map((facility, fIdx) => (
            <div
              key={fIdx}
              onClick={() => onOpenGalleryItem(facility.galleryIdx)}
              className="group relative rounded-xl overflow-hidden bg-slate-950 aspect-[16/10] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200/80 hover:border-amber-400"
              role="button"
              tabIndex={0}
              aria-label={`View ${facility.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenGalleryItem(facility.galleryIdx);
                }
              }}
            >
              {/* Image with smooth zoom animation */}
              <img
                src={facility.src}
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Shimmer / light sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-15" />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent z-10" />

              {/* Floating Top Tag */}
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-semibold border border-white/20">
                  {facility.tag}
                </span>
              </div>

              {/* Center Zoom In Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-amber-400 text-[#0F2744] flex items-center justify-center shadow-lg transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-4 right-4 z-20 space-y-0.5">
                <h3 className="text-white text-sm font-bold font-['Outfit'] group-hover:text-amber-300 transition-colors">
                  {facility.title}
                </h3>
                <p className="text-slate-300 text-[11px] line-clamp-1">
                  {facility.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.F: School Gallery Preview (6 Replaceable Image Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Life at Gideons
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              School Gallery Preview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Photographs capturing classroom inquiry, sportsmanship, and campus life.
            </p>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2744] hover:text-amber-600 transition-colors self-start sm:self-auto"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.slice(0, 6).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onOpenGalleryItem(idx)}
              className="group relative rounded-xl overflow-hidden bg-slate-950 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200/80 hover:border-amber-400"
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenGalleryItem(idx);
                }
              }}
            >
              {/* Photo with smooth zoom */}
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />

              {/* Shimmer light sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-15" />

              {/* Center Zoom In Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-[#0F2744] flex items-center justify-center shadow-lg transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Gradient Scrim & Captions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-3 sm:p-4 flex flex-col justify-end z-20">
                <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
                <p className="text-white text-xs font-bold truncate mt-0.5 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.G: News and Announcements Preview (Latest 3 items) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
              Updates & Notices
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
              Latest News & Announcements
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Stay informed with official circulars, academic notices, and school activities.
            </p>
          </div>
          <button
            onClick={() => onNavigate('news')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2744] hover:text-amber-600 transition-colors self-start sm:self-auto"
          >
            <span>View All News & Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                <img
                  src={article.imageUrl || IMAGES.hero}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Shimmer light sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-15" />
                <span className="absolute top-2.5 left-2.5 bg-[#0F2744]/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm z-20">
                  {article.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.publicationDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit'] line-clamp-2 group-hover:text-[#0F2744] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onOpenArticle(article)}
                    className="text-xs font-semibold text-[#0F2744] hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Read Full Notice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Homa Bay County Location Showcase with Embedded Interactive Google Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0F2744] text-white rounded-3xl relative overflow-hidden shadow-xl border border-white/10 group">
          {/* Subtle animated campus background on header */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-15">
            <img
              src={IMAGES.seniorSchoolFront}
              alt="GIdeons Schools Campus"
              className="w-full h-full object-cover animate-kenburns-1 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2744] via-[#0F2744]/95 to-[#0A1A2E]/90" />
          </div>

          <div className="relative z-10 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-md text-amber-300 text-xs font-semibold tracking-wide uppercase">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Homa Bay County Location</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                  {config.locationTitle || "Gideons Children Home Ramba (GIdeons Schools)"}
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {config.locationDescription || "Located at Gideons Children Home Ramba, off Kadongo-Mawego Road in Kabondo Kasipul, Homa Bay County. Conveniently situated for day scholars and boarders across Kabondo Kasipul, Mawego, Kadongo, Oyugis, Ringa, and neighbouring communities."}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                  <a
                    href="tel:0181910714"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>0181910714</span>
                  </a>
                  <a
                    href="tel:0181983490"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>0181983490</span>
                  </a>
                  <a
                    href="mailto:admissions@gideonskenya.school"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>admissions@gideonskenya.school</span>
                  </a>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mon–Fri: 7:30 AM – 5:00 PM | Sat: 8:00 AM – 1:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                <a
                  href={config.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sm"
                >
                  <MapPin className="w-5 h-5 text-[#0F2744]" />
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center text-sm"
                >
                  Directions & Campus Tours
                </button>
              </div>
            </div>
          </div>

          {/* Embedded Interactive Google Map on Homepage */}
          <div className="relative w-full bg-slate-900 border-t border-white/10">
            <div className="bg-[#0A1A2E]/90 px-6 py-2.5 flex items-center justify-between text-xs text-slate-300 border-b border-white/5">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Interactive Campus Map: Gideons Children Home Ramba</span>
              </span>
              <a
                href={config.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
              >
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              title="Gideons Children Home Ramba Google Map"
              src={config.googleMapsEmbedUrl || "https://maps.google.com/maps?q=Gideons+children+home+Ramba&t=&z=15&ie=UTF8&iwloc=&output=embed"}
              className="w-full h-72 sm:h-80 md:h-96 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 5.H & 5.I: Quick Parent Enquiry & Newsletter Subscription Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 5.H: Parent Quick Enquiry Section */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Quick Enquiry
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">
                Have a Question for Our Admissions Team?
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Fill in your details below and an admissions officer will call or message you promptly.
              </p>
            </div>

            {enquiryStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Enquiry Received Successfully!</span>
                </div>
                <p>
                  Thank you for reaching out to Gideons School. Your enquiry has been recorded in our admissions registry. Our admissions officer will contact you on the phone number provided.
                </p>
                <button
                  onClick={() => setEnquiryStatus('idle')}
                  className="mt-2 text-xs font-semibold underline text-emerald-700 hover:text-emerald-900"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                {enquiryError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs">
                    {enquiryError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      placeholder="e.g. Grace Wambui"
                      className="w-full text-xs px-3 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      placeholder="e.g. +254 712 345 678"
                      className="w-full text-xs px-3 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      placeholder="e.g. grace@example.co.ke"
                      className="w-full text-xs px-3 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Education Level of Interest *
                    </label>
                    <select
                      value={enquiryLevel}
                      onChange={(e) => setEnquiryLevel(e.target.value as EducationLevelId)}
                      className="w-full text-xs px-3 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      <option value="ecd">Early Childhood Development (Playgroup, PP1, PP2)</option>
                      <option value="primary">Primary School (Grades 1–6 CBC)</option>
                      <option value="junior-secondary">Junior Secondary School (Grades 7–9 CBE)</option>
                      <option value="senior-secondary">Senior Secondary School (Grades 10–12 CBE)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Message or Question
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    placeholder="Tell us what you would like to know regarding admission requirements, interviews, or campus visits..."
                    className="w-full text-xs px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50 resize-none"
                  />
                </div>

                {/* Consent checkbox required by Kenya Data Protection Act */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="enquiry-consent"
                    checked={enquiryConsent}
                    onChange={(e) => setEnquiryConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744]"
                  />
                  <label htmlFor="enquiry-consent" className="text-[11px] text-slate-600 leading-tight">
                    I consent to Gideons School contacting me via phone, WhatsApp, or email regarding this admission enquiry in accordance with the Kenya Data Protection Act, 2019.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={enquiryStatus === 'submitting'}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0F2744] hover:bg-[#163860] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{enquiryStatus === 'submitting' ? 'Submitting...' : 'Send Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* 5.I: Newsletter Subscription */}
          <div className="lg:col-span-5 bg-[#0F2744] text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 border border-white/10">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold font-['Outfit'] text-white">
                Stay Connected with Gideons School
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Receive school news, upcoming term events, important academic notices, and admission updates directly to your inbox.
              </p>
            </div>

            {newsletterStatus === 'success' ? (
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-xs text-amber-300 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Subscribed Successfully</span>
                </div>
                <p className="text-slate-200">{newsletterMessage}</p>
                <p className="text-[10px] text-slate-400">
                  You can unsubscribe at any time by clicking the link in our emails.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3.5">
                {newsletterMessage && newsletterStatus === 'error' && (
                  <div className="p-2.5 bg-red-500/20 border border-red-500/30 rounded text-red-200 text-xs">
                    {newsletterMessage}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    First Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={newsletterFirstName}
                    onChange={(e) => setNewsletterFirstName(e.target.value)}
                    placeholder="Your first name"
                    className="w-full text-xs px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="e.g. parent@example.com"
                    className="w-full text-xs px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="nl-consent"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    className="mt-0.5 rounded border-white/30 text-amber-400 focus:ring-amber-400 bg-white/10"
                  />
                  <label htmlFor="nl-consent" className="text-[11px] text-slate-300 leading-tight">
                    I agree to receive the Gideons School electronic newsletter. I understand I may unsubscribe at any time.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={newsletterStatus === 'submitting'}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold text-xs rounded-md transition-colors"
                >
                  {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </button>

                <div className="text-[10px] text-slate-400 text-center">
                  We respect your privacy and never share parent email addresses with third parties.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
