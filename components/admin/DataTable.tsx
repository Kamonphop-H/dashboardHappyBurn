/** @format */

interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-[var(--nkt-border)] overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-50 border-b border-[var(--nkt-border)]'>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className='px-6 py-3 text-left text-xs font-medium text-[var(--nkt-muted)] uppercase tracking-wider'
                >
                  {column.label}
                  {column.sortable && <i className='fas fa-sort ml-1 text-xs opacity-50'></i>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-[var(--nkt-border)]'>
            {data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
              >
                {columns.map((column) => (
                  <td key={column.key} className='px-6 py-4 text-sm text-[var(--nkt-text)]'>
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
