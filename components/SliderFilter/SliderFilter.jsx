import { Slider } from "@mui/material";
import { useState } from "react";

const SliderFilter = () => {
  const [value, setValue] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" />
  );
};

export default SliderFilter;
