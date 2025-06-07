import { getItem } from '../../localstorage/localstorage';
import { LOCALSTORAGE_KEYS } from '../../localstorage/localstorage-keys';
import { UserState } from '../interfaces/user-state.interface';

export const INITIAL_STATE: UserState = {
    jwt: getItem(LOCALSTORAGE_KEYS.JWT),
    errorMessage: null,
    profile: (() => {
        const res = getItem(LOCALSTORAGE_KEYS.PROFILE)
        if (!res) {
            return null
        }
        return JSON.parse(res)
    })()
};
