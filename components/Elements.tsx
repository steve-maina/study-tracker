import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useState } from "react";

type buttonTypes = "submit" | "reset" | "button";

export default function FormButtons({
  type,
  children,
  disabled = false,
  onClick,
}: {
  type: buttonTypes;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        "border-2 border-gray-600",disabled && "text-gray-500")}
    >
      {children}
    </button>
  );
}
export function SaveDialog({
  operation,
  startTime,setStartTime,endTime,setEndTime,
  formRef,trigger,open,setOpen,date,setDate,topic,setTopic}:{
    operation:string;
    startTime:string;setStartTime:React.Dispatch<React.SetStateAction<string>>
    endTime:string;setEndTime:React.Dispatch<React.SetStateAction<string>>
    trigger:React.ReactNode;open:boolean;setOpen:React.Dispatch<React.SetStateAction<boolean>>;formRef:React.RefObject<HTMLFormElement | null>;date:string;topic:string;setDate:React.Dispatch<React.SetStateAction<string>>;setTopic:React.Dispatch<React.SetStateAction<string>>}) {
  function submit() {
    formRef.current?.requestSubmit()
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-45"/>
        <Dialog.Content className="fixed left-1/2 top-1/2 bg-white">
          <Dialog.Title className="py-4 px-2">
            Save Study Session
          </Dialog.Title>
          <div>
            <h2>Add Details for your study session</h2>
            <label className="block mx-2 mt-4">Topic:
            <input required type="text" className="bg-gray-400 ml-2" value={topic} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
              if(event.target.value){
              setTopic(event.target.value )}}}/></label>
           {operation === "save" ?  <><label className="block mx-2 mt-4"> Date:
              <input required type="date" className="bg-gray-400 ml-2 mb-4" value={date} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.value) {
                  setDate(event.target.value);
                }
              } } /></label><label className="">Start Time
                <input required type="time" value={startTime} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setStartTime(event.target.value);
                } } className="mx-4 p-4" />
              </label><label>End Time
                <input required type="time" value={endTime} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEndTime(event.target.value);
                } } />
              </label></>:undefined}
          </div>
          <div className="flex justify-end">
          <Dialog.Close asChild><button type="button" onClick={submit} className="text-green-400 border border-gray-400">Save</button></Dialog.Close>
          <Dialog.Close asChild><button type="button" className="text-red-400 border border-gray-400 ml-4">Cancel</button></Dialog.Close></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
