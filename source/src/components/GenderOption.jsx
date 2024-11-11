import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";

const BabyGirlIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* Hair Back Layer */}
    <path
      d="M 25 65 
         C 25 45, 40 25, 60 25 
         C 80 25, 95 45, 95 65
         C 95 65, 90 55, 60 55
         C 30 55, 25 65, 25 65"
      fill="#FF9EBF"
    />

    {/* Hair Middle Layer */}
    <path
      d="M 30 60 
         C 30 40, 60 30, 90 60
         C 90 60, 85 50, 60 50
         C 35 50, 30 60, 30 60"
      fill="#FFB6C1"
    />

    {/* Curly Hair Details */}
    <path
      d="M 35 55 C 40 50, 45 55, 40 60"
      stroke="#FF89A3"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M 85 55 C 80 50, 75 55, 80 60"
      stroke="#FF89A3"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M 45 45 C 50 40, 55 45, 50 50"
      stroke="#FF89A3"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M 75 45 C 70 40, 65 45, 70 50"
      stroke="#FF89A3"
      strokeWidth="3"
      fill="none"
    />

    {/* Face */}
    <circle cx="60" cy="65" r="35" fill="#FFE4E1" />

    {/* Eyes */}
    <g className="eyes">
      <path
        d="M 45 60 C 45 57, 47 55, 50 55 C 53 55, 55 57, 55 60 C 55 63, 53 65, 50 65 C 47 65, 45 63, 45 60 Z"
        fill="#333"
      />
      <path
        d="M 65 60 C 65 57, 67 55, 70 55 C 73 55, 75 57, 75 60 C 75 63, 73 65, 70 65 C 67 65, 65 63, 65 60 Z"
        fill="#333"
      />
      {/* Eyelashes */}
      <path
        d="M 47 54 L 45 51 M 50 53 L 50 50 M 53 54 L 55 51"
        stroke="#333"
        strokeWidth="1.5"
      />
      <path
        d="M 67 54 L 65 51 M 70 53 L 70 50 M 73 54 L 75 51"
        stroke="#333"
        strokeWidth="1.5"
      />
    </g>

    {/* Blush */}
    <circle cx="40" cy="70" r="7" fill="#FFB6C1" opacity="0.5" />
    <circle cx="80" cy="70" r="7" fill="#FFB6C1" opacity="0.5" />

    {/* Mouth */}
    <path
      d="M 50 75 Q 60 85 70 75"
      stroke="#FF69B4"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* Hair Front Layer with Bangs */}
    <path
      d="M 35 45 
         C 45 35, 75 35, 85 45
         C 75 40, 45 40, 35 45"
      fill="#FF89A3"
    />

    {/* Side Hair Strands */}
    <path
      d="M 30 50 C 25 60, 25 70, 30 80"
      stroke="#FF89A3"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M 90 50 C 95 60, 95 70, 90 80"
      stroke="#FF89A3"
      strokeWidth="4"
      fill="none"
    />

    {/* Bow - made bigger and more detailed */}
    <g transform="translate(60 30) rotate(-5)">
      <path
        d="M -25 0 
           C -20 -15, -5 -15, 0 -5 
           C 5 -15, 20 -15, 25 0
           C 20 15, 5 15, 0 5
           C -5 15, -20 15, -25 0"
        fill="#FF1493"
      />
      <circle cx="0" cy="0" r="6" fill="#FF69B4" />
      <path d="M -3 0 L 3 0 M 0 -3 L 0 3" stroke="#FFF" strokeWidth="1" />
    </g>
  </svg>
);

