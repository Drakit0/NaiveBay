import Image from "next/image";
import styles from "./page.module.css";
import MenuBar from "../../components/MenuBar/MenuBar";
import MainPageContainer from "../../components/MainPageContainer/MainPageContainer";
// TODO: see how to port this to layout.js with login stuff
// TODO see what to do with the page div
export default function Home() {
  return (<>
    {/* <div className={styles.page}> */}

    <main className={styles.main}>


      <MainPageContainer>
        <MenuBar />
        <footer className={styles.footer}>

        </footer>
        {/* </div> */}
      </MainPageContainer>
    </main>
  </>
  );
}
