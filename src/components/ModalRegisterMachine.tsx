import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useForm } from "react-hook-form";
import { typeRegisterMachine } from "@/types";
import { MdDriveFileRenameOutline } from "react-icons/md";

import Error from "./Error";
import { toast } from "react-toastify";

export default function ModalRegisterMachine() {
  const isActiveRegisterMachineModal = useAuthStore(
    (state) => state.isActiveRegisterMachineModal
  );
  const setRegisterMachineModal = useAuthStore(
    (state) => state.setRegisterMachineModal
  );
  const fetchMachine = useAuthStore((state) => state.fetchMachine);
  const registerMachine = useAuthStore((state) => state.registerMachine);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<typeRegisterMachine>();

  return (
    <>
      <Dialog
        open={isActiveRegisterMachineModal}
        onClose={() => {
          setRegisterMachineModal(false);
          reset();
        }}
        className="relative z-50"
      >
        <form
          onSubmit={handleSubmit(async (machine: typeRegisterMachine) => {
            try {
              await registerMachine(machine);
              await fetchMachine();
              setRegisterMachineModal(false);
            } catch (error) {
              toast.error(error.response.data.error);
              console.log(error);
            }
          })}
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
        >
          <DialogPanel className="max-w-xl space-y-4 border border-blue-100 rounded-lg bg-white p-12">
            <DialogTitle className="font-semibold text-center border-b pb-2">
              Registrar nueva lavadora
            </DialogTitle>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="name">
                  Nombre
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] text-sm px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El nombre debe ser de almenos 1 carácter",
                    },
                  })}
                />
                {errors.name && (
                  <Error message={errors.name.message as string} />
                )}
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="brand">
                  Marca
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] px-12 text-sm border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="text"
                  id="brand"
                  {...register("brand", {
                    required: "La marca es obligatorio",
                    minLength: {
                      value: 1,
                      message: "La marca debe ser de almenos 1 caracter",
                    },
                  })}
                />
                {errors.brand && (
                  <Error message={errors.brand.message as string} />
                )}
              </div>
            </div>

            <div className="flex m gap-4">
              <button
                className="p-1 px-3 bg-red-500 rounded-md text-white text-sm"
                onClick={() => {
                  setRegisterMachineModal(false);
                  reset();
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
