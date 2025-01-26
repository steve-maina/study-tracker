"use client";
import { exportCSV } from "@/app/actions/actions";
import { Button } from "@mui/material";
import moment from "moment";
import { useState } from "react";


export default function ExportDataForm({timeUnit,setTimeUnit,startDate,endDate,setStartDate, setEndDate}:{
  startDate:string,
  endDate:string,
  timeUnit:string,
  setTimeUnit:React.Dispatch<React.SetStateAction<string>>,
  setStartDate:React.Dispatch<React.SetStateAction<string>>,
  setEndDate:React.Dispatch<React.SetStateAction<string>>
}) {
  
  const handleClick = async () => {
    const response = await fetch(`/api/file?start=${startDate}&end=${endDate}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "study-sessions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <form>
      <input
        type="date"
        value={startDate}
        onChange={(event) => {
          setStartDate(event.target.value);
        }}
      />
      <input
        type="date"
        value={endDate}
        onChange={(event) => {
          setEndDate(event.target.value);
        }}
      />
      <select value={timeUnit} onChange={(e)=> {
        setTimeUnit((prevValue)=>{
          return e.target.value
        })
      }
      }>
        <option value="hours">Hours</option>
        <option value="minutes">Minutes</option>
        <option value="seconds">Seconds</option>
      </select>
      <Button variant="contained" onClick={handleClick}>
        Export CSV
      </Button>
    </form>
  );
}
