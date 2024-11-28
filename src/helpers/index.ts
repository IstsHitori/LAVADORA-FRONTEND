import { typeMachine, typeMoney, typeRent } from "@/types";

export enum path {
  DASHBOARD = "/dashboard",
  CLIENTS = "/dashboard/clientes",
  MACHINE = "/dashboard/lavadoras",
  RENTS = "/dashboard/alquileres",
  WORKERS = "/dashboard/empleados",
  REPORTS = "/dashboard/reportes",
  MONETARY_INCOME = "/dashboard/ingresos",
}

export enum stateMachines {
  ACTIVE = "Activo",
  INACTIVE = "Inactivo",
  MAINTENANCE = "Mantenimiento",
}
export enum stateRoles {
  ADMIN = "Administrador",
  WORKER = "Empleado",
}

interface Alquiler {
  horaInicio: string;
  duracionHoras: number;
}

export const arrayRoles = [
  {
    key: "Administrador",
    value: "66df58ace0ed67281de6f8d0",
  },
  {
    key: "Empleado",
    value: "66df5b06251e640bde4e0bb1",
  },
];

export function getRemainingTime(alquiler: Alquiler): string {
  const ahora = new Date();
  const fechaInicio = new Date(alquiler.horaInicio);

  const fechaFin = new Date(fechaInicio);
  fechaFin.setHours(fechaFin.getHours() + alquiler.duracionHoras);

  if (fechaFin < ahora) {
    return "Tiempo expirado";
  }

  const diferenciaMilisegundos = fechaFin.getTime() - ahora.getTime();

  const horasRestantes = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
  const minutosRestantes = Math.floor(
    (diferenciaMilisegundos % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `Te quedan ${horasRestantes} horas y ${minutosRestantes} minutos.`;
}

export function getPaymentArray(
  rents: typeRent[],
  machines: typeMachine[]
): typeMoney[] {
  const data: typeMoney[] = [];
  console.log(rents);
  for (const i of machines) {
    const newPayment: typeMoney = {
      status: i.state as "Activo" | "Inactivo" | "Mantenimiento",
      brand: i.brand,
      name: i.name,
      amount: 0,
    };
    for (const j of rents) {
      if (i._id === j.id_washing_machine) {
        newPayment.amount += j.hours * j.price;
      }
    }
    data.push({ ...newPayment });
  }
  return [...data];
}

export function getTotalMoney(data: typeRent[]) {
  return data.reduce((total, currentValue) => total + currentValue.hours * currentValue.price, 0);
}
