import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IForgetPass } from "../types";
import clientAxios from "../config/axios";
import Error from "../components/Error";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPass>();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-500 to-pink-500">
      <form
        className="bg-white rounded-lg p-7"
        onSubmit={handleSubmit(async (email: IForgetPass) => {
          try {
            const response = await clientAxios.post("/auth/reset-password", email);
            if (response.status === 200) {
                toast.success(response.data)
            }
          } catch (error) {
            toast.error(error.response.data.error);
          }
        })}
      >
        <div className="space-y-2 mb-12 px-8">
          <h3 className="text-2xl font-bold text-center">Recuperar contraseña</h3>
          <p className="text-center text-gray-600 text-[15px]">
            Ingresa tu correo electrónico para recuperar tu contraseña
          </p>
        </div>

        <div className="flex flex-col space-y-2 relative">
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
        <input
          className="bg-black transition-all cursor-pointer hover:bg-zinc-800 rounded-lg text-white text-center mt-10 w-full py-2"
          type="submit"
          value="Enviar"
        />

        <Link
          className="text-center block transition-all text-sm mt-2 text-zinc-600 underline hover:text-zinc-800"
          to={"/registrarse"}
        >
          Registrarse
        </Link>

        <Link
          className="text-center block transition-all text-sm mt-2 text-zinc-600 underline hover:text-zinc-800"
          to={"/"}
        >
          Iniciar sesión
        </Link>
      </form>
    </div>
  );
}
