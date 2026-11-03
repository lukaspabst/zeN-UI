import { useState, useEffect, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

export interface ZenNavbarProps {
  readonly brandTitle: ReactNode;
  readonly brandSubtitle?: ReactNode;
  readonly navSlot?: ReactNode;
  readonly actionsSlot?: ReactNode;
  readonly className?: string;
}

export function ZenNavbar({
  brandTitle,
  brandSubtitle,
  navSlot,
  actionsSlot,
  className = '',
}: ZenNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      data-zen-occlude="true"
      className={`fixed top-0 inset-x-0 z-30 border-b border-[var(--zen-border-subtle)] bg-[var(--zen-surface-header)] backdrop-blur-xl ${className}`.trim()}
    >
      <div className="max-w-[90rem] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span className="zen-font-serif italic text-xl sm:text-3xl tracking-tight text-[var(--zen-ink-primary)] truncate">
            {brandTitle}
          </span>
          {brandSubtitle && (
            <span className="hidden xl:inline-block zen-telemetry-label truncate">
              {brandSubtitle}
            </span>
          )}
        </div>

        {navSlot && (
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1.5 shrink-0"
          >
            {navSlot}
          </nav>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {actionsSlot}

          {navSlot && (
            <button
              type="button"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="zen-focus-ring lg:hidden inline-flex items-center justify-center p-2 rounded-xl border border-[var(--zen-border-default)] bg-[var(--zen-surface-1)] text-[var(--zen-ink-primary)] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-[var(--zen-accent-primary)]" />
              ) : (
                <Menu className="w-4 h-4 text-[var(--zen-accent-primary)]" />
              )}
            </button>
          )}
        </div>
      </div>

      {navSlot && mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden border-t border-[var(--zen-border-subtle)] bg-[var(--zen-bg-elevated)] px-4 py-3 flex flex-col gap-1 shadow-xl"
        >
          {navSlot}
        </nav>
      )}
    </header>
  );
}
