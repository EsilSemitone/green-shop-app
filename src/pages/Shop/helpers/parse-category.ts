export function parseCategoryName(category: string): string {
    const regEx = /[^()]*/
    const res =  category.match(regEx)
    return res ? res[0] : ""
}