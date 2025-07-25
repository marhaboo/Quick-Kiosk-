import React from "react";

type PrimaryButtonType = {
  text: string;
};

const PrimaryButton = ({ text }: PrimaryButtonType) => {
  return (
    <button type="submit" className="bg-[#2E2C33]/40 w-full backdrop-blur-2xl text-[14px] md:text-[18px] py-2 px-7 rounded-2xl text-white border border-[#2E2C33] hover:bg-[#2E2C33]/70 transition-colors duration-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95">
      {text}
    </button>
  );
};

export default PrimaryButton;
