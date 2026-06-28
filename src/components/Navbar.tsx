'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo-small.jpg"
              alt="IBees Jobs"
              width={48}
              height={48}
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#0D1B5E] leading-tight">IBees Jobs</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Connecting Talent with Opportunities</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#0D1B5E] hover:bg-blue-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/jobs"
              className="ml-2 px-5 py-2.5 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl hover:bg-[#1a2d7c] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95"
            >
              Find a Job
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-[#0D1B5E] hover:bg-blue-50 transition-all"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/jobs"
            onClick={() => setIsOpen(false)}
            className="block mt-2 px-4 py-2.5 bg-[#0D1B5E] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#1a2d7c] transition-all"
          >
            Find a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}
