'useclient'

import { useProperty } from "@/utils/store"
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";

export default function BookingContainer() {
  const state = useProperty((state) => state);
  console.log(state);

  return (
    <div className="w-full">
      <BookingForm />
      <ConfirmBooking />
    </div>
  )
}
