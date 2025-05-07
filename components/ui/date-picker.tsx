"use client"

import type * as React from "react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DatePicker({
  className,
  value,
  onChange,
  ...props
}: React.PropsWithChildren<
  React.ComponentPropsWithoutRef<typeof DayPicker> & {
    value?: Date
    onChange?: (date?: Date) => void
  }
>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !value && "text-muted-foreground", className)}
        >
          {value ? format(value, "yyyy-MM-dd") : <span>日付を選択</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <DayPicker mode="single" selected={value} onSelect={onChange} disabled={props.disabled} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
