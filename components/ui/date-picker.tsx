"use client"

import type * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarPrimitive } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePicker({
  className,
  value,
  onChange,
  ...props
}: React.PropsWithChildren<React.ComponentPropsWithoutKeyof<typeof CalendarPrimitive, "mode" | "captionLayout">>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !(value instanceof Date) && "text-muted-foreground",
            className,
          )}
        >
          {value ? format(value, "yyyy-MM-dd") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <CalendarPrimitive mode="single" selected={value} onSelect={onChange} disabled={props.disabled} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
