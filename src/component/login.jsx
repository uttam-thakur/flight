import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const apiUrl = "https://devadmin.altabooking.com/api/v2/auth/login";
      const encryptionKey = "aLtAeNCrypT";

      const encryptedRequest = encryptRequestBody(
        {
          email: email,
          password: password,
        },
        encryptionKey
      );

      const headers = {
        "Content-Type": "application/json",
        apikey: "indusAltaR2PSM",
        currency:
          "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==",
      };

      const response = await axios.post(
        apiUrl,
        { request_data: encryptedRequest },
        { headers }
      );

      if (response.status === 200) {
        const decryptedResponse = decryptResponse(response.data, encryptionKey);
        console.log("Decrypted Response:", decryptedResponse);
        localStorage.setItem("token", response.data.response_data);
        navigate("/flight");
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const encryptRequestBody = (data, key) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encryptedData;
  };

  const decryptResponse = (data, key) => {
    try {
      if (!data) {
        console.error("Empty or undefined data for decryption");
        return null;
      }

      const decryptedText = CryptoJS.AES.decrypt(data, key).toString(
        CryptoJS.enc.Utf8
      );

      if (!decryptedText || decryptedText.trim() === "") {
        console.error("Decrypted data is not a valid JSON string");
        return null;
      }

      const decryptedData = JSON.parse(decryptedText);
      return decryptedData;
    } catch (error) {
      console.error("Error during decryption:", error);
      return null;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Email</InputLabel>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                margin="normal"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Password</InputLabel>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                margin="normal"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              disabled={!email || !password} // Disable the button if email or password is empty
            >
              Login
            </Button>

            <Grid item style={{ marginLeft: "10px" }}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
