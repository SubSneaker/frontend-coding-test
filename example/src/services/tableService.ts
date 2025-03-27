'use server';

import { Table, TableStatus } from "@/types/tables";

/**
 * Creates a new table or updates an existing one
 */
export async function saveTable(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  
  // Choose method based on whether it's a new table or existing one
  const isNew = id === 'new';
  const tableData = {
    title,
    description,
    status: status as TableStatus
  };
  
  try {
    const url = isNew 
      ? "http://example.com/api/tables" 
      : `http://example.com/api/tables/${id}`;
      
    const method = isNew ? 'POST' : 'PUT';
    console.log(url, method, tableData);
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    });
    
    if (!response.ok) {
      return { 
        success: false, 
        message: `Failed to ${isNew ? 'create' : 'update'} table. Server returned ${response.status}` 
      };
    }
    console.log('#### response ####');
    console.log(response);
    return { 
      success: true, 
      message: `Table ${isNew ? 'created' : 'updated'} successfully!` 
    };
  } catch (error) {
    console.error('Error saving table:', error);
    return { 
      success: false, 
      message: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Fetches a table by ID
 */
export async function getTable(id: string): Promise<Table | null> {
  // If it's a new table, don't fetch anything
  if (id === 'new') return null;
  
  try {
    const response = await fetch(`http://example.com/api/tables/${id}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching table:', error);
    return null;
  }
}

/**
 * Fetches all tables
 */
export async function getTables(): Promise<Table[]> {
  try {
    const response = await fetch("http://example.com/api/tables");
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
} 