import * as z from 'zod';
import { ZodSchema } from 'zod';

export const ProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters long"
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters long"
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long"
  }),
})

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  console.log(result.error);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(', '));
  }
  return result.data;
}


const validateFile = () => {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/jpeg', 'image/png'];
  
  return z.instanceof(File).refine((file) => {
    return !file || file.size <= maxUploadSize;
  }, 'File size must be less than 1MB').refine((file) => {
    return !file || acceptedFileTypes.some((type) => file.type.startsWith(type));
  }, "File must be an image")
}

export const imageSchema = z.object({
  image: validateFile()
});

export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  tagline: z
    .string()
    .min(2, {
      message: 'tagline must be at least 2 characters.',
    })
    .max(100, {
      message: 'tagline must be less than 100 characters.',
    }),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: 'guest amount must be a positive number.',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: 'bedrooms amount must be a positive number.',
  }),
  beds: z.coerce.number().int().min(0, {
    message: 'beds amount must be a positive number.',
  }),
  baths: z.coerce.number().int().min(0, {
    message: 'bahts amount must be a positive number.',
  }),
  amenities: z.string(),
});

export const createReviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000)
})