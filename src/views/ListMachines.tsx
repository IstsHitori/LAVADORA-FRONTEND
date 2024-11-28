import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import MachineDetail from "@/components/MachineDetail";
import { GoPlus } from "react-icons/go";
import ModalRegisterMachine from "@/components/ModalRegisterMachine";

export default function ListMachines() {
  const fetchMachine = useAuthStore((state) => state.fetchMachine);
  const machines = useAuthStore((state) => state.machines);
  const setRegisterMachineModal = useAuthStore(
    (state) => state.setRegisterMachineModal
  );
  useEffect(() => {
    const fetch = async () => {
      await fetchMachine();
    };
    fetch();
  }, [fetchMachine]);
  return (
    <div>
      <div className="flex items-center p-2">
        <button
          onClick={() => setRegisterMachineModal(true)}
          className="flex bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded-lg text-white text-sm items-center justify-center"
        >
          <GoPlus className="text-xl" />
          Agregar nueva lavadora
        </button>
      </div>{" "}
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 2xl:max-h-[940px] overflow-y-auto lg:max-h-[510px] gap-5 ">
        {machines.map((value) => (
          <MachineDetail key={value._id} value={value} />
        ))}
      </div>
        <ModalRegisterMachine />
    </div>
  );
}
