import { StateCreator } from "zustand";
import { typeReport } from "../types";
import clientAxios from "../config/axios";
import { config, getToken } from "../helpers/fetchAPI";
import { safeParse } from "valibot";
import { reporstSchema } from "../schemas";
import { typeRegisterReport } from "../types";
import { toast } from "react-toastify";

export interface IReportSlice {
  reports: typeReport[];
  fetchReports: () => Promise<void>;
  registerReport: (report: typeRegisterReport) => Promise<void>;
  isActiveModalReport: boolean;
  setModalReport: (state: boolean) => void;
}

export const createReportSlice: StateCreator<IReportSlice> = (set, get) => ({
  reports: [],
  fetchReports: async () => {
    try {
      const fetch = await clientAxios.get("/report/", config(getToken()));
      if (fetch.status !== 200) return;
      const { success, output } = safeParse(reporstSchema, fetch.data.reports);
      if (!success) return;
      set({ reports: output });
    } catch (error) {
      console.log(error);
    }
  },
  registerReport: async (report: typeRegisterReport) => {
    try {
      const response = await clientAxios.post(
        `/report/${report.id_machine}`,
        { description: report.description },
        config(getToken())
      );
      if (response.status !== 200) return;
      toast.success(response.data);
      await get().fetchReports();
    } catch (error) {
      console.log(error);
    }
  },
  isActiveModalReport: false,
  setModalReport: (state: boolean) => {
    set({ isActiveModalReport: state });
  },
});
