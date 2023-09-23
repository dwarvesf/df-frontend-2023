import { createBrowserRouter } from "react-router-dom";

//! components
import Root from "../layouts";
import Home from "../pages/Home";
import Dashboard from "../components/Dashboard";

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
            path: "/createtopic",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default AppRouter;
