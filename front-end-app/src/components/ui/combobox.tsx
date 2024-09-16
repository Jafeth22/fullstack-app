"use client";

import { Check, ChevronsUpDown } from "lucide-react";
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
import { FC } from "react";
import { useState } from "react";

interface ComboboxValues {
  value: string;
  label: string;
}

interface ComboboxProps {
  placeHolder?: string;
  listValues: ComboboxValues[];
  setSelectedCity: (currentValue: string) => void;
  defaultValue?: string;
}

const Combobox: FC<ComboboxProps> = ({
  placeHolder = "Select an option",
  listValues,
  setSelectedCity,
  defaultValue = "",
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  const onSelect = (currentValue) => {
    const selected = currentValue === value ? "" : currentValue;
    setValue(selected);
    setSelectedCity(selected);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-3 justify-between"
        >
          {value
            ? listValues.find((current) => current.value === value)?.label
            : placeHolder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder={placeHolder} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {listValues.map((current) => (
                <CommandItem
                  key={current.value}
                  value={current.value}
                  onSelect={onSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === current.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {current.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { Combobox };
