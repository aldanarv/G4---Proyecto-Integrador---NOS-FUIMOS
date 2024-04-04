import React from 'react'

const Alert = () => {
    return (
        <div className='fixed bottom-20 right-5'>
            <div className="flex items-center p-4 text-sm text-gray-300 rounded-lg bg-gray-800" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#d1d5db" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check flex-shrink-0 inline me-3"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-light">Enlace copiado al portapapeles</span>
                </div>
            </div>
        </div>
    )
}

export default Alert