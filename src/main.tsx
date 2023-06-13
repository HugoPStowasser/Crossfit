import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router";
import { CurrentUserProvider } from "./contexts/CurrentUser";
import { queryClient } from "./services/queryClient";
import { QueryClientProvider } from "react-query";
const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS>
        <BrowserRouter>
          <CurrentUserProvider>
            <Router />
          </CurrentUserProvider>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
