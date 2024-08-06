import { Box, Typography } from "@mui/material";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./user/Login";
import SignUp from "./user/SignUp";

function Copyright() {  //footer 컴포넌트
  return(
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright @ "}
      todotest..... , {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function AppRouter() {

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );

}

export default AppRouter;
// 테스트