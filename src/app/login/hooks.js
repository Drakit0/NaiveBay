const { useState } = require("react")


const usePasswordValidation = () => {
    const [errorMessage, setErrorMessage] = useState("");


    const validate = ({ formInfo }) => {

    }
    return [errorMessage, validate]
}

export default usePasswordValidation