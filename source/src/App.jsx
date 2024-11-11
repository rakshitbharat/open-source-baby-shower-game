import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import FloatingIcons from "./components/FloatingIcons";
import LanguageSelector from "./components/LanguageSelector";
import WelcomeCard from "./components/WelcomeCard";
import FloatingInstructionButton from "./components/FloatingInstructionButton";
import { storage, STORAGE_KEYS } from "./utils/storage";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/HomePage";
import ControlPanel from "./pages/ControlPanel";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase/config";

// Create an AppContent component that will use the navigation hooks
const AppContent = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showFloatingInstruction, setShowFloatingInstruction] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const showResultPage = useSelector((state) => state.results.showResultPage);
  // Add Firebase listener for voting screen state
  useEffect(() => {
    // Don't redirect if on control panel or event invitation
    if (
      location.pathname === "/control-panel" ||
      location.pathname === "/event-invitation"
    ) {
      return;
    }

    const resultsRef = ref(database, "results");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.showGameStarted === false) {
        // Use the environment variable for redirect URL
        window.location.href = import.meta.env.VITE_REDIRECT_URL;
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [location.pathname]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    storage.set(STORAGE_KEYS.WELCOME_SHOWN, true);
    navigate("/vote");
  };

  const handleGoHome = () => {
    setShowWelcome(false);
    navigate("/");
  };

  const handleShowInstructions = () => {
    setShowWelcome(true);
  };

  useEffect(() => {
    const hasSeenWelcome = storage.get(STORAGE_KEYS.WELCOME_SHOWN);
    const currentPath = location.pathname;

    // Only show welcome card on homepage and vote page if not previously shown
    if (!hasSeenWelcome && (currentPath === "/" || currentPath === "/vote")) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }

    window.addEventListener("show-instructions", handleShowInstructions);
    return () =>
      window.removeEventListener("show-instructions", handleShowInstructions);
  }, []);

  useEffect(() => {
    // Control floating instruction visibility
    setShowFloatingInstruction(
      location.pathname !== "/control-panel" &&
        location.pathname !== "/event-invitation"
    );

    // Only show language selector on home page and hide on event-invitation
    setShowLanguageSelector(
      location.pathname === "/" && location.pathname !== "/event-invitation"
    );

    // Update welcome card visibility when route changes
    const hasSeenWelcome = storage.get(STORAGE_KEYS.WELCOME_SHOWN);
    if (
      !hasSeenWelcome &&
      (location.pathname === "/" || location.pathname === "/vote")
    ) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      showResultPage &&
      (location.pathname === "/" || location.pathname === "/vote")
    ) {
      setShowWelcome(false);
      navigate("/results");
    }
  }, [showResultPage, location.pathname, navigate]);

  return (
    <AppContainer>
      <AnimatedBackground />
      <FloatingIconsWrapper>
        <FloatingIcons />
      </FloatingIconsWrapper>
      {showFloatingInstruction && (
        <FloatingInstructionButton onClick={handleShowInstructions} />
      )}

      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/control-panel" element={<ControlPanel />} />
        </Routes>
      </MainContent>

      {showLanguageSelector && <BottomLanguageSelector />}
      {showWelcome && (
        <WelcomeCard onClose={handleCloseWelcome} onGoHome={handleGoHome} />
      )}
    </AppContainer>
  );
};

// Main App component that provides the Router context
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 800px;
  z-index: 10;
  position: relative;
  margin: 0 auto;
`;

const FloatingIconsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
`;

const BottomLanguageSelector = styled(LanguageSelector)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
`;

export default App;
