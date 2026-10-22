import { useId } from 'react';
import { cx } from '../../lib/cx';

interface DataTableProps {
  columns: string[];
  rows: string[][];
  caption: string;
  className?: string;
  highlightFirstColumn?: boolean;
}

export function DataTable({ columns, rows, caption, className, highlightFirstColumn = true }: DataTableProps) {
  const id = useId();
  return (
    <div className={cx('data-table', className)}>
      <div className="data-table__scroll" tabIndex={0} role="region" aria-labelledby={id}>
        <table>
          <caption id={id}>{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th scope="col" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  const Tag = cellIndex === 0 && highlightFirstColumn ? 'th' : 'td';
                  return (
                    <Tag
                      key={`${cell}-${cellIndex}`}
                      {...(cellIndex === 0 && highlightFirstColumn ? { scope: 'row' as const } : {})}
                    >
                      {cell}
                    </Tag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
