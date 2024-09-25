'use client'

import { useProperty } from "@/utils/store";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createBookingAction } from "@/utils/actions";
import SubmitButton from "../form/Buttons";

export default function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  if (!userId) return <SignInButton mode="modal">
    <Button type="submit" className="w-full">Sign in to complete booking</Button>
  </SignInButton>
  const createBooking = createBookingAction.bind(null, { propertyId, checkIn, checkOut })
  return (
    <FormContainer action={createBooking}>
      <SubmitButton text="Reserve" className="w-full" />
    </FormContainer>
  )
}
