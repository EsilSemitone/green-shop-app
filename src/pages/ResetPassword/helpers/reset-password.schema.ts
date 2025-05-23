import { z } from 'zod';

export const ResetPasswordSchema = z
    .object({
        password: z.string().min(8, 'Пароль должен быть минимум из 8 символов'),
        confirm_password: z.string().min(8, 'Пароль должен быть минимум из 8 символов'),
    })
    .refine(
        (data) => {
            return data.confirm_password === data.password;
        },
        { message: 'Пароли должны совпадать', path: ['confirm_password'] },
    );

export type ResetPasswordForm = z.TypeOf<typeof ResetPasswordSchema>;
