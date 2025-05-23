export interface ICartItem {
    uuid: string;
    product_variant_id: string;
    quantity: number;
}
export type ICartItems = ICartItem[];
