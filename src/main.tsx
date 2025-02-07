import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Suspense } from "react";
import "./app/styles/index.scss";
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<>Загрузка...</>}>
    <RouterProvider router={router} />
  </Suspense>
);
