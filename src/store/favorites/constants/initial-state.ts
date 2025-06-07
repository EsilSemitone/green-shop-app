import { getFavorites } from '../helpers/get-favorites';
import { IFavoritesState } from '../interfaces/favorites-state.interface';

export const INITIAL_STATE: IFavoritesState = {
    favorites: getFavorites(),
};
