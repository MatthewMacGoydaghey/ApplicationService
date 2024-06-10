import { Between } from "typeorm"
import { DateFilter } from "./types"
import { UnauthorizedException } from "@nestjs/common"

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
  return Between(dateFilter.from || '20240101',
   dateFilter.to || new Date().toISOString().substring(0, 10) + ' ' + new Date().toLocaleTimeString())
}