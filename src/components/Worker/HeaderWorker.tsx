import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiWashingMachine } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { path } from "../../helpers";

export default function HeaderWorker() {
  const { pathname } = useLocation();

  return (
    <div>
      <ul className="space-y-3">

        <li>
          <Link
            to={"/dashboard/clientes"}
            className={`${
              pathname === path.CLIENTS ? "bg-zinc-100 " : ""
            } cursor-pointer gap-2 py-2 flex items-center transition-all px-3 rounded-lg`}
          >
            <IoPersonOutline
              className={`${
                pathname === path.CLIENTS ? "text-blue-400" : "text-gray-600"
              } text-xl transition-all`}
            />
            <p
              className={`${
                pathname === path.CLIENTS ? "font-medium" : ""
              } text-sm`}
            >
              Clientes
            </p>
          </Link>
        </li>

        <li>
          <Link
            to={"/dashboard/lavadoras"}
            className={`${
              pathname === path.MACHINE ? "bg-zinc-100 " : ""
            } cursor-pointer gap-2 py-2 flex items-center transition-all px-3 rounded-lg`}
          >
            <PiWashingMachine
              className={`${
                pathname === path.MACHINE ? "text-blue-400" : "text-gray-600"
              } text-xl transition-all`}
            />
            <p
              className={`${
                pathname === path.MACHINE ? "font-medium" : ""
              } text-sm`}
            >
              Lavadoras
            </p>
          </Link>
        </li>

        <li>
          <Link
            to={"/dashboard/alquileres"}
            className={`${
              pathname === path.RENTS ? "bg-zinc-100 " : ""
            } cursor-pointer gap-2 py-2 flex items-center transition-all px-3 rounded-lg`}
          >
            <MdOutlinePendingActions
              className={`${
                pathname === path.RENTS ? "text-blue-400" : "text-gray-600"
              } text-xl transition-all`}
            />
            <p
              className={`${
                pathname === path.RENTS ? "font-medium" : ""
              } text-sm`}
            >
              Alquileres
            </p>
          </Link>
        </li>


        <li>
          <Link
            to={"/dashboard/reportes"}
            className={`${
              pathname === path.REPORTS ? "bg-zinc-100 " : ""
            } cursor-pointer gap-2 py-2 flex items-center transition-all px-3 rounded-lg`}
          >
            <MdOutlineReport
              className={`${
                pathname === path.REPORTS ? "text-blue-400" : "text-gray-600"
              } text-xl transition-all`}
            />
            <p
              className={`${
                pathname === path.REPORTS ? "font-medium" : ""
              } text-sm`}
            >
              Reporte de daños
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
