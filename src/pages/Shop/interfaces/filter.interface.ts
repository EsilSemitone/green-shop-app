import { PRODUCT_CATEGORY } from "contracts"
import { SIZE } from "contracts/enums/size.ts"


export interface IFilter {
    category?: PRODUCT_CATEGORY
    price?: {
        min: number,
        max: number
    },
    size?: SIZE

}