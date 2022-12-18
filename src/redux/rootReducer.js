import { combineReducers } from "redux";
//import storage from "redux-persist/lib/storage";
// slices
import podcastReducer from './slices/podcast';
import homePodcastReducer from './slices/homePodcast';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  podcast: podcastReducer,
  home: homePodcastReducer
});



export { rootPersistConfig, rootReducer };
