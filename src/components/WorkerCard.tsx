import user from "/user.svg";
import { typeWorker } from "../types";
import { stateRoles } from "../helpers";

type WorkerCardType = {
  value: typeWorker;
};

export default function WorkerCard({ value }: WorkerCardType) {
  const { name, email, rol } = value;
  return (
    <div className="border-b py-2">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex gap-2">
          <img className="size-9" src={user} alt="client.svg" />
          <div>
            <p className="text-sm">{name}</p>
            <p className="text-zinc-500 text-xs">{email}</p>
          </div>
        </div>
        <p
          className={`${
            rol.name === stateRoles.ADMIN
              ? "text-blue-600 bg-blue-200"
              : "text-green-600 bg-green-200"
          } text-xs py-1 rounded-lg px-3`}
        >
          {rol.name}
        </p>
      </div>
    </div>
  );
}
