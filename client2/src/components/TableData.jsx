import React from "react";
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
import { format } from "date-fns";
const TableData = ({ data }) => {
  return (
    <div className="pl-20 pt-10  w-full flex justify-center items-center">
      {data.length > 0 && (
        <Table className="shadow-lg  w-3/4 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className=" w-[100px]">Slno.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Registration No</TableHead>
              <TableHead>In Time</TableHead>
              <TableHead>Out time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((student, i) => (
              <TableRow key={student._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.semester}</TableCell>
                <TableCell>{student.registration_no}</TableCell>
                <TableCell>{format(student.in, "h:mm a")}</TableCell>
                <TableCell>
                  {student.out ? format(student.out, "h:mm a") : "---"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TableData;
