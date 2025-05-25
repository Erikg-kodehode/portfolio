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
    subtitle: 'Hi! I\'m Erik Gulliksen, a developer with a background as a World Champion in robotics programming for under 21. My focus is now on backend development with C# and .NET.',
    whoAmI: {
      title: 'Who am I?',
      description1: 'I\'m a developer with a burning passion for the field, shaped by a unique background as a world champion in robotics programming.',
      description2: 'Today, my main focus is backend development with C# and the .NET ecosystem. Here I get to fully utilize my systematic and analytical approach to designing and building robust, scalable applications and services.'
    },
    robotics: {
      title: 'Robotics Programming: My Early Success',
      intro: 'Long before I started with traditional software development, I immersed myself in robotics programming. This interest led me to international competitions where I competed against talents from around the world.',
      highlight: 'The highlight of my early technology journey was winning the World Champion title in robotics programming for participants under 21. This experience gave me not only technical programming skills but also invaluable experience with:',
      skills: [
        'Algorithmic thinking and logical problem solving',
        'Teamwork under pressure',
        'Time and resource optimization',
        'Adapting to unexpected challenges'
      ]
    },
    journey: {
      title: 'My Development Journey',
      sections: {
        fromRobots: {
          title: 'From Robots to Software Development',
          description: 'The transition from robotics programming to traditional software development was natural. The same principles for logic, algorithms, and systematic problem solving I used in robotics competitions proved to be directly transferable to software development. C# quickly caught my interest with its clean syntax and powerful ecosystem.'
        },
        backend: {
          title: 'Backend Development and System Architecture',
          description: 'Backend development attracted me naturally. Databases, APIs, and server logic remind me of how robot systems handle data and logic under the surface. I\'m now exploring ASP.NET Core, where I can apply my experience with system architecture from robotics competitions in building robust and scalable backend solutions.'
        },
        currentFocus: {
          title: 'My Focus Today',
          description: 'I strongly believe in learning through practice. I\'m building active experience through projects like Bomberman backend and Discord bots, where I apply my background from the robotics world. My approach is to break down complex problems, explore alternative solutions, and balance theoretical knowledge with practical implementation.'
        }
      }
    },
    goals: {
      title: 'My Goals Going Forward',
      shortTerm: {
        title: 'Short-term Goals',
        items: [
          'Master core concepts in ASP.NET Core, including middleware, dependency injection, and routing',
          'Build and deploy complete backend applications with C# and Entity Framework',
          'Improve knowledge of database design, normalization, and writing optimized queries',
          'Learn basic Docker to build images and run your .NET applications in containers'
        ]
      },
      mediumTerm: {
        title: 'Medium-term Goals',
        items: [
          'Dive into advanced C#/.NET concepts like asynchronous programming, multithreading, and performance optimization',
          'Implement an application based on microservice architecture, including service communication (e.g., via REST or gRPC)',
          'Gain practical experience with Kubernetes (K8s) to deploy and manage container-based applications',
          'Understand fundamental networking principles for distributed systems, such as DNS, load balancing, and API Gateways',
          'Actively contribute to an open-source project in the .NET ecosystem'
        ]
      },
      longTerm: {
        title: 'Long-term Goals',
        items: [
          'Specialize in advanced system design and architectural patterns like CQRS and Event Sourcing',
          'Design and lead the development of complex, distributed systems with high scalability and reliability requirements',
          'Explore and apply AI and machine learning with ML.NET to solve real-world problems',
          'Master cloud architecture and advanced network configuration to build robust solutions in the cloud (e.g., Azure, AWS)'
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
      discordBot: {
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

