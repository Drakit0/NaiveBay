import React from "react";
import SelectFilter from "../SelectFilter/SelectFilter";
import styles from "./styles.module.css";
import SliderFilter from "../SliderFilter/SliderFilter";

const FilterBar = ({ filters, filterValues, onFilterChange }) => {
  return (
    <div className={styles.filterSidebar}>
      <h3>Filters</h3>
      {Object.keys(filters).map((key, index) => {
        const filter = filters[key];

        switch (filter.type) {
          case "option":
            return (
              <SelectFilter
                key={`${key}-${index}`}
                filterName={key}
                filterTitle={filter.text}
                options={filter.options}
                selectedValue={filterValues[key]}
                handleChange={(e) => onFilterChange(key, e.target.value)}
              />
            );
          // case "radio":
          //   return (
          //     <RadioFilter
          //       key={`${key}-${index}`}
          //       filterName={key}
          //       filterTitle={filter.text}
          //       options={filter.options}
          //       selectedValue={filterValues[key]}
          //       handleChange={(value) => onFilterChange(key, value)}
          //     />
          //   );
          case "slider":
            return (
              <SliderFilter
                key={`${key}-${index}`}
                filterName={key}
                filterTitle={filter.text}
                min={filter.min || 0}
                max={filter.max || 1000}
                value={filterValues[key]}
                handleChange={(e) => onFilterChange(key, e[value])}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FilterBar;
