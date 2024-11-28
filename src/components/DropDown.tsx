import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";
import { typeClient } from "@/types";

type DropDownType = {
  documentClient: typeClient["document"];
  id: typeClient["_id"];
};

export default function DropDown({ documentClient, id }: DropDownType) {
  const setIdClient = useAuthStore((state) => state.setIdClient);
  const setActiveModal = useAuthStore((state) => state.setActiveModal);
  const deleteClient = useAuthStore((state) => state.deleteClient);
  const fetchClients = useAuthStore((state) => state.fetchClients);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xl absolute outline-none right-0">
        ...
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setIdClient(documentClient);
            setActiveModal(true);
          }}
          className="cursor-pointer bg-blue-100 transition-all"
        >
          Actualizar cliente
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const response = confirm("Estás seguro de eliminar el cliente?");
            if(!response)return;
            await deleteClient(id);
            await fetchClients();
          }}
          className="mt-1 cursor-pointer bg-red-100 transition-all"
        >
          Eliminar cliente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
