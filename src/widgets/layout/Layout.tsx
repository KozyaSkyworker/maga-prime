import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import styles from "./Layout.module.css";

export const Layout = () => (
  <div className={styles.Layout}>
    <Suspense fallback={"Loading..."}>{<Outlet />}</Suspense>
  </div>
);
