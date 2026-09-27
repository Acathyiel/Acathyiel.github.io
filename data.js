/* =====================================================================
   PORTFOLIO CONTENT — edit this file only.
   Anything in [brackets] is still a placeholder to replace.
   Leave an array empty ([]) to hide that section entirely.
   ===================================================================== */
const PORTFOLIO = {
  // ---------- Basics ----------
  name: "Harshal Acharya",           // shown as the big hero wordmark
  initials: "HA",                    // the two giant red letterforms + logo
  role: "Aspiring Marketer · Altera PGP'27",
  tagline: "Engineer by training, marketer by choice — turning research and insight into stories people remember.",
  kicker: "Portfolio · 2026",
  location: "Gurugram, Haryana",
  availability: "Open to opportunities",
  email: "harshalacharya1801@gmail.com",
  resumeUrl: "",                     // link to your résumé PDF — leave "" to hide the button
  photo: "assets/me.jpg",

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/harshal-acharya-gurugram/" },
  ],

  // ---------- About ----------
  aboutHeading: "Engineer by training. Marketer by choice.",
  about: [
    "I'm Harshal — an aspiring marketer pursuing the PGP in Applied Marketing at Altera Institute (Cohort PGP'27) in Gurugram.",
    "Before marketing, I studied Electronics & Communication Engineering with a specialization in AI & ML at MIT-WPU. There I served as Marketing Manager of Team DART, our electric & solar vehicle club — landing Amar Ujala as the team's official media sponsor, drafting MoUs with partners, running our social media, and managing budgets as part of senior management.",
    "I believe most limits are psychological. I'm here to be pushed — to understand how people think and feel, and to turn that understanding into brands and campaigns that genuinely connect.",
  ],
  stats: [
    { value: "1.9 yrs", label: "Marketing Manager, Team DART" },
    { value: "Rank 3",  label: "Cross-Cultural Presentation" },
    { value: "500+",    label: "LinkedIn connections" },
  ],

  // ---------- Skills ----------
  skills: [
    { group: "Marketing",        items: ["Social Media Outreach", "Sponsorships & Partnerships", "Research Skills"] },
    { group: "Management",       items: ["Management", "Budgeting", "Stakeholder MoUs"] },
    { group: "Tools",            items: ["Microsoft Excel", "Microsoft PowerPoint"] },
    { group: "Technical Edge",   items: ["AI & ML", "Electronics & Communication"] },
  ],

  // ---------- Experience (most recent first) ----------
  experience: [
    {
      role: "Marketing Manager",
      company: "Team DART",
      url: "",                         // optional link to the company page
      period: "Nov 2021 — Jul 2023",
      location: "Pune, Maharashtra · On-site",
      points: [
        "Part of senior management at Team DART, MIT-WPU's electric & solar vehicle club.",
        "Secured Amar Ujala, a reputed and verified media & news company, as the team's official media sponsor.",
        "Arranged a detailed Memorandum of Understanding between the team, Amar Ujala and Jiffy Solutions.",
        "Handled Team DART's social media presence.",
        "Managed the books and helped sanction budgets for projects and competitions.",
      ],
      tags: ["Management", "Social Media Outreach", "Sponsorships", "Budgeting"],
    },
  ],

  // ---------- Work / projects ----------
  // category drives the filter buttons. image optional ("assets/project.png").
  // links: [{ label: "Case study", url: "..." }] — leave [] for no links.
  projects: [
    {
      title: "Taiwan: A Cross-Cultural Study",
      category: "Research",
      year: "2026",
      description: "A team deep-dive into Taiwan's cultural landscape for Altera's Cross-Cultural Presentation — secured Rank 3 in the cohort.",
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
      description: "Ran the club's social media presence — building visibility for a student electric-vehicle team and its competition journey, including ESVC.",
      tags: ["Social Media", "Content", "Community"],
      image: "",
      links: [],
    },
  ],

  // ---------- Education & Certifications ----------
  education: [
    { degree: "PGP in Applied Marketing", school: "Altera Institute, Gurugram", period: "Jul 2026 — Oct 2027", detail: "Cohort PGP'27" },
    { degree: "B.Tech, Electronics & Communication Engineering", school: "MIT-WPU, Pune", period: "Sep 2021 — May 2025", detail: "Specialization in AI & ML · Team DART — Electric & Solar Vehicle Club" },
  ],
  certifications: [],

  // ---------- Testimonials (optional) ----------
  testimonials: [],

  // ---------- Contact ----------
  contactBlurb: "Building a brand, planning a campaign, or hiring for a marketing role? I'd love to hear about it.",
};
