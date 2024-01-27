import React from "react";
import "./App.css";

import { MuiAppBar } from "./components/MuiAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeviceList } from "./pages/DeviceList";
import { Home } from "./pages/Home";
import { Stack } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Stack direction={"column"} spacing={1}>
        <BrowserRouter>
          <MuiAppBar />
          <Routes>
            <Route path="/devicelist" element={<DeviceList />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </div>
  );
}

export default App;
