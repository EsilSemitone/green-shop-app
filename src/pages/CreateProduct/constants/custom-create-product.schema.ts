import { TypeOf, z } from 'zod';

export const CustomCreateProductSchema = z.object({
    name: z.string().min(1, 'Имя должно состоять  бы из одного символа'),
    short_description: z.string().min(1, 'Короткое описание должно состоять хотя бы из одного символа'),
    description: z.string().min(1, 'Описание должно состоять хотя бы из одного символа'),
});
export type CustomCreateProduct = TypeOf<typeof CustomCreateProductSchema>;
