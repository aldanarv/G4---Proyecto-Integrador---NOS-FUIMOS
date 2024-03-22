import * as React from 'react';
import { useState, useEffect } from 'react';
import { useContextGlobal } from "../Context/global.context";
import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser"
import Card from "../Components/Card";
import styles from "../styles/favoritos.module.css"

const ListFavoritos = () => {
    const { state } = useContextGlobal();
    const [listProducts, setListProducts] = useState(null);

    //Favoritos
    const id = localStorage.getItem("id");
    const { user } = id ? useFetchGetIdUser("http://localhost:8080/usuario/" + id) : { user: undefined };

    const dataProducts = state.data;

    useEffect(() => {
        if (user == undefined) {
            setListProducts(dataProducts);
        }

        if (user && user.favoriteList != null) {
            const updatedDataProducts = dataProducts.map(element => {
                const updatedElement = { ...element };
                const isFavorite = user.favoriteList.includes(element.id);
                updatedElement['fav'] = isFavorite;
                console.log("updatedElement" + updatedElement)
                console.log("isFavorite" + isFavorite)
                return updatedElement;
            });
            setListProducts(updatedDataProducts);
        }
    }, [user, dataProducts]);

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
            <main className={styles.main}>
                <article>
                    <div className='pb-4 flex flex-col'>
                        <h3 className="text-xl font-normal text-black lg:text-2xl capitalize">Mis favoritos</h3>
                    </div>
                    <section className={styles.main__sectionCard}>
                        {listProducts && listProducts.map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                nombre={product.nombre}
                                destino={product.destino}
                                descripcion={product.descripcion}
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
            </main>
        </div>
    );
};

export default ListFavoritos;
