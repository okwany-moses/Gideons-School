import {
  AdmissionApplication,
  ContactEnquiry,
  NewsletterSubscriber,
  NewsArticle,
  GalleryItem,
  SchoolConfig,
  ApplicationStatus,
} from '../types';
import { defaultSchoolConfig } from '../config/schoolConfig';

const KEYS = {
  APPLICATIONS: 'gideons_applications_v1',
  ENQUIRIES: 'gideons_enquiries_v1',
  SUBSCRIBERS: 'gideons_subscribers_v1',
  NEWS: 'gideons_news_v1',
  CONFIG: 'gideons_config_v1',
};

// Genuine GIdeons Schools photographs provided by the school administration
export const IMAGES = {
  // Official GIdeons Schools crest and logo
  logo: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_10.20.40_13d2068f.jpeg',
  // Official Gideon Senior School building with official sign and crest
  seniorSchoolFront: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.14_ce023874.jpeg',
  // Senior school students in royal blue sweaters on the school grounds
  seniorStudents: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_02.43.47.._54db8059.jpeg',
  // Primary school learners in burgundy sweaters and checkered uniform
  primaryStudents: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_02.43.46_a62f2031.jpeg',
  // Junior secondary students in grey sweaters
  juniorStudents: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_02.43.46.._54bec27d.jpeg',
  // Girls Dormitory boarding facility with blue doors and manicured lawns
  girlsDormitory: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.18_002abda4.jpeg',
  // Central school courtyard and iconic green shade tree
  quadrangleTree: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.10_18f2d6e6.jpeg',
  // Spacious modern computer laboratory with desktop workstations
  computerLab: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_03.57.31.._fe6ac6df.jpeg',
  // Individual computer workstations
  computerWorkstations: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_03.57.31_1757ab92.jpeg',
  // Classroom wing with blue doors and orange brickwork
  classroomWing: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.16_60255266.jpeg',
  // Landscaped classroom blocks with neat hedges
  classroomHedges: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.17_b57c8766.jpeg',
  // Expansive school green lawns and serene environment
  schoolGrounds: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.09_ffb7efca.jpeg',
  
  // Aliases for backward compatibility
  hero: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.14_ce023874.jpeg',
  classroom: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_03.57.31.._fe6ac6df.jpeg',
  ecd: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_02.43.46_a62f2031.jpeg',
  sports: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_01.42.10_18f2d6e6.jpeg',
};

