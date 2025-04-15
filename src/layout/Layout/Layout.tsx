import { Outlet } from 'react-router';
import styles from './Layout.module.css';
import cn from 'classnames';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export function Layout() {

    return (
        <div className={cn(styles['layout'])}>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}
