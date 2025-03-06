const { MenuItem } = require("@mui/material")


const SelectFilter = ({ filterName, filterTitle, options, handleChange }) => {
    return (
        <Filter filterName={filterName} filterTitle={filterTitle}>
            <Select
                labelId={`${filterName}-label`}
                id={filterName}
                value={selectedValue}
                label={filterTitle}
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <MenuItem key={`${option}-${index}`} value={option}>{option}</MenuItem>
                ))}

            </Select>
        </Filter>
    )

}

export default SelectFilter