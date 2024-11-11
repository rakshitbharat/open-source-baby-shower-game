import styled from "styled-components";
import { motion } from "framer-motion";

export const GlowButton = styled(motion.button)`
  background: linear-gradient(135deg, #2ed573, #009432);
  color: white;
  border: none;
  padding: min(1.2rem, 3vw) min(2.5rem, 6vw);
  border-radius: 50px;
  font-size: min(1.3rem, 5vw);
  font-weight: 600;
  cursor: pointer;
  position: relative;
  z-index: 4;
  transition: all 0.3s ease;
  box-shadow: 0 4px 25px rgba(46, 213, 115, 0.4);
  width: min(300px, 90%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const GlowEffectWrapper = styled(motion.div)`
  position: relative;
  width: min(300px, 90%);
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const GlowEffect = styled(motion.div)`
  position: absolute;
  inset: -8px;
  border-radius: 50px;
  background: linear-gradient(135deg, #2ed573, #009432);
  opacity: 0;
  z-index: 1;
  filter: blur(15px);
`;

export const ShineEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  z-index: 3;
`;
