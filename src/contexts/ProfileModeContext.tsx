import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type ProfileMode = "diretor" | "gad";

interface ProfileModeContextType {
  mode: ProfileMode;
  setMode: (mode: ProfileMode) => void;
  isDiretor: boolean;
  isGAD: boolean;
}

const ProfileModeContext = createContext<ProfileModeContextType>({
  mode: "diretor",
  setMode: () => {},
  isDiretor: true,
  isGAD: false,
});

const STORAGE_KEY = "pdde-profile-mode";

export const ProfileModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<ProfileMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "gad" ? "gad" : "diretor";
    } catch {
      return "diretor";
    }
  });

  const setMode = useCallback((newMode: ProfileMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {}
  }, []);

  const value = {
    mode,
    setMode,
    isDiretor: mode === "diretor",
    isGAD: mode === "gad",
  };

  return (
    <ProfileModeContext.Provider value={value}>
      {children}
    </ProfileModeContext.Provider>
  );
};

export const useProfileMode = () => useContext(ProfileModeContext);
