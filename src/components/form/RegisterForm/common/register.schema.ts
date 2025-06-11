import { RegisterSchemaRequest } from 'contracts-green-shop/auth/register.schema.ts';
import { z } from 'zod';

export const RegisterSchema = RegisterSchemaRequest.extend({
    confirm_password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
}).refine(
    (data) => {
        return data.password === data.confirm_password;
    },
    { message: 'Пароли должны совпадать!', path: ['confirm_password'] },
);
