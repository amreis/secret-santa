import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, {action as submitAction} from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WishForParticipant from "./WishForParticipant.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    action: submitAction,
  },
  {
    path: "/success",
    element: <App success={true} />,
    action: submitAction,
  },
  {
    path: "/participante/:participantId",
    element: <WishForParticipant />
  }
])


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
