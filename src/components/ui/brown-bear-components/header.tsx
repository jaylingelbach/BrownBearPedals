'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop dropdown state
  const [pedalsOpen, setPedalsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const pedalsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pedalsMenuRef = useRef<HTMLUListElement | null>(null);

  const contactTriggerRef = useRef<HTMLButtonElement | null>(null);
  const contactMenuRef = useRef<HTMLUListElement | null>(null);

  // Mobile menu refs
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const wasMobileOpenRef = useRef(false);

  const baseNavItemClasses =
    'whitespace-nowrap text-xs font-medium tracking-tight uppercase text-muted-foreground ' +
    'focus-visible:outline-none focus-visible:underline';

  // keep CodeRabbit’s suggested tweaks
  const dropDownItemClass =
    'block px-1 py-1 text-xs uppercase tracking-tight text-muted-foreground ' +
    'hover:text-foreground hover:underline ' +
    'focus-visible:outline-none focus-visible:underline';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  // ── Keyboard helpers for desktop menus ────────────────────────────────────

  function focusFirstMenuItem(menuRef: typeof pedalsMenuRef) {
    const firstLink =
      menuRef.current?.querySelector<HTMLAnchorElement>('a, button');
    firstLink?.focus();
  }

  function handleMenuKeyDown(
    event: KeyboardEvent<HTMLUListElement>,
    menuRef: typeof pedalsMenuRef,
    closeMenu: () => void,
    triggerRef: typeof pedalsTriggerRef
  ) {
    const links =
      menuRef.current?.querySelectorAll<HTMLAnchorElement>('a, button');
    if (!links || links.length === 0) return;

    const items = Array.from(links);
    const currentIndex = items.findIndex(
      (item) => item === document.activeElement
    );

    switch (event.key) {
      case 'Escape': {
        event.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex =
          currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
        items[nextIndex].focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex =
          currentIndex < 0
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].focus();
        break;
      }
      default:
        break;
    }
  }

  function handleTriggerKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    open: boolean,
    setOpen: (next: boolean) => void,
    menuRef: typeof pedalsMenuRef
  ) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const next = !open;
      setOpen(next);
      if (next) {
        // move focus into the menu
        setTimeout(() => focusFirstMenuItem(menuRef), 0);
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      }
      setTimeout(() => focusFirstMenuItem(menuRef), 0);
    }
  }

  // ── Mobile menu: focus management & focus trap ────────────────────────────

  useEffect(() => {
    if (mobileOpen) {
      const panel = mobileMenuRef.current;
      if (!panel) {
        wasMobileOpenRef.current = true;
        return;
      }

      const firstFocusable = panel.querySelector<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
      wasMobileOpenRef.current = true;
    } else if (wasMobileOpenRef.current) {
      // only restore focus if it was actually open
      mobileToggleRef.current?.focus();
      wasMobileOpenRef.current = false;
    }
  }, [mobileOpen]);

  function handleMobilePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setMobileOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const panel = mobileMenuRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'));

    if (focusable.length === 0) return;

    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    const current = document.activeElement as HTMLElement | null;

    if (!event.shiftKey && current === lastEl) {
      // Tab on last item wraps to first
      event.preventDefault();
      firstEl.focus();
    } else if (event.shiftKey && current === firstEl) {
      // Shift+Tab on first item wraps to last
      event.preventDefault();
      lastEl.focus();
    }
  }

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
          <div
            className="relative"
            onMouseEnter={() => setPedalsOpen(true)}
            onMouseLeave={() => setPedalsOpen(false)}
          >
            <button
              ref={pedalsTriggerRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={pedalsOpen}
              aria-controls="pedals-menu"
              className={cn(
                baseNavItemClasses,
                isActive('/pedals') && 'text-foreground'
              )}
              onKeyDown={(event) =>
                handleTriggerKeyDown(
                  event,
                  pedalsOpen,
                  setPedalsOpen,
                  pedalsMenuRef
                )
              }
              onBlur={(e) => {
                // Close if focus is leaving the entire dropdown region
                const menu = pedalsMenuRef.current;
                if (menu && !menu.contains(e.relatedTarget as Node)) {
                  setPedalsOpen(false);
                }
              }}
            >
              Pedals
            </button>

            {/* hover bridge */}
            <div className="absolute left-1/2 top-full h-3 w-24 -translate-x-1/2" />

            {/* container div handles positioning/animation */}
            <div
              className={cn(
                'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2',
                'min-w-[180px] rounded-xl border border-border bg-background px-3 py-2 shadow-lg',
                'transition ease-out duration-150',
                pedalsOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible translate-y-1'
              )}
            >
              <ul
                id="pedals-menu"
                role="menu"
                ref={pedalsMenuRef}
                onKeyDown={(event) =>
                  handleMenuKeyDown(
                    event,
                    pedalsMenuRef,
                    () => setPedalsOpen(false),
                    pedalsTriggerRef
                  )
                }
                className="space-y-3"
              >
                <li role="none">
                  <Link
                    href="/pedals"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    All Pedals
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/pedals?productLine=Tarot"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    Tarot Series
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/pedals?productLine=Limited"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    Limited Release
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/pedals?productLine=Custom"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    Custom Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Contact dropdown (desktop) ──────────────────────────── */}
          <div
            className="relative"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <button
              ref={contactTriggerRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={contactOpen}
              aria-controls="contact-menu"
              className={cn(
                baseNavItemClasses,
                isActive('/contact') && 'text-foreground'
              )}
              onKeyDown={(event) =>
                handleTriggerKeyDown(
                  event,
                  contactOpen,
                  setContactOpen,
                  contactMenuRef
                )
              }
              onBlur={(e) => {
                // Close if focus is leaving the entire dropdown region
                const menu = contactMenuRef.current;
                if (menu && !menu.contains(e.relatedTarget as Node)) {
                  setContactOpen(false);
                }
              }}
            >
              Contact
            </button>

            <div className="absolute left-1/2 top-full h-3 w-24 -translate-x-1/2" />

            <div
              className={cn(
                'absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2',
                'min-w-[180px] rounded-xl border border-border bg-background px-3 py-2 shadow-lg',
                'transition ease-out duration-150',
                contactOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible translate-y-1'
              )}
            >
              <ul
                id="contact-menu"
                role="menu"
                ref={contactMenuRef}
                onKeyDown={(event) =>
                  handleMenuKeyDown(
                    event,
                    contactMenuRef,
                    () => setContactOpen(false),
                    contactTriggerRef
                  )
                }
                className="space-y-3"
              >
                <li role="none">
                  <Link
                    href="/contact"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    Contact Us
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/support"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    Support
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/faq"
                    role="menuitem"
                    className={dropDownItemClass}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile hamburger (md and down) */}
        <button
          ref={mobileToggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
          aria-label="Toggle navigation"
          aria-controls="mobile-nav"
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
          ref={mobileMenuRef}
          className="border-t border-border bg-background md:hidden"
          id="mobile-nav"
          onKeyDown={handleMobilePanelKeyDown}
        >
          <div className="mx-auto max-w-6xl space-y-4 px-4 py-4">
            <Link
              href="/about"
              className={cn(
                'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                isActive('/about') && 'text-foreground font-semibold'
              )}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/merch"
              className={cn(
                'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                isActive('/merch') && 'text-foreground font-semibold'
              )}
              onClick={() => setMobileOpen(false)}
            >
              Merch
            </Link>

            <div className="pt-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-tight text-foreground">
                Pedals
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  href="/pedals"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/pedals') && 'text-foreground font-semibold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  All Pedals
                </Link>
                <Link
                  href="/pedals?productLine=Tarot"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/pedals?productLine=Tarot') &&
                      'text-foreground font-semibold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Tarot Series
                </Link>
                <Link
                  href="/pedals?productLine=Limited"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/pedals?productLine=Limited') &&
                      'text-foreground font-semibold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Limited Release
                </Link>
                <Link
                  href="/pedals?productLine=Custom"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/pedals?productLine=Custom') &&
                      'text-foreground font-semibold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Custom Order
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-tight text-foreground">
                Contact
              </p>
              <div className="mt-1 space-y-1">
                <Link
                  href="/contact"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/contact') && 'text-foreground font-semibold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/support"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/support') && 'text-foreground font-semibold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  Support
                </Link>
                <Link
                  href="/faq"
                  className={cn(
                    'block py-2 text-sm uppercase tracking-tight text-muted-foreground',
                    isActive('/faq') && 'text-foreground font-semibold'
                  )}
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
