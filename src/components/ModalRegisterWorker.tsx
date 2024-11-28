import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useForm } from "react-hook-form";
import { typeRegisterWorker } from "@/types";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { arrayRoles } from "@/helpers";
import Error from "./Error";
import { toast } from "react-toastify";

export default function ModalRegisterWorker() {
  const isActiveModalRegisterWorker = useAuthStore(
    (state) => state.isActiveModalRegisterWorker
  );
  const setModalRegisterWorker = useAuthStore(
    (state) => state.setModalRegisterWorker
  );
  const registerWorker = useAuthStore((state) => state.registerWorker);
  const fetchWorker = useAuthStore((state) => state.fetchWorker);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<typeRegisterWorker>();

  return (
    <>
      <Dialog
        open={isActiveModalRegisterWorker}
        onClose={() => {
          setModalRegisterWorker(false);
          reset();
        }}
        className="relative z-50"
      >
        <form
          onSubmit={handleSubmit(async (worker: typeRegisterWorker) => {
            try {
              await registerWorker(worker);
              await fetchWorker();
              setModalRegisterWorker(false);
              reset();
            } catch (error) {
              toast.error(error.response.data.error);
              console.log(error);
            }
          })}
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
        >
          <DialogPanel className="max-w-xl space-y-4 border border-blue-100 rounded-lg bg-white p-12">
            <DialogTitle className="font-semibold text-center border-b pb-2">
              Registrar nuevo empleado
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
                <label className=" font-semibold text-sm" htmlFor="eamil">
                  Email
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] text-sm px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="email"
                  id="eamil"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                />
                {errors.email && (
                  <Error message={errors.email.message as string} />
                )}
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="password">
                  Password
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <input
                  className="py-[5px] px-12 text-sm border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "El contraseña debe ser almenos 6 digitos",
                    },
                  })}
                />
                {errors.password && (
                  <Error message={errors.password.message as string} />
                )}
              </div>

              <div className="flex flex-col space-y-2 relative">
                <label className=" font-semibold text-sm" htmlFor="rol">
                  Rol del empleado
                </label>
                <MdDriveFileRenameOutline className="absolute top-7 left-3 text-xl text-zinc-400" />
                <select
                  className="py-[5px] text-sm px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
                  id="rol"
                  {...register("rol", {
                    required: "El rol es boligatorio",
                  })}
                >
                  <option value={arrayRoles[0].value}>
                    {arrayRoles[0].key}
                  </option>
                  <option value={arrayRoles[1].value}>
                    {arrayRoles[1].key}
                  </option>
                </select>
                {errors.rol && <Error message={errors.rol.message as string} />}
              </div>
            </div>

            <div className="flex m gap-4">
              <button
                className="p-1 px-3 bg-red-500 rounded-md text-white text-sm"
                onClick={() => setModalRegisterWorker(false)}
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
