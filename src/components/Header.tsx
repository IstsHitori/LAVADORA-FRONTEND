import { useAuthStore } from "../stores/useAuthStore";
import HeaderAdmin from "./Admin/HeaderAdmin";
import HeaderWorker from "./Worker/HeaderWorker";
import CardProfile from "./CardProfile";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

export default function Header() {
  const profile = useAuthStore((state) => state.profile);
  const logoutSesion = useAuthStore((state) => state.logoutSesion);
  const { rol, name, email } = profile;
  return (
    <aside className="p-4 w-[19rem] flex flex-col justify-between border-r">
      <div>
        <div className="border-b mb-5 py-1 pb-3">
          <p className="font-semibold">LAVADORAS</p>
          <p className="p-1 inline-block px-3 bg-blue-100 rounded-lg text-sm text-blue-500">
            {rol}
          </p>
        </div>

        {rol === "Administrador" ? <HeaderAdmin /> : <HeaderWorker />}
      </div>

      <div>
        <div className="border-b mb-5 py-4 space-y-2">
          <button
            onClick={() => logoutSesion()}
            className="text-md text-white px-3 rounded-lg bg-red-500 border border-red-600  hover:bg-red-600/90 transition-all cursor-pointer flex items-center gap-2 py-1 w-full"
          >
            <IoIosLogOut className="text-white font-bold text-lg" />
            Cerrar sesión
          </button>
        </div>

        <CardProfile name={name} email={email} />
      </div>
    </aside>
  );
}
