"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { cn } from "@lib/utils";
import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DatePikerProps {
  labelInput: string;
  nameHtml: string;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  placeHolder?: string;
}

const DatePiker: FC<DatePikerProps> = ({
  labelInput,
  nameHtml,
  date,
  setDate,
  placeHolder = "Pick a date",
}) => {
  return (
    <>
      <Label htmlFor={nameHtml} className="text-right">
        {labelInput}
      </Label>
      <Popover>
        <PopoverTrigger asChild name={nameHtml}>
          <Button
            variant={"outline"}
            className={cn(
              "col-span-3 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeHolder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            initialFocus
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export { DatePiker };
