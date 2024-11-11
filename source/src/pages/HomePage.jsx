import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaVoteYea,
  FaChartBar,
  FaQuestionCircle,
  FaRedo,
  FaShare,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetVote } from "../store/voteSlice";
import { resetUi } from "../store/uiSlice";
import { useTranslation } from "../hooks/useTranslation";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleShowInstructions = () => {
    window.dispatchEvent(new Event("show-instructions"));
  };

  const handleReset = (skipNavigation = false) => {
    localStorage.clear();
    dispatch(resetVote());
    dispatch(resetUi());
    if (!skipNavigation) {
      navigate("/vote");
      window.location.reload();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Voting App",
      text: t("share.message"),
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        // For mobile devices
        await navigator.share(shareData);
      } else {
        // Fallback for desktop - copy to clipboard
        await navigator.clipboard.writeText(window.location.origin);
        alert(t("share.copied"));
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttons = [
    {
      icon: <FaVoteYea size={80} />,
      text: t("home.startButton"),
      onClick: () => {
        handleReset(true);
        navigate("/vote");
      },
      gradient:
        "linear-gradient(135deg, rgba(76, 175, 80, 0.8), rgba(129, 199, 132, 0.8))",
    },
    {
      icon: <FaChartBar size={80} />,
      text: t("home.viewResults"),
      onClick: () => navigate("/results"),
      gradient:
        "linear-gradient(135deg, rgba(78, 101, 255, 0.7), rgba(146, 239, 253, 0.8))",
    },
    {
      icon: <FaShare size={80} />,
      text: t("share.button"),
      onClick: handleShare,
      gradient:
        "linear-gradient(135deg, rgba(156, 39, 176, 0.8), rgba(233, 30, 99, 0.8))",
    },
    {
      icon: <FaQuestionCircle size={80} />,
      text: t("instructions.show"),
      onClick: handleShowInstructions,
      gradient:
        "linear-gradient(135deg, rgba(255, 193, 7, 0.8), rgba(255, 167, 38, 0.7))",
    },
    {
      icon: <FaRedo size={80} />,
      text: t("confirmation.resetForNext"),
      onClick: handleReset,
      gradient:
        "linear-gradient(135deg, rgba(255, 217, 61, 0.7), rgba(255, 107, 107, 0.7))",
    },
  ];

  return (
    <HomeContainer>
      <ContentCard
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <GridContainer>
          {buttons.map((button, index) => (
            <IconButton
              key={index}
              as={motion.button}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              gradient={button.gradient}
              onClick={button.onClick}
            >
              <IconWrapper>{button.icon}</IconWrapper>
              <ButtonText>{button.text}</ButtonText>
              <GlowEffect />
            </IconButton>
          ))}
        </GridContainer>
      </ContentCard>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 85vh;
  }
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0.5rem;
  }
`;

const IconButton = styled(motion.button)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: ${(props) => props.gradient};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  overflow: hidden;
  min-height: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:first-child {
    animation: glowing 2s infinite;
  }

  @keyframes glowing {
    0% {
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.8),
        0 0 10px rgba(76, 175, 80, 0.8), 0 0 15px rgba(76, 175, 80, 0.8);
    }
    50% {
      box-shadow: 0 0 20px rgba(76, 175, 80, 0.8),
        0 0 35px rgba(76, 175, 80, 0.8), 0 0 50px rgba(76, 175, 80, 0.8);
    }
    100% {
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.8),
        0 0 10px rgba(76, 175, 80, 0.8), 0 0 15px rgba(76, 175, 80, 0.8);
    }
  }

  @media (max-width: 768px) {
    min-height: 200px;
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1.5rem;
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  opacity: 1;

  @media (max-width: 768px) {
    margin-bottom: 1rem;

    svg {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    svg {
      width: 50px;
      height: 50px;
    }
  }

  svg {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
    color: #ffffff;
  }
`;

const ButtonText = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  pointer-events: none;
`;

export default HomePage;
