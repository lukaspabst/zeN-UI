import { useState, useRef, useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Check, Copy, Loader2 } from 'lucide-react';

export type ZenButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ZenButtonSize = 'sm' | 'md' | 'lg';

export interface ZenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ZenButtonVariant;
  readonly size?: ZenButtonSize;
  readonly pressed?: boolean;
  readonly mono?: boolean;
  readonly loading?: boolean;
  readonly iconLeft?: ReactNode;
  readonly iconRight?: ReactNode;
  readonly children: ReactNode;
}

const SIZE_CLASSES: Record<ZenButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-xs sm:text-sm',
  lg: 'px-6 py-3.5 text-sm',
};

const VARIANT_CLASSES: Record<ZenButtonVariant, string> = {
  primary: 'zen-btn-primary',
  secondary: 'zen-btn-secondary',
  ghost: 'zen-btn-ghost',
  danger: 'zen-btn-danger',
};

export function ZenButton({
  variant = 'primary',
  size = 'md',
  pressed,
  mono = false,
  loading = false,
  iconLeft,
  iconRight,
  disabled,
  className = '',
  children,
  ...rest
}: ZenButtonProps) {
  const isPressed = pressed === true;
  const pressedClasses =
    isPressed && variant !== 'primary'
      ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] border-[var(--zen-accent-primary)] shadow-[var(--zen-shadow-btn-primary)]'
      : '';

  return (
    <button
      type="button"
      data-zen-occlude="true"
      aria-pressed={pressed}
      disabled={disabled || loading}
      className={`zen-btn-base zen-focus-ring ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${
        mono ? 'zen-font-mono' : 'zen-font-sans'
      } ${pressedClasses} ${className}`.trim()}
      {...rest}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        iconLeft && <span className="shrink-0 inline-flex">{iconLeft}</span>
      )}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 inline-flex">{iconRight}</span>}
    </button>
  );
}

export interface ZenCopyButtonProps {
  readonly value: string;
  readonly label?: string;
  readonly copiedLabel?: string;
  readonly size?: ZenButtonSize;
  readonly variant?: ZenButtonVariant;
  readonly className?: string;
}

export function ZenCopyButton({
  value,
  label = 'COPY',
  copiedLabel = 'COPIED',
  size = 'md',
  variant = 'secondary',
  className = '',
}: ZenCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ZenButton
      variant={variant}
      size={size}
      mono
      onClick={handleCopy}
      className={className}
      iconLeft={
        copied ? (
          <Check className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />
        )
      }
    >
      {copied ? copiedLabel : label}
    </ZenButton>
  );
}
