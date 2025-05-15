import { Outlet, useNavigate } from "react-router-dom";
import { Suspense } from "react";

import { Button } from "../../shared/ui";

import styles from "./LayoutInner.module.css";

export const LayoutInner = () => {
  const navigate = useNavigate();

  const handleClickNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.LayoutInner}>
      <Button
        text="Назад"
        onClick={handleClickNavigateBack}
        className={styles.LayoutInner__back}
      />
      <Suspense fallback={"Loading..."}>{<Outlet />}</Suspense>
    </div>
  );
};
