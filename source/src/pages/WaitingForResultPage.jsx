import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { BabyGirlIcon, BabyBoyIcon } from "../components/GenderIcons";

const WaitingForResultPage = () => {
  const { t } = useTranslation();

  return (
    <WaitingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContentWrapper>
        <AnimationContainer>
          {/* Floating Hearts */}

          {/* Baby Icons */}
          <IconsContainer>
            <BabyIcon
              boy
              animate={{
                x: [-60, 20],
                rotate: [-5, 5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <BabyBoyIcon />
            </BabyIcon>
            <BabyIcon
              girl
              animate={{
                x: [20, -90],
                rotate: [5, -5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <BabyGirlIcon />
            </BabyIcon>
            <HeartContainer>
              {[...Array(6)].map((_, i) => (
                <Heart
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    y: [-20, -100],
                    x: Math.sin(i) * 30,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                >
                  💝
                </Heart>
              ))}
            </HeartContainer>
          </IconsContainer>
        </AnimationContainer>

        <MessageText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("vote.waitingForVotesToFinish")}
        </MessageText>

        <SubText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {t("vote.votingInProgress")}
        </SubText>

        {/* Show infinite progress for voting in progress */}
        <InfiniteProgressBar
          animate={{
            x: ["0%", "300%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        />
      </ContentWrapper>
    </WaitingContainer>
  );
};

const WaitingContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: min(1.5rem, 4vw);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  width: 100%;
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AnimationContainer = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeartContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  top: 0;
`;

const Heart = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  z-index: 1;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 1;
`;

const BabyIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  color: ${(props) => (props.boy ? "#0066CC" : "#FF1493")};
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  position: relative;
  z-index: 2;
`;

const SpinnerContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  border-radius: 50%;
`;

const MessageText = styled(motion.h2)`
  font-size: min(1.8rem, 6vw);
  margin: 0;
  font-weight: 600;
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3));
`;

const SubText = styled(motion.p)`
  font-size: min(1.1rem, 4vw);
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-weight: 500;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3));
`;

const InfiniteProgressBar = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  left: -50%;
  width: 50%;
  height: 4px;
  background: linear-gradient(
    to right,
    transparent,
    #ff1493,
    #4169e1,
    transparent
  );
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(255, 20, 147, 0.4);
`;

const ErrorMessage = styled(motion.div)`
  color: #ff4d4f;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export default WaitingForResultPage;