// Seed gallery items with genuine school photographs
export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gideon Senior School Main Block',
    category: 'campus',
    categoryLabel: 'School Environment',
    imageUrl: IMAGES.seniorSchoolFront,
    caption: 'The main Gideon Senior School administrative and academic building with distinctive blue roofing and manicured hedges.',
    altText: 'Gideon Senior School building with official school sign and crest',
  },
  {
    id: 'gal-2',
    title: 'Senior Secondary Learners Cohort',
    category: 'jss',
    categoryLabel: 'Senior Secondary',
    imageUrl: IMAGES.seniorStudents,
    caption: 'Senior Secondary students in their smart royal blue school uniforms on the green campus grounds.',
    altText: 'Gideons School senior students in royal blue school uniform standing together on the grass',
  },
  {
    id: 'gal-3',
    title: 'Primary School Learners Assembly',
    category: 'primary',
    categoryLabel: 'Primary School',
    imageUrl: IMAGES.primaryStudents,
    caption: 'Primary school learners proudly gathered on the lawn in their burgundy school sweaters and checked uniform.',
    altText: 'Primary school students in burgundy sweaters and plaid uniform on the school grounds',
  },
  {
    id: 'gal-4',
    title: 'Digital Literacy & Computer Laboratory',
    category: 'campus',
    categoryLabel: 'Classroom & Labs',
    imageUrl: IMAGES.computerLab,
    caption: 'Our fully equipped computer laboratory with desktop workstations supporting digital learning and computer studies.',
    altText: 'Spacious computer laboratory with rows of desktop computers and blue chairs at Gideons School',
  },
  {
    id: 'gal-5',
    title: 'Girls Boarding Dormitory',
    category: 'campus',
    categoryLabel: 'Boarding Facilities',
    imageUrl: IMAGES.girlsDormitory,
    caption: 'Secure, clean, and welcoming boarding accommodations at the Girls Dormitory surrounded by landscaped lawns.',
    altText: 'Girls Dormitory building at Gideons School with manicured lawns and blue double doors',
  },
  {
    id: 'gal-6',
    title: 'Central Quadrangle & Courtyard',
    category: 'campus',
    categoryLabel: 'School Environment',
    imageUrl: IMAGES.quadrangleTree,
    caption: 'The serene central school quadrangle with a grand shade tree, manicured hedges, and classroom wings.',
    altText: 'Wide view of Gideons School quadrangle and lush green tree under clear blue sky',
  },
  {
    id: 'gal-7',
    title: 'Hands-on Computer Workstations',
    category: 'campus',
    categoryLabel: 'Classroom & Labs',
    imageUrl: IMAGES.computerWorkstations,
    caption: 'Close-up of dedicated workstations for practical ICT, programming basics, and educational research.',
    altText: 'Computer lab workstations with desktop PC, keyboard, mouse and monitors',
  },
  {
    id: 'gal-8',
    title: 'Junior Secondary School Students',
    category: 'jss',
    categoryLabel: 'Junior Secondary',
    imageUrl: IMAGES.juniorStudents,
    caption: 'Junior school learners in their grey school sweaters and black trousers/skirts on campus grounds.',
    altText: 'Junior secondary students in grey school sweaters gathered outside on the lawn',
  },
  {
    id: 'gal-9',
    title: 'Brick Classroom Wings & Walkways',
    category: 'campus',
    categoryLabel: 'School Environment',
    imageUrl: IMAGES.classroomWing,
    caption: 'Clean, well-ventilated single-story classroom wings featuring vibrant orange brick and blue window trims.',
    altText: 'Classroom wing with orange brick finish and blue doors at Gideons School',
  },
  {
    id: 'gal-10',
    title: 'Landscaped Academic Blocks',
    category: 'campus',
    categoryLabel: 'School Environment',
    imageUrl: IMAGES.classroomHedges,
    caption: 'Beautifully maintained green hedges and pristine lawns along the classroom verandas.',
    altText: 'Landscaped classroom veranda with trimmed yellow-green hedges and grass',
  },
  {
    id: 'gal-11',
    title: 'Expansive Campus Grounds',
    category: 'campus',
    categoryLabel: 'School Environment',
    imageUrl: IMAGES.schoolGrounds,
    caption: 'Spacious, peaceful school grounds providing a calm and healthy atmosphere for learning and recreation.',
    altText: 'Expansive school courtyard and buildings of Gideons School',
  },
];

// Seed news and announcements
const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: '2026 Academic Year: Continuous Admissions Open for All Levels',
    slug: '2026-admissions-open',
    category: 'Admissions',
    publicationDate: 'October 15, 2026',
    summary:
      'Gideons School invites prospective parents and guardians to submit admission applications for ECD, Primary, and Junior Secondary School cohorts.',
    content:
      'We are pleased to announce that admission applications for the upcoming academic terms are now officially open. Parents seeking places in Early Childhood Development (Playgroup, PP1, PP2), Primary School (Grades 1–6), and Junior Secondary School (Grades 7–9) are encouraged to apply early. Our admissions office is open on weekdays from 7:30 AM to 4:30 PM for campus tours and family consultations.',
    imageUrl: IMAGES.seniorSchoolFront,
    featured: true,
  },
  {
    id: 'news-2',
    title: 'Digital Literacy & Computer Studies Laboratory Expansion',
    slug: 'computer-studies-lab-expansion',
    category: 'Academics',
    publicationDate: 'November 2, 2026',
    summary:
      'New desktop workstations installed to enhance practical ICT skills, digital research, and programming fundamentals for all learners.',
    content:
      'In alignment with Kenya’s Competency-Based Education framework, Gideons School has expanded its dedicated computer laboratory. Learners from Grade 4 through Senior Secondary engage in structured weekly computer practicals, learning touch typing, office suites, educational software, and responsible digital citizenship.',
    imageUrl: IMAGES.computerLab,
    featured: true,
  },
  {
    id: 'news-3',
    title: 'Campus Life & Serene Learning Environment Updates',
    slug: 'campus-environment-updates',
    category: 'Co-Curricular',
    publicationDate: 'November 20, 2026',
    summary:
      'Our peaceful courtyard, manicured green lawns, and clean boarding facilities provide an ideal setting for student growth.',
    content:
      'Holistic education flourishes in a calm, secure, and disciplined physical environment. Our manicured gardens, central shade tree courtyard, and well-maintained classroom wings support focused study, team activities, and student well-being.',
    imageUrl: IMAGES.quadrangleTree,
    featured: true,
  },
];

