import { ItemDetailsForm } from "@/app/components/ItemDetailsForm";
import { Table, TableFormData, TableStatus } from "@/types/tables";
import Link from "next/link";

// Combined server action for form submission
export async function saveTable(formData: FormData) {
  "use server";

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

async function getTable(id: string): Promise<Table | null> {
  // If it's a new table, don't fetch anything
  if (id === 'new') return null;
  
  // In a real app, you would fetch the table from your API
  try {
    const response = await fetch(`http://example.com/api/tables/${id}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching table:', error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailsPage({ params }: PageProps) {
  const { id } = await params;
  
  const isNew = id === 'new';
  const table = await getTable(id);
  
  // Default values for a new table
  const defaultValues: TableFormData = {
    title: '',
    description: '',
    status: TableStatus.PENDING
  };
  
  // For existing tables, if not found, show error
  if (!isNew && !table) {
    return (
      <div className="p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-8">
            <Link href="/" className="text-gray-800 text-3xl mr-4">
              &lt;
            </Link>
            <h1 className="text-2xl font-bold">Table Not Found</h1>
          </div>
          <p>The requested table could not be found.</p>
        </div>
      </div>
    );
  }
  
  // Prepare form data - either from existing table or defaults for new
  const formData: TableFormData = isNew
    ? defaultValues
    : {
        title: table!.title,
        description: table!.description,
        status: table!.status as TableStatus
      };

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-800 text-3xl mr-4">
          <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6833 2.35L10.3333 0L0.333313 10L10.3333 20L12.6833 17.65L5.04998 10L12.6833 2.35Z" fill="black" fillOpacity="0.54"/>
          </svg>
          </Link>
          <h1 className="text-2xl font-bold">
            Item Details
          </h1>
        </div>
        
        <ItemDetailsForm 
          action={saveTable} 
          initialValues={formData} 
          id={id}
        />
      </div>
    </div>
  );
} 