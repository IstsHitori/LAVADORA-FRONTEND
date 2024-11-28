import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";
import MachineState from "../../components/MachineState";
import { GrUserWorker } from "react-icons/gr";
import CardClient from "../../components/CardClient";
import WorkerCard from "../../components/WorkerCard";
import CardReportDamage from "../../components/CardReportDamage";
import { MdOutlineReport } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { stateRoles } from "@/helpers";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const fetchClients = useAuthStore((state) => state.fetchClients);
  const fetchMachine = useAuthStore((state) => state.fetchMachine);
  const fetchWorker = useAuthStore((state) => state.fetchWorker);
  const fetchReports = useAuthStore((state) => state.fetchReports);
  const navigate = useNavigate();

  const getMachinesInService = useAuthStore(
    (state) => state.getMachinesInService
  );
  const clients = useAuthStore((state) => state.clients);
  const machines = useAuthStore((state) => state.machines);
  const workers = useAuthStore((state) => state.workers);
  const reports = useAuthStore((state) => state.reports);
  const profile = useAuthStore((state) => state.profile);
  //--
  const MAX_VALUE = 3;

  useEffect(() => {
    if (profile.rol !== stateRoles.ADMIN) {
      navigate("/dashboard/clientes");
    }
    const fetch = async () => {
      await fetchClients();
      await fetchMachine();
      await fetchWorker();
      await fetchReports();
    };
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 grid-rows-2">
      <article className="border-2 border-zinc-200 rounded-xl max-w-md p-2">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <LuTimer className="text-xl" />
            <h2 className="font-semibold text-[13px]">Lavadoras</h2>
          </div>

          <Link
            className="p-1 cursor-pointer px-3 text-xs border-2 rounded-lg"
            to={"/dashboard/lavadoras"}
          >
            Ver todas
          </Link>
        </div>
        <div className="mt-5">
          <h1 className="text-center text-2xl font-semibold">
            {getMachinesInService().length}
          </h1>
          <p className="text-sm text-center text-zinc-500">
            En servcio de {machines.length}
          </p>
        </div>
        <div className="space-y-2 mt-5">
          {machines.map((value, index) => {
            if (index < MAX_VALUE)
              return <MachineState key={value._id} value={value} />;
          })}
        </div>
      </article>

      <article className="border-2 border-zinc-200 rounded-xl max-w-md p-2">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <GrUserWorker className="text-xl" />
            <h2 className="font-semibold text-[13px]">Clientes</h2>
          </div>

          <Link
            className="p-1 cursor-pointer px-3 text-xs border-2 rounded-lg"
            to={"/dashboard/clientes"}
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-5 space-y-1    ">
          {clients.map((value, index) => {
            if (index < MAX_VALUE)
              return <CardClient key={value._id} value={value} />;
          })}
        </div>
      </article>

      <article className="border-2 border-zinc-200 rounded-xl max-w-md p-2">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <MdPerson className="text-xl" />
            <h2 className="font-semibold text-[13px]">Empleados</h2>
          </div>

          <Link
            className="p-1 cursor-pointer px-3 text-xs border-2 rounded-lg"
            to={"/dashboard/empleados"}
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-5">
          {workers.map((value, index) => {
            if (index < MAX_VALUE)
              return <WorkerCard key={value._id} value={value} />;
          })}
        </div>
      </article>

      <article className="border-2 border-zinc-200 rounded-xl max-w-md p-2">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <MdOutlineReport className="text-xl" />
            <h2 className="font-semibold text-[13px]">Reportes de daños</h2>
          </div>

          <Link
            className="p-1 cursor-pointer px-3 text-xs border-2 rounded-lg"
            to={"/dashboard/reportes"}
          >
            Ver todos
          </Link>
        </div>
        <div className="mt-2 space-y-3 overflow-y-auto">
          {reports.map((value, index) => {
            if (index < 2)
              return <CardReportDamage key={value._id} value={value} />;
          })}
        </div>
      </article>
    </div>
  );
}
