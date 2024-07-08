import { z } from 'zod';

export const createReserveSchema = z.object({
  id_user: z.string().min(1, 'User ID is required'),
  start_date: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid start date'),
  end_date: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid end date'),
  id_car: z.string().min(1, 'Car ID is required'),
  final_value: z.number().positive('Final value must be positive'),
});

export const updateReserveSchema = z.object({
  id_user: z.string().optional(),
  start_date: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid start date')
    .optional(),
  end_date: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid end date')
    .optional(),
  id_car: z.string().optional(),
  final_value: z.number().positive('Final value must be positive').optional(),
});
