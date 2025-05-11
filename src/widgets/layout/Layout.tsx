import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export const Layout = () => <div className={styles.layout}>{<Outlet />}</div>;
