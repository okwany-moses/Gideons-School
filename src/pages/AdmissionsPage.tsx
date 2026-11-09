import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lock,
  ArrowRight,
  Clock,
  Phone,
  Mail,
  User,
  GraduationCap,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { SchoolConfig, EducationLevelId, AdmissionApplication } from '../types';
import { storage } from '../services/storage';

interface AdmissionsPageProps {
  config: SchoolConfig;
  onNavigate: (tab: string, context?: any) => void;
  initialLevel?: EducationLevelId;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  config,
  onNavigate,
  initialLevel,
}) => {
  // Active view: 'apply' or 'track'
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');

  // Form State
  const [parentName, setParentName] = useState('');
  const [parentRelationship, setParentRelationship] = useState('Mother');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');

  const [learnerFullName, setLearnerFullName] = useState('');
  const [learnerDob, setLearnerDob] = useState('');
  const [learnerGender, setLearnerGender] = useState<'male' | 'female' | 'prefer-not-to-say'>('male');
  const [currentSchool, setCurrentSchool] = useState('');
  const [currentClass, setCurrentClass] = useState('');
  const [requestedLevel, setRequestedLevel] = useState<EducationLevelId>(initialLevel || 'junior-secondary');
  const [requestedGrade, setRequestedGrade] = useState('Grade 7 (JSS)');
  const [attendanceType, setAttendanceType] = useState<'day-scholar' | 'boarder'>('day-scholar');
  const [preferredAdmissionPeriod, setPreferredAdmissionPeriod] = useState('Term 1 (January Intake 2026)');

  const [messageToAdmissions, setMessageToAdmissions] = useState('');
  const [learningSupportNeeds, setLearningSupportNeeds] = useState('');
  const [hasDocumentsToPresent, setHasDocumentsToPresent] = useState(false);

  const [confirmedAccurate, setConfirmedAccurate] = useState(false);
  const [privacyConsentAcknowledged, setPrivacyConsentAcknowledged] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submittedApplication, setSubmittedApplication] = useState<AdmissionApplication | null>(null);

  // Status Tracker State
  const [trackRef, setTrackRef] = useState('');
  const [searchedRef, setSearchedRef] = useState(false);
  const [trackedApplication, setTrackedApplication] = useState<AdmissionApplication | null>(null);

  // Dynamic Grade Options based on requested level
  const getGradeOptions = (level: EducationLevelId) => {
    switch (level) {
      case 'ecd':
        return ['Playgroup (Ages 3)', 'PP1 (Pre-Primary 1, Age 4)', 'PP2 (Pre-Primary 2, Age 5)'];
      case 'primary':
        return [
          'Grade 1',
          'Grade 2',
          'Grade 3',
          'Grade 4',
          'Grade 5',
          'Grade 6 (KPSEA Candidate Class)',
        ];
      case 'junior-secondary':
        return ['Grade 7 (JSS Year 1)', 'Grade 8 (JSS Year 2)', 'Grade 9 (JSS KJSEA Year)'];
      case 'senior-secondary':
        return ['Grade 10 (SSS Year 1)', 'Grade 11 (SSS Year 2)', 'Grade 12 (SSS Year 3)'];
      default:
        return [];
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!parentName.trim()) {
      setFormError('Please provide the full name of the parent or guardian.');
      return;
    }
    if (!parentPhone.trim()) {
      setFormError('Please provide a valid phone number for communication.');
      return;
    }
    if (!learnerFullName.trim()) {
      setFormError('Please enter the full legal name of the learner.');
      return;
    }
    if (!confirmedAccurate) {
      setFormError('You must confirm that the submitted information is accurate.');
      return;
    }
    if (!privacyConsentAcknowledged) {
      setFormError('You must acknowledge the privacy notice and consent under the Kenya Data Protection Act, 2019.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newApp = storage.submitApplication({
        parentName: parentName.trim(),
        parentRelationship,
        parentPhone: parentPhone.trim(),
        parentEmail: parentEmail.trim() || undefined,
        preferredContactMethod,
        learnerFullName: learnerFullName.trim(),
        learnerDob: learnerDob || undefined,
        learnerGender,
        currentSchool: currentSchool.trim() || undefined,
        currentClass: currentClass.trim() || undefined,
        requestedLevel,
        requestedGrade,
        attendanceType,
        preferredAdmissionPeriod,
        messageToAdmissions: messageToAdmissions.trim() || undefined,
        learningSupportNeeds: learningSupportNeeds.trim() || undefined,
        hasDocumentsToPresent,
        confirmedAccurate: true,
        privacyConsentAcknowledged: true,
        marketingConsent,
      });

      setSubmittedApplication(newApp);
      setIsSubmitting(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch {
      setIsSubmitting(false);
      setFormError('An unexpected error occurred while saving the application. Please try again.');
    }
  };

  // Application tracker handler
  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedRef(true);
    if (!trackRef.trim()) {
      setTrackedApplication(null);
      return;
    }
    const app = storage.getApplicationByRef(trackRef.trim());
    setTrackedApplication(app || null);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Official Admissions Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Join the Gideons School Community
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            We welcome enquiries from parents and guardians interested in learning more about admission opportunities at Gideons School. Submit an application or contact our admissions team for guidance on the next steps.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === 'apply'
                  ? 'bg-amber-400 text-[#0F2744]'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              New Application Form
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === 'track'
                  ? 'bg-amber-400 text-[#0F2744]'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              Track Application Status
            </button>
          </div>
        </div>
      </section>

      {/* 9.A: Admission Process (Simple 4-Step Process) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Step-by-Step
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">
            Our 4-Step Admission Process
          </h2>
          <p className="text-xs text-slate-600">
            A transparent and structured pathway from initial enquiry to learner enrolment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 01',
              title: 'Explore & Choose Level',
              desc: 'Review our academic programmes across ECD, Primary, Junior or Senior Secondary and select the requested grade.',
            },
            {
              step: 'Step 02',
              title: 'Complete Application',
              desc: 'Submit the online admission form with verified parent and learner details to receive a unique reference code.',
            },
            {
              step: 'Step 03',
              title: 'Admissions Review',
              desc: 'The school admissions team reviews learner records, verifies capacity, and contacts the family for an interview or visit.',
            },
            {
              step: 'Step 04',
              title: 'Decision & Enrolment',
              desc: 'Receive formal admission feedback, required document guidelines, fee structure schedule, and uniform details.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-2 relative"
            >
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                {item.step}
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 italic">
          * Please note: Submitting an admission application signals your intent to join Gideons School but does not automatically guarantee admission. Placement depends on vacancy and review.
        </div>
      </section>

      {/* Main Mode: Apply vs Track */}
      {activeTab === 'track' ? (
        /* Application Status Tracking View */
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Application Status
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">
                Check Your Application Progress
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Enter your unique application reference number (e.g., GID-2026-1042) to view the latest review status.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                required
                value={trackRef}
                onChange={(e) => setTrackRef(e.target.value)}
                placeholder="e.g. GID-2026-1042"
                className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] uppercase tracking-wider font-mono font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#0F2744] hover:bg-[#163860] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {searchedRef && (
              <div>
                {trackedApplication ? (
                  <div className="mt-6 p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-xs text-slate-500">Reference Number</span>
                        <div className="font-mono text-base font-bold text-[#0F2744]">
                          {trackedApplication.referenceNumber}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Current Status</span>
                        <div className="inline-block mt-0.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                          {trackedApplication.status}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-400 block">Learner Name:</span>
                        <strong>{trackedApplication.learnerFullName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Requested Grade:</span>
                        <strong>{trackedApplication.requestedGrade}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Attendance Type:</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          trackedApplication.attendanceType === 'boarder'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {trackedApplication.attendanceType === 'boarder' ? 'Boarder (Boarding Residency)' : 'Day Scholar (Day Student)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Intake Period:</span>
                        <span>{trackedApplication.preferredAdmissionPeriod}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Submitted On:</span>
                        <span>{new Date(trackedApplication.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {trackedApplication.internalNotes && (
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                        <strong className="block text-slate-800 mb-1">Admissions Desk Note:</strong>
                        <p className="text-slate-600">{trackedApplication.internalNotes}</p>
                      </div>
                    )}

                    <div className="pt-2 text-[11px] text-slate-500">
                      If you need to update any information or have questions regarding this application, please call our admissions office at <strong>{config.phone}</strong>.
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 p-6 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>Application Record Not Found</span>
                    </div>
                    <p>
                      We could not find an application matching "<strong>{trackRef}</strong>". Please verify the reference number or contact the school admissions desk directly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      ) : submittedApplication ? (
        /* Submission Success Confirmation View */
        <section className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-lg space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                Application Successfully Received
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                Thank You, {submittedApplication.parentName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Your admission application for <strong>{submittedApplication.learnerFullName}</strong> has been securely logged into the {config.schoolName} Admissions Register.
              </p>
            </div>

            {/* Reference Number & Summary Card */}
            <div className="bg-[#0F2744] text-white p-6 rounded-xl text-center space-y-3">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Your Official Application Reference Number
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-white">
                {submittedApplication.referenceNumber}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1 bg-white/10 rounded-full text-slate-200">
                  {submittedApplication.requestedGrade}
                </span>
                <span className={`px-3 py-1 rounded-full font-semibold ${
                  submittedApplication.attendanceType === 'boarder'
                    ? 'bg-amber-400 text-[#0F2744]'
                    : 'bg-emerald-400 text-emerald-950'
                }`}>
                  {submittedApplication.attendanceType === 'boarder' ? 'Boarder (Boarding)' : 'Day Scholar'}
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-slate-200">
                  {submittedApplication.preferredAdmissionPeriod}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] pt-1">
                Please note or take a screenshot of this reference. You can use it to track your admission status anytime.
              </p>
            </div>

            {/* Next Steps Guidance */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                <li>Our admissions team will review the learner’s requested grade (<strong>{submittedApplication.requestedGrade}</strong>) and placement option (<strong>{submittedApplication.attendanceType === 'boarder' ? 'Boarder' : 'Day Scholar'}</strong>).</li>
                <li>We will contact you via <strong>{submittedApplication.preferredContactMethod.toUpperCase()}</strong> at <strong>{submittedApplication.parentPhone}</strong>.</li>
                <li>You will be invited for an informal learner interaction and campus tour.</li>
                <li>Upon verified vacancy, formal admission documents and fee schedules will be issued.</li>
              </ol>
            </div>

            {/* Direct Admissions Helpline Support */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <strong className="block text-amber-900 font-bold">Have an urgent question regarding this application?</strong>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  Admissions Office: {config.phone} / {config.phoneSecondary} | {config.emailAdmissions}
                </p>
                <p className="text-slate-500 text-[10px]">
                  Location: {config.physicalAddress}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="tel:0181910714"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold rounded-lg text-xs transition-colors shadow-sm"
                >
                  Call 0181910714
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSubmittedApplication(null);
                  setTrackRef(submittedApplication.referenceNumber);
                  setActiveTab('track');
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0F2744] hover:bg-[#163860] text-white text-xs font-semibold rounded-md transition-colors"
              >
                Track This Application
              </button>
              <button
                onClick={() => {
                  setSubmittedApplication(null);
                  setLearnerFullName('');
                  setLearnerDob('');
                  setCurrentSchool('');
                  setConfirmedAccurate(false);
                  setPrivacyConsentAcknowledged(false);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* 9.B: Comprehensive Online Application Form */
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-10 space-y-8">
            <div className="border-b border-slate-200 pb-5">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Online Admission Application
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">
                Learner Enrolment Form
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Please provide accurate details in the four sections below. Fields marked with an asterisk (*) are mandatory.
              </p>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1: Parent or Guardian Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#0F2744] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Parent or Guardian Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Parent / Guardian Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. John Kamau"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Relationship to Learner *
                    </label>
                    <select
                      value={parentRelationship}
                      onChange={(e) => setParentRelationship(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Sponsor / Relative">Sponsor / Relative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Primary Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="e.g. +254 700 123 456"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="e.g. parent@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4 text-xs">
                    {(['phone', 'whatsapp', 'email'] as const).map((method) => (
                      <label key={method} className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={preferredContactMethod === method}
                          onChange={() => setPreferredContactMethod(method)}
                          className="text-[#0F2744] focus:ring-[#0F2744]"
                        />
                        <span className="capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Learner Information */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#0F2744] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Learner Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Learner Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={learnerFullName}
                      onChange={(e) => setLearnerFullName(e.target.value)}
                      placeholder="As on birth certificate"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={learnerGender}
                      onChange={(e) => setLearnerGender(e.target.value as any)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={learnerDob}
                      onChange={(e) => setLearnerDob(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Current School (if applicable)
                    </label>
                    <input
                      type="text"
                      value={currentSchool}
                      onChange={(e) => setCurrentSchool(e.target.value)}
                      placeholder="Current or previous school"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Current Class / Grade
                    </label>
                    <input
                      type="text"
                      value={currentClass}
                      onChange={(e) => setCurrentClass(e.target.value)}
                      placeholder="e.g. Grade 6, PP2"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Requested Entry Level *
                    </label>
                    <select
                      value={requestedLevel}
                      onChange={(e) => {
                        const newLvl = e.target.value as EducationLevelId;
                        setRequestedLevel(newLvl);
                        const grades = getGradeOptions(newLvl);
                        if (grades.length > 0) setRequestedGrade(grades[0]);
                      }}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      <option value="ecd">Early Childhood (ECD)</option>
                      <option value="primary">Primary School (CBC)</option>
                      <option value="junior-secondary">Junior Secondary (JSS CBE)</option>
                      <option value="senior-secondary">Senior Secondary (SSS CBE)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Requested Class / Grade *
                    </label>
                    <select
                      value={requestedGrade}
                      onChange={(e) => setRequestedGrade(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      {getGradeOptions(requestedLevel).map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Preferred Admission Period *
                    </label>
                    <select
                      value={preferredAdmissionPeriod}
                      onChange={(e) => setPreferredAdmissionPeriod(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      <option value="Term 1 (January Intake 2026)">Term 1 (January Intake 2026)</option>
                      <option value="Term 2 (May Intake 2026)">Term 2 (May Intake 2026)</option>
                      <option value="Term 3 (September Intake 2026)">Term 3 (September Intake 2026)</option>
                      <option value="Immediate Mid-Term Transfer">Immediate Mid-Term Transfer</option>
                    </select>
                  </div>
                </div>

                {/* Attendance Type Selection: Day Scholar vs Boarder */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Learner Attendance & Boarding Status *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2.5">
                    GIdeons Schools offers both day school and full boarding residency. Please select the intended option for this learner:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendanceType('day-scholar')}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        attendanceType === 'day-scholar'
                          ? 'border-[#0F2744] bg-[#0F2744]/5 ring-2 ring-[#0F2744]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          Day Scholar (Day Student)
                        </span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          attendanceType === 'day-scholar'
                            ? 'border-[#0F2744] bg-[#0F2744]'
                            : 'border-slate-300'
                        }`}>
                          {attendanceType === 'day-scholar' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Daily commuting learner. Ideal for families residing near Ramba Market, Kabondo Kasipul, Mawego, Oyugis, and surrounding local areas.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendanceType('boarder')}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        attendanceType === 'boarder'
                          ? 'border-amber-600 bg-amber-500/5 ring-2 ring-amber-600'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Boarder (Full Boarding)</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Residency</span>
                        </span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          attendanceType === 'boarder'
                            ? 'border-amber-600 bg-amber-600'
                            : 'border-slate-300'
                        }`}>
                          {attendanceType === 'boarder' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Full boarding student residing in secure, well-equipped dormitories with 24/7 care, structured evening prep, and balanced nutrition.
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Additional Information */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#0F2744] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Additional Information & Learning Support
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Brief Message to the Admissions Team
                  </label>
                  <textarea
                    rows={2}
                    value={messageToAdmissions}
                    onChange={(e) => setMessageToAdmissions(e.target.value)}
                    placeholder="Share any background, interests, or questions for our academic board..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Learning Support or Medical Considerations (Optional)
                  </label>
                  <input
                    type="text"
                    value={learningSupportNeeds}
                    onChange={(e) => setLearningSupportNeeds(e.target.value)}
                    placeholder="e.g. Allergies, dietary notes, reading guidance"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                  />
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="docs-check"
                    checked={hasDocumentsToPresent}
                    onChange={(e) => setHasDocumentsToPresent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744]"
                  />
                  <label htmlFor="docs-check" className="cursor-pointer">
                    <strong>I have required physical documents available for verification</strong>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Learner birth certificate copy, recent academic report cards, NEMIS/UPI details, and parent/guardian ID copy will be reviewed during the in-person admission session.
                    </span>
                  </label>
                </div>
              </div>

              {/* SECTION 4: Declaration and Consent */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-[#0F2744] text-white text-xs font-bold flex items-center justify-center">
                    4
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Declaration & Privacy Consent
                  </h3>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="confirm-acc"
                      required
                      checked={confirmedAccurate}
                      onChange={(e) => setConfirmedAccurate(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744]"
                    />
                    <label htmlFor="confirm-acc" className="text-xs text-slate-700 leading-tight">
                      <strong>Accuracy Confirmation *:</strong> I confirm that the information provided in this admission application is true, accurate, and complete to the best of my knowledge.
                    </label>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="confirm-priv"
                      required
                      checked={privacyConsentAcknowledged}
                      onChange={(e) => setPrivacyConsentAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744]"
                    />
                    <label htmlFor="confirm-priv" className="text-xs text-slate-700 leading-tight">
                      <strong>Kenya Data Protection Act, 2019 Notice *:</strong> I acknowledge the Gideons School Privacy Notice and consent to the collection and administrative processing of personal data concerning myself and the minor child solely for admission evaluation and school communication.
                    </label>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1 border-t border-slate-200/60">
                    <input
                      type="checkbox"
                      id="confirm-market"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744]"
                    />
                    <label htmlFor="confirm-market" className="text-[11px] text-slate-500 leading-tight">
                      (Optional) I agree to receive general school news, co-curricular highlights, and community updates via email or SMS.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500">
                  Submissions are encrypted and stored in the school’s admissions registry.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold text-sm rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0F2744]" />
                  <span>{isSubmitting ? 'Submitting Application...' : 'Submit Admission Application'}</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
