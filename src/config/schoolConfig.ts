import { SchoolConfig } from '../types';

/**
 * Central Configuration for Gideons School
 *
 * All contact details, brand colors, addresses, and admission notices
 * are centrally configured here.
 * Placeholders are clearly marked for the school administration to customize.
 */
export const defaultSchoolConfig: SchoolConfig = {
  schoolName: 'GIdeons Schools',
  tagline: 'To Labour for Academic Excellence',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_10.20.40_13d2068f.jpeg',
  heroHeadline: 'GIdeons Schools — Growing Minds, Building Futures',
  heroSupportingText:
    'Give your child a strong foundation for lifelong learning. Located at Gideons Children Home Ramba off Kadongo-Mawego Road in Homa Bay County, GIdeons Schools provides premier learning for both day scholars and boarders from Nursery through Senior Secondary.',
  heroSupportingLine: 'Nursery, Primary, Junior & Senior Secondary | Day & Boarding',
  country: 'Kenya',
  primaryColor: '#0F2744', // Authoritative Kenyan Deep Navy
  accentColor: '#D4AF37',  // Academic Warm Gold
  admissionsOpen: true,
  currentAdmissionSeason: 'Admissions Open for Day Scholars & Boarders 2026',

  // Verified School Contact & Location Information
  phone: '0181910714',
  phoneSecondary: '0181983490',
  email: 'admissions@gideonskenya.school',
  emailAdmissions: 'admissions@gideonskenya.school',
  whatsappNumber: '254181910714',
  physicalAddress: 'Gideons Children Home Ramba, Near Ramba Market, Off Kadongo-Mawego Road, Kabondo Kasipul, Homa Bay County, Kenya',
  postalAddress: 'P.O. Box Ramba / Mawego, Homa Bay County, Kenya',
  officeHoursWeekdays: 'Monday – Friday: 7:30 AM – 5:00 PM',
  officeHoursSaturdays: 'Saturday: 8:00 AM – 1:00 PM',
  county: 'Homa Bay County',
  locationTitle: 'Gideons Children Home Ramba (GIdeons Schools)',
  locationDescription:
    'Located at Gideons Children Home Ramba, off Kadongo-Mawego Road in Kabondo Kasipul, Homa Bay County. Conveniently situated for day scholars and boarders across Kabondo Kasipul, Mawego, Kadongo, Oyugis, Ringa, and neighbouring communities.',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Gideons+children+home+Ramba&t=&z=15&ie=UTF8&iwloc=&output=embed',

  // Senior Secondary School Section Identity
  seniorSecondaryMotto: 'To labour for academic excellence',
  seniorSecondaryMission: 'To be a leading center for academic excellence',
  seniorSecondaryVision: 'To create conducive environment for learning and teaching',

  // Nursery (ECD) & Primary School Section Identity
  primaryMotto: 'Labour for excellence',
  primaryMission: 'To help learners be dutyful, God fearing and responsible citizens',
  primaryVision: 'A center for academic excellence',

  // Christian Values & Character Development (Configurable)
  hasChristianValuesFocus: true,
  christianValuesStatement:
    'At GIdeons Schools, our approach to character development is rooted in sound moral principles and Christian values. We foster kindness, integrity, respect, diligence, and duty, guiding learners to be responsible, God-fearing citizens.',
};

