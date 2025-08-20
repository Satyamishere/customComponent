import React, { useState } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortAsc]);

  const handleSelectRow = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter(r => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  return (
    <div className="overflow-x-auto rounded border border-gray-200 dark:border-gray-700">
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No data available</div>
      ) : (
        <table className="min-w-full bg-white dark:bg-gray-900">
          <thead>
            <tr>
              {selectable && <th></th>}
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left font-semibold cursor-pointer select-none"
                  onClick={() => col.sortable && handleSort(col.key)}
                  aria-sort={sortKey === col.key ? (sortAsc ? 'ascending' : 'descending') : undefined}
                >
                  {col.title}
                  {col.sortable && sortKey === col.key && (
                    <span className="ml-1">{sortAsc ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={i} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                {selectable && (
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleSelectRow(row)}
                      aria-label="Select row"
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
