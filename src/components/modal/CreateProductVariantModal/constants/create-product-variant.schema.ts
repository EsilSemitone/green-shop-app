import { SIZE } from 'contracts-green-shop';
import { TypeOf, z } from 'zod';

export const CreateProductVariantRequestCustomSchema = z.object({
    price: z.coerce.number(),
    size: z.nativeEnum(SIZE),
    stock: z.coerce.number(),
    tags: z.string().array().optional(),
});

export type CreateProductVariantRequestCustom = TypeOf<typeof CreateProductVariantRequestCustomSchema>