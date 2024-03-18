import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

export default function InputSearch({ options }) {
    return (
        <Autocomplete
            placeholder="Explora destinos"
            options={options}
            getOptionLabel={(option) => `${option.nombre}, ${option.destino}`}
            sx={{
                width: '100%',
                fontWeight: 300,
                fontFamily: 'Nunito Sans',
                fontSize: '16px',
                lineHeight: '24px',
                borderRadius: '0.5rem',
                border: 'none',
                padding: '8px 10px',
                '@media (min-width: 768px)': {
                    width: '60%',
                }
            }}
            renderOption={(props, option) => (
                <div {...props} className="flex gap-2 items-center p-1 border-b border-inherit">
                    <svg className='hidden sm:block' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </svg>
                    <span>{option.nombre}, {option.destino}</span>
                </div>
            )}
        />
    );
}