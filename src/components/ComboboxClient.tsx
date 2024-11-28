"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxClient() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const clients = useAuthStore((state) => state.clients);
  const setDocumentClient = useAuthStore((state) => state.setDocumentClient);

  React.useEffect(() => {
    if (Number(value)) {
      setDocumentClient(+value);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? clients.find((index) => index.document.toString() === value)?.name
            : "Selecciona un cliente"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] lg:h-[17rem] p-0">
        <Command className="relative ">
          <CommandInput
            placeholder="Busca el cliente por su documento..."
            className="h-9"        
          />
          <CommandList>
            <CommandEmpty>No hay clientes o no se encontró el cliente.</CommandEmpty>
            <CommandGroup>
              {clients.map((index) => (
                <CommandItem
                  key={index.document}
                  value={index.document.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {index.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === index.document.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
