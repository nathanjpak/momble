import React from "react";

// individual parts of the drawing

const head = (
  <div
    className="absolute right-1/4 translate-x-1/2 h-1/6 aspect-square rounded-full border-10 border-black"
    style={{ top: "calc(12.5% + 0.5rem)" }}
  />
);

const body = (
  <div
    className="absolute h-3/8 border-x-5 border-black"
    style={{ right: "calc(25% - 5px)", top: "29.16666667%" }}
  />
);

const rightArm = (
  <div
    className="absolute top-3/8 rotate-30 origin-top-right border-l-10 border-black h-1/4"
    style={{ right: "calc(25% - 5px)" }}
  />
);

const leftArm = (
  <div
    className="absolute top-3/8 -rotate-30 origin-top-left border-l-10 border-black h-1/4"
    style={{ left: "calc(75% - 5px)" }}
  />
);

const rightLeg = (
  <div
    className="absolute top-2/3 rotate-30 origin-top-right border-l-10 border-black h-1/4"
    style={{ right: "calc(25% - 5px)" }}
  />
);

const leftLeg = (
  <div
    className="absolute top-2/3 -rotate-30 origin-top-left border-l-10 border-black h-1/4"
    style={{ left: "calc(75% - 5px)" }}
  />
);

const bodyPartsArray = [head, body, rightArm, leftArm, rightLeg, leftLeg];

export default function HangmanDrawing() {
  return (
    <div className="w-5/6 max-w-2xl relative flex flex-col items-center pt-4">
      {bodyPartsArray}
      {/* Drawing the 'gallow' */}
      <div
        className="border-l-10 border-black w-0"
        style={{ height: "50vh" }}
      />
      <div className="absolute left-1/2 border-t-10 border-black w-1/4" />
      <div
        className="absolute border-x-5 border-black w-0 h-1/8"
        style={{ right: "calc(25% - 5px)" }}
      />
      <div className="absolute bottom-0 border-t-10 border-black w-1/2" />
    </div>
  );
}
