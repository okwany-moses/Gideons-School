export type EducationLevelId = 'ecd' | 'primary' | 'junior-secondary' | 'senior-secondary';

export type ApplicationStatus = 
  | 'Received' 
  | 'Under Review' 
  | 'Additional Information Required' 
  | 'Accepted' 
  | 'Declined';

export interface AdmissionApplication {
  id: string;
  referenceNumber: string; // e.g. GID-2026-4821
  createdAt: string;
  status: ApplicationStatus;
  
  // Section 1: Parent or Guardian Information
  parentName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail?: string;
  preferredContactMethod: 'phone' | 'email' | 'whatsapp';

  // Section 2: Learner Information
  learnerFullName: string;
  learnerDob?: string;
  learnerGender?: 'male' | 'female' | 'prefer-not-to-say';
  currentSchool?: string;
  currentClass?: string;
  requestedLevel: EducationLevelId;
  requestedGrade: string; // e.g. Grade 1, Grade 7 (JSS), Grade 10 (SSS), PP1
  attendanceType: 'day-scholar' | 'boarder'; // Day Scholar or Full Boarder
  preferredAdmissionPeriod: string; // e.g. Term 1 (January), Term 2 (May), Term 3 (September)

  // Section 3: Additional Information
  messageToAdmissions?: string;
  learningSupportNeeds?: string;
  hasDocumentsToPresent: boolean;

  // Section 4: Declaration & Consent
  confirmedAccurate: boolean;
  privacyConsentAcknowledged: boolean;
  marketingConsent?: boolean;

  // Internal Administrative Fields
  internalNotes?: string;
  reviewedBy?: string;
  updatedAt?: string;
}

export interface ContactEnquiry {
  id: string;
  createdAt: string;
  fullName: string;
  contactInfo: string; // phone or email
  email?: string;
  subject: string;
  educationLevelOfInterest?: string;
  attendanceType?: 'day-scholar' | 'boarder';
  message: string;
  consentToContact: boolean;
  status: 'New' | 'Responded' | 'Archived';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
  consentAcknowledged: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Announcements' | 'Admissions' | 'Academics' | 'Co-Curricular' | 'Events';
  publicationDate: string;
  summary: string;
  content: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'campus' | 'ecd' | 'primary' | 'jss' | 'sports' | 'arts';
  categoryLabel: string;
  imageUrl: string;
  caption: string;
  altText: string;
}

export interface SchoolConfig {
  schoolName: string;
  tagline: string;
  logoUrl?: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroSupportingLine: string;
  country: string;
  primaryColor: string; // Hex Navy
  accentColor: string;  // Hex Gold
  admissionsOpen: boolean;
  currentAdmissionSeason: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  emailAdmissions: string;
  whatsappNumber: string; // e.g. +254700000000
  physicalAddress: string;
  postalAddress: string;
  officeHoursWeekdays: string;
  officeHoursSaturdays: string;
  hasChristianValuesFocus: boolean;
  christianValuesStatement: string;
  county?: string;
  locationTitle?: string;
  locationDescription?: string;
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;

  // Senior Secondary Section Identity
  seniorSecondaryMotto: string;
  seniorSecondaryMission: string;
  seniorSecondaryVision: string;

  // Nursery (ECD) & Primary School Section Identity
  primaryMotto: string;
  primaryMission: string;
  primaryVision: string;
}
