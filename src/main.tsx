import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "./providers/router-providers";

import "./assets/styles/index.css";

// TODO:
// иконки (внутри приложения)
// alias / eslint antfu / stylistic / lint-staged

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider />
  </StrictMode>,
);
