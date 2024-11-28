import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { ComboboxMachine } from "./ComboboxMachine";
import { toast } from "react-toastify";
import { FormEvent } from "react";
import { useState } from "react";
import { typeRegisterReport } from "@/types";

export default function ModalRegisterReport() {
  const setModalReport = useAuthStore((state) => state.setModalReport);
  const registerReport = useAuthStore((state) => state.registerReport);
  const idMachineSelected = useAuthStore((state) => state.idMachineSelected);
  const isActiveModalReport = useAuthStore(
    (state) => state.isActiveModalReport
  );

  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const report: typeRegisterReport = {
      id_machine: idMachineSelected,
      description,
    };
    if (report.id_machine === "" || report.description === "") {
      toast.error("Hay valores vacíos");
      return;
    }
    setModalReport(false);
    await registerReport(report);
  };

  return (
    <>
      <Dialog
        open={isActiveModalReport}
        onClose={() => {
          setModalReport(false);
        }}
        className="relative z-50"
      >
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
        >
          <DialogPanel className="max-w-3xl space-y-4 border border-blue-100 rounded-lg bg-white p-12">
            <DialogTitle className="font-semibold text-center border-b pb-2">
              Registrar nuevo reporte
            </DialogTitle>
            <div className="flex items-center justify-between gap-5 ">
              <ComboboxMachine />
              <div className="flex flex-col max-w-[400px] space-y-2 relative">
                <textarea
                  className="p-3 text-sm w-[20rem] border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción del reporte"
                ></textarea>
              </div>
            </div>

            <div className="flex m gap-4">
              <button
                className="p-1 px-3 bg-red-500 rounded-md text-white text-sm"
                onClick={() => {}}
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
