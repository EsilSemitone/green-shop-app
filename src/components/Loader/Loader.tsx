import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ILoaderProps } from './Loader.props';

export function Loader({ style }: ILoaderProps) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green', ...style }} spin />} />;
}
