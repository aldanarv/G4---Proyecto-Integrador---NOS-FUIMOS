import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
        if (user && user.favoriteList != null) {
            const filteredFav = dataProducts.filter(element => {
                if (user.favoriteList.includes(element.id)) {
                    element['fav'] = true;
                    return true;
                } else {
                    return false;
                }
            });
            setListProducts(filteredFav);
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
        window.location.reload();
    };

    console.log(listProducts)

    return (
        <div>
            {listProducts?.length > 0 ?
                <main className={styles.main}>
                    <article>
                        <div className='pb-4'>
                            <h3 className="font-normal text-2xl sm:text-4xl text-[#C15205] capitalize">Mis favoritos</h3>
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
                </main> :
                <main className={styles.mainDos}>
                    <article className='h-full'>
                        <div className='pb-4'>
                            <h3 className="font-normal text-2xl sm:text-4xl text-[#C15205] capitalize">Mis favoritos</h3>
                        </div>
                        <div className='flex flex-col items-center justify-center h-full text-center'>
                            <h3 className="font-normal text-black text-2xl capitalize mb-4">No tienes favoritos aún</h3>
                            <p className="text-lg font-light text-black mb-14">0 viajes guardados</p>
                            <div className='flex flex-col sm:flex-row items-center gap-2 mb-10'>
                                <div className="flex items-center justify-center w-6 h-6  bg-[#000000] rounded-full shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                                </div>
                                <p className="text-xl font-light text-black">Guarda tus favoritos aquí y obten resultados de busqueda más especificos.</p>
                            </div>
                            <div className='flex flex-col sm:flex-row items-center gap-2'>
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layers-subtract"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2" /></svg>
                                <p className="text-xl font-light text-black">Compara tus favoritos  para elegir el viaje perfecto.</p>
                            </div>
                            <Link to={"/"} className="bg-[#005B8D] text-white mt-6 py-2.5 px-8 rounded-md">
                                Buscar viajes
                            </Link>
                        </div>
                    </article>
                </main>
            }
        </div>
    );
};

export default ListFavoritos;
