import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { ComboboxClient } from "./ComboboxClient";
import { ComboboxMachine } from "./ComboboxMachine";
import { toast } from "react-toastify";
import { FormEvent, useEffect } from "react";
import { useState } from "react";

export default function ModalRegisterRent() {
  const isActiveModalAddRent = useAuthStore(
    (state) => state.isActiveModalAddRent
  );
  const setRegisterRentModal = useAuthStore(
    (state) => state.setRegisterRentModal
  );
  const [hours, setHours] = useState(2);

  const fetchMachine = useAuthStore((state) => state.fetchMachine);
  const fetchClients = useAuthStore((state) => state.fetchClients);
  const registerRent = useAuthStore((state) => state.registerRent);
  const setDocumentClient = useAuthStore((state) => state.setDocumentClient);
  const setIdMachine = useAuthStore((state) => state.setIdMachine);
  const idMachineSelected = useAuthStore((state) => state.idMachineSelected);
  const documentClient = useAuthStore((state) => state.documentClient);

  useEffect(() => {
    const fetch = async () => {
      await fetchMachine();
      await fetchClients();
    };
    fetch();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rent = {
      document_client: documentClient,
      hours,
      id_washing_machine: idMachineSelected,
    };
    if (
      rent.document_client === 0 ||
      rent.hours === 0 ||
      rent.id_washing_machine === ""
    ) {
      toast.error("Hay valores vacíos");
      return;
    }
    await registerRent(rent);
  };
  return (
    <>
      <Dialog
        open={isActiveModalAddRent}
        onClose={() => {
          setRegisterRentModal(false);
          setHours(0);
          setIdMachine("");
          setDocumentClient(0);
        }}
        className="relative z-50"
      >
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
        >
          <DialogPanel className="max-w-3xl space-y-4 border border-blue-100 rounded-lg bg-white p-12">
            <DialogTitle className="font-semibold text-center border-b pb-2">
              Registrar nuevo alquiler
            </DialogTitle>
            <div className="flex items-center justify-between gap-5 ">
              <ComboboxMachine />
              <ComboboxClient />
              <div className="flex flex-col max-w-[180px] space-y-2 relative">
                <input
                  onChange={(e) => setHours(+e.target.value)}
                  placeholder="Horas del alquiler"
                  className="py-[5px] text-sm px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="number"
                  value={hours}
                  id="hours"
                  min={2}
                />
              </div>
            </div>

            <div className="flex m gap-4">
              <button
                className="p-1 px-3 bg-red-500 rounded-md text-white text-sm"
                onClick={() => {
                  setRegisterRentModal(false);
                  setHours(0);
                  setIdMachine("");
                  setDocumentClient(0);
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="p-1 px-3 bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white text-sm"
              >
                Registrar
              </button>
            </div>
          </DialogPanel>
        </form>
      </Dialog>
    </>
  );
}
