import { Tag } from 'contracts-green-shop';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';

export const useTags = () => {
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [tags, setTags] = useState<Tag[] | null>(null);

    useEffect(() => {
        const provideTags = async () => {
            try {
                setIsLoad(true);
                const res = await ApiService.getAllTags();
                setTags(res.tags);
                setIsLoad(false);
            } catch {
                setIsLoad(false);
            }
        };

        provideTags();
    }, []);

    return { tags, setTags, isLoad };
};
