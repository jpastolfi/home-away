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
  const { toast } = useToast();

  const blockedPeriods = generateBlockedPeriods({ bookings, today: currentDate });

  const unavailableDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are booked, please select again"
        });
        return true;
      }
      return false;
    });
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
