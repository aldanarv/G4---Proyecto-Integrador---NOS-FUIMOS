import React from 'react'

const MobileAdministration = () => {
    return (
        <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-[#C15205]">ERROR</p>
                <p className="mt-6 text-base leading-7 text-black">
                    Lo sentimos, el panel de administración no está disponible en
                    dispositivos móviles.
                </p>
            </div>
        </main>
    )
}

export default MobileAdministration