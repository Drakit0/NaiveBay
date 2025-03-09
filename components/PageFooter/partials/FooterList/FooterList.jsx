import styles from "./styles.module.css";
import array2ListElements from "./utils";

const FooterList = ({ title, values }) => {
  return (
    <div className={styles.footerSection}>
      <h4>{title}</h4>
      <ul className={styles.footerList}>{array2ListElements(title, values)}</ul>
    </div>
  );
};

export default FooterList;
