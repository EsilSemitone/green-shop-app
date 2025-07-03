import { STATS_RANGE } from 'contracts-green-shop';

export function isStatsRange(value: string): value is STATS_RANGE {
    const statsRangeArr = [STATS_RANGE.DAY, STATS_RANGE.MONTH, STATS_RANGE.WEEK];
    return statsRangeArr.includes(value as STATS_RANGE);
}
