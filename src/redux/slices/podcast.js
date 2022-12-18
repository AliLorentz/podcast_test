import { createSlice } from "@reduxjs/toolkit";
// utils
import { dispatch } from "../store";
// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
};

const slice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function setLoading(value = true) {
  return () => {
    dispatch(slice.actions.setLoading(value))
  }
}
