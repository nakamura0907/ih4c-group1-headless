import { Container } from "@/components/ui/Container";
import React from "react";

export const MainContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <article>
      <Container size="lg">{children}</Container>
    </article>
  );
};
