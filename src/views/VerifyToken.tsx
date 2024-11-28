import { AiOutlineMail } from "react-icons/ai";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IResetPassword, IToken } from "../types";
import clientAxios from "../config/axios";
import Error from "../components/Error";
import { toast } from "react-toastify";
import { useState } from "react";

export default function VerifyToken() {
  const {
    register: registerToken,
    handleSubmit: handleSubmitToken,
    formState: { errors: errorsToken },
    reset: resetToken
  } = useForm<IToken>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<IResetPassword>();

  const [state, setState] = useState(false);
  const [idUser, setIdUser] = useState("");

  const onSubmitToken = async (token: IToken) => {
    try {
      const response = await clientAxios.post("/auth/verify-token", token);
      if (response.status === 200) {
        setState(true);
        setIdUser(response.data.id);
        resetToken();
        toast.success("Token válido, ingresa tu nueva contraseña");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const onSubmitPassword = async (newPassword: IResetPassword) => {
    try {
      if(newPassword.newPassword !== newPassword.confirmNewPassword){
        toast.error("Las contraseñas deben ser iguales");
        return;
      }
       const response = await clientAxios.patch(
         `/auth/change-password/${idUser}`,
         newPassword
       );
       if (response.status === 200) {
         console.log(response);
         toast.success("Contraseña actualizada correctamente");
       }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-500 to-pink-500">
      {state ? (
        <form
          className="bg-white rounded-lg p-7"
          onSubmit={handleSubmitPassword(onSubmitPassword)}
        >
          <div className="space-y-2 mb-12 px-8">
            <h3 className="text-2xl font-bold text-center">
              Cambiar contraseña
            </h3>
            <p className="text-center text-gray-600 text-[15px]">
              Ingresa la nueva contraseña
            </p>
          </div>

          <div className="flex flex-col space-y-2 relative">
            <label className=" font-semibold text-sm" htmlFor="password">
              Nueva contraseña
            </label>
            <IoLockClosedOutline className="absolute top-7 left-3 text-2xl text-zinc-400" />
            <input
              className="py-[7px] px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
              type="password"
              id="password"
              placeholder="Nueva contraseña "
              {...registerPassword("newPassword", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 5,
                  message: "La contraseña debe ser mínimo 5 carácteres",
                },
              })}
            />
            {errorsPassword.newPassword && (
              <Error message={errorsPassword.newPassword.message as string} />
            )}
          </div>

          <div className="flex flex-col space-y-2 relative">
            <label className=" font-semibold text-sm" htmlFor="confirmPassword">
              Confirma la nueva contraseña
            </label>
            <IoLockClosedOutline className="absolute top-7 left-3 text-2xl text-zinc-400" />
            <input
              className="py-[7px] px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
              type="password"
              id="confirmPassword"
              placeholder="Confirma la nueva contraseña"
              {...registerPassword("confirmNewPassword", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 5,
                  message: "La contraseña debe ser mínimo 5 carácteres",
                },
              })}
            />
            {errorsPassword.confirmNewPassword && (
              <Error
                message={errorsPassword.confirmNewPassword.message as string}
              />
            )}
          </div>

          <input
            className="bg-black transition-all cursor-pointer hover:bg-zinc-800 rounded-lg text-white text-center mt-10 w-full py-2"
            type="submit"
            value="Cambiar contraseña"
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
      ) : (
        <form
          className="bg-white rounded-lg p-7"
          onSubmit={handleSubmitToken(onSubmitToken)}
        >
          <div className="space-y-2 mb-12 px-8">
            <h3 className="text-2xl font-bold text-center">
              Recuperar contraseña
            </h3>
            <p className="text-center text-gray-600 text-[15px]">
              Ingresa el token que te dio el administrador
            </p>
          </div>

          <div className="flex flex-col space-y-2 relative">
            <label className=" font-semibold text-sm" htmlFor="email">
              Token
            </label>
            <AiOutlineMail className="absolute top-7 left-3 text-2xl text-zinc-400" />
            <input
              className="py-[7px] px-12 border rounded-lg focus:outline-zinc-300 border-zinc-200 outline-none focus"
              type="number"
              id="token"
              min={0}
              max={999999}
              placeholder="Ingresa el token"
              {...registerToken("token", {
                required: "El token es obligatorio",
                minLength: {
                  value: 6,
                  message: "El token debe ser de 6 dígitos",
                },
              })}
            />
            {errorsToken.token && (
              <Error message={errorsToken.token.message as string} />
            )}
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
      )}
    </div>
  );
}
