import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Navigation,
  Compass,
  Bus,
} from 'lucide-react';
import { SchoolConfig } from '../types';
import { storage } from '../services/storage';

interface ContactPageProps {
  config: SchoolConfig;
  onNavigate: (tab: string, context?: any) => void;
  initialSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  config,
  onNavigate,
  initialSubject = '',
}) => {
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState(initialSubject || 'General Admission Enquiry');
  const [educationLevel, setEducationLevel] = useState('junior-secondary');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where is Gideons School located and how do I get there?',
      a: 'Gideons School is located at Gideons Children Home Ramba, off Kadongo-Mawego Road in Kabondo Kasipul, Homa Bay County, Kenya. We are conveniently situated to serve day scholars and boarding learners across Kabondo Kasipul, Oyugis, Mawego, Ringa, and surrounding regions. You can search "Gideons children home Ramba" on Google Maps or click "Open Google Maps" on this page for turn-by-turn driving directions.',
    },
    {
      q: 'How do I apply for admission for my child at Gideons School?',
      a: 'You can complete our simple 4-step online admission form on the Admissions page. Once submitted, you receive a reference code (e.g., GID-2026-XXXX) and our admissions team will contact you for an informal interaction and document review.',
    },
    {
      q: 'Which education levels and grades does Gideons School offer?',
      a: 'We offer Early Childhood Development (Playgroup, PP1, PP2), Primary School (Grades 1–6 CBC), Junior Secondary School (Grades 7–9 CBE), and Senior Secondary School (Grades 10–12 CBE).',
    },
    {
      q: 'How can parents obtain the current fee structure?',
      a: 'To ensure complete transparency and accuracy for each grade level, official fee structures and payment plans are provided directly by our accounts office upon submitting an enquiry or during your in-person campus visit.',
    },
    {
      q: 'Does Gideons School provide school bus transport?',
      a: 'Yes, we operate safe and supervised school transport covering designated routes across Kabondo Kasipul, Kadongo, Mawego, Oyugis, and surrounding areas. Contact our transport desk via 0181910714 or 0181983490 to verify your pickup route.',
    },
    {
      q: 'What are the official school office operating hours?',
      a: 'Our school administration and admissions desk is open Monday to Friday from 7:30 AM to 5:00 PM, and on Saturdays from 8:00 AM to 1:00 PM. We are closed on Sundays and national public holidays.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contactInfo.trim()) {
      setErrorMsg('Please enter your full name and phone or email address.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please acknowledge consent to be contacted regarding this message.');
      return;
    }

    setFormStatus('submitting');
    setErrorMsg('');

    try {
      storage.submitEnquiry({
        fullName: fullName.trim(),
        contactInfo: contactInfo.trim(),
        subject: subject.trim(),
        educationLevelOfInterest: educationLevel,
        message: message.trim() || 'No additional message provided.',
        consentToContact: true,
      });

      setFormStatus('success');
      setFullName('');
      setContactInfo('');
      setMessage('');
      setConsent(false);
    } catch {
      setFormStatus('error');
      setErrorMsg('Failed to send message. Please contact us directly via phone or WhatsApp.');
    }
  };

  const whatsappDirect = `https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${config.schoolName} Admissions, I would like to make an enquiry regarding enrolment.`
  )}`;

  return (
    <div className="space-y-16 pb-16">
      {/* Page Header */}
      <section className="bg-[#0F2744] text-white py-14 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
            Contact Gideons School
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Our admissions counselors and administrative staff are ready to guide you on enrolment, campus tours, and academic pathways.
          </p>
        </div>
      </section>

      {/* Main Contact Grid: Info Cards + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                Official School Contacts
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 text-xs">Physical Address</strong>
                    <p className="text-slate-800 font-medium mt-0.5">{config.physicalAddress}</p>
                    <a
                      href={config.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-800 font-semibold mt-1 underline"
                    >
                      <span>Open Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-slate-900 text-xs">Telephone Lines</strong>
                    <div className="flex flex-col gap-1 text-slate-700">
                      <a
                        href="tel:0181910714"
                        className="font-bold text-slate-900 hover:text-[#0F2744] flex items-center gap-1.5"
                      >
                        <span className="text-amber-700 font-normal">Primary:</span>
                        <span>0181910714</span>
                      </a>
                      <a
                        href="tel:0181983490"
                        className="font-bold text-slate-900 hover:text-[#0F2744] flex items-center gap-1.5"
                      >
                        <span className="text-amber-700 font-normal">Secondary:</span>
                        <span>0181983490</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 text-xs">Official Email</strong>
                    <a
                      href="mailto:admissions@gideonskenya.school"
                      className="text-slate-900 font-semibold hover:text-[#0F2744] block mt-0.5"
                    >
                      admissions@gideonskenya.school
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 text-xs">Office & Visiting Hours</strong>
                    <p className="text-slate-700 font-medium mt-0.5">Monday – Friday: 7:30 AM – 5:00 PM</p>
                    <p className="text-slate-700 font-medium">Saturday: 8:00 AM – 1:00 PM</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Closed on Sundays & Public Holidays</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/254181910714?text=${encodeURIComponent('Hello Gideons School Admissions, I would like to make an enquiry regarding enrolment.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Admissions on WhatsApp (0181910714)</span>
                </a>
              </div>
            </div>

            {/* Quick Admissions Shortcut Box */}
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-2 text-xs text-amber-950">
              <strong className="text-sm font-bold block text-amber-900">
                Ready to Apply?
              </strong>
              <p className="text-amber-900/90 leading-relaxed">
                Skip the general enquiry queue and fill out the official 4-step admission form to reserve a review spot for your child.
              </p>
              <button
                onClick={() => onNavigate('admissions')}
                className="mt-2 text-xs font-bold text-[#0F2744] hover:text-amber-800 flex items-center gap-1"
              >
                <span>Go to Admission Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                Online Message
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] mt-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Have a question or looking to schedule a campus tour? Fill out the details below.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Your Message Has Been Delivered!</span>
                </div>
                <p>
                  Thank you for reaching out to Gideons School. Your enquiry has been routed to our administrative team. We will contact you shortly using your provided details.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Samuel Mutua"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g. +254 700 000 000"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Admission Enquiry, Campus Tour"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Education Level of Interest
                    </label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50"
                    >
                      <option value="ecd">Early Childhood Development (Playgroup, PP1, PP2)</option>
                      <option value="primary">Primary School (Grades 1–6 CBC)</option>
                      <option value="junior-secondary">Junior Secondary School (Grades 7–9 CBE)</option>
                      <option value="senior-secondary">Senior Secondary School (Grades 10–12 CBE)</option>
                      <option value="general">General / Administrative Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include any specific questions regarding fees, term dates, or interview arrangements..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0F2744] bg-slate-50/50 resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0F2744] focus:ring-[#0F2744]"
                  />
                  <label htmlFor="contact-consent" className="text-[11px] text-slate-600 leading-tight">
                    I consent to Gideons School storing my contact details solely to respond to this inquiry in accordance with the Kenya Data Protection Act, 2019.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="px-6 py-3 bg-[#0F2744] hover:bg-[#163860] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formStatus === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Homa Bay County Location & Directions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0F2744] via-[#163860] to-[#0A1A2E] text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-md text-amber-300 text-xs font-semibold tracking-wide uppercase">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Homa Bay County Location</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-white">
                {config.locationTitle || "Gideons Children Home Ramba (GIdeons Schools)"}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {config.locationDescription || "Located at Gideons Children Home Ramba, off Kadongo-Mawego Road in Kabondo Kasipul, Homa Bay County. Conveniently situated for day scholars and boarders across Kabondo Kasipul, Mawego, Kadongo, Oyugis, Ringa, and neighbouring communities."}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={config.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-[#0F2744] font-bold rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group text-sm"
                >
                  <MapPin className="w-5 h-5 text-[#0F2744]" />
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="tel:0181910714"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all inline-flex items-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call 0181910714</span>
                </a>

                <a
                  href="tel:0181983490"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all inline-flex items-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call 0181983490</span>
                </a>

                <a
                  href={`https://wa.me/254181910714?text=${encodeURIComponent('Hello GIdeons Schools Admissions, I would like directions to Gideons Children Home Ramba off Kadongo-Mawego road.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all inline-flex items-center gap-2 text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Directions via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Interactive Google Map */}
          <div className="relative w-full bg-slate-100 border-t border-slate-200">
            <div className="p-3 bg-amber-50/80 border-b border-amber-200/60 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-900 gap-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-medium">
                  <strong>Interactive Map:</strong> Gideons Children Home Ramba (GIdeons Schools), off Kadongo-Mawego Road, Kabondo Kasipul, Homa Bay County
                </span>
              </div>
              <a
                href={config.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Gideons+children+home+Ramba"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 hover:text-amber-950 font-bold underline shrink-0 inline-flex items-center gap-1"
              >
                <span>Full Screen Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              title="Gideons Children Home Ramba Google Map Location"
              src={config.googleMapsEmbedUrl || "https://maps.google.com/maps?q=Gideons+children+home+Ramba&t=&z=15&ie=UTF8&iwloc=&output=embed"}
              className="w-full h-80 sm:h-96 md:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Regional Reach & Transit Information */}
          <div className="p-8 sm:p-12 bg-slate-50/70 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Navigation className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 font-['Outfit'] text-sm">
                  Kabondo Kasipul
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct central access for day scholars and families from Kabondo Kasipul constituency and surrounding trading centres.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-700 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 font-['Outfit'] text-sm">
                  Off Kadongo Mawego Road
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Situated along the Kadongo – Mawego arterial road, with well-connected tarmac and all-weather road access directly to our gates.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                  <Bus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 font-['Outfit'] text-sm">
                  Oyugis & Mawego
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Convenient transit from Oyugis town, Mawego Technical area, Ringa, and Chabera junction with coordinated student transport.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 font-['Outfit'] text-sm">
                  Visiting & Office Hours
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Monday – Friday: 7:30 AM – 5:00 PM<br />
                  Saturday: 8:00 AM – 1:00 PM<br />
                  Admissions desk open for campus tours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Answers for Parents
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600">
            Common questions regarding admissions, curriculum, fees, and daily school life.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-['Outfit'] font-bold text-slate-900 text-sm hover:text-[#0F2744] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
