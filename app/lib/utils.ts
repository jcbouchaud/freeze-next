import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, format, formatDuration, intervalToDuration } from "date-fns"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertDateToShortString = (date: Date) => {
  return format(date, "yyyy-MM-dd")
}

export const formatDurationFromInterval = (beginDate: Date | string, endDate: Date | string) => {
  const interval = intervalToDuration({
    start: new Date(beginDate),
    end: addDays(new Date(endDate), 1)
  })

  return formatDuration(interval, { format: ["years", "months", "days"] })
}
