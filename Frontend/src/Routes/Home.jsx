import * as React from 'react';
import { useState } from 'react';
import { useContextGlobal } from "../Context/global.context";
import InputSearch from "../Components/ui/Buttons/InputSearch";
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

    return (
        <div className={styles.divMain}>
            <div className={styles.main__searchButton}>
                <h2 className="text-3xl font-light text-white text-center lg:text-4xl">Busca ofertas en hoteles, casas y mucho más</h2>
                
                <InputSearch options={state.data} />
            </div>
            <main className={styles.main}>
                <Category />
                <article>
                    <h3 className="text-lg font-light text-black lg:text-xl pb-4">Recomendaciones</h3>
                    <section className={styles.main__sectionCard}>
                        {state.dataAleatoria.slice(pagInicio, pagFinal).map((product) => (
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
