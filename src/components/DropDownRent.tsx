import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { typeRent } from "@/types";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "react-toastify";

type DropDownRentTypes = {
  _id: typeRent["_id"];
};
export default function DropDownRent({ _id }: DropDownRentTypes) {
  const addMoreTime = useAuthStore((state) => state.addMoreTime);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xl text-white absolute outline-none right-4 top-2">
        ...
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const hours = Number(prompt("Cuánto tiempo desea agregar más?"));
            if (!Number.isInteger(hours) || hours === null) {
              return toast.info("Dato no válido");
            }
            if(hours < 1)return;
            await addMoreTime(_id, +hours);
          }}
          className="cursor-pointer transition-all"
        >
          Añadir más tiempo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
