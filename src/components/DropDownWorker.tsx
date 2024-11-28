import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";
import { typeWorker } from "@/types";

type DropDownWorkerType = {
  id: typeWorker["_id"];
};

export default function DropDownWorker({ id }: DropDownWorkerType) {
  const deleteWorker = useAuthStore((state) => state.deleteWorker);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xl absolute outline-none bottom-16 right-0">
        ...
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const response = confirm("Estás seguro de eliminar el empleado?");
            if (!response) return;
            await deleteWorker(id);
          }}
          className="mt-1 cursor-pointer bg-red-100 transition-all"
        >
          Eliminar empleado
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
