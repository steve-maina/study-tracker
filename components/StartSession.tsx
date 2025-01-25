"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Form from 'next/form'
import FormButtons, { SaveDialog } from "./Elements";
import formSubmit from "@/app/actions/actions";
import moment from "moment";

export default function StartSession(
  {operation,setIsTimerRunning,timerId,setTimeElapsed,timeElapsed, isTimerRunning,startTime, setStartTime, endTime, setEndTime}:{
    setIsTimerRunning:React.Dispatch<React.SetStateAction<boolean>>;
    timerId:React.RefObject<NodeJS.Timeout | null>;
    setTimeElapsed:React.Dispatch<React.SetStateAction<number>>;
    timeElapsed:number;
    isTimerRunning:boolean;
    startTime:string;
    operation:string;
    endTime:string;
    setStartTime:React.Dispatch<React.SetStateAction<string>>;
    setEndTime:React.Dispatch<React.SetStateAction<string>>;
  }
) {
  function startTimer(){
    setIsTimerRunning((prevState:boolean)=>true)
    timerId.current = setInterval(() => {
      setTimeElapsed((prevState:number)=>{
        return prevState + 1;
      })
    },1000)
  }
  function stopTimer(){
    setIsTimerRunning((prevState:boolean)=>false)
    if(timerId.current !== null){
      clearInterval(timerId.current)
      setTimeElapsed((prevState: number)=> 0)
    }
  }
  function pauseTimer() {
    setIsTimerRunning((prevState:boolean)=>false)
    if(timerId.current !== null){
      clearInterval(timerId.current)
    }
  }
  function clearDialogInputs() {
    setTopic("")
    setStartTime("")
    setEndTime("")
    setDate(moment().format("YYYY MM DD"))
  }
  function formatTimeElapsed(durationInSeconds: string) {
    const timeMoment = moment.duration(durationInSeconds,"seconds")
    const minutes = Math.floor(timeMoment.minutes())
    const hours = Math.floor(timeMoment.hours())
    const seconds = timeMoment.seconds()
    const minutesPadded = minutes.toString().padStart(2,"0")
    const hoursPadded = hours.toString().padStart(2,"0")
    const secondsPadded = seconds.toString().padStart(2,"0")
    const timer1 = `${hoursPadded}:${minutesPadded}:${secondsPadded}`
    const timer2 = `${minutesPadded}:${secondsPadded}`
    return `${hours < 1 ? timer2:timer1}`
  }
  const [state, formAction, isPending]= useActionState(formSubmit,null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [topic, setTopic] = useState("")
  const [timezone, setTimezone] = useState<string |undefined>(undefined)
  const [date,setDate] = useState(moment().format("YYYY MM DD"))
  const formRef = useRef<HTMLFormElement | null>(null)
  const triggerBtn = <FormButtons type="button" disabled={isTimerRunning ||isPending || (operation === "create" ? timeElapsed < 60:false)} onClick={clearDialogInputs}>Save Session</FormButtons>
  return (
    <>
      {operation =="create"? <p>Start Recording Session</p>:undefined}
      <Form action={formAction} ref={formRef}>
        <p className="text-center">{
        operation == "create"? formatTimeElapsed(timeElapsed.toString()):"Save a past study session"}</p>
        <input type="hidden" value={topic} name="topic"/>
        <input type="hidden" value={date} name="day" />
        <input type="hidden" value={timeElapsed} name="duration" />
        <input type="hidden" value={startTime} name="start" />
        <input type="hidden" value={endTime} name="end" />
        <input type="hidden" value={operation} name="operation" />
        <input type="hidden" value={timezone} name="timezone" />
        <div className="flex justify-between">
          {operation === "create" ? <><FormButtons type="button" disabled={isPending} onClick={isTimerRunning ? pauseTimer : startTimer}>{isTimerRunning ? "Pause" :
            (timeElapsed > 0 ? "Resume" : "Start")}</FormButtons><FormButtons type="button" disabled={isPending} onClick={stopTimer}>Reset</FormButtons></>:undefined}
          <SaveDialog operation={operation} date={date} setDate={setDate} topic={topic} setTopic={setTopic} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
          formRef={formRef} trigger={triggerBtn} open={isDialogOpen} setOpen={setIsDialogOpen}/>
        </div>
      </Form>
    </>
  );
}
