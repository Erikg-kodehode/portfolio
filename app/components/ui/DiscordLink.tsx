'use client';
import { FaDiscord } from 'react-icons/fa';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface DiscordLinkProps {
  className?: string;
  spanClassName?: string;
  showIcon?: boolean;
  showUsername?: boolean;
  usernameText?: string;
}

/**
 * Discord profile link component that prioritizes opening the Discord app.
 * Falls back to web profile if app is not installed.
 */
export default function DiscordLink({ 
  className, 
  spanClassName,
  showIcon = true,
  showUsername = true,
  usernameText = "Fjorfott"
}: DiscordLinkProps) {
  const defaultClass = "hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1";
  const defaultSpanClass = "hidden sm:inline";
  const discordUserId = "149498441838362625";
  const appUrl = `discord://discord.com/users/${discordUserId}`;
  const webUrl = `https://discord.com/users/${discordUserId}`;
  
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = appUrl;
    
    // Fall back to web if app doesn't open within 2s
    setTimeout(() => {
      window.location.href = webUrl;
    }, 2000);
  };
  
  return (
    <Link 
      href={appUrl}
      onClick={handleClick}
      className={className || defaultClass}
      aria-label="Discord Profile"
    >
      {showIcon && <FaDiscord className="text-lg" />}
      {showUsername && <span className={spanClassName || defaultSpanClass}>{usernameText}</span>}
    </Link>
  );
}

