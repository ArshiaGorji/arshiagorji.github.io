/* =====================================================================
   ENGLISH CONTENT — everything the English version of the site says.
   ---------------------------------------------------------------------
   HOW TO EDIT
   • Change text  → edit anything between the quotes "…"
   • Add an item  → copy a whole { … }, block, paste it where you want
                    it, then change the text
   • Remove       → delete the whole { … }, block
   • Hide         → add  hidden: true,  to any item or section
                    (note: the text is still inside this public file)
   • Reorder      → move blocks up or down; the page follows this order
   • Formatting   → **bold**   *italic*   [link text](https://…)
   • Icons        → icon: "briefcase" — the full list is in README.md

   Rules that keep the file working:
     every item ends with a comma  ,
     every text is inside "double quotes"
     if a text needs a " inside it, write \"
   If something breaks, the page tells you which line to look at.
   ===================================================================== */

window.CONTENT = window.CONTENT || {};

window.CONTENT.en = {

  // Label of this language on the language button
  languageLabel: "EN",

  // Browser-tab title and the description shown by Google
  meta: {
    title: "Mohammad Arshia Gorji — Financial Analyst & Industrial Engineer",
    description: "Financial analyst and industrial engineer specializing in financial modeling, startup valuation, feasibility studies and data analysis.",
  },

  /* -------------------------------------------------------------------
     TOP OF THE PAGE
     ------------------------------------------------------------------- */
  profile: {
    name: "Mohammad Arshia Gorji",
    brandShort: "M. A. Gorji",                  // shorter name for the top bar on phones
    role: "Financial Analyst & Industrial Engineer",
    tagline: ["Financial Modeling", "Valuation", "Feasibility Studies"],
    intro: "My goal is to identify and build opportunities that lead to value creation and revenue.",
    status: "Open to business opportunities & collaborations",   // "" hides the badge
    location: "Tehran, Iran",
    photo: "assets/img/IMG_7869.PNG",        // replace this file to change the photo
    photoAlt: "Portrait of Mohammad Arshia Gorji",

    buttons: [
      { label: "Get in touch", link: "#contact", icon: "mail", style: "primary" },
      { label: "View projects", link: "#projects", icon: "arrow-right", style: "outline" },
      // CV download: put the PDF in assets/files/ and remove the // below
      // { label: "Download CV", link: "assets/files/cv.pdf", icon: "download", style: "outline", download: true },
    ],

    // The four highlight numbers under the introduction
    stats: [
      { value: "6", label: "Startup financial models" },
      { value: "4", label: "Feasibility studies" },
      { value: "8", label: "Courses & certificates" },
      { value: "96", label: "TOEFL score" },
    ],
  },

  // Round icon links (top of page + footer). Items with an empty link are not shown.
  social: [
    { icon: "linkedin", label: "LinkedIn", link: "" },   // ← paste your LinkedIn profile address here
    { icon: "mail", label: "Email", link: "mailto:arshiagorji.w@gmail.com" },
    // { icon: "github", label: "GitHub", link: "https://github.com/your-username" },
    // { icon: "telegram", label: "Telegram", link: "https://t.me/your-username" },
  ],

  /* -------------------------------------------------------------------
     SECTIONS — shown in this order.
     menu: "…"  → the name in the top menu (leave it out to skip the menu)
     type       → about | cards | timeline | projects | skills | list | contact | text
     ------------------------------------------------------------------- */
  sections: [

    /* ---------- About ---------- */
    {
      id: "about",
      type: "about",
      menu: "About",
      eyebrow: "About me",
      title: "Connecting analysis, business and investment",
      paragraphs: [
        "I'm a financial analyst and industrial engineer specializing in **financial modeling, valuation, feasibility studies and data analysis**, with experience in investment and startup projects.",
        "I have a broad professional network across industries and sectors, and I'm skilled at bridging analysis, business and investment. I'm looking to identify and develop business opportunities and partnerships with the potential to create value and generate revenue.",
      ],
      facts: [
        { icon: "map-pin", label: "Based in", value: "Tehran, Iran" },
        { icon: "briefcase", label: "Current role", value: "Financial Analyst at Gam Energy" },
        { icon: "graduation", label: "Education", value: "B.Sc. Industrial Engineering, K. N. Toosi University of Technology" },
        { icon: "globe", label: "Languages", value: "English (fluent) · German (elementary)" },
      ],
    },

    /* ---------- Areas of expertise ---------- */
    {
      id: "expertise",
      type: "cards",
      menu: "Expertise",
      eyebrow: "What I do",
      title: "Areas of expertise",
      columns: 3,
      items: [
        { icon: "calculator", title: "Financial Modeling" },
        { icon: "trending-up", title: "Startup Valuation" },
        { icon: "compass", title: "Technical, Financial & Economic Feasibility Studies" },
        { icon: "presentation", title: "Business Plans & Pitch Decks" },
        { icon: "target", title: "Economic Project Appraisal" },
        { icon: "sliders", title: "Sensitivity & Scenario Analysis" },
        { icon: "file-text", title: "Fundamental & Financial Statement Analysis" },
        { icon: "search", title: "Market Research & Competitor Analysis" },
        { icon: "dollar", title: "Cash Flow Planning" },
        { icon: "pie-chart", title: "Data Analysis & Management Dashboards" },
        { icon: "cpu", title: "Machine Learning & Forecasting" },
        { icon: "clock", title: "Project Management & Control" },
      ],
    },

    /* ---------- Work experience ---------- */
    {
      id: "experience",
      type: "timeline",
      menu: "Experience",
      eyebrow: "Career",
      title: "Work experience",
      items: [
        {
          title: "Venture Analyst",
          place: "Gam Energy",
          period: "Oct 2025 – Present",
          location: "Tehran",
          points: [
            "Financial analysis and modeling of startups, including **Startup Visa** program cases",
            "Writing business plans that meet the expectations of international assessment bodies and investors",
            "Designing dashboards and management reports for investors and stakeholders",
          ],
          tags: ["Financial modeling", "Startup Valuation", "Business plans", "Dashboards"],
        },
        {
          title: "Investment Analyst",
          place: "Damas",
          period: "Jun 2024 – Jun 2025",
          location: "Tehran",
          points: [
            "Financial analysis and modeling of investment projects",
            "Preparing feasibility studies covering technical, financial and economic aspects",
            "Building dashboards and analytical reports as the basis for investment decisions",
          ],
          tags: ["Investment appraisal", "Feasibility studies", "Financial modeling", "Reporting"],
        },
      ],
    },

    /* ---------- Projects ----------
       Filter buttons are created automatically from each "category".
       Optional per project: text, points, tags, image, link, linkLabel */
    {
      id: "projects",
      type: "projects",
      menu: "Projects",
      eyebrow: "Portfolio",
      title: "Selected projects",
      intro: "Financial models, valuations, business plans, pitch decks and feasibility studies across healthcare, energy, industry and digital platforms.",
      filters: true,
      items: [
        {
          category: "Research",
          icon: "book",
          subtitle: "Bachelor's thesis",
          title: "Portfolio Management & Optimal Asset Allocation",
          text: "Investment portfolio management and optimal asset allocation using machine-learning-based forecasts.",
          tags: ["Machine learning", "Forecasting", "Asset allocation"],
        },
        {
          category: "Startup modeling",
          icon: "medical",
          title: "Smart Dentistry Startup",
          tags: ["Financial model", "Valuation", "Business plan", "Pitch deck"],
        },
        {
          category: "Startup modeling",
          icon: "activity",
          title: "Digital Health Startup",
          tags: ["Financial model", "Valuation", "Business plan", "Pitch deck"],
        },
        {
          category: "Startup modeling",
          icon: "alert",
          title: "Safety & Risk Management Startup for Critical Industries",
          tags: ["Financial model", "Valuation", "Business plan", "Pitch deck"],
        },
        {
          category: "Startup modeling",
          icon: "droplet",
          title: "Oil & Petrochemical Tank Maintenance and Risk Startup",
          tags: ["Financial model", "Valuation", "Business plan", "Pitch deck"],
        },
        {
          category: "Startup modeling",
          icon: "layers",
          title: "Smart Asphalt Startup",
          tags: ["Financial model", "Valuation", "Business plan", "Pitch deck"],
        },
        {
          category: "Startup modeling",
          icon: "shield",
          title: "Smart Safety Helmet Startup",
          tags: ["Financial model", "Valuation", "Business plan", "Pitch deck"],
        },
        {
          category: "Feasibility studies",
          icon: "grid",
          title: "Comprehensive Commerce Platform",
          tags: ["Feasibility study"],
        },
        {
          category: "Feasibility studies",
          icon: "map",
          title: "Leisure & Tourism Platform",
          tags: ["Feasibility study"],
        },
        {
          category: "Feasibility studies",
          icon: "archive",
          title: "Asset Management Platform",
          tags: ["Feasibility study"],
        },
        {
          category: "Feasibility studies",
          icon: "sun",
          title: "Solar Power Plant Construction",
          tags: ["Feasibility study"],
        },
        {
          category: "AI skills & automation",
          icon: "zap",
          title: "Business Plan & Pitch Deck Drafting",
          tags: ["AI skill", "Automation"],
        },
        {
          category: "AI skills & automation",
          icon: "file-text",
          title: "Financial Statement Analysis",
          tags: ["AI skill", "Automation"],
        },
        {
          category: "AI skills & automation",
          icon: "bar-chart",
          title: "Fundamental Stock Analysis",
          tags: ["AI skill", "Automation"],
        },
      ],
    },

    /* ---------- Education ---------- */
    {
      id: "education",
      type: "timeline",
      menu: "Education",
      eyebrow: "Academic background",
      title: "Education",
      items: [
        {
          title: "B.Sc. in Industrial Engineering",
          place: "K. N. Toosi University of Technology",
          period: "2021 – 2025",
          badge: "GPA 17.25 / 20",
          tagsLabel: "Selected courses",
          tags: [
            "Financial Management", "Engineering Economics", "Micro & Macroeconomics", "Accounting",
            "Business Intelligence", "Data Analysis", "Entrepreneurship", "Strategic Planning",
            "Analytical Marketing", "Project Control",
          ],
        },
        {
          title: "High School Diploma in Mathematics & Physics",
          place: "Sadr High School",
          period: "2018 – 2021",
          badge: "GPA 19.45 / 20",
        },
      ],
    },

    /* ---------- Skills ----------
       style: "tags" (pills) | "list" (check marks) | "levels" (bars, value 0–100) */
    {
      id: "skills",
      type: "skills",
      menu: "Skills",
      eyebrow: "Toolkit",
      title: "Skills & languages",
      groups: [
        {
          title: "Software & tools",
          icon: "cpu",
          style: "tags",
          items: ["Microsoft Excel", "Power BI", "COMFAR", "Python", "SQL", "MS Project", "Minitab", "PowerPoint", "Word"],
        },
        {
          title: "Soft skills",
          icon: "users",
          style: "list",
          items: [
            "AI & automation for greater speed and quality",
            "Systems thinking & problem solving",
            "Data storytelling & impactful presentations",
            "High precision & attention to numerical detail",
            "Time management across multiple projects",
            "Fast, self-directed learning",
            "Teamwork & stakeholder engagement",
            "Report writing & documentation",
          ],
        },
        {
          title: "Languages",
          icon: "globe",
          style: "levels",
          items: [
            { name: "English", level: "Fluent · TOEFL 96", value: 85 },
            { name: "German", level: "Elementary", value: 30 },
          ],
        },
      ],
    },

    /* ---------- Courses & certificates ----------
       Add  link: "https://…"  to any item to make its title clickable. */
    {
      id: "certifications",
      type: "list",
      eyebrow: "Continuous learning",
      title: "Courses & certificates",
      columns: 2,
      icon: "award",
      items: [
        { title: "Data Analysis & Business Intelligence with Excel", subtitle: "Udemy", date: "Nov 2025" },
        { title: "Data Analyst Job Simulation", subtitle: "Forage", date: "Oct 2025" },
        { title: "Financial Analyst Job Simulation", subtitle: "Forage", date: "Oct 2025" },
        { title: "Capital Market Training", subtitle: "Mobin Sarmayeh Academy", date: "Sep 2025" },
        { title: "Complete Microsoft SQL Course", subtitle: "Udemy", date: "Apr 2024" },
        { title: "Power BI Training Course", subtitle: "K. N. Toosi University Scientific Association", date: "Apr 2024" },
        { title: "Data Analysis with Excel", subtitle: "Great Learning", date: "Jan 2024" },
        { title: "Machine Learning", subtitle: "Stanford Online", date: "Sep 2023" },
      ],
    },

    /* ---------- Honors & research ---------- */
    {
      id: "recognition",
      type: "list",
      eyebrow: "Honors & research",
      title: "Recognition & publications",
      columns: 2,
      items: [
        {
          icon: "star",
          label: "Honor",
          title: "Top Undergraduate Student",
          text: "Top student of the B.Sc. program at K. N. Toosi University of Technology, with direct (exam-free) admission to its M.Sc. in Financial Systems.",
        },
        {
          icon: "book",
          label: "Conference paper",
          title: "Applying Systems Thinking to Analyze Cancer Incidence Statistics in Iran",
          subtitle: "International Conference on System Dynamics and Systems Thinking",
          date: "Jan 2025",
        },
      ],
    },

    /* ---------- Contact ---------- */
    {
      id: "contact",
      type: "contact",
      menu: "Contact",
      eyebrow: "Contact",
      title: "Let's create value together",
      text: "Open to business opportunities, partnerships and projects in financial modeling, valuation, business planning and feasibility studies.",
      button: { label: "Send an email", link: "mailto:arshiagorji.w@gmail.com", icon: "send" },
      items: [
        { icon: "mail", label: "Email", value: "arshiagorji.w@gmail.com", link: "mailto:arshiagorji.w@gmail.com", copy: true },
        { icon: "phone", label: "Phone", value: "+98 910 909 6199", link: "tel:+989109096199" },
        { icon: "linkedin", label: "LinkedIn", value: "Mohammad Arshia Gorji", link: "https://www.linkedin.com/in/mohammad-arshia-gorji-35a924355" },   // ← paste your LinkedIn address
        { icon: "map-pin", label: "Location", value: "Tehran, Iran" },
      ],
    },

    /* ---------- Want another section? ----------
       Copy one of the blocks above (for example the "list" one), give it
       a new id, and it appears on the page. Example of a free-text section:

    {
      id: "volunteering",
      type: "text",
      menu: "Volunteering",
      eyebrow: "Beyond work",
      title: "Volunteering",
      paragraphs: [
        "Write anything here. **Bold**, *italic* and [links](https://example.com) work.",
      ],
    },
    */
  ],

  // Small line under your name in the footer
  footer: {
    text: "Financial Analyst & Industrial Engineer",
  },

  // Words used by buttons and screen readers
  ui: {
    skipLink: "Skip to content",
    menu: "Menu",
    closeMenu: "Close menu",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    switchLanguage: "نسخه فارسی",
    all: "All",
    view: "View",
    copy: "Copy",
    copied: "Copied to clipboard",
    backToTop: "Back to top",
  },
};
