'use server'

import { imageSchema, ProfileSchema, propertySchema, validateWithZodSchema } from "./schemas"
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from "./supabase";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this route.");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
}

const renderError = (error: unknown): {message: string} => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred."
  }
}

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
    return renderError(error);
  }
  redirect("/");
}

export const fetchProfileImage = async () => {
   const user = await currentUser();
   if (!user) return null;
   const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id
    },
    select: {
      profileImage: true
    },
   });

   return profile?.profileImage;
  }

export const fetchProfile = async() => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id
    }
  })
  if (!profile) redirect("/profile/create");
  return profile;
}

export const updateProfileAction = async (prevState: any, formData: FormData): Promise<{message: string}> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(ProfileSchema, rawData);
    
    await db.profile.update({
      where: {
        clerkId: user.id
      },
      data: validatedFields
    })
    revalidatePath("/profile");
    return { message: "Profile updated successfully"};
  } catch (error) {
    return renderError(error);
  }
}

export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = await validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);
    await db.profile.update({
      where: {
        clerkId: (await user).id
      }, 
      data: {
        profileImage: fullPath
      }
    })
    revalidatePath('/profile')
    return {
      message: "Profile image updated successfully."
    }
  } catch (error) {
    return renderError(error);
  }
}

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;
    const validatedFile = validateWithZodSchema(imageSchema, {image: file});
    const fullPath = await uploadImage(validatedFile.image);
    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    
    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id
      }
    })
    /* return {
      message: "Property created"
    }  */
  } catch (error) {
    return renderError(error);
  }
  redirect("/")
}

export const fetchProperties = async ({search = '', category}: {search?: string, category?: string}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        {name: {contains: search, mode: 'insensitive'}},
        {tagline: {contains: search, mode: 'insensitive'}}
      ]
    },
    select: {
      image: true,
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return properties;
}

export const fetchFavoriteId = async ({propertyId}:{propertyId: string}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id
    },
    select: {
      id: true,
    }
  })
  return favorite?.id || null;
}

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const {propertyId, favoriteId, pathname} = prevState;
  /* console.log("propertyId", propertyId)
  console.log("favoriteId", favoriteId)
  console.log("pathname", pathname); */
  return { message: 'Toggle favorite'}
}