import styles from "./styles.module.css"

const Results = ({products}) => {
    return (
        
        <div className={styles.content}>
            <div className="results-page__filter-sidebar ">
                <h3>Filters</h3>
                <label htmlFor="ordering">Order by:</label>
                <select name="ordering" id="ordering-select">
                <option value="relevance">Relevance</option>
                <option value="ascending-price">Ascending price</option>
                <option value="descending-price">Descending price</option>
                </select>
            </div>
            <div className="results-page__results" id="results-page__results"></div>
        </div>

        
    )
}

export default Results