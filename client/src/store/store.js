import { configureStore } from "@reduxjs/toolkit";
import netflixReducer from "./features";

export default configureStore({
  reducer: {
    netflix: netflixReducer,
  },
});
