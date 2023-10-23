import z from 'zod'
import { topicsBook } from '../constant/topic'

export const BookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, { message: 'Name must be at least 5 characters.' }),
  author: z
    .string()
    .trim()
    .min(1, 'Author is required')
    .regex(/^[a-zA-Z\s]*$/, {
      message: 'Author must contain only letters and spaces',
    }),
  topic: z.enum(topicsBook as [string, ...string[]]),
})

export type BookSchemaType = z.infer<typeof BookSchema>
