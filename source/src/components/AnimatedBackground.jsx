import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import styled from "styled-components";
import { useSelector } from "react-redux";

const AnimatedBackground = () => {
  const { selectedGender, isVoteSubmitted } = useSelector(
    (state) => state.vote
  );
  const { theme, animations } = useSelector((state) => state.ui);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const getParticleColor = () => {
    if (isVoteSubmitted) return theme.colors.success;
    if (!selectedGender) return theme.colors.neutral;
    return selectedGender === "girl" ? theme.colors.girl : theme.colors.boy;
  };

  const getBackgroundColor = () => {
    if (isVoteSubmitted) return "#f0fff0"; // Light celebration green
    if (!selectedGender) return "#f3e5f5"; // Light purple
    return selectedGender === "girl" ? "#fce4ec" : "#e3f2fd";
  };

  const getParticleConfig = () => ({
    particles: {
      color: {
        value: getParticleColor(),
      },
      number: {
        value: isVoteSubmitted ? 100 : 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      shape: {
        type: isVoteSubmitted ? ["circle", "star", "triangle"] : "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: isVoteSubmitted ? 5 : 3,
        random: true,
      },
      move: {
        enable: true,
        speed: isVoteSubmitted ? 4 : 2,
        direction: isVoteSubmitted ? "top" : "none",
        random: true,
        straight: false,
        outModes: "out",
      },
      links: {
        enable: true,
        distance: 150,
        color: getParticleColor(),
        opacity: 0.4,
        width: 1,
      },
    },
    background: {
      color: getBackgroundColor(),
    },
  });

  return (
    <ParticlesContainer $isSubmitted={isVoteSubmitted}>
      <Particles init={particlesInit} options={getParticleConfig()} />
    </ParticlesContainer>
  );
};

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: all 0.5s ease-in-out;
  filter: blur(${(props) => props.$intensity * 0.5}px);
  animation: ${(props) =>
    props.$isSubmitted ? "celebrate 1s ease-in-out infinite" : "none"};

  @keyframes celebrate {
    0% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.2);
    }
    100% {
      filter: brightness(1);
    }
  }
`;

export default AnimatedBackground;
