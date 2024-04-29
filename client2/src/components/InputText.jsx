import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const InputText = () => {
  const socket = io("http://localhost:3000");
  const inputRef = useRef(null);
  const [student, setStudent] = useState(null);
  const [registration_no, setRegistrationNo] = useState("");
  const [timeOutId, setTimeOutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [timeId, setTimeId] = useState(null);
  const [timer, setTimer] = useState(5); // Initial countdown time in seconds

  const [debounced] = useDebouncedValue(registration_no, 500);
  useEffect(() => {
    inputRef.current.focus();
    const fetchStudent = async () => {
      try {
        if (debounced) {
          const res = await fetch(
            `http://localhost:3000/register?registration_no=${debounced}`
          );
          const data = await res.json();
          setStudent(data.message);
          console.log(data.success);
          if (data.success === true) {
            autoRegister(data.message);
          } else {
            setStudent(null);
            throw new Error("No student found");
          }
        }
      } catch (error) {
        setStudent(null);
        console.log(error.message);
      }
    };
    fetchStudent();

    // Clean up the timeout when component unmounts or debounced changes
  }, [debounced]);

  useEffect(() => {
    // Clear the interval after 10 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5000); // 10 seconds in milliseconds

    // Clean up the timeout when component unmounts or when timer reaches 0
    return () => {
      clearTimeout(timeoutId);
    };
  }, [intervalId]);

  const autoRegister = (obj) => {
    time();
    const id = setTimeout(() => {
      console.log(`after 10 sec : ${obj}`);
      register(obj);
    }, [5000]);
    setTimeOutId(id);
  };
  function time() {
    const intervalId = setInterval(() => {
      console.log(timer);
      setTimer((prevTimer) => {
        // Decrement the timer by 1 second until it reaches 0
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);
    setIntervalId(intervalId);
    setTimer(5); // Run every second (1000 milliseconds)
  }

  const handleAbortClick = () => {
    console.log("abort register");
    setStudent(null);
    clearTimeout(timeOutId);
    clearInterval(intervalId);
    setTimer(5);
  };
  const register = async (student) => {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: student.name,
        registration_no: student.registration_no,
        department: student.department,
        semester: student.semester,
      }),
    });
    const data = await res.json();
    console.log(data);
    // setCheckIn(data.checkIn);
    if (data.checkIn) {
      socket.emit("input", inputRef.value);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "CheckIn",
        showConfirmButton: false,
        timer: 1500,
      });
      setStudent(null);
      setRegistrationNo("");
    } else {
      socket.emit("input", inputRef.value);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "CheckOut",
        showConfirmButton: false,
        timer: 1500,
      });
      setStudent(null);
      setRegistrationNo("");
    }
  };
  const handleInput = (e) => {
    setRegistrationNo(e.target.value);
    if (e.target.value.length > 0) {
      setTimer(5);
    }
  };

  return (
    <div className="w-screen h-fit pb-10  flex flex-col gap-8 justify-center pt-12 items-center">
      <h1 className="text-3xl font-bold">Registration Website Library</h1>
      <input
        ref={inputRef}
        className=" text-black border border-black rounded-md w-1/2 px-2 text-xl"
        type="text"
        name=""
        id=""
        placeholder="Scanned Barcode"
        onChange={handleInput}
        value={registration_no}
      />
      {student && (
        <div className="border border-black text-xl rounded-md px-4 py-2 flex flex-col items-start justify-center">
          <p>Name: {student.name}</p>
          <p>Registration No.: {student.registration_no}</p>
          <p>Semester: {student.semester}</p>
          <p>Department: {student.department}</p>
          <div className="flex justify-center  w-full items-center mt-4">
            <button
              className="ring bg-green-400 ring-green-400 px-4 py-1 mt-auto"
              type="submit"
              onClick={handleAbortClick}
            >
              Rescan between this time {timer}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputText;
