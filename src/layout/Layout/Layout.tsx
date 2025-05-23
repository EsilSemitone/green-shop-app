import { Outlet } from 'react-router';
import styles from './Layout.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export function Layout() {
    return (
        <div className={styles.layout}>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
}
