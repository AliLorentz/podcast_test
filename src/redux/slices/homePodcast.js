import { createSlice } from "@reduxjs/toolkit";
// utils
import { dispatch } from "../store";

import axios from 'axios';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  data: [],
  dataPodcast: []
};

const slice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setDataOriginHome(state, action) {
      state.data = action.payload
    },
    setDataHome(state, action) {
      state.dataPodcast = action.payload
    }
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function searchDataPodcast(word = '', data = {}) {

  return () => {
    if(word.length<=0){
      dispatch(slice.actions.setDataHome(data))
    }

    const results = data.filter(person => person.title.label.startsWith(word) || person['im:artist'].label.startsWith(word))
    dispatch(slice.actions.setDataHome(results))
  }
}

export function setDataHome() {
  return async () => {
    const result = await axios(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    );
    dispatch(slice.actions.setLoading(false))
    dispatch(slice.actions.setDataOriginHome(result.data.feed.entry))
    dispatch(slice.actions.setDataHome(result.data.feed.entry))

  }
}

export function setLoading(value = true) {
  return () => {
    dispatch(slice.actions.setLoading(value))
  }
}
