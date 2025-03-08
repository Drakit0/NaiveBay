"use client";

import { Slider } from "@mui/material";
import { useState } from "react";
import Filter from "../Filter/Filter";

const SliderFilter = ({ filterName, filterTitle, min, max, handleChange }) => {
  const [value, setValue] = useState([min, max]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    handleChange("slider", newValue);
  };

  return (
    <Filter filterName={filterName} filterTitle={filterTitle}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
    </Filter>
  );
};

export default SliderFilter;
