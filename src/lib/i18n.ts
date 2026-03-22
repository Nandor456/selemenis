export const SUPPORTED_LOCALES = ["en", "hu", "ro"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "hu";

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

type TranslationSchema = {
  languageName: string;
  common: {
    projects: string;
    contact: string;
    language: string;
  };
  header: {
    projects: string;
    contact: string;
    toggleMenu: string;
  };
  footer: {
    services: string;
    company: string;
    contactUs: string;
    privacy: string;
    terms: string;
    sitemap: string;
    rightsReserved: string;
    licensedInsured: string;
    brandText: string;
    responseTime: string;
    contactInfo: string;
  };
  home: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
    explore: string;
    years: string;
    projects: string;
    satisfaction: string;
    scroll: string;
  };
  aboutFirm: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    builtPrecision: string;
    ready: string;
    ctaTop: string;
    ctaAccent: string;
    ctaButton: string;
    ctaFooter: string;
  };
  projectsPage: {
    portfolio: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
    featured: string;
    area: string;
    duration: string;
    year: string;
    viewDetails: string;
    projectCountSingular: string;
    projectCountPlural: string;
    startProject: string;
    haveProject: string;
    inMind: string;
    ctaDescription: string;
    ctaButton: string;
    filterAll: string;
    filterResidential: string;
    filterCommercial: string;
    filterRenovation: string;
    filterInfrastructure: string;
    typeResidential: string;
    typeCommercial: string;
    typeRenovation: string;
    typeInfrastructure: string;
  };
  projectDetail: {
    back: string;
    area: string;
    duration: string;
    completed: string;
    overview: string;
    challenge: string;
    solution: string;
    highlights: string;
    info: string;
    client: string;
    type: string;
    location: string;
    year: string;
    size: string;
    sidebarText: string;
    similarProject: string;
    startProject: string;
    haveProject: string;
    inMind: string;
    ctaDescription: string;
    ctaButton: string;
    confidential: string;
  };
  contactPage: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
    contactInfo: string;
    office: string;
    callUs: string;
    emailUs: string;
    workingHours: string;
    responseTime: string;
    within24: string;
    responseText: string;
    sendRequest: string;
    fillDetails: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    projectType: string;
    projectDetails: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    placeholderMessage: string;
    typeRenovation: string;
    typeNewBuild: string;
    typeCommercial: string;
    typeSmallRepair: string;
    sending: string;
    send: string;
    success: string;
    error: string;
  };
  carousel: {
    title: string;
    prev: string;
    next: string;
    goToImage: string;
    imageAlt: string;
    thumbnailAlt: string;
  };
};

