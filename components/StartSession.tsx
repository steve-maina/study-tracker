"use client";

import { useActionState, useRef, useState } from "react";
import Form from 'next/form'
import FormButtons from "./Elements";
import { formSubmit } from "@/app/actions/actions";

export default function StartSession() {
  function startTimer(){
    timerId.current = setInterval(() => {
      setTimeElapsed((prevState:number)=>{
        return prevState + 1;
      })
    },1000)
  }
  function stopTimer(){
    if(timerId.current !== null){
      clearInterval(timerId.current)
      setTimeElapsed((prevState: number)=> 0)
    }
  }
  function pauseTimer() {
    if(timerId.current !== null){
      clearInterval(timerId.current)
    }
  }
  function dummyFunction() {

  }
  const [state, formAction, isPending]= useActionState(formSubmit,null)
  const [timeElapsed,setTimeElapsed] = useState(0)
  const timerId = useRef<null | NodeJS.Timeout>(null)
  return (
    <>
      <p>Start Recording Session</p>
      <Form action={formAction}>
        <p className="text-center">{timeElapsed}</p>
        <div className="flex justify-between">
          <FormButtons type="button" disabled={isPending} onClick={dummyFunction}>Start</FormButtons>
          <FormButtons type="button" disabled={isPending} onClick={dummyFunction}>Pause</FormButtons>
          <FormButtons type="button" disabled={isPending} onClick={dummyFunction}>Reset</FormButtons>
          <FormButtons type="submit" disabled={isPending} onClick={dummyFunction}>Save Session</FormButtons>
        </div>
      </Form>
    </>
  );
}
