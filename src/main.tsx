import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/Router";
import { CurrentUserProvider } from "./contexts/CurrentUser";
import { queryClient } from "./services/queryClient";
import { QueryClientProvider } from "react-query";
const rootElement = document.getElementById("root")!;
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS>
      <CurrentUserProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </BrowserRouter>
      </CurrentUserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
