import { z, ZodSchema } from "zod";

export const addUserSchema: ZodSchema<{
  email: string;
  name: string;
}> = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(100),
});
