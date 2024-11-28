import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stateMachines } from "@/helpers";
import { typeMachine } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

type selectUIType = {
  state: typeMachine["state"];
  id: typeMachine["_id"];
};
export default function SelectUI({ state, id }: selectUIType) {
  const changeStateMachine = useAuthStore((state) => state.changeStateMachine);
  const fetchMachine = useAuthStore((state) => state.fetchMachine);

  const handleChange = async (e: string) => {
    await changeStateMachine(e, id);
    await fetchMachine();
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={` w-[180px`}>
        <SelectValue placeholder={state} defaultValue={state} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="text-green-500" value={stateMachines.ACTIVE}>
          Activo
        </SelectItem>
        <SelectItem className="text-rose-500" value={stateMachines.INACTIVE}>
          Inactivo
        </SelectItem>
        <SelectItem
          className="text-orange-500 hover:text-orange-500"
          value={stateMachines.MAINTENANCE}
        >
          En mantenimiento
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
