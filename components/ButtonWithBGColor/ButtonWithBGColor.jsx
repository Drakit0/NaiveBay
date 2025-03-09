import { IconButton } from "@mui/material"


// TODO: ask about inline styles
// const ButtonWithBGColor = ({buttonClassName,iconClassName, buttonType="button"}) => {
const ButtonWithBGColor = ({buttonClass, buttonType="button", children}) => {
    return (
    <div className={buttonClass}>
        <IconButton type={buttonType}>
            {children}
        </IconButton>
    </div>
    )
}

export default ButtonWithBGColor