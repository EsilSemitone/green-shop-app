import { OrderItem } from 'contracts-green-shop';

export function getTotal(items: OrderItem[], shipping_price: number): string {
    const itemsTotal = items
        .reduce((acc, i) => {
            return acc + Number(i.price) * i.quantity;
        }, 0)
        .toFixed(2);
    return (Number(shipping_price) + Number(itemsTotal)).toFixed(2)
}
