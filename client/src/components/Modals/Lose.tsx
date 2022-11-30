import { useEffect, useRef, MutableRefObject } from "react";
import { gsap } from "gsap";

type LoseProps = {
  bool: boolean;
  onEnter: () => void;
  streak?: number;
};

export default function Lose({ bool, onEnter, streak }: LoseProps) {
  // Hide modal until needed
  let hidden = "";
  if (!bool) hidden = "hidden";

  const loseText = useRef() as MutableRefObject<HTMLDivElement>;
  const enterMessage = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!bool) return;
    // Play animation
    const timeline = gsap.timeline({ autoRemoveChildren: true });
    timeline.from(loseText.current.children, {
      yPercent: -100,
      opacity: 0,
      duration: 0.3,
      stagger: 0.01,
    });
    timeline.from(enterMessage.current, {
      opacity: 0,
      duration: 1,
    });
    timeline.restart();

    // Add event listener
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      onEnter();
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [onEnter, bool]);

  const text = "You lose.";
  return (
    <div
      className={`absolute ${hidden} p-4 backdrop-blur-sm bg-zinc-500/[.6] z-10`}
    >
      <div
        className="flex justify-center gap-1 font-['Rubik_Dirt'] text-lg smartphone:text-xl sm:text-3xl md:text-5xl lg:text-7xl text-blue-300"
        ref={loseText}
      >
        {text.split("").map((string, index) => {
          if (string === " ") string = "\xa0";
          return <div key={index}>{string}</div>;
        })}
      </div>
      <div className="text-white text-center" ref={enterMessage}>
        Press Enter to restart.
      </div>
    </div>
  );
}
