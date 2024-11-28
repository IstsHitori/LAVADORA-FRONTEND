import { AiOutlineMail } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlinePerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IRegister } from "../types";
import clientAxios from "../config/axios";
import Error from "../components/Error";
import { toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-pink-500">
      <form
        className="bg-white rounded-lg p-7"
        onSubmit={handleSubmit(async (register: IRegister) => {
          try {
            const response = await clientAxios.post(
              "/auth/create-account",
              register
            );
            if (response.status === 200) {
              toast.success(response.data.message);
            }
          } catch (error) {
            toast.error(error.response.data.error);
          }
        })}
      >
        <div className="space-y-2 mb-12 px-8">
          <h3 className="text-2xl font-bold text-center">Registrarse</h3>
          <p className="text-center text-gray-600 text-[15px]">
            Ingresa tus credenciales para crear tu cuenta
          </p>
        </div>

        <div className="flex flex-col space-y-2 relative">
          <label className=" font-semibold text-sm" htmlFor="name">
            Nombre
          </label>
          <MdOutlinePerson className="absolute top-7 left-3 text-2xl text-zinc-400" />
          <input
            className="py-[7px] px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
            type="text"
            id="name"
            placeholder="ej: Pedro"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 5,
                message: "Mínimo 3 caracteres",
              },
            })}
          />
          {errors.name && <Error message={errors.name.message as string} />}
        </div>

        <div className="flex flex-col space-y-2 relative mt-7">
          <label className=" font-semibold text-sm" htmlFor="email">
            Correo electrónico
          </label>
          <AiOutlineMail className="absolute top-7 left-3 text-2xl text-zinc-400" />
          <input
            className="py-[7px] px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
            type="email"
            id="email"
            placeholder="tu@ejemplo.com"
            {...register("email", {
              required: "El email es obligatorio",
            })}
          />
          {errors.email && <Error message={errors.email.message as string} />}
        </div>

        <div className="flex flex-col space-y-2 relative mt-7">
          <label className=" font-semibold text-sm" htmlFor="password">
            Contraseña
          </label>
          <IoLockClosedOutline className="absolute top-7 left-3 text-2xl text-zinc-400" />
          <input
            className="py-[7px] px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
            type="password"
            id="password"
            placeholder="*******"
            {...register("password", {
              required: "El password es obligatorio",
              minLength: {
                value: 5,
                message: "La contraseña debe tener mínimo 5 caracteres",
              },
            })}
          />
          {errors.password && (
            <Error message={errors.password.message as string} />
          )}
        </div>
        <input
          className="bg-black transition-all cursor-pointer hover:bg-zinc-800 rounded-lg text-white text-center mt-10 w-full py-2"
          type="submit"
          value="Crear cuenta"
        />

        <Link
          className="text-center block transition-all text-sm mt-2 text-zinc-600 underline hover:text-zinc-800"
          to={"/"}
        >
          Iniciar sesión
        </Link>

        <Link
          className="text-center block transition-all text-sm mt-2 text-zinc-600 underline hover:text-zinc-800"
          to={"/recuperar-password"}
        >
          Olvidé mi contraseña
        </Link>
      </form>
    </div>
  );
}
