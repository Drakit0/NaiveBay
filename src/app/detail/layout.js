import MainPageTemplate from "../../../components/MainPageTemplate/MainPageTemplate";
import styles from "./page.module.css";

const AuctionLayout = ({ children }) => {
  return (
    <main className={styles.main}>
      <MainPageTemplate>{children}</MainPageTemplate>
    </main>
  );
};

export default AuctionLayout;
