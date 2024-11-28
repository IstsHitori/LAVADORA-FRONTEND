import { StateCreator } from "zustand";
import { typeRegisterWorker, typeWorker } from "../types";
import clientAxios from "../config/axios";
import { getToken, config } from "../helpers/fetchAPI";
import { safeParse } from "valibot";
import { workersSchema } from "../schemas";
import { toast } from "react-toastify";

export interface IWorkerSlice {
  workers: typeWorker[];
  fetchWorker: () => Promise<void>;
  changeStateWorker: (
    id: typeWorker["_id"],
    state: typeWorker["state"]
  ) => Promise<void>;
  registerWorker: (worker: typeRegisterWorker) => Promise<void>;
  isActiveModalRegisterWorker: boolean;
  setModalRegisterWorker: (state: boolean) => void;
  deleteWorker: (id: typeWorker["_id"]) => Promise<void>;
}

export const createWorkerSlice: StateCreator<IWorkerSlice> = (set, get) => ({
  workers: [],
  fetchWorker: async () => {
    try {
      const fetch = await clientAxios.get(
        "/auth/get-workers",
        config(getToken())
      );
      if (fetch.status !== 200) return;
      const { success, output } = safeParse(workersSchema, fetch.data.workers);
      if (!success) return;
      set({ workers: output });
    } catch (error) {
      console.log(error);
    }
  },
  changeStateWorker: async (
    id: typeWorker["_id"],
    state: typeWorker["state"]
  ) => {
    try {
      const response = await clientAxios.patch(
        `/auth/change-state/${id}`,
        { state },
        config(getToken())
      );
      if (response.status !== 200) return;
      toast.success(response.data);
    } catch (error) {
      toast.error("Error al cambiar el estado");
      console.log(error);
    }
  },
  registerWorker: async (worker: typeRegisterWorker) => {
    try {
      const response = await clientAxios.post("/auth/create-account", worker);
      if (response.status !== 200) return;
      toast.success("Empleado registrado");
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  },
  isActiveModalRegisterWorker: false,
  setModalRegisterWorker: (state: boolean) => {
    set({ isActiveModalRegisterWorker: state });
  },
  deleteWorker: async (id: typeWorker["_id"]) => {
    try {
      const response = await clientAxios.delete(
        `auth/delete-worker/${id}`,
        config(getToken())
      );
      if (response.status !== 200) return;
      await get().fetchWorker();
      toast.success(response.data);
    } catch (error) {
      toast.error("Ha habido un error al eliminar el empleado");
      console.log(error);
    }
  },
});