export const TRANSLATIONS: Record<Locale, TranslationSchema> = {
  en: {
    languageName: "English",
    common: {
      projects: "Projects",
      contact: "Contact",
      language: "Language",
    },
    header: {
      projects: "Our Projects",
      contact: "Contact Us",
      toggleMenu: "Toggle menu",
    },
    footer: {
      services: "Services",
      company: "Company",
      contactUs: "Contact Us",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      sitemap: "Sitemap",
      rightsReserved: "All rights reserved.",
      licensedInsured: "Licensed & Insured",
      brandText:
        "Building structures that endure for generations. From deep foundations to steel facades, we deliver precision craftsmanship backed by four decades of industry excellence.",
      responseTime: "Response Time",
      contactInfo: "Within 24hrs",
    },
    home: {
      eyebrow: "Construction & Development",
      titleTop: "We Are Building",
      titleAccent: "With Happiness",
      subtitle: "Quality Construction · Trusted Craftsmanship · Built for Life",
      explore: "Explore Our Work",
      years: "Years",
      projects: "Projects",
      satisfaction: "Satisfaction",
      scroll: "Scroll",
    },
    aboutFirm: {
      eyebrow: "Our Portfolio",
      titleTop: "About our",
      titleAccent: "Company",
      builtPrecision: "Built with precision",
      ready: "Ready to Build?",
      ctaTop: "Let\'s Start Your",
      ctaAccent: "Next Project",
      ctaButton: "Contact Us Today",
      ctaFooter:
        "Free consultation · On-site assessment · Detailed quote within 48 hours",
    },
    projectsPage: {
      portfolio: "Portfolio",
      titleTop: "Our Projects",
      titleAccent: "Built With Pride",
      subtitle:
        "completed projects across residential, commercial, and infrastructure.",
      featured: "Featured Project",
      area: "Area",
      duration: "Duration",
      year: "Year",
      viewDetails: "View Details",
      projectCountSingular: "project",
      projectCountPlural: "projects",
      startProject: "Start Your Project",
      haveProject: "Have a Project",
      inMind: "In Mind?",
      ctaDescription:
        "Let\'s build something you\'ll be proud of. We respond within 24 hours.",
      ctaButton: "Contact Us Today",
      filterAll: "All",
      filterResidential: "Residential",
      filterCommercial: "Commercial",
      filterRenovation: "Renovation",
      filterInfrastructure: "Infrastructure",
      typeResidential: "Residential",
      typeCommercial: "Commercial",
      typeRenovation: "Renovation",
      typeInfrastructure: "Infrastructure",
    },
    projectDetail: {
      back: "Back to Projects",
      area: "Area",
      duration: "Duration",
      completed: "Completed",
      overview: "Overview",
      challenge: "The Challenge",
      solution: "Our Solution",
      highlights: "Project Highlights",
      info: "Project Info",
      client: "Client",
      type: "Type",
      location: "Location",
      year: "Year",
      size: "Size",
      sidebarText:
        "Interested in a similar project? Let\'s discuss how we can bring your vision to life.",
      similarProject: "Start a Similar Project",
      startProject: "Start Your Project",
      haveProject: "Have a Project",
      inMind: "In Mind?",
      ctaDescription:
        "Let\'s build something you\'ll be proud of. We respond within 24 hours.",
      ctaButton: "Contact Us Today",
      confidential: "Confidential",
    },
    contactPage: {
      eyebrow: "Get in Touch",
      titleTop: "Let\'s Build",
      titleAccent: "Something Great",
      subtitle:
        "Tell us about your project and we\'ll get back to you within 24 hours.",
      contactInfo: "Contact Info",
      office: "Our Office",
      callUs: "Call Us",
      emailUs: "Email Us",
      workingHours: "Working Hours",
      responseTime: "Response Time",
      within24: "Within 24hrs",
      responseText: "We take every inquiry seriously.",
      sendRequest: "Send Us a Request",
      fillDetails: "Fill in the details below",
      fullName: "Full Name *",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      projectType: "Project Type",
      projectDetails: "Project Details",
      placeholderName: "Jane Smith",
      placeholderEmail: "john@example.com",
      placeholderPhone: "+1 (555) 123-4567",
      placeholderMessage:
        "We are looking to add a master bath, renovate the kitchen...",
      typeRenovation: "Renovation",
      typeNewBuild: "New Build",
      typeCommercial: "Commercial",
      typeSmallRepair: "Small Repair",
      sending: "Sending...",
      send: "Send Request",
      success: "Message Sent!",
      error: "Something went wrong.",
    },
    carousel: {
      title: "Project Gallery",
      prev: "Previous image",
      next: "Next image",
      goToImage: "Go to image",
      imageAlt: "image",
      thumbnailAlt: "thumbnail",
    },
  },
  hu: {
    languageName: "Magyar",
    common: {
      projects: "Projektek",
      contact: "Kapcsolat",
      language: "Nyelv",
    },
    header: {
      projects: "Projektjeink",
      contact: "Kapcsolat",
      toggleMenu: "Men\u00fc v\u00e1lt\u00e1sa",
    },
    footer: {
      services: "Szolg\u00e1ltat\u00e1sok",
      company: "C\u00e9g",
      contactUs: "Kapcsolat",
      privacy: "Adatv\u00e9delmi szab\u00e1lyzat",
      terms: "Felhaszn\u00e1l\u00e1si felt\u00e9telek",
      sitemap: "Oldalt\u00e9rk\u00e9p",
      rightsReserved: "Minden jog fenntartva.",
      licensedInsured: "Enged\u00e9lyezett \u00e9s biztos\u00edtott",
      brandText:
        "Olyan szerkezeteket \u00e9p\u00edt\u00fcnk, amelyek gener\u00e1ci\u00f3kon \u00e1t tartanak. A m\u00e9lyalapoz\u00e1st\u00f3l az ac\u00e9l homlokzatokig prec\u00edz kivitelez\u00e9st ny\u00fajtunk, n\u00e9gy \u00e9vtized szakmai tapasztalat\u00e1val.",
      responseTime: "V\u00e1laszid\u0151",
      contactInfo: "24 \u00f3r\u00e1n bel\u00fcl",
    },
    home: {
      eyebrow: "\u00c9p\u00edt\u00e9s \u00e9s fejleszt\u00e9s",
      titleTop: "\u00d6r\u00f6mmel",
      titleAccent: "\u00c9p\u00edt\u00fcnk",
      subtitle:
        "Min\u0151s\u00e9gi kivitelez\u00e9s \u00b7 Megb\u00edzhat\u00f3 szak\u00e9rtelem \u00b7 \u00c9letre tervezve",
      explore: "Munk\u00e1ink megtekint\u00e9se",
      years: "\u00c9v",
      projects: "Projekt",
      satisfaction: "El\u00e9gedetts\u00e9g",
      scroll: "G\u00f6rget\u00e9s",
    },
    aboutFirm: {
      eyebrow: "Portf\u00f3li\u00f3nk",
      titleTop: "C\u00e9g\u00fcnkr\u0151l",
      titleAccent: "r\u00f6viden",
      builtPrecision: "Pontoss\u00e1ggal \u00e9p\u00edtve",
      ready: "K\u00e9szen \u00e1ll az \u00e9p\u00edtkez\u00e9sre?",
      ctaTop: "Kezdj\u00fck el az",
      ctaAccent: "\u00d6n projektj\u00e9t",
      ctaButton: "L\u00e9pjen kapcsolatba vel\u00fcnk",
      ctaFooter:
        "Ingyenes konzult\u00e1ci\u00f3 \u00b7 Helysz\u00edni felm\u00e9r\u00e9s \u00b7 R\u00e9szletes \u00e1raj\u00e1nlat 48 \u00f3r\u00e1n bel\u00fcl",
    },
    projectsPage: {
      portfolio: "Portf\u00f3li\u00f3",
      titleTop: "Projektjeink",
      titleAccent: "B\u00fcszk\u00e9n \u00e9p\u00edtve",
      subtitle:
        "befejezett projekt lak\u00f3, kereskedelmi \u00e9s infrastruktur\u00e1lis ter\u00fcleten.",
      featured: "Kiemelt projekt",
      area: "Ter\u00fclet",
      duration: "Id\u0151tartam",
      year: "\u00c9v",
      viewDetails: "R\u00e9szletek",
      projectCountSingular: "projekt",
      projectCountPlural: "projekt",
      startProject: "Ind\u00edtsa projektj\u00e9t",
      haveProject: "Van egy projektje",
      inMind: "fejben?",
      ctaDescription:
        "\u00c9p\u00edts\u00fcnk valamit, amire b\u00fcszke lesz. 24 \u00f3r\u00e1n bel\u00fcl v\u00e1laszolunk.",
      ctaButton: "Kapcsolatfelv\u00e9tel",
      filterAll: "\u00d6sszes",
      filterResidential: "Lak\u00f3",
      filterCommercial: "Kereskedelmi",
      filterRenovation: "Fel\u00faj\u00edt\u00e1s",
      filterInfrastructure: "Infrastrukt\u00fara",
      typeResidential: "Lak\u00f3",
      typeCommercial: "Kereskedelmi",
      typeRenovation: "Fel\u00faj\u00edt\u00e1s",
      typeInfrastructure: "Infrastrukt\u00fara",
    },
    projectDetail: {
      back: "Vissza a projektekhez",
      area: "Ter\u00fclet",
      duration: "Id\u0151tartam",
      completed: "Befejezve",
      overview: "\u00d6sszefoglal\u00f3",
      challenge: "Kih\u00edv\u00e1s",
      solution: "Megold\u00e1sunk",
      highlights: "Projekt kiemel\u00e9sek",
      info: "Projektadatok",
      client: "Megrendel\u0151",
      type: "T\u00edpus",
      location: "Helysz\u00edn",
      year: "\u00c9v",
      size: "M\u00e9ret",
      sidebarText:
        "\u00c9rdekli egy hasonl\u00f3 projekt? Besz\u00e9lj\u00fcnk arr\u00f3l, hogyan val\u00f3s\u00edthatjuk meg az \u00d6n elk\u00e9pzel\u00e9s\u00e9t.",
      similarProject: "Hasonl\u00f3 projekt ind\u00edt\u00e1sa",
      startProject: "Ind\u00edtsa projektj\u00e9t",
      haveProject: "Van egy projektje",
      inMind: "fejben?",
      ctaDescription:
        "\u00c9p\u00edts\u00fcnk valamit, amire b\u00fcszke lesz. 24 \u00f3r\u00e1n bel\u00fcl v\u00e1laszolunk.",
      ctaButton: "Kapcsolatfelv\u00e9tel",
      confidential: "Bizalmas",
    },
    contactPage: {
      eyebrow: "L\u00e9pjen kapcsolatba vel\u00fcnk",
      titleTop: "\u00c9p\u00edts\u00fcnk",
      titleAccent: "Valami nagyszer\u0171t",
      subtitle:
        "Mes\u00e9ljen a projektj\u00e9r\u0151l, \u00e9s 24 \u00f3r\u00e1n bel\u00fcl jelentkez\u00fcnk.",
      contactInfo: "Kapcsolati adatok",
      office: "Irod\u00e1nk",
      callUs: "H\u00edvjon minket",
      emailUs: "\u00cdrjon nek\u00fcnk",
      workingHours: "Munkaid\u0151",
      responseTime: "V\u00e1laszid\u0151",
      within24: "24 \u00f3r\u00e1n bel\u00fcl",
      responseText: "Minden megkeres\u00e9st komolyan vesz\u00fcnk.",
      sendRequest: "K\u00fcldj\u00f6n \u00fczenetet",
      fillDetails: "T\u00f6ltse ki az al\u00e1bbi adatokat",
      fullName: "Teljes n\u00e9v *",
      emailAddress: "E-mail c\u00edm",
      phoneNumber: "Telefonsz\u00e1m",
      projectType: "Projekt t\u00edpusa",
      projectDetails: "Projekt r\u00e9szletei",
      placeholderName: "Kiss J\u00e1nos",
      placeholderEmail: "janos@example.com",
      placeholderPhone: "+36 30 123 4567",
      placeholderMessage:
        "Mesterf\u00fcrd\u0151szoba kialak\u00edt\u00e1sa, konyha fel\u00faj\u00edt\u00e1sa...",
      typeRenovation: "Fel\u00faj\u00edt\u00e1s",
      typeNewBuild: "\u00daj \u00e9p\u00edt\u00e9s",
      typeCommercial: "Kereskedelmi",
      typeSmallRepair: "Kisebb jav\u00edt\u00e1s",
      sending: "K\u00fcld\u00e9s...",
      send: "K\u00e9relem elk\u00fcld\u00e9se",
      success: "\u00dczenet elk\u00fcldve!",
      error: "Hiba t\u00f6rt\u00e9nt.",
    },
    carousel: {
      title: "Projekt gal\u00e9ria",
      prev: "El\u0151z\u0151 k\u00e9p",
      next: "K\u00f6vetkez\u0151 k\u00e9p",
      goToImage: "Ugr\u00e1s a k\u00e9pre",
      imageAlt: "k\u00e9p",
      thumbnailAlt: "b\u00e9lyegk\u00e9p",
    },
  },
  ro: {
    languageName: "Rom\u00e2n\u0103",
    common: {
      projects: "Proiecte",
      contact: "Contact",
      language: "Limb\u0103",
    },
    header: {
      projects: "Proiectele noastre",
      contact: "Contacteaz\u0103-ne",
      toggleMenu: "Comut\u0103 meniul",
    },
    footer: {
      services: "Servicii",
      company: "Companie",
      contactUs: "Contact",
      privacy: "Politica de confiden\u021bialitate",
      terms: "Termeni de utilizare",
      sitemap: "Hart\u0103 site",
      rightsReserved: "Toate drepturile rezervate.",
      licensedInsured: "Licen\u021biat \u0219i asigurat",
      brandText:
        "Construim structuri care rezist\u0103 genera\u021bii. De la funda\u021bii ad\u00e2nci la fa\u021bade din o\u021bel, oferim execu\u021bie de precizie sus\u021binut\u0103 de patru decenii de experien\u021b\u0103.",
      responseTime: "Timp de r\u0103spuns",
      contactInfo: "\u00cen 24h",
    },
    home: {
      eyebrow: "Construc\u021bii \u0219i dezvoltare",
      titleTop: "Construim",
      titleAccent: "Cu bucurie",
      subtitle:
        "Construc\u021bii de calitate \u00b7 M\u0103iestrie de \u00eencredere \u00b7 Construite pentru via\u021b\u0103",
      explore: "Descoper\u0103 lucr\u0103rile noastre",
      years: "Ani",
      projects: "Proiecte",
      satisfaction: "Satisfac\u021bie",
      scroll: "Deruleaz\u0103",
    },
    aboutFirm: {
      eyebrow: "Portofoliul nostru",
      titleTop: "Despre",
      titleAccent: "compania noastr\u0103",
      builtPrecision: "Construim cu precizie",
      ready: "Gata s\u0103 construim?",
      ctaTop: "S\u0103 \u00eencepem",
      ctaAccent: "urm\u0103torul proiect",
      ctaButton: "Contacteaz\u0103-ne azi",
      ctaFooter:
        "Consulta\u021bie gratuit\u0103 \u00b7 Evaluare la fa\u021ba locului \u00b7 Ofert\u0103 detaliat\u0103 \u00een 48h",
    },
    projectsPage: {
      portfolio: "Portofoliu",
      titleTop: "Proiectele noastre",
      titleAccent: "Construite cu m\u00e2ndrie",
      subtitle:
        "proiecte finalizate \u00een reziden\u021bial, comercial \u0219i infrastructur\u0103.",
      featured: "Proiect recomandat",
      area: "Suprafa\u021b\u0103",
      duration: "Durat\u0103",
      year: "An",
      viewDetails: "Vezi detalii",
      projectCountSingular: "proiect",
      projectCountPlural: "proiecte",
      startProject: "\u00cencepe proiectul",
      haveProject: "Ai un proiect",
      inMind: "\u00een minte?",
      ctaDescription:
        "Hai s\u0103 construim ceva de care vei fi m\u00e2ndru. R\u0103spundem \u00een 24 de ore.",
      ctaButton: "Contacteaz\u0103-ne",
      filterAll: "Toate",
      filterResidential: "Reziden\u021bial",
      filterCommercial: "Comercial",
      filterRenovation: "Renovare",
      filterInfrastructure: "Infrastructur\u0103",
      typeResidential: "Reziden\u021bial",
      typeCommercial: "Comercial",
      typeRenovation: "Renovare",
      typeInfrastructure: "Infrastructur\u0103",
    },
    projectDetail: {
      back: "\u00cenapoi la proiecte",
      area: "Suprafa\u021b\u0103",
      duration: "Durat\u0103",
      completed: "Finalizat",
      overview: "Prezentare",
      challenge: "Provocarea",
      solution: "Solu\u021bia noastr\u0103",
      highlights: "Puncte cheie",
      info: "Informa\u021bii proiect",
      client: "Client",
      type: "Tip",
      location: "Loca\u021bie",
      year: "An",
      size: "Dimensiune",
      sidebarText:
        "Te intereseaz\u0103 un proiect similar? Hai s\u0103 discut\u0103m cum putem transforma viziunea ta \u00een realitate.",
      similarProject: "\u00cencepe un proiect similar",
      startProject: "\u00cencepe proiectul",
      haveProject: "Ai un proiect",
      inMind: "\u00een minte?",
      ctaDescription:
        "Hai s\u0103 construim ceva de care vei fi m\u00e2ndru. R\u0103spundem \u00een 24 de ore.",
      ctaButton: "Contacteaz\u0103-ne",
      confidential: "Confiden\u021bial",
    },
    contactPage: {
      eyebrow: "Ia leg\u0103tura",
      titleTop: "Hai s\u0103 construim",
      titleAccent: "ceva grozav",
      subtitle:
        "Spune-ne despre proiectul t\u0103u \u0219i revenim \u00een cel mult 24 de ore.",
      contactInfo: "Date de contact",
      office: "Biroul nostru",
      callUs: "Sun\u0103-ne",
      emailUs: "Scrie-ne",
      workingHours: "Program",
      responseTime: "Timp de r\u0103spuns",
      within24: "\u00cen 24h",
      responseText: "Trat\u0103m fiecare cerere cu seriozitate.",
      sendRequest: "Trimite cererea",
      fillDetails: "Completeaz\u0103 datele de mai jos",
      fullName: "Nume complet *",
      emailAddress: "Adres\u0103 de email",
      phoneNumber: "Num\u0103r de telefon",
      projectType: "Tip proiect",
      projectDetails: "Detalii proiect",
      placeholderName: "Ion Popescu",
      placeholderEmail: "ion@example.com",
      placeholderPhone: "+40 721 123 456",
      placeholderMessage:
        "Dorim s\u0103 ad\u0103ug\u0103m o baie matrimonial\u0103, s\u0103 renov\u0103m buc\u0103t\u0103ria...",
      typeRenovation: "Renovare",
      typeNewBuild: "Construc\u021bie nou\u0103",
      typeCommercial: "Comercial",
      typeSmallRepair: "Repara\u021bii mici",
      sending: "Se trimite...",
      send: "Trimite cererea",
      success: "Mesaj trimis!",
      error: "Ceva nu a mers bine.",
    },
    carousel: {
      title: "Galerie proiect",
      prev: "Imaginea anterioar\u0103",
      next: "Imaginea urm\u0103toare",
      goToImage: "Mergi la imaginea",
      imageAlt: "imagine",
      thumbnailAlt: "miniatur\u0103",
    },
  },
};

export function getTranslations(locale: Locale): TranslationSchema {
  return TRANSLATIONS[locale];
}
