import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        DEVELOPMENT: <a href="/">home</a>
      </div>
      <Outlet />
    </>
  );
}

export default App;
