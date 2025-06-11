import { ROLES } from 'contracts-green-shop/enums/roles.ts';

export interface IUserProfile {
    uuid: string;
    name: string;
    email: string;
    role: ROLES;
    phone_number: string | null;
    photo_image: string | null;
    created_at: Date;
    updated_at: Date;
}
