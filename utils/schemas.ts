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
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(', '));
  }
  return result.data;
}