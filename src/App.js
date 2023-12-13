import "./App.css";
import Login from "./component/login";
import FlightSearch from "./component/flightSearch";
import FlightList from "./component/flightList";
import Cart from "./component/cart";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { FlightListContextProvider } from "./Context/flightListContext";

function App() {
  return (
    <div className="App">
      <FlightListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/flight"
              element={
                <PrivateRoute>
                  <FlightSearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/flight/list"
              element={
                <PrivateRoute>
                  <FlightList />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </FlightListContextProvider>
    </div>
  );
}

export default App;
