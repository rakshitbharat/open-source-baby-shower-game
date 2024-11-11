import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import {
  FaStar,
  FaGift,
  FaBaby,
  FaCrown,
  FaHeart,
  FaSnowflake,
  FaSun,
  FaMoon,
  FaIceCream,
  FaCandyCane,
  FaFeather,
  FaKiwiBird,
  FaGamepad,
  FaPaintBrush,
  FaRobot,
  FaRocket,
  FaMusic,
  FaBook,
  FaPuzzlePiece,
  FaBicycle,
  FaDragon,
  FaChess,
  FaGuitar,
  FaPlane,
  FaTree,
  FaDice,
  FaFish,
  FaHippo,
  FaOtter,
  FaFootballBall,
  FaCar,
  FaSpaceShuttle,
  FaBasketballBall,
  FaDog,
  FaHorse,
  FaPalette,
  FaCat,
} from "react-icons/fa";
import {
  GiButterfly,
  GiUnicorn,
  GiDinosaurRex,
  GiSoccerBall,
  GiCupcake,
} from "react-icons/gi";

const FloatingIcons = () => {
  const { selectedGender, isVoteSubmitted } = useSelector(
    (state) => state.vote
  );

  const getIcons = () => {
    if (isVoteSubmitted) {
      return [
        FaStar,
        FaGift,
        FaBaby,
        FaCrown,
        FaHeart,
        FaStar,
        FaGift,
        FaCrown,
        FaSnowflake,
        FaSun,
        FaMoon,
        FaIceCream,
        FaCandyCane,
        GiCupcake,
        FaFeather,
        FaKiwiBird,
      ];
    }
    if (!selectedGender) {
      return [
        FaStar,
        FaGamepad,
        FaPaintBrush,
        FaRobot,
        FaRocket,
        FaMusic,
        FaBook,
        FaPuzzlePiece,
        FaBicycle,
        FaHeart,
        FaDragon,
        FaChess,
        FaGuitar,
        FaPlane,
        FaTree,
        FaDice,
        FaFish,
        FaHippo,
        FaOtter,
        GiDinosaurRex,
      ];
    }
    if (selectedGender === "boy") {
      return [
        FaGamepad,
        FaFootballBall,
        FaCar,
        FaRobot,
        FaRocket,
        FaSpaceShuttle,
        FaBasketballBall,
        FaBicycle,
        FaGamepad,
        FaCar,
        FaDragon,
        FaChess,
        GiDinosaurRex,
        FaPlane,
        GiSoccerBall,
        FaDog,
        FaHorse,
        FaFish,
        FaHippo,
        FaOtter,
      ];
    }
    return [
      FaHeart,
      FaPaintBrush,
      FaStar,
      FaGift,
      FaMusic,
      FaPalette,
      FaCrown,
      FaBook,
      FaPuzzlePiece,
      FaHeart,
      GiButterfly,
      GiUnicorn,
      FaGuitar,
      FaSnowflake,
      FaMoon,
      GiUnicorn,
      FaCat,
      FaFeather,
      FaIceCream,
      GiCupcake,
    ];
  };

  return (
    <Container>
      {getIcons().map((Icon, index) => (
        <FloatingIcon
          key={index}
          $delay={index}
          $isSubmitted={isVoteSubmitted}
          $selectedGender={selectedGender}
        >
          <Icon size={45} /> {/* Increased icon size from 30 to 45 */}
        </FloatingIcon>
      ))}
    </Container>
  );
};

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg) scale(1); }
  50% { transform: translateY(-30px) rotate(10deg) scale(1.1); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); }
`;

const celebrate = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.3) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const FloatingIcon = styled.div`
  position: absolute;
  color: ${(props) => {
    if (props.$isSubmitted) return "#00ff00";
    if (!props.$selectedGender) return "#8a2be2";
    return props.$selectedGender === "girl" ? "#ff69b4" : "#4169e1";
  }};
  animation: ${(props) => (props.$isSubmitted ? celebrate : float)} 4s
    ease-in-out infinite;
  animation-delay: ${(props) => props.$delay * 0.8}s;
  left: ${() => Math.random() * 85}%;
  top: ${() => Math.random() * 85}%;
  opacity: 0.8;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
`;

export default FloatingIcons;
