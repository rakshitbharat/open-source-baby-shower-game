import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { FiTarget } from "react-icons/fi";
import { IoEarthOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import {
  GlowButton,
  GlowEffectWrapper,
  GlowEffect,
  ShineEffect,
} from "./shared/GlowingButton";

const WelcomeCard = ({ onClose, onGoHome }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FiTarget />,
      text: t("welcome.feature1", "Make your prediction with a simple tap"),
    },
    {
      icon: <IoEarthOutline />,
      text: t("welcome.feature2", "Available in multiple languages"),
    },
    {
      icon: <IoStatsChartOutline />,
      text: t("welcome.feature3", "See live voting results"),
    },
  ];

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <Title>{t("welcome.title")}</Title>
        <Description>{t("welcome.description")}</Description>

        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureText>{feature.text}</FeatureText>
            </FeatureItem>
          ))}
        </FeatureList>

        <ButtonContainer>
          <GlowEffectWrapper>
            <StartButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoHome}
            >
              <IoEarthOutline />
              {t("welcome.goHome")}
            </StartButton>
          </GlowEffectWrapper>

          <GlowEffectWrapper>
            <GlowEffect
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <ShineEffect
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
            />
            <StartButton
              $primary
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(46, 213, 115, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              <FiTarget />
              {t("welcome.continue")}
            </StartButton>
          </GlowEffectWrapper>
        </ButtonContainer>
      </Card>
    </Overlay>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

const FeatureIcon = styled.span`
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #444;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const StartButton = styled(GlowButton)`
  background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #2ed573, #009432)"
      : "linear-gradient(135deg, #6c757d, #495057)"};
`;

export default WelcomeCard;
