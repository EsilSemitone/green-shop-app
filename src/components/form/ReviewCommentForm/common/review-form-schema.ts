import { z } from 'zod';

export const ReviewCommentFormSchema = z.object({
    content: z.string().min(1),
});
