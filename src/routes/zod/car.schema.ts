import { z } from 'zod';

export const createCarSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  color: z.string().min(1, 'Color is required'),
  year: z.number().int().min(1950, 'Invalid year').max(2023, 'Invalid year'),
  value_per_day: z.number().positive('Value per day must be positive'),
  accessories: z.array(
    z.object({
      description: z.string().min(1, 'Accessory description is required'),
    }),
  ),
  number_of_passengers: z
    .number()
    .int()
    .positive('Number of passengers must be positive'),
});

export const updateCarSchema = z.object({
  model: z.string().optional(),
  color: z.string().optional(),
  year: z
    .number()
    .int()
    .min(1950, 'Invalid year')
    .max(2023, 'Invalid year')
    .optional(),
  value_per_day: z
    .number()
    .positive('Value per day must be positive')
    .optional(),
  accessories: z
    .array(
      z.object({
        description: z.string().min(1, 'Accessory description is required'),
      }),
    )
    .optional(),
  number_of_passengers: z
    .number()
    .int()
    .positive('Number of passengers must be positive')
    .optional(),
});
