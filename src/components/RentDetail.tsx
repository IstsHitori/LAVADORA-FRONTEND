import { typeRent } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import DropDownRent from "./DropDownRent";
import { useEffect, useMemo } from "react";
import { getRemainingTime } from "@/helpers";

type RentDetailProps = {
  value: typeRent;
};

export default function RentDetail({ value }: RentDetailProps) {
  const machines = useAuthStore((state) => state.machines);
  const fetchMachine = useAuthStore((state) => state.fetchMachine);
  const {
    document_client,
    price,
    hours,
    rental_date,
    id_washing_machine,
    _id,
  } = value;
  const searchMachine = useMemo(
    () =>
      machines.find((index) => index._id === id_washing_machine) ?? {
        name: "No se encontró",
        brand: "No se encontró",
      },
    [id_washing_machine, machines]
  );
  useEffect(() => {
    const fetch = async () => {
      await fetchMachine();
    };
    fetch();
  }, []);

  return (
    <div
      className={`${
        getRemainingTime({
          horaInicio: rental_date,
          duracionHoras: hours,
        }) === "Tiempo expirado"
          ? "from-red-600 to-rose-700"
          : "from-blue-600 to-cyan-500"
      } bg-gradient-to-r  rounded-xl shadow-lg flex flex-col justify-between p-2 `}
    >
      <div className=" py-6 relative">
        <h2 className="text-center text-white text-lg font-bold">
          {getRemainingTime({
            horaInicio: rental_date,
            duracionHoras: hours,
          }) === "Tiempo expirado"
            ? "Este alquiler ha terminado "
            : "Alquiler de la lavadora - "}
          <span className="text-green-200">{searchMachine.name} </span>
        </h2>
        {getRemainingTime({
          horaInicio: rental_date,
          duracionHoras: hours,
        }) === "Tiempo expirado" ? null : (
          <DropDownRent _id={_id} />
        )}
      </div>
      <div className="rounded-2xl grid min-h-[13rem] grid-cols-2 bg-white p-3">
        <div className="flex items-center flex-col gap-1">
          <p className="flex gap-1 items-center">
            <IoPersonOutline className="text-blue-500" />

            <span className="text-xs text-gray-500">Cliente</span>
          </p>
          <p className="text-xs">{document_client}</p>
        </div>

        <div className="flex items-center flex-col gap-1">
          <p className="flex gap-1 items-center">
            <MdOutlineAttachMoney className="text-green-500" />
            <span className="text-xs text-gray-500">Precio</span>
          </p>

          <p className="text-xs">${price}</p>
        </div>

        <div className="flex items-center flex-col gap-1">
          <p className="flex gap-1 items-center">
            <TbClockHour3 className="text-orange-500" />
            <span className="text-xs text-gray-500">Horas</span>
          </p>

          <p className="text-xs">{hours}</p>
        </div>

        <div className="flex items-center flex-col gap-1">
          <p className="flex gap-1 items-center">
            <CiCalendarDate className="text-violet-500" />
            <span className="text-xs text-gray-500">Fecha</span>
          </p>

          <p className="text-xs">{new Date(rental_date).toLocaleString()}</p>
        </div>

        <div className="flex items-center flex-col gap-1">
          <p className="flex gap-1 items-center">
            <TbClockHour3 className="text-orange-500" />
            <span className="text-xs text-gray-500">Tiempo restante</span>
          </p>

          <p className="text-xs text-center">
            {getRemainingTime({
              horaInicio: rental_date,
              duracionHoras: hours,
            })}
          </p>
        </div>

        <div className="flex items-center flex-col gap-1">
          <p className="flex gap-1 items-center">
            <MdOutlineAttachMoney className="text-green-500" />
            <span className="text-xs text-gray-500">Total a pagar</span>
          </p>

          <p className="text-xs">${price * hours}</p>
        </div>
      </div>
    </div>
  );
}
