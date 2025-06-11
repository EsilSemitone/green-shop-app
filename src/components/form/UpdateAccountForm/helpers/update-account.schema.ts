import { UpdateUserRequestSchema } from 'contracts-green-shop/user/update-user.ts';
import { z } from 'zod';

export const UpdateAccountSchema = UpdateUserRequestSchema.omit({
    password: true,
})
    .extend({
        password: z
            .string()
            .transform((val) => (val === '' ? undefined : val))
            .refine((val) => !val || val.length >= 8, {
                message: 'Пароль должен содержать минимум 8 символов',
            })
            .optional(),
        confirm_password: z
            .string()
            .transform((val) => (val === '' ? undefined : val))
            .refine((val) => !val || val.length >= 8, {
                message: 'Пароль должен содержать минимум 8 символов',
            })
            .optional(),
    })
    .refine(
        (data) => {
            if (data.password || data.confirm_password) {
                return data.password === data.confirm_password;
            }
            return true;
        },
        { message: 'Пароли должны совпадать!', path: ['confirm_password'] },
    );

// export const UpdateAccountSchema = UpdateUserRequestSchema.extend({
//     confirm_password: z.string().min(8, 'Пароль должен содержать минимум 8 символов').optional(),
// }).refine(
//     (data) => {
//         if (data.password || data.confirm_password) {
//             return data.password === data.confirm_password;
//         }
//         return true;
//     },
//     { message: 'Пароли должны совпадать!', path: ['confirm_password'] },
// );
