'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const baseNavItemClasses =
    'whitespace-nowrap text-xs font-medium tracking-tight uppercase text-muted-foreground ' +
    'focus-visible:outline-none focus-visible:underline';

  const dropDownItemClass =
    'block px-1 py-1 text-xs uppercase tracking-tight text-muted-foreground hover:text-foreground hover:underline';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="border-b border-border bg-background">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        {/* Left: brand / logo */}
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Brown Bear Pedals
        </Link>

        {/* Desktop nav (hidden on small screens) */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          {/* Simple links */}
          <Link
            href="/about"
            className={cn(
              baseNavItemClasses,
              isActive('/about') && 'text-foreground'
            )}
          >
            About
          </Link>

          <Link
            href="/merch"
            className={cn(
              baseNavItemClasses,
              isActive('/merch') && 'text-foreground'
            )}
          >
            Merch
          </Link>

          {/* ── Pedals dropdown (desktop) ────────────────────────────── */}
          <div className="relative group">
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                baseNavItemClasses,
                isActive('/pedals') && 'text-foreground'
              )}
            >
              Pedals
            </button>

            {/* Hover bridge */}
            <div className="absolute left-1/2 top-full h-3 w-24 -translate-x-1/2" />

            <div
              className={cn(
                'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2',
                'min-w-[180px] rounded-xl border border-border bg-background px-3 py-2 shadow-lg',
                'opacity-0 invisible translate-y-1',
                // open on hover OR keyboard focus within the group
                'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
                'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0',
                'transition ease-out duration-150'
              )}
            >
              <ul className="space-y-3">
                <li>
                  <Link href="/pedals" className={dropDownItemClass}>
                    All Pedals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pedals?productLine=Tarot"
                    className={dropDownItemClass}
                  >
                    Tarot Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pedals?productLine=Limited"
                    className={dropDownItemClass}
                  >
                    Limited Release
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pedals?productLine=Custom"
                    className={dropDownItemClass}
                  >
                    Custom Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Contact dropdown (desktop) ──────────────────────────── */}
          <div className="relative group">
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                baseNavItemClasses,
                isActive('/contact') && 'text-foreground'
              )}
            >
              Contact
            </button>

            {/* Hover bridge */}
            <div className="absolute left-1/2 top-full h-3 w-24 -translate-x-1/2" />

            <div
              className={cn(
                'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2',
                'min-w-[180px] rounded-xl border border-border bg-background px-3 py-2 shadow-lg',
                'opacity-0 invisible translate-y-1',
                'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
                'group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0',
                'transition ease-out duration-150'
              )}
            >
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className={dropDownItemClass}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/support" className={dropDownItemClass}>
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className={dropDownItemClass}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile hamburger (md and down) */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="border-t border-border bg-background md:hidden"
          id="mobile-nav"
        >
          <div className="mx-auto max-w-6xl space-y-4 px-4 py-4">
            {/* Top-level links */}
            <Link
              href="/about"
              className="block py-2 text-sm uppercase tracking-tight text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/merch"
              className="block py-2 text-sm uppercase tracking-tight text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Merch
            </Link>

            {/* Pedals section */}
            <div className="pt-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-tight text-foreground">
                Pedals
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  href="/pedals"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  All Pedals
                </Link>
                <Link
                  href="/pedals?productLine=Tarot"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Tarot Series
                </Link>
                <Link
                  href="/pedals?productLine=Limited"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Limited Release
                </Link>
                <Link
                  href="/pedals?productLine=Custom"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Custom Order
                </Link>
              </div>
            </div>

            {/* Contact section */}
            <div className="pt-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-tight text-foreground">
                Contact
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  href="/contact"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/support"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Support
                </Link>
                <Link
                  href="/faq"
                  className="block py-1 text-xs uppercase tracking-tight text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
