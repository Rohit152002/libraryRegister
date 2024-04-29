import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CSVLink } from "react-csv";
import { useEffect, useState, useRef } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { io } from "socket.io-client";
import { format, isSameDay } from "date-fns";
import { Calendar as CalenderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import InputText from "./components/InputText";
import TableData from "./components/TableData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";

import FilterTable from "./components/FilterTable";
export default function App() {
  const socket = io("http://localhost:3000");

  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  socket.on("student-table", (data) => setData(data));
  useEffect(() => {
    const fetchTableData = async () => {
      const res = await fetch("http://localhost:3000/register/all");
      const data = await res.json();
      console.log(data.message);
      // setData(data.message);
      // setData(data.message);
      const filterData = data.message.filter((student) =>
        isSameDay(date, student.date)
      );
      setData(filterData);
    };
    fetchTableData();
  }, [date]);

  return (
    <div className=" w-screen flex flex-col justify-center items-start">
      <InputText />
      <div className="w-full flex flex-col items-center justify-center ">
        <FilterTable data={data} date={date} setDate={setDate} />
        <TableData data={data} />
      </div>
    </div>
  );
}