const BabyBoyIcon = () => (
  <svg width="120" height="120" viewBox="0 0 120 120">
    {/* Hair Back Layer */}
    <path
      d="M 25 45 
         C 25 35, 40 25, 60 25 
         C 80 25, 95 35, 95 45
         C 95 45, 90 40, 60 40
         C 30 40, 25 45, 25 45"
      fill="#2C3E50"
    />

    {/* Hair Middle Layer */}
    <path
      d="M 30 42 
         C 30 32, 60 27, 90 42
         C 90 42, 85 37, 60 37
         C 35 37, 30 42, 30 42"
      fill="#34495E"
    />

    {/* Spiky Hair Details */}
    <path
      d="M 35 40 L 40 35 L 45 40"
      stroke="#2C3E50"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 50 38 L 55 33 L 60 38"
      stroke="#2C3E50"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 65 38 L 70 33 L 75 38"
      stroke="#2C3E50"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 80 40 L 85 35 L 90 40"
      stroke="#2C3E50"
      strokeWidth="2"
      fill="none"
    />

    {/* Cap with better design */}
    <path
      d="M 20 45 
         C 20 35, 60 25, 100 45
         L 95 50 
         C 75 40, 45 40, 25 50 Z"
      fill="#4169E1"
    />

    {/* Cap Details */}
    <path
      d="M 20 45 C 40 35, 80 35, 100 45"
      stroke="#5F9EA0"
      strokeWidth="4"
      fill="none"
    />

    {/* Cap Visor with better curve */}
    <path
      d="M 20 45 
         C 40 45, 80 45, 100 45 
         L 95 52 
         C 75 52, 45 52, 25 52 
         Z"
      fill="#2E4B9A"
    />

    {/* Face */}
    <circle cx="60" cy="65" r="35" fill="#FFE4E1" />

    {/* Eyes */}
    <g className="eyes">
      {/* Left Eye */}
      <path
        d="M 45 60 C 45 57, 47 55, 50 55 C 53 55, 55 57, 55 60 C 55 63, 53 65, 50 65 C 47 65, 45 63, 45 60 Z"
        fill="#333"
      />
      {/* Right Eye */}
      <path
        d="M 65 60 C 65 57, 67 55, 70 55 C 73 55, 75 57, 75 60 C 75 63, 73 65, 70 65 C 67 65, 65 63, 65 60 Z"
        fill="#333"
      />
      {/* Eye Highlights */}
      <circle cx="48" cy="58" r="2" fill="white" />
      <circle cx="68" cy="58" r="2" fill="white" />
    </g>

    {/* Eyebrows */}
    <path
      d="M 43 52 C 45 50, 50 50, 52 52"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 68 52 C 70 50, 75 50, 77 52"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />

    {/* Blush */}
    <circle cx="40" cy="70" r="7" fill="#FFB6C1" opacity="0.3" />
    <circle cx="80" cy="70" r="7" fill="#FFB6C1" opacity="0.3" />

    {/* Mouth */}
    <path
      d="M 50 75 Q 60 82 70 75"
      stroke="#333"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* Dimples */}
    <circle cx="45" cy="75" r="2" fill="#FFB6C1" opacity="0.3" />
    <circle cx="75" cy="75" r="2" fill="#FFB6C1" opacity="0.3" />

    {/* Hair Front Peek */}
    <path
      d="M 30 45 C 35 40, 45 38, 50 42"
      stroke="#34495E"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M 90 45 C 85 40, 75 38, 70 42"
      stroke="#34495E"
      strokeWidth="3"
      fill="none"
    />

    {/* Cool Logo on Cap */}
    <g transform="translate(60 40) scale(0.8)">
      <path
        d="M -10 0 L 0 -10 L 10 0 L 0 10 Z"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="2"
      />
      <circle cx="0" cy="0" r="3" fill="#FFA500" />
    </g>
  </svg>
);

const GenderOption = ({ type, selected, onSelect }) => {
  const { t } = useTranslation();

  return (
    <OptionContainer onClick={onSelect} selected={selected} type={type}>
      <GlowingBackground selected={selected} type={type} />
      <IconWrapper selected={selected}>
        {type === "girl" ? <BabyGirlIcon /> : <BabyBoyIcon />}
      </IconWrapper>
      <OptionText selected={selected} type={type}>
        {t(`genderOptions.${type}.text`)}
      </OptionText>
      <Sparkles selected={selected} type={type} />
      <HeartBubbles selected={selected} type={type} />
    </OptionContainer>
  );
};

const GlowingBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: ${(props) =>
    props.selected
      ? props.type === "girl"
        ? "radial-gradient(circle, rgba(255,105,180,0.2) 0%, rgba(255,105,180,0) 70%)"
        : "radial-gradient(circle, rgba(65,105,225,0.2) 0%, rgba(65,105,225,0) 70%)"
      : "none"};
  filter: blur(20px);
  pointer-events: none;
`;

const OptionContainer = styled(motion.div)`
  background: rgba(
    255,
    255,
    255,
    ${(props) => (props.selected ? "0.25" : "0.1")}
  );
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  cursor: pointer;
  position: relative;
  width: min(280px, 90vw);
  height: min(280px, 90vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid
    ${(props) =>
      props.selected
        ? props.type === "girl"
          ? "#FF69B4"
          : "#4169E1"
        : "rgba(255, 255, 255, 0.2)"};
  box-shadow: ${(props) =>
    props.selected
      ? `0 0 30px ${
          props.type === "girl"
            ? "rgba(255,105,180,0.4)"
            : "rgba(65,105,225,0.4)"
        }`
      : "0 8px 16px rgba(0,0,0,0.1)"};
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) =>
      props.selected
        ? `0 10px 40px ${
            props.type === "girl"
              ? "rgba(255,105,180,0.5)"
              : "rgba(65,105,225,0.5)"
          }`
        : "0 12px 24px rgba(0,0,0,0.15)"};
  }

  @media (max-width: 768px) {
    padding: 2.5rem;
    width: min(240px, 90vw);
    height: min(240px, 90vw);
  }

  @media (max-width: 480px) {
    padding: 2rem;
    width: min(200px, 90vw);
    height: min(200px, 90vw);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
  transform: ${(props) => (props.selected ? "scale(1.15)" : "scale(1)")};
  z-index: 2;

  svg {
    width: 150px;
    height: 150px;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
    }
  }

  /* Tablet */
  @media (max-width: 768px) {
    svg {
      width: 120px;
      height: 120px;
    }
  }

  /* Mobile Large */
  @media (max-width: 480px) {
    svg {
      width: 100px;
      height: 100px;
    }
  }

  /* Mobile Small */
  @media (max-width: 360px) {
    svg {
      width: 80px;
      height: 80px;
    }
  }
`;

const OptionText = styled.h3`
  color: ${(props) => (props.type === "girl" ? "#FF69B4" : "#4169E1")};
  font-size: 1.8rem;
  margin: 0;
  font-weight: ${(props) => (props.selected ? "700" : "600")};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Sparkles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  pointer-events: none;
  background: ${(props) =>
    props.selected
      ? `radial-gradient(circle at 30% 30%, 
      ${
        props.type === "girl"
          ? "rgba(255,105,180,0.15)"
          : "rgba(65,105,225,0.15)"
      }, 
      transparent),
      radial-gradient(circle at 70% 70%, 
      ${
        props.type === "girl"
          ? "rgba(255,105,180,0.15)"
          : "rgba(65,105,225,0.15)"
      },
      transparent)`
      : "none"};
`;

const HeartBubbles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;

  &::before,
  &::after {
    content: "${(props) => (props.type === "girl" ? "💗" : "💙")}";
    position: absolute;
    font-size: 2rem;
    opacity: ${(props) => (props.selected ? 1 : 0)};
    transition: all 0.3s ease;
    animation: ${(props) => (props.selected ? "float 3s infinite" : "none")};
  }

  &::before {
    left: 20%;
    animation-delay: 0.5s;
  }

  &::after {
    right: 20%;
    animation-delay: 1s;
  }

  @keyframes float {
    0% {
      transform: translateY(100%) scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100%) scale(1);
      opacity: 0;
    }
  }
`;

export default GenderOption;
