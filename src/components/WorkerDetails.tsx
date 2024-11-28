import user from "/user.svg";
import { typeWorker } from "../types";
import { stateRoles } from "../helpers";
import DropDownWorker from "./DropDownWorker";
import SelectUIWorker from "./SelectUIWorker";

type WorkerCardType = {
  value: typeWorker;
};

export default function WorkerDetails({ value }: WorkerCardType) {
  const { name, email, rol, _id, state, confirm } = value;
  return (
    <div className="border-b py-5 border px-2 rounded-lg">
      <div className="flex items-center gap-5 justify-between relative">
        <div className="flex gap-2">
          <img className="size-9" src={user} alt="client.svg" />
          <div>
            <p className="text-sm">{name}</p>
            <p className="text-zinc-500 text-xs">{email}</p>
            <SelectUIWorker id={_id} state={state} />
          </div>
        </div>
        <p
          className={`${
            confirm ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"
          } rounded-lg px-1 text-xs text-center`}
        >
          {confirm ? "Confirmado" : "No confirmado"}
        </p>
        <p
          className={`${
            rol.name === stateRoles.ADMIN
              ? "text-blue-600 bg-blue-200"
              : "text-green-600 bg-green-200"
          } text-xs py-1 rounded-lg px-3`}
        >
          {rol.name}
        </p>
        <DropDownWorker id={_id} />
      </div>
    </div>
  );
}
