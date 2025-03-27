import { ItemDetailsForm } from "@/app/components/ItemDetailsForm";
import { TableFormData, TableStatus } from "@/types/tables";
import Link from "next/link";
import { getTable, saveTable } from "@/services/tableService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailsPage({ params }: PageProps) {
  const { id } = await params;

  const isNew = id === "new";
  const table = await getTable(id);

  // Default values for a new table
  const defaultValues: TableFormData = {
    title: "",
    description: "",
    status: TableStatus.PENDING,
  };

  // For existing tables, if not found, show error
  if (!isNew && !table) {
    return (
      <div className="bg-white p-6 min-h-screen">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-800 text-3xl mr-4">
            <svg
              width="13"
              height="20"
              viewBox="0 0 13 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6833 2.35L10.3333 0L0.333313 10L10.3333 20L12.6833 17.65L5.04998 10L12.6833 2.35Z"
                fill="black"
                fillOpacity="0.54"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Table Not Found</h1>
        </div>
        <p>The requested table could not be found.</p>
      </div>
    );
  }

  // Prepare form data - either from existing table or defaults for new
  const formData: TableFormData = isNew
    ? defaultValues
    : {
        title: table!.title,
        description: table!.description,
        status: table!.status as TableStatus,
      };

  return (
    <div className="bg-white p-12 min-h-screen">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-gray-800 text-3xl mr-4">
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6833 2.35L10.3333 0L0.333313 10L10.3333 20L12.6833 17.65L5.04998 10L12.6833 2.35Z"
              fill="black"
              fillOpacity="0.54"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Item Details</h1>
      </div>

      <ItemDetailsForm action={saveTable} initialValues={formData} id={id} />
    </div>
  );
}
