import React from "react";
import Header from "./header";
import { useFlightListContext } from "../Context/flightListContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import moment from "moment";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Cart = () => {
  const { cartFlightList } = useFlightListContext();
  console.log(cartFlightList);
  return (
    <>
      <Header />

      {cartFlightList?.map((item, index) => (
        <Card key={index} style={{ marginBottom: "16px" }}>
          <CardContent>
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
                    {item?.flightitineraries[0]?.departure_at || ""}
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
                    {item?.flightitineraries[0]?.arrival_at || ""}
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
              >
                Book
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Cart;
