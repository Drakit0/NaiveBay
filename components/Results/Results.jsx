import useProductFilter from "../../hooks/useProductFIlter";
import FilterBar from "../FilterBar/FilterBar";
import useFilterConfig from "./hooks";
import ResultsProductGrid from "../ResultsProductGrid/ResultsProductGrid";
import styles from "./styles.module.css";

const Results = ({ params }) => {
  const { products, filterValues, handleFilterChange } =
    useProductFilter(params);
  const filters = useFilterConfig();

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
