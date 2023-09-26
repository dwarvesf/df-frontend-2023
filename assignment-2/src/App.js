// import logo from './logo.svg';
import "./App.css";
import './bootstrap.css';
import "./style.css";

//! Provider
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./store";
import { AppRouter } from "./routes";

//! imp Datas Seed
import { dataSeed } from "./database";
dataSeed.generateData();

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <div className="container--fluid">
          <RouterProvider router={AppRouter} />
        </div>
      </StoreProvider>
    </div>
  );
}

export default App;
