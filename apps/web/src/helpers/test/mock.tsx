import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import React from "react";

export type ApolloMockProviderProps = {
  mocks:
    | readonly MockedResponse<Record<string, any>, Record<string, any>>[]
    | undefined;
  children: React.ReactNode;
};
export const ApolloMockProvider: React.FC<ApolloMockProviderProps> = ({
  mocks,
  children,
}) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
};