// Initial realistic application seed
const INITIAL_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'app-seed-1',
    referenceNumber: 'GID-2026-1042',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: 'Under Review',
    parentName: 'Mary Wanjiku Mwangi',
    parentRelationship: 'Mother',
    parentPhone: '+254 722 123 456',
    parentEmail: 'm.mwangi@example.co.ke',
    preferredContactMethod: 'phone',
    learnerFullName: 'Ethan Mwangi',
    learnerDob: '2014-04-12',
    learnerGender: 'male',
    currentSchool: 'Nearby Academy',
    currentClass: 'Grade 6',
    requestedLevel: 'junior-secondary',
    requestedGrade: 'Grade 7 (JSS)',
    attendanceType: 'day-scholar',
    preferredAdmissionPeriod: 'Term 1 (January Intake)',
    messageToAdmissions:
      'We are looking for a school with dedicated teachers for Junior Secondary and strong values education.',
    learningSupportNeeds: 'None reported. Active in football and science clubs.',
    hasDocumentsToPresent: true,
    confirmedAccurate: true,
    privacyConsentAcknowledged: true,
    marketingConsent: true,
    internalNotes: 'Contacted parent via phone on 2nd Nov. Birth certificate verified; invited for orientation.',
    reviewedBy: 'Admissions Officer',
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'app-seed-2',
    referenceNumber: 'GID-2026-2189',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'Received',
    parentName: 'David Kiprono Cheruiyot',
    parentRelationship: 'Father',
    parentPhone: '+254 710 987 654',
    parentEmail: 'dcheruiyot@example.com',
    preferredContactMethod: 'whatsapp',
    learnerFullName: 'Faith Cherop Kiprono',
    learnerDob: '2021-08-19',
    learnerGender: 'female',
    currentSchool: 'Home Care',
    currentClass: 'Playgroup',
    requestedLevel: 'ecd',
    requestedGrade: 'PP1 (Pre-Primary 1)',
    attendanceType: 'boarder',
    preferredAdmissionPeriod: 'Term 1 (January Intake)',
    messageToAdmissions:
      'We would like our daughter to join a caring, play-based ECD centre close to home.',
    hasDocumentsToPresent: false,
    confirmedAccurate: true,
    privacyConsentAcknowledged: true,
    marketingConsent: false,
  },
];

