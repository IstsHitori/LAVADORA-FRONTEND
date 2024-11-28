import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { useAuthStore } from "../stores/useAuthStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const RouteProtected = () => {
  const navigate = useNavigate();
  //---
  const token = useAuthStore((state) => state.token);
  const getProfile = useAuthStore((state) => state.getProfile);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }else{
        getProfile();
    }
  }, [token, navigate]);

  return (
    <main className=" min-h-screen flex-col md:flex-row flex">
      {token ? (
        <>
          <Header />
          <div className="w-full p-2 py-3">
            <div className="h-full bg-white rounded-t-xl p-2">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </main>
  );
};

export default RouteProtected;
