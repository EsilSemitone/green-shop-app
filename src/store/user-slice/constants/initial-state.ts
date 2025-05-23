import { getItem } from '../../localstorage/localstorage';
import { LOCALSTORAGE_KEYS } from '../../localstorage/localstorage-keys';
import { UserState } from '../interfaces/user-state.interface';

export const INITIAL_STATE: UserState = {
    jwt: getItem(LOCALSTORAGE_KEYS.JWT),
    errorMessage: null,
    profile: null,
};
