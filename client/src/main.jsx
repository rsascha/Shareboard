import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBoard from "./pages/CreateBoard.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Board from "./pages/Board.jsx";
import SelectBoard from "./pages/SelectBoard.jsx";
import FreestyleBoard from "./pages/FreestyleBoard.jsx";
import UpdateNote from "./pages/UpdateNote.jsx";
import UserLog from "./pages/UserLog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "createboard", element: <CreateBoard /> },
      { path: "selectboard", element: <SelectBoard /> },
      { path: "freestyleboard", element: <FreestyleBoard /> },
      { path: "userlog/:shareboardId/:ownerKey", element: <UserLog /> },
      { path: "settings/:shareboardId/:ownerKey", element: <Settings /> },
      { path: "settings/:shareboardId/:ownerKey/users", element: <Settings /> },
      {
        path: "settings/:shareboardId/:ownerKey/users/:id",
        element: <Settings />,
      },
      { path: "board/:userKey", element: <Board /> },
      { path: "board/:userKey/notes/:id", element: <UpdateNote /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
