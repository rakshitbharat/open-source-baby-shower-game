import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useTranslation } from "../hooks/useTranslation";
import { useWindowSize } from "react-use";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetResults } from "../store/resultsSlice";
import { resetUi } from "../store/uiSlice";
import { Link } from "react-router-dom";

const VoteConfirmation = ({ selected }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();

  const handleResetForNext = () => {
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetResults());
    dispatch(resetUi());
    window.location.reload();
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          run={true}
        />
        <ConfirmationCard
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <IconWrapper
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
            }}
          >
            {selected === "boy" ? "👶" : "👧"}
          </IconWrapper>
          <MessageText
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.4 },
            }}
          >
            {t("confirmation.thanks")}
          </MessageText>
          <SubText
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.6 },
            }}
          >
            {t("confirmation.registered")}
          </SubText>
          <StyledLink to="/results">{t("results.showResults")}</StyledLink>
          <ResetButton
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetForNext}
          >
            {t("confirmation.resetForNext")}
          </ResetButton>
        </ConfirmationCard>
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
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ConfirmationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const IconWrapper = styled(motion.div)`
  font-size: 4rem;
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const MessageText = styled(motion.h2)`
  font-size: 1.8rem;
  color: #333;
  margin: 0;
`;

const SubText = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  margin-top: 1rem;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ResetButton = styled(motion.button)`
  background: #28a745;
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

export default VoteConfirmation;
