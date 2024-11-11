import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  setShowResultPage,
  setShowVotingScreen,
  resetResults,
  setShowGameStarted,
} from "../store/resultsSlice";
import {
  setResetConfirmationOpen,
  setResetSuccessShow,
} from "../store/uiSlice";
import { BabyGirlIcon, BabyBoyIcon } from "../components/GenderIcons";
import ResetConfirmation from "../components/ResetConfirmation";
import { db } from "../firebase/config";
import { ref, get, set } from "firebase/database";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const { voteCounts, showResultPage, showVotingScreen, showGameStarted } =
    useSelector((state) => state.results);
  const { resetConfirmation } = useSelector((state) => state.ui);
  const [manualAdjustments, setManualAdjustments] = useState({
    boy: 0,
    girl: 0,
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        const snapshot = await get(ref(db, "gameState"));
        console.log("Firebase connected! Current data:", snapshot.val());

        await set(ref(db, "gameState/test"), {
          timestamp: new Date().toISOString(),
          message: "Test connection successful",
        });
        console.log("Firebase write test successful!");
      } catch (error) {
        console.error("Firebase connection error:", error);
      }
    };

    testConnection();
  }, []);

  useEffect(() => {
    const fetchInitialStates = async () => {
      try {
        const resultsRef = ref(db, "results");
        const snapshot = await get(resultsRef);
        const data = snapshot.val();

        if (data) {
          dispatch(setShowResultPage(data.showResultPage ?? false));
          dispatch(setShowVotingScreen(data.showVotingScreen ?? false));
          dispatch(setShowGameStarted(data.showGameStarted ?? false));
        }
      } catch (error) {
        console.error("Error fetching initial states:", error);
      }
    };

    fetchInitialStates();
  }, [dispatch]);

  useEffect(() => {
    const fetchManualAdjustments = async () => {
      try {
        const adjustmentsRef = ref(db, "manualAdjustments");
        const snapshot = await get(adjustmentsRef);
        if (snapshot.exists()) {
          setManualAdjustments(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching manual adjustments:", error);
      }
    };

    fetchManualAdjustments();
  }, []);

  const handleManualVoteChange = async (gender, value) => {
    const numValue = parseInt(value) || 0;
    try {
      const adjustmentsRef = ref(db, "manualAdjustments");
      const newAdjustments = {
        ...manualAdjustments,
        [gender]: numValue,
      };

      await set(adjustmentsRef, newAdjustments);
      setManualAdjustments(newAdjustments);
    } catch (error) {
      console.error("Error updating manual adjustments:", error);
    }
  };

  const calculateTotalVotes = () => {
    return {
      boy: voteCounts.boy,
      girl: voteCounts.girl,
    };
  };

  const handleVisibilityToggle = (action, currentValue) => {
    const newValue = !currentValue;

    switch (action) {
      case "result":
        dispatch(setShowResultPage(newValue));
        break;
      case "voting":
        dispatch(setShowVotingScreen(newValue));
        break;
      case "gameStarted":
        dispatch(setShowGameStarted(newValue));
        break;
    }
  };

  const handleReset = () => {
    dispatch(setResetConfirmationOpen(true));
  };

  const handleConfirmReset = () => {
    dispatch(resetResults());
    dispatch(setResetConfirmationOpen(false));
    dispatch(setResetSuccessShow(true));
    setTimeout(() => {
      dispatch(setResetSuccessShow(false));
    }, 3000);
  };

  const handleResetCancel = () => {
    dispatch(setResetConfirmationOpen(false));
  };

  return (
    <>
      <Container
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <ContentCard>
          <Title
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            Game Control Panel
          </Title>

          <ResetSection
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            <ResetButton
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(231, 76, 60, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
            >
              <ResetButtonContent>
                <ResetIcon>↺</ResetIcon>
                Reset Game
              </ResetButtonContent>
            </ResetButton>
            <ResetDescription>This will reset all votes</ResetDescription>
          </ResetSection>

          <Section>
            <SectionTitle>
              <span>Manual Vote Adjustments</span>
            </SectionTitle>
            <VoteAdjustmentGrid>
              <VoteCard
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconWrapper boy>
                  <BabyBoyIcon />
                </IconWrapper>
                <VoteControls>
                  <VoteButton
                    onClick={() =>
                      handleManualVoteChange("boy", manualAdjustments.boy - 1)
                    }
                  >
                    -
                  </VoteButton>
                  <VoteInput
                    type="number"
                    value={manualAdjustments.boy}
                    onChange={(e) =>
                      handleManualVoteChange("boy", e.target.value)
                    }
                  />
                  <VoteButton
                    onClick={() =>
                      handleManualVoteChange("boy", manualAdjustments.boy + 1)
                    }
                  >
                    +
                  </VoteButton>
                </VoteControls>
              </VoteCard>

              <VoteCard
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconWrapper girl>
                  <BabyGirlIcon />
                </IconWrapper>
                <VoteControls>
                  <VoteButton
                    onClick={() =>
                      handleManualVoteChange("girl", manualAdjustments.girl - 1)
                    }
                  >
                    -
                  </VoteButton>
                  <VoteInput
                    type="number"
                    value={manualAdjustments.girl}
                    onChange={(e) =>
                      handleManualVoteChange("girl", e.target.value)
                    }
                  />
                  <VoteButton
                    onClick={() =>
                      handleManualVoteChange("girl", manualAdjustments.girl + 1)
                    }
                  >
                    +
                  </VoteButton>
                </VoteControls>
              </VoteCard>
            </VoteAdjustmentGrid>
          </Section>

          <Section>
            <SectionTitle>
              <span>Screen Controls</span>
            </SectionTitle>
            <ControlsGrid>
              {[
                {
                  label: "Result Page",
                  key: "result",
                  value: showResultPage,
                },
                {
                  label: "Voting Screen",
                  key: "voting",
                  value: showVotingScreen,
                },
                {
                  label: "Game Started",
                  key: "gameStarted",
                  value: showGameStarted,
                },
              ].map((screen) => (
                <ControlCard
                  key={screen.key}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ControlLabel>{screen.label}</ControlLabel>
                  <ToggleSwitch
                    isOn={screen.value}
                    onClick={() =>
                      handleVisibilityToggle(screen.key, screen.value)
                    }
                  />
                </ControlCard>
              ))}
            </ControlsGrid>
          </Section>

          {resetConfirmation.showSuccess && (
            <SuccessNotification
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Game has been successfully reset!
            </SuccessNotification>
          )}
        </ContentCard>
      </Container>

      <ResetConfirmation
        isOpen={resetConfirmation.isOpen}
        onClose={handleResetCancel}
        onConfirm={handleConfirmReset}
        totalVotes={calculateTotalVotes()}
      />
    </>
  );
};

// Styled Components
const Container = styled(motion.div)`
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #b666d2;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #4b3f6b;
  font-weight: 600;
  display: inline-block;
  position: relative;
  padding-bottom: 8px;

  span {
    background: linear-gradient(120deg, #b666d2, #4b3f6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #b666d2 30%, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding-bottom: 6px;

    &::after {
      height: 1.5px;
    }
  }
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ControlCard = styled(motion.div)`
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
  }
`;

const ControlLabel = styled.span`
  font-size: 0.9rem;
  color: #4b3f6b;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: ${(props) => (props.isOn ? "#B666D2" : "#E0E0E0")};
  border-radius: 10px;
  padding: 2px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${(props) => (props.isOn ? "22px" : "2px")};
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 18px;

    &:after {
      width: 14px;
      height: 14px;
      left: ${(props) => (props.isOn ? "20px" : "2px")};
    }
  }
`;

const ResetSection = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(231, 76, 60, 0.05);
  border-radius: 16px;
  border: 1px dashed rgba(231, 76, 60, 0.3);

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding: 0.75rem;
  }
`;

const ResetButton = styled(motion.button)`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: auto;
  min-width: 200px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    min-width: 180px;
    font-size: 1rem;
    padding: 0.8rem 2rem;
  }
`;

const ResetButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ResetIcon = styled.span`
  font-size: 1.3rem;
  display: inline-block;
  transition: transform 0.3s ease;

  ${ResetButton}:hover & {
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ResetDescription = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  opacity: 0.8;
  font-weight: 500;
`;

const SuccessNotification = styled(motion.div)`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-weight: 500;
`;

const VoteAdjustmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const VoteCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  color: ${(props) => (props.boy ? "#1E88E5" : "#FF69B4")};
  margin-bottom: 0.5rem;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 0.25rem;
  }
`;

const VoteControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const VoteButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #b666d2;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(182, 102, 210, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
  }
`;

const VoteInput = styled.input`
  width: 60px;
  height: 36px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  outline: none;

  &:focus {
    border-color: #b666d2;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 32px;
    font-size: 1rem;
  }
`;

export default ControlPanel;
