import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase/config";
import { ref, get, onValue } from "firebase/database";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { GiPodiumWinner, GiCrownedHeart } from "react-icons/gi";
import { RiUserHeartFill } from "react-icons/ri";
import { BabyGirlIcon, BabyBoyIcon } from "../components/GenderIcons";
import WaitingForResultPage from "./WaitingForResultPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const ResultsPage = () => {
  const { t } = useTranslation();
  const { voteCounts } = useSelector((state) => state.results);
  const { showResultPage } = useSelector((state) => state.results);
  const [manualAdjustments, setManualAdjustments] = useState({
    boy: 0,
    girl: 0,
  });

  // Fetch and listen to manual adjustments changes
  useEffect(() => {
    const adjustmentsRef = ref(db, "manualAdjustments");

    // Set up real-time listener
    const unsubscribe = onValue(
      adjustmentsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setManualAdjustments(snapshot.val());
        }
      },
      (error) => {
        console.error("Error fetching manual adjustments:", error);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (!showResultPage) {
    return <WaitingForResultPage />;
  }

  // Calculate total votes including manual adjustments
  const boyVotes = (voteCounts.boy || 0) + (manualAdjustments.boy || 0);
  const girlVotes = (voteCounts.girl || 0) + (manualAdjustments.girl || 0);
  const totalVotes = boyVotes + girlVotes;

  const calculatePercentage = (votes) => {
    const numVotes = parseInt(votes || 0, 10);
    if (totalVotes === 0) return 0;
    return Math.round((numVotes / totalVotes) * 100);
  };

  const data = {
    labels: [t("gender.boy"), t("gender.girl")],
    datasets: [
      {
        label: t("results.votes"),
        data: [boyVotes, girlVotes],
        backgroundColor: [
          "rgba(64, 169, 255, 0.7)",
          "rgba(255, 143, 203, 0.7)",
        ],
        borderColor: ["rgba(41, 121, 255, 1)", "rgba(255, 105, 180, 1)"],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#333",
        bodyColor: "#333",
        titleFont: {
          size: 14,
          family: "'Poppins', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Poppins', sans-serif",
        },
        padding: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            family: "'Poppins', sans-serif",
            weight: "600",
          },
          color: "#333",
        },
        border: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuart",
    },
  };

  const getWinningGender = () => {
    if (boyVotes === girlVotes) return "tie";
    return boyVotes > girlVotes ? "boy" : "girl";
  };

  const getLeadPercentage = () => {
    if (totalVotes === 0) return 0;
    const difference = Math.abs(boyVotes - girlVotes);
    return Math.round((difference / totalVotes) * 100);
  };

  return (
    <ResultsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ContentWrapper>
        <StatsGrid>
          <StatCard highlight>
            <StatIconWrapper winner>
              <span
                role="img"
                aria-label="trophy"
                style={{ fontSize: "1.5em" }}
              >
                🏆
              </span>
            </StatIconWrapper>
            <StatInfo>
              <StatLabel>{t("results.leading")}</StatLabel>
              <StatValue highlight>
                {getWinningGender() === "tie"
                  ? t("results.tie")
                  : `${t(`gender.${getWinningGender()}`)} ${
                      getWinningGender() === "boy" ? "👶" : "👧"
                    }`}
              </StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIconWrapper>
              <span
                role="img"
                aria-label="crown heart"
                style={{ fontSize: "1.5em" }}
              >
                👥
              </span>
            </StatIconWrapper>
            <StatInfo>
              <StatLabel>{t("results.totalVotes")}</StatLabel>
              <StatValue>{totalVotes}</StatValue>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIconWrapper>
              <span
                role="img"
                aria-label="percentage"
                style={{ fontSize: "1.5em" }}
              >
                📊
              </span>
            </StatIconWrapper>
            <StatInfo>
              <StatLabel>{t("results.leadBy")}</StatLabel>
              <StatValue>{getLeadPercentage()}%</StatValue>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <ChartSection>
          <ChartWrapper>
            <Bar data={data} options={options} height={250} />
          </ChartWrapper>

          <DetailedStats>
            <GenderStatCard boy>
              <GenderIcon boy>
                <BabyBoyIcon />
              </GenderIcon>
              <StatDetails>
                <StatTitle>
                  {boyVotes} {t("results.votes")}
                </StatTitle>
                <StatNumbers>
                  <Percentage>{calculatePercentage(boyVotes)}%</Percentage>
                </StatNumbers>
              </StatDetails>
            </GenderStatCard>

            <GenderStatCard girl>
              <GenderIcon girl>
                <BabyGirlIcon />
              </GenderIcon>
              <StatDetails>
                <StatTitle>
                  {girlVotes} {t("results.votes")}
                </StatTitle>
                <StatNumbers>
                  <Percentage>{calculatePercentage(girlVotes)}%</Percentage>
                </StatNumbers>
              </StatDetails>
            </GenderStatCard>
          </DetailedStats>
        </ChartSection>

        <NavigationButton
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("results.backToHome")}
        </NavigationButton>
      </ContentWrapper>
    </ResultsContainer>
  );
};

const ResultsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: min(1.5rem, 4vw);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChartWrapper = styled.div`
  border-radius: 16px;
  padding: min(1.2rem, 3vw);
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TotalVotes = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: min(1rem, 2.5vw);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const StatIconWrapper = styled.div`
  background: ${(props) =>
    props.winner ? "rgba(255, 215, 0, 0.2)" : "rgba(147, 112, 219, 0.2)"};
  color: ${(props) => (props.winner ? "#FFD700" : "#9370DB")};
  width: min(45px, 12vw);
  height: min(45px, 12vw);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  span {
    font-size: min(1.5em, 5vw) !important;
  }
`;

const StatValue = styled.div`
  font-size: min(1.5rem, 5.5vw);
  font-weight: bold;
  color: ${(props) => (props.highlight ? "#9370DB" : "#666")};
`;

const PercentageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: min(1rem, 2.5vw);
`;

const PercentageCard = styled.div`
  background: ${(props) =>
    props.boy ? "rgba(64, 169, 255, 0.15)" : "rgba(255, 143, 203, 0.15)"};
  border-radius: 16px;
  padding: min(0.8rem, 2vw);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const GenderIcon = styled.div`
  background: ${(props) =>
    props.boy ? "rgba(64, 169, 255, 0.2)" : "rgba(255, 143, 203, 0.2)"};
  color: ${(props) => (props.boy ? "#40A9FF" : "#FF8FCB")};
  width: min(60px, 15vw);
  height: min(60px, 15vw);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const PercentageValue = styled.div`
  font-size: min(1.5rem, 5vw);
  font-weight: bold;
  color: #333;
`;

const NavigationButton = styled(motion(Link))`
  background: linear-gradient(135deg, #ff69b4, #4169e1);
  color: white;
  text-decoration: none;
  padding: min(0.8rem, 2vw) min(1.5rem, 4vw);
  border-radius: 50px;
  text-align: center;
  font-weight: 600;
  font-size: min(0.9rem, 4vw);
  width: min(180px, 50%);
  margin: 0.5rem auto 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
  gap: min(1rem, 2.5vw);
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const StatCard = styled.div`
  background: ${(props) =>
    props.highlight
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(255, 255, 255, 0.95)"};
  border-radius: 20px;
  padding: min(1rem, 4vw);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    gap: 0.6rem;
  }
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: min(0.8rem, 3.5vw);
  color: #666;
  font-weight: 500;
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailedStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: min(1rem, 2.5vw);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const GenderStatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: min(1rem, 4vw);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    gap: 0.6rem;
  }
`;

const StatDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StatTitle = styled.div`
  font-size: min(1rem, 4vw);
  font-weight: 600;
  color: #333;
`;

const StatNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Number = styled.span`
  font-size: min(0.9rem, 3.5vw);
  color: #666;
`;

const Percentage = styled.span`
  font-size: min(1.8rem, 7vw);
  font-weight: bold;
  color: ${(props) => (props.boy ? "#40A9FF" : "#FF8FCB")};
`;

export default ResultsPage;
