import CountryFlagAndName from "@/components/card/CountryFlagAndName";
import EmptyList from "@/components/home/EmptyList";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchBookins } from "@/utils/actions"
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";


export default async function BookingsPage() {
  const bookings = await fetchBookins();
  if (bookings.length < 1) return <EmptyList />

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">Total bookings: {bookings.length}</h4>
      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name  </TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = booking;
            const { id: propertyId, name, country } = booking.property;
            const startDate = formatDate(checkIn);
            const endDate = formatDate(checkOut);
            return <TableRow key={id}>
              <TableCell><Link href={`/properties/${propertyId}`} className="text-muted-foreground tracking-wide">{name}</Link></TableCell>
              <TableCell><CountryFlagAndName countryCode={country} /></TableCell>
              <TableCell>{totalNights}</TableCell>
              <TableCell>{formatCurrency(orderTotal)}</TableCell>
              <TableCell>{startDate}</TableCell>
              <TableCell>{endDate}</TableCell>

            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  )
}
