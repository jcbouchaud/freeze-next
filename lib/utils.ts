import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, format, formatDuration, intervalToDuration } from "date-fns"
import { BaseSearchParams } from "./definitions"


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

export function buildUrlFromBrowserParams<T extends BaseSearchParams>(url: URL, params: T) {
  if (!params.size) {
    url.searchParams.set("size", "10")
  }

  Object.entries(params).map(p => {
    if (Array.isArray(p[1])) {
      p[1].map(x => url.searchParams.append(p[0], x))
    } else {
      url.searchParams.set(p[0], p[1])
    }
  })

  return url
}
