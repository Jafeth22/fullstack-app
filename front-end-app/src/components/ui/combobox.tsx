"use client";

import * as React from "react";
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

interface ComboboxValues {
  value: string;
  label: string;
}

interface ComboboxProps {
  placeHolder?: string;
  listValues: ComboboxValues[];
  selectedValue: (currentValue: string) => void;
}

const Combobox: FC<ComboboxProps> = ({
  placeHolder = "Select an option",
  listValues,
  selectedValue,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const onSelect = (currentValue) => {
    const selected = currentValue === value ? "" : currentValue;
    setValue(selected);
    selectedValue(selected);
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
          <CommandInput placeholder="Search option..." />
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
