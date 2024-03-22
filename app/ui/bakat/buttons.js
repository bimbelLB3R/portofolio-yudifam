import { deleteBakatById } from "@/app/lib/actions";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateBakat() {
  return (
    <Link
      href="/dashboard/bakat/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Tambah Bakat</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function GrafikBakat({ id }) {
  // console.log(`idupdate=${id}`);
  return (
    <Link
      href={`/dashboard/bakat/${id}/grafik`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ChartBarIcon className="w-5" />
    </Link>
  );
}
export function UpdateBakat({ id }) {
  // console.log(`idupdate=${id}`);
  return (
    <Link
      href={`/dashboard/bakat/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBakat({ iddel }) {
  // const idBakatwillDel = id;
  // console.log(`bakatskirim=${bakats}`);
  // const deleteBakatWithId = deleteBakatById.bind(null, id);
  return (
    <>
      <form action={deleteBakatById}>
        <input type="hidden" name="id_bakat" value={iddel} />
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
