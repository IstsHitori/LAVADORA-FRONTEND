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

export function ComboboxMachine() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const machines = useAuthStore((state) => state.machines);
  const setIdMachine = useAuthStore((state) => state.setIdMachine);
  React.useEffect(() => {
    if (value) {
      setIdMachine(value);
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
            ? machines.find(
                (index) =>
                  index._id === value &&
                  index.state !== "Inactivo" &&
                  index.state !== "Mantenimiento"
              )?.name
            : "Selecciona una lavadora"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Busca la lavadora..." className="h-9" />
          <CommandList>
            <CommandEmpty>No hay lavadoras disponibles.</CommandEmpty>
            <CommandGroup>
              {machines.map((index) =>
                index.state !== "Inactivo" &&
                index.state !== "Mantenimiento" ? (
                  <CommandItem
                    key={index._id}
                    value={index._id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {index.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === index.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ) : null
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
