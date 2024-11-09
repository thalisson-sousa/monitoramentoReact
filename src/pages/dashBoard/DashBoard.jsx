import styles from './DashBoard.module.css';
import Card from "../../components/Card/Card";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLinks } from '../../context/LinksContext';

export default function DashBoard() {
    const { setLink } = useLinks();
    const [links, setLinks] = useState([]);
    const url = "http://localhost:3000/firewall";

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        const data = axios.get(url).then(function (response) {
            setLinks(response.data);
            setLink(response.data);
        } );
    }

    return (
        <section>
            <h1 className={styles.title}>Monitoramento</h1>
            <div className={styles.container}>
                {
                    links.map((data) => (
                        <Card key={data.id} data={data} nav={true} />
                    ))
                }
            </div>
        </section>
);
}