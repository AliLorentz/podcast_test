import { createSlice } from "@reduxjs/toolkit";
// utils
import { dispatch } from "../store";
// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  data: []
};

const slice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setData(state, action) {
      state.data = action.payload
    }
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function setData(data = {}) {
  return () => {
    dispatch(slice.actions.setLoading(false))
    dispatch(slice.actions.setData(data))

  }
}

export function setLoading(value = true) {
  return () => {
    dispatch(slice.actions.setLoading(value))
  }
}
