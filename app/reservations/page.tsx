import CountryFlagAndName from "@/components/card/CountryFlagAndName";
import EmptyList from "@/components/home/EmptyList";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchReservations } from "@/utils/actions"
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";

export default async function ReservationsPage() {
  const reservatios = await fetchReservations();
  if (reservatios.length < 1) return <EmptyList />
  return (
    <div className="mt-16">
      <div className="mb-4 capitalize">
        total reservations: {reservatios.length}
      </div>
      <Table>
        <TableCaption>A list of your recent reservations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservatios.map((reservation) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = reservation;
            const { id: propertyId, name, country } = reservation.property;
            const startDate = formatDate(reservation.checkIn);
            const endDate = formatDate(reservation.checkOut);
            return <TableRow key={id}>
              <TableCell>
                <Link href={`/properties/${propertyId}`} className="underline text-muted-foreground tracking-wide">
                  {name}
                </Link>
              </TableCell>
              <TableCell>
                <CountryFlagAndName countryCode={country} />
              </TableCell>
              <TableCell>
                {totalNights}
              </TableCell>
              <TableCell>
                {formatCurrency(orderTotal)}
              </TableCell>
              <TableCell>
                {startDate}
              </TableCell>
              <TableCell>
                {endDate}
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  )
}
