import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import WorkerDetails from "@/components/WorkerDetails";
import { GoPlus } from "react-icons/go";
import ModalRegisterWorker from "@/components/ModalRegisterWorker";
import { stateRoles } from "@/helpers";
import { useNavigate } from "react-router-dom";

export default function ListWorkers() {
  const fetchWorker = useAuthStore((state) => state.fetchWorker);
  const setModalRegisterWorker = useAuthStore(
    (state) => state.setModalRegisterWorker
  );
  const navigate = useNavigate();

  const profile = useAuthStore((state) => state.profile);
  const workers = useAuthStore((state) => state.workers);
  useEffect(() => {
    if (profile.rol !== stateRoles.ADMIN) {
      navigate("/dashboard/clientes");
    }
    const fetch = async () => {
      await fetchWorker();
    };
    fetch();
  }, [fetchWorker]);
  return (
    <div>
      <div className="flex items-center p-2">
        <button
          onClick={() => {
            setModalRegisterWorker(true);
          }}
          className="flex bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded-lg text-white text-sm items-center justify-center"
        >
          <GoPlus className="text-xl" />
          Agregar nuevo nuevo empleado
        </button>
      </div>{" "}
      <div className=" p-2 grid 2xl:grid-cols-3 lg:grid-cols-2 2xl:max-h-[940px] overflow-y-auto lg:max-h-[510px] gap-5 ">
        {workers.length > 0 ? (
          workers.map((value) =>
            value.email !== profile.email ? (
              <WorkerDetails key={value._id} value={value} />
            ) : null
          )
        ) : (
          <h1 className="text-center text-2xl text-zinc-700">No hay rentas</h1>
        )}
      </div>
      <ModalRegisterWorker />
    </div>
  );
}
