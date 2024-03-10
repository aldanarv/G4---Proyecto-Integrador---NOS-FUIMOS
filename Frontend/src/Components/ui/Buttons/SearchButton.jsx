import React from 'react'
import styles from "../../../styles/searchButton.module.css"

const SearchButton = () => {
    return (
        <form className={styles.searchButton}>
            <div className={styles.searchButton__container}>
                <input
                    type="search"
                    id="default-search"
                    className={styles.searchButton__input}
                    placeholder="Explora destinos"
                    required
                />
                <button
                    type="submit"
                    className={styles.searchButton__buttton}
                >
                    <svg
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="#ffffff"
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default SearchButton