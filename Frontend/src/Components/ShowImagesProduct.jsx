import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

const styleImage = {
    width: 550,
    height: 500,
};

export default function ShowImagesProduct({ urlImagenes }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>
                <svg
                    className="icon icon-tabler icon-tabler-photo-search"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        stroke="none"
                        d="M0 0h24v24H0z"
                        fill="none"
                    />
                    <path d="M15 8h.01" />
                    <path d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" />
                    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M20.2 20.2l1.8 1.8" />
                    <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l2 2" />
                </svg>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ImageList sx={styleImage} cols={2} rowHeight={164}>
                        {urlImagenes.map((imagenes, index) => (
                            <ImageListItem key={index}>
                                <img
                                    style={{
                                        borderRadius: "0.5rem",
                                        objectFit: "cover",
                                        height: '100%'
                                    }}
                                    src={"data:image;base64," + imagenes}
                                    alt=""
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </Modal>
        </div>
    );
}