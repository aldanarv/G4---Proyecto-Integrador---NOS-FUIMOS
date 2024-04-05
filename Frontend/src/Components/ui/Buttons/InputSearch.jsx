import React, { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContextGlobal } from "../../../Context/global.context";
import CalendarioHome from "../../CalendarioHome";
import backgroundImage from "../../../assets/search.png";

export default function InputSearch({ options, onProductSelect }) {
    const { state } = useContextGlobal();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [fechasSeleccionadas, setFechasSeleccionadas] = useState(null);

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString('es-ES');
    };

    const handleDateSelect = (dates) => {
        setFechasSeleccionadas(dates);
    };

    const isSmallScreen = useMediaQuery('(max-width:639px)');

    const handleSearch = () => {
        let filteredProduct = state.dataCategorias;

        // Filtrar por selectedOption
        if (selectedOption) {
            filteredProduct = filteredProduct.filter(product => product.id === selectedOption.id);
        }

        // Filtrar por rango de fechas
        if (fechasSeleccionadas && fechasSeleccionadas.startDate && fechasSeleccionadas.endDate) {
            const startDate = fechasSeleccionadas.startDate.getTime();
            const endDate = fechasSeleccionadas.endDate.getTime();
            filteredProduct = filteredProduct.filter(product => {
                const productStartDate = new Date(product.salidaDate).getTime();
                const productEndDate = new Date(product.vueltaDate).getTime();
                return productStartDate >= startDate && productStartDate <= endDate || productEndDate >= endDate && productEndDate <= startDate;
            });
        }

        onProductSelect(filteredProduct);
        console.log(filteredProduct)
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    width: "100%",
                    justifyContent: "center",
                    flexDirection: isSmallScreen ? 'column' : 'row',
                }}
            >

                <Autocomplete
                    placeholder="Explora destinos"
                    options={options}
                    getOptionLabel={(option) => `${option.nombre}, ${option.destino}`}
                    sx={{
                        width: "100%",
                        fontWeight: 300,
                        fontFamily: "Nunito Sans",
                        fontSize: "16px",
                        lineHeight: "24px",
                        borderRadius: "0.5rem",
                        border: "none",
                        padding: "8px 10px",
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "30px",
                        "@media (min-width: 768px)": {
                            width: "60%",
                        },
                    }}
                    freeSolo
                    disableClearable
                    renderOption={(props, option) => (
                        <div
                            {...props}
                            className="flex gap-2 items-center p-1 border-b border-inherit"
                        >
                            <svg
                                className="hidden sm:block"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                            </svg>
                            <span>
                                {option.nombre}, {option.destino}
                            </span>
                        </div>
                    )}
                    onChange={(event, newValue) => {
                        setSelectedOption(newValue);
                    }}
                />



                <p onClick={toggleCalendar} className="relative min-w-52 border-0 bg-white rounded-md py-2 px-2.5 text-[#7a7e82] focus:outline focus:outline-2 focus:outline-offset-0 font-light text-base">
                    {fechasSeleccionadas ?
                        `${formatDate(fechasSeleccionadas?.startDate)} - ${formatDate(fechasSeleccionadas?.endDate)}`
                        : "Check in - Check out"
                    }
                </p>

                <button onClick={handleSearch} className="px-6 py-2 mx-auto sm:m-0 font-medium text-white bg-[#005B8D] border border-black rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Buscar
                </button>
            </div>
            {isCalendarOpen && (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        right: "50%",
                        top: "100%",
                    }}
                >
                    <CalendarioHome onDateSelect={handleDateSelect} />
                </div>
            )}
        </>
    );
}
