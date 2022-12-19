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
    console.log(word)
    if (word.length <= 1) {
      dispatch(slice.actions.setDataHome(data))
    }

    const results = data.filter(person => person.title.label.startsWith(word) || person['im:artist'].label.startsWith(word))
    dispatch(slice.actions.setDataHome(results))
  }
}

export function setDataHome() {
  return async () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem('home')) || {day:'Mon Dec 19 1998 01:06:49 GMT+0100 (hora estándar de Europa central)',data:[]}
    const today = new Date();
    const beforeDay =new Date(dataLocalStorage.day);
    const timeDifference = today.getTime() - beforeDay.getTime();
    const days = timeDifference / 86400000;

    if (days >= 1) {
      const result = await axios(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      );
      dispatch(slice.actions.setLoading(false))
      dispatch(slice.actions.setDataOriginHome(result.data.feed.entry))
      dispatch(slice.actions.setDataHome(result.data.feed.entry))
      localStorage.setItem("home", JSON.stringify({ day: today, data: result.data.feed.entry }))
    } else {
      dispatch(slice.actions.setLoading(false))
      dispatch(slice.actions.setDataOriginHome(dataLocalStorage.data))
      dispatch(slice.actions.setDataHome(dataLocalStorage.data))
    }
  }
}

export function setLoading(value = true) {
  return () => {
    dispatch(slice.actions.setLoading(value))
  }
}
