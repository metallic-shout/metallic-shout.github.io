import type { IconType } from "react-icons";

interface Props {
  text: string;
  gradient: string;
  children: IconType;
}

const gradientionUnder = `
bg-gradient-to-tr
from-transparent
from-50%
h-12
-z-10
to-90%
`;

export const AboutPanel = ({ children: Child, text, gradient }: Props) => {
  return (
    <>
      <div className="flex-col h-fit min-h-[50vh] w-full overflow-hidden">
        <div
          className={`
            h-full
            justify-start
            pl-[10vw]
            pt-[10vh]
            pr-[5vw]
            bg-gradient-to-br
            from-transparent
            from-50%
            to-90%
            grow
            ${gradient}
        `}
        >
          <p className="whitespace-pre-line z-10">{text}</p>
        </div>
        <div className="h-0 w-full relative justify-end">
          <Child className="absolute text-backest" />
        </div>
        <div className={`${gradientionUnder} ${gradient}`}></div>
      </div>
    </>
  );
};
