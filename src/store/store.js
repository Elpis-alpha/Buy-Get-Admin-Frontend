import { configureStore } from "@reduxjs/toolkit";

import messagesSlice from "./slice/messagesSlice";

import displaySlice from "./slice/displaySlice";

import querySlice from "./slice/querySlice";



const store = configureStore({

  reducer: {

    messages: messagesSlice,

    display: displaySlice,

    query: querySlice,

  }

});


export default store;