// Represents the possible statuses of a table
export enum TableStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
}

// Represents the data that is received from the server
export interface Table {
  id: string;
  title: string;
  status: TableStatus;
  created_at: string;
  description: string;
}

// Represents the data that is sent to the server
export interface TableFormData {
  id?: string;
  title: string;
  status: TableStatus;
  description: string;
}

// Represents the data that is used to display the table headers
export interface TableHeader {
  key: string;
  label: string;
} 