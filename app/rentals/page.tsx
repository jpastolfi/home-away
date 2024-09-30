import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteRentalAction, fetchRentals } from "@/utils/actions"
import { formatCurrency } from "@/utils/format";
import Link from "next/link";


export default async function RentalsPage() {
  const rentals = await fetchRentals();
  rentals.length < 1 && <EmptyList heading="No rentals to display" message="Don't hesitate to create a rental" />
  return (
    <div className="mt-16 ">
      <h4 className="mb-4 capitalize">Active properties: {rentals.length}</h4>
      <Table>
        <TableCaption>A list of all your properties</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property name</TableHead>
            <TableHead>Nightly rate</TableHead>
            <TableHead>Nights booked</TableHead>
            <TableHead>Total income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => {
            const { id: propertyId, name, price, totalNightsSum, orderTotalSum } = rental;
            return <TableRow key={rental.id}>
              <TableCell><Link href={`/properties/${propertyId}`} className="underline text-muted-foreground">{name}</Link></TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell>{totalNightsSum}</TableCell>
              <TableCell>{orderTotalSum}</TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Link href={`/rentals/${propertyId}/edit`}>
                  <IconButton actionType="edit" />
                </Link>
                <DeleteRentalComponent propertyId={propertyId} />
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const DeleteRentalComponent = ({ propertyId }: { propertyId: string }) => {
  const deleteRental = deleteRentalAction.bind(null, { propertyId });
  return <FormContainer action={deleteRental}>
    <IconButton actionType="delete" />
  </FormContainer>
}