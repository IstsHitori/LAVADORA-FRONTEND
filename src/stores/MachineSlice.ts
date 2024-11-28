import { StateCreator } from "zustand";
import { typeMachine, typeRegisterMachine } from "../types";
import { getToken, config } from "../helpers/fetchAPI";
import clientAxios from "../config/axios";
import { safeParse } from "valibot";
import { machinesSchema } from "../schemas";
import { stateMachines } from "../helpers";
import { toast } from "react-toastify";
export interface IMachineSlice {
  machines: typeMachine[];
  fetchMachine: () => Promise<void>;
  getMachinesInService: () => typeMachine[];
  changeStateMachine: (
    state: typeMachine["state"],
    id: typeMachine["_id"]
  ) => Promise<void>;
  registerMachine: (machine: typeRegisterMachine) => Promise<void>;
  setRegisterMachineModal: (state: boolean) => void;
  isActiveRegisterMachineModal: boolean;
  deleteMachine: (id: typeMachine["_id"]) => Promise<void>;
}

export const createMachineSlice: StateCreator<IMachineSlice> = (set, get) => ({
  machines: [],
  fetchMachine: async () => {
    const fetch = await clientAxios.get("/machine/", config(getToken()));
    if (fetch.status !== 200) return;
    const { success, output } = safeParse(machinesSchema, fetch.data.machines);
    if (!success) return;
    set({ machines: output });
  },
  getMachinesInService: () => {
    const copyMachines = [...get().machines];
    return copyMachines.filter(
      (index) => index.state === stateMachines.INACTIVE
    );
  },
  changeStateMachine: async (
    state: typeMachine["state"],
    id: typeMachine["_id"]
  ) => {
    try {
      const response = await clientAxios.patch(
        `/machine/${id}`,
        {
          state,
        },
        config(getToken())
      );
      if (response.status !== 200) return;
      toast.success("Estado de la lavadora cambiado");
    } catch (error) {
      toast.error("Hubo un error al cambiar el estado");
      console.log(error);
    }
  },
  registerMachine: async (machine: typeRegisterMachine) => {
    try {
      const response = await clientAxios.post(
        "/machine/",
        machine,
        config(getToken())
      );
      if (response.status !== 200) return;
      toast.success(response.data);
    } catch (error) {
      console.log(error);
    }
  },
  setRegisterMachineModal(state) {
    set({ isActiveRegisterMachineModal: state });
  },
  isActiveRegisterMachineModal: false,
  deleteMachine: async (id: typeMachine["_id"]) => {
    try {
      const response = await clientAxios.delete(`/machine/${id}`,config(getToken()));
      await get().fetchMachine();
      if (response.status !== 200) return;
      toast.success(response.data);
    } catch (error) {
      toast.error("Error al eliminar esta lavadora");
    }
  },
});
