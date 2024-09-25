import calculateTotals from "@/utils/calculateTotals";
import { formatCurrency } from "@/utils/format";
import { useProperty } from "@/utils/store"
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export default function BookingForm() {
  const { range, price } = useProperty(((state) => state));
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  const { totalNights, subTotal, cleaningFee, tax, orderTotal } = calculateTotals({ checkIn, checkOut, price });

  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">Summary</CardTitle>
      <FormRow label={`$${price} x ${totalNights} nights `} amount={subTotal} />
      <FormRow label={'Cleaning fee'} amount={cleaningFee} />
      <FormRow label={'Tax'} amount={tax} />
      <Separator className="mt-4" />
      <CardTitle className="mt-8">
        <FormRow label={'Total'} amount={orderTotal} />
      </CardTitle>
    </Card>
  )
}

const FormRow = ({ label, amount }: { label: string, amount: number }) => {
  return <p className="flex justify-between text-sm mb-2">
    <span>{label}</span>
    <span>{formatCurrency(amount)}</span>
  </p>

}