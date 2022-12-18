import { combineReducers } from "redux";
//import storage from "redux-persist/lib/storage";
// slices
import podcastReducer from './slices/podcast'

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  podcast : podcastReducer
});



export { rootPersistConfig,rootReducer };
