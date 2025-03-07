import { useState } from "react";
import SelectFilter from "../SelectFilter/SelectFilter";
import styles from "./styles.module.css";

const Results = ({ products }) => {
  const { products, filterValues, handleFilterChange } =
    useProductFilter(initialProducts);
  const filters = getFilterConfig();

  return (
    <div className={styles.content}>
      <FilterBar
        filters={filters}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
      />
      <div className="results-page__results" id="results-page__results"></div>
    </div>
  );
};

export default Results;
