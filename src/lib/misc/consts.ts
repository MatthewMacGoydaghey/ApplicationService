import { Between } from "typeorm"
import { DateFilter } from "./types"

export const BetweenDates = (date: string) => {
  let dateFilter: DateFilter = {
    from: undefined,
    to: undefined
  }
  if (date) {
  const dates = date.split(',')
  dateFilter = {
    from: dates[0],
    to: dates[1]
  }
}
  return Between(dateFilter.from || '2000-01-01',
   dateFilter.to || '2100-01-01')
}