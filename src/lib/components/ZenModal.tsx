import { useEffect, useId, useRef, type ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export interface ZenModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
}

export function ZenModal({
  open,
  onClose,
  eyebrow = 'SYSTEM DIALOG',
  title,
  subtitle,
  footer,
  children,
}: ZenModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (!dialogRef.current || !dialogRef.current.contains(document.activeElement)) {
      closeButtonRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      data-zen-occlude="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onCloseRef.current();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl max-h-[90dvh] overflow-y-auto rounded-3xl zen-surface-selected p-5 sm:p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <div className="zen-telemetry-label text-[var(--zen-accent-primary)] mb-1">
              {eyebrow}
            </div>
            <h2
              id={titleId}
              className="zen-font-display text-xl sm:text-3xl font-bold text-[var(--zen-ink-primary)]"
            >
              {title}
            </h2>
            {subtitle && (
              <div className="zen-font-serif italic text-base sm:text-lg text-[var(--zen-accent-primary)] mt-0.5">
                {subtitle}
              </div>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="zen-focus-ring p-2 rounded-full border border-[var(--zen-border-default)] hover:border-[var(--zen-accent-primary)] text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)] cursor-pointer transition-colors shrink-0"
          >
            <ZenIcon name="close" size="md" />
          </button>
        </div>

        <div className="text-sm text-[var(--zen-ink-secondary)] leading-relaxed">
          {children}
        </div>

        {footer && (
          <div className="mt-6 pt-4 border-t border-[var(--zen-border-subtle)] flex flex-wrap items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
