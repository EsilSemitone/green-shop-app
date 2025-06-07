import { z } from 'zod';

export const ReviewFormSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});
