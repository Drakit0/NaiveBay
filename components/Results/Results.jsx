import { useState } from "react";
import SelectFilter from "../SelectFilter/SelectFilter";
import styles from "./styles.module.css";

const handleOrderingChange = (option) => {
    console.log("Ordering changed to: ", option);
};
const handleRadioChange = (option) => {
    console.log("Radio changed to: ", option);
}
const handleSliderChange = (option) => {
    console.log("Slider changed to: ", option);
}
const filters = {
    ordering: {
        type: "option",
        text: "Order by",
        options: ["Relevance", "Ascending", "Descending"],
        changeHandler: handleOrderingChange,
    },
    category: {
        type: "radio",
        text: "Select Category",
        options: ["Relevance", "Ascending", "Descending"],
        changeHandler: handleRadioChange,
    },
    "price-range": {
        type: "slider",
        text: "Select Category",
        options: ["Relevance", "Ascending", "Descending"],
        changeHandler: handleSliderChange
    },
};

const Results = ({ products }) => {
    const [products, setProducts] = useState(products)


    return (
        <div className={styles.content}>
            <div className={styles.filterSidebar}>
                <h3>Filters</h3>
                {Object.keys(filters).map((key, index, filters) => {
                    switch (filters[key][type]) {
                        case "option":
                            return (
                                <SelectFilter
                                    key={`${key}-${index}`}
                                    filterName={key}
                                    filterTitle={filters[key]["text"]}
                                    options={filters[key]["options"]}
                                    handleChange={filters[key]["changeHandler"]}
                                />
                            );

                        case "radio":
                            return <RadioFilter key={`${key}-${index}`}></RadioFilter>;
                        case "slider":
                            return <SliderFilter key={`${key}-${index}`}></SliderFilter>;
                        default:
                            break;
                    }
                })}
                ;
            </div>
            <div className="results-page__results" id="results-page__results"></div>
        </div>
    );
};

export default Results;
