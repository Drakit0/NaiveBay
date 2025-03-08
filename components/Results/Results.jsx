import useProductFilter from "../../hooks/useProductFIlter";
import FilterBar from "../FilterBar/FilterBar";
import getFilterConfig from "../FilterBar/utils";
import ResultsProductGrid from "../ResultsProductGrid/ResultsProductGrid";
import styles from "./styles.module.css";

const Results = ({ initialProducts }) => {
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
      <ResultsProductGrid products={products} />
    </div>
  );
};

export default Results;
