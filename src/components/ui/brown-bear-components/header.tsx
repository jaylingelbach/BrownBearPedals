'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const baseNavItemClasses =
    'whitespace-nowrap text-xs font-medium tracking-tight uppercase text-muted-foreground';

  const dropDownItemClass =
    'block px-1 py-1 text-xs uppercase tracking-tight text-muted-foreground hover:text-foreground hover:underline';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-4 py-4">
        {/* Simple links */}
        <Link
          href="/about"
          className={cn(baseNavItemClasses, isActive('/about') && 'text-black')}
        >
          About
        </Link>

        <Link
          href="/merch"
          className={cn(baseNavItemClasses, isActive('/merch') && 'text-black')}
        >
          Merch
        </Link>

        {/* ── Pedals dropdown (pure CSS with hover bridge) ─────────────────── */}
        <div className="relative group">
          {/* Trigger */}
          <button
            className={cn(
              baseNavItemClasses,
              isActive('/pedals') && 'text-black'
            )}
            type="button"
          >
            Pedals
          </button>

          {/* Invisible hover bridge between button and menu */}
          <div
            className="
              absolute left-1/2 top-full 
              h-3 w-24 -translate-x-1/2
            "
          />

          {/* Dropdown panel */}
          <div
            className={cn(
              'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2',
              'min-w-[180px] rounded-xl border border-border bg-white px-3 py-2 shadow-lg',
              // hidden by default
              'opacity-0 invisible translate-y-1',
              // visible while hovering the group (button, bridge, or panel)
              'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
              'transition ease-out duration-150'
            )}
          >
            <ul className="space-y-3">
              <li>
                <Link
                  href="/pedals"
                  className="block px-1 py-1 text-xs uppercase tracking-tight
             text-muted-foreground hover:text-foreground hover:underline"
                >
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

        {/* ── Contact dropdown (same pattern) ──────────────────────────────── */}
        <div className="relative group">
          <button
            className={cn(
              baseNavItemClasses,
              isActive('/contact') && 'text-black'
            )}
            type="button"
          >
            Contact
          </button>

          {/* Hover bridge */}
          <div
            className="
              absolute left-1/2 top-full 
              h-3 w-24 -translate-x-1/2
            "
          />

          <div
            className={cn(
              'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2',
              'min-w-[180px] rounded-xl border border-border bg-white px-3 py-2 shadow-lg',
              'opacity-0 invisible translate-y-1',
              'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
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
      </nav>
    </header>
  );
}
