'use client'

import { useState, useEffect } from "react"
import { Calendar } from "../ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { useProperty } from "@/utils/store"
import { DateRange } from "react-day-picker"

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods
} from "@/utils/calendar"


export default function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const { bookings } = useProperty((state) => state);
  const blockedPeriods = generateBlockedPeriods({ bookings, today: currentDate });
  useEffect(() => {
    useProperty.setState({ range })
  }, [range])
  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={blockedPeriods}
    />
  )
}
