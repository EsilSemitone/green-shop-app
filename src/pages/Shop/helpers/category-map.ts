import { PRODUCT_CATEGORY } from "contracts/enums/product-category.ts";

export const categoryMap = new Map<string, PRODUCT_CATEGORY>([
    ["House Plants", PRODUCT_CATEGORY.HOUSE_PLANTS],
    ["Potter Plants", PRODUCT_CATEGORY.POTTER_PLANTS],
    ["Seeds", PRODUCT_CATEGORY.SEEDS],
    ["Small Plants", PRODUCT_CATEGORY.SMALL_PLANTS],
    ["Big Plants", PRODUCT_CATEGORY.BIG_PLANTS],
    ["Succulents", PRODUCT_CATEGORY.SUCCULENTS],
    ["Trerrariums", PRODUCT_CATEGORY.TRERRARIUMS],
    ["Gardening", PRODUCT_CATEGORY.GARDENING],
    ["Accessories", PRODUCT_CATEGORY.ACCESSORIES],
])
