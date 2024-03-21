import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Link, useParams } from 'react-router-dom';
import { useFetchGetID } from "../PeticionesHTTP/Productos/useFetchGetID";
import useMediaQuery from '@mui/material/useMediaQuery';


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
    const isSmallScreen = useMediaQuery('(max-width:639px)');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: '1rem',
        boxShadow: 24,
        p: 4,
        witdth: isSmallScreen ? 'max-content' : 'fit-content',
    };

    return (
        <div>
            <Button sx={styleButton} onClick={handleOpen}>
                <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
                    <p className="text-sm hover:underline capitalize">Compartir</p>

                </div>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                        <a href="#">
                            <img
                                src={"data:image;base64," + data?.urlImagenes[0]}
                                alt=""
                                loading="lazy"
                                className="rounded-t-lg"
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{data?.nombre}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 ">{data?.destino}</p>

                            <Link onClick={handleClose} to={"/product/" + id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#E47F07] rounded-lg hover:bg-white hover:text-[#E47F07] hover:border hover:border-[#E47F07] focus:outline-none ">
                                        Ver viaje
                            </Link>

                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4 mb-4">

                            <a target="_blank" href="https://twitter.com/share?text=%C2%A1Me%20gusta%21%20Top%20Deportivo%20Mujer%20Push%20Up%20Brasier%20Transpirable%20Ropa%20Gym&url=https%3A%2F%2Farticulo.mercadolibre.com.co%2FMCO-1338061599-top-deportivo-mujer-push-up-brasier-transpirable-ropa-gym-_JM">
                            <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000000"  strokeWidth="1.25"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                            </a>

                            {/*<a href={`https://www.facebook.com/share_channel/?link=http://localhost:8080/admin/productos/ + ${id}`}> */}
                            <a target="_blank" href="https://www.facebook.com/share_channel/?link=https%3A%2F%2Farticulo.mercadolibre.com.co%2FMCO-1338061599-top-deportivo-mujer-push-up-brasier-transpirable-ropa-gym-_JM&app_id=966242223397117&source_surface=external_reshare&display&hashtag">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                            </a>
                            
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}