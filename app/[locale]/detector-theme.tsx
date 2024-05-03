"use client";

import { useState, useCallback, ReactNode, useEffect } from "react";

interface Props {
  children: [ReactNode, ReactNode];
}

type Theme = "dark" | "light" | "loading";

const toggleThemeString = (current: Theme) => {
  return current === "dark" ? "light" : "dark";
};

const useSwitchTheme = () => {
  const [theme, setTheme] = useState<Theme>("loading");
  const switchTheme = useCallback(() => {
    setTheme((current) => {
      const next = toggleThemeString(current);
      window.localStorage.setItem("theme", next);
      return next;
    });
  }, []);
  useEffect(() => {
    const initTheme = (localStorage.getItem("theme") ?? "dark") as Theme;
    setTheme(initTheme);
  }, []);
  return { theme, switchTheme };
};

export const DetectorTheme = ({
  children: [darkIconEl, lightIconEl],
}: Props) => {
  const { switchTheme, theme } = useSwitchTheme();
  return (
    <button
      data-detect-theme={theme}
      onClick={switchTheme}
      className={`
        relative
    `}
    >
      <div
        className={`
        absolute
        visible
        [*[data-detect-theme="light"]>&]:invisible
        justify-end
      `}
      >
        {darkIconEl}
      </div>
      <div
        className={`
        absolute
        invisible
        [*[data-detect-theme="light"]>&]:visible
        justify-end
      `}
      >
        {lightIconEl}
      </div>
    </button>
  );
};
