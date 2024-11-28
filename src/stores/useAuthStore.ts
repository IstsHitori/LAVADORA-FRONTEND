import { create } from "zustand";
import { createAuthSlice, IAuthSlice } from "./AuthSlice";
import { devtools } from "zustand/middleware";
import { IClientSlice, createClientSlice } from "./ClientSlice";
import { createMachineSlice, IMachineSlice } from "./MachineSlice";
import { createWorkerSlice, IWorkerSlice } from "./WorkerSlice";
import { createReportSlice, IReportSlice } from "./ReportSlice";
import { IRentSlice, createRentSlice } from "./RentSlice";

export const useAuthStore = create<
  IAuthSlice & IClientSlice & IMachineSlice & IWorkerSlice & IReportSlice & IRentSlice
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createClientSlice(...a),
    ...createMachineSlice(...a),
    ...createWorkerSlice(...a),
    ...createReportSlice(...a),
    ...createRentSlice(...a)
  }))
);
