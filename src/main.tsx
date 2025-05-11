import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { RouterProvider } from "./providers/router-providers";

// TODO:
// иконки (внутри приложения)
// alias

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider />
  </StrictMode>,
);
