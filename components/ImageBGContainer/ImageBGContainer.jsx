import styles from "./styles.module.css"

const ImageBGContainer = ({img_path='/images/main_page_background.jpg', children}) => {
    const backgroundImg = {backgroundImage: `url(${img_path})`};
    return (
        <div className={styles.backgroundContainer} style={backgroundImg}>{children}</div>
    )
}

export default ImageBGContainer