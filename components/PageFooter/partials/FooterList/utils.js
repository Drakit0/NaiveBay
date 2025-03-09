
const array2ListElements = (listName, elements) => {
    return (
        <>
            {elements.map((value, index) => (
                <li key={`${value}-${index}-${listName}`}>{value}</li>
            ))}
        </>
    )
}

export default array2ListElements