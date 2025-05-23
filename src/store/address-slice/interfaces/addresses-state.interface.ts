import { IAddress } from '../../../common/interfaces/address.interface';

export interface IAddressState {
    addresses: IAddress[];
    errorMessage: null | string;
}
