import { getScopedI18n } from "@/components/locales/server";
import { AboutPanel } from "./panel";
import { BiHappyHeartEyes } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { LuHandMetal } from "react-icons/lu";
import { FaDiscord } from "react-icons/fa";
import { setStaticParamsLocale } from "next-international/server";

interface Props {
  params: { locale: string };
}

export default async function AboutPage({ params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  const aboutT = await getScopedI18n("about");

  return (
    <div className="flex-col gap-12 w-full">
      <h1 className="font-bold text-5xl py-[5vw]">Metallic Shout</h1>
      <div className="flex-col gap-16 w-full">
        <AboutPanel gradient="to-about-panel-1" text={aboutT("text1")}>
          {({ className }: { className?: string }) => (
            <BiHappyHeartEyes
              className={`${className} w-[20rem] h-[20rem] right-[0rem] bottom-[-5rem]`}
            />
          )}
        </AboutPanel>
        <AboutPanel gradient="to-about-panel-2" text={aboutT("text2")}>
          {({ className }: { className?: string }) => (
            <FaLaptopCode
              className={`${className} w-[20rem] h-[20rem] right-[1rem] bottom-[-5rem]`}
            />
          )}
        </AboutPanel>
        <AboutPanel gradient="to-about-panel-1" text={aboutT("text3")}>
          {({ className }: { className?: string }) => (
            <LuHandMetal
              className={`${className} w-[20rem] h-[20rem] right-[1rem] bottom-[-5rem] -rotate-12`}
              strokeWidth="1.5px"
            />
          )}
        </AboutPanel>
        <AboutPanel gradient="to-about-panel-2" text={aboutT("text4")}>
          {({ className }: { className?: string }) => (
            <FaDiscord
              className={`${className} w-[20rem] h-[20rem] right-[0rem] bottom-[-6rem] -rotate-12`}
            />
          )}
        </AboutPanel>
      </div>
    </div>
  );
}
