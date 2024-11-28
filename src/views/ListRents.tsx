import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import RentDetail from "@/components/RentDetail";
import ModalRegisterRent from "@/components/ModalRegisterRent";

export default function ListRents() {
  const fetchRents = useAuthStore((state) => state.fetchRents);
  const setRegisterRentModal = useAuthStore((state) => state.setRegisterRentModal);
  const rents = useAuthStore((state) => state.rents);
  useEffect(() => {
    const fetch = async () => {
      await fetchRents();
    };
    fetch();
  }, [fetchRents]);
  return (
    <div>
      <div className="flex items-center p-2">
        <button
          onClick={() => {setRegisterRentModal(true)}}
          className="flex bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded-lg text-white text-sm items-center justify-center"
        >
          <GoPlus className="text-xl" />
          Agregar nuevo alquiler
        </button>
      </div>{" "}
      <div className=" p-2 grid 2xl:grid-cols-4 lg:grid-cols-3 2xl:max-h-[940px] overflow-y-auto lg:max-h-[510px] gap-5 ">
        {rents.length > 0 ? (
          rents.map((value) => <RentDetail key={value._id} value={value} />)
        ) : (
          <h1 className="text-center text-2xl text-zinc-700">No hay rentas</h1>
        )}
      </div>
      <ModalRegisterRent />
    </div>
  );
}
