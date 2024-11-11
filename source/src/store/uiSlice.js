import { createSlice, createAction } from "@reduxjs/toolkit";

export const resetUi = createAction("ui/reset");

const initialState = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  animations: {
    isConfettiActive: false,
    particleIntensity: 0.5,
    wordAnimation: {
      delay: 0.2,
      duration: 0.6,
      stiffness: 100,
      damping: 10,
    },
    floatingAnimation: {
      duration: 4,
      delay: 0.8,
    },
  },
  theme: {
    colors: {
      girl: "#ff69b4",
      boy: "#4169e1",
      neutral: "#8a2be2",
      success: "#00ff00",
      gradients: {
        disabled: "linear-gradient(135deg, #cccccc, #999999)",
        active: "linear-gradient(135deg, #ff69b4, #4169e1)",
        title: "linear-gradient(135deg, #667eea, #764ba2)",
      },
    },
    backgroundOpacity: 0.18,
    blurIntensity: 8,
    shadows: {
      default: "0 4px 15px rgba(0, 0, 0, 0.2)",
      hover: "0 10px 40px rgba(0, 0, 0, 0.3)",
    },
  },
  layout: {
    maxWidth: {
      content: "800px",
      card: "400px",
    },
    spacing: {
      small: "1rem",
      medium: "2rem",
      large: "3rem",
    },
    borderRadius: {
      small: "12px",
      medium: "20px",
      large: "50px",
    },
  },
  resetConfirmation: {
    isOpen: false,
    showSuccess: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setWindowSize: (state, action) => {
      state.windowSize = action.payload;
    },
    setConfettiActive: (state, action) => {
      state.animations.isConfettiActive = action.payload;
    },
    setParticleIntensity: (state, action) => {
      state.animations.particleIntensity = action.payload;
    },
    updateThemeColors: (state, action) => {
      state.theme.colors = { ...state.theme.colors, ...action.payload };
    },
    updateAnimationSettings: (state, action) => {
      state.animations = { ...state.animations, ...action.payload };
    },
    updateLayout: (state, action) => {
      state.layout = { ...state.layout, ...action.payload };
    },
    setResetConfirmationOpen: (state, action) => {
      state.resetConfirmation.isOpen = action.payload;
    },
    setResetSuccessShow: (state, action) => {
      state.resetConfirmation.showSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUi, (state) => {
      return initialState;
    });
  },
});

export const {
  setWindowSize,
  setConfettiActive,
  setParticleIntensity,
  updateThemeColors,
  updateAnimationSettings,
  updateLayout,
  setResetConfirmationOpen,
  setResetSuccessShow,
} = uiSlice.actions;
export default uiSlice.reducer;
