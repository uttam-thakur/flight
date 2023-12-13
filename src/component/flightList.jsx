import React, { useEffect, useState } from "react";
import Header from "./header";
import { useFlightListContext } from "../Context/flightListContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import moment from "moment";

const FlightList = () => {
  const [detailsVisible, setDetailsVisible] = useState(true);
  const navigate = useNavigate();
  const { searchedFlightList, updateCartFlightList, formData } =
    useFlightListContext();

  useEffect(() => {
    if (!searchedFlightList?.length) {
      navigate("/flight");
    }
  }, []);

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          border: "1px solid black",
          backgroundColor: "rgb(215, 226, 237)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <LocationOnIcon />
          <p>{formData?.from_airport?.airport_name || ""}</p>
          <p>{formData?.from_airport?.city || ""}</p>
          <p>{formData?.from_airport?.country || ""}</p>
          <p>{formData?.from_airport?.iata || ""}</p>
        </div>
        <div style={{ marginTop: "100px" }}>
          <ArrowRightAltIcon />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <LocationOnIcon />
          <p>{formData?.to_airport?.airport_name}</p>
          <p>{formData?.to_airport?.city || ""}</p>
          <p>{formData?.to_airport?.country || ""}</p>
          <p>{formData?.to_airport?.iata || ""}</p>
        </div>
        <div>
          <button
            onClick={toggleDetailsVisibility}
            style={{ marginTop: "250px", width: "100px" }}
          >
            {detailsVisible ? "Show Detail" : "Hide detail"}
          </button>
        </div>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "150px",
            marginRight: "250px",
          }}
        >
          {moment(formData?.departure_date).format("ddd DD MMM YYYY") || ""}
        </Typography>
      </div>

      {searchedFlightList?.map((item, index) => (
        <Card key={index} style={{ marginBottom: "16px" }}>
          <CardContent style={{ display: detailsVisible ? "none" : "block" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "100px",
                }}
              >
                <img
                  alt="Airline Logo"
                  src={item?.flightitineraries[0]?.airline_logo}
                  style={{ width: "150px", height: "70px", marginLeft: "0px" }}
                />

                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "start",
                  }}
                  variant="h6"
                >
                  {item?.flightitineraries[0]?.airline_name}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    maxWidth: "250px",
                    textAlign: "start",
                  }}
                >
                  <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {moment(item?.flightitineraries[0]?.departure_at).format(
                      "DD MMM YYYY"
                    ) || ""}
                  </Typography>

                  <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item?.flightitineraries[0]?.departure_time || ""}
                  </Typography>

                  <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item?.flightitineraries[0]?.departure_code || ""}
                  </Typography>

                  <Typography style={{ fontSize: "14px" }}>
                    {item?.flightitineraries[0]?.departure_airport || ""}
                  </Typography>

                  <Typography style={{ fontSize: "14px" }}>
                    {item?.flightitineraries[0]?.departure_location || ""}
                  </Typography>
                </div>

                <div style={{ marginTop: "50px" }}>
                  <ArrowRightAltIcon />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    maxWidth: "250px",
                    textAlign: "start",
                  }}
                >
                  <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {" "}
                    {moment(item?.flightitineraries[0]?.arrival_at).format(
                      "DD MMM YYYY"
                    ) || ""}
                  </Typography>

                  <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item?.flightitineraries[0]?.arrival_time || ""}
                  </Typography>

                  <Typography style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item?.flightitineraries[0]?.arrival_code || ""}
                  </Typography>

                  <Typography style={{ fontSize: "14px" }}>
                    {item?.flightitineraries[0]?.arrival_airport || ""}
                  </Typography>

                  <Typography style={{ fontSize: "14px" }}>
                    {item?.flightitineraries[0]?.arrival_location || ""}
                  </Typography>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: "0.2px solid #d3d1ce",
                marginTop: "50px",
                marginBottom: "20px",
                opacity: "0.4",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography>
                  <span
                    style={{
                      color: "blue",
                      fontWeight: "bold",
                      marginRight: "20px",
                    }}
                  >
                    Depart
                  </span>{" "}
                  {item?.flightitineraries[0]?.departure_code} -{" "}
                  {item?.flightitineraries[0]?.arrival_code}
                </Typography>
                {moment(item?.flightitineraries[0]?.arrival_at).format(
                  "ddd DD MMM YYYY"
                ) || ""}

                <Typography>
                  {item?.flightitineraries[0]?.duration_text || ""}
                </Typography>
              </div>

              <Button
                style={{
                  backgroundColor: "#00366f",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
                onClick={() => updateCartFlightList(item)}
              >
                Add To Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default FlightList;
