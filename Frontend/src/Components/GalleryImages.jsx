import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from "react-router-dom";
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import styles from "../styles/galleryImages.module.css";

export default function GalleryImages() {
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleThumbnailClick = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const handlePrevClick = () => {
        const prevIndex =
            (currentIndex - 1 + data?.urlImagenes.length) % data?.urlImagenes.length;
        setSelectedImage(`data:image;base64,${data?.urlImagenes[prevIndex]}`);
        setCurrentIndex(prevIndex);
    };

    const handleNextClick = () => {
        const nextIndex = (currentIndex + 1) % data?.urlImagenes.length;
        setSelectedImage(`data:image;base64,${data?.urlImagenes[nextIndex]}`);
        setCurrentIndex(nextIndex);
    };

    const isSmallScreen = useMediaQuery('(max-width:1023px)');

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100%",
        width: isSmallScreen ? '95%' : '70%',
        bgcolor: "transparent",
        border: "none",
    };

    return (
        <div>
            <Button onClick={handleOpen} className={styles.details__buttons_gallery}>
                <p className={styles.details__buttons_atras_gallery}>Ver más</p>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="grid gap-4">
                        <div>
                            <div className="flex flex-row gap-1.5 lg:gap-6 items-center justify-center mt-4">
                                <button
                                    onClick={handlePrevClick}
                                    className="bg-white items-center h-7 rounded-md hidden lg:flex"
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M15 6l-6 6l6 6" />
                                    </svg>
                                </button>
                                <img
                                    className="h-auto w-full lg:w-11/12 rounded-2xl"
                                    src={selectedImage || "data:image;base64," + data?.urlImagenes[0]}
                                    alt=""
                                />
                                <button
                                    onClick={handleNextClick}
                                    className="bg-white items-center h-7 rounded-md hidden lg:flex"
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M9 6l6 6l-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={styles.carouselItem__gallery}>
                            {data?.urlImagenes.map((imagenes, index) => (
                                <div
                                    className="contents"
                                    key={index}
                                    onClick={() =>
                                        handleThumbnailClick(`data:image;base64,${imagenes}`, index)
                                    }
                                >
                                    <img
                                        className="h-16 lg:h-28 max-w-full rounded-lg cursor-pointer hover:scale-95"
                                        src={`data:image;base64,${imagenes}`}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
