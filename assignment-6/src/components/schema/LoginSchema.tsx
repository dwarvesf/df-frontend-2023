import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is not valid.' }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, {
      message:
        'Password must be at least 8 characters and contain uppercase letters and symbols.',
    })
    .regex(/^(?=.*[A-Z]).*$/, {
      message: 'Password must contain at least 1 uppercase',
    })
    .regex(/^(?=.*[@#$%^&+!=]).*$/, {
      message: 'Password must contain at least 1 symbol',
    }),
})
export type LoginSchemaType = z.infer<typeof LoginSchema>
