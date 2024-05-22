import { createSlice } from "@reduxjs/toolkit";

const getbaseUrlReducer = createSlice({
  name: "baseUrl",
  initialState: { url: "http://139.59.55.80:5000" },
});

export default getbaseUrlReducer;
