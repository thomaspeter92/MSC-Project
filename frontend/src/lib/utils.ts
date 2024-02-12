import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from 'luxon'



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('HH:mm')
}