'use server'

import { ProfileSchema } from "./schemas"
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile")
    const rawData = Object.fromEntries(formData);
    const validatedFields = ProfileSchema.parse(rawData);
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields
      }
    })
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      }
    })
  } catch (error) {
    console.log(error);
    
    return {
      message: error instanceof Error ? error.message : "An error occurred."
    }
  }
  redirect("/");
}



