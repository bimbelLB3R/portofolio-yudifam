import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "../fonts";
const iconMap = {
  tanggal: BanknotesIcon,
  aktivitas: UserGroupIcon,
  cerita: ClockIcon,
};
import { getDataSheet } from "../../lib/data";

export async function CardWrapper() {
  const { tanggal, aktivitas, cerita } = await getDataSheet();

  const jmlTanggal = tanggal.length;
  const jmlAktivitas = aktivitas.length;
  const jmlCerita = cerita.length;

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Tanggal" value={jmlTanggal} type="tanggal" />
      <Card title="Aktivitas" value={jmlAktivitas} type="aktivitas" />
      <Card title="Cerita" value={jmlCerita} type="cerita" />
    </>
  );
}

export async function Card({ title, value, type }) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
              truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
