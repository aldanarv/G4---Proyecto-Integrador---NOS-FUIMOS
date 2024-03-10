import * as React from 'react';
import { useState } from 'react';
import { useContextGlobal } from "../Context/global.context";
import SearchButton from "../Components/ui/Buttons/SearchButton";
import Category from "../Components/Category";
import Card from "../Components/Card";
import Pagination from '@mui/material/Pagination';
import styles from "../styles/home.module.css"

const Home = () => {
    const { state } = useContextGlobal();
    const [page, setPage] = useState(1);

    const pageSize = 10;
    const pagInicio = (page - 1) * pageSize;
    const pagFinal = pagInicio + pageSize;
    const totalPages = Math.ceil(state.data.length / pageSize);

    const paginationChange = (event, newPage) => {
        setPage(newPage);
    };

    //algoritmo de Fisher-Yates para barajar aleatoriamente un array
    const aleatorio = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const aleatorioProducts = aleatorio(state.data);

    return (
        <div className={styles.divMain}>
            <div className={styles.main__searchButton}>
                <SearchButton />
                <Category />
            </div>
            <main className={styles.main}>
                <article>
                    <section className={styles.main__sectionCard}>
                        {aleatorioProducts.slice(pagInicio, pagFinal).map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                nombre={product.nombre}
                                destino={product.destino}
                                salidaDate={product.salidaDate}
                                vueltaDate={product.vueltaDate}
                                precio={product.precio}
                                urlImagenes={product.urlImagenes}
                            />
                        ))}
                    </section>
                </article>
                <Pagination page={page} onChange={paginationChange} count={totalPages} variant="outlined" shape="rounded" />
            </main>

        </div>
    );
};

export default Home;
