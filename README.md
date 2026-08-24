# 🩺 MediCare Connect

### Healthcare, thoughtfully connected.

> A modern healthcare appointment and follow-up platform that connects **patients, doctors, AI-assisted pre-visit intelligence, reminders, and clinic operations** into one calm and connected workspace.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/NextAuth-Authentication-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Powered-8B5CF6?style=for-the-badge&logo=sparkles&logoColor=white" />
</p>

<p align="center">
  <a href="YOUR_LIVE_DEMO_URL">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Project-17201C?style=for-the-badge" />
  </a>
  <a href="YOUR_GITHUB_REPOSITORY_URL">
    <img src="https://img.shields.io/badge/💻_Source_Code-GitHub-111111?style=for-the-badge&logo=github" />
  </a>
</p>

---

## ✦ The Idea

Healthcare should feel simple.

But a typical appointment journey can involve:

**Searching → Calling → Waiting → Booking → Explaining symptoms → Consultation → Remembering follow-ups**

MediCare Connect brings these steps into a single digital workflow.

The platform is designed around one simple principle:

> **Less friction before the visit. More clarity during the visit. Better continuity after it.**

---

# ✨ What Makes MediCare Connect Different?

MediCare Connect is not just an appointment booking application.

It combines:

- 🧑‍⚕️ Doctor discovery
- 📅 Appointment scheduling
- 🤖 AI-powered pre-visit summaries
- 🔐 Role-based authentication
- 🏥 Doctor and clinic management
- 🔔 Notifications and reminders
- 💊 Medication follow-up
- 📊 Operational dashboards
- 🛡️ Conflict-safe booking
- 📱 Responsive modern UI

Everything is connected around the patient's healthcare journey.

---

# 🧭 Product Journey

```text
                    MEDICARE CONNECT
                           │
                           ▼
                 ┌──────────────────┐
                 │   Discover Care  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Find a Doctor  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Choose Time Slot │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  Share Symptoms  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  AI Pre-Visit    │
                 │    Briefing      │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Doctor Visit   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │    Follow-up     │
                 │   & Reminders    │
                 └──────────────────┘

---

# 🌟 Core Experience

MediCare Connect is organized around three dedicated experiences, each designed for a different part of the healthcare workflow.

| 🧑‍🤝‍🧑 Patient | 🩺 Doctor | ⚙️ Admin |
|:---:|:---:|:---:|
| Find doctors | Manage appointments | Manage doctors |
| Book appointments | Review patients | Monitor appointments |
| Share symptoms | AI pre-visit briefing | Manage availability |
| View follow-ups | Complete visits | Manage leave |
| Receive reminders | Manage consultation flow | View operational insights |

---

# 👤 Patient Experience

The patient workspace is designed to make discovering and managing healthcare feel simple.

### What patients can do

- 🔎 Search doctors by speciality
- 🩺 Explore available doctors
- 📅 Select available appointment slots
- ✅ Confirm appointments
- 📝 Share symptoms before a visit
- 🤖 Receive AI-assisted pre-visit preparation
- 📋 View appointment details
- 🔔 Stay informed through reminders
- 💊 Keep track of follow-up information

### Patient Journey

```text
Patient Dashboard
       │
       ▼
  Find a Doctor
       │
       ▼
Select Speciality
       │
       ▼
 Choose Doctor
       │
       ▼
Available Slots
       │
       ▼
Book Appointment
       │
       ▼
 Share Symptoms
       │
       ▼
AI Pre-Visit Briefing
       │
       ▼
 Doctor Consultation
       │
       ▼
 Follow-up & Reminders

 ---

# 🩺 Doctor Experience

The doctor workspace is designed to turn appointment information into a focused clinical workflow — giving doctors the context they need before the consultation begins.

### What doctors can do

- 📅 View upcoming appointments
- 👤 Review patient information
- 🤖 Read AI-generated pre-visit summaries
- 🚨 Identify high-urgency appointments
- 📝 Review patient chief complaints
- 🔎 Open individual appointment visits
- 🩺 Conduct and manage consultations
- ✅ Complete visits
- 📊 Monitor appointment activity

