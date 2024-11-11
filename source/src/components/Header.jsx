import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "../hooks/useTranslation";

const Header = () => {
  const { t } = useTranslation();
  const { selectedGender, hasVoted } = useSelector((state) => state.vote);

  const getVotingStage = () => {
    if (hasVoted) return "submitted";
    if (selectedGender) return "selected";
    return "initial";
  };

  const votingStage = getVotingStage();

  const wordAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const getMessageColor = (stage, gender) => {
    switch (stage) {
      case "selected":
        return gender === "girl" ? "#ff69b4" : "#4169e1";
      case "submitted":
        return "#4caf50";
      default:
        return "#666";
    }
  };

  const getMessage = () => {
    try {
      if (votingStage === "initial") {
        return (
          t("header.messages.initial") || "Please select a gender prediction"
        );
      }
      if (votingStage === "selected" && selectedGender) {
        const message = t(`header.messages.selected.${selectedGender}`);
        return (
          message ||
          `You predicted it's a ${selectedGender}! Click submit to confirm.`
        );
      }
      if (votingStage === "submitted" && selectedGender) {
        const message = t(`header.messages.submitted.${selectedGender}`);
        return message || `Thank you! You predicted it's a ${selectedGender}.`;
      }
      return (
        t("header.messages.initial") || "Please select a gender prediction"
      );
    } catch (error) {
      console.error("Translation error:", error);
      return "Please select a gender prediction";
    }
  };

  const titleWords = t("header.title").split(" ");

  return (
    <HeaderContainer>
      <ContentWrapper>
        <Title>
          {titleWords.map((word, wordIndex) => (
            <WordWrapper
              key={wordIndex}
              as={motion.span}
              initial="hidden"
              animate="visible"
              variants={wordAnimation}
              custom={wordIndex}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              {word}
            </WordWrapper>
          ))}
        </Title>
        <MessageContainer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StyledMessage
            style={{ color: getMessageColor(votingStage, selectedGender) }}
          >
            {getMessage()}
          </StyledMessage>
        </MessageContainer>
      </ContentWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  text-align: center;
  padding: clamp(1rem, 3vw, 1.5rem) clamp(0.8rem, 2vw, 1.2rem);
  position: relative;
  overflow: hidden;
  border-radius: clamp(16px, 4vw, 24px);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: min(0.8rem, 2vw);
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  gap: clamp(0.4rem, 1.5vw, 0.8rem);
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const WordWrapper = styled(motion.span)`
  display: inline-block;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 900;
  background: linear-gradient(
    135deg,
    rgba(255, 105, 180, 0.9) 0%,
    rgba(65, 105, 225, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15),
    -1px -1px 0 rgba(255, 255, 255, 0.2);
  cursor: pointer;
  line-height: 1.2;
  letter-spacing: 0.5px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
  font-family: "Poppins", sans-serif;
  margin: 0 clamp(0.4rem, 1.5vw, 0.8rem);

  @media (max-width: 480px) {
    letter-spacing: 0.2px;
  }
`;

const MessageContainer = styled(motion.div)`
  margin: 0;
  padding: 0;
`;

const StyledMessage = styled.p`
  font-size: clamp(0.9rem, 3vw, 1rem);
  font-weight: 600;
  padding: clamp(0.6rem, 2vw, 1rem) clamp(1.2rem, 4vw, 1.8rem);
  border-radius: clamp(12px, 3vw, 20px);
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  max-width: clamp(280px, 90%, 500px);
  margin: 0;
  letter-spacing: 0.3px;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 3.5vw, 0.9rem);
    padding: 0.5rem 1rem;
    letter-spacing: 0.2px;
  }
`;

export default Header;
