'use client';
import { FaDiscord } from 'react-icons/fa';
import Link from 'next/link';

/**
 * DiscordLink Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Optional CSS class for the Link element
 * @param {string} [props.spanClassName] - Optional CSS class for the username span
 * @param {boolean} [props.showIcon=true] - Whether to show the Discord icon
 * @param {boolean} [props.showUsername=true] - Whether to show the username text
 * @param {string} [props.usernameText="Fjorfott"] - Custom text to display as username
 * @returns {JSX.Element} Rendered component
 */
export default function DiscordLink({ 
  className, 
  spanClassName,
  showIcon = true,
  showUsername = true,
  usernameText = "Fjorfott"
}) {
  const defaultClass = "hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-1";
  const defaultSpanClass = "hidden sm:inline";
  const discordUserId = "149498441838362625";
  const appUrl = `discord://discord.com/users/${discordUserId}`;
  const webUrl = `https://discord.com/users/${discordUserId}`;
  
  const handleClick = (e) => {
    e.preventDefault();
    // Try to open Discord app first
    window.location.href = appUrl;
    
    // If app doesn't open within 100ms, fall back to web
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

