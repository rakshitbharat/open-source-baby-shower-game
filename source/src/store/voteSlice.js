import { createSlice } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "../utils/storage";

const loadInitialState = () => {
  const savedState = storage.get(STORAGE_KEYS.VOTE_STATE);
  return (
    savedState || {
      selectedGender: null,
      hasVoted: false,
      uuid: storage.getUUID(),
      timestamp: null,
    }
  );
};

const initialState = loadInitialState();

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    selectGender: (state, action) => {
      state.selectedGender = action.payload;
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    submitVote: (state) => {
      state.hasVoted = true;
      state.timestamp = Date.now();
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    resetVote: (state) => {
      state.selectedGender = null;
      state.hasVoted = false;
      state.timestamp = null;
      state.uuid = storage.getUUID();
      storage.set(STORAGE_KEYS.VOTE_STATE, state);
    },
    setFirebaseDeleteStatus: (state, action) => {
      state.firebaseDeleteStatus = action.payload;
    },
  },
});

export const { selectGender, submitVote, resetVote, setFirebaseDeleteStatus } =
  voteSlice.actions;
export default voteSlice.reducer;
