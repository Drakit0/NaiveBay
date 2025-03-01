import ImageBGContainer from "../ImageBGContainer/ImageBGContainer"
import MainPageContainer from "../MainPageContainer/MainPageContainer"
import MenuBar from "../MenuBar/MenuBar"
import PageFooter from "../PageFooter/PageFooter"


const MainPageTemplate = ({children}) => {
    return(
        <MainPageContainer>
            <MenuBar />
            {/* <Image src="/images/main_page_background.jpg" alt="" width={400} height={400} /> */}
                <ImageBGContainer>
                    {children}
                </ImageBGContainer>
            <PageFooter />
            
        </MainPageContainer>
    )
}

export default MainPageTemplate