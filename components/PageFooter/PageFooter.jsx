import FooterList from "./partials/FooterList/FooterList";
import styles from "./styles.module.css";

const footerInfo = {
  Buy: ["Trending", "Category 1", "Category 2", "Category 3"],
  Sell: ["Create listing"],
  "About Us": ["Facebook", "Twitter"],
};

const PageFooter = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerInfoContainer}>
          {Object.entries(footerInfo).map(([key, value], index) => (
            <FooterList key={`${key}-${index}`} title={key} values={value} />
          ))}
        </div>
        <p>NaiveBay 2025 ©</p>
      </footer>
    </>
  );
};

export default PageFooter;
