import React, { useState } from 'react';

const StarRating = ({ onChange }) => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={index < rating ? "#E47F07" : "none"}
                    stroke="#E47F07"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-star cursor-pointer"
                    onClick={() => handleClick(index + 1)}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
