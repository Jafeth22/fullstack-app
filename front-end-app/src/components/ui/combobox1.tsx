"use client";

import * as React from "react";

// import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

interface dataValue {
  value: string;
  label: string;
}

interface ComboBoxResponsiveProps {
  listValue: dataValue[];
  inputLabel: string;
}

const ComboBoxResponsive: React.FC<ComboBoxResponsiveProps> = ({
  listValue,
  inputLabel,
}) => {
  const [open, setOpen] = React.useState(false);
  //   const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  //   if (isDesktop) {
  //     return (
  //       <Popover open={open} onOpenChange={setOpen}>
  //         <PopoverTrigger asChild>
  //           <Button variant="outline" className="w-[150px] justify-start">
  //             {selectedStatus ? <>{selectedStatus.label}</> : <>{inputLabel}</>}
  //           </Button>
  //         </PopoverTrigger>
  //         <PopoverContent className="w-[200px] p-0" align="start">
  //           <StatusList
  //             listValue={listValue}
  //             setOpen={setOpen}
  //             setSelectedStatus={setSelectedStatus}
  //           />
  //         </PopoverContent>
  //       </Popover>
  //     );
  //   }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>{inputLabel}</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StatusList
          listValue={listValue}
          setOpen={setOpen}
          setSelectedStatus={setSelectedStatus}
        />
      </PopoverContent>
    </Popover>
    // <Drawer open={open} onOpenChange={setOpen}>
    //   <DrawerTrigger asChild>
    //     <Button variant="outline" className="w-[150px] justify-start">
    //       {selectedStatus ? <>{selectedStatus.label}</> : <>{inputLabel}</>}
    //     </Button>
    //   </DrawerTrigger>
    //   <DrawerContent>
    //     <div className="mt-4 border-t">
    //       <StatusList
    //         listValue={listValue}
    //         setOpen={setOpen}
    //         setSelectedStatus={setSelectedStatus}
    //       />
    //     </div>
    //   </DrawerContent>
    // </Drawer>
  );
};

function StatusList({
  listValue,
  setOpen,
  setSelectedStatus,
}: {
  listValue: dataValue[];
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      {/* <CommandInput placeholder="Filter status..." /> */}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {listValue.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  listValue.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default ComboBoxResponsive;
