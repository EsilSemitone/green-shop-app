import { useSearchParams } from 'react-router';

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getParam = <T extends string>(key: string): T | null => searchParams.get(key) as T | null;
    const getParams = (keys: string[]): (string | null)[] => {
        const res: (string | null)[] = [];

        keys.forEach((k) => {
            res.push(searchParams.get(k));
        });

        return res;
    };

    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);
        setSearchParams(params);
    };

    const deleteParam = (key: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        setSearchParams(params);
    };

    const setManyParams = (updates: Record<string, string>) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams();
            Object.entries(updates).forEach(([key, value]) => {
                params.set(key, value);
            });
            return params;
        });
    };

    const resetAll = () => {
        setSearchParams(new URLSearchParams());
    };

    const getAll = () => {
        const result: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    };

    return {
        getParam,
        setParam,
        deleteParam,
        setManyParams,
        resetAll,
        getAll,
        getParams,
    };
};
