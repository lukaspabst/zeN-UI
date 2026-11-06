import { useState, useMemo, type ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export interface ZenTableColumn<T> {
  readonly key: string;
  readonly header: string;
  readonly align?: 'left' | 'right';
  readonly mono?: boolean;
  readonly sortable?: boolean;
  readonly sortValue?: (row: T) => string | number;
  readonly render: (row: T) => ReactNode;
}

export interface ZenDataTableProps<T> {
  readonly columns: readonly ZenTableColumn<T>[];
  readonly rows: readonly T[];
  readonly rowKey: (row: T) => string;
  readonly caption?: string;
  readonly emptyMessage?: string;
  readonly className?: string;
}

export function ZenDataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  emptyMessage = 'No telemetry records available.',
  className = '',
}: ZenDataTableProps<T>) {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (colKey: string) => {
    if (sortCol === colKey) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(colKey);
      setSortDir('asc');
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortCol) return rows;
    const col = columns.find((c) => c.key === sortCol);
    if (!col || !col.sortValue) return rows;
    const getter = col.sortValue;
    return [...rows].sort((a, b) => {
      const va = getter(a);
      const vb = getter(b);
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, columns, sortCol, sortDir]);

  return (
    <div
      data-zen-occlude="true"
      className={`zen-table-wrapper overflow-x-auto rounded-2xl border border-[var(--zen-border-default)] zen-surface-static ${className}`.trim()}
    >
      <table className="w-full border-collapse text-left text-xs sm:text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)]">
            {columns.map((col) => {
              const isSorted = sortCol === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    col.sortable
                      ? isSorted
                        ? sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                      : undefined
                  }
                  className={`px-4 py-3 zen-telemetry-label ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="zen-focus-ring inline-flex items-center gap-1.5 hover:text-[var(--zen-ink-primary)] cursor-pointer"
                    >
                      <span>{col.header}</span>
                      {isSorted ? (
                        sortDir === 'asc' ? (
                          <ZenIcon name="chevron-down" size="xs" tone="accent" className="rotate-180" />
                        ) : (
                          <ZenIcon name="chevron-down" size="xs" tone="accent" />
                        )
                      ) : (
                        <ZenIcon name="sliders" size="xs" className="opacity-50" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--zen-border-subtle)]">
          {sortedRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center zen-font-mono text-xs text-[var(--zen-ink-muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedRows.map((row) => (
              <tr
                key={rowKey(row)}
                className="hover:bg-[var(--zen-surface-subtle)] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 text-[var(--zen-ink-primary)] ${
                      col.align === 'right' ? 'text-right' : 'text-left'
                    } ${col.mono ? 'zen-font-mono' : 'zen-font-sans'}`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
