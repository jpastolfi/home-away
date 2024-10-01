import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import db from '@/utils/db';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata?.bookingId;
    if (session.status !== 'complete' || !bookingId) {
      throw new Error("Something went wrong, please try again");
    }
    await db.booking.update({
      where: {
        id: bookingId
      },
      data: {
        paymentStatus: true
      },
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error"
    })
  }
  redirect('/bookings');
}