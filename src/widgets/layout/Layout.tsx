import { Suspense } from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className={styles.Layout}>
    <Suspense fallback={"Loading..."}>{<Outlet />}</Suspense>
  </div>
);
