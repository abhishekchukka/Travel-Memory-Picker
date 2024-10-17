import { Outlet } from "react-router";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* <p>List of cties</p> */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>by WorldWise Inc.</p>
      </footer>
    </div>
  );
};

export default SideBar;
