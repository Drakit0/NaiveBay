

const Filter = ({filterName, filterTitle, children}) => {
    return (
        <>
            <label htmlFor={filterName}>{filterTitle}</label>
            {children}
        </>
    );
};

export default Filter