### Doctor Journey

```text
Doctor Dashboard
       │
       ▼
Upcoming Appointments
       │
       ▼
Select Patient
       │
       ▼
Review Patient Context
       │
       ▼
AI Pre-Visit Briefing
       │
       ├───────────────┐
       ▼               ▼
Chief Complaint    Urgency Level
       │               │
       └───────┬───────┘
               ▼
        Start Consultation
               │
               ▼
          Complete Visit

---

# ⚙️ Admin Experience

The admin workspace acts as the operational control center of MediCare Connect, bringing doctors, appointments, availability and clinic activity into one organized workspace.

### What admins can do

- 👨‍⚕️ Add and manage doctor profiles
- 📅 Monitor appointments across the platform
- 🕐 Manage doctor availability
- ✈️ Track doctor leave information
- 📊 View operational statistics
- 👥 Monitor recently added doctors
- 🔎 Review clinic activity
- 🔄 Keep healthcare operations organized

### Admin Journey

```text
Admin Dashboard
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
Manage Doctors      Appointments
       │                  │
       ▼                  ▼
Doctor Profiles     Booking Activity
       │                  │
       ▼                  │
Availability              │
       │                  │
       └────────┬─────────┘
                ▼
        Clinic Operations
                │
                ▼
          System Overview



📅 Appointment Management

Appointments are treated as an end-to-end workflow rather than simply a calendar entry.

MediCare Connect connects the patient booking experience with the doctor's consultation workflow while giving administrators visibility into appointment activity.

Appointment Lifecycle
┌──────────────┐
│   Available  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Selected  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     Booked   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Confirmed  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Consultation │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Completed  │
└──────────────┘
Appointment Information

Each appointment can bring together:

👤 Patient information
🩺 Doctor information
🏷️ Specialisation
📅 Appointment date
🕐 Appointment time
📌 Appointment status
🚨 Urgency information
📝 Chief complaint
🤖 AI pre-visit summary
🤖 AI Pre-Visit Intelligence

One of the core experiences of MediCare Connect is the AI-assisted pre-visit workflow.

Before a consultation begins, patient-provided symptoms can be transformed into a concise briefing that helps the doctor understand the patient's reported context more efficiently.

How It Works
             PATIENT
                │
                ▼
       Shares Symptoms
                │
                ▼
       ┌────────────────┐
       │  AI Processing │
       └───────┬────────┘
               │
               ▼
      ┌──────────────────┐
      │ Pre-Visit Summary │
      └────────┬─────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
Chief Complaint    Urgency Level
       │                │
       └───────┬────────┘
               │
               ▼
        Doctor Reviews
               │
               ▼
          Consultation
Example Workflow

A patient provides symptoms before the appointment.

Patient Input
     │
     ▼
"Headache for several days,
worse during the evening."
     │
     ▼
AI-assisted processing
     │
     ▼
Structured pre-visit context
     │
     ├── Chief Complaint
     ├── Reported Duration
     └── Urgency Level
     │
     ▼
Doctor Review
Pre-Visit Briefing
┌──────────────────────────────────────┐
│          AI PRE-VISIT BRIEFING       │
├──────────────────────────────────────┤
│                                      │
│  Chief Complaint                     │
│  Headache                            │
│                                      │
│  Reported Duration                   │
│  Several days                        │
│                                      │
│  Additional Context                  │
│  Worse during the evening            │
│                                      │
│  Urgency Level                       │
│  Based on configured AI workflow     │
│                                      │
└──────────────────────────────────────┘

AI-generated information is intended to organize patient-provided information and support the consultation workflow. It is not a medical diagnosis.

🔐 Authentication & Role-Based Access

MediCare Connect separates the application experience according to the user's role.

Each role receives a dedicated workspace containing the functionality relevant to that user.

