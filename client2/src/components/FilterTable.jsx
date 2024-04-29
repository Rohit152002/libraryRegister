import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isSameDay } from "date-fns";
import { Calendar as CalenderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CSVLink } from "react-csv";
const FilterTable = ({ data, date, setDate }) => {
  return (
    <div className="w-screen pl-20 flex flex-wrap  items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <CalenderIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : format(new Date(), "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            captionLayout="dropdown"
            fromYear={2015}
            toYear={2025}
          />
        </PopoverContent>
      </Popover>
      <CSVLink
        data={data}
        filename={"register.csv"}
        className="bg-blue-500 px-4 py-2 hover:bg-blue-300 rounded-md text-white"
        target="_blank"
      >
        Download csv
      </CSVLink>
    </div>
  );
};

export default FilterTable;
