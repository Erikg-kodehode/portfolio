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
    subtitle: 'Hei! Jeg er Erik Gulliksen, en utvikler med bakgrunn som Verdensmester i robotprogrammering for under 21. Mitt fokus er nå på backend-utvikling med C# og .NET.',
    whoAmI: {
      title: 'Hvem er jeg?',
      description1: 'Jeg er en utvikler med en brennende lidenskap for faget, formet av en unik bakgrunn som verdensmester innen robotprogrammering.',
      description2: 'I dag er mitt hovedfokus backend-utvikling med C# og .NET-økosystemet. Her får jeg fullt utløp for min systematiske og analytiske metode for å designe og bygge robuste, skalerbare applikasjoner og tjenester.'
    },
    robotics: {
      title: 'Robotprogrammering: Min tidlige suksess',
      intro: 'Lenge før jeg begynte med tradisjonell programvareutvikling, fordypet jeg meg i robotprogrammering. Denne interessen førte meg til internasjonale konkurranser hvor jeg konkurrerte mot talenter fra hele verden.',
      highlight: 'Høydepunktet i min tidlige teknologireise var å vinne Verdensmestertittelen i robotprogrammering for deltakere under 21 år. Denne erfaringen ga meg ikke bare tekniske ferdigheter innen programmering, men også uvurderlig erfaring med:',
      skills: [
        'Algoritmetenkning og logisk problemløsning',
        'Teamarbeid under press',
        'Tid- og ressursoptimalisering',
        'Tilpasning til uventede utfordringer'
      ]
    },
    journey: {
      title: 'Min utviklerreise',
      sections: {
        fromRobots: {
          title: 'Fra roboter til programvareutvikling',
          description: 'Overgangen fra robotprogrammering til tradisjonell programvareutvikling var naturlig. De samme prinsippene for logikk, algoritmer og systematisk problemløsning jeg brukte i robotkonkurranser viste seg å være direkte overførbare til programvareutvikling. C# fanget raskt min interesse med sitt ryddige syntaks og kraftige økosystem.'
        },
        backend: {
          title: 'Backend-utvikling og systemarkitektur',
          description: 'Backend-utvikling tiltrakk meg naturlig. Databaser, API-er og server-logikk minner om hvordan robotsystemer håndterer data og logikk under overflaten. Jeg utforsker nå ASP.NET Core, hvor jeg kan anvende min erfaring med systemarkitektur fra robotkonkurransene i oppbyggingen av robuste og skalerbare backend-løsninger.'
        },
        currentFocus: {
          title: 'Mitt fokus i dag',
          description: 'Jeg tror sterkt på læring gjennom praksis. Jeg bygger aktiv erfaring gjennom prosjekter som Bomberman-backend og Discord-bots, hvor jeg anvender min bakgrunn fra robotverdenen. Min tilnærming er å bryte ned komplekse problemer, utforske alternative løsninger, og balansere teoretisk kunnskap med praktisk implementering.'
        }
      }
    },
    goals: {
      title: 'Mine mål fremover',
      shortTerm: {
        title: 'Kortsiktige mål',
        items: [
          'Mestre grunnleggende ASP.NET Core konsepter',
          'Bygge flere fullstendige backend-applikasjoner',
          'Utvide forståelsen av database-design og -optimalisering'
        ]
      },
      mediumTerm: {
        title: 'Mellomlangsiktige mål',
        items: [
          'Utforske avanserte C# og .NET-konsepter',
          'Lære mer om mikrotjeneste-arkitektur',
          'Bidra til open-source prosjekter innen .NET økosystemet'
        ]
      },
      longTerm: {
        title: 'Langsiktige mål',
        items: [
          'Spesialisere meg innen backend-arkitektur og systemdesign',
          'Utforske AI og maskinlæring med .NET',
          'Bygge mer komplekse, distribuerte systemer'
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
          { name: 'React', level: 1, description: 'Komponentutvikling' },
          { name: 'Next.js', level: 1, description: 'Denne porteføljen' },
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
      message: 'Melding',
      send: 'Send Melding'
    }
  }
};

export default no;

