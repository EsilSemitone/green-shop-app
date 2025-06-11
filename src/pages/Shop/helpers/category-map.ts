import { PRODUCT_CATEGORY, PRODUCT_CATEGORY_ENUM } from 'contracts-green-shop/enums/product-category.ts';

export const categoryMap = new Map<string, PRODUCT_CATEGORY>([
    ['Домашние растения', PRODUCT_CATEGORY_ENUM.HOUSE_PLANTS],
    ['Поттер Растения', PRODUCT_CATEGORY_ENUM.POTTER_PLANTS],
    ['Семена', PRODUCT_CATEGORY_ENUM.SEEDS],
    ['Небольшие растения', PRODUCT_CATEGORY_ENUM.SMALL_PLANTS],
    ['Большие растения', PRODUCT_CATEGORY_ENUM.BIG_PLANTS],
    ['Суккуленты', PRODUCT_CATEGORY_ENUM.SUCCULENTS],
    ['Террариумы', PRODUCT_CATEGORY_ENUM.TRERRARIUMS],
    ['Садоводство', PRODUCT_CATEGORY_ENUM.GARDENING],
    ['Аксессуары', PRODUCT_CATEGORY_ENUM.ACCESSORIES],
]);

export const categoryInvertMap = new Map<PRODUCT_CATEGORY | undefined, string>([
    [PRODUCT_CATEGORY_ENUM.HOUSE_PLANTS, 'Домашние растения'],
    [PRODUCT_CATEGORY_ENUM.POTTER_PLANTS, 'Поттер Растения'],
    [PRODUCT_CATEGORY_ENUM.SMALL_PLANTS, 'Небольшие растения'],
    [PRODUCT_CATEGORY_ENUM.BIG_PLANTS, 'Большие растения'],
    [PRODUCT_CATEGORY_ENUM.SUCCULENTS, 'Суккуленты'],
    [PRODUCT_CATEGORY_ENUM.TRERRARIUMS, 'Террариумы'],
    [PRODUCT_CATEGORY_ENUM.GARDENING, 'Садоводство'],
    [PRODUCT_CATEGORY_ENUM.ACCESSORIES, 'Аксессуары'],
]);
