"use server"

import moment from "moment"

export async function getLatestSessions() {
    const startDate = moment().subtract(7,"days").startOf("day").format()
    const endDate = moment().subtract(1,"days").endOf("day").format()
   
    return [startDate, endDate]
}