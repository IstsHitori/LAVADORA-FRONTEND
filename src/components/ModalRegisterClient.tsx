import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useForm } from "react-hook-form";
import { typeRegisterClient } from "@/types";
import clientAxios from "@/config/axios";
import { config, getToken } from "@/helpers/fetchAPI";
import { MdDriveFileRenameOutline } from "react-icons/md";

import Error from "./Error";
import { toast } from "react-toastify";

export default function ModalRegisterPatient() {
  const isActiveRegisterModal = useAuthStore(
    (state) => state.isActiveRegisterModal
  );
  const setRegisterModal = useAuthStore((state) => state.setRegisterModal);
  const fetchClients = useAuthStore((state) => state.fetchClients);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<typeRegisterClient>();

  return (
    <>
      <Dialog
        open={isActiveRegisterModal}
        onClose={() => {
          setRegisterModal(false);
          reset();
        }}
        className="relative z-50"
      >
        <form
          onSubmit={handleSubmit(async (client: typeRegisterClient) => {
            try {
              const response = await clientAxios.post(
                `/client`,
                client,
                config(getToken())
              );
              if (response.status !== 200) return;
              toast.success(response.data);
              await fetchClients();
              setRegisterModal(false);
            } catch (error) {
              toast.error(error.response.data.error);
              console.log(error);
            }
          })}
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
        >
          <DialogPanel className="max-w-xl space-y-4 border border-blue-100 rounded-lg bg-white p-12">
            <DialogTitle className="font-semibold text-center border-b pb-2">
              Registrar nuevo cliente
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
                    required: "El name es obligatorio",
                    minLength: {
                      value: 3,
                      message: "El nombre debe ser mínimo 3 letras",
                    },
                  })}
                />
                {errors.name && (
                  <Error message={errors.name.message as string} />
                )}
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="phone">
                  Teléfono
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] text-sm px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="number"
                  id="phone"
                  {...register("phone", {
                    required: "El telefono es obligatorio",
                    minLength: {
                      value: 10,
                      message: "El numero debe ser de 10 dígitos",
                    },
                    maxLength: {
                      value: 10,
                      message: "El numero no debe pasarse de 10 digitos",
                    },
                  })}
                />
                {errors.phone && (
                  <Error message={errors.phone.message as string} />
                )}
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="document">
                  Documento
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] px-12 text-sm border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="number"
                  id="document"
                  {...register("document", {
                    required: "El documento es obligatorio",
                    minLength: {
                      value: 10,
                      message: "El documento debe ser de 10 dígitos",
                    },
                    maxLength: {
                      value: 10,
                      message: "El documento no debe pasarse de 10 digitos",
                    },
                  })}
                />
                {errors.document && (
                  <Error message={errors.document.message as string} />
                )}
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="address">
                  Direccion
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] text-sm px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="text"
                  id="address"
                  {...register("address", {
                    required: "La direccion es obligatorio",
                  })}
                />
                {errors.address && (
                  <Error message={errors.address.message as string} />
                )}
              </div>
            </div>

            <div className="flex m gap-4">
              <button
                className="p-1 px-3 bg-red-500 rounded-md text-white text-sm"
                onClick={() => setRegisterModal(false)}
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
