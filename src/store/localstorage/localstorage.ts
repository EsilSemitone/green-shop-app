export const saveItem = (key: string, item: string | null) => {
    const parse_item = item ? item : '';
    localStorage.setItem(key, parse_item);
};

export const getItem = (key: string): string | null => {
    const item = localStorage.getItem(key);

    if (!item) {
        return null;
    }
    return item;
};

export const removeItem = (key: string): void => {
    localStorage.removeItem(key);
};
