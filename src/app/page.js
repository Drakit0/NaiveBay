import styles from "./page.module.css";
import MainPageTemplate from "../../components/MainPageTemplate/MainPageTemplate";


export default function Home() {
  return (<>
    {/* <div className={styles.page}> */}

    <main className={styles.main}>

      <MainPageTemplate>
        <h1>Hola</h1>
      </MainPageTemplate>

    </main>
  </>
  );
}
