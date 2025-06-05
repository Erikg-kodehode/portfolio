export const contactTranslations = {
  title: 'Contact',
  description: "Let's connect! Feel free to reach out for opportunities, collaborations, or just to say hello.",
  form: {
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    submit: {
      idle: 'Send Message',
      submitting: 'Sending...',
    },
    success: 'Message sent successfully! I will get back to you soon.',
    error: 'Failed to send message. Please try again later.',
  },
};

import type { Translations } from './translations.d';

const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    cv: 'CV',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mobileMenu: 'Mobile menu'
  },
  home: {
    title: 'Hi, I\'m Erik Gulliksen',
    subtitle: 'Backend developer focused on C# and .NET with a passion for building robust and scalable solutions.',
    cta: {
      projects: 'See my projects',
      about: 'Learn more about me',
      contact: 'Get in touch'
    },
    explore: {
      title: 'Explore my portfolio',
      about: {
        title: 'About Me',
        description: 'Learn about my background and goals in development.'
      },
      projects: {
        title: 'Projects',
        description: 'See my backend and game development projects.'
      },
      skills: {
        title: 'Skills',
        description: 'Technologies and tools I use in development.'
      }
    }
  },
  about: {
    title: 'About Me',
    subtitle: 'Backend developer specializing in C# and .NET, with a unique background as a World Champion in robotics programming.',
    whoAmI: {
      title: 'Who am I?',
      description1: 'I combine analytical thinking from robotics with modern software development practices to create efficient, scalable solutions.',
      description2: 'My journey from robotics to backend development has given me a unique perspective on system design and problem-solving, which I now apply to building robust applications with C# and .NET.'
    },
    robotics: {
      title: 'From Robotics to Software',
      intro: 'My foundation in technology started with robotics programming, where I competed internationally and achieved a World Champion title in the under-21 category.',
      highlight: 'This experience was transformative, equipping me with skills that prove invaluable in software development:',
      skills: [
        'Advanced algorithmic thinking and problem decomposition',
        'Performance optimization and resource management',
        'Real-time system design and implementation',
        'Adaptability and rapid problem-solving'
      ]
    },
    journey: {
      title: 'My Development Journey',
      sections: {
        fromRobots: {
          title: 'Natural Progression',
          description: 'Moving from robotics to software development felt natural - the core principles of logic, algorithms, and systematic problem-solving transferred perfectly. C# became my language of choice, offering the perfect blend of performance and modern features.'
        },
        backend: {
          title: 'Backend Focus',
          description: 'Backend development resonates with my robotics background - both require careful system design and efficient data handling. Working with ASP.NET Core lets me apply this experience to build scalable web services and APIs.'
        },
        currentFocus: {
          title: 'Current Direction',
          description: 'I\'m building practical experience through projects like Bomberman and Discord bots, where I can apply both theoretical knowledge and hands-on implementation. My approach focuses on creating maintainable, efficient solutions that solve real-world problems.'
        }
      }
    },
    goals: {
      title: 'My Goals Going Forward',
      shortTerm: {
        title: 'Current Focus',
        items: [
          'Deepen expertise in ASP.NET Core architecture and patterns',
          'Build production-ready applications with Entity Framework',
          'Master database optimization and query performance',
          'Implement containerization with Docker and basic orchestration'
        ]
      },
      mediumTerm: {
        title: 'Next Steps',
        items: [
          'Implement advanced C# concepts including async patterns and LINQ optimization',
          'Design and deploy microservice-based applications',
          'Build experience with cloud infrastructure and deployment',
          'Contribute meaningfully to open-source .NET projects'
        ]
      },
      longTerm: {
        title: 'Future Vision',
        items: [
          'Lead development of large-scale distributed systems',
          'Master cloud-native architecture and deployment strategies',
          'Integrate AI/ML solutions in backend systems',
          'Design high-performance enterprise applications'
        ]
      }
    },
    cta: {
      title: 'Let\'s Code Together',
      description: 'I\'m always open to discussing new projects, learning opportunities, or potential collaborations. If my background and skills match your needs, or you just want to chat about technology, I\'d love to hear from you!',
      projects: 'See my projects',
      contact: 'Get in touch'
    }
  },
  projects: {
    title: 'My Projects',
    intro: 'Here is a collection of projects I have worked on. Each project represents different aspects of my journey as a developer.',
    projects: {
      hangman: {
        title: 'Hangman Game',
        description: 'A Blazor WebAssembly implementation of the classic Hangman game. Play directly in the browser with responsive design, theme switching, and interactive keyboard.',
        features: [
          'Classic Hangman gameplay with visual gallows representation',
          'Multiple word categories to choose from',
          'Clean, responsive UI that works on both desktop and mobile devices',
          'Dark/light theme switcher',
          'Interactive keyboard for letter selection'
        ],
        technologies: [
          'Blazor WebAssembly',
          'C#',
          '.NET 8',
          'Bootstrap 5',
          'HTML/CSS'
        ]
      },
      bot: {
        title: 'Check-in Discord Bot',
        description: 'A C#-based Discord bot for handling daily work check-ins. Posts a check-in message every weekday morning and offers buttons to check in for office or remote work.',
        features: [
          'Posts check-in message every morning on weekdays',
          'Automatically deletes previous day\'s check-in message',
          'Stores check-in data in SQLite database',
          'Admin commands to view check-ins, delete entries, and list missing users',
          'Skips weekends and Norwegian holidays'
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
        description: 'A C# backend engine for a Bomberman-like game, designed for integration into larger systems with message-based architecture.',
        features: [
          'Game state handled via GameSession with maps, players, and active bombs',
          'Grid-based map with support for walls, players, bombs, and power-ups',
          'Player movement with collision detection',
          'Bomb mechanics with timer, explosion, and chain reactions',
          'Power-ups to increase player strength'
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
      technologies: 'Technologies',
      keyFeatures: 'Key Features',
      liveDemo: 'Live Demo'
    }
  },
  skills: {
    title: 'My Skills',
    intro: 'As a developer early in my career, I focus on building a solid foundation of skills, with special emphasis on backend development with C# and .NET.',
    categories: {
      backend: {
        title: 'Backend Development',
        description: 'My main focus is backend development with C# and the .NET ecosystem.',
        skills: [
          { name: 'C#', level: 3, description: 'Console applications and backend logic' },
          { name: '.NET', level: 3, description: '.NET framework and ecosystem' },
          { name: 'ASP.NET Core', level: 2, description: 'Web API development' },
          { name: 'SQL', level: 2, description: 'Database queries and design' }
        ]
      },
      frontend: {
        title: 'Frontend Development',
        description: 'Basic skills that support my focus on backend development.',
        skills: [
          { name: 'HTML', level: 2, description: 'Webpage structuring' },
          { name: 'CSS', level: 2, description: 'Styling and layout' },
          { name: 'JavaScript', level: 1, description: 'Browser programming' },
          { name: 'React', level: 2, description: 'Component development and state management' },
          { name: 'Next.js', level: 2, description: 'Full-stack React applications' },
          { name: 'Tailwind CSS', level: 1, description: 'Efficient styling' }
        ]
      },
      tools: {
        title: 'Tools & Technologies',
        description: 'Tools and technologies I use in my development workflow.',
        skills: [
          { name: 'Git', level: 2, description: 'Version control' },
          { name: 'Docker', level: 3, description: 'Containerization' },
          { name: 'Kubernetes', level: 1, description: 'Container orchestration' },
          { name: 'Visual Studio', level: 2, description: 'Primary IDE' },
          { name: 'GitHub', level: 2, description: 'Code hosting and collaboration' }
        ]
      }
    }
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with me. I\'m always open to discussing new projects or opportunities.',
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: {
        idle: 'Send Message',
        submitting: 'Sending...'
      },
      success: 'Message sent successfully! I\'ll get back to you soon.',
      error: 'Failed to send message. Please try again.'
    },
    social: {
      github: 'GitHub Profile',
      discord: 'Discord Community'
    }
  }
};

export default en;

