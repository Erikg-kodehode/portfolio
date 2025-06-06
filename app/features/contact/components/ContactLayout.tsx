'use client';
import { motion } from 'framer-motion';
import { Container, Section } from '@/features/layout/components';
import { Card, DiscordLink } from '@/components/ui';
import { FaGithub, FaPhone, FaEnvelope, FaDiscord } from 'react-icons/fa';

interface ContactLayoutProps {
  children: React.ReactNode;
  isEnglish: boolean;
}

const patterns = {
  circles: (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
      <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-blue-200 dark:bg-blue-900/50" />
      <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-green-200 dark:bg-green-900/50" />
      <div className="absolute left-1/2 top-1/3 w-16 h-16 rounded-full bg-yellow-200 dark:bg-yellow-900/50" />
    </div>
  ),
  dots: (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div className="grid grid-cols-12 gap-4 transform rotate-12 scale-150">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-300" />
        ))}
      </div>
    </div>
  )
};

const contactInfo = [
  {
    icon: <FaGithub className="text-xl" />,
    title: "GitHub",
    titleNo: "GitHub",
    content: "Erikg-kodehode",
    href: "https://github.com/Erikg-kodehode"
  },
  {
    icon: <FaDiscord className="text-xl" />,
    title: "Fjorfott",
    titleNo: "Fjorfott",
    component: <DiscordLink 
      showUsername={true} 
      usernameText="Fjorfott" 
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      spanClassName="text-slate-700 dark:text-slate-300"
    />
  },
  {
    icon: <FaPhone className="text-xl" />,
    title: "Phone",
    titleNo: "Telefon",
    content: "+47 926-34-382",
    href: "tel:+47-926-34-382"
  },
  {
    icon: <FaEnvelope className="text-xl" />,
    title: "Email",
    titleNo: "E-post",
    content: "Email",
    href: "mailto:Erik.gulliksen@gmail.com"
  }
];

export default function ContactLayout({ children, isEnglish }: ContactLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-100/10 to-blue-50/5 dark:from-slate-900/90 dark:to-slate-800/80">
      {patterns.circles}
      {patterns.dots}
      <Container as="main" maxWidth="xl" className="py-12 md:py-16">
        <Section 
          light 
          className="bg-gradient-to-br from-slate-100/5 to-blue-50/5 dark:from-slate-900/95 dark:to-slate-800/90"
        >
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card
                variant="elevated"
                padding="lg"
                className="h-full backdrop-blur-sm bg-slate-100/10 dark:bg-slate-900/70 shadow-xl dark:shadow-2xl dark:shadow-blue-500/5"
              >
                <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-50">
                  {isEnglish ? "Contact Information" : "Kontaktinformasjon"}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100/20 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 transform transition-transform duration-200 group-hover:scale-110">
                        {info.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-slate-50">
                          {isEnglish ? info.title : info.titleNo}
                        </h3>
                        {info.component ? (
                          info.component
                        ) : info.href ? (
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors break-all"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-300 break-all">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {children}
            </motion.div>
          </div>
        </Section>
      </Container>
    </div>
  );
}

