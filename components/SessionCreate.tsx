'use client'

import * as Accordion from "@radix-ui/react-accordion";
import StartSession from "./StartSession";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

export default function SessionCreate() {
    const [timeElapsed,setTimeElapsed] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const timerId = useRef<null | NodeJS.Timeout>(null)
    const [startTime,setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const startSessionProps ={
        timeElapsed:timeElapsed,
        setTimeElapsed:setTimeElapsed,
        isTimerRunning:isTimerRunning,
        setIsTimerRunning,
        timerId,
        startTime,
        setStartTime,
        endTime,
        setEndTime
    }
    const accordion = <Accordion.Root type="single" defaultValue="item-1" className="bg-gray-400">
        <Accordion.Item value="item-1" className="group">
            <Accordion.Trigger className="AccordionTrigger p-4 data-[state=open]:border-black data-[state=open]:border-2">
                <span>Start / Record a New Session Now!</span>
                <ChevronDownIcon className="AccordionChevron group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
            <Accordion.Content className="bg-gray-200">
                <StartSession operation="create" {...startSessionProps} />
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2" className="group">
            <Accordion.Trigger className="AccordionTrigger p-4 data-[state=open]:border-black data-[state=open]:border-2">
                <span>Save past Session</span>
                <ChevronDownIcon className="AccordionChevron group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="bg-gray-200">
            <StartSession operation="save" {...startSessionProps} />
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    return accordion
}