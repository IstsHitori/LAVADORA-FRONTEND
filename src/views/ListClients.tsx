import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import ClientDetail from "../components/ClientDetail";
import ModalUpdateClient from "@/components/ModalUpdateClient";
import ModalRegisterPatient from "@/components/ModalRegisterClient";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

export default function ListClients() {
  const clients = useAuthStore((state) => state.clients);
  const fetchClients = useAuthStore((state) => state.fetchClients);
  const setRegisterModal = useAuthStore((state) => state.setRegisterModal);
  const searchClient = useAuthStore((state) => state.searchClient);
  const clientFound = useAuthStore((state) => state.clientFound);

  const [document, setDocument] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      await fetchClients();
    };
    fetch();
  }, [fetchClients]);
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <form
          className="flex items-center gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await searchClient(document);
          }}
        >
          <CiSearch />
          <input
            className="outline-none text-sm border rounded-md p-1"
            onChange={(e) => setDocument(+e.target.value)}
            type="number"
            placeholder="Busca cliente por documento"
          />
        </form>
        <button
          onClick={() => setRegisterModal(true)}
          className="flex bg-blue-500 hover:bg-blue-600 transition-all p-2 rounded-lg text-white text-sm items-center justify-center"
        >
          <GoPlus className="text-xl" />
          Agregar nuevo cliente
        </button>
      </div>

      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 2xl:max-h-[940px] overflow-y-auto lg:max-h-[510px] gap-5">
        {clientFound.name ? (
          <ClientDetail value={clientFound} />
        ) : (
          <>
            {clients.map((value) => (
              <ClientDetail key={value._id} value={value} />
            ))}
          </>
        )}
      </div>

      <ModalUpdateClient />
      <ModalRegisterPatient />
    </div>
  );
}
