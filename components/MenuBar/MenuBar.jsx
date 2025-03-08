"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import LoggedInBar from "./partials/LoggedInBar/LoggedInBar";
import NotLoggedInBar from "./partials/NotLoggedInBar/NotLoggedInBar";
import MainSearchBar from "./partials/MainSearchBar/MainSearchBar";
import useUserData from "./hooks";
import Link from "next/link";
import CategoryDrawer from "./partials/CategoryDrawer/CategoryDrawer";

const MenuBar = () => {
  const [userData, setUserData] = useUserData();

  return (
    <header className={styles.header}>
      {/* <DensityMediumIcon className={`${styles.bigOnHover}`}/>  */}
      <CategoryDrawer></CategoryDrawer>
      {/* className={styles.icon} */}
      <Link href="/">
        <Image
          src="/images/logo_transparente.png"
          className={`${styles.bigOnHover} ${styles.icon}`}
          alt=""
          width={100}
          height={100}
        />
      </Link>
      {/* TODO: onclick={sidebarToggle} */}
      <div className={styles.searchBarContainer}>
        <MainSearchBar />
      </div>
      <div className={styles.loginContainer}>
        {userData ? (
          <LoggedInBar username={userData}></LoggedInBar>
        ) : (
          <NotLoggedInBar></NotLoggedInBar>
        )}
      </div>
    </header>
  );
};

export default MenuBar;
