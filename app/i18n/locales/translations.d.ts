export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    mobileMenu: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: {
      projects: string;
      about: string;
      contact: string;
    };
    explore: {
      title: string;
      about: {
        title: string;
        description: string;
      };
      projects: {
        title: string;
        description: string;
      };
      skills: {
        title: string;
        description: string;
      };
    };
  };
  about: {
    title: string;
    subtitle: string;
    whoAmI: {
      title: string;
      description1: string;
      description2: string;
    };
    robotics: {
      title: string;
      intro: string;
      highlight: string;
      skills: string[];
    };
    journey: {
      title: string;
      sections: {
        fromRobots: {
          title: string;
          description: string;
        };
        backend: {
          title: string;
          description: string;
        };
        currentFocus: {
          title: string;
          description: string;
        };
      };
    };
    goals: {
      title: string;
      shortTerm: {
        title: string;
        items: string[];
      };
      mediumTerm: {
        title: string;
        items: string[];
      };
      longTerm: {
        title: string;
        items: string[];
      };
    };
    cta: {
      title: string;
      description: string;
      projects: string;
      contact: string;
    };
  };
  projects: {
    title: string;
    intro: string;
    projects: {
      hangman: {
        title: string;
        description: string;
        features: string[];
        technologies: string[];
      };
      discordBot: {
        title: string;
        description: string;
        features: string[];
        technologies: string[];
      };
      bomberman: {
        title: string;
        description: string;
        features: string[];
        technologies: string[];
      };
    };
    labels: {
      technologies: string;
      keyFeatures: string;
    liveDemo: string;
  };
  skills: {
    title: string;
    intro: string;
    categories: {
      backend: {
        title: string;
        description: string;
      };
    };
  };
}
}

