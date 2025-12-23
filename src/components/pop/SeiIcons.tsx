import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const SeiIncluirIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z"
      fill="white"
      stroke="#555555"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H20"
      stroke="#555555"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="18" r="5" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1" />
    <path
      d="M16 14V22M12 18H20"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SeiAssinarIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18.5 2.5L21.5 5.5L10.5 16.5L10 19L7.5 21.5L5 22L5.5 19.5L8 17L19 6L18.5 2.5Z"
      fill="#333333"
      stroke="#000000"
      strokeWidth="1.5"
    />
    <path d="M16.5 4.5L19.5 7.5" stroke="#64748B" strokeWidth="2" />
    <path d="M5 22L7.5 21.5L10 19" stroke="#333333" strokeWidth="1" />
  </svg>
);

export const SeiEnviarIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      fill="#F0F0F0"
      stroke="#555555"
      strokeWidth="2"
    />
    <path
      d="M2 6L12 13L22 6"
      stroke="#555555"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 14L22 18L16 22V14Z"
      fill="#228B22"
      stroke="#006400"
      strokeWidth="1"
    />
  </svg>
);

export const SeiPastaIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 11V6C22 4.89543 21.1046 4 20 4H10L8 2H4C2.89543 2 2 2.89543 2 4V11"
      fill="#38BDF8"
      stroke="#0284C7"
      strokeWidth="1"
    />
    <rect x="2" y="8" width="20" height="14" rx="2" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1" />
    <path d="M2 11H22" stroke="#0284C7" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

export const SeiIniciarProcessoIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      fill="white"
      stroke="#555555"
      strokeWidth="2"
    />
    <circle cx="16" cy="18" r="5" fill="#228B22" stroke="#006400" strokeWidth="1" />
    <path d="M16 15V21M13 18H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SeiInteressadosIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="7" r="4" fill="#DDDDDD" stroke="#555555" strokeWidth="1.5" />
    <path
      d="M5.5 21C5.5 16.5817 9.08172 13 13.5 13H10.5C6.08172 13 2.5 16.5817 2.5 21"
      fill="#DDDDDD"
      stroke="#555555"
      strokeWidth="1.5"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1671 4.54327C18.7111 5.23583 19 6.09012 19 7C19 7.90988 18.7111 8.76417 18.1671 9.45673C17.623 10.1493 16.8604 10.6497 16 10.87"
      stroke="#555555"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M17 14C20.3137 14 23 16.6863 23 20V21" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