Role Structure
Role	Workspace	Primary Responsibility
👤 Patient	Patient Workspace	Find doctors and manage appointments
🩺 Doctor	Doctor Workspace	Review patients and manage consultations
⚙️ Admin	Admin Workspace	Manage doctors and clinic operations
Access Flow
                         LOGIN
                           │
                           ▼
                   AUTHENTICATION
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          PATIENT        DOCTOR        ADMIN
             │             │             │
             ▼             ▼             ▼
       Patient UI      Doctor UI      Admin UI
             │             │             │
             ▼             ▼             ▼
       Patient Flow   Clinical Flow   Operations

This keeps each workspace focused while maintaining a consistent experience throughout the platform.

✨ Feature Matrix
Feature	👤 Patient	🩺 Doctor	⚙️ Admin
🔐 Authentication	✓	✓	✓
🔎 Doctor Search	✓	—	✓
🩺 Doctor Profiles	✓	—	✓
📅 Appointment Booking	✓	—	✓
📆 Appointment Management	✓	✓	✓
📝 Symptom Submission	✓	—	—
🤖 AI Pre-Visit Summary	✓	✓	—
🚨 Urgency Information	—	✓	—
📋 Chief Complaint	✓	✓	—
🩺 Consultation Workflow	—	✓	—
👨‍⚕️ Doctor Management	—	—	✓
🕐 Availability Management	—	—	✓
✈️ Leave Management	—	—	✓
📊 Dashboard Statistics	✓	✓	✓
🔔 Reminders	✓	✓	—
💊 Follow-up Information	✓	✓	—
🎨 Design Philosophy

MediCare Connect is designed to feel less like a traditional hospital management system and more like a modern, thoughtful healthcare product.

The interface combines:

Healthcare
     +
Modern SaaS
     +
Editorial Design
     +
Soft Minimalism
     +
Human-centered UX
Design Principles
01 — Calm

Soft backgrounds, subtle borders and muted colours create a comfortable visual environment.

02 — Human

Rounded surfaces, friendly typography and approachable interactions make the experience feel less clinical and more welcoming.

03 — Focused

Important information is given clear visual hierarchy so users can understand what matters at a glance.

04 — Connected

Patient, doctor and admin interfaces share the same visual language while serving different workflows.

05 — Responsive

The experience is designed to remain usable across desktop, tablet and mobile screen sizes.

🎨 Visual Language

The interface uses a soft healthcare-inspired palette.

Primary Background     #F7F7F2
Deep Forest            #17201C
Sage                   #7F9B88
Soft Green             #E8EFE9
Soft Lavender          #E6E1F0
Soft Blue              #DFECEF
Soft Peach             #F1DDD3

The visual direction intentionally avoids an overly traditional medical-blue aesthetic.

Instead, it uses warm neutrals, muted greens, lavender accents and generous whitespace to create a calmer digital healthcare experience.

🏗️ Application Architecture
                         ┌─────────────────┐
                         │      USER       │
                         │                 │
                         │ Patient/Doctor  │
                         │      /Admin     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     Next.js     │
                         │   Application   │
                         └────────┬────────┘
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
                 ▼                ▼                ▼
          ┌────────────┐   ┌────────────┐   ┌────────────┐
          │ NextAuth   │   │   Prisma   │   │ AI Service │
          │    Auth    │   │    ORM     │   │            │
          └────────────┘   └──────┬─────┘   └────────────┘
                                  │
                                  ▼
                           ┌──────────────┐
                           │   Database   │
                           └──────────────┘
