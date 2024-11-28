import { StateCreator } from "zustand";
import { typeClient, typeMachine, typeRegisterRent, typeRent } from "@/types";
import { toast } from "react-toastify";
import clientAxios from "@/config/axios";
import { config, getToken } from "@/helpers/fetchAPI";
import { safeParse } from "valibot";
import { rentsSchema } from "@/schemas";

export interface IRentSlice {
  rents: typeRent[];
  fetchRents: () => Promise<void>;
  addMoreTime: (id: typeRent["_id"], hours: typeRent["hours"]) => Promise<void>;
  isActiveModalAddRent: boolean;
  setRegisterRentModal: (state: boolean) => void;
  registerRent: (rent: typeRegisterRent) => Promise<void>;
  idMachineSelected: typeMachine["_id"];
  documentClient: typeClient["document"];
  setIdMachine: (id: typeMachine["_id"]) => void;
  setDocumentClient: (document: typeClient["document"]) => void;
}

export const createRentSlice: StateCreator<IRentSlice> = (set, get) => ({
  rents: [],
  fetchRents: async () => {
    try {
      const fetch = await clientAxios.get("/rental/", config(getToken()));
      if (fetch.status !== 200) return;
      const { output, success } = safeParse(rentsSchema, fetch.data.rents);
      if (!success) return;
      set({ rents: output });
    } catch (error) {
      toast.error("Ha ocurrido un error al obtener las rentas");
    }
  },
  addMoreTime: async (id: typeRent["_id"], hours: typeRent["hours"]) => {
    try {
      const response = await clientAxios.post(
        `/rental/add-time/${id}`,
        { hours },
        config(getToken())
      );
      if (response.status !== 200) return;
      get().fetchRents();
      toast.success(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  isActiveModalAddRent: false,
  setRegisterRentModal: (state: boolean) => {
    set({ isActiveModalAddRent: state });
  },
  registerRent: async (rent: typeRegisterRent) => {
    try {
      const response = await clientAxios.post(
        "/rental/",
        rent,
        config(getToken())
      );
      if (response.status !== 200) return;
      toast.success(response.data);
      get().fetchRents();
      set({isActiveModalAddRent:false});
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  },
  idMachineSelected: "",
  documentClient: 0,
  setDocumentClient: (document: typeClient["document"]) => {set({documentClient:document})},
  setIdMachine: (id: typeMachine["_id"]) => {set({idMachineSelected:id})},
});
