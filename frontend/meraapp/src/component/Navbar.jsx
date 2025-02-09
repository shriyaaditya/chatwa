'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const NavItem = ({ href, text, dropdown, children }) => (
  <li className="relative group">
    <a
      href={href}
      className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300 ease-in-out"
      aria-haspopup={dropdown ? 'true' : undefined}
    >
      {text}
      {dropdown && <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />}
    </a>
    {dropdown && (
      <ul className=" absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-border ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-in-out">
        {children}
      </ul>
    )}
  </li>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-primary/10 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-foreground font-bold text-xl">
            <div
        className="w-11 h-6 bg-primary/30 rounded-t-lg relative
          dark:bg-primary/70 transition-all"
      >
        <div className="absolute top-0 left-0 w-full h-3 bg-primary/40 dark:bg-primary/80 rounded-t-lg" />
      </div>

      {/* Frog eyes */}
      <div className="absolute top-6 left-10 w-2 h-2 bg-white rounded-full dark:bg-gray-300"></div>
      <div className="absolute top-6 left-10 w-1 h-1 bg-black rounded-full dark:bg-gray-800"></div>

      <div className="absolute top-6 left-14 w-2 h-2 bg-white rounded-full dark:bg-gray-300"></div>
      <div className="absolute top-6 left-14 w-1 h-1 bg-black rounded-full dark:bg-gray-800"></div>

            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4 ">
              <NavItem href="/login" text="LogIn"  />
              <NavItem href="/" text="Home" />
              <NavItem href="/profile" text="Profile" />
              <NavItem href="/settings" text="Settings" />
              <NavItem href="/aboutus" text="AboutUs" />
              <NavItem href="/logout" text="Logout" />

            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition duration-300 ease-in-out"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm">
          <NavItem href="/login" text="LogIn"  />
              <NavItem href="/" text="Home" />
              <NavItem href="/profile" text="Profile" />
              <NavItem href="/settings" text="Settings" />
              <NavItem href="/aboutus" text="AboutUs" />
              <NavItem href="/logout" text="Logout" />
          </ul>
        </div>
      )}
    </nav>
  );
}

