import React from "react";

export type SpotListProps = {
  children: React.ReactNode;
};

export const SpotList: React.FC<SpotListProps> = ({ children }) => {
  return (
    <ul className="mb-6 grid gap-8 grid-flow-row grid-cols-[repeat(2,1fr)]">
      {children}
    </ul>
  );
};
