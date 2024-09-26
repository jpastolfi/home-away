import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
}

const calculateTotals = ({checkIn, checkOut, price}: BookingDetails) => {
  const totalNights = calculateDaysBetween({checkIn, checkOut});
  const subTotal = totalNights * price;
  const cleaningFee = subTotal * 0.05;
  const tax = subTotal * 0.08;
  const orderTotal = subTotal + cleaningFee + tax;
  return {
    totalNights,
    subTotal,
    cleaningFee, 
    tax, 
    orderTotal
  }
}

export default calculateTotals;