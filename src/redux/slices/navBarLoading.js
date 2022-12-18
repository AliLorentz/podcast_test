import { createSlice } from "@reduxjs/toolkit";
// utils
import { dispatch } from "../store";
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
};

const slice = createSlice({
  name: "navbar",
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
export function setLoadingNavBar(value = true) {
  return () => {
    dispatch(slice.actions.setLoading(value))
  }
}
