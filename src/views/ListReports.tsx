import { useAuthStore } from "@/stores/useAuthStore";
import { GoPlus } from "react-icons/go";
import ReportDetails from "@/components/ReportDetails";
import { useEffect } from "react";
import ModalRegisterReport from "@/components/ModalRegisterReport";

export default function ListReports() {
  const reports = useAuthStore((state) => state.reports);
  const fetchReports = useAuthStore((state) => state.fetchReports);
  const setModalReport = useAuthStore((state) => state.setModalReport);

  useEffect(() => {
    const fetch = async () => {
      await fetchReports();
    };
    fetch();
  }, []);
  return (
    <>
      <div className="flex items-center p-2">
        <button
          onClick={() => {
            setModalReport(true)
          }}
          className="flex bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded-lg text-white text-sm items-center justify-center"
        >
          <GoPlus className="text-xl" />
          Agregar nuevo reporte
        </button>
      </div>{" "}
      <div className=" p-2 grid 2xl:grid-cols-3 lg:grid-cols-2 2xl:max-h-[940px] overflow-y-auto lg:max-h-[510px] gap-5 ">
        {reports.length > 0 ? (
          reports.map((value) => (
            <ReportDetails key={value._id} value={value} />
          ))
        ) : (
          <h1 className="text-center text-2xl text-zinc-700">
            No hay reportes
          </h1>
        )}
      </div>
      <ModalRegisterReport />
    </>
  );
}
