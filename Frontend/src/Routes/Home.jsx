import * as React from 'react';
import { useState, useEffect } from 'react';
import { useContextGlobal } from "../Context/global.context";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser"
import InputSearch from "../Components/ui/Buttons/InputSearch";
import Category from "../Components/Category";
import Card from "../Components/Card";
import Pagination from '@mui/material/Pagination';
import styles from "../styles/home.module.css"

const Home = () => {
    const { state } = useContextGlobal();
    const [page, setPage] = useState(1);
    const [totalCounts, setTotalCounts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [listProducts, setListProducts] = useState(null);

    //Categorias
    // Función para calcular el recuento total
    const calculateTotalCounts = () => {
        let totalCount = 0;
        selectedCategories.forEach(category => {
            totalCount += state.data.filter(product => product.categoria === category.titulo).length;
        });
        setTotalCounts(totalCount);
    };

    // Efecto para calcular el recuento total cuando cambia la selección de categorías o los productos
    useEffect(() => {
        calculateTotalCounts();
    }, [selectedCategories, state.data]);

    const handleCategorySelect = (category) => {
        const index = selectedCategories.findIndex((cat) => cat.titulo === category.titulo);
        if (index === -1) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat.titulo !== category.titulo));
        }
        setPage(1);
    };

    //Paginacion
    const selectedCategoryTitles = selectedCategories.map((cat) => cat.titulo);
    const filteredProducts = selectedCategoryTitles.length > 0 ?
        state.data.filter(product => selectedCategoryTitles.includes(product.categoria)) :
        state.data;

    const totalResultsForCategories = selectedCategoryTitles.length > 0 ?
        filteredProducts.length :
        null;

    const totalResults = state.data.length;
    const totalResultsAletorios = state.dataAleatoria.length;

    const pageSize = 10;
    const pagInicio = (page - 1) * pageSize;
    const pagFinal = pagInicio + pageSize;


    const totalPages = Math.ceil(
        (selectedCategoryTitles.length > 0
            ? totalResultsForCategories + totalResultsAletorios
            : totalResultsAletorios) / pageSize
    );

    const paginationChange = (event, newPage) => {
        setPage(newPage);
    };

    //Favoritos
    const id = localStorage.getItem("id");
    const { user } = id ? useFetchGetIdUser("http://localhost:8080/usuario/" + id) : { user: undefined };

    const aleatorioProducts = state.dataAleatoria;

    useEffect(() => {
        if (user == undefined) {
            setListProducts(aleatorioProducts);
        }

        if (user && user.favoriteList != null) {
            const updatedAleatorioProducts = aleatorioProducts.map(element => {
                const updatedElement = { ...element };
                const isFavorite = user.favoriteList.includes(element.id);
                updatedElement['fav'] = isFavorite;
                console.log("updatedElement" + updatedElement)
                console.log("isFavorite" + isFavorite)
                return updatedElement;
            });
            setListProducts(updatedAleatorioProducts);
        }
    }, [user, aleatorioProducts]);

    const handleFavChange = (productId, newFavValue) => {
        const updatedList = listProducts.map(product => {
            if (product.id === productId) {
                return { ...product, fav: newFavValue };
            }
            return product;
        });
        setListProducts(updatedList);
    };

    return (
        <div className={styles.divMain}>
            <div className={styles.main__searchButton}>
                <h2 className="text-3xl font-light text-white text-center lg:text-4xl">Busca ofertas en hoteles, casas y mucho más</h2>
                <InputSearch options={state.data} />
            </div>
            <main className={styles.main}>
                <Category handleCategorySelect={handleCategorySelect} selectedCategories={selectedCategories} />
                <article>
                    {selectedCategories && selectedCategories.length > 0 ? (
                        <p className="text-sm font-extralight text-gray-700 sm:text-base text-right">
                            {totalCounts} productos encontrados
                        </p>
                    ) : null}
                    {selectedCategories && selectedCategories.length > 0 ? (
                        <div className="flex justify-end mt-4">
                            <button
                                className="text-sm hover:underline"
                                onClick={() => setSelectedCategories([])}
                            >
                                Quitar Filtros
                            </button>
                        </div>
                    ) : null}

                    {selectedCategories && selectedCategories.map(category => (
                        <div key={category.id} className='pb-10'>
                            <div className='pb-4 flex flex-col'>
                                <h3 className="text-xl font-normal text-black lg:text-2xl capitalize">{category.titulo}</h3>
                                <p className="text-sm font-extralight text-gray-700 sm:text-base">
                                    {filteredProducts.filter(product => product.categoria === category.titulo).length} de {totalResults} coincidencias con {category.titulo}
                                </p>
                            </div>
                            <section className={styles.main__sectionCard}>
                                {filteredProducts.filter(product => product.categoria === category.titulo)
                                    .slice(pagInicio, pagFinal)
                                    .map((product) => (
                                        <Card
                                            key={product.id}
                                            id={product.id}
                                            nombre={product.nombre}
                                            destino={product.destino}
                                            salidaDate={product.salidaDate}
                                            vueltaDate={product.vueltaDate}
                                            precio={product.precio}
                                            urlImagenes={product.urlImagenes}
                                            fav={product.fav}
                                            onFavChange={handleFavChange}
                                        />
                                    ))}
                            </section>
                        </div>
                    ))}
                    <div className='pb-4 flex flex-col'>
                        <h3 className="text-xl font-normal text-black lg:text-2xl capitalize">Recomendaciones</h3>
                        <p className="text-sm font-extralight text-gray-700 sm:text-base">{totalResultsAletorios} resultados</p>
                    </div>
                    <section className={styles.main__sectionCard}>
                        {listProducts && listProducts.slice(pagInicio, pagFinal).map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                nombre={product.nombre}
                                destino={product.destino}
                                salidaDate={product.salidaDate}
                                vueltaDate={product.vueltaDate}
                                precio={product.precio}
                                urlImagenes={product.urlImagenes}
                                fav={product.fav}
                                onFavChange={handleFavChange}
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
