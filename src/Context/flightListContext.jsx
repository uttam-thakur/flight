import { createContext, useContext, useState } from "react";
// import FlightList from "../component/flightList"

const FlightListContext = createContext({});
export const useFlightListContext = () => useContext(FlightListContext);

export const FlightListContextProvider = ({ children }) => {
  const [searchedFlightList, setSearchFlightList] = useState([]);
  const [cartFlightList, setCartFlightList] = useState([]);

  const [formData, setFormData] = useState(null);

  const updateFormData = (data) => {
    setFormData(data);
  };
  const updateSearchedFlightList = (flightList) => {
    if (Array.isArray(flightList)) setSearchFlightList(flightList);
  };

  const updateCartFlightList = (newFlight) => {
    const flightAlreadyExist = cartFlightList?.filter(
      (flight) => flight.flight_id == newFlight.flight_id
    )?.length;

    if (!flightAlreadyExist) {
      setCartFlightList([...cartFlightList, newFlight]);
    }
  };

  return (
    <FlightListContext.Provider
      value={{
        searchedFlightList,
        cartFlightList,
        updateSearchedFlightList,
        updateCartFlightList,
        formData,
        updateFormData,
      }}
    >
      {children}
    </FlightListContext.Provider>
  );
};
