import { typeMachine } from "@/types";
import { MdBrandingWatermark } from "react-icons/md";
import SelectUI from "./SelectUI";
import { useAuthStore } from "@/stores/useAuthStore";

type MachineDetailType = {
  value: typeMachine;
};
export default function MachineDetail({ value }: MachineDetailType) {
  const deleteMachine = useAuthStore((state) => state.deleteMachine);
  const { name, brand, state, _id } = value;

  return (
    <div className={` p-2 border rounded-md `}>
      <h1 className="text-lg font-semibold text-center border-b">{name}</h1>
      <div className=" mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdBrandingWatermark className="text-zinc-600" />
          {brand}
        </div>
        <button
          onClick={async () => {
            const response = confirm("Está seguro de eliminar esta lavadora?");
            if (!response) return;
            await deleteMachine(_id);
          }}
          className="bg-red-500 hover:bg-red-600 transition-all cursor-pointer p-1 rounded-md px-3 text-sm text-white"
        >
          Eliminar
        </button>
        <div>
          <SelectUI state={state} id={_id} />
        </div>
      </div>
    </div>
  );
}
