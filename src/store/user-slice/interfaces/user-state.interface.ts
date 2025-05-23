import { IUserProfile } from './user-prodile.interface';

export interface UserState {
    jwt: string | null;
    errorMessage: string | null;
    profile: IUserProfile | null;
}
