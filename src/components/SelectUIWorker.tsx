import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typeWorker } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";

type selectUIType = {
  state: typeWorker["state"];
  id: typeWorker["_id"];
};
export default function SelectUIWorker({ state, id }: selectUIType) {
  const changeStateWorker = useAuthStore((state) => state.changeStateWorker);
  const fetchWorker = useAuthStore((state) => state.fetchWorker);

  const handleChange = async (e: string) => {
    const stateParse: boolean = e === "Activo" ? true : false;

    await changeStateWorker(id,stateParse);
    await fetchWorker();
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={` w-[150px] text-sm`}>
        <SelectValue
          placeholder={state ? "Activo" : "Inactivo"}
          defaultValue={state ? "Activo" : "Inactivo"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="text-green-500" value={"Activo"}>
          Activo
        </SelectItem>
        <SelectItem className="text-rose-500" value={"Inactivo"}>
          Inactivo
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
