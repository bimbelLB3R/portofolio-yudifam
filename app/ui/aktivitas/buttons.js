import { deleteBakatById } from "@/app/lib/actions";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateAktivitas() {
  return (
    <Link
      href="/dashboard/aktivitas/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-gray-400"
    >
      {/* <span className="hidden md:block">Tambah Bakat</span>{" "} */}
      <PlusIcon className="h-5" />
    </Link>
  );
}

export function UpdateAktivitas({ id }) {
  // console.log(`idupdate=${id}`);
  return (
    <Link
      href={`/dashboard/aktivitas/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 active:bg-gray-400"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBakat({ iddel,id }) {
  // const idBakatwillDel = id;
  // console.log(`bakatskirim=${bakats}`);
  // const deleteBakatWithId = deleteBakatById.bind(null, id);
  return (
    <>
      <form action={deleteBakatById}>
        <input type="hidden" name="id_bakat" value={iddel} />
        <input type="hidden" name="id" value={id} />
        <button className="rounded-md border p-2 hover:bg-gray-100 active:bg-gray-400">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

export function BeriTanggapan() {
    return (
      <Link
        href="/dashboard/aktivitas/create"
        className="text-gray-600"
      >
        <p className="block text-center text-xs underline">Beri Tanggapan</p>{" "}
      </Link>
    );
  }
