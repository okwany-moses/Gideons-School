import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { SchoolConfig } from '../types';

interface PrivacyPageProps {
  config: SchoolConfig;
  onNavigate: (tab: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ config, onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Regulatory & Legal Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Privacy Policy & Child Safety Statement
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            In compliance with the Kenya Data Protection Act, 2019, and applicable child safeguarding regulations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Data Protection Commitment:</strong>
              <p className="mt-0.5">
                Gideons School is registered and complies with the Kenya Data Protection Act, No. 24 of 2019. We are committed to safeguarding the personal data of our learners, parents, guardians, and website visitors.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              1. Principles of Personal Data Processing
            </h2>
            <p>
              In accordance with Section 25 of the Kenya Data Protection Act, 2019, personal data collected by Gideons School is:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Processed lawfully, fairly, and in a transparent manner.</li>
              <li>Collected for explicit, specified, and legitimate educational and administrative purposes.</li>
              <li>Adequate, relevant, and limited to what is strictly necessary (data minimisation).</li>
              <li>Kept accurate and up to date.</li>
              <li>Retained for no longer than is necessary for the purposes of education record-keeping.</li>
              <li>Protected against unauthorised access, disclosure, or accidental destruction.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              2. Special Safeguards for Children's Personal Data
            </h2>
            <p>
              Under Section 33 of the Act, processing of personal data relating to a child (a person under 18 years of age) is undertaken only with the prior consent of the child’s parent or legal guardian.
            </p>
            <p>
              When parents submit an admission application:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>We collect the learner’s full name, date of birth, gender, and prior academic grade purely for age-appropriate class placement and assessment preparation.</li>
              <li>We never publish children’s contact details, residential addresses, or sensitive health records online.</li>
              <li>School photographs and media containing identifiable faces of learners are published on this website only with explicit, written parental consent. Parents may withdraw photo consent at any time by notifying the school administration.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              3. Categories of Information We Collect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-slate-900">Parent / Guardian Information:</strong>
                <span>Full name, relationship to child, phone number, email address, and communication preference.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-slate-900">Learner Information:</strong>
                <span>Full legal name, date of birth, gender, previous school and grade, requested entry level, and learning support notes.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-slate-900">General Enquiries:</strong>
                <span>Name, telephone or email, message subject, and submitted inquiry text.</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-slate-900">Electronic Newsletters:</strong>
                <span>Email address and optional first name, maintained separately with instant unsubscribe capabilities.</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              4. Access Control & Security
            </h2>
            <p>
              Admission records and family contact information are stored securely within the school’s administrative system. Access is strictly limited to authorised admissions personnel, the Head of School, and designated academic coordinators.
            </p>
            <p>
              We do not sell, rent, commercialise, or share personal or learner information with third-party advertisers or unverified external entities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              5. Your Rights as a Data Subject
            </h2>
            <p>
              Under Part IV of the Kenya Data Protection Act, 2019, parents and guardians have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Request access to personal data held about themselves and their child.</li>
              <li>Request correction of inaccurate or outdated information.</li>
              <li>Request deletion or erasure of personal data no longer required for educational compliance.</li>
              <li>Object to processing of data for marketing or non-essential purposes.</li>
              <li>Withdraw consent previously granted for optional communications or website media.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              6. Privacy Officer Contact
            </h2>
            <p>
              To exercise your data protection rights, request information updates, or submit a privacy query, please write to:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-700">
              <div><strong>Data Protection & Admissions Desk</strong></div>
              <div>{config.schoolName}</div>
              <div>Email: {config.emailAdmissions}</div>
              <div>Postal: {config.postalAddress}</div>
              <div>Telephone: {config.phone}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Last reviewed: November 2026 · Official Gideons School Policy
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-semibold text-[#0F2744] hover:underline"
            >
              Contact Data Protection Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
