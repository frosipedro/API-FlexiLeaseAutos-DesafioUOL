import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Invalid CPF format'),
  birth: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  cep: z.string().length(8, 'CEP must be 8 digits'),
  qualified: z.string().min(1, 'Qualification is required'),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Invalid CPF format')
    .optional(),
  birth: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid date')
    .optional(),
  email: z.string().email('Invalid email').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
  cep: z.string().length(8, 'CEP must be 8 digits').optional(),
  qualified: z.string().optional(),
});
