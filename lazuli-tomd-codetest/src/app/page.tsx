import { TableList } from "./components/TableList";
import { Button } from "./components/Button";
import Link from "next/link";
import { getTables } from "@/services/tableService";

export default async function Home() {
  const tables = await getTables();

  return (
    <div>
      <nav className="bg-white flex items-center justify-between py-5 px-12 rounded-lg
            border-b border-accent-lightest">
        <h1 className="text-2xl font-bold">Lazuli Coding Test</h1>
        <Link href="/details/new">
          <Button text="Create New" />
        </Link>
      </nav>
      <section className="main-content mx-12">
        <TableList tables={tables} />
      </section>
    </div>
  );
}
