export interface DateFilter {
  from: string
  to: string
  }


  export interface JWTpayload {
    id: number,
    position: PositionEnum
  }


  export type StatusEnum = "Active" | "Resolved"


  export type PositionEnum = "Processor" | "Requester"


  export type Positions = 'Processor' | 'Requester'