# Gideons School — Official Website & Admissions Platform

A modern, conversion-focused educational marketing website and admissions management platform designed for **Gideons School**, a Kenyan educational institution serving learners across Early Childhood Development (ECD), Primary School (CBC), Junior Secondary School (JSS Grades 7–9 CBE), and Senior Secondary School (SSS Grades 10–12 CBE), with legacy 8-4-4 transition guidance.

---

## 1. Project Overview & Features

- **High-Conversion Admissions Journey**:
  - 4-step clear admission process.
  - Comprehensive 4-section online application form (Parent info, Learner details, Additional support needs, and Legal declaration & consent).
  - Unique Reference Number generator (e.g. `GID-2026-4821`).
  - Real-time **Application Status Tracker** for parents to check progress using their reference code.
- **Kenya Competency-Based Education (CBE & CBC) Aligned**:
  - Detailed curriculum information for ECD, Primary (Grades 1–6), Junior Secondary (Grades 7–9), and Senior Secondary (Grades 10–12 with STEM, Social Sciences, Arts & Sports Science pathways).
  - Clearly articulated advisory explaining the difference between the legacy 8-4-4 Form Four cohort and Grade 12 CBE.
- **Supportive School Services**:
  - Detailed directory of services: Teaching, Learner Assessment, Guidance & Counseling, Sports & Co-Curricular, Talent Development, Parent-Teacher Communication, School Transport, Dining & Nutrition, and Digital Literacy.
- **Interactive Visual Gallery**:
  - Categorized gallery (School Environment, ECD, Primary, JSS, Sports, Arts & Talent).
  - Click-to-enlarge lightbox with next/previous controls, keyboard navigation (Esc, Left, Right), and captions.
- **News, Events & Announcements**:
  - Filterable by category (Announcements, Admissions, Academics, Co-Curricular, Events) with search and detailed article reader modal.
- **Parent Communication & Enquiry**:
  - Instant online contact and enquiry forms.
  - Configurable direct WhatsApp admission messaging.
  - Newsletter subscription workflow with separate consent and unsubscribe support.
- **Protected Staff Admissions Portal / Dashboard**:
  - Secure staff passcode authentication (Default: `admin2026` or `gideons2026`).
  - Search, filter by education level, and filter by status (`Received`, `Under Review`, `Additional Information Required`, `Accepted`, `Declined`).
  - Application detail viewer with internal review notes and timestamped audit logs.
  - **CSV Export** for official school reporting.
  - School settings editor to update phone numbers, emails, addresses, and admission banner text without modifying code.
- **Compliance & Child Safety**:
  - In full alignment with the **Kenya Data Protection Act, 2019**.
  - Strict child privacy guidelines and parental media consent notices.

---

## 2. Configuration & Customization

The school’s information can be configured centrally in `/src/config/schoolConfig.ts` or updated dynamically by staff inside the **Staff Admin Portal** (`Settings` tab):

- **School Name & Motto**: "Gideons School — Growing Minds, Building Futures"
- **Contact Details**: Phone numbers (`+254 700 000 000`), Email (`admissions@gideonsschool.ac.ke`), Physical location placeholders.
- **Christian Values Statement**: Configurable toggle and text for school character formation ethos.
- **Admissions Banner**: Dynamic notice (e.g., "Admissions Open for Term 1 2026").
- **School Colors**: Authoritative Deep Navy (`#0F2744`) and Academic Warm Gold (`#D4AF37`).

---

## 3. Third-Party Services & Integration Checklist

Before accepting live high-volume production traffic, configure the following services in your hosting environment:

1. **Transactional Email Service (Automated Parent Confirmation)**:
   - Provide an SMTP service (Amazon SES, SendGrid, Mailgun, or Postmark) to dispatch automated acknowledgement emails to parents upon form submission.
   - Env variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`.
2. **Kenyan SMS Gateway (Africa's Talking / Twilio)**:
   - Kenyan parents respond quickly to SMS notifications. Connect Africa's Talking SMS API for instant reference code delivery.
   - Env variables: `AT_USERNAME`, `AT_API_KEY`, `AT_SENDER_ID`.
3. **Persistent Cloud Database (PostgreSQL / Firebase)**:
   - To store applications across multiple staff devices and branch offices, connect PostgreSQL (Cloud SQL, Neon, Supabase) or Firebase Firestore using the schema in `src/types/index.ts`.
4. **Cloud Storage for Document Uploads**:
   - For parents uploading digital copies of birth certificates and previous report cards, connect an AWS S3, Google Cloud Storage, or Cloudflare R2 bucket with strict private access.

---

## 4. Testing & Verification Checklist

- [x] **Desktop Baseline (1440px)**: Top bar 3-zone layout, balanced 2-column hero split, grid cards, and footer layout integrity.
- [x] **Mobile Responsiveness (360px – 768px)**: Accessible hamburger drawer, touch-friendly buttons ($\ge 44\text{px}$), and responsive table scrolls.
- [x] **Form Validation**: Required fields (Parent name, phone, learner name, legal consent) enforced with clear error messages.
- [x] **Reference Generator**: Unique reference code (e.g., `GID-2026-XXXX`) generated and searchable via the Status Tracker.
- [x] **Gallery Lightbox**: Image modal opens, next/prev cycles correctly, Esc key closes modal, captions and alt text verified.
- [x] **Newsletter & Unsubscribe**: Subscription logs consent; unsubscribe workflow removes or marks status as inactive.
- [x] **Staff Dashboard**: Protected with passcode; status updates persist; internal staff notes save; CSV export downloads clean spreadsheet.
- [x] **Kenya Data Protection Act Compliance**: Explicit parental consent checkboxes; no sensitive child details made publicly accessible.

---

## 5. Deployment Guide (Low-Cost Hosting)

### Option A: Modern Static Hosting (Vercel / Netlify / Cloudflare Pages)
1. Run `npm run build`.
2. The optimized output is written to `/dist`.
3. Deploy the `/dist` directory with SPA fallback routing enabled (`/* -> /index.html`).

### Option B: Node.js / Full-Stack / Cloud Run
1. Run `npm run build`.
2. Serve via Express or containerized service on port `3000`.

---

## 6. Staff Portal Access Details
- **Portal Link**: Accessible via the "Staff Portal" link in the top bar utility stripe or footer.
- **Default Evaluation Passcode**: `admin2026` or `gideons2026` (can be customized in `/src/services/storage.ts`).
