import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App, { action as submitAction } from "./App.tsx";
import "./index.css";
import WishForParticipant from "./WishForParticipant.tsx";

const router = createHashRouter(
  [
    {
      path: "/*",
      element: <App />,
      action: submitAction,
    },
    {
      path: "/participante/:participantId",
      element: <WishForParticipant />,
    },
  ],
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
