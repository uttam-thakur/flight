import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showCartButton = location.pathname !== "/cart";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#00366f" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flight Search
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          {showCartButton ? (
            <Button color="inherit" onClick={handleAddToCart}>
              Cart
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/flight")}>
              Flight
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
