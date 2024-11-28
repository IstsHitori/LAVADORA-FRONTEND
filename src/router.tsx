import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import ForgetPassword from "./views/ForgetPassword";
import VerifyToken from "./views/VerifyToken";
import RouteProtected from "./layouts/RouteProtected";
import ListClients from "./views/ListClients";
import ListMachines from "./views/ListMachines";
import Dashboard from "./views/Admin/Dashboard";
import ListWorkers from "./views/ListWorkers";
import ListRents from "./views/ListRents";
import ListReports from "./views/ListReports";
import MonetaryIncome from "./views/MonetaryIncome";
import VerifyAccount from "./views/VerifyAccount";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/registrarse",
        element: <Register />,
      },
      {
        path: "/recuperar-password",
        element: <ForgetPassword />,
      },
      {
        path: "/confirmar-contrasena",
        element: <VerifyToken />,
      },
      {
        path: "/confirmar-cuenta",
        element: <VerifyAccount />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RouteProtected />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/clientes",
        element: <ListClients />,
      },
      {
        path: "/dashboard/lavadoras",
        element: <ListMachines />,
      },
      {
        path: "/dashboard/alquileres",
        element: <ListRents />,
      },
      {
        path: "/dashboard/empleados",
        element: <ListWorkers />,
      },
      {
        path: "/dashboard/reportes",
        element: <ListReports />,
      },
      {
        path: "/dashboard/ingresos",
        element: <MonetaryIncome />,
      },
    ],
  },
]);
