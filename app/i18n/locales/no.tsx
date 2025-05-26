export const contactTranslations = {
  title: 'Kontakt',
  description: 'La oss holde kontakten! Ta gjerne kontakt for muligheter, samarbeid, eller bare for å si hei.',
  form: {
    name: 'Navn',
    email: 'E-post',
    subject: 'Emne',
    message: 'Melding',
    submit: {
      idle: 'Send Melding',
      submitting: 'Sender...',
    },
    success: 'Meldingen ble sendt! Jeg vil svare deg så snart som mulig.',
    error: 'Kunne ikke sende melding. Vennligst prøv igjen senere.',
  },
};

import type { Translations } from './translations.d';

const no: Translations = {
  nav: {
    home: 'Hjem',
    about: 'Om meg',
    projects: 'Prosjekter',
    skills: 'Ferdigheter',
    contact: 'Kontakt',
    openMenu: 'Åpne meny',
    closeMenu: 'Lukk meny',
    mobileMenu: 'Mobil meny'
  },
  home: {
    title: 'Hei, jeg er Erik Gulliksen',
    subtitle: 'Backend-utvikler fokusert på C# og .NET med en lidenskap for å bygge robuste og skalerbare løsninger.',
    cta: {
      projects: 'Se mine prosjekter',
      about: 'Lær mer om meg',
      contact: 'Ta kontakt'
    },
    explore: {
      title: 'Utforsk min portefølje',
      about: {
        title: 'Om Meg',
        description: 'Lær mer om min bakgrunn og mine mål innen utvikling.'
      },
      projects: {
        title: 'Prosjekter',
        description: 'Se mine prosjekter innen backend og spillutvikling.'
      },
      skills: {
        title: 'Ferdigheter',
        description: 'Teknologier og verktøy jeg bruker i utviklingen.'
      }
    }
  },
  about: {
    title: 'Om Meg',
    subtitle: 'Backend-utvikler spesialisert på C# og .NET, med en unik bakgrunn som Verdensmester i robotprogrammering.',
    whoAmI: {
      title: 'Hvem er jeg?',
      description1: 'Jeg kombinerer analytisk tenkning fra robotikk med moderne utviklingsmetoder for å skape effektive, skalerbare løsninger.',
      description2: 'Min reise fra robotprogrammering til backend-utvikling har gitt meg et unikt perspektiv på systemdesign og problemløsning, som jeg nå bruker til å bygge robuste applikasjoner med C# og .NET.'
    },
    robotics: {
      title: 'Fra Roboter til Programvare',
      intro: 'Min teknologiske grunnmur startet med robotprogrammering, hvor jeg konkurrerte internasjonalt og oppnådde en Verdensmestertittel i under-21-kategorien.',
      highlight: 'Denne erfaringen var transformativ og ga meg ferdigheter som er uvurderlige i programvareutvikling:',
      skills: [
        'Avansert algoritmisk tenkning og problemnedbryting',
        'Ytelses- og ressursoptimalisering',
        'Design og implementering av sanntidssystemer',
        'Tilpasningsdyktighet og rask problemløsning'
      ]
    },
    journey: {
      title: 'Min utviklerreise',
      sections: {
        fromRobots: {
          title: 'Naturlig Progresjon',
          description: 'Overgangen fra roboter til programvareutvikling føltes naturlig - kjerneprinsippene for logikk, algoritmer og systematisk problemløsning passet perfekt. C# ble mitt foretrukne språk, med sin ideelle blanding av ytelse og moderne funksjoner.'
        },
        backend: {
          title: 'Backend-fokus',
          description: 'Backend-utvikling resonerer med min robotbakgrunn - begge krever nøyaktig systemdesign og effektiv datahåndtering. Arbeid med ASP.NET Core lar meg bruke denne erfaringen til å bygge skalerbare webtjenester og API-er.'
        },
        currentFocus: {
          title: 'Nåværende Retning',
          description: 'Jeg bygger praktisk erfaring gjennom prosjekter som Bomberman og Discord-bots, hvor jeg kan anvende både teoretisk kunnskap og praktisk implementering. Min tilnærming fokuserer på å skape vedlikeholdbare, effektive løsninger som løser reelle problemer.'
        }
      }
    },
    goals: {
      title: 'Mine mål fremover',
      shortTerm: {
        title: 'Nåværende Fokus',
        items: [
          'Fordype meg i ASP.NET Core-arkitektur og mønstre',
          'Bygge produksjonsklare applikasjoner med Entity Framework',
          'Mestre databaseoptimalisering og spørringsytelse',
          'Implementere containerisering med Docker og grunnleggende orkestrering'
        ]
      },
      mediumTerm: {
        title: 'Neste Steg',
        items: [
          'Implementere avanserte C#-konsepter inkludert asynkrone mønstre og LINQ-optimalisering',
          'Designe og deploye mikrotjeneste-baserte applikasjoner',
          'Bygge erfaring med skyinfrastruktur og deployment',
          'Bidra meningsfullt til open-source .NET-prosjekter'
        ]
      },
      longTerm: {
        title: 'Fremtidsvisjon',
        items: [
          'Lede utvikling av storskala distribuerte systemer',
          'Mestre sky-native arkitektur og deployeringsstrategier',
          'Integrere AI/ML-løsninger i backend-systemer',
          'Designe høyytelse enterprise-applikasjoner'
        ]
      }
    },
    cta: {
      title: 'La oss kode sammen',
      description: 'Jeg er alltid åpen for å diskutere nye prosjekter, læringsmuligheter eller potensielle samarbeid. Hvis min bakgrunn og ferdigheter passer med dine behov, eller du bare vil slå av en prat om teknologi, vil jeg gjerne høre fra deg!',
      projects: 'Se mine prosjekter',
      contact: 'Ta kontakt'
    }
  },
  projects: {
    title: 'Mine Prosjekter',
    intro: 'Her er en samling av prosjekter jeg har jobbet med. Hvert prosjekt representerer ulike aspekter av min reise som utvikler.',
    projects: {
      hangman: {
        title: 'Hangman Spill',
        description: 'En Blazor WebAssembly-implementasjon av det klassiske Hangman-spillet. Spilles direkte i nettleseren med responsivt design, temaveksling og interaktivt tastatur.',
        features: [
          'Klassisk Hangman-gameplay med visuell galgerepresentasjon',
          'Flere ordkategorier å velge mellom',
          'Rent, responsivt UI som fungerer på både desktop og mobile enheter',
          'Mørk/lys tema-veksler',
          'Interaktivt tastatur for bokstavvalg'
        ],
        technologies: [
          'Blazor WebAssembly',
          'C#',
          '.NET 8',
          'Bootstrap 5',
          'HTML/CSS'
        ]
      },
      discordBot: {
        title: 'Innsjekking Discord Bot',
        description: 'En C#-basert Discord-bot for håndtering av daglige arbeidsinnsjekk. Poster en innsjekk-melding hver ukedag morgen og tilbyr knapper for å sjekke inn på kontor eller hjemmekontor.',
        features: [
          'Poster innsjekk-melding hver morgen på ukedager',
          'Sletter forrige dags innsjekk-melding automatisk',
          'Lagrer innsjekk-data i SQLite-database',
          'Admin-kommandoer for å se innsjekk, slette oppføringer og liste manglende brukere',
          'Hopper over helger og norske helligdager'
        ],
        technologies: [
          'C#',
          'Discord.Net',
          'SQLite',
          'Entity Framework Core',
          'Docker Swarm'
        ]
      },
      bomberman: {
        title: 'Bomberman Backend Engine',
        description: 'En C# backend-motor for et Bomberman-lignende spill, designet for integrasjon i større systemer med meldingsbasert arkitektur.',
        features: [
          'Spilltilstand håndtert via GameSession med kart, spillere og aktive bomber',
          'Rutenettbasert kart med støtte for vegger, spillere, bomber og power-ups',
          'Spillerforflytning med kollisjonsdeteksjon',
          'Bombemekanikk med timer, eksplosjon og kjedereaksjoner',
          'Power-ups for å øke spillerstyrke'
        ],
        technologies: [
          'C#',
          '.NET',
          'xUnit',
          'Game State Management',
          'Message Bus Architecture'
        ]
      }
    },
    labels: {
      technologies: 'Teknologier',
      keyFeatures: 'Hovedfunksjoner',
      liveDemo: 'Live Demo'
    }
  },
  skills: {
    title: 'Mine Ferdigheter',
    intro: 'Som en utvikler tidlig i min karriere, fokuserer jeg på å bygge et solid fundament av ferdigheter, med spesiell vekt på backend-utvikling med C# og .NET.',
    categories: {
      backend: {
        title: 'Backend-utvikling',
        description: 'Mitt hovedfokus er backend-utvikling med C# og .NET-økosystemet.',
        skills: [
          { name: 'C#', level: 3, description: 'Konsolapplikasjoner og backend-logikk' },
          { name: '.NET', level: 3, description: '.NET-rammeverk og økosystem' },
          { name: 'ASP.NET Core', level: 2, description: 'Web API-utvikling' },
          { name: 'SQL', level: 2, description: 'Databasespørringer og design' }
        ]
      },
      frontend: {
        title: 'Frontend-utvikling',
        description: 'Grunnleggende ferdigheter som støtter mitt fokus på backend-utvikling.',
        skills: [
          { name: 'HTML', level: 2, description: 'Nettsidestrukturering' },
          { name: 'CSS', level: 2, description: 'Styling og layout' },
          { name: 'JavaScript', level: 1, description: 'Nettleserprogrammering' },
          { name: 'React', level: 2, description: 'Komponentutvikling og tilstandshåndtering' },
          { name: 'Next.js', level: 2, description: 'Full-stack React-applikasjoner' },
          { name: 'Tailwind CSS', level: 1, description: 'Effektiv styling' }
        ]
      },
      tools: {
        title: 'Verktøy & Teknologier',
        description: 'Verktøy og teknologier jeg bruker i min utviklingsflyt.',
        skills: [
          { name: 'Git', level: 2, description: 'Versjonskontroll' },
          { name: 'Docker', level: 3, description: 'Containere' },
          { name: 'Kubernetes', level: 1, description: 'Container-orkestrasjon' },
          { name: 'Visual Studio', level: 2, description: 'Primær IDE' },
          { name: 'GitHub', level: 2, description: 'Kodelagring og samarbeid' }
        ]
      }
    }
  },
  contact: {
    title: 'Kontakt',
    description: 'Ta kontakt med meg. Jeg er alltid åpen for å diskutere nye prosjekter eller muligheter.',
    form: {
      name: 'Navn',
      email: 'E-post',
      subject: 'Emne',
      message: 'Melding',
      submit: {
        idle: 'Send Melding',
        submitting: 'Sender...'
      },
      success: 'Melding sendt! Jeg tar kontakt snart.',
      error: 'Kunne ikke sende melding. Vennligst prøv igjen.'
    },
    social: {
      github: 'GitHub Profil',
      discord: 'Discord Fellesskap'
    }
  }
};

export default no;

