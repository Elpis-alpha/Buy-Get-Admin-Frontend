import { createSlice } from '@reduxjs/toolkit'

const querySlice = createSlice({

  name: "query",

  initialState: {

    queryObject: {},

    active: false,

  },

  reducers: {

    setQueryObject: (state, { payload }) => {

      state.queryObject = payload

      state.active = true

    },
  },

})

export default querySlice.reducer;

export const { setQueryObject } = querySlice.actions
