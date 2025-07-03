import { GetStatsUsersRequestParamsDto, GetStatsUsersResponseDto } from 'contracts-green-shop';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';

type Stats = GetStatsUsersResponseDto['stats'] | { date: string; count: number }[];

export const useUsersStats = (initQuery?: GetStatsUsersRequestParamsDto) => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [query, setQuery] = useState<GetStatsUsersRequestParamsDto | null>(initQuery || null);

    useEffect(() => {
        if (!query || Object.keys(query).length === 0) {
            return;
        }
        const provideUsersStats = async () => {
            setIsLoad(true);
            const stats = await ApiService.getUsersStats(query);
            setStats(
                stats.stats.map((s) => {
                    return {
                        ...s,
                        date: new Date(s.date).toLocaleDateString(),
                    };
                }),
            );
            setTotal(stats.total);
            setIsLoad(false);
        };
        provideUsersStats();
    }, [query]);

    return { stats, isLoad, setQuery, total };
};
