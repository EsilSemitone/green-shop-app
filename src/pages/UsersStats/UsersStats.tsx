import { GetStatsUsersRequestParamsDto, STATS_RANGE } from 'contracts-green-shop';
import { useQueryParams } from '../../common/hooks/use-query-params';
import { useUsersStats } from '../../common/hooks/use-users-stats';
import styles from './UsersStats.module.css';
import { useEffect } from 'react';
import { isStatsRange } from './utils/is-stats-range';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, Select, Spin } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export default function UsersStats() {
    const { searchParams, setParam, setManyParams, getAll, getParam } = useQueryParams();
    const { stats, isLoad, setQuery } = useUsersStats();
    const DEFAULT_DATE = {
        startDay: new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString().split('.').reverse().join('-'),
        endDay: new Date().toLocaleDateString().split('.').reverse().join('-'),
    };
    useEffect(() => {
        const queryParams = getAll();

        const currentQueryParams = {
            ...(queryParams['range'] && isStatsRange(queryParams['range'])
                ? { range: queryParams['range'] }
                : { range: STATS_RANGE.DAY }),
            ...(queryParams['startDay']
                ? { startDay: queryParams['startDay'] }
                : {
                      startDay: DEFAULT_DATE.startDay,
                  }),
            ...(queryParams['endDay'] ? { endDay: queryParams['endDay'] } : { endDay: DEFAULT_DATE.endDay }),
        };
        setManyParams(currentQueryParams);
    }, []);

    useEffect(() => {
        setQuery(getAll<GetStatsUsersRequestParamsDto>());
    }, [searchParams]);

    return (
        <div className={styles.page}>
            {stats && (
                <>
                    <h1>Регистрация пользователей</h1>
                    <div className={styles.options}>
                        <ConfigProvider locale={ruRU}>
                            <RangePicker
                                defaultValue={[dayjs(DEFAULT_DATE.startDay), dayjs(DEFAULT_DATE.endDay)]}
                                onChange={(_dates, dateString) => {
                                    if (dateString[0] !== '' && dateString[1] !== '') {
                                        setManyParams({
                                            startDay: dateString[0],
                                            endDay: dateString[1],
                                            range: getParam('range') || STATS_RANGE.DAY,
                                        });
                                    }
                                }}
                                placeholder={['Начало', 'Конец']}
                                lang="ru"
                            />
                        </ConfigProvider>
                        <Select
                            defaultValue={STATS_RANGE.DAY}
                            onChange={(value) => {
                                setParam('range', value);
                            }}
                            options={[
                                { value: STATS_RANGE.DAY, label: 'По дням' },
                                { value: STATS_RANGE.WEEK, label: 'По неделям' },
                                { value: STATS_RANGE.MONTH, label: 'По месяцам' },
                            ]}
                        />
                    </div>

                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart
                            className={styles.stats}
                            width={500}
                            height={400}
                            data={stats}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis dataKey="count" />
                            <Tooltip />
                            <Area type="monotone" dataKey="count" stroke="46a358" fill="#419752" />
                        </AreaChart>
                    </ResponsiveContainer>
                </>
            )}
            {isLoad && <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />}
        </div>
    );
}
