import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Link, useParams } from 'react-router-dom';
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import useMediaQuery from '@mui/material/useMediaQuery';
import Alert from './ui/Buttons/Alert';


const styleButton = {
    color: 'black',
    '&:hover': {
        backgroundColor: 'transparent',
    },
};

export default function CompartirRedes() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id } = useParams();
    const { data } = useFetchGetID("http://localhost:8080/admin/productos/" + id);
    const isSmallScreen = useMediaQuery('(max-width:768px)');
    const [copied, setCopied] = React.useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '1rem',
        boxShadow: 24,
        maxWidth: "100%",
        width: isSmallScreen ? 'max-content' : 'initial',
        p: isSmallScreen ? 2 : 4,
        bgcolor: 'background.paper',

    };

    const handleShareButtonClick = () => {
        const productURL = `http://nosfuimosbuckets3.s3-website-us-east-1.amazonaws.com/admin/productos/${id}`;
        navigator.clipboard.writeText(productURL)
            .then(() => {
                setCopied(true); // Cambiar el estado a true cuando se copie el enlace
                setTimeout(() => setCopied(false), 7000); // Cambiar el estado a false después de 7 segundos
            })
            .catch((error) => console.error('Error al copiar el enlace:', error));
    };

    return (
        <div>
            <Button sx={styleButton} onClick={handleOpen}>
                <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
                    <p className="text-sm hover:underline capitalize font-light text-black">Compartir</p>

                </div>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="max-w-sm bg-white rounded-lg shadow-md pb-4 m-auto">
                        <a href="#">
                            <img
                                src={"data:image;base64," + data?.urlImagenes[0]}
                                alt=""
                                loading="lazy"
                                className="rounded-t-lg w-full"
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{data?.nombre}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 ">{data?.descripcion}</p>

                            <Link onClick={handleClose} to={"/product/" + id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ED9707] rounded-lg hover:bg-white hover:text-[#ED9707] hover:border hover:border-[#ED9707] focus:outline-none ">
                                Ver viaje
                            </Link>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <a target="_blank" href={`https://twitter.com/share?text=http://nosfuimosbuckets3.s3-website-us-east-1.amazonaws.com/admin/productos/ + ${id}`}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                            </a>

                            <a target="_blank" href={`https://www.facebook.com/share_channel/?link=http://nosfuimosbuckets3.s3-website-us-east-1.amazonaws.com/admin/productos/ + ${id}`}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                            </a>

                            <div>
                                <svg onClick={handleShareButtonClick} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-link hover:underline"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            {copied ? <Alert /> : null}
        </div>
    );
}