import { Session } from "@prisma/client"
import moment from "moment"

export type timeUnit =  "seconds" | "minutes" | "hours"

export default function getTotalTime(sessions:Array<Session>,targetTimeUnit: "seconds" | "minutes" | "hours") {
    const total:number = sessions.reduce((accumulator:number,current:Session) =>{
        return accumulator + current.duration
      },0)
      const time = moment.duration(total, targetTimeUnit)
      return total
}

export function convertToTimeUnit(duration: number,target: timeUnit){
    const currentTimeDuration = moment.duration(duration,"seconds")
    if(target == "seconds") {
        return duration
    } else if (target == "minutes") {
        return currentTimeDuration.asMinutes()
    } else if (target == "hours") {
        return currentTimeDuration.asHours()
    }
    return null

}