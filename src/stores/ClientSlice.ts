import { StateCreator } from "zustand";
import { typeClient } from "../types";
import clientAxios from "../config/axios";
import { config, getToken } from "../helpers/fetchAPI";
import { safeParse } from "valibot";
import { clientSchema, clientsSchema } from "../schemas";
import { toast } from "react-toastify";

export interface IClientSlice {
  clients: typeClient[];
  fetchClients: () => Promise<void>;
  setIdClient: (document: typeClient["document"]) => void;
  documentClient: typeClient["document"];
  isActiveModal: boolean;
  isActiveRegisterModal: boolean;
  setActiveModal: (state: boolean) => void;
  setRegisterModal: (state: boolean) => void;
  getSelectedClient: () => typeClient;
  deleteClient: (id: typeClient["_id"]) => Promise<void>;
  searchClient: (document: typeClient["document"]) => Promise<void>;
  clientFound: typeClient;
}

export const createClientSlice: StateCreator<IClientSlice> = (set, get) => ({
  clients: [],
  fetchClients: async () => {
    try {
      const clientResponse = await clientAxios.get(
        "/client/",
        config(getToken())
      );
      if (clientResponse.status !== 200) return set({ clients: [] });
      const { success, output } = safeParse(
        clientsSchema,
        clientResponse.data.clients
      );
      if (!success) return;
      set({ clients: output });
    } catch (error) {
      console.log(error);
    }
  },
  setIdClient: (document: typeClient["document"]) => {
    set({ documentClient: document });
  },
  documentClient: 0,
  isActiveModal: false,
  setActiveModal: (state: boolean) => {
    set({ isActiveModal: state });
  },
  getSelectedClient: () => {
    const defectClient: typeClient = {
      _id: "",
      name: "",
      document: 0,
      phone: 0,
      address: "",
      createdAt: "",
      updatedAt: "",
    };
    if (!get().documentClient) return { ...defectClient };
    const searchClient = [...get().clients].find(
      (index) => index.document === get().documentClient
    ) as typeClient;
    return { ...searchClient };
  },
  isActiveRegisterModal: false,
  setRegisterModal: (state: boolean) => {
    set({ isActiveRegisterModal: state });
  },
  deleteClient: async (id: typeClient["_id"]) => {
    try {
      const response = await clientAxios.delete(
        `/client/${id}`,
        config(getToken())
      );
      if (response.status !== 200) return;
      toast.success(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  searchClient: async (document: typeClient["document"]) => {
    try {
      const fetch = await clientAxios.get(
        `/client/search-client/${document}`,
        config(getToken())
      );
      if (fetch.status !== 200) return;
      const { output, success } = safeParse(clientSchema, fetch.data.client);
      if (!success) return;
      set({ clientFound: output });
    } catch (error) {
      set({ clientFound: {} as typeClient });
      await get().fetchClients();
      toast.error(error.response.data.error);
    }
  },
  clientFound: {} as typeClient,
});
