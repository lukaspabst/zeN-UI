import {
  useState,
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { Search, X, ChevronDown, CornerDownLeft } from 'lucide-react';
import { ZenKbd } from './ZenBadge';

export interface ZenCommandItem {
  readonly id: string;
  readonly label: string;
  readonly group: string;
  readonly shortcut?: readonly string[];
  readonly icon?: ReactNode;
  readonly onSelect: () => void;
}

export interface ZenCommandPaletteProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly items: readonly ZenCommandItem[];
  readonly placeholder?: string;
}

export function ZenCommandPalette({
  open,
  onClose,
  items,
  placeholder = 'Execute a command or jump to a primitive...',
}: ZenCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const filtered = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    window.setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) {
        setActiveIndex(
          (prev) => (prev - 1 + filtered.length) % filtered.length
        );
      }
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].onSelect();
      onClose();
    }
  };

  return (
    <div
      data-zen-occlude="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-4 bg-black/70 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="w-full max-w-xl max-h-[85dvh] flex flex-col rounded-3xl zen-surface-selected overflow-hidden shadow-2xl"
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--zen-border-subtle)]">
          <Search className="w-4 h-4 text-[var(--zen-accent-primary)] shrink-0" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-[var(--zen-ink-primary)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none zen-font-mono"
          />
          <ZenKbd keys={['Esc']} />
        </div>

        <ul
          id={listboxId}
          role="listbox"
          className="max-h-80 overflow-y-auto p-2 space-y-1"
        >
          {filtered.length === 0 ? (
            <li className="py-8 text-center zen-font-mono text-xs text-[var(--zen-ink-muted)]">
              No matching commands found.
            </li>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    item.onSelect();
                    onClose();
                  }}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    active
                      ? 'bg-[var(--zen-accent-subtle)] text-[var(--zen-ink-primary)]'
                      : 'text-[var(--zen-ink-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.icon && (
                      <span className="text-[var(--zen-accent-primary)] shrink-0">
                        {item.icon}
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate">
                        {item.label}
                      </div>
                      <div className="zen-telemetry-label">{item.group}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.shortcut && <ZenKbd keys={item.shortcut} />}
                    {active && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export interface ZenDrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
}

export function ZenDrawer({
  open,
  onClose,
  title,
  subtitle,
  footer,
  children,
}: ZenDrawerProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      data-zen-occlude="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md h-full bg-[var(--zen-bg-elevated)] border-l border-[var(--zen-border-strong)] p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
      >
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--zen-border-subtle)]">
            <div>
              <div className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                SLIDE-OVER INSPECTOR
              </div>
              <h2
                id={titleId}
                className="zen-font-display text-2xl font-bold text-[var(--zen-ink-primary)] mt-1"
              >
                {title}
              </h2>
              {subtitle && (
                <div className="zen-font-serif italic text-lg text-[var(--zen-accent-primary)]">
                  {subtitle}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Close drawer"
              onClick={onClose}
              className="zen-focus-ring p-2 rounded-full border border-[var(--zen-border-default)] text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-sm text-[var(--zen-ink-secondary)] space-y-4">
            {children}
          </div>
        </div>

        {footer && (
          <div className="pt-4 border-t border-[var(--zen-border-subtle)] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export interface ZenAccordionItem {
  readonly id: string;
  readonly title: string;
  readonly badge?: string;
  readonly content: ReactNode;
}

export interface ZenAccordionProps {
  readonly items: readonly ZenAccordionItem[];
  readonly defaultOpenId?: string;
  readonly className?: string;
}

export function ZenAccordion({
  items,
  defaultOpenId,
  className = '',
}: ZenAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? items[0]?.id ?? null
  );

  return (
    <div
      data-zen-occlude="true"
      className={`space-y-2.5 ${className}`.trim()}
    >
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-[var(--zen-border-default)] bg-[var(--zen-surface-1)] overflow-hidden"
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="zen-focus-ring w-full px-5 py-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-[var(--zen-surface-subtle)] transition-colors"
              >
                <span className="zen-font-display font-bold text-sm sm:text-base text-[var(--zen-ink-primary)]">
                  {item.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--zen-ink-muted)] transition-transform ${
                      isOpen
                        ? 'rotate-180 text-[var(--zen-accent-primary)]'
                        : ''
                    }`}
                  />
                </div>
              </button>
            </h3>
            {isOpen && (
              <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[var(--zen-ink-secondary)] leading-relaxed border-t border-[var(--zen-border-subtle)]">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export interface ZenTooltipProps {
  readonly content: string;
  readonly children: ReactNode;
}

export function ZenTooltip({ content, children }: ZenTooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setVisible(false);
      }}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-[var(--zen-bg-elevated)] border border-[var(--zen-border-strong)] zen-font-mono text-[11px] text-[var(--zen-ink-primary)] whitespace-nowrap shadow-lg z-50 pointer-events-none"
        >
          {content}
        </span>
      )}
    </span>
  );
}

export interface ZenDividerProps {
  readonly label?: string;
  readonly className?: string;
}

export function ZenDivider({ label, className = '' }: ZenDividerProps) {
  if (!label) {
    return (
      <hr
        className={`border-0 border-t border-[var(--zen-border-subtle)] ${className}`.trim()}
      />
    );
  }
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <div className="h-px flex-1 bg-[var(--zen-border-subtle)]" />
      <span className="zen-telemetry-label">{label}</span>
      <div className="h-px flex-1 bg-[var(--zen-border-subtle)]" />
    </div>
  );
}
