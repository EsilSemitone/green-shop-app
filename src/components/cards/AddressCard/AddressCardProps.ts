import { HtmlHTMLAttributes } from 'react';
import { IAddress } from '../../../common/interfaces/address.interface';

export interface IAddressCartProps extends HtmlHTMLAttributes<HTMLElement> {
    address: IAddress;
}
