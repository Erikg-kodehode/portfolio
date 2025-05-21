'use client';
import { FaDiscord } from 'react-icons/fa';
import Link from 'next/link';

export default function DiscordLink() {
  const handleDiscordClick = (e) => {
    e.preventDefault();
    try {
      window.location.href = 'discord://discordapp.com/users/Fjorfott';
      setTimeout(() => {
        window.location.href = 'discord:Fjorfott';
      }, 100);
    } catch (err) {
      window.location.href = 'https://discord.com/users/Fjorfott';
    }
  };

  return (
    <Link 
      href="discord://discordapp.com/users/Fjorfott"
      onClick={handleDiscordClick}
      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1"
      aria-label="Discord Profile"
    >
      <FaDiscord className="text-lg" />
      <span className="hidden sm:inline">Fjorfott</span>
    </Link>
  );
}

