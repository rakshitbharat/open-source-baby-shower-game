import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BabyGirlIcon, BabyBoyIcon } from "./GenderIcons";
import { useDispatch } from "react-redux";
import { setFirebaseDeleteStatus } from "../store/voteSlice";
import { firebase } from "../firebase/firebaseMiddleware";

const ResetConfirmation = ({ isOpen, onClose, onConfirm, totalVotes }) => {
  const dispatch = useDispatch();
  const [confirmText, setConfirmText] = React.useState("");
  const isConfirmEnabled = confirmText.toLowerCase() === "reset";

  const handleReset = async () => {
    try {
      // Delete the vote document using the firebase middleware
      await firebase.deleteUserVotes();
      dispatch(setFirebaseDeleteStatus("success"));

      // Call the original onConfirm handler
      onConfirm();
    } catch (error) {
      console.error("Error deleting Firebase document:", error);
      dispatch(setFirebaseDeleteStatus("error"));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modal
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <IconWrapper>
            <WarningIcon>⚠️</WarningIcon>
          </IconWrapper>

          <Title>Reset Game</Title>

          <Content>
            <Description>
              Are you sure you want to reset all game data? This action will:
            </Description>

            <ActionList>
              <ActionItem>
                <Bullet>•</Bullet>
                Reset all vote counts to zero
              </ActionItem>
            </ActionList>

            <VoteSummary>
              <SummaryTitle>Current Vote Summary</SummaryTitle>
              <ScreenshotTip>
                📸 Tip: Take a screenshot of the current results before
                resetting!
              </ScreenshotTip>
              <VoteGrid>
                <VoteItem>
                  <IconContainer boy>
                    <BabyBoyIcon />
                  </IconContainer>
                  <VoteLabel>Boy Votes</VoteLabel>
                  <VoteCount boy>{totalVotes.boy}</VoteCount>
                </VoteItem>
                <VoteItem>
                  <IconContainer girl>
                    <BabyGirlIcon />
                  </IconContainer>
                  <VoteLabel>Girl Votes</VoteLabel>
                  <VoteCount girl>{totalVotes.girl}</VoteCount>
                </VoteItem>
              </VoteGrid>
            </VoteSummary>

            <ConfirmInputSection>
              <ConfirmLabel>Type "RESET" to confirm:</ConfirmLabel>
              <ConfirmInput
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type RESET"
                autoFocus
              />
            </ConfirmInputSection>

            <Warning>
              <WarningIcon small>⚠️</WarningIcon>
              This action cannot be undone!
            </Warning>
          </Content>

          <ButtonGroup>
            <CancelButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Cancel
            </CancelButton>
            <ConfirmButton
              disabled={!isConfirmEnabled}
              whileHover={
                isConfirmEnabled
                  ? {
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(231, 76, 60, 0.5)",
                    }
                  : {}
              }
              whileTap={isConfirmEnabled ? { scale: 0.95 } : {}}
              onClick={handleReset}
            >
              <ResetButtonContent>
                <ResetIcon>↺</ResetIcon>
                Reset Game
              </ResetButtonContent>
            </ConfirmButton>
          </ButtonGroup>
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Modal = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  width: 85%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 1rem;
  overflow-y: auto;
  max-height: 90vh;
`;

const IconWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const WarningIcon = styled.span`
  font-size: ${(props) => (props.small ? "1rem" : "2rem")};
  margin-right: ${(props) => (props.small ? "0.3rem" : "0")};
`;

const Title = styled.h2`
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Content = styled.div`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #4b3f6b;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ActionList = styled.div`
  margin: 1rem 0;
  text-align: left;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  color: #4b3f6b;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const Bullet = styled.span`
  color: #e74c3c;
  margin-right: 0.5rem;
  font-size: 1.2rem;
`;

const VoteSummary = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    rgba(231, 76, 60, 0.05) 0%,
    rgba(192, 57, 43, 0.05) 100%
  );
  border-radius: 12px;
  border: 1px dashed rgba(231, 76, 60, 0.3);
`;

const SummaryTitle = styled.h3`
  color: #4b3f6b;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const VoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const VoteItem = styled.div`
  text-align: center;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const VoteLabel = styled.div`
  color: #4b3f6b;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const VoteCount = styled.div`
  color: ${(props) => (props.boy ? "#1E88E5" : "#FF69B4")};
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Warning = styled.p`
  color: #e74c3c;
  font-weight: 500;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
`;

const CancelButton = styled(Button)`
  background: #f5f5f5;
  color: #4b3f6b;

  &:hover {
    background: #e0e0e0;
  }
`;

const ConfirmButton = styled(Button)`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: ${(props) => (props.disabled ? 0 : 1)};
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto 0.3rem;
  color: ${(props) => (props.boy ? "#1E88E5" : "#FF69B4")};

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const ResetButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ResetIcon = styled.span`
  display: inline-block;

  ${ConfirmButton}:hover & {
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

const ScreenshotTip = styled.div`
  color: #666;
  font-size: 0.8rem;
  margin: 0.3rem 0;
  padding: 0.3rem;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

const ConfirmInputSection = styled.div`
  margin: 1rem 0;
  text-align: center;
`;

const ConfirmLabel = styled.label`
  display: block;
  color: #4b3f6b;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ConfirmInput = styled.input`
  width: 180px;
  padding: 0.5rem;
  border: 2px solid
    ${(props) =>
      props.value.toLowerCase() === "reset" ? "#2ecc71" : "#e74c3c"};
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.value.toLowerCase() === "reset"
          ? "rgba(46, 204, 113, 0.2)"
          : "rgba(231, 76, 60, 0.2)"};
  }
`;

export default ResetConfirmation;
