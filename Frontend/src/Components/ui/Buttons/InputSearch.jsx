import React, { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import useMediaQuery from '@mui/material/useMediaQuery';
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const css = `
    .my-selected:not([disabled]) { 
        background-color: #BFEBFA; 
        color: black;
    }
`;

export default function InputSearch({ options }) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDayClick = (day) => {
        setSelectedRange((prevRange) => {
            if (!prevRange.from || prevRange.to) {
                return { from: day, to: null };
            } else if (day < prevRange.from) {
                return { from: day, to: prevRange.from };
            } else {
                return { ...prevRange, to: day };
            }
        });
    };

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString();
    };

    const isSmallScreen = useMediaQuery('(max-width:640px)');

    return (
        <>
            <style>{css}</style>
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
                        "@media (min-width: 768px)": {
                            width: "60%",
                        },
                    }}
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
                />
                <input
                    placeholder={`${selectedRange.from ? formatDate(selectedRange.from) : "Check in"
                        } - ${selectedRange.to ? formatDate(selectedRange.to) : "Check out"}`}
                    onClick={toggleCalendar}
                    className="relative border-0 bg-white rounded-md py-2 px-2.5 text-black placeholder:text-[#7a7e82] focus:outline focus:outline-2 focus:outline-offset-0 font-light text-base"
                />
                <button className="px-6 py-2 mx-auto sm:m-0 font-medium text-white bg-[#01A9D6] rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Buscar
                </button>
            </div>
            {isCalendarOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        backgroundColor: "white",
                        borderRadius: "6px",
                        fontWeight: 300,
                        fontFamily: "Nunito Sans",
                    }}
                >
                    <DayPicker
                        selected={selectedRange}
                        onDayClick={handleDayClick}
                        numberOfMonths={2}
                        fixedWeeks
                        showOutsideDays
                        mode="range"
                        modifiersClassNames={{
                            selected: "my-selected",
                        }}
                        /*
                            styles={{
                                day: { width: '27px' }
                            }}
                        */
                        locale={es}
                    />
                </div>
            )}
        </>
    );
}
