import { Table, TableHeader, TableStatus } from "@/types/tables";
import Image from 'next/image';
import Link from 'next/link';

interface TableListProps {
  tables: Table[];
}

const TABLE_HEADERS: TableHeader[] = [
  { key: 'icon', label: '' },
  { key: 'title', label: 'Title' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Date Created' },
] as const;

const STATUS_STYLES = {
  [TableStatus.COMPLETED]: { text: 'Done', dot: 'bg-status-done' },
  [TableStatus.IN_PROGRESS]: { text: 'In Progress', dot: 'bg-status-progress' },
  [TableStatus.PENDING]: { text: 'Pending', dot: 'bg-status-pending' },
} as const;

export function TableList({ tables }: TableListProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');
  };

  return (
    <div className="rounded-lg font-light">

      <ul className="text-sm">
      <li className="grid grid-cols-[20px_3fr_1fr_1fr] py-1 p-3">
          {TABLE_HEADERS.map(({ key, label }) => (
            <div key={key} className="pl-3 text-left text-base text-primary-600 font-normal">
              {label}
            </div>
          ))}
        </li>
        {tables.map((table) => (
          <Link href={`/details/${table.id}`} key={table.id} className="block hover:bg-gray-50">
            <li className="py-4 px-3 bg-white grid grid-cols-[20px_3fr_1fr_1fr] mb-2 rounded-lg">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image src="/table.svg" alt="Table" width={20} height={20} className="text-accent-blue" />
              </div>
              <div className="pl-3 flex items-center gap-3">
                <span className="text-primary-900 table-title">{table.title}</span>
              </div>
              <div className={`pl-3 table-status`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${STATUS_STYLES[table.status].dot}`} />
                  <span>
                    {STATUS_STYLES[table.status].text}
                  </span>
                </div>
              </div>
              <div className={`pl-3 table-date`}>
                {formatDate(table.created_at)}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
} 