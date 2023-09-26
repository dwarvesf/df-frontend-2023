import { createBrowserRouter } from "react-router-dom";

//! root
import Root from "../layouts";
//! pages
import Dashboard from "../components/Dashboard";
import Home from "../pages/Home";
import Topic from "../pages/Topic";
import Setting from "../pages/Setting";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            index: true,
            path: "",
            element: <Home />,
          },
          {
            path: "/create-topic",
            element: <Topic />,
          },
          {
            path: "/setting",
            element: <Setting />,
          },
        ],
      },
    ],
  },
]);

export default AppRouter;
