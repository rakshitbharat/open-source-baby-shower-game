import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  voteCounts: {
    boy: 0,
    girl: 0,
  },
  showResultPage: false,
  showVotingScreen: false,
  showGameStarted: false,
  loading: false,
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    updateVoteCounts: (state, action) => {
      state.voteCounts = {
        boy: action.payload.boy,
        girl: action.payload.girl,
      };
    },
    setShowResultPage: (state, action) => {
      state.showResultPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setShowVotingScreen: (state, action) => {
      state.showVotingScreen = action.payload;
    },
    syncFromFirebase: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
          voteCounts: state.voteCounts,
        };
      }
      return state;
    },
    setShowGameStarted: (state, action) => {
      state.showGameStarted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetResults, (state) => {
      state.voteCounts = {
        boy: 0,
        girl: 0,
      };
    });
  },
});

export const {
  updateVoteCounts,
  setShowResultPage,
  setLoading,
  setError,
  setShowVotingScreen,
  syncFromFirebase,
  setShowGameStarted,
} = resultsSlice.actions;

export const resetResults = createAction("results/resetResults");

export default resultsSlice.reducer;
