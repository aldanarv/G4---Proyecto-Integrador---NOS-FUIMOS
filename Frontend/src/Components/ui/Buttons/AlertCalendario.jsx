import React from 'react'

const AlertCalendario = () => {
    return (
        <div className='fixed bottom-20 right-5 max-w-screen-sm'>
            <div className="flex items-center p-4 text-sm text-gray-300 rounded-lg bg-gray-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className='flex flex-col'>
                    <span className="font-light">
                        Lo sentimos, pero la fecha seleccionada está fuera del rango de reservas disponibles. Actualmente, solo tenemos reservas disponibles para las fechas marcadas en azul. ¡Gracias por tu comprensión!
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AlertCalendario