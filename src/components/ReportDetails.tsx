import { typeReport } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GrHostMaintenance } from "react-icons/gr";

type reportDetailsProps = {
  value: typeReport;
};

export default function ReportDetails({ value }: reportDetailsProps) {
  const machines = useAuthStore((state) => state.machines);
  const fetchMachine = useAuthStore((state) => state.fetchMachine);

  useEffect(() => {
    const fetch = async () => {
      await fetchMachine();
    };
    fetch();
  }, []);
  const { description, report_date, id_machine } = value;
  const searchMachine =
    machines.find((index) => index._id === id_machine)?.name ??
    "No se encontró";

  return (
    <div className="rounded-lg overflow-hidden border shadow-md ">
      <div className=" bg-gradient-to-r from-blue-500 to-cyan-500 p-5 px-6 flex items-center justify-between ">
        <h2 className="text-xl text-white">{searchMachine}</h2>
        <p className=" bg-white text-blue-500 text-xs rounded-2xl font-semibold p-1 px-2">
          Reporte de daño
        </p>
      </div>
      <div className="space-y-3 p-5 px-6">
        <p className="flex text-sm items-center gap-2">
          <CiCalendarDate className="text-blue-500 text-lg" />
          {report_date}
        </p>
        <p className="flex text-sm items-center gap-2">
          <GrHostMaintenance className="text-red-500 text-lg" />
          {description}
        </p>
      </div>
    </div>
  );
}
