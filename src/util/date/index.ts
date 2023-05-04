import type { yearAndMonth } from '@/types/content'

export function convertDatePickerObjToDate(datePickerObj: yearAndMonth): Date {
  return new Date(datePickerObj.year, datePickerObj.month)
}

export function formatDate(
  startDate: yearAndMonth | undefined,
  endDate: yearAndMonth | undefined
): string {
  if (startDate && endDate) {
    startDate.month += 1
    endDate.month += 1
    return `${startDate.year}.${
      startDate.month < 10 ? `0${startDate.month}` : startDate.month
    }~${endDate.year}.${
      endDate.month < 10 ? `0${endDate.month}` : endDate.month
    }`
  } else {
    return ''
  }
}
