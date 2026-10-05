/* =====================================================================
   PORTFOLIO CONTENT: edit this file only.
   Anything in [brackets] is still a placeholder to replace.
   Leave an array empty ([]) to hide that section entirely.
   ===================================================================== */
const PORTFOLIO = {
  // ---------- Basics ----------
  name: "Harshal Acharya",           // shown as the big hero wordmark
  initials: "HA",                    // the two giant red letterforms + logo
  role: "Aspiring Marketer · Altera PGP'27",
  tagline: "Engineer by training, marketer by choice. I turn research and insight into stories people remember.",
  kicker: "Portfolio · 2026",
  location: "Gurugram, Haryana",
  availability: "Open to opportunities",
  email: "harshalacharya1801@gmail.com",
  resumeUrl: "",                     // link to your résumé PDF: leave "" to hide the button
  photo: "assets/me.jpg",

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/harshal-acharya-gurugram/" },
  ],

  // ---------- About ----------
  aboutHeading: "Engineer by training. Marketer by choice.",
  about: [
    "I'm Harshal, an aspiring marketer pursuing the PGP in Applied Marketing at Altera Institute (Cohort PGP'27) in Gurugram.",
    "Before marketing, I studied Electronics & Communication Engineering with a specialization in AI & ML at MIT-WPU. There I co-authored a research paper on real-time pipeline leak detection and led management at Team DART, our electric & solar vehicle club, landing Amar Ujala as the team's official media sponsor.",
    "Most recently, as a Founder's Office Associate at Srivari ElectoIndus, I worked with government departments and institutional buyers on tenders and commercial bids, contributing to 18% year-on-year revenue growth.",
    "I believe most limits are psychological. I'm here to be pushed, to understand how people think and feel, and to turn that understanding into brands and campaigns that genuinely connect.",
  ],
  stats: [
    { value: "18% YoY", label: "Revenue growth I contributed to, Srivari ElectoIndus" },
    { value: "Rank 3",  label: "Cross-Cultural Presentation" },
    { value: "500+",    label: "LinkedIn connections" },
  ],

  // ---------- Skills ----------
  skills: [
    { group: "Marketing",        items: ["Social Media Outreach", "Sponsorships & Partnerships", "Research Skills"] },
    { group: "Business",         items: ["Business Development", "Client Relationship Management", "Govt. Tenders (GeM, CPPP)", "Commercial Bids", "Management", "Budgeting", "Stakeholder MoUs"] },
    { group: "Tools",            items: ["Microsoft Excel", "Microsoft PowerPoint", "Python", "WinSCP", "PuTTY (SSH)"] },
    { group: "Technical Edge",   items: ["AI & ML", "Electronics & Communication", "IoT & Edge Computing", "AWS Cloud", "NVIDIA Jetson Nano"] },
  ],

  // ---------- Experience (most recent first) ----------
  // type: optional badge, e.g. "Internship"
  experience: [
    {
      role: "Founder's Office Associate",
      company: "Srivari ElectoIndus",
      url: "",                         // optional link to the company page
      period: "Aug 2025 – May 2026",
      location: "",
      type: "",
      points: [
        "Conducted meetings and discussions with government departments, institutional buyers and prospective clients.",
        "Understood customer requirements and presented technical and commercial solutions for the company's products.",
        "Prepared complete tender documentation for GeM, CPPP and other government procurement portals.",
        "My contributions helped scale revenue upwards of 18% YoY.",
        "Assisted in preparing technical specifications, eligibility documents, compliance statements and commercial bids.",
        "Coordinated with internal departments to ensure timely submission of bids and tender-related documents.",
        "Supported business development, customer relationship management and post-bid coordination.",
        "Assisted the management team in strategic planning, sales development and organizational growth initiatives.",
      ],
      tags: ["Business Development", "Govt. Tenders", "CRM", "Strategy"],
    },
    {
      role: "Intern",
      company: "INVG Technologies",
      url: "",
      period: "Jul 2024 – Jan 2025",
      location: "",
      type: "Internship",
      points: [
        "Built foundational coding skills in Python, applying them to small practical tasks during the internship.",
        "Performed secure file transfers between local and remote servers using WinSCP.",
        "Accessed and managed remote Linux servers via PuTTY (SSH) to execute commands, monitor processes and troubleshoot connectivity issues.",
      ],
      tags: ["Python", "Linux", "SSH", "WinSCP"],
    },
  ],

  // ---------- Leadership / positions of responsibility ----------
  leadership: [
    {
      role: "Management Head",
      company: "Team DART · MIT-WPU",
      url: "",
      period: "Apr 2023 – Jul 2026",
      location: "Electric & Solar Vehicle Club",
      note: "Earlier: Marketing Manager (Nov 2021 – Jul 2023)",
      points: [
        "Our primary goal was to participate in ESVC 3000. To support it, I spent several months following up with Amar Ujala and drafted and arranged a Memorandum of Understanding to make them our official media sponsor for the event.",
        "Also formalised the partnership with Jiffy Solutions through the same MoU.",
        "As a member of the management team, oversaw recruitment, grew our social media presence and secured sponsorships.",
        "Managed the books, sanctioned budgets for projects and competitions, and sought approval for college grants to support the team's initiatives.",
      ],
      tags: ["Leadership", "Sponsorships", "Recruitment", "Social Media", "Budgeting"],
    },
  ],

  // ---------- Achievements ----------
  achievements: [
    { title: "Rank 3, Cross-Cultural Presentation", detail: "Altera Institute, team deep-dive into Taiwan", year: "2026" },
    { title: "Secured Amar Ujala as media sponsor", detail: "Team DART, for the ESVC competition", year: "2022" },
    { title: "Best Delegation award", detail: "CMUN Mock United Nations committee", year: "2020" },
  ],

  // ---------- Work / projects ----------
  // category drives the filter buttons. image optional ("assets/project.png").
  // links: [{ label: "Case study", url: "..." }]: leave [] for no links.
  projects: [
    {
      title: "Intelligent Leak Detection System",
      category: "Capstone · Research",
      year: "Feb 2025 – Apr 2026",
      description: "Coordinated a 3-member capstone team building ILDS, an IoT-based, real-time pipeline anomaly detection system using NVIDIA Jetson Nano, ADC sensors and AWS cloud. Designed the architecture diagrams, block diagrams and flowcharts that explained it to technical and non-technical stakeholders, and co-authored the research paper, submitted for publication (2025).",
      tags: ["IoT", "Edge Computing", "AWS", "Team Lead"],
      image: "",
      links: [{ label: "Read the research paper", url: "https://docs.google.com/document/d/1hp4qKuZvF2C1W0Ym5mVJxgNylU1C7q_8ytKk6CAiI34/edit?tab=t.0" }],
    },
    {
      title: "Taiwan: A Cross-Cultural Study",
      category: "Research",
      year: "2026",
      description: "A team deep-dive into Taiwan's cultural landscape for Altera's Cross-Cultural Presentation that secured Rank 3 in the cohort.",
      tags: ["Cultural Research", "Presentation", "Teamwork"],
      image: "",
      links: [],
    },
    {
      title: "Amar Ujala Media Sponsorship",
      category: "Partnerships",
      year: "Team DART",
      description: "Pitched and landed Amar Ujala as Team DART's official media sponsor, then formalised the partnership through an MoU with Amar Ujala and Jiffy Solutions.",
      tags: ["Sponsorship", "Negotiation", "MoU"],
      image: "",
      links: [],
    },
    {
      title: "Team DART on Social",
      category: "Social Media",
      year: "Team DART",
      description: "Ran the club's social media presence, building visibility for a student electric-vehicle team and its competition journey, including ESVC.",
      tags: ["Social Media", "Content", "Community"],
      image: "",
      links: [],
    },
  ],

  // ---------- Education & Certifications ----------
  education: [
    { degree: "PGP in Applied Marketing", school: "Altera Institute, Gurugram", period: "Jul 2026 – Oct 2027", detail: "Cohort PGP'27" },
    { degree: "B.Tech, Electronics & Communication Engineering", school: "MIT-WPU, Pune", period: "Sep 2021 – May 2025", detail: "Specialization in AI & ML · Team DART, Electric & Solar Vehicle Club" },
  ],
  certifications: [],

  // ---------- Testimonials (optional) ----------
  testimonials: [],

  // ---------- Contact ----------
  contactBlurb: "Building a brand, planning a campaign, or hiring for a marketing role? I'd love to hear about it.",
};
