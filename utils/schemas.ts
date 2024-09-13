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

export async function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown) {
  const result = await schema.safeParseAsync(data);
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