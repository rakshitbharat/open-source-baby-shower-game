import {
  ref,
  onValue,
  set,
  push,
  get,
  remove,
  runTransaction,
} from "firebase/database";
import { getDatabase } from "firebase/database";
import { database } from "./config";

export const initializeFirebaseListeners = (store) => {
  const userUUID = store.getState().vote.uuid;
  const userVoteRef = ref(database, `userVotes/${userUUID}`);
  const userVotesRef = ref(database, "userVotes");

  // Listen only to user's own vote
  onValue(userVoteRef, (snapshot) => {
    const vote = snapshot.val();
    if (vote) {
      store.dispatch({
        type: "vote/syncFromFirebase",
        payload: vote,
      });
    }
  });

  // Listen to all votes and calculate counts
  onValue(userVotesRef, (snapshot) => {
    const votes = snapshot.val() || {};
    const counts = Object.values(votes).reduce(
      (acc, vote) => {
        if (vote.selectedGender) {
          acc[vote.selectedGender.toLowerCase()]++;
        }
        return acc;
      },
      { boy: 0, girl: 0 }
    );

    store.dispatch({
      type: "results/updateVoteCounts",
      payload: counts,
    });
  });

  // Listen for results changes
  const resultsRef = ref(database, "results");
  onValue(resultsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Update to include showGameStarted state
      const screenStates = {
        showResultPage: data.showResultPage ?? false,
        showVotingScreen: data.showVotingScreen ?? false,
        showGameStarted: data.showGameStarted ?? false,
      };

      store.dispatch({
        type: "results/syncFromFirebase",
        payload: {
          ...screenStates,
          voteCounts: store.getState().results.voteCounts,
          loading: store.getState().results.loading,
          error: store.getState().error,
        },
      });
    }
  });
};

export const firebaseMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Handle vote submissions
  if (action.type === "vote/submitVote") {
    const userUUID = state.vote.uuid;
    const userVoteRef = ref(database, `userVotes/${userUUID}`);

    const handleVoteUpdate = async () => {
      try {
        // Check if user has already voted
        const existingVoteSnapshot = await get(userVoteRef);
        if (existingVoteSnapshot.exists()) {
          console.log("User has already voted");
          return;
        }

        // Save user's vote
        await set(userVoteRef, {
          uuid: userUUID,
          selectedGender: state.vote.selectedGender,
          hasVoted: true,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Error updating vote:", error);
      }
    };

    handleVoteUpdate();
  }

  // Handle results updates (screen states, etc.)
  if (
    action.type.startsWith("results/") &&
    action.type !== "results/syncFromFirebase" &&
    action.type !== "results/updateVoteCounts"
  ) {
    const resultsRef = ref(database, "results");
    const resultsState = {
      showResultPage: state.results.showResultPage,
      showVotingScreen: state.results.showVotingScreen,
      showGameStarted: state.results.showGameStarted,
    };

    // Update screen states in Firebase
    set(resultsRef, resultsState);
  }

  return result;
};

export const firebase = {
  deleteUserVotes: async () => {
    try {
      const userVotesRef = ref(database, "userVotes");
      // Simply remove all user votes - counts will update automatically
      await remove(userVotesRef);
      return true;
    } catch (error) {
      console.error("Error deleting user votes:", error);
      throw error;
    }
  },
};

// Make sure your Firebase initialization is correct
const db = getDatabase();
