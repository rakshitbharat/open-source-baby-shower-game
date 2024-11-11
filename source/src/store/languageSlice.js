import { createSlice } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "../utils/storage";

// Get initial language from storage or default to english
const getInitialLanguage = () => {
  const savedLanguage = storage.get(STORAGE_KEYS.LANGUAGE);
  return savedLanguage || "english";
};

const initialState = {
  currentLanguage: getInitialLanguage(),
  availableLanguages: ["english", "gujarati"],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      // Save to storage when language changes
      storage.set(STORAGE_KEYS.LANGUAGE, action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
