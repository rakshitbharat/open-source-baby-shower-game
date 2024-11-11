import { configureStore } from "@reduxjs/toolkit";
import voteReducer from "./voteSlice";
import languageReducer from "./languageSlice";
import uiReducer from "./uiSlice";
import resultsReducer from "./resultsSlice";
import {
  firebaseMiddleware,
  initializeFirebaseListeners,
} from "../firebase/firebaseMiddleware";

export const store = configureStore({
  reducer: {
    vote: voteReducer,
    language: languageReducer,
    ui: uiReducer,
    results: resultsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["vote/syncFromFirebase", "results/syncFromFirebase"],
      },
    }).concat(firebaseMiddleware),
});

// Initialize Firebase listeners after store creation
initializeFirebaseListeners(store);
