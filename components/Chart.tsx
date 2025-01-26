"use client";

import { updateChart,hello } from "@/app/actions/actions";
import { convertToTimeUnit, timeUnit } from "@/app/lib/assorted-c";
import { Button } from "@mui/material";
import { BarChart, ChartsText, ChartsTextProps } from "@mui/x-charts";
import { Session } from "@prisma/client";
import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
type chartSessions = {
  totalTime: number | null;
  dayOfWeek: string;
};

function myChartText(props: ChartsTextProps) {
  const {style,children,...otherProps} = props
  const newStyles = {...style,padding:10}
  return <ChartsText {...otherProps} style={newStyles}>
    {children}
  </ChartsText>

}

export default function SessionChart() {
  async function  submit(event: React.FormEvent){
    event.preventDefault()
    setSessions(await updateChart(startDate,endDate))
  }
  async function setInitialSessions() {
    setSessions(await updateChart(startDate,endDate))
  }
  const [timeUnit, setTimeUnit] = useState<timeUnit>("minutes")
  const[startDate,setStartDate] = useState(moment().subtract(7,"days").format("YYYY-MM-DD"))
  const[endDate,setEndDate] = useState(moment().subtract(1,"days").format("YYYY-MM-DD"))
  const [sessions, setSessions] = useState<Array<ModifiedSessions>>([])
  // useEffect(()=>{
  //   // const newSessions = sessions.map((session) => {
  //   //   return {
  //   //     ...session,
  //   //     totalTime: convertToTimeUnit(session.totalTime as number,timeUnit)
  //   //   }
  //   // })
  //   setSessions([...sessions])
  // },[timeUnit])
  useEffect(()=>{
    setInitialSessions()
  },[])
  return (
    <>
    <div className="flex items-center w-full">
      {sessions.length > 0 ?
      <>
      <BarChart
      slots={{
        axisLabel:myChartText
      }}
        dataset={sessions.map((session)=>{
          return {
            ...session,
            summary:convertToTimeUnit(session.totalTime as number,timeUnit)
          }
        })}
        xAxis={[{ scaleType: "band", dataKey: "dayOfWeek"}]}
        series={[{ dataKey: "summary",label:`${timeUnit.charAt(0).toUpperCase()+timeUnit.slice(1)} read` }]}
        width={400}
        height={300}
      />
       </>: <p className="text-center grow">Choose a time period</p>}
      <form>
        <select disabled={sessions.length === 0}
        name="timeUnit" id="timeUnit" value={timeUnit} onChange={
          (event: React.ChangeEvent<HTMLSelectElement>) => {
            setTimeUnit((prevValue) =>{
            
              return event.target.value as timeUnit
            })
          }
        }>
          <option value="hours">Hours</option>
          <option value="minutes">Minutes</option>
          <option value="seconds">Seconds</option>
        </select>
        <label>Start Date: <input type="date" name="startDate" value={startDate} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> {
          setStartDate(event.target.value)
        }}/></label>
        <label>End Date: <input type="date" name="startDate" value={endDate} onChange={
          (event:React.ChangeEvent<HTMLInputElement>) => {
            setEndDate(event.target.value)
          }
        }/></label>
        <Button variant="contained" onClick={submit}>Submit</Button>
      </form>
     
      </div>
    </>
  );
}
