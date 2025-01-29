import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

export interface ExportDataFormProps {
  startDate: string;
  endDate: string;
  timeUnit: string;
  setTimeUnit: Dispatch<SetStateAction<string>>;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
}

export interface StartSessionProps {
  setIsTimerRunning: Dispatch<React.SetStateAction<boolean>>;
  timerId: RefObject<NodeJS.Timeout | null>;
  setTimeElapsed: Dispatch<SetStateAction<number>>;
  timeElapsed: number;
  isTimerRunning: boolean;
  startTime: string;
  operation: string;
  endTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  setEndTime: Dispatch<SetStateAction<string>>;
}

export interface SaveDialogProps {
  operation: string;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<string>>;
  trigger: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formRef: RefObject<HTMLFormElement | null>;
  date: string;
  topic: string;
  setDate: Dispatch<SetStateAction<string>>;
  setTopic: Dispatch<SetStateAction<string>>;
}
