import { string, object, number, array, boolean } from "valibot";

export const userSchema = object({
  name: string(),
  email: string(),
  rol: string(),
});
export const usersSchema = array(userSchema);
//---
export const machineSchema = object({
  _id: string(),
  name: string(),
  brand: string(),
  state: string(),
  createdAt: string(),
  updatedAt: string(),
});
export const machinesSchema = array(machineSchema);
//---

export const clientSchema = object({
  _id: string(),
  name: string(),
  phone: number(),
  document: number(),
  address: string(),
  createdAt: string(),
  updatedAt: string(),
});
export const clientsSchema = array(clientSchema);
//---

export const rentSchema = object({
  _id: string(),
  document_client: number(),
  id_washing_machine: string(),
  rental_date: string(),
  price: number(),
  hours: number(),
});
export const rentsSchema = array(rentSchema);
//---

export const reportSchema = object({
  _id: string(),
  id_machine: string(),
  report_date: string(),
  description: string(),
});
export const reporstSchema = array(reportSchema);
//--

export const workerSchema = object({
  _id:string(),
  name: string(),
  email: string(),
  rol: object({
    name: string(),
  }),
  state:boolean(),
  confirm:boolean()
});

export const workersSchema = array(workerSchema);
