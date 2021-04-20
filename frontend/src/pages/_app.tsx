import { ApolloProvider } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { positions, Provider, transitions } from "react-alert";
import { useRouter } from "next/router";
import AlertTemplate from "react-alert-template-basic";
import "tailwindcss/tailwind.css";
import { client } from "../services/graphql";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectRoute } from "../contexts/Auth";

const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider template={AlertTemplate} {...options}>
        <AuthProvider>
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </AuthProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
