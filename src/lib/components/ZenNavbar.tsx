import { useState, useEffect, type ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export interface ZenNavbarProps {
  readonly brandTitle: ReactNode;
  readonly brandSubtitle?: ReactNode;
  readonly navSlot?: ReactNode;
  readonly actionsSlot?: ReactNode;
  readonly mobileActionsSlot?: ReactNode;
  readonly className?: string;
}

export function ZenNavbar({
  brandTitle,
  brandSubtitle,
  navSlot,
  actionsSlot,
  mobileActionsSlot,
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
        <div className="flex items-center gap-3 min-w-0">
          <span className="zen-font-serif italic text-base min-[360px]:text-lg sm:text-xl lg:text-2xl tracking-tight text-[var(--zen-ink-primary)] inline-flex items-center shrink-0">
            {brandTitle}
          </span>
          {brandSubtitle && (
            <span className="hidden xl:inline-block zen-telemetry-label truncate min-w-0">
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

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {actionsSlot}

          {navSlot && (
            <button
              type="button"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="zen-focus-ring lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[var(--zen-border-default)] bg-[var(--zen-surface-1)] text-[var(--zen-ink-primary)] cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? (
                <ZenIcon name="close" size="md" tone="accent" />
              ) : (
                <ZenIcon name="menu" size="md" tone="accent" />
              )}
            </button>
          )}
        </div>
      </div>

      {navSlot && mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--zen-border-subtle)] bg-[var(--zen-bg-elevated)] px-4 py-3.5 space-y-3 shadow-xl">
          {brandSubtitle && (
            <div className="px-2 pb-2 border-b border-[var(--zen-border-subtle)] zen-telemetry-label text-[var(--zen-ink-muted)] truncate">
              {brandSubtitle}
            </div>
          )}
          <nav
            aria-label="Mobile navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col gap-1"
          >
            {navSlot}
          </nav>
          {mobileActionsSlot && (
            <div className="pt-2 border-t border-[var(--zen-border-subtle)] flex flex-wrap items-center gap-2">
              {mobileActionsSlot}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
