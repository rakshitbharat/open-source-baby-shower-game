import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";

const FloatingInstructionButton = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <ButtonContainer
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <IconWrapper>❔</IconWrapper>
      <ButtonText>{t("instructions.show")}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(motion.button)`
  position: fixed;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: unset;
    bottom: 1rem;
    transform: none;
  }
`;

const IconWrapper = styled.span`
  font-size: 1.2rem;
`;

const ButtonText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default FloatingInstructionButton;
