import {
  clientSchema,
  machineSchema,
  rentSchema,
  reportSchema,
  userSchema,
  workerSchema,
} from "../schemas";
import { InferOutput } from "valibot";

export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister extends ILogin {
  name: string;
}

export interface IForgetPass {
  email: string;
}

export interface IToken {
  token: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmNewPassword: string;
}

//TYPES

export type typeUser = InferOutput<typeof userSchema>;

export type typeMachine = InferOutput<typeof machineSchema>;

export type typeClient = InferOutput<typeof clientSchema>;

export type typeRent = InferOutput<typeof rentSchema>;

export type typeReport = InferOutput<typeof reportSchema>;

export type typeWorker = InferOutput<typeof workerSchema>;

export type typeRegisterClient = Omit<typeClient, "_id">;
export type typeRegisterMachine = Omit<
  typeMachine,
  "_id" | "createdAt" | "updatedAt"
>;
export type typeRegisterRent = Omit<typeRent, "_id" | "rental_date" | "price">;
export type typeRegisterWorker = {
  name: string;
  email: string;
  password: string;
  rol: string;
};
export type typeRegisterReport = Omit<typeReport, "_id" | "report_date">;

export type typeMoney = {
  brand: string;
  amount: number;
  status: "Activo" | "Inactivo" | "Mantenimiento";
  name: string;
};
