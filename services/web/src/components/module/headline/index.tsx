import React from "react";
import Typography, { TitleProps } from "@/components/ui/typography";

export type HeadlineProps = Omit<TitleProps, "level">;
const Headline: React.FC<HeadlineProps> = (props) => {
  return <Typography.Title level={2} {...props} />;
};

export default Headline;
