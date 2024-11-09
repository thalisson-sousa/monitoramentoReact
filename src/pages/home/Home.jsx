import { useState } from "react";
import Sidebar from "../../components/sideBar/SideBar";
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

import styles from './Home.module.css';

export default function Home() {
    const [sidebar, setSidebar] = useState(false);

    const showSiderbar = () => setSidebar(!sidebar);

    return (
        <section className={styles.container}>
            <div>
                <FaBars onClick={showSiderbar} />
                {sidebar && <Sidebar active={setSidebar} />}
            </div>
            <div className={styles.renderPage}>
                <Outlet />
            </div>
        </section>
    );
}