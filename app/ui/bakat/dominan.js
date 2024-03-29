import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function BakatDominan({ dominan }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-red-400 text-white": dominan === "kelemahan",
          "bg-green-500 text-white": dominan === "kekuatan",
        }
      )}
    >
      {dominan === "kelemahan" ? (
        <>
          Kelemahan
          <HandThumbDownIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {dominan === "kekuatan" ? (
        <>
          Kekuatan
          <HandThumbUpIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
