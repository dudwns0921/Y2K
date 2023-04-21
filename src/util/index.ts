import type { yearAndMonth } from '@/types/content'

export function convertDatePickerObjToDate(datePickerObj: yearAndMonth): Date {
  return new Date(datePickerObj.year, datePickerObj.month)
}