export const storage = {
  // --- Config ---
  getConfig(): SchoolConfig {
    try {
      const data = localStorage.getItem(KEYS.CONFIG);
      if (!data) return defaultSchoolConfig;
      const parsed = JSON.parse(data);
      // Migrate if old placeholder values or old school name exist in local storage
      if (
        !parsed.phone ||
        parsed.phone.includes('000 000') ||
        parsed.schoolName !== 'GIdeons Schools' ||
        !parsed.seniorSecondaryMotto ||
        !parsed.logoUrl ||
        parsed.physicalAddress?.includes('[Verified Location Placeholder]') ||
        parsed.physicalAddress?.includes('School Road') ||
        !parsed.googleMapsUrl?.includes('Gideons+children+home+Ramba') ||
        parsed.emailAdmissions?.includes('gideonsschool.ac.ke')
      ) {
        localStorage.setItem(KEYS.CONFIG, JSON.stringify(defaultSchoolConfig));
        return defaultSchoolConfig;
      }
      return { ...defaultSchoolConfig, ...parsed };
    } catch {
      return defaultSchoolConfig;
    }
  },

  saveConfig(config: Partial<SchoolConfig>): SchoolConfig {
    const current = this.getConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(updated));
    return updated;
  },

  // --- Applications ---
  getApplications(): AdmissionApplication[] {
    try {
      const data = localStorage.getItem(KEYS.APPLICATIONS);
      if (!data) {
        localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  },

  getApplicationByRef(ref: string): AdmissionApplication | undefined {
    const list = this.getApplications();
    return list.find(
      (a) => a.referenceNumber.trim().toUpperCase() === ref.trim().toUpperCase()
    );
  },

  submitApplication(data: Omit<AdmissionApplication, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): AdmissionApplication {
    const list = this.getApplications();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newApp: AdmissionApplication = {
      ...data,
      id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      referenceNumber: `GID-2026-${randomDigits}`,
      createdAt: new Date().toISOString(),
      status: 'Received',
    };

    const updated = [newApp, ...list];
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(updated));
    return newApp;
  },

  updateApplication(id: string, updates: Partial<AdmissionApplication>): AdmissionApplication | null {
    const list = this.getApplications();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updatedItem: AdmissionApplication = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    list[index] = updatedItem;
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(list));
    return updatedItem;
  },

  deleteApplication(id: string): boolean {
    const list = this.getApplications();
    const filtered = list.filter((a) => a.id !== id);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(filtered));
    return true;
  },

  // --- Enquiries ---
  getEnquiries(): ContactEnquiry[] {
    try {
      const data = localStorage.getItem(KEYS.ENQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  submitEnquiry(data: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): ContactEnquiry {
    const list = this.getEnquiries();
    const newEnquiry: ContactEnquiry = {
      ...data,
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    const updated = [newEnquiry, ...list];
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(updated));
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: 'New' | 'Responded' | 'Archived'): boolean {
    const list = this.getEnquiries();
    const item = list.find((e) => e.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(list));
      return true;
    }
    return false;
  },

  // --- Newsletters ---
  getSubscribers(): NewsletterSubscriber[] {
    try {
      const data = localStorage.getItem(KEYS.SUBSCRIBERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  subscribeNewsletter(email: string, firstName?: string): { success: boolean; message: string } {
    const cleanEmail = email.trim().toLowerCase();
    const list = this.getSubscribers();
    const existing = list.find((s) => s.email.toLowerCase() === cleanEmail);

    if (existing) {
      if (existing.status === 'Active') {
        return {
          success: true,
          message: 'You are already subscribed to the Gideons School newsletter.',
        };
      } else {
        existing.status = 'Active';
        existing.subscribedAt = new Date().toISOString();
        localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(list));
        return {
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.',
        };
      }
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `sub_${Date.now()}`,
      email: cleanEmail,
      firstName: firstName?.trim(),
      subscribedAt: new Date().toISOString(),
      status: 'Active',
      consentAcknowledged: true,
    };

    const updated = [newSubscriber, ...list];
    localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(updated));
    return {
      success: true,
      message: 'Thank you for subscribing! You will receive school updates and announcements.',
    };
  },

  unsubscribeNewsletter(email: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    const list = this.getSubscribers();
    const existing = list.find((s) => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      existing.status = 'Unsubscribed';
      localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(list));
      return true;
    }
    return false;
  },

  // --- News & Announcements ---
  getNews(): NewsArticle[] {
    try {
      const data = localStorage.getItem(KEYS.NEWS);
      if (!data) {
        localStorage.setItem(KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
        return INITIAL_NEWS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_NEWS;
    }
  },

  // --- CSV Export Helper ---
  exportApplicationsCSV(): string {
    const applications = this.getApplications();
    const headers = [
      'Reference Number',
      'Submission Date',
      'Status',
      'Learner Name',
      'Requested Level',
      'Requested Grade',
      'Attendance Type',
      'Preferred Intake',
      'Parent Name',
      'Relationship',
      'Parent Phone',
      'Parent Email',
      'Contact Method',
      'Internal Notes',
    ];

    const rows = applications.map((a) => [
      `"${a.referenceNumber}"`,
      `"${new Date(a.createdAt).toLocaleDateString()}"`,
      `"${a.status}"`,
      `"${a.learnerFullName.replace(/"/g, '""')}"`,
      `"${a.requestedLevel}"`,
      `"${a.requestedGrade}"`,
      `"${a.attendanceType === 'boarder' ? 'Boarder (Boarding)' : 'Day Scholar'}"`,
      `"${a.preferredAdmissionPeriod}"`,
      `"${a.parentName.replace(/"/g, '""')}"`,
      `"${a.parentRelationship}"`,
      `"${a.parentPhone}"`,
      `"${a.parentEmail || ''}"`,
      `"${a.preferredContactMethod}"`,
      `"${(a.internalNotes || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
