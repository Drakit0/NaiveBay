import MainPageTemplate from "../../../components/MainPageTemplate/MainPageTemplate";
import UserDetail from "../../../components/UserDetail/UserDetail";

import styles from "./page.module.css";

function Page() {
  return (
    <main className={styles.main}>
      <MainPageTemplate>
        <UserDetail />
      </MainPageTemplate>
    </main>
  );
}

export default Page;
