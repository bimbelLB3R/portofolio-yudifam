import { deleteIndividualitasById } from "@/app/lib/actionsIndividualitas";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateIndividualitas() {
  return (
    <Link
      href="/dashboard/individualitas/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-gray-300"
    >
      <span className="hidden md:block">Tambah Data Individualitas</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateIndividualitas({ id }) {
  // console.log(`idupdate=${id}`);
  return (
    <Link
      href={`/dashboard/individualitas/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 active:bg-gray-300"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteIndividualitas({ iddel,id }) {
  // const idBakatwillDel = id;
  // console.log(`bakatskirim=${bakats}`);
  // const deleteBakatWithId = deleteBakatById.bind(null, id);
  return (
    <>
      <form action={deleteIndividualitasById}>
      <input type="hidden" name="id_individualitas" value={iddel} />
      <input type="hidden" name="id" value={id} />
        <button className="rounded-md border p-2 hover:bg-gray-100 active:bg-gray-300">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
