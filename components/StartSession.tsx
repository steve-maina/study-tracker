"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Form from 'next/form'
import FormButtons, { SaveDialog } from "./Elements";
import formSubmit from "@/app/actions/actions";
import moment from "moment";
import { StartSessionProps } from "@/types";

export default function StartSession(props:StartSessionProps) {
  
  function startTimer(){
    props.setIsTimerRunning((prevState:boolean)=>true)
    props.timerId.current = setInterval(() => {
      props.setTimeElapsed((prevState:number)=>{
        return prevState + 1;
      })
    },1000)
  }
  function stopTimer(){
    props.setIsTimerRunning((prevState:boolean)=>false)
    if(props.timerId.current !== null){
      clearInterval(props.timerId.current)
      props.setTimeElapsed((prevState: number)=> 0)
    }
  }
  function pauseTimer() {
    props.setIsTimerRunning((prevState:boolean)=>false)
    if(props.timerId.current !== null){
      clearInterval(props.timerId.current)
    }
    setRecordingEnd(moment())
  }
  function clearDialogInputs() {
    setTopic("")
    props.setStartTime("")
    props.setEndTime("")
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
  const [recordingEnd, setRecordingEnd] = useState<moment.Moment>(moment())
  const [date,setDate] = useState(moment().format("YYYY MM DD"))
  const formRef = useRef<HTMLFormElement | null>(null)
  const triggerBtn = <FormButtons type="button" disabled={props.isTimerRunning ||isPending || (props.operation === "create" ? props.timeElapsed < 60:false)} onClick={clearDialogInputs}>Save Session</FormButtons>
  const saveDialogProps = {
    operation:props.operation,
    date: date,
    setDate: setDate,
    topic:topic,
    setTopic:setTopic,
    startTime:props.startTime,
    setStartTime:props.setStartTime,
    endTime:props.endTime,
    setEndTime:props.setEndTime,
    formRef:formRef,
    trigger: triggerBtn,
    open:isDialogOpen,
    setOpen:setIsDialogOpen
  }
  return (
    <>
      {props.operation =="create"? <p>Start Recording Session</p>:undefined}
      <Form action={formAction} ref={formRef}>
        <p className="text-center">{
        props.operation == "create"? formatTimeElapsed(props.timeElapsed.toString()):"Save a past study session"}</p>
        <input type="hidden" value={topic} name="topic"/>
        <input type="hidden" value={date} name="day" />
        <input type="hidden" value={props.timeElapsed} name="duration" />
        <input type="hidden" value={props.startTime} name="start" />
        <input type="hidden" value={props.endTime} name="end" />
        <input type="hidden" value={props.operation} name="operation" />
        <input type="hidden" value={recordingEnd.toISOString()} name="recordingEnd" />
        <div className="flex justify-between">
          {props.operation === "create" ? <><FormButtons type="button" disabled={isPending} onClick={props.isTimerRunning ? pauseTimer : startTimer}>{props.isTimerRunning ? "Pause" :
            (props.timeElapsed > 0 ? "Resume" : "Start")}</FormButtons><FormButtons type="button" disabled={isPending} onClick={stopTimer}>Reset</FormButtons></>:undefined}
          <SaveDialog {...saveDialogProps} />
        </div>
      </Form>
    </>
  );
}
