"use client";

import { updateChart } from "@/app/actions/actions";
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
type chartSession = {
  id:number;
  topic:string;
  date:Date;
  duration:number;
}
function groupSessions(sessions:Array<chartSession>,timeUnit:timeUnit){
  const newSessions:{
    [date:string]:Array<chartSession>
  } = {}
  for(const session of sessions){
    const date = moment(session.date).format("YYYY-MM-DD")
    if(newSessions[date]) {
      newSessions[date].push({...session})
    } else {
      newSessions[date] = [{...session}]
    }
  }
  const summary:Array<{date:string,totalTime:number}> = []
  for(const i in newSessions){
    const num = newSessions[i].reduce((acc:number,arr:chartSession)=>{
      return acc + (timeUnit === "hours" ? arr.duration / 3600 : (timeUnit === "minutes" ? arr.duration / 60 : arr.duration))
    },0)
    summary.push({date:moment(i).format("Do MMM"),totalTime:num})
  }
  
  return summary
}

export default function SessionChart() {
  async function  submit(event: React.FormEvent){
    event.preventDefault()
    const sessions = await updateChart(startDate.toDate().toISOString(),endDate.toDate().toISOString())
    
    setSessions(sessions)
  }
  async function setInitialSessions() {
    setSessions(await updateChart(startDate.toDate().toISOString(),endDate.toDate().toISOString()))
  }
  const [timeUnit, setTimeUnit] = useState<timeUnit>("minutes")
  const[startDate,setStartDate] = useState(moment().startOf("day").subtract(6,"days"))
  const[endDate,setEndDate] = useState(moment())
  const [sessions, setSessions] = useState<Array<chartSession>>([])
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
        dataset={groupSessions(sessions,timeUnit)}
        xAxis={[{ scaleType: "band", dataKey: "date"}]}
        series={[{ dataKey: "totalTime",label:`${timeUnit.charAt(0).toUpperCase()+timeUnit.slice(1)} read` }]}
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
        <label>Start Date: <input type="date" name="startDate" value={startDate.format("YYYY-MM-DD")} onChange={(event:React.ChangeEvent<HTMLInputElement>)=> {
          setStartDate(moment(event.target.value))
        }}/></label>
        <label>End Date: <input type="date" name="startDate" value={endDate.format("YYYY-MM-DD")} onChange={
          (event:React.ChangeEvent<HTMLInputElement>) => {
            setEndDate(moment(event.target.value))
          }
        }/></label>
        <Button variant="contained" onClick={submit}>Submit</Button>
      </form>
      </div>
    </>
  );
}