export const EDUCATION_LEVELS_METADATA = [
  {
    id: 'ecd',
    title: 'Early Childhood Development (ECD)',
    grades: 'Playgroup, PP1 & PP2 (Ages 3–5)',
    summary:
      'Focus on foundational learning, play, language development, numeracy, creativity, social development and school readiness.',
    focusAreas: [
      'Play-based inquiry & cognitive exploration',
      'Early language, phonics & communication',
      'Foundational numeracy & pattern discovery',
      'Fine and gross psychomotor coordination',
      'Social empathy, sharing & school readiness',
    ],
    curriculumSystem: 'Kenya CBC Early Years Education (EYE)',
    buttonText: 'Explore ECD',
  },
  {
    id: 'primary',
    title: 'Primary School',
    grades: 'Grade 1 to Grade 6 (Ages 6–11)',
    summary:
      'Focus on literacy, numeracy, science, creativity, practical learning, values and preparation for the next stage of education.',
    focusAreas: [
      'Literacy, Kiswahili & English language fluency',
      'Mathematical logic, reasoning & arithmetic',
      'Integrated Science, Agriculture & Nutrition',
      'Creative Arts, Craft & Music appreciation',
      'Social Studies, Religious Education & Moral Values',
    ],
    curriculumSystem: 'Kenya CBC Primary Education (Grades 1–6)',
    buttonText: 'Explore Primary',
  },
  {
    id: 'junior-secondary',
    title: 'Junior Secondary School (JSS)',
    grades: 'Grades 7, 8 & 9 (Ages 12–14)',
    summary:
      'Present Grades 7–9 under Kenya’s Competency-Based Education (CBE) system, with emphasis on competencies, exploration, practical activities and preparation for senior school.',
    focusAreas: [
      'Pre-Technical & Pre-Career Studies',
      'Integrated Science & Hands-on Laboratory work',
      'Digital Literacy, Coding concepts & Mathematics',
      'Social Studies, Life Skills & Citizenship',
      'Continuous Learner Assessment & Practical Projects',
    ],
    curriculumSystem: 'Kenya CBE Junior School (Grades 7–9)',
    buttonText: 'Explore Junior School',
  },
  {
    id: 'senior-secondary',
    title: 'Senior Secondary School (SSS)',
    grades: 'Grades 10, 11 & 12 (Ages 15–17)',
    summary:
      'Present Grades 10–12 under the current CBE system. Pathway and subject options depend on the school’s approved programmes, preparing learners for university, tertiary colleges, and careers.',
    focusAreas: [
      'STEM Pathway (Pure & Applied Sciences, ICT)',
      'Social Sciences Pathway (Humanities, Business, Languages)',
      'Arts & Sports Science Pathway (Performing, Visual & Athletics)',
      'Career Mentorship & University Preparation',
      'National CBE Assessment & Specialized Portfolio',
    ],
    curriculumSystem: 'Kenya CBE Senior School (Grades 10–12)',
    buttonText: 'Explore Senior School',
  },
] as const;

export const LEGACY_844_ADVISORY = {
  title: 'Information on the Legacy 8-4-4 System and Form Four Transition',
  content:
    'For parents enquiring about the former 8-4-4 secondary education system: Kenya has been progressively phasing out the 8-4-4 cycle in favour of the Competency-Based Education (CBE) curriculum. The legacy Form Four cohort sat the final KCSE examination cycle in 2027/2028 as established by the Ministry of Education. Please note that Form Four under 8-4-4 and Grade 12 under CBE represent distinct curriculum structures with differing assessment frameworks. Gideons School provides clear academic guidance to ensure smooth transitions for all students.',
};

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Dedicated Teaching & Learner Support',
    description:
      'Qualified, caring educators who take the time to know each learner, identify their individual strengths, and provide responsive classroom guidance.',
  },
  {
    title: 'Supportive & Safe Learning Environment',
    description:
      'A secure, clean, and disciplined school setting where students feel respected, encouraged, and motivated to achieve their best.',
  },
  {
    title: 'Solid Academic Development',
    description:
      'Rigorous delivery of the Kenyan national curriculum with structured continuous assessment, remedial assistance, and positive academic habits.',
  },
  {
    title: 'Character Formation & Discipline',
    description:
      'Instilling integrity, mutual respect, punctuality, and self-discipline to prepare learners who are morally grounded and socially responsible.',
  },
  {
    title: 'Talent & Co-Curricular Growth',
    description:
      'Diverse opportunities across athletics, football, music, drama, scouting, and chess to foster teamwork, health, and creative self-expression.',
  },
  {
    title: 'Practical Learning & Creativity',
    description:
      'Emphasis on real-world projects, problem-solving, science experiments, and digital literacy in alignment with Competency-Based Education.',
  },
  {
    title: 'Open Parent-School Communication',
    description:
      'Regular academic clinics, transparent progress reporting, and accessible school administrators who partner closely with families.',
  },
  {
    title: 'Preparation for Future Opportunities',
    description:
      'Equipping learners with confidence, critical thinking, and leadership capabilities required for senior secondary pathways, tertiary education, and life.',
  },
];