Application Layers
┌─────────────────────────────────────┐
│              UI Layer               │
│  Landing · Dashboard · Components   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          Application Layer          │
│ Routes · Server Components · APIs   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│           Authentication            │
│             NextAuth                │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│             Data Layer              │
│              Prisma                 │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│              Database               │
└─────────────────────────────────────┘
🛠️ Technology Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Lucide React
Backend
Next.js Server Components
Next.js API Routes
Prisma ORM
Authentication
NextAuth
Database
Relational database managed through Prisma
AI
AI-assisted pre-visit summary generation
Development
Git
GitHub
npm
📁 Project Structure
medicare-connect/
│
├── app/
│   ├── admin/
│   │   ├── doctors/
│   │   └── page.tsx
│   │
│   ├── doctor/
│   │   ├── appointments/
│   │   └── page.tsx
│   │
│   ├── patient/
│   │   ├── doctors/
│   │   ├── book/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── patient/
│   │   ├── doctor/
│   │   └── admin/
│   │
│   ├── login/
│   ├── register/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Input.tsx
│   │   └── StatCard.tsx
│   │
│   ├── AppointmentCard.tsx
│   ├── DashboardShell.tsx
│   └── Navbar.tsx
│
├── lib/
│   ├── prisma.ts
│   └── ...
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── ...
│
├── auth.ts
├── middleware.ts
├── package.json
└── README.md
🚀 Getting Started
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd medicare-connect
2. Install dependencies
npm install
3. Configure environment variables

Create a .env file in the project root.

DATABASE_URL="your_database_url"

AUTH_SECRET="your_auth_secret"

AI_API_KEY="your_ai_api_key"

⚠️ Never commit .env files, API keys, database credentials or authentication secrets to GitHub.

4. Generate Prisma Client
npx prisma generate
5. Setup the database

For direct schema synchronization:

npx prisma db push

Or, when using migrations:

npx prisma migrate dev
6. Start the development server
npm run dev

Then open:

http://localhost:3000
🧪 Available Commands
Start development server
npm run dev
Build for production
npm run build
Start production server
npm start
Run linting
npm run lint
🖼️ Application Preview

Replace the placeholders below with screenshots of your actual deployed application before final submission.

Landing Page
📸 Add landing-page screenshot here
Patient Workspace
📸 Add patient-dashboard screenshot here
Doctor Workspace
📸 Add doctor-dashboard screenshot here
Admin Workspace
📸 Add admin-dashboard screenshot here
AI Pre-Visit Briefing
📸 Add AI-summary screenshot here
🌐 Deployment

MediCare Connect is designed to be deployed as a production-ready Next.js application.

Deployment Flow
GitHub Repository
       │
       ▼
Deployment Platform
       │
       ├── Build Application
       ├── Configure Environment Variables
       ├── Connect Database
       ├── Generate Prisma Client
       └── Deploy
              │
              ▼
       🌐 Live Application
Production Checklist
☐ Configure production database
☐ Configure authentication secret
☐ Configure AI credentials
☐ Add production environment variables
☐ Generate Prisma client
☐ Test authentication
☐ Test patient booking
☐ Test doctor workflow
☐ Test admin workflow
☐ Test AI workflow
☐ Test failure handling
☐ Test responsive layouts
☐ Verify production deployment
🔮 Future Roadmap

MediCare Connect can evolve beyond appointment scheduling into a broader digital healthcare coordination platform.

Potential additions
📹 Video consultations
💳 Online payments
💊 Digital prescriptions
🧪 Lab report management
📄 Medical document management
🔔 Real-time notifications
📱 Progressive Web App support
🌍 Multi-language support
📊 Advanced healthcare analytics
🏥 Multi-clinic support
📅 Calendar integrations
🧠 More advanced AI-assisted workflows
⚠️ Disclaimer

MediCare Connect is a software project created to demonstrate a modern healthcare appointment and coordination workflow.

AI-generated information is intended to assist with organizing and presenting information and must not be treated as a medical diagnosis or a replacement for professional medical judgment.

👩‍💻 About the Developer
Radha Rani

B.Tech Computer Science Engineering · VIT Bhopal University

Building at the intersection of:

Software Engineering
        +
Artificial Intelligence
        +
Product Design
        +
Real-world Problem Solving
<p align="center"> <a href="YOUR_LINKEDIN_URL"> <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /> </a> <a href="YOUR_GITHUB_URL"> <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" /> </a> </p>
⭐ Support the Project

If you found MediCare Connect interesting, consider giving the repository a ⭐ on GitHub.

<p align="center">
🩺 MediCare Connect

Less waiting. More clarity. Better care coordination.

Built with care · 2026

</p> ```