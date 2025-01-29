"use client";
import { ExportDataFormProps } from "@/types";
import { Button } from "@mui/material";
import moment from "moment";




export default function ExportDataForm({timeUnit,setTimeUnit,startDate,endDate,setStartDate, setEndDate}:ExportDataFormProps) {
  const handleClick = async () => {
    const response = await fetch(`/api/file?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`);
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
        value={moment(startDate).format("YYYY-MM-DD")}
        onChange={(event) => {
          setStartDate(moment(event.target.value).toString());
        }}
      />
      <input
        type="date"
        value={moment(endDate).format("YYYY-MM-DD")}
        onChange={(event) => {
          setEndDate(moment(event.target.value).toString());
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
