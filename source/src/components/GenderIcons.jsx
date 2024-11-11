import React from "react";

export const BabyBoyIcon = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Face circle */}
    <circle cx="50" cy="50" r="45" fill="#FFE0BD" />

    {/* Crown/Hair */}
    <path
      d="M25 30 Q50 20 75 30 L75 15 Q50 5 25 15 Z"
      fill="#1E88E5"
      stroke="none"
    />

    {/* Diamond */}
    <path d="M45 15 L50 10 L55 15 L50 20 Z" fill="#FFC107" stroke="none" />

    {/* Eyes */}
    <circle cx="35" cy="45" r="5" fill="#333" />
    <circle cx="65" cy="45" r="5" fill="#333" />

    {/* Smile */}
    <path
      d="M35 60 Q50 70 65 60"
      fill="none"
      stroke="#333"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const BabyGirlIcon = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Face circle */}
    <circle cx="50" cy="50" r="45" fill="#FFE0BD" />

    {/* Bow */}
    <path
      d="M35 10 Q50 15 65 10 Q70 20 65 25 Q50 20 35 25 Q30 20 35 10"
      fill="#FF69B4"
      stroke="none"
    />
    <circle cx="50" cy="17" r="5" fill="#FF1493" />

    {/* Eyes */}
    <circle cx="35" cy="45" r="5" fill="#333" />
    <circle cx="65" cy="45" r="5" fill="#333" />
    <path d="M32 42 Q35 40 38 42" stroke="#333" strokeWidth="2" fill="none" />
    <path d="M62 42 Q65 40 68 42" stroke="#333" strokeWidth="2" fill="none" />

    {/* Smile */}
    <path
      d="M35 60 Q50 70 65 60"
      fill="none"
      stroke="#333"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
