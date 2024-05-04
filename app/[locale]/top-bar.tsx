"use client";

import { useMemo, useCallback, ReactEventHandler, ReactNode } from "react";
import { useChangeLocale } from "@/components/locales/client";

const locales = { ja: "JP", en: "EN" } as Record<string, string>;

interface Props {
  currentLocale: string;
  children: ReactNode;
}

export const TopBar = ({ currentLocale, children }: Props) => {
  const branches = useMemo(
    () => Object.entries(locales).filter(([e]) => e !== currentLocale),
    [currentLocale]
  );
  const changeLocale = useChangeLocale();
  const onSelect: ReactEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      changeLocale((e.target as any).value);
    },
    [changeLocale]
  );
  return (
    <div className="z-20 justify-start w-screen h-fit py-3 bg-panel pl-10">
      <h1 className="bold text-3xl whitespace-nowrap">Metallic shout</h1>
      <div className="grow justify-end mr-5">
        <div className="h-full">{children}</div>
        <select
          className="bg-panel ml-5"
          defaultValue={currentLocale}
          onChange={onSelect}
        >
          <option value={currentLocale}>{locales[currentLocale]}</option>
          {branches.map(([e, label]) => {
            return (
              <option key={e} value={e}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
