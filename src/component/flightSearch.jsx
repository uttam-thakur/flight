import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  getLinearProgressUtilityClass,
} from "@mui/material";
import Header from "./header";
import axios from "axios";
import _debounce from "lodash/debounce";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import CryptoJS from "crypto-js";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { useFlightListContext } from "../Context/flightListContext";

const FlightSearch = () => {
  const [flyingFromValue, setFlyingFromValue] = useState("");
  const [flyingToValue, setFlyingToValue] = useState("");
  const [airportResults, setAirportResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departureDateValue, setDepartureDateValue] = useState("");
  const [preferredClassValue, setPreferredClassValue] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [passengerListOpen, setPassengerListOpen] = useState(false);
  const [selectedTravelType, setSelectedTravelType] = useState("oneway"); // Default value is 'oneway'
  const [selectedArrivalAirpot, setSelectedArrivalAirport] = useState({});
  const [selectedDepartureAirpot, setSelectedDepartureAirport] = useState({});

  const [arriveLocationList, setArriveLocationList] = useState([]);
  const [depatureLocationList, setDepatureLocationList] = useState([]);

  const { updateSearchedFlightList, updateFormData } = useFlightListContext();
  const navigate = useNavigate();

  const travelHandler = () => {
    setPassengerListOpen(false);
  };
  const togglePassengerList = () => {
    setPassengerListOpen((prevOpen) => !prevOpen);
  };

  const encryptObject = (objectToEncrypt) => {
    const jsonString = JSON.stringify(objectToEncrypt);
    const encryptedString = CryptoJS.AES.encrypt(
      jsonString,
      "aLtAeNCrypT"
    ).toString();
    return encryptedString;
  };
  const ency =
    "U2FsdGVkX19WhOx34bCCs/vjnFagLZzFyQqvyTXAs6fh5H1T97PTsFEEDpuPr1oh8zDGGmCVr/iEdTGTlqDlmNvYV6fa2InHgZ50ICooL7U=";
  const decryptObject = (encryptedString) => {
    const bytes = CryptoJS.AES.decrypt(encryptedString, "aLtAeNCrypT");
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedString);
    return decryptedObject;
  };
  const fetchAirportResults = async (searchKey, destination) => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        apikey: "indusAltaR2PSM",
        currency:
          "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==",
      };

      const apiUrl =
        "https://devadmin.altabooking.com/api/v2/flight/search-flight-airport";
      const response = await axios.post(
        apiUrl,
        { request_data: encryptObject({ search_key: searchKey }) },
        { headers }
      );
      setAirportResults(response.data.results);
      if (destination == "arrival") {
        setArriveLocationList(() => response?.data?.main_data?.data);
      } else {
        setDepatureLocationList(() => response?.data?.main_data?.data);
      }
    } catch (error) {
      console.error("Error fetching airport results:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAirportResultsList = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        console.error("Access token not found in localStorage");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        apikey: "indusAltaR2PSM",
        currency:
          "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==",
      };
      const apiUrl =
        "https://devadmin.altabooking.com/api/v2/flight/flight-search-list";
      const response = await axios.post(
        apiUrl,
        {
          request_data: encryptObject({
            from_airport: selectedArrivalAirpot.iata,
            to_airport: selectedDepartureAirpot.iata,
            departure_date: departureDateValue,
            class_type: preferredClassValue,
            adults: adultCount,
            childs: childrenCount,
            infants: infantCount,
            travel_type: selectedTravelType,
            max_result: 100,
            user_id: 0,
          }),
        },
        { headers }
      );
      console.log(response);
      updateSearchedFlightList(response?.data?.main_data?.data || []);
      navigate("/flight/list");
    } catch (error) {
      console.error("Error fetching airport results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdultCountChange = (count) => {
    setAdultCount((prevCount) => Math.max(prevCount + count, 0));
  };

  const handleChildrenCountChange = (count) => {
    setChildrenCount((prevCount) => Math.max(prevCount + count, 0));
  };

  const handleInfantCountChange = (count) => {
    setInfantCount((prevCount) => Math.max(prevCount + count, 0));
  };
  const debouncedFetchAirportResults = _debounce(
    (searchKey, destination) => fetchAirportResults(searchKey, destination),
    300
  );

  const handleFlyingFromChange = (event, destination) => {
    const searchKey = event.target.value;
    setFlyingFromValue(searchKey);
    setLoading(true);
  };

  const handleFlyingToChange = (event, destination) => {
    const searchKey = event.target.value;
    setFlyingToValue(searchKey);
    setLoading(true);
  };
  useEffect(() => {
    debouncedFetchAirportResults(flyingFromValue, "arrival");
    return () => {
      debouncedFetchAirportResults.cancel();
    };
  }, [flyingFromValue]);

  useEffect(() => {
    debouncedFetchAirportResults(flyingToValue, "departure");
    return () => {
      debouncedFetchAirportResults.cancel();
    };
  }, [flyingToValue]);

  const handleTravelTypeChange = (travelType) => {
    setSelectedTravelType(travelType);
  };

  const handleSubmit = (e) => {
    const formData = {
      from_airport: selectedArrivalAirpot,
      to_airport: selectedDepartureAirpot,
      departure_date: departureDateValue,
      // return_date: "2023-12-16",
      class_type: "ECONOMY",
      adults: adultCount.toString(),
      childs: childrenCount.toString(),
      infants: infantCount.toString(),
      travel_type: selectedTravelType,
      max_result: 100,
      user_id: 0,
    };
    updateFormData(formData);

    fetchAirportResultsList();
  };

  const onDestinationSelect = (destination, location) => {
    console.log(location);
    if (destination == "arrival") {
      setFlyingFromValue(location?.short_name);
      setSelectedArrivalAirport(location);
    } else {
      setFlyingToValue(location?.short_name);
      setSelectedDepartureAirport(location);
    }
  };
  return (
    <div style={{ backgroundColor: "", height: "calc(100vh - 64px)" }}>
      <Header />

      <Grid container spacing={2} margin={2}>
        <Button
          type="button"
          variant="contained"
          style={{
            backgroundColor:
              selectedTravelType === "oneway" ? "#1a1c17" : "#232B31",
            borderRadius: "20px",
          }}
          onClick={() => handleTravelTypeChange("oneway")}
        >
          <AcUnitIcon />
          One Way
        </Button>

        <Button
          type="button"
          variant="contained"
          style={{
            backgroundColor:
              selectedTravelType === "roundtrip" ? "#1a1c17" : "#232B31",
            borderRadius: "20px",
          }}
          onClick={() => handleTravelTypeChange("roundtrip")}
        >
          <AccessAlarmsIcon />
          Round Trip
        </Button>

        <Button
          type="button"
          variant="contained"
          style={{
            backgroundColor:
              selectedTravelType === "multicity" ? "#1a1c17" : "#232B31",
            borderRadius: "20px",
          }}
          onClick={() => handleTravelTypeChange("multicity")}
        >
          <AddHomeWorkIcon />
          Multi-City
        </Button>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            options={arriveLocationList || []}
            getOptionLabel={(option) => flyingFromValue || ""}
            variant="outlined"
            fullWidth
            select
            margin="normal"
            value={flyingFromValue}
            renderInput={(params) => (
              <TextField
                onChange={(e) => {
                  handleFlyingFromChange(e, "arrival");
                }}
                {...params}
                label="Flying To"
                variant="outlined"
                margin="normal"
                value={flyingFromValue}
                style={{ color: "#ffffff" }}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem
                {...props}
                onClick={() => onDestinationSelect("arrival", option)}
              >
                {option?.short_name}
              </MenuItem>
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Autocomplete
            options={depatureLocationList || []}
            getOptionLabel={(option) => flyingToValue || ""}
            variant="outlined"
            fullWidth
            select
            margin="normal"
            value={flyingToValue}
            renderInput={(params) => (
              <TextField
                onChange={(e) => {
                  handleFlyingToChange(e, "departure");
                }}
                {...params}
                label="Flying To"
                variant="outlined"
                margin="normal"
                value={flyingToValue}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem
                {...props}
                onClick={() => onDestinationSelect("departure", option)}
              >
                {option?.short_name}
              </MenuItem>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setDepartureDateValue(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div
            variant="subtitle1"
            onClick={togglePassengerList}
            style={{
              cursor: "pointer",
              border: "1px solid #d3d1ce",
              borderRadius: "5px",
              minWidth: "300px",
              display: "flex",
              justifyContent: "center",
              padding: "16px 30px",
              color: "#d3d1ce",
            }}
          >
            {`${adultCount || ""} Aduld . ${childrenCount || ""} Child . ${
              infantCount || ""
            } Infant`}
          </div>
          {passengerListOpen && (
            <Card>
              <CardContent className="passengerList">
                <div
                  style={{
                    display: "flex",
                    marginBottom: "16px",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ textAlign: "start", minWidth: "100px" }}
                  >
                    Adults
                  </Typography>

                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleAdultCountChange(-1)}
                    >
                      -
                    </Button>
                    <span style={{ padding: "0px 20px" }}>{adultCount}</span>
                    <Button
                      variant="outlined"
                      onClick={() => handleAdultCountChange(1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginBottom: "16px",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ textAlign: "start", minWidth: "100px" }}
                  >
                    Children
                  </Typography>
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleChildrenCountChange(-1)}
                    >
                      -
                    </Button>
                    <span style={{ padding: "0px 20px" }}>{childrenCount}</span>
                    <Button
                      variant="outlined"
                      onClick={() => handleChildrenCountChange(1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Typography
                    variant="h6"
                    style={{ textAlign: "start", minWidth: "100px" }}
                  >
                    Infant
                  </Typography>
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleInfantCountChange(-1)}
                    >
                      -
                    </Button>
                    <span style={{ padding: "0px 20px" }}>{infantCount}</span>
                    <Button
                      variant="outlined"
                      onClick={() => handleInfantCountChange(1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  variant="outlined"
                  onClick={travelHandler}
                  style={{ marginTop: "40px" }}
                >
                  Done
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={4}>
          <Select
            variant="outlined"
            value={preferredClassValue}
            onChange={(e) => setPreferredClassValue(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value={0} disabled>
              Preferred Class
            </MenuItem>
            <MenuItem value="ECONOMY">Economy</MenuItem>
            <MenuItem value="PREMIUM_ECONOMY,">Premium Economy</MenuItem>
            <MenuItem value="BUSINESS,">Business</MenuItem>
            <MenuItem value="FIRST">First</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <br></br>
      <Button
        type="button"
        Width="50px"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={
          !flyingFromValue ||
          !flyingToValue ||
          !departureDateValue ||
          !preferredClassValue
        }
      >
        Submit
      </Button>
    </div>
  );
};

export default FlightSearch;
