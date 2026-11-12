import { useState, useCallback, type ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export type ZenToastTone = 'info' | 'success' | 'warning';

export interface ZenToastItem {
  readonly id: string;
  readonly title: string;
  readonly detail?: string;
  readonly tone?: ZenToastTone;
}

export interface ZenToastStackProps {
  readonly toasts: readonly ZenToastItem[];
  readonly onDismiss: (id: string) => void;
}

const TONE_ICONS: Record<ZenToastTone, ReactNode> = {
  info: <ZenIcon name="info" size="md" className="text-[var(--zen-status-info)]" />,
  success: (
    <ZenIcon name="success" size="md" tone="success" />
  ),
  warning: (
    <ZenIcon name="warning" size="md" tone="accent" />
  ),
};

export function ZenToastStack({ toasts, onDismiss }: ZenToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      data-zen-occlude="true"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 sm:max-w-sm sm:w-full pointer-events-none"
    >
      {toasts.map((t) => {
        const tone = t.tone ?? 'info';
        return (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl bg-[var(--zen-bg-elevated)] border border-[var(--zen-border-strong)] shadow-[var(--zen-shadow-hud)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="mt-0.5">{TONE_ICONS[tone]}</div>
              <div className="min-w-0">
                <div className="zen-font-mono text-xs font-semibold text-[var(--zen-ink-primary)]">
                  {t.title}
                </div>
                {t.detail && (
                  <div className="text-xs text-[var(--zen-ink-secondary)] mt-0.5 break-words">
                    {t.detail}
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => onDismiss(t.id)}
              className="zen-focus-ring p-1 rounded-lg text-[var(--zen-ink-muted)] hover:text-[var(--zen-ink-primary)] cursor-pointer shrink-0"
            >
              <ZenIcon name="close" size="sm" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function useZenToast() {
  const [toasts, setToasts] = useState<readonly ZenToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ZenToastItem, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { ...toast, id }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 4200);
    },
    [dismissToast]
  );

  return {
    toasts,
    pushToast,
    dismissToast,
  };
}
