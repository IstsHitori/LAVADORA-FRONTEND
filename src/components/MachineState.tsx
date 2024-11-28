import { stateMachines } from "../helpers";
import { typeMachine } from "../types";
import { GrVmMaintenance } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { PiCheckCircleFill } from "react-icons/pi";

type MachineTypes = {
  value: typeMachine;
};

export default function MachineState({ value }: MachineTypes) {
  const { state, name, brand } = value;
  return (
    <div className="flex items-center justify-between border-t pt-2">
      <div className="flex items-center gap-2 text-sm">
        {state === stateMachines.ACTIVE ? (
          <PiCheckCircleFill className="text-xl text-green-400" />
        ) : state === stateMachines.INACTIVE ? (
          <IoMdCloseCircle className="text-red-400 text-xl" />
        ) : (
          <GrVmMaintenance className="text-yellow-400 text-xl" />
        )}
        <p className="text-sm">{name}, {brand}</p>
      </div>
        <p className={`${state === stateMachines.ACTIVE ? "bg-green-200" : state === stateMachines.INACTIVE ? "bg-red-200" : "bg-yellow-200"} rounded-lg p-1 px-3 text-xs` }>{state}</p>
    </div>
  );
}
