"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerType = {
  setState: React.Dispatch<React.SetStateAction<Date>>
  state: Date
}

export function DatePicker ({ setState, state }: DatePickerType) {
  // const [date, setDate] = React.useState<Date>()
  // console.log({date})
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !state && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {state ? format(state, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={state}
          onSelect={(e) => e && setState(e)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